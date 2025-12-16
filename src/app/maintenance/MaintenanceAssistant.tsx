'use client';

/**
 * MaintenanceAssistant Component
 * Voice-based AI assistant for submitting maintenance requests
 */

/// <reference path="./speech.d.ts" />

import { useEffect, useState, useRef, useCallback } from 'react';
import useMaintenanceStore from './maintenanceStore';
import {
  isSpeechRecognitionSupported,
  isSpeechSynthesisSupported,
  createSpeechRecognition,
  startSpeechRecognition,
  stopSpeechRecognition,
  speak,
  stopSpeaking,
  loadVoices
} from './voiceUtils';
import { ISSUE_TYPE_LABELS, URGENCY_LABELS } from './types';

type MaintenanceAssistantProps = {
  isDarkMode: boolean;
};

export default function MaintenanceAssistant({ isDarkMode }: MaintenanceAssistantProps) {
  const {
    currentRequest,
    conversationStep,
    conversationHistory,
    isListening,
    isSpeaking,
    interimTranscript,
    error,
    setIsListening,
    setIsSpeaking,
    setInterimTranscript,
    setError,
    addMessage,
    processUserInput,
    getAssistantPrompt,
    resetConversation,
    addMediaAttachment,
    setConversationStep
  } = useMaintenanceStore();

  const [textInput, setTextInput] = useState('');
  const [voiceSupported, setVoiceSupported] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check for voice support on mount
  useEffect(() => {
    const checkSupport = async () => {
      const speechRecognitionSupported = isSpeechRecognitionSupported();
      const speechSynthesisSupported = isSpeechSynthesisSupported();
      setVoiceSupported(speechRecognitionSupported && speechSynthesisSupported);

      if (speechSynthesisSupported) {
        await loadVoices();
      }
    };
    checkSupport();

    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        stopSpeechRecognition(recognitionRef.current);
      }
    };
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversationHistory, interimTranscript]);

  // Speak assistant messages
  const speakMessage = useCallback((text: string) => {
    if (!isSpeechSynthesisSupported()) return;

    setIsSpeaking(true);
    speak(text, {
      rate: 0.95,
      onEnd: () => setIsSpeaking(false),
      onError: (err) => {
        setError(err);
        setIsSpeaking(false);
      }
    });
  }, [setIsSpeaking, setError]);

  // Start the conversation
  const startConversation = useCallback(() => {
    setHasStarted(true);
    const greeting = getAssistantPrompt();
    addMessage('assistant', greeting);
    speakMessage(greeting);
  }, [getAssistantPrompt, addMessage, speakMessage]);

  // Handle assistant response after user input
  useEffect(() => {
    if (hasStarted && conversationHistory.length > 0) {
      const lastMessage = conversationHistory[conversationHistory.length - 1];
      if (lastMessage.role === 'user') {
        // Small delay before assistant responds
        const timer = setTimeout(() => {
          const response = getAssistantPrompt();
          addMessage('assistant', response);
          speakMessage(response);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [conversationStep, hasStarted]);

  // Start voice recognition
  const startListening = useCallback(() => {
    if (!voiceSupported) {
      setError('Voice recognition is not supported in your browser.');
      return;
    }

    stopSpeaking();

    const recognition = createSpeechRecognition();
    if (!recognition) {
      setError('Failed to initialize speech recognition.');
      return;
    }

    recognitionRef.current = recognition;

    startSpeechRecognition(recognition, {
      onStart: () => {
        setIsListening(true);
        setError(null);
      },
      onResult: (transcript, isFinal) => {
        setInterimTranscript(transcript);
        if (isFinal) {
          processUserInput(transcript);
          setInterimTranscript('');
        }
      },
      onError: (errorMsg) => {
        setError(errorMsg);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });
  }, [voiceSupported, setIsListening, setInterimTranscript, setError, processUserInput]);

  // Stop voice recognition
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      stopSpeechRecognition(recognitionRef.current);
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, [setIsListening]);

  // Handle text input submission
  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      processUserInput(textInput.trim());
      setTextInput('');
    }
  };

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');

      if (isImage || isVideo) {
        const url = URL.createObjectURL(file);
        addMediaAttachment({
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          type: isImage ? 'image' : 'video',
          url,
          name: file.name,
          uploadedAt: new Date()
        });
      }
    });

    // If on photos step, move to summary
    if (conversationStep === 'photos') {
      const message = "Thank you for uploading the photos. Let me review your request.";
      addMessage('assistant', message);
      speakMessage(message);
      setConversationStep('summary');
    }
  };

  // Render the start screen
  if (!hasStarted) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-8 ${
        isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-green-50 to-white'
      }`}>
        <div className={`max-w-lg w-full text-center p-8 rounded-2xl ${
          isDarkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-lg'
        }`}>
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
          }`}>
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>

          <h1 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Maintenance Request Assistant
          </h1>

          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            I'll help you submit a maintenance request for your apartment. You can speak or type your responses.
          </p>

          {!voiceSupported && (
            <div className={`mb-6 p-4 rounded-lg ${
              isDarkMode ? 'bg-yellow-500/20 text-yellow-300' : 'bg-yellow-50 text-yellow-700'
            }`}>
              <p className="text-sm">
                Voice features are not available in your browser. You can still use text input.
              </p>
            </div>
          )}

          <button
            onClick={startConversation}
            className="w-full px-6 py-4 bg-green-500 text-white rounded-xl hover:bg-green-600
                     transition-all duration-200 transform hover:scale-105 font-semibold
                     flex items-center justify-center gap-3 shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Start Conversation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${
      isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-green-50 to-white'
    }`}>
      {/* Header */}
      <header className={`p-4 border-b ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'
      } backdrop-blur-sm`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-green-500/20' : 'bg-green-100'
            }`}>
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <div>
              <h1 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Maintenance Assistant
              </h1>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : 'Ready'}
              </p>
            </div>
          </div>

          <button
            onClick={resetConversation}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            New Request
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {conversationHistory.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-green-500 text-white rounded-br-md'
                    : isDarkMode
                    ? 'bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-md'
                    : 'bg-white text-gray-900 shadow-md rounded-bl-md'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <p className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-green-100' : isDarkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {/* Interim transcript */}
          {interimTranscript && (
            <div className="flex justify-end">
              <div className="max-w-[80%] p-4 rounded-2xl bg-green-500/50 text-white rounded-br-md">
                <p className="italic">{interimTranscript}</p>
              </div>
            </div>
          )}

          {/* Media attachments preview */}
          {currentRequest.mediaAttachments.length > 0 && (
            <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <p className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Attached Media:
              </p>
              <div className="flex flex-wrap gap-3">
                {currentRequest.mediaAttachments.map((media) => (
                  <div key={media.id} className="relative">
                    {media.type === 'image' ? (
                      <img
                        src={media.url}
                        alt={media.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    ) : (
                      <video
                        src={media.url}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className={`mx-4 mb-4 p-4 rounded-xl ${
          isDarkMode ? 'bg-red-500/20 text-red-300' : 'bg-red-50 text-red-600'
        }`}>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Input Area */}
      <div className={`p-4 border-t ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'
      } backdrop-blur-sm`}>
        <div className="max-w-4xl mx-auto">
          {/* Quick action buttons for photo upload */}
          {conversationStep === 'photos' && (
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className={`flex-1 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Upload Photo/Video
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}

          {/* Text input and voice button */}
          <form onSubmit={handleTextSubmit} className="flex gap-3">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder={isListening ? "Listening..." : "Type your response..."}
              disabled={isListening || isSpeaking}
              className={`flex-1 px-5 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500
                        ${isDarkMode
                          ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
                          : 'bg-white text-gray-900 border-gray-200 placeholder-gray-400'
                        } ${(isListening || isSpeaking) ? 'opacity-50 cursor-not-allowed' : ''}`}
            />

            {/* Voice button */}
            {voiceSupported && (
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                disabled={isSpeaking}
                className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200
                          ${isListening
                            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                            : 'bg-green-500 hover:bg-green-600'
                          } ${isSpeaking ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isListening ? (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                )}
              </button>
            )}

            {/* Send button */}
            <button
              type="submit"
              disabled={!textInput.trim() || isListening || isSpeaking}
              className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200
                        bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>

          {/* Voice status indicator */}
          {(isListening || isSpeaking) && (
            <div className={`mt-3 text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {isListening ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Listening... Speak now
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  Assistant is speaking...
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

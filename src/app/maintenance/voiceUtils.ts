/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Voice utilities for the Maintenance Request Voice Assistant
 * Uses the Web Speech API for speech recognition and synthesis
 */

/**
 * Check if speech recognition is supported in the browser
 */
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

/**
 * Check if speech synthesis is supported in the browser
 */
export function isSpeechSynthesisSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window;
}

/**
 * Create a speech recognition instance
 */
export function createSpeechRecognition(): SpeechRecognition | null {
  if (!isSpeechRecognitionSupported()) return null;

  const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognitionAPI();

  // Configure recognition settings
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 1;

  return recognition;
}

/**
 * Speech recognition result handler type
 */
export type SpeechRecognitionHandler = {
  onResult: (transcript: string, isFinal: boolean) => void;
  onError: (error: string) => void;
  onEnd: () => void;
  onStart: () => void;
};

/**
 * Start speech recognition with handlers
 */
export function startSpeechRecognition(
  recognition: SpeechRecognition,
  handlers: SpeechRecognitionHandler
): void {
  recognition.onstart = () => {
    handlers.onStart();
  };

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const result = event.results[event.results.length - 1];
    const transcript = result[0].transcript;
    const isFinal = result.isFinal;
    handlers.onResult(transcript, isFinal);
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    let errorMessage = 'Speech recognition error';

    switch (event.error) {
      case 'no-speech':
        errorMessage = 'No speech was detected. Please try again.';
        break;
      case 'audio-capture':
        errorMessage = 'No microphone was found. Please ensure a microphone is connected.';
        break;
      case 'not-allowed':
        errorMessage = 'Microphone access was denied. Please allow microphone access to use voice input.';
        break;
      case 'network':
        errorMessage = 'Network error occurred. Please check your connection.';
        break;
      case 'aborted':
        errorMessage = 'Speech recognition was aborted.';
        break;
      default:
        errorMessage = `Speech recognition error: ${event.error}`;
    }

    handlers.onError(errorMessage);
  };

  recognition.onend = () => {
    handlers.onEnd();
  };

  try {
    recognition.start();
  } catch (error) {
    handlers.onError('Failed to start speech recognition. Please try again.');
  }
}

/**
 * Stop speech recognition
 */
export function stopSpeechRecognition(recognition: SpeechRecognition): void {
  try {
    recognition.stop();
  } catch (error) {
    // Recognition may already be stopped
  }
}

/**
 * Speak text using speech synthesis
 */
export function speak(
  text: string,
  options: {
    rate?: number;
    pitch?: number;
    volume?: number;
    onEnd?: () => void;
    onError?: (error: string) => void;
  } = {}
): SpeechSynthesisUtterance | null {
  if (!isSpeechSynthesisSupported()) {
    options.onError?.('Speech synthesis is not supported in this browser.');
    return null;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Configure voice settings
  utterance.rate = options.rate ?? 1;
  utterance.pitch = options.pitch ?? 1;
  utterance.volume = options.volume ?? 1;
  utterance.lang = 'en-US';

  // Select a good quality voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(
    voice => voice.lang.startsWith('en') && voice.localService
  ) || voices.find(voice => voice.lang.startsWith('en'));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onend = () => {
    options.onEnd?.();
  };

  utterance.onerror = (event) => {
    options.onError?.(`Speech synthesis error: ${event.error}`);
  };

  window.speechSynthesis.speak(utterance);

  return utterance;
}

/**
 * Stop any ongoing speech synthesis
 */
export function stopSpeaking(): void {
  if (isSpeechSynthesisSupported()) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Check if speech synthesis is currently speaking
 */
export function isSpeaking(): boolean {
  if (!isSpeechSynthesisSupported()) return false;
  return window.speechSynthesis.speaking;
}

/**
 * Load available voices (some browsers load voices asynchronously)
 */
export function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!isSpeechSynthesisSupported()) {
      resolve([]);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    // Some browsers load voices asynchronously
    window.speechSynthesis.onvoiceschanged = () => {
      resolve(window.speechSynthesis.getVoices());
    };

    // Timeout fallback
    setTimeout(() => {
      resolve(window.speechSynthesis.getVoices());
    }, 1000);
  });
}

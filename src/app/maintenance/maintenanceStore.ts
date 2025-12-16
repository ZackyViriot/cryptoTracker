/**
 * Zustand store for the Maintenance Request Voice Assistant
 * Manages conversation state, maintenance request data, and voice interaction
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  MaintenanceRequest,
  ConversationStep,
  ConversationMessage,
  IssueType,
  UrgencyLevel,
  MediaAttachment,
  EMERGENCY_KEYWORDS
} from './types';

/**
 * Generate a unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Create an empty maintenance request
 */
function createEmptyRequest(): MaintenanceRequest {
  return {
    id: generateId(),
    issueType: null,
    description: '',
    severity: null,
    apartmentNumber: '',
    affectedArea: '',
    impact: [],
    permissionToEnter: null,
    preferredTimes: '',
    mediaAttachments: [],
    createdAt: new Date(),
    status: 'draft'
  };
}

/**
 * State structure for the maintenance assistant
 */
type MaintenanceState = {
  // Current maintenance request being built
  currentRequest: MaintenanceRequest;

  // Conversation state
  conversationStep: ConversationStep;
  conversationHistory: ConversationMessage[];

  // Voice state
  isListening: boolean;
  isSpeaking: boolean;
  interimTranscript: string;

  // UI state
  isProcessing: boolean;
  error: string | null;
  isDarkMode: boolean;

  // Submitted requests history
  submittedRequests: MaintenanceRequest[];

  // Actions
  setConversationStep: (step: ConversationStep) => void;
  addMessage: (role: 'assistant' | 'user', content: string) => void;
  setIsListening: (listening: boolean) => void;
  setIsSpeaking: (speaking: boolean) => void;
  setInterimTranscript: (transcript: string) => void;
  setIsProcessing: (processing: boolean) => void;
  setError: (error: string | null) => void;

  // Request update actions
  setIssueType: (type: IssueType) => void;
  setDescription: (description: string) => void;
  setSeverity: (severity: UrgencyLevel) => void;
  setApartmentNumber: (number: string) => void;
  setAffectedArea: (area: string) => void;
  addImpact: (impact: string) => void;
  removeImpact: (impact: string) => void;
  setPermissionToEnter: (permission: boolean) => void;
  setPreferredTimes: (times: string) => void;
  addMediaAttachment: (attachment: MediaAttachment) => void;
  removeMediaAttachment: (id: string) => void;

  // Flow actions
  submitRequest: () => void;
  resetConversation: () => void;
  checkForEmergency: (text: string) => boolean;

  // Get the current assistant prompt based on conversation step
  getAssistantPrompt: () => string;

  // Generate summary of the request
  generateSummary: () => string;

  // Process user input and determine next step
  processUserInput: (input: string) => void;

  // Theme
  toggleTheme: () => void;
};

/**
 * Create the maintenance assistant store
 */
const useMaintenanceStore = create<MaintenanceState>()(
  persist(
    (set, get) => ({
  // Initial state
  currentRequest: createEmptyRequest(),
  conversationStep: 'greeting',
  conversationHistory: [],
  isListening: false,
  isSpeaking: false,
  interimTranscript: '',
  isProcessing: false,
  error: null,
  isDarkMode: true,
  submittedRequests: [],

  // Basic setters
  setConversationStep: (step) => set({ conversationStep: step }),
  setIsListening: (listening) => set({ isListening: listening }),
  setIsSpeaking: (speaking) => set({ isSpeaking: speaking }),
  setInterimTranscript: (transcript) => set({ interimTranscript: transcript }),
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  setError: (error) => set({ error }),

  addMessage: (role, content) =>
    set((state) => ({
      conversationHistory: [
        ...state.conversationHistory,
        {
          id: generateId(),
          role,
          content,
          timestamp: new Date()
        }
      ]
    })),

  // Request update actions
  setIssueType: (type) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, issueType: type }
    })),

  setDescription: (description) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, description }
    })),

  setSeverity: (severity) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, severity }
    })),

  setApartmentNumber: (number) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, apartmentNumber: number }
    })),

  setAffectedArea: (area) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, affectedArea: area }
    })),

  addImpact: (impact) =>
    set((state) => ({
      currentRequest: {
        ...state.currentRequest,
        impact: [...state.currentRequest.impact, impact]
      }
    })),

  removeImpact: (impact) =>
    set((state) => ({
      currentRequest: {
        ...state.currentRequest,
        impact: state.currentRequest.impact.filter((i) => i !== impact)
      }
    })),

  setPermissionToEnter: (permission) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, permissionToEnter: permission }
    })),

  setPreferredTimes: (times) =>
    set((state) => ({
      currentRequest: { ...state.currentRequest, preferredTimes: times }
    })),

  addMediaAttachment: (attachment) =>
    set((state) => ({
      currentRequest: {
        ...state.currentRequest,
        mediaAttachments: [...state.currentRequest.mediaAttachments, attachment]
      }
    })),

  removeMediaAttachment: (id) =>
    set((state) => ({
      currentRequest: {
        ...state.currentRequest,
        mediaAttachments: state.currentRequest.mediaAttachments.filter(
          (m) => m.id !== id
        )
      }
    })),

  // Check for emergency keywords
  checkForEmergency: (text) => {
    const lowerText = text.toLowerCase();
    return EMERGENCY_KEYWORDS.some((keyword) => lowerText.includes(keyword));
  },

  // Submit the request
  submitRequest: () =>
    set((state) => {
      const submittedRequest = {
        ...state.currentRequest,
        status: 'submitted' as const
      };
      return {
        submittedRequests: [...state.submittedRequests, submittedRequest],
        conversationStep: 'completed'
      };
    }),

  // Reset the conversation
  resetConversation: () =>
    set({
      currentRequest: createEmptyRequest(),
      conversationStep: 'greeting',
      conversationHistory: [],
      isListening: false,
      isSpeaking: false,
      interimTranscript: '',
      isProcessing: false,
      error: null
    }),

  // Generate summary of the maintenance request
  generateSummary: () => {
    const request = get().currentRequest;
    return `Let me summarize your maintenance request:

Issue Type: ${request.issueType || 'Not specified'}
Description: ${request.description || 'Not provided'}
Urgency: ${request.severity || 'Not specified'}
Location: Apartment ${request.apartmentNumber || 'Not specified'}, ${request.affectedArea || 'area not specified'}
Impact: ${request.impact.length > 0 ? request.impact.join(', ') : 'Not specified'}
Permission to Enter: ${request.permissionToEnter === null ? 'Not specified' : request.permissionToEnter ? 'Yes' : 'No'}
${request.preferredTimes ? `Preferred Times: ${request.preferredTimes}` : ''}
${request.mediaAttachments.length > 0 ? `Attached Media: ${request.mediaAttachments.length} file(s)` : ''}

Please confirm if this information is correct, or let me know what you'd like to change. Say 'submit' to submit this request.`;
  },

  // Get the assistant prompt for the current step
  getAssistantPrompt: () => {
    const state = get();
    const request = state.currentRequest;

    switch (state.conversationStep) {
      case 'greeting':
        return "Hello! I'm your maintenance request assistant. I'm here to help you report any issues in your apartment. Let's get started. What type of issue are you experiencing? For example: plumbing, electrical, heating or cooling, appliance, structural, pest, or something else?";

      case 'issue_type':
        return "What type of issue are you experiencing? You can say plumbing, electrical, HVAC for heating or cooling, appliance, structural, pest control, or other.";

      case 'description':
        return `Thank you. You've selected ${request.issueType}. Now, please describe the problem in detail. What is happening, when did it start, and how often does it occur?`;

      case 'severity':
        return "How urgent is this issue? Is it an emergency requiring immediate attention, urgent and needs to be addressed within 24 hours, or routine and can wait a few days?";

      case 'location':
        return "What is your apartment number, and which room or area is affected? For example, bathroom, kitchen, bedroom, or living room.";

      case 'impact':
        return "What impact is this issue having? For example, water damage, safety concern, loss of utilities, noise, or health hazard. You can mention multiple impacts.";

      case 'permission':
        return "Do we have permission to enter your apartment if you're not home? If yes, are there any preferred times for maintenance to visit?";

      case 'photos':
        return "Would you like to upload any photos or videos of the issue? This can help our maintenance team better understand and prepare for the repair. You can click the upload button or say 'skip' to continue without photos.";

      case 'summary':
        return state.generateSummary();

      case 'emergency_warning':
        return "I've detected this might be an emergency situation. For immediate emergencies like flooding, gas leaks, or fire risks, please contact emergency maintenance at your building's emergency line or call 911 if there's immediate danger. Would you still like me to document this request?";

      case 'confirmation':
        return "Is there anything you'd like to change or add to this request? Say 'submit' to submit the request, or tell me what you'd like to modify.";

      case 'completed':
        return "Your maintenance request has been submitted successfully. A member of our maintenance team will review it and contact you soon. Your reference number is " + request.id.substring(0, 8).toUpperCase() + ". Is there anything else I can help you with today?";

      default:
        return "I'm sorry, I didn't understand that. Could you please repeat?";
    }
  },

  // Process user input
  processUserInput: (input) => {
    const state = get();
    const lowerInput = input.toLowerCase().trim();

    // Add user message to history
    state.addMessage('user', input);

    // Check for emergency keywords at any point
    if (state.checkForEmergency(input) && state.conversationStep !== 'emergency_warning') {
      set({ conversationStep: 'emergency_warning' });
      return;
    }

    switch (state.conversationStep) {
      case 'greeting':
      case 'issue_type':
        processIssueType(lowerInput, set, get);
        break;

      case 'emergency_warning':
        if (lowerInput.includes('yes') || lowerInput.includes('continue') || lowerInput.includes('document')) {
          set({ conversationStep: 'description' });
        } else if (lowerInput.includes('no')) {
          state.resetConversation();
        }
        break;

      case 'description':
        state.setDescription(input);
        set({ conversationStep: 'severity' });
        break;

      case 'severity':
        processSeverity(lowerInput, set, get);
        break;

      case 'location':
        processLocation(input, set, get);
        break;

      case 'impact':
        processImpact(input, set, get);
        break;

      case 'permission':
        processPermission(input, set, get);
        break;

      case 'photos':
        if (lowerInput.includes('skip') || lowerInput.includes('no') || lowerInput.includes('continue')) {
          set({ conversationStep: 'summary' });
        }
        break;

      case 'summary':
      case 'confirmation':
        if (lowerInput.includes('submit') || lowerInput.includes('confirm') || lowerInput.includes('yes')) {
          state.submitRequest();
        } else if (lowerInput.includes('change') || lowerInput.includes('modify') || lowerInput.includes('edit')) {
          set({ conversationStep: 'issue_type' });
        }
        break;

      case 'completed':
        if (lowerInput.includes('new') || lowerInput.includes('another') || lowerInput.includes('yes')) {
          state.resetConversation();
        }
        break;
    }
  },

  // Toggle theme
  toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode }))
}),
    {
      name: 'maintenance-assistant-storage',
      partialize: (state) => ({ isDarkMode: state.isDarkMode })
    }
  )
);

// Helper function to process issue type input
function processIssueType(
  input: string,
  set: (state: Partial<MaintenanceState>) => void,
  get: () => MaintenanceState
) {
  let issueType: IssueType | null = null;

  if (input.includes('plumb') || input.includes('water') || input.includes('leak') || input.includes('drain') || input.includes('toilet') || input.includes('faucet') || input.includes('sink')) {
    issueType = 'plumbing';
  } else if (input.includes('electr') || input.includes('power') || input.includes('light') || input.includes('outlet') || input.includes('switch')) {
    issueType = 'electrical';
  } else if (input.includes('hvac') || input.includes('heat') || input.includes('cool') || input.includes('air condition') || input.includes('ac') || input.includes('furnace') || input.includes('thermostat')) {
    issueType = 'hvac';
  } else if (input.includes('appliance') || input.includes('refrigerator') || input.includes('fridge') || input.includes('stove') || input.includes('oven') || input.includes('dishwasher') || input.includes('washer') || input.includes('dryer') || input.includes('microwave')) {
    issueType = 'appliance';
  } else if (input.includes('structur') || input.includes('wall') || input.includes('floor') || input.includes('ceiling') || input.includes('door') || input.includes('window') || input.includes('crack')) {
    issueType = 'structural';
  } else if (input.includes('pest') || input.includes('bug') || input.includes('insect') || input.includes('rodent') || input.includes('mouse') || input.includes('rat') || input.includes('roach') || input.includes('ant')) {
    issueType = 'pest';
  } else if (input.includes('other') || input.length > 0) {
    issueType = 'other';
  }

  if (issueType) {
    get().setIssueType(issueType);
    set({ conversationStep: 'description' });
  }
}

// Helper function to process severity input
function processSeverity(
  input: string,
  set: (state: Partial<MaintenanceState>) => void,
  get: () => MaintenanceState
) {
  let severity: UrgencyLevel | null = null;

  if (input.includes('emergency') || input.includes('immediate') || (input.includes('urgent') && input.includes('very'))) {
    severity = 'emergency';
  } else if (input.includes('urgent') || input.includes('soon') || input.includes('24 hour') || input.includes('today') || input.includes('asap')) {
    severity = 'urgent';
  } else if (input.includes('routine') || input.includes('wait') || input.includes('few days') || input.includes('not urgent') || input.includes('whenever')) {
    severity = 'routine';
  }

  if (severity) {
    get().setSeverity(severity);
    set({ conversationStep: 'location' });
  }
}

// Helper function to process location input
function processLocation(
  input: string,
  set: (state: Partial<MaintenanceState>) => void,
  get: () => MaintenanceState
) {
  const state = get();

  // Try to extract apartment number (simple pattern matching)
  const aptMatch = input.match(/(?:apartment|apt|unit|#)\s*(\d+[a-z]?)/i) || input.match(/(\d+[a-z]?)/i);
  if (aptMatch) {
    state.setApartmentNumber(aptMatch[1]);
  }

  // Extract area from common room names
  const rooms = ['bathroom', 'kitchen', 'bedroom', 'living room', 'dining room', 'closet', 'hallway', 'balcony', 'patio', 'garage', 'laundry'];
  const foundRoom = rooms.find(room => input.toLowerCase().includes(room));
  if (foundRoom) {
    state.setAffectedArea(foundRoom);
  } else {
    state.setAffectedArea(input);
  }

  set({ conversationStep: 'impact' });
}

// Helper function to process impact input
function processImpact(
  input: string,
  set: (state: Partial<MaintenanceState>) => void,
  get: () => MaintenanceState
) {
  const state = get();
  const impacts: string[] = [];

  if (input.includes('water damage') || input.includes('wet') || input.includes('moisture')) {
    impacts.push('Water damage');
  }
  if (input.includes('safety') || input.includes('dangerous') || input.includes('hazard')) {
    impacts.push('Safety concern');
  }
  if (input.includes('utilities') || input.includes('no power') || input.includes('no water') || input.includes('no heat')) {
    impacts.push('Loss of utilities');
  }
  if (input.includes('noise') || input.includes('loud') || input.includes('sound')) {
    impacts.push('Noise issue');
  }
  if (input.includes('health') || input.includes('mold') || input.includes('smell') || input.includes('odor')) {
    impacts.push('Health hazard');
  }
  if (input.includes('damage') && !input.includes('water damage')) {
    impacts.push('Property damage');
  }

  if (impacts.length === 0) {
    impacts.push('Other');
  }

  impacts.forEach(impact => state.addImpact(impact));
  set({ conversationStep: 'permission' });
}

// Helper function to process permission input
function processPermission(
  input: string,
  set: (state: Partial<MaintenanceState>) => void,
  get: () => MaintenanceState
) {
  const state = get();

  if (input.includes('yes') || input.includes('can enter') || input.includes('permission')) {
    state.setPermissionToEnter(true);

    const timePatterns = ['morning', 'afternoon', 'evening', 'weekday', 'weekend', 'anytime', 'any time'];
    const foundTimes = timePatterns.filter(pattern => input.toLowerCase().includes(pattern));
    if (foundTimes.length > 0) {
      state.setPreferredTimes(foundTimes.join(', '));
    } else if (input.length > 10) {
      state.setPreferredTimes(input);
    }
  } else if (input.includes('no') || input.includes('must be home') || input.includes('present')) {
    state.setPermissionToEnter(false);
  }

  set({ conversationStep: 'photos' });
}

export default useMaintenanceStore;

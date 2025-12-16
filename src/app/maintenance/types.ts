/**
 * Types and interfaces for the Maintenance Request Voice Assistant
 */

/**
 * Issue types that can be reported
 */
export type IssueType =
  | 'plumbing'
  | 'electrical'
  | 'hvac'
  | 'appliance'
  | 'structural'
  | 'pest'
  | 'other';

/**
 * Urgency levels for maintenance requests
 */
export type UrgencyLevel = 'emergency' | 'urgent' | 'routine';

/**
 * Media attachment for photos/videos
 */
export type MediaAttachment = {
  id: string;
  type: 'image' | 'video';
  url: string;
  name: string;
  uploadedAt: Date;
};

/**
 * Complete maintenance request structure
 */
export type MaintenanceRequest = {
  id: string;
  issueType: IssueType | null;
  description: string;
  severity: UrgencyLevel | null;
  apartmentNumber: string;
  affectedArea: string;
  impact: string[];
  permissionToEnter: boolean | null;
  preferredTimes: string;
  mediaAttachments: MediaAttachment[];
  createdAt: Date;
  status: 'draft' | 'submitted' | 'in_progress' | 'completed';
};

/**
 * Conversation step in the voice assistant flow
 */
export type ConversationStep =
  | 'greeting'
  | 'issue_type'
  | 'description'
  | 'severity'
  | 'location'
  | 'impact'
  | 'permission'
  | 'photos'
  | 'summary'
  | 'confirmation'
  | 'emergency_warning'
  | 'completed';

/**
 * Message in the conversation history
 */
export type ConversationMessage = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: Date;
};

/**
 * Impact options for maintenance issues
 */
export const IMPACT_OPTIONS = [
  'Water damage',
  'Safety concern',
  'Loss of utilities',
  'Noise issue',
  'Health hazard',
  'Property damage',
  'Other'
] as const;

/**
 * Issue type labels for display
 */
export const ISSUE_TYPE_LABELS: Record<IssueType, string> = {
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  hvac: 'HVAC (Heating/Cooling)',
  appliance: 'Appliance',
  structural: 'Structural',
  pest: 'Pest Control',
  other: 'Other'
};

/**
 * Urgency level labels for display
 */
export const URGENCY_LABELS: Record<UrgencyLevel, string> = {
  emergency: 'Emergency - Immediate attention needed',
  urgent: 'Urgent - Within 24 hours',
  routine: 'Routine - Can wait a few days'
};

/**
 * Keywords that indicate emergency situations
 */
export const EMERGENCY_KEYWORDS = [
  'flood',
  'flooding',
  'gas leak',
  'gas smell',
  'fire',
  'smoke',
  'no heat',
  'no heating',
  'carbon monoxide',
  'sparking',
  'electrical fire',
  'burst pipe',
  'sewage',
  'ceiling collapse',
  'broken window',
  'security',
  'break-in'
];

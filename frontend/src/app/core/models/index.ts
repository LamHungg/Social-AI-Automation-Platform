// Workspace & Auth
export interface Workspace {
  id: string;
  code: string;
  name: string;
  role: 'OWNER' | 'ADMIN' | 'MEMBER';
}

// Channel Connection (Facebook / Instagram)
export interface ChannelConnection {
  id: string;
  workspaceId: string;
  channelType: 'FACEBOOK_PAGE' | 'INSTAGRAM_BUSINESS';
  externalId: string;
  name: string;
  avatarUrl?: string;
  status: 'CONNECTED' | 'DISCONNECTED' | 'TOKEN_EXPIRED';
  webhookStatus: 'HEALTHY' | 'WARNING' | 'ERROR';
  autoReplyEnabled: boolean;
  connectedAt: string;
}

// Conversation & Inbox
export type ConversationStatus = 'OPEN' | 'PENDING' | 'RESOLVED' | 'CLOSED';
export type LeadTemperature = 'HOT' | 'WARM' | 'COLD' | 'COMPLAINT';
export type AiHandlingMode = 'AUTO' | 'SUGGEST' | 'HUMAN_TAKEOVER';

export interface SocialProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  platform: 'FACEBOOK' | 'INSTAGRAM';
  handle?: string;
  phone?: string;
  email?: string;
  location?: string;
}

export interface Conversation {
  id: string;
  channelId: string;
  channelType: 'FACEBOOK' | 'INSTAGRAM';
  channelName: string;
  profile: SocialProfile;
  lastMessage: string;
  lastMessageDate: string;
  unreadCount: number;
  status: ConversationStatus;
  aiMode: AiHandlingMode;
  aiConfidence?: number;
  assignedAgent?: string;
  leadScore?: number;
  leadTemperature?: LeadTemperature;
  tags: string[];
}

export interface Message {
  id: string;
  conversationId: string;
  direction: 'INBOUND' | 'OUTBOUND';
  senderType: 'CUSTOMER' | 'AI' | 'HUMAN';
  content: string;
  timestamp: string;
  status: 'SENT' | 'DELIVERED' | 'READ' | 'FAILED';
  aiConfidence?: number;
  suggestedByAi?: boolean;
}

// Comments Center
export interface SocialPost {
  id: string;
  channelType: 'FACEBOOK' | 'INSTAGRAM';
  title: string;
  thumbnailUrl?: string;
  permalink: string;
  unreadCommentsCount: number;
  totalCommentsCount: number;
  publishedDate: string;
}

export interface SocialComment {
  id: string;
  postId: string;
  postTitle: string;
  authorName: string;
  authorAvatar?: string;
  content: string;
  commentDate: string;
  intent: 'ASK_PRICE' | 'STOCK' | 'COMPLAINT' | 'POSITIVE' | 'COMPETITOR' | 'PHONE_LEAD';
  confidence: number;
  replyStatus: 'UNREPLIED' | 'REPLIED' | 'DM_SENT' | 'HIDDEN';
  suggestedReply?: string;
  isHotLead?: boolean;
}

// Automation Rule & Node Graph
export interface AutomationRule {
  id: string;
  name: string;
  description?: string;
  status: 'ACTIVE' | 'PAUSED' | 'DRAFT';
  triggerType: 'KEYWORD' | 'INTENT' | 'TIME_WINDOW' | 'POST_COMMENT';
  triggers: string[];
  confidenceThreshold: number;
  actionsSummary: string[];
  runsCount: number;
  successRate: number;
  updatedAt: string;
}

// Lead CRM
export interface Lead {
  id: string;
  name: string;
  avatarUrl?: string;
  phone?: string;
  email?: string;
  platform: 'FACEBOOK' | 'INSTAGRAM';
  stage: 'NEW' | 'CONSULTING' | 'HOT_LEAD' | 'ORDERED' | 'LOST';
  temperature: LeadTemperature;
  aiScore: number;
  interestProduct: string;
  assignedTo?: string;
  createdAt: string;
  lastInteraction: string;
  notes?: string;
  tags: string[];
}

// AI Agent Config
export interface AiAgentConfig {
  id: string;
  name: string;
  roleDescription: string;
  defaultTone: 'FRIENDLY' | 'CONCISE' | 'PROFESSIONAL' | 'CUSTOM';
  language: string;
  systemPrompt: string;
  useEmojis: boolean;
  maxSentenceLength: 'SHORT' | 'MEDIUM' | 'DETAILED';
  contextMemoryTurns: number;
  fallbackThreshold: number;
  fallbackKeywords: string[];
  handoffToHuman: boolean;
  autoSolveRate: number;
  csatScore: number;
  escalationRate: number;
}

// Analytics
export interface AnalyticsKPI {
  connectedChannels: number;
  channelsGrowthText: string;
  aiRepliedCount: number;
  aiRepliedGrowth: number;
  hotLeadsCount: number;
  hotLeadsGrowth: number;
  escalationCount: number;
  escalationPercent: number;
}

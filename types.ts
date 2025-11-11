export enum Role {
  STUDENT = 'student',
  INVESTOR = 'investor',
}

export interface UserProfile {
  name: string;
  // Student-specific
  interests?: string;
  skills?: string;
  certifications?: string;
  // Investor-specific
  focusAreas?: string;
  company?: string;
}

export interface User {
  id: string;
  email: string;
  role: Role;
  profile: UserProfile;
  profileComplete: boolean;
}

export interface StartupIdea {
  ideaName: string;
  description: string;
  audience: string;
  monetization: string;
  ideaScore: number; // A score from 0-100 indicating viability.
  feasibilityAnalysis: string; // A brief analysis of the idea's feasibility.
  suggestedMentors: {
    name: string;
    expertise: string;
  }[];
}

export interface ChatMessage {
    sender: 'user' | 'ai';
    text: string;
    idea?: StartupIdea;
    timestamp: number;
}
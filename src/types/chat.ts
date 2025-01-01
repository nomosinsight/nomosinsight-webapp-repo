export interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: number;
  read: boolean;
  type?: 'text' | 'system';
}

export interface Chat {
  id: string;
  userId: string;
  userType: 'guest' | 'registered';
  userEmail?: string;
  status: 'active' | 'closed';
  lastMessage?: Message;
  unreadCount: number;
  createdAt: number;
  updatedAt: number;
  endedAt?: number;
  endedBy?: 'user' | 'admin';
}
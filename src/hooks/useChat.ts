import { useState, useEffect } from 'react';
import { ref, push, onValue, set, update, query, orderByChild, equalTo } from 'firebase/database';
import { db } from '../config/firebase';
import { useAuth } from './useAuth';
import type { Message, Chat } from '../types/chat';

export function useChat(chatId?: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatStatus, setChatStatus] = useState<'active' | 'closed'>('active');
  const { user } = useAuth();

  // Load chat status
  useEffect(() => {
    if (!user && !chatId) return;
    
    const uid = chatId || user?.uid;
    const chatRef = ref(db, `chats/${uid}`);
    
    return onValue(chatRef, (snapshot) => {
      const chat = snapshot.val();
      if (chat) {
        setChatStatus(chat.status);
      }
    });
  }, [user, chatId]);

  useEffect(() => {
    if (!user && !chatId) return;

    const uid = chatId || user?.uid;
    const messagesRef = ref(db, `chats/${uid}/messages`);
    const typingRef = ref(db, `chats/${uid}/typing`);

    const messagesUnsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.entries(data).map(([id, message]: [string, any]) => ({
          id,
          ...message
        }));
        setMessages(messageList);
      }
    });

    const typingUnsubscribe = onValue(typingRef, (snapshot) => {
      setIsTyping(snapshot.val()?.isTyping || false);
    });

    return () => {
      messagesUnsubscribe();
      typingUnsubscribe();
    };
  }, [user, chatId]);

  const sendMessage = async (text: string, isAdmin = false) => {
    if (!user && !chatId) return;

    const uid = chatId || user?.uid;
    const chatRef = ref(db, `chats/${uid}`);
    const messagesRef = ref(db, `chats/${uid}/messages`);
    
    const newMessage: Omit<Message, 'id'> = {
      text,
      senderId: isAdmin ? 'admin' : 'user',
      timestamp: Date.now(),
      read: false
    };
    
    const chatUpdate = {
      userId: uid,
      lastMessage: newMessage,
      unreadCount: isAdmin ? 0 : (messages.filter(m => !m.read).length + 1),
      updatedAt: Date.now()
    };

    try {
      await push(messagesRef, newMessage);
      await update(chatRef, chatUpdate);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const endChat = async (endedBy: 'user' | 'admin') => {
    if (!user && !chatId) return;
    
    const uid = chatId || user?.uid;
    const chatRef = ref(db, `chats/${uid}`);
    
    await update(chatRef, {
      status: 'closed',
      endedAt: Date.now(),
      endedBy
    });

    // Add system message
    const messagesRef = ref(db, `chats/${uid}/messages`);
    await push(messagesRef, {
      text: `Chat ended by ${endedBy}`,
      senderId: 'system',
      timestamp: Date.now(),
      read: true,
      type: 'system'
    });
  };

  const markMessagesAsRead = async () => {
    if (!user && !chatId) return;
    
    const uid = chatId || user?.uid;
    const messagesRef = ref(db, `chats/${uid}/messages`);
    
    onValue(messagesRef, (snapshot) => {
      const messages = snapshot.val();
      if (messages) {
        Object.entries(messages).forEach(([id, message]: [string, any]) => {
          if (!message.read && message.senderId !== (chatId ? 'admin' : 'user')) {
            update(ref(db, `chats/${uid}/messages/${id}`), { read: true });
          }
        });
      }
    }, { onlyOnce: true });

    // Reset unread count
    await update(ref(db, `chats/${uid}`), { unreadCount: 0 });
  };

  return {
    messages,
    isTyping,
    chatStatus,
    sendMessage,
    endChat,
    markMessagesAsRead
  };
}
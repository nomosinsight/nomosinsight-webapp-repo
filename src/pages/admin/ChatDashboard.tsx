import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../../config/firebase';
import { useChat } from '../../hooks/useChat';
import { Chat } from '../../types/chat';
import AdminLayout from './AdminLayout';

export default function ChatDashboard() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { messages, sendMessage, chatStatus, endChat } = useChat(selectedChat);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedChat) {
      await sendMessage(newMessage.trim(), true);
      setNewMessage('');
    }
  };

  useEffect(() => {
    const chatsRef = ref(db, 'chats');
    
    const unsubscribe = onValue(chatsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const chatList = Object.entries(data).map(([id, chat]: [string, any]) => ({
          id,
          ...chat
        }));
        setChats(chatList);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredChats = chats.filter(chat => 
    chat.lastMessage?.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Chat Dashboard</h1>
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Chat List */}
          <div className="col-span-1 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="font-medium text-gray-900">Active Chats</h2>
            </div>
            <div className="divide-y">
              {filteredChats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                    selectedChat === chat.id ? 'bg-gray-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium text-gray-900">User {chat.userId}</p>
                      {chat.lastMessage && (
                        <p className="text-sm text-gray-600 truncate">
                          {chat.lastMessage.text}
                        </p>
                      )}
                    </div>
                    {chat.unreadCount > 0 && (
                      <span className="bg-primary text-gray-900 text-xs px-2 py-1 rounded-full">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="col-span-2 bg-white rounded-lg shadow-sm">
            {selectedChat ? (
              <div className="h-full flex flex-col">
                {/* Chat header */}
                <div className="p-4 border-b">
                  <h2 className="font-medium text-gray-900">
                    Chat with User {selectedChat}
                    {chatStatus === 'closed' && (
                      <span className="ml-2 text-sm text-gray-500">(Closed)</span>
                    )}
                  </h2>
                  {chatStatus === 'active' && (
                    <button
                      onClick={() => endChat('admin')}
                      className="mt-2 text-sm text-red-600 hover:text-red-700"
                    >
                      End Chat
                    </button>
                  )}
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === 'admin' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.senderId === 'admin'
                          ? 'bg-primary text-gray-900'
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message input */}
                {chatStatus === 'active' && (
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="relative">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full px-4 py-2 border rounded-full focus:outline-none focus:border-primary"
                    className="w-full px-4 py-2 border rounded-full focus:outline-none focus:border-primary pr-20"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage(e);
                      }
                    }}
                  />
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-primary text-gray-900 px-4 py-1 rounded-full hover:bg-primary-hover disabled:opacity-50"
                      disabled={!newMessage.trim()}
                    >
                      Send
                    </button>
                  </form>
                </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a chat to start messaging
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
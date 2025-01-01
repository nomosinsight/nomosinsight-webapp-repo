import { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';
import ChatMessage from './ChatMessage';
import ChatTypingIndicator from './ChatTypingIndicator';
import ChatHeader from './ChatHeader';
import ChatLogin from './ChatLogin';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const { messages, sendMessage, isTyping, chatStatus, endChat, markMessagesAsRead } = useChat();
  const { user } = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && messages.length > 0) {
      markMessagesAsRead();
    }
  }, [isOpen, messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError('Please sign in to send messages');
      return;
    }
    
    if (message.trim() && chatStatus === 'active') {
      sendMessage(message.trim());
      setMessage('');
      setError('');
    }
  };

  const handleEmojiClick = (emojiData: any) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
  };
  const handleEndChat = async () => {
    await endChat('user');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 right-0 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col"
          >
            <ChatHeader
              onClose={() => setIsOpen(false)}
              onEndChat={handleEndChat}
              status={chatStatus}
            />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {!user && <ChatLogin />}
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              {isTyping && <ChatTypingIndicator />}
            </div>

            {/* Message Input */}
            {chatStatus === 'active' && (
              <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  disabled={!user}
                  className="w-full px-4 py-2 border rounded-full pr-24 focus:outline-none focus:border-primary"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowEmoji(!showEmoji)}
                    disabled={!user}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <Smile className="w-5 h-5" />
                  </button>
                  <button
                    type="submit"
                    disabled={!message.trim() || !user}
                    className="text-primary hover:text-primary-hover transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                {showEmoji && (
                  <div className="absolute bottom-full right-0 mb-2">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </div>
            </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary hover:bg-primary-hover text-gray-900 rounded-full p-4 shadow-lg transition-colors relative"
      >
        <MessageCircle className="w-6 h-6" />
        {!isOpen && messages.some(m => !m.read) && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {messages.filter(m => !m.read).length}
          </span>
        )}
      </motion.button>
    </div>
  );
}
import { format } from 'date-fns';
import { Check, CheckCheck } from 'lucide-react';
import type { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.senderId === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-primary text-gray-900'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <div className={`flex items-center justify-end mt-1 space-x-1 text-xs ${
          isUser ? 'text-gray-800' : 'text-gray-500'
        }`}>
          <span>{format(new Date(message.timestamp), 'HH:mm')}</span>
          {isUser && (
            message.read ? (
              <CheckCheck className="w-4 h-4" />
            ) : (
              <Check className="w-4 h-4" />
            )
          )}
        </div>
      </div>
    </div>
  );
}
import { X } from 'lucide-react';

interface ChatHeaderProps {
  onClose: () => void;
  onEndChat: () => void;
  status: 'active' | 'closed';
}

export default function ChatHeader({ onClose, onEndChat, status }: ChatHeaderProps) {
  return (
    <div className="p-4 border-b flex items-center justify-between bg-primary rounded-t-lg">
      <div>
        <h3 className="text-gray-900 font-semibold">Chat with Us</h3>
        {status === 'closed' && (
          <p className="text-sm text-gray-700">This chat has ended</p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {status === 'active' && (
          <button
            onClick={onEndChat}
            className="text-gray-900 hover:text-gray-700 transition-colors text-sm"
          >
            End Chat
          </button>
        )}
        <button
          onClick={onClose}
          className="text-gray-900 hover:text-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
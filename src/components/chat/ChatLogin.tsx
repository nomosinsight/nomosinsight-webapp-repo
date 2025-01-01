import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function ChatLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const { signInAsGuest, signInUser, registerUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        await registerUser(email, password);
      } else {
        await signInUser(email, password);
      }
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-4">
      <h4 className="text-sm font-medium text-gray-900 mb-2">
        {isRegistering ? 'Create an account' : 'Sign in to chat'}
      </h4>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md text-sm"
        />
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-primary text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-hover"
          >
            {isRegistering ? 'Register' : 'Sign In'}
          </button>
          <button
            type="button"
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            {isRegistering ? 'Sign in instead' : 'Create account'}
          </button>
        </div>
      </form>

      <div className="mt-4 pt-4 border-t">
        <button
          onClick={signInAsGuest}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Continue as guest
        </button>
      </div>
    </div>
  );
}
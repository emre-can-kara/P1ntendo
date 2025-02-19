import { useSelector } from 'react-redux';
import Gravatar from 'react-gravatar';

function Header() {
  const user = useSelector(state => state.client.user);

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">
          Commerce App
        </h1>
        
        {user ? (
          <div className="flex items-center space-x-4">
            <Gravatar
              email={user.email}
              size={32}
              className="rounded-full"
            />
            <span className="text-sm font-medium text-gray-700">
              {user.name}
            </span>
          </div>
        ) : (
          <div className="space-x-4">
            <a href="/login" className="text-sm font-medium text-gray-700">
              Sign in
            </a>
            <a href="/signup" className="text-sm font-medium text-blue-600">
              Sign up
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header; 
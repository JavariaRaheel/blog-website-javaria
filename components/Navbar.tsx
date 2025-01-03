import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image'; // Import Image from next/image

// Define User interface
interface User {
  name: string;
  avatar: string;
}

const Navbar = () => {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    setCurrentUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    alert('Logged out successfully!');
    router.push('/login');
  };

  const goToDashboard = () => {
    router.push('/dashboard');
  };

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push('/')}
        > 
          My Blog
        </h1>
        <div className="flex items-center space-x-6">
          {!currentUser ? (
            <>
              <button
                onClick={() => router.push('/login')}
                className="bg-white text-green-600 px-4 py-2 rounded-full hover:bg-gray-200"
              >
                 Log in 
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="bg-white text-green-600 px-4 py-2 rounded-full hover:bg-gray-200"
              >
                Signup
              </button>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <div
                className="flex items-center space-x-2 cursor-pointer hover:text-gray-700"
                onClick={goToDashboard}
              >
                <Image
                  src={currentUser.avatar}
                  alt="User Avatar"
                  className="rounded-full border border-white"
                  width={32} // Specify width for optimization
                  height={32} // Specify height for optimization
                />
                <span className="font-medium">{currentUser.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-full hover:bg-green-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

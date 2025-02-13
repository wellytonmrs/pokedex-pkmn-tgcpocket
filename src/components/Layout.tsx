import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Library, LayoutGrid, LogOut } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                to="/"
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-600"
              >
                <Library className="h-5 w-5 mr-2" />
                Library
              </Link>
              <Link
                to="/decks"
                className="flex items-center ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-blue-600"
              >
                <LayoutGrid className="h-5 w-5 mr-2" />
                Decks
              </Link>
            </div>

            <div className="flex items-center">
              {user && (
                <>
                  <span className="text-sm text-gray-700 mr-4">
                    Welcome, {user.username}
                  </span>
                  <div className="flex items-center">
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt={user.username}
                        className="h-8 w-8 rounded-full mr-4"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center mr-4">
                        <span className="text-white text-lg font-semibold">
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}

                    <button
                      onClick={handleLogout}
                      className="flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

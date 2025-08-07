import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Github } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { signInWithGitHub, signOut, user } = useAuth();
  const displayName = user?.user_metadata.user_name || user?.email;

  return (
    <nav className="fixed top-0 w-full z-40 bg-black/70 backdrop-blur-md border-b border-white/10 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            Lasilo
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { to: "/", label: "Home" },
              { to: "/create", label: "Create Post" },
              { to: "/communities", label: "Communities" },
              { to: "/community/create", label: "Create Community" },
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                className="text-gray-300 hover:text-white transition duration-200 relative group"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center space-x-3">
                {user.user_metadata.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-400"
                  />
                )}
                <span className="text-gray-300">{displayName}</span>
                <button
                  onClick={signOut}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGitHub}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
              >
                Sign In With <Github size={18} />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="text-gray-300 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur px-4 pt-4 pb-6 space-y-3">
          {[
            { to: "/", label: "Home" },
            { to: "/create", label: "Create Post" },
            { to: "/communities", label: "Communities" },
            { to: "/community/create", label: "Create Community" },
          ].map(({ to, label }) => (
            <Link
              key={label}
              onClick={() => setMenuOpen(false)}
              to={to}
              className="block text-gray-300 hover:text-white px-3 py-2 rounded-md transition"
            >
              {label}
            </Link>
          ))}

          {/* Mobile Auth */}
          <div className="mt-4">
            {user ? (
              <div className="flex items-center gap-3">
                {user.user_metadata.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-400"
                  />
                )}
                <span className="text-gray-300">{displayName}</span>
                <button
                  onClick={signOut}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGitHub}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition"
              >
                Sign In With <Github size={18} />
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-400/20 via-black to-pink-400/20 text-gray-200 border-t border-white/10 backdrop-blur-lg shadow-2xl shadow-indigo-900/20">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div className="space-y-4">
          <Link
            to="/"
            className="text-3xl font-bold font-mono hover:scale-105 transition-transform duration-300"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 animate-text">
              Lasilo
            </span>
            <span className="text-xs ml-2 bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full animate-pulse">
              BETA
            </span>
          </Link>
          <p className="text-sm text-gray-300/80 leading-relaxed">
            A vibrant community platform where creativity meets connection. Share your world with like-minded people.
          </p>
          <div className="flex space-x-4">
            {['twitter', 'instagram', 'discord'].map((social) => (
              <div 
                key={social}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
              >
                <span className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
                  {social[0].toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
            Explore
          </h3>
          <ul className="space-y-3">
            {[
              { to: "/", label: "Home" },
              { to: "/create", label: "Create Post" },
              { to: "/communities", label: "Communities" },
            ].map(({ to, label }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="group relative inline-block py-1 transition-all duration-300"
                >
                  <span className="relative z-10 text-gray-300 group-hover:text-white">
                    {label}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
            Stay Updated
          </h3>
          <p className="text-sm text-gray-300/80">
            Join our newsletter for the latest features and community highlights.
          </p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="your@email.com" 
              className="flex-grow px-4 py-2 rounded-l-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-gray-400"
            />
            <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-r-lg hover:from-pink-500 hover:to-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Strip */}
      <div className="border-t border-white/10 py-6">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-xs text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Lasilo. All rights reserved.
          </div>
          <div className="flex space-x-6">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-xs text-gray-400 hover:text-white transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Floating decoration elements */}
      <div className="absolute bottom-0 left-10 w-20 h-20 rounded-full bg-purple-500/10 blur-xl"></div>
      <div className="absolute bottom-10 right-20 w-16 h-16 rounded-full bg-pink-500/10 blur-xl"></div>
    </footer>
  );
};

export default Footer;
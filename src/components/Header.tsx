import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

// Mock Link component for demonstration - replace with your actual Link component
const Link = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>{children}</a>
);

// Mock NavigationMenu components - replace with your actual components
const NavigationMenu = ({ children }) => <div className="relative">{children}</div>;
const NavigationMenuList = ({ children, className }) => <div className={className}>{children}</div>;
const NavigationMenuItem = ({ children }) => <div className="relative">{children}</div>;
const NavigationMenuTrigger = ({ children, className }) => (
  <button className={className}>{children} <ChevronDown className="ml-1 h-3 w-3" /></button>
);
const NavigationMenuContent = ({ children }) => (
  <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
    {children}
  </div>
);
const NavigationMenuLink = ({ asChild, children }) => asChild ? children : <div>{children}</div>;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Mock location for demonstration
  const location = { pathname: "/" };

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "Discover Mallacoota", href: "/discover-mallacoota" },
    { name: "About", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  const isActiveRoute = (href) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  {/* Logo */}
<div className="flex items-center">
  <img 
    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=128&h=56&q=80" 
    alt="Hammond Properties Logo" 
    className="h-12 lg:h-14 w-auto object-contain"
  />
</div>

          {/* Desktop Navigation - Cleaned up and simplified */}
          <nav className="hidden lg:flex items-center space-x-2">
            {/* Primary Navigation Items - First 3 as direct links */}
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActiveRoute("/") 
                  ? "text-red-600 bg-red-50" 
                  : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              Home
            </Link>

            <Link
              to="/properties"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActiveRoute("/properties") 
                  ? "text-red-600 bg-red-50" 
                  : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              Properties
            </Link>

            <Link
              to="/discover-mallacoota"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActiveRoute("/discover-mallacoota") 
                  ? "text-red-600 bg-red-50" 
                  : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              Discover Mallacoota
            </Link>

            {/* Dropdown for secondary items */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 transition-all duration-200"
              >
                More
                <ChevronDown className={`ml-1 h-3 w-3 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
                  <Link
                    to="/about"
                    className={`flex flex-col px-4 py-3 hover:bg-gray-50 transition-colors duration-200 ${
                      isActiveRoute("/about") ? "bg-red-50 text-red-600" : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    <div className="text-sm font-medium">About</div>
                    <p className="text-xs text-gray-500 mt-1">
                      Learn about Hammond Properties
                    </p>
                  </Link>

                  <Link
                    to="/testimonials"
                    className={`flex flex-col px-4 py-3 hover:bg-gray-50 transition-colors duration-200 ${
                      isActiveRoute("/testimonials") ? "bg-red-50 text-red-600" : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    <div className="text-sm font-medium">Testimonials</div>
                    <p className="text-xs text-gray-500 mt-1">
                      Read guest reviews and feedback
                    </p>
                  </Link>

                  <Link
                    to="/contact"
                    className={`flex flex-col px-4 py-3 hover:bg-gray-50 transition-colors duration-200 ${
                      isActiveRoute("/contact") ? "bg-red-50 text-red-600" : "text-gray-700 hover:text-red-600"
                    }`}
                  >
                    <div className="text-sm font-medium">Contact</div>
                    <p className="text-xs text-gray-500 mt-1">
                      Get in touch with our team
                    </p>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* CTA Button - Improved styling */}
          <div className="hidden lg:block">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-sm hover:shadow-md transform hover:scale-[1.02] transition-all duration-200 ease-out">
              <Link to="/properties">View Stays</Link>
            </Button>
          </div>

          {/* Mobile Menu Button - Unchanged */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:text-red-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu - Unchanged */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <nav className="flex flex-col space-y-4 p-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-colors duration-300 font-medium ${
                    isActiveRoute(item.href) 
                      ? "text-red-600" 
                      : "text-gray-700 hover:text-red-600"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full mt-4">
                <Link to="/properties">View Stays</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

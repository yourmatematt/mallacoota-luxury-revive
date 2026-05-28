import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Use actual location from React Router
  const location = useLocation();

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "Discover Mallacoota", href: "/discover-mallacoota" },
    { name: "About", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
  ];

  const isActiveRoute = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href !== "/" && location.pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="transition-opacity hover:opacity-80">
                <img
                  src="/lovable-uploads/f810822d-1f52-487a-a0d9-5a203b6d8570.png"
                  alt="Hammond Properties"
                  className="h-12 lg:h-14 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2" aria-label="Primary">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActiveRoute("/")
                    ? "text-accent-red bg-accent-red/10"
                    : "text-gray-700 hover:text-accent-red hover:bg-gray-50"
                }`}
              >
                Home
              </Link>

              <Link
                to="/properties"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActiveRoute("/properties")
                    ? "text-accent-red bg-accent-red/10"
                    : "text-gray-700 hover:text-accent-red hover:bg-gray-50"
                }`}
              >
                Properties
              </Link>

              <Link
                to="/discover-mallacoota"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActiveRoute("/discover-mallacoota")
                    ? "text-accent-red bg-accent-red/10"
                    : "text-gray-700 hover:text-accent-red hover:bg-gray-50"
                }`}
              >
                Discover Mallacoota
              </Link>

              {/* Radix-driven dropdown — keyboard-accessible via Enter/Space and arrow keys */}
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-accent-red hover:bg-gray-50 bg-transparent">
                      More
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-56 p-2">
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/about"
                              className={`flex flex-col px-3 py-3 rounded-md hover:bg-gray-50 transition-colors duration-200 ${
                                isActiveRoute("/about") ? "bg-accent-red/10 text-accent-red" : "text-gray-700 hover:text-accent-red"
                              }`}
                            >
                              <span className="text-sm font-medium">About</span>
                              <span className="text-xs text-gray-500 mt-1">Learn about Hammond Properties</span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/testimonials"
                              className={`flex flex-col px-3 py-3 rounded-md hover:bg-gray-50 transition-colors duration-200 ${
                                isActiveRoute("/testimonials") ? "bg-accent-red/10 text-accent-red" : "text-gray-700 hover:text-accent-red"
                              }`}
                            >
                              <span className="text-sm font-medium">Testimonials</span>
                              <span className="text-xs text-gray-500 mt-1">Read guest reviews and feedback</span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        <li>
                          <NavigationMenuLink asChild>
                            <Link
                              to="/contact"
                              className={`flex flex-col px-3 py-3 rounded-md hover:bg-gray-50 transition-colors duration-200 ${
                                isActiveRoute("/contact") ? "bg-accent-red/10 text-accent-red" : "text-gray-700 hover:text-accent-red"
                              }`}
                            >
                              <span className="text-sm font-medium">Contact</span>
                              <span className="text-xs text-gray-500 mt-1">Get in touch with our team</span>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button asChild variant="accent" size="default" rounded="full">
                <Link to="/properties">View Stays</Link>
              </Button>
            </div>

            {/* Mobile Menu Button — 44×44 touch target */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 text-gray-700 hover:text-accent-red transition-colors duration-200 rounded-md"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>

          {/* Mobile Menu — touch-friendly tap targets */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
              <nav id="mobile-nav" aria-label="Mobile" className="flex flex-col space-y-1 p-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center min-h-[44px] px-3 py-2 rounded-md font-medium transition-colors duration-300 ${
                      isActiveRoute(item.href)
                        ? "text-accent-red bg-accent-red/10"
                        : "text-gray-700 hover:text-accent-red hover:bg-gray-50"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button asChild variant="accent" size="default" rounded="full" className="mt-2">
                  <Link to="/properties" onClick={() => setIsMenuOpen(false)}>View Stays</Link>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;


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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/f810822d-1f52-487a-a0d9-5a203b6d8570.png" 
              alt="Hammond Properties" 
              className="h-12 lg:h-14 w-auto"
            />
          </div>

          {/* Desktop Navigation - Updated with NavigationMenu */}
          <nav className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {/* Primary Navigation Items */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/"
                      className={`px-4 py-2 rounded-md transition-colors duration-300 font-medium ${
                        isActiveRoute("/") 
                          ? "text-accent-red bg-accent-red/10" 
                          : "text-foreground hover:text-accent-red hover:bg-accent-red/5"
                      }`}
                    >
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/properties"
                      className={`px-4 py-2 rounded-md transition-colors duration-300 font-medium ${
                        isActiveRoute("/properties") 
                          ? "text-accent-red bg-accent-red/10" 
                          : "text-foreground hover:text-accent-red hover:bg-accent-red/5"
                      }`}
                    >
                      Properties
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Dropdown for secondary items */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="!h-auto px-4 py-2 rounded-md transition-colors duration-300 font-medium text-foreground !bg-transparent !hover:bg-accent-red/5 !hover:text-accent-red !data-[state=open]:bg-accent-red/10 !data-[state=open]:text-accent-red">
                    More
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4">
                      <div className="grid grid-cols-1 gap-2">
                        <NavigationMenuLink asChild>
                          <Link
                            to="/discover-mallacoota"
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent-red/5 hover:text-accent-red focus:bg-accent-red/5 focus:text-accent-red ${
                              isActiveRoute("/discover-mallacoota") ? "bg-accent-red/10 text-accent-red" : ""
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">Discover Mallacoota</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Explore local attractions and activities
                            </p>
                          </Link>
                        </NavigationMenuLink>

                        <NavigationMenuLink asChild>
                          <Link
                            to="/about"
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent-red/5 hover:text-accent-red focus:bg-accent-red/5 focus:text-accent-red ${
                              isActiveRoute("/about") ? "bg-accent-red/10 text-accent-red" : ""
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">About</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Learn about Hammond Properties
                            </p>
                          </Link>
                        </NavigationMenuLink>

                        <NavigationMenuLink asChild>
                          <Link
                            to="/testimonials"
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent-red/5 hover:text-accent-red focus:bg-accent-red/5 focus:text-accent-red ${
                              isActiveRoute("/testimonials") ? "bg-accent-red/10 text-accent-red" : ""
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">Testimonials</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Read guest reviews and feedback
                            </p>
                          </Link>
                        </NavigationMenuLink>

                        <NavigationMenuLink asChild>
                          <Link
                            to="/contact"
                            className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent-red/5 hover:text-accent-red focus:bg-accent-red/5 focus:text-accent-red ${
                              isActiveRoute("/contact") ? "bg-accent-red/10 text-accent-red" : ""
                            }`}
                          >
                            <div className="text-sm font-medium leading-none">Contact</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Get in touch with our team
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="bg-accent-red hover:bg-accent-red/90 text-white px-6 py-2 rounded-full shadow-medium hover:shadow-strong transform hover:scale-105 transition-all duration-300 ease-out">
              <Link to="/properties">View Stays</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-strong">
            <nav className="flex flex-col space-y-4 p-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`transition-colors duration-300 font-medium ${
                    isActiveRoute(item.href) 
                      ? "text-accent-red" 
                      : "text-foreground hover:text-accent-red"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="btn-accent px-6 py-2 rounded-full mt-4" asChild>
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

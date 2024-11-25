import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Favorite", href: "#" },
    { name: "Setting", href: "#" },
  ];

  return (
    <nav className="absolute top-0 left-0 bg-teal-800  text-white w-full z-50 ">
      <div className="  max-w-screen-2xl mx-auto px-8 md:px-20">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="md:text-3xl text-xl font-bold">
              Todo Manager
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="  hover:scale-105 px-3 py-2 rounded-md text-lg font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md  hover:scale-105 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden ">
            <div className="px-2 pt-1 pb-3 space-y-1 sm:px-3 flex flex-col justify-self-center">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block  hover:text-gray-900 px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

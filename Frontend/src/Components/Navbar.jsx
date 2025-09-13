import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button"; 

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // A placeholder component in case the real Button import fails
  const UIButton = ({ className, children, ...props }) => <button className={className} {...props}>{children}</button>;
  const FinalButton = Button || UIButton;

  return (
    <nav className="w-full bg-white shadow-md border-b border-sky-100 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 relative">
        
        {/* Left Section (Logo) */}
        <div>
          <Link 
            to="/" 
            className="text-2xl font-bold text-blue-800 tracking-wide hover:text-sky-700 transition"
          >
            SmartStudentHub
          </Link>
        </div>
        
        {/* Center Section (Desktop Menu Links) - Absolutely Centered */}
        <div className="hidden md:flex items-center space-x-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link 
            to="/" 
            className={`${
              location.pathname === "/" ? "text-blue-700 font-semibold" : "text-gray-700"
            } hover:text-sky-700 transition-colors`}
          >
            HOME
          </Link>
          <Link 
            to="/about" 
            className={`${
              location.pathname === "/about" ? "text-blue-700 font-semibold" : "text-gray-700"
            } hover:text-sky-700 transition-colors`}
          >
            ABOUT US
          </Link>
          <Link 
            to="/contact" 
            className={`${
              location.pathname === "/contact" ? "text-blue-700 font-semibold" : "text-gray-700"
            } hover:text-sky-700 transition-colors`}
          >
            CONTACT
          </Link>
        </div>
        
        {/* Right Section (Auth Buttons & Hamburger) */}
        <div className="flex items-center">
            {/* Auth Buttons for Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login">
                <FinalButton 
                  variant="outline" 
                  className="text-blue-800 border-sky-200 hover:bg-sky-50 transition px-5 py-2 rounded-md"
                >
                  LOG IN
                </FinalButton>
              </Link>
              <Link to="/signup">
                <FinalButton className="bg-blue-700 text-white border border-blue-700 hover:bg-blue-800 transition px-5 py-2 rounded-md">
                  SIGN UP
                </FinalButton>
              </Link>
            </div>

            {/* Hamburger Menu Button (visible on mobile) */}
            <div className="md:hidden">
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="text-gray-700 hover:text-blue-700 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
            </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-sky-100 z-50">
          <div className="flex flex-col items-center space-y-4 px-6 py-6">
            <Link to="/" className="text-gray-700 hover:text-blue-700 transition-colors w-full text-center py-2" onClick={() => setIsMenuOpen(false)}>HOME</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-700 transition-colors w-full text-center py-2" onClick={() => setIsMenuOpen(false)}>ABOUT US</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-700 transition-colors w-full text-center py-2" onClick={() => setIsMenuOpen(false)}>CONTACT</Link>
            
            <div className="border-t border-gray-200 w-full my-2"></div>

            {/* Auth Buttons for Mobile */}
            <div className="flex flex-col w-full space-y-3">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <FinalButton variant="outline" className="text-blue-800 border-sky-200 hover:bg-sky-50 w-full px-6 py-2 rounded-md">
                  LOG IN
                </FinalButton>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <FinalButton className="bg-blue-700 text-white border border-blue-700 hover:bg-blue-800 w-full px-6 py-2 rounded-md">
                  SIGN UP
                </FinalButton>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

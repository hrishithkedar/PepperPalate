import React, { useState } from "react";
import { Svg_3 } from "./Svg";
import "./nav.css";
import { useCookies } from "react-cookie";

const Navbar = () => {
    const [cookie, setCookie] = useCookies(["token"]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };


    return (
        

<nav className="nav w-screen bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-600 fixed z-20 top-0 start-0">
            <div className="w-screen flex items-center justify-between px-4">
                <a href="/home" className="flex items-center space-x-3">
                    <Svg_3 />
                </a>
                <div className="flex items-center space-x-4 ml-auto">
                    <div className="hidden md:flex space-x-4 font-bold">
                        <a href="/home" className="block py-2 px-3 text-gray-900 rounded hover:text-[#fa1111]">Home</a>
                        <a href="/recipes" className="block py-2 px-3 text-gray-900 rounded hover:text-[#fa1111]">Recipes</a>
                    </div>
                    <button 
                        data-collapse-toggle="navbar-user" 
                        type="button" 
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
                        aria-controls="navbar-user" 
                        aria-expanded={isMobileMenuOpen} 
                        onClick={toggleMobileMenu}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="md:hidden" id="navbar-user">
                    <a href="/home" className="block py-2 px-3 text-gray-900 rounded hover:text-[#fa1111]">Home</a>
                    <a href="/recipes" className="block py-2 px-3 text-gray-900 rounded hover:text-[#fa1111]">Recipes</a>
                </div>
            )}
        </nav>

    );
};

export default Navbar;

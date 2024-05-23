import React, { useEffect, useState } from 'react';
import { Svg_3 } from './Svg';
import { useCookies } from 'react-cookie';

const SignedNavbar = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [user, setUser] = useState({});
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    let token = cookie.token;

    useEffect(() => {
        const fetchNavUser = async () => {
            const res = await fetch("https://pepperpalate-backend.onrender.com/auth/getUser", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();
            setUser(data || {});
        };

        fetchNavUser();
    }, [token]);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const onLogOut = () => {
        removeCookie('token', { path: '/' });
        alert("You are successfully Logged Out!");
    };

    let profileUrl = `/profile/${user._id}`;

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
                    <div className="relative">
                        <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                            id="user-menu-button"
                            aria-expanded={isDropdownOpen}
                            onClick={toggleDropdown}
                        >
                            <span className="sr-only">Open user menu</span>
                            <img className="w-8 h-8 rounded-full" src={user.profile || "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="} alt="user photo" />
                        </button>
                        <div
                            className={`absolute right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${isDropdownOpen ? '' : 'hidden'}`}
                            id="user-dropdown"
                        >
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-900 dark:text-white">{user.username || "Anonymous"}</span>
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user.email || "Email not available"}</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                <li>
                                    <a href={profileUrl} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Your Profile</a>
                                </li>
                                <li>
                                    <a onClick={onLogOut} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</a>
                                </li>
                            </ul>
                        </div>
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

export default SignedNavbar;

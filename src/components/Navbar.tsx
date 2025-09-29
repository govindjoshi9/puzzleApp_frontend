import React from "react";
import { NavLink } from "react-router-dom";

import { Home, User, Info, Flame } from 'lucide-react';
import { routeHome, routeUser, routeRule, routeAbout } from '../utils/Routes';

const navItems = [
    { name: 'Home', path: routeHome, icon: <Home size={20} /> },
    { name: 'Rule', path: routeRule, icon: <Info size={20} /> },
    { name: 'User', path: routeUser, icon: <User size={20} /> },
    { name: 'About', path: routeAbout, icon: <Flame size={20} /> },
];

function Navbar() {
    return (
        <>
            <div className="hidden lg:flex fixed left-0 top-0 h-full w-56 bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-xl border-r border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-4 z-5">
                <div className="flex flex-col gap-4 w-full">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 w-full
                                ${isActive ? "bg-clr-primary-teal text-clr-neutral-light-gray" : "hover:bg-clr-primary-teal/10 text-clr-primary-teal"}`
                            }
                        >
                            <div className="relative">
                                {item.icon}
                            </div>
                            <span className="select-none">{item.name}</span>
                        </NavLink>
                    ))}
                </div>
            </div>

            <div className="lg:hidden fixed bottom-0 left-0 w-full h-10 p-0 m-0 z-5 bg-gradient-to-b from-white/5 to-white/2 backdrop-blur-xl border-t border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex justify-around items-center px-0 py-0">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 px-0 w-full h-full
                            ${isActive ? "bg-clr-primary-teal text-clr-neutral-light-gray" : "hover:bg-clr-primary-teal/10 text-clr-primary-teal"}`
                        }
                    >
                        <div className="relative">
                            {item.icon}
                        </div>
                    </NavLink>
                ))}
            </div>
        </>
    );
}

export default React.memo(Navbar);

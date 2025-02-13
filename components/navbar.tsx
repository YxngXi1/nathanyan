"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

import { useScrollPosition } from '@n8tb1t/use-scroll-position'

import { FaBars } from 'react-icons/fa';

const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

const links = [
    {
        name: "Projects",
        link: "/projects",
        id: "projects",
        priority: false
    },
    {
        name: "Resume",
        link: "/oppurtunities",
        id: "oppurtunities",
        priority: false
    },
];

const scrollPosToPercentage = (scrollPos: number) => {
    const currScroll = clamp(Math.abs(scrollPos), 0, 80) * 100/80; // Goes opaque after 80 pixels scrolled (generally 1 scroll wheel click)
    return currScroll / 100; // Convert to percentage
}

interface HeaderProps {
    home?: boolean;
}

export default function Header({ home }: HeaderProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    // Initialize opacity based on whether it's the home page
    const initialOpacity = home ? 0 : 1;
    const [opacity, setOpacity] = useState(initialOpacity);

    useScrollPosition(({ currPos }) => {
        if (home && !showDropdown) {
            const newOpacity = scrollPosToPercentage(currPos.y);
            setOpacity(newOpacity);
        }
    });

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 200) {
                setOpacity(0); // Set opacity to 0 after 200px scroll
            } else {
                // Calculate opacity based on scroll position for a smooth transition
                const newOpacity = 1 - offset / 200;
                setOpacity(home ? newOpacity : 1);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [home]);

    return (
        <div className="fixed z-50 w-screen transition-opacity duration-500 ease-in-out" style={{ opacity: opacity }}>
            <nav 
                className={`bg-transparent flex flex-col items-center py-2 lg:py-4 w-full transition-colors duration-500 ease-in-out`}
            >
                <div className="container px-4 lg:flex lg:items-center lg:justify-center w-full">
                    <button
                        className="border border-solid border-gray-200 px-3 py-1 rounded text-gray-200 opacity-50 hover:opacity-75 lg:hidden cursor-pointer"
                        aria-label="Menu"
                        data-test-id="navbar-menu"
                        onClick={
                            () => {
                                setShowDropdown(!showDropdown);
                            }}
                    >
                        <FaBars/>
                    </button>

                    <div className={`${showDropdown ? "flex" : "hidden"} lg:flex flex-col lg:flex-row mt-3 lg:mt-0`} data-test-id="navbar">
                        {
                            links.map(({ name, link, priority, id }) =>
                                <Link key={name} href={link}>
                                    <div onClick={() => setShowDropdown(false)} className={`${priority ? "text-emerald-300 hover:bg-emerald-900 hover:text-white text-center border border-solid border-emerald-900 mt-1 lg:mt-0 lg:ml-1 " : "text-gray-300 hover:bg-gray-200/25 hover:text-white"} text-base p-2 lg:px-4 lg:mx-2 rounded duration-300 transition-colors`}>
                                        {name}
                                    </div>
                                </Link>
                            )
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}
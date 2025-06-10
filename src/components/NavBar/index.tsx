'use client';

import Link from "next/link";

export const NavBar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    MyApp
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
                    </li>
                    <li>
                        <Link href="/dsa" className="text-gray-300 hover:text-white">DSA</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
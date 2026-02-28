import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router';
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineBell } from 'react-icons/hi';
import { HiMenuAlt2, HiX } from 'react-icons/hi';
import userImg from "../assets/user.png";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen p-2 md:p-4 gap-4 bg-white relative">
            
            {/* Sidebar Logic */}
            <div className={`
                /* Mobile: Fixed overlay */
                fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
                /* Desktop: Sticky in-flow */
                md:relative md:translate-x-0 md:flex md:sticky md:top-4 md:h-[calc(100vh-2rem)]
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                bg-[#F7F7F7] md:bg-transparent shadow-2xl md:shadow-none
            `}>
                <Sidebar />
                
                {/* Close btn for mobile - positioned inside the sidebar for better visibility */}
                <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-green-900"
                >
                    <HiX size={24} />
                </button>
            </div>

            {/* Mobile Dark Overlay (Backdrop) */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col gap-4 w-full min-w-0">
                <header className="h-auto md:h-16 bg-[#F7F7F7] flex flex-col md:flex-row items-center rounded-2xl p-4 md:px-10 justify-between gap-4">
                    <div className="flex items-center justify-between w-full md:w-auto gap-4">
                        {/* Mobile Menu Toggle */}
                        <button 
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-2 bg-white rounded-xl text-gray-600 shadow-sm active:scale-95 transition-transform"
                        >
                            <HiMenuAlt2 size={24} />
                        </button>

                        {/* Search Bar */}
                        <label className="input bg-white flex items-center gap-2 px-3 py-1 rounded-xl border border-transparent focus-within:border-green-900/20 transition-all flex-1 md:flex-none">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <path d="m21 21-4.3-4.3"></path>
                                </g>
                            </svg>
                            <input type="search" className="grow text-sm outline-none bg-transparent" placeholder="Search" />
                            <div className="hidden lg:flex gap-1">
                                <kbd className="kbd kbd-sm text-[10px]">⌘</kbd>
                                <kbd className="kbd kbd-sm text-[10px]">K</kbd>
                            </div>
                        </label>
                    </div>

                    {/* Top Right Actions */}
                    <div className="flex items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0">
                       <p className='w-10 h-10 rounded-full bg-white flex justify-center items-center shadow-sm cursor-pointer hover:bg-gray-50'><MdOutlineEmail size={20}/></p> 
                       <p className='w-10 h-10 rounded-full bg-white flex justify-center items-center shadow-sm cursor-pointer hover:bg-gray-50'><HiOutlineBell size={20}/></p> 
                       <p className='w-10 h-10 rounded-full bg-white overflow-hidden border border-gray-100'><img src={userImg} alt="user" className="w-full h-full object-cover" /></p> 
                       <div className="hidden sm:block">
                            <h1 className='text-[#606060] text-[13px] font-bold leading-tight'>Totok Michael</h1>
                            <h1 className='text-[#B7B7B7] text-[11px]'>tmichael20@mail.com</h1>
                        </div>
                    </div>
                </header>

                {/* Main Page Content */}
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
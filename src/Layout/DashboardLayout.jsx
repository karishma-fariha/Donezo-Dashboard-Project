import React from 'react';
import Sidebar from '../Components/Sidebar';
import { Outlet } from 'react-router';
import { MdOutlineEmail } from "react-icons/md";
import { HiOutlineBell } from 'react-icons/hi';
import user from "../assets/user.png"

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen p-4 gap-4 bg-white">
            <div className="sticky top-0 h-screen">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col gap-4">
                <header className="h-16 bg-[#F7F7F7] flex items-center rounded-2xl p-10 justify-between">
                    {/* search */}
                    <label className="input bg-white">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" className="grow" placeholder="Search" />
                        <kbd className="kbd kbd-sm">⌘</kbd>
                        <kbd className="kbd kbd-sm">K</kbd>
                    </label>

                    


                    <div className="flex items-center gap-3">
                       <p className='w-10 h-10 rounded-full bg-white flex justify-center items-center'><MdOutlineEmail size={20}/></p> 
                       <p className='w-10 h-10 rounded-full bg-white flex justify-center items-center'><HiOutlineBell size={20}/></p> 
                       <p className='w-10 h-10 rounded-full bg-white flex justify-center items-center'><img src={user} alt="" /></p> 
                       <div>
                        <h1 className='text-[#606060] text-[13px]'>Totok Michael</h1>
                        <h1 className='text-[#B7B7B7] text-[11px]'>tmichael20@mail.com</h1>
                        </div>
                    </div>
                </header>

                {/* Scrollable Content */}
                <main className="">
                    <div className="">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
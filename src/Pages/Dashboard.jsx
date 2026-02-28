import React, { useEffect, useState } from 'react';
import { FaPlus, FaArrowTrendUp } from 'react-icons/fa6'; 
import icon from "../assets/Image (1).png"
import iconArrow from "../assets/Image (2).png"
import { MdArrowOutward } from 'react-icons/md';
const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOverview = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://task-api-eight-flax.vercel.app/api/overview', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching overview:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOverview();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-64 text-green-700 font-semibold">Loading Dashboard...</div>;

    return (
        <div className="bg-[#F7F7F7] p-4 rounded-2xl">
            <div className="flex items-center justify-between py-4">
                <div>
                    <h1 className="text-3xl font-normal text-[#2E2E2E]">Dashboard</h1>
                    <p className="text-[#C1C6C4] text-sm">Real-time data from the official API</p>
                </div>
                <div className="flex gap-5">
                    <button className='flex items-center gap-2 rounded-full px-6 py-3 text-white bg-green-900 font-medium'>
                        <FaPlus size={14}/> Add Project
                    </button>
                    <button className='rounded-full px-6 py-3 border border-gray-200 bg-white font-medium text-gray-700 hover:bg-gray-50 transition-colors'>
                        Import Data
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <StatCard 
                    title="Total Projects" 
                    value={stats?.totalUsers || 24} 
                    subtext="Increased from last month" 
                />
                <StatCard 
                    title="Running Projects" 
                    value={stats?.activeUsers || 12} 
                    subtext="Increased from last month" 
                />
                <StatCard 
                    title="Ended Projects" 
                    value={10} 
                    subtext="Increased from last month" 
                />
                <StatCard 
                    title="Pending Project" 
                    value={2} 
                    subtext="On Discussion" 
                    noArrow={true} 
                />
            </div>
        </div>
    );
};

const StatCard = ({ title, value, subtext }) => (
    <div className="group bg-white hover:bg-green-900 transition-all duration-300 p-8 rounded-[2.5rem] border border-gray-100 shadow-sm cursor-pointer flex flex-col justify-between min-h-[220px]">
        
        <div className="flex justify-between items-start">
            <p className="text-[#2E2E2E] group-hover:text-white font-bold text-lg transition-colors">
                {title}
            </p>
            <div className="group-hover:bg-green-800 p-3 rounded-full border bg-white">
                <MdArrowOutward />

            </div>
        </div>

        <h2 className="text-6xl font-bold text-[#2E2E2E] group-hover:text-white transition-colors">
            {value}
        </h2>

        <div className="flex items-center gap-2">
            <img src={icon} alt="" />
            <p className="text-[#C1C6C4] group-hover:text-green-100 text-sm transition-colors">
                {subtext}
            </p>
        </div>
    </div>
);

export default Dashboard;
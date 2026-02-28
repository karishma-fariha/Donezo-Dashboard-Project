import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, DollarSign, TrendingUp, ArrowUpRight, Target, Activity } from 'lucide-react';

const Overview = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOverview = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://task-api-eight-flax.vercel.app/api/overview', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOverview();
    }, []);

    if (loading) return <div className="p-10 text-green-700 font-bold text-center animate-pulse">Gathering Intelligence...</div>;

    const stats = [
        { 
            label: "Total Users", 
            value: data.totalUsers.toLocaleString(), 
            icon: <Users size={24} />, 
            color: "text-blue-600", 
            bg: "bg-blue-50" 
        },
        { 
            label: "Active Now", 
            value: data.activeUsers.toLocaleString(), 
            icon: <UserCheck size={24} />, 
            color: "text-green-600", 
            bg: "bg-green-50" 
        },
        { 
            label: "Total Revenue", 
            value: `$${data.revenue.toLocaleString()}`, 
            icon: <DollarSign size={24} />, 
            color: "text-orange-600", 
            bg: "bg-orange-50" 
        },
        { 
            label: "Growth Rate", 
            value: `${data.growth}%`, 
            icon: <TrendingUp size={24} />, 
            color: "text-purple-600", 
            bg: "bg-purple-50" 
        }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="bg-[#F7F7F7] p-4 md:p-6 space-y-6 md:space-y-8 min-h-screen overflow-x-hidden"
        >
            {/* Header Area - Responsive Flex */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-medium text-[#2E2E2E]">System Overview</h1>
                    <p className="text-[#C1C6C4] text-xs md:text-sm mt-1">Global performance and user acquisition metrics</p>
                </div>
                <div className="bg-green-900 text-white px-4 py-2 rounded-2xl text-[10px] md:text-xs font-bold flex items-center gap-2 self-end sm:self-start">
                    <Activity size={14} /> LIVE UPDATES
                </div>
            </div>

            {/* Main Stats Cards - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((item, idx) => (
                    <motion.div 
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group"
                    >
                        <div className={`${item.bg} ${item.color} w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6`}>
                            {item.icon}
                        </div>
                        <p className="text-[#C1C6C4] text-[10px] md:text-xs font-bold uppercase tracking-widest">{item.label}</p>
                        <h2 className="text-3xl md:text-4xl font-bold text-[#2E2E2E] mt-2 group-hover:text-green-900 transition-colors">
                            {item.value}
                        </h2>
                        {idx === 3 && (
                            <div className="mt-3 md:mt-4 flex items-center gap-1 text-green-600 font-bold text-[10px] md:text-xs">
                                <ArrowUpRight size={14} /> +2.4% vs last week
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Revenue Goal Progress - Responsive Padding/Layout */}
                <div className="lg:col-span-2 bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6 md:mb-10">
                        <h3 className="font-bold text-lg md:text-xl text-[#2E2E2E]">Revenue Milestone</h3>
                        <Target className="text-gray-300" />
                    </div>
                    
                    <div className="space-y-6 md:space-y-8">
                        <div>
                            <div className="flex justify-between text-xs md:text-sm font-bold mb-3">
                                <span className="text-gray-400">Current Progress</span>
                                <span className="text-green-900">78%</span>
                            </div>
                            <div className="w-full h-3 md:h-4 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: '78%' }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-green-900 rounded-full"
                                />
                            </div>
                        </div>
                        
                        {/* Inner Grid for Target/Gap */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 md:p-6 bg-gray-50 rounded-[1.5rem] md:rounded-[2rem]">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Target Revenue</p>
                                <p className="text-lg md:text-xl font-bold text-[#2E2E2E]">$500,000</p>
                            </div>
                            <div className="p-4 md:p-6 bg-gray-50 rounded-[1.5rem] md:rounded-[2rem]">
                                <p className="text-[10px] font-bold text-gray-400 uppercase">Gap to Goal</p>
                                <p className="text-lg md:text-xl font-bold text-orange-600">-$254,110</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Status Summary - Responsive Font Sizes */}
                <div className="bg-green-900 p-8 md:p-10 rounded-[2rem] md:rounded-[3rem] text-white flex flex-col justify-between min-h-[320px] lg:min-h-0">
                    <div>
                        <h3 className="font-bold text-lg md:text-xl mb-2">User Retention</h3>
                        <p className="text-green-200 text-xs md:text-sm opacity-80">Active users vs Total registered accounts</p>
                    </div>
                    
                    <div className="py-6 md:py-10">
                        <h2 className="text-5xl md:text-6xl font-bold">
                            {data ? ((data.activeUsers / data.totalUsers) * 100).toFixed(1) : 0}%
                        </h2>
                        <p className="text-green-300 font-medium mt-2 italic text-xs md:text-sm">Retention Score</p>
                    </div>

                    <button className="w-full bg-white text-green-900 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-sm hover:bg-green-50 active:scale-[0.98] transition-all">
                        Download Full Report
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Overview;
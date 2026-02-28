import React, { useEffect, useState } from 'react';
import { FaPlus, FaArrowTrendUp } from 'react-icons/fa6';
import { Package, MoreHorizontal, Plus } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://task-api-eight-flax.vercel.app/api/dashboard', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setDashboardData(data);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="p-10 text-green-700 font-bold animate-pulse text-center">Loading...</div>;

    const { overview, users, analytics, products } = dashboardData;

    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="bg-[#F7F7F7] p-6 space-y-8"
        >
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-medium text-[#2E2E2E]">Dashboard</h1>
                    <p className="text-[#C1C6C4] text-sm">Real-time data from the official API</p>
                </div>
                <div className="flex gap-4">
                    <button className='flex items-center gap-2 rounded-full px-6 py-3 text-white bg-green-900 font-medium hover:opacity-90 transition-all'>
                        <Plus size={18}/> Add Project
                    </button>
                    <button className='rounded-full px-6 py-3 border border-gray-200 bg-white font-medium text-gray-700'>
                        Import Data
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Projects" value={overview?.totalUsers} subtext="Increased from last month" />
                <StatCard title="Running Projects" value={overview?.activeUsers} subtext="Increased from last month" />
                <StatCard title="Ended Projects" value={10} subtext="Increased from last month" />
                <StatCard title="Pending Project" value={2} subtext="On Discussion" noArrow />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-bold text-xl text-[#2E2E2E]">Analytics</h3>
                            <p className="text-green-600 font-bold text-2xl mt-1">74%</p>
                        </div>
                        <div className="flex gap-4 text-xs font-bold text-gray-400">
                            <span>W</span><span className="text-green-900 border-b-2 border-green-900">M</span><span>S</span>
                        </div>
                    </div>
                    
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analytics}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#14532d" stopOpacity={0.2}/>
                                        <stop offset="95%" stopColor="#14532d" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                                <XAxis 
                                    dataKey="date" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#C1C6C4', fontSize: 12}}
                                    dy={10}
                                    tickFormatter={(str) => {
                                        const date = new Date(str);
                                        return date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
                                    }}
                                />
                                <YAxis hide />
                                <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="views" stroke="#14532d" strokeWidth={4} fillOpacity={1} fill="url(#colorViews)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl text-[#2E2E2E]">Product Sales</h3>
                        <MoreHorizontal className="text-gray-300" />
                    </div>
                    <div className="space-y-5">
                        {products?.map((product) => (
                            <div key={product.id} className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-green-50 transition-colors">
                                        <Package size={20} className="text-green-900" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-[#2E2E2E] text-sm">{product.name}</p>
                                        <p className="text-xs text-gray-400 capitalize">{product.category}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-700 text-sm">${product.price}</p>
                                    <p className="text-[10px] text-gray-400">{product.sales} Sales</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* MODIFIED: Animated Table for Working On Section */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl text-[#2E2E2E]">Working on</h3>
                    <MoreHorizontal className="text-gray-300 cursor-pointer" />
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[#C1C6C4] text-sm uppercase tracking-wider border-b border-gray-50">
                                <th className="pb-4 font-medium px-4">Name</th>
                                <th className="pb-4 font-medium px-4">Email</th>
                                <th className="pb-4 font-medium px-4">Join Date</th>
                                <th className="pb-4 font-medium px-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users?.map((user, index) => (
                                <motion.tr 
                                    key={user.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="hover:bg-gray-50/50 transition-colors group"
                                >
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-900 flex items-center justify-center font-bold text-xs">
                                                {user.name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-[#2E2E2E] text-sm">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-500">{user.email}</td>
                                    <td className="py-4 px-4 text-sm text-gray-500">{user.joinDate}</td>
                                    <td className="py-4 px-4">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            user.status === 'active' 
                                            ? 'bg-green-50 text-green-600' 
                                            : 'bg-orange-50 text-orange-600'
                                        }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
};

const StatCard = ({ title, value, subtext, noArrow }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="group bg-white hover:bg-green-900 transition-all duration-300 p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between min-h-[220px]"
    >
        <div className="flex justify-between items-start">
            <p className="text-[#2E2E2E] group-hover:text-white font-bold text-lg">{title}</p>
            <div className="bg-[#F7F7F7] group-hover:bg-green-800 p-2 rounded-xl transition-colors">
                <Plus className="text-gray-400 group-hover:text-white" size={12} />
            </div>
        </div>
        <h2 className="text-6xl font-bold text-[#2E2E2E] group-hover:text-white transition-colors">{value}</h2>
        <div className="flex items-center gap-2">
            {!noArrow && <FaArrowTrendUp className="text-green-600 group-hover:text-green-300" size={14} />}
            <p className="text-[#C1C6C4] group-hover:text-green-100 text-sm">{subtext}</p>
        </div>
    </motion.div>
);

export default Dashboard;
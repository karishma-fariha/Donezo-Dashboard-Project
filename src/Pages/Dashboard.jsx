import React, { useEffect, useState } from 'react';
import { FaArrowTrendUp } from 'react-icons/fa6';
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
            className="bg-[#F7F7F7] p-4 md:p-6 space-y-6 md:space-y-8 overflow-x-hidden"
        >
            {/* Header - Stacked on mobile, side-by-side on md+ */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
                <div>
                    <h1 className="text-2xl md:text-3xl font-medium text-[#2E2E2E]">Dashboard</h1>
                    <p className="text-[#C1C6C4] text-xs md:text-sm">Real-time data from the official API</p>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-4 w-full md:w-auto">
                    <button className='flex-1 md:flex-none flex items-center justify-center gap-2 rounded-full px-4 md:px-6 py-2 md:py-3 text-white bg-green-900 font-medium hover:opacity-90 transition-all text-sm md:text-base'>
                        <Plus size={18}/> <span className="whitespace-nowrap">Add Project</span>
                    </button>
                    <button className='flex-1 md:flex-none rounded-full px-4 md:px-6 py-2 md:py-3 border border-gray-200 bg-white font-medium text-gray-700 text-sm md:text-base'>
                        Import
                    </button>
                </div>
            </div>

            {/* Stats Grid - 1 col on mobile, 2 on md, 4 on lg */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <StatCard title="Total Users" value={overview?.totalUsers} subtext="Increased from last month" />
                <StatCard title="Active Users" value={overview?.activeUsers} subtext="Increased from last month" />
                <StatCard title="Revenue" value={10} subtext="Increased from last month" />
                <StatCard title="Growth" value={2} subtext="On Discussion" noArrow />
            </div>

            {/* Charts & Sales - Stacked on mobile, 2:1 ratio on lg */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Analytics Area Chart */}
                <div className="lg:col-span-2 bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="font-bold text-lg md:text-xl text-[#2E2E2E]">Analytics</h3>
                            <p className="text-green-600 font-bold text-xl md:text-2xl mt-1">74%</p>
                        </div>
                        <div className="flex gap-4 text-xs font-bold text-gray-400">
                            <span>W</span><span className="text-green-900 border-b-2 border-green-900">M</span><span>S</span>
                        </div>
                    </div>
                    
                    <div className="h-48 md:h-64 w-full">
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
                                    tick={{fill: '#C1C6C4', fontSize: 10}}
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

                {/* Product Sales List */}
                <div className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg md:text-xl text-[#2E2E2E]">Product Sales</h3>
                        <MoreHorizontal className="text-gray-300" />
                    </div>
                    <div className="space-y-5">
                        {products?.map((product) => (
                            <div key={product.id} className="flex items-center justify-between group cursor-pointer">
                                <div className="flex items-center gap-3 md:gap-4">
                                    <div className="p-2 md:p-3 bg-gray-50 rounded-xl md:rounded-2xl group-hover:bg-green-50 transition-colors">
                                        <Package size={18} className="text-green-900" />
                                    </div>
                                    <div className="max-w-[100px] md:max-w-none">
                                        <p className="font-bold text-[#2E2E2E] text-xs md:text-sm truncate">{product.name}</p>
                                        <p className="text-[10px] md:text-xs text-gray-400 capitalize">{product.category}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-700 text-xs md:text-sm">${product.price}</p>
                                    <p className="text-[9px] md:text-[10px] text-gray-400">{product.sales} Sales</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Table Section - Enabled Horizontal Scroll for mobile */}
            <div className="bg-white p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg md:text-xl text-[#2E2E2E]">Working on</h3>
                    <MoreHorizontal className="text-gray-300 cursor-pointer" />
                </div>
                
                <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="text-[#C1C6C4] text-xs uppercase tracking-wider border-b border-gray-50">
                                <th className="pb-4 font-medium px-4">Name</th>
                                <th className="pb-4 font-medium px-4">Email</th>
                                <th className="pb-4 font-medium px-4">Join Date</th>
                                <th className="pb-4 font-medium px-4 text-center">Status</th>
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
                                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-900 flex items-center justify-center font-bold text-xs shrink-0">
                                                {user.name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-[#2E2E2E] text-sm whitespace-nowrap">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4 text-sm text-gray-500 whitespace-nowrap">{user.email}</td>
                                    <td className="py-4 px-4 text-sm text-gray-500 whitespace-nowrap">{user.joinDate}</td>
                                    <td className="py-4 px-4 text-center">
                                        <span className={`px-3 md:px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
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
        className="group bg-white hover:bg-green-900 transition-all duration-300 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col justify-between min-h-[180px] md:min-h-[220px]"
    >
        <div className="flex justify-between items-start">
            <p className="text-[#2E2E2E] group-hover:text-white font-bold text-base md:text-lg">{title}</p>
            <div className="bg-[#F7F7F7] group-hover:bg-green-800 p-2 rounded-xl transition-colors">
                <Plus className="text-gray-400 group-hover:text-white" size={12} />
            </div>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-[#2E2E2E] group-hover:text-white transition-colors">{value}</h2>
        <div className="flex items-center gap-2">
            {!noArrow && <FaArrowTrendUp className="text-green-600 group-hover:text-green-300" size={14} />}
            <p className="text-[#C1C6C4] group-hover:text-green-100 text-xs md:text-sm">{subtext}</p>
        </div>
    </motion.div>
);

export default Dashboard;
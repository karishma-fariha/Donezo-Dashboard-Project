import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MoreHorizontal, Mail, Calendar, UserCheck } from 'lucide-react';

const User = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://task-api-eight-flax.vercel.app/api/users', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <div className="p-10 text-green-700 font-bold animate-pulse text-center">Loading User Details...</div>;

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-[#F7F7F7] p-4 md:p-6 min-h-screen"
        >
            {/* Header Section */}
            <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl font-medium text-[#2E2E2E]">User Details</h1>
                <p className="text-[#C1C6C4] text-xs md:text-sm mt-1">Manage and view all registered platform members</p>
            </div>

            {/* Container */}
            <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="font-bold text-lg md:text-xl text-[#2E2E2E]">All Users</h3>
                    <div className="px-4 py-2 bg-gray-50 rounded-full text-xs font-medium text-gray-500">
                        Total: {users.length}
                    </div>
                </div>

                {/* Desktop Table View (Hidden on Mobile) */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[#C1C6C4] text-xs uppercase tracking-[0.15em] border-b border-gray-50">
                                <th className="py-6 px-8 font-semibold">User Info</th>
                                <th className="py-6 px-8 font-semibold">Email Address</th>
                                <th className="py-6 px-8 font-semibold">Join Date</th>
                                <th className="py-6 px-8 font-semibold">Status</th>
                                <th className="py-6 px-8 font-semibold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {users.map((user, index) => (
                                <motion.tr 
                                    key={user.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="hover:bg-gray-50/80 transition-all group"
                                >
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">
                                                {user.name.charAt(0)}
                                            </div>
                                            <span className="font-bold text-[#2E2E2E] text-sm group-hover:text-green-900 transition-colors">
                                                {user.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <Mail size={14} className="text-gray-300" />
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <Calendar size={14} className="text-gray-300" />
                                            {new Date(user.joinDate).toLocaleDateString('en-US', { 
                                                year: 'numeric', month: 'short', day: 'numeric' 
                                            })}
                                        </div>
                                    </td>
                                    <td className="py-5 px-8">
                                        <span className={`flex items-center w-fit gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            user.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                                        }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="py-5 px-8 text-center">
                                        <button className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-gray-400 hover:text-green-900">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View (Hidden on Desktop) */}
                <div className="md:hidden divide-y divide-gray-100">
                    {users.map((user, index) => (
                        <div key={user.id} className="p-6 flex flex-col gap-4">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-bold text-sm">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-[#2E2E2E]">{user.name}</h4>
                                        <span className={`flex items-center gap-1.5 mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider w-fit ${
                                            user.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'
                                        }`}>
                                            {user.status}
                                        </span>
                                    </div>
                                </div>
                                <button className="p-2 text-gray-400">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Mail size={14} className="text-gray-300" />
                                    {user.email}
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Calendar size={14} className="text-gray-300" />
                                    Joined {new Date(user.joinDate).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Table Footer */}
                <div className="p-6 bg-gray-50/30 text-center">
                    <button className="text-sm font-bold text-green-900 hover:underline active:scale-95 transition-transform">
                        View More Users
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default User;
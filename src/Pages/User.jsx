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
            className="bg-[#F7F7F7] p-6 min-h-screen"
        >
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl font-medium text-[#2E2E2E]">User Details</h1>
                <p className="text-[#C1C6C4] text-sm mt-1">Manage and view all registered platform members</p>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                    <h3 className="font-bold text-xl text-[#2E2E2E]">All Users</h3>
                    <div className="flex gap-2">
                        <div className="px-4 py-2 bg-gray-50 rounded-full text-xs font-medium text-gray-500">
                            Total: {users.length}
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
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
                                    {/* Name & Avatar */}
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

                                    {/* Email */}
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <Mail size={14} className="text-gray-300" />
                                            {user.email}
                                        </div>
                                    </td>

                                    {/* Join Date */}
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-2 text-gray-500 text-sm">
                                            <Calendar size={14} className="text-gray-300" />
                                            {new Date(user.joinDate).toLocaleDateString('en-US', { 
                                                year: 'numeric', 
                                                month: 'short', 
                                                day: 'numeric' 
                                            })}
                                        </div>
                                    </td>

                                    {/* Status Badge */}
                                    <td className="py-5 px-8">
                                        <div className="flex items-center gap-2">
                                            <span className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                                user.status === 'active' 
                                                ? 'bg-green-50 text-green-600' 
                                                : 'bg-red-50 text-red-500'
                                            }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                {user.status}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Action Button */}
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
                
                {/* Table Footer */}
                <div className="p-6 bg-gray-50/30 text-center">
                    <button className="text-sm font-bold text-green-900 hover:underline">
                        View More Users
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default User;
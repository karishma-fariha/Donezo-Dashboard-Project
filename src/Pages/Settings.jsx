import React from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Bell, Shield, Moon, ChevronRight } from 'lucide-react';
import ThemeToggle from '../Components/ThemeToggle';

const Settings = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-[#F7F7F7] p-6 space-y-8 min-h-screen"
        >
            <div>
                <h1 className="text-3xl font-medium text-[#2E2E2E]">Settings</h1>
                <p className="text-[#C1C6C4] text-sm mt-1">Manage your account preferences and security</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar Tabs */}
                <div className="space-y-2">
                    <SettingTab icon={<User size={18}/>} label="General Profile" active />
                    <SettingTab icon={<Lock size={18}/>} label="Security & Password" />
                    <SettingTab icon={<Bell size={18}/>} label="Notifications" />
                    <SettingTab icon={<Shield size={18}/>} label="Data Privacy" />
                </div>

                {/* Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-xl text-[#2E2E2E] mb-6">Account Information</h3>
                        <div className="space-y-4">
                            <InputGroup label="Full Name" placeholder="John Doe" />
                            <InputGroup label="Email Address" placeholder="john@example.com" />
                            <div className="pt-4">
                                <button className="bg-green-900 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:bg-green-800 transition-all">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const SettingTab = ({ icon, label, active }) => (
    <div className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${active ? 'bg-green-900 text-white shadow-lg shadow-green-900/20' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>
        <div className="flex items-center gap-3">
            {icon}
            <span className="font-bold text-sm">{label}</span>
        </div>
        <ChevronRight size={14} opacity={active ? 1 : 0.3} />
    </div>
);

const InputGroup = ({ label, placeholder }) => (
    <div className="space-y-1">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">{label}</label>
        <input type="text" placeholder={placeholder} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-green-900/10 transition-all" />
    </div>
);

export default Settings;
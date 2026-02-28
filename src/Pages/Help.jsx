import React from 'react';
import { motion } from 'framer-motion';
import { Search, MessageCircle, FileText, LifeBuoy, ExternalLink, PlayCircle, BookOpen, ShieldQuestion } from 'lucide-react';

const Help = () => {
    return (
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="bg-[#F7F7F7] p-6 space-y-10 min-h-screen"
        >
            {/* Minimalist Professional Banner */}
            <div className="relative py-16 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl mx-auto space-y-4"
                >
                    <span className="bg-green-100 text-green-900 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">
                        Support Center
                    </span>
                    <h1 className="text-5xl font-bold text-[#2E2E2E] tracking-tight">
                        How can we help you <span className="text-green-900">today?</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed">
                        Search our knowledge base for answers or reach out to our specialist team.
                    </p>

                    {/* Sophisticated Search Bar */}
                    <div className="relative max-w-xl mx-auto mt-10 group">
                        <div className="absolute inset-0 bg-green-900/5 blur-xl group-hover:bg-green-900/10 transition-all rounded-3xl" />
                        <div className="relative flex items-center bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all px-6 py-2">
                            <Search className="text-gray-300" size={20} />
                            <input 
                                type="text" 
                                placeholder="Describe your issue (e.g. 'Reset password')" 
                                className="w-full p-4 text-gray-700 focus:outline-none bg-transparent placeholder:text-gray-300 font-medium"
                            />
                            <kbd className="hidden md:block bg-gray-50 border border-gray-200 text-gray-400 px-2 py-1 rounded text-[10px] font-bold">
                                ⌘ K
                            </kbd>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <HelpCard icon={<BookOpen />} title="Guides" desc="Step-by-step tutorials for every tool." color="text-blue-600" bg="bg-blue-50" />
                <HelpCard icon={<ShieldQuestion />} title="FAQ" desc="Common questions answered instantly." color="text-purple-600" bg="bg-purple-50" />
                <HelpCard icon={<PlayCircle />} title="Videos" desc="Short walkthroughs of core features." color="text-red-600" bg="bg-red-50" />
                <HelpCard icon={<MessageCircle />} title="Chat" desc="Live 24/7 support for Pro users." color="text-green-600" bg="bg-green-50" />
            </div>

            {/* Featured Articles Section */}
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-8 px-2">
                    <h3 className="font-bold text-2xl text-[#2E2E2E]">Popular Articles</h3>
                    <button className="text-green-900 text-sm font-bold flex items-center gap-2 hover:underline">
                        Browse All <ExternalLink size={14} />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    <ArticleLink title="Getting started with your workspace" time="4 min read" />
                    <ArticleLink title="Connecting your API to the Dashboard" time="8 min read" />
                    <ArticleLink title="Managing team permissions and roles" time="5 min read" />
                    <ArticleLink title="Understanding your billing and invoices" time="3 min read" />
                </div>
            </div>

            {/* Bottom Contact Section */}
            <div className="text-center py-10">
                <p className="text-gray-400 font-medium">Couldn't find what you were looking for?</p>
                <button className="mt-4 bg-[#2E2E2E] text-white px-10 py-4 rounded-2xl font-bold hover:bg-black transition-all flex items-center gap-3 mx-auto shadow-lg shadow-black/10">
                    Create a Support Ticket
                </button>
            </div>
        </motion.div>
    );
};

const HelpCard = ({ icon, title, desc, color, bg }) => (
    <motion.div 
        whileHover={{ y: -5 }}
        className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm cursor-pointer hover:border-green-900/10 transition-all"
    >
        <div className={`p-4 ${bg} ${color} rounded-2xl w-fit mb-6`}>
            {React.cloneElement(icon, { size: 24, strokeWidth: 2.5 })}
        </div>
        <h4 className="font-bold text-lg text-[#2E2E2E] mb-2">{title}</h4>
        <p className="text-gray-400 text-xs leading-relaxed font-medium">{desc}</p>
    </motion.div>
);

const ArticleLink = ({ title, time }) => (
    <div className="flex justify-between items-center py-4 border-b border-gray-50 group cursor-pointer">
        <span className="text-gray-600 font-medium group-hover:text-green-900 transition-colors">{title}</span>
        <span className="text-[10px] font-bold text-gray-300 uppercase">{time}</span>
    </div>
);

export default Help;
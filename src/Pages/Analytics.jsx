import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    PieChart, Pie, Cell, Sector 
} from 'recharts';
import { TrendingUp, MousePointer2, Target, Eye } from 'lucide-react';

const COLORS = ['#14532d', '#16a34a', '#86efac', '#f97316'];

const Analytics = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch('https://task-api-eight-flax.vercel.app/api/analytics', {
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
        fetchAnalytics();
    }, []);

    if (loading) return <div className="p-10 text-green-700 font-bold text-center animate-pulse">Analyzing Data...</div>;

    // Calculate Totals for Pie Chart
    const totals = data.reduce((acc, curr) => ({
        views: acc.views + curr.views,
        clicks: acc.clicks + curr.clicks,
        conversions: acc.conversions + curr.conversions
    }), { views: 0, clicks: 0, conversions: 0 });

    const pieData = [
        { name: 'Views', value: totals.views },
        { name: 'Clicks', value: totals.clicks },
        { name: 'Conversions', value: totals.conversions },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="bg-[#F7F7F7] p-6 space-y-8 min-h-screen"
        >
            {/* Header */}
            <div>
                <h1 className="text-3xl font-medium text-[#2E2E2E]">Detailed Analytics</h1>
                <p className="text-[#C1C6C4] text-sm">Deep dive into views, engagement, and conversion metrics</p>
            </div>

            {/* Quick Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MiniStat icon={<Eye />} label="Total Views" value={totals.views.toLocaleString()} color="bg-green-900" />
                <MiniStat icon={<MousePointer2 />} label="Total Clicks" value={totals.clicks.toLocaleString()} color="bg-green-600" />
                <MiniStat icon={<Target />} label="Conversions" value={totals.conversions.toLocaleString()} color="bg-orange-500" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* BAR CHART - Performance Comparison */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-xl text-[#2E2E2E] mb-6">Daily Performance</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                                <XAxis 
                                    dataKey="date" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fill: '#C1C6C4', fontSize: 12}}
                                    tickFormatter={(str) => new Date(str).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                                />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#C1C6C4', fontSize: 12}} />
                                <Tooltip 
                                    cursor={{fill: '#F7F7F7'}}
                                    contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend iconType="circle" />
                                <Bar dataKey="views" fill="#14532d" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="clicks" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={20} />
                                <Bar dataKey="conversions" fill="#f97316" radius={[4, 4, 0, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* PIE CHART - Distribution */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col">
                    <h3 className="font-bold text-xl text-[#2E2E2E] mb-2">Metric Distribution</h3>
                    <div className="flex-grow h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const MiniStat = ({ icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center gap-5 shadow-sm">
        <div className={`p-4 rounded-2xl text-white ${color}`}>
            {React.cloneElement(icon, { size: 24 })}
        </div>
        <div>
            <p className="text-xs font-bold text-[#C1C6C4] uppercase tracking-widest">{label}</p>
            <h2 className="text-2xl font-bold text-[#2E2E2E]">{value}</h2>
        </div>
    </div>
);

export default Analytics;
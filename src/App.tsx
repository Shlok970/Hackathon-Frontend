/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Star, 
  Zap, 
  Brain, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  ThumbsUp, 
  AlertTriangle,
  Lightbulb,
  Download,
  RefreshCw,
  ChevronRight,
  Menu,
  Moon,
  Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell,
  LineChart,
  Line
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// UTILS
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TYPES
type View = 'landing' | 'dashboard';

// MOCK DATA
const ratingData = [
  { name: '5 Stars', value: 82, color: '#3B82F6' },
  { name: '4 Stars', value: 12, color: '#60A5FA' },
  { name: '3 Stars', value: 4, color: '#93C5FD' },
  { name: '2 Stars', value: 1, color: '#BFDBFE' },
  { name: '1 Star', value: 1, color: '#DBEAFE' },
];

const sentimentScore = { positive: 91, negative: 9 };

const keywords = [
  { text: 'Battery Life', type: 'positive' },
  { text: 'Noise Cancellation', type: 'positive' },
  { text: 'Premium Feel', type: 'positive' },
  { text: 'Ease of Use', type: 'positive' },
  { text: 'App Connectivity', type: 'negative' },
  { text: 'Pricing Value', type: 'negative' },
  { text: 'Charging Port', type: 'negative' },
];

// COMPONENTS
const Navbar = ({ onToggleDark, isDark, view, setView }: { onToggleDark: () => void, isDark: boolean, view: View, setView: (v: View) => void }) => (
  <header className="sticky top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all duration-300">
    <div className="flex items-center justify-between px-6 lg:px-12 py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-8">
        <button onClick={() => setView('landing')} className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white transition-colors">
          ReviewIQ
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {['Dashboard', 'Products', 'Insights', 'Pricing'].map((item) => (
            <button 
              key={item} 
              onClick={() => item === 'Dashboard' ? setView('dashboard') : setView('landing')}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary dark:hover:text-blue-400",
                view === item.toLowerCase() ? "text-primary dark:text-blue-400" : "text-slate-600 dark:text-slate-400"
              )}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2 lg:gap-4">
        <button onClick={onToggleDark} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="flex items-center gap-1 md:gap-2">
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
            <Bell size={20} />
          </button>
          <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-400">
            <User size={20} />
          </button>
        </div>
        <button 
          onClick={() => setView('dashboard')}
          className="bg-primary hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20"
        >
          Get Started
        </button>
      </div>
    </div>
  </header>
);

interface LandingProps {
  onStart: () => void;
}

const LandingView = ({ onStart }: LandingProps) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="relative flex flex-col items-center pt-20 pb-32 overflow-hidden"
  >
    {/* Abstract Glows */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[60%] bg-blue-500/10 dark:bg-blue-900/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[50%] bg-purple-500/10 dark:bg-purple-900/20 blur-[100px] rounded-full"></div>
    </div>

    <section className="max-w-[1280px] mx-auto px-6 text-center">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest border border-blue-200/50 dark:border-blue-700/50">
          Next-Gen AI Analytics
        </span>
      </motion.div>

      <motion.h1 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white max-w-4xl tracking-tight mb-8 leading-[1.1]"
      >
        AI Product <span className="text-gradient">Review Intelligence</span>
      </motion.h1>

      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
      >
        Unlock deep consumer insights by analyzing thousands of reviews in seconds. High-precision sentiment mapping and feature extraction for enterprise teams.
      </motion.p>

      {/* Search Container */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-3xl mx-auto mb-16"
      >
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-full p-2.5 flex items-center shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-200 dark:border-slate-700">
          <div className="pl-6 pr-4 text-slate-400">
            <Search size={22} />
          </div>
          <input 
            className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 font-medium" 
            placeholder="Search product name, URL, or ASIN..." 
            type="text" 
          />
          <button 
            onClick={onStart}
            className="bg-primary hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold transition-all active:scale-[0.98] shadow-lg shadow-blue-500/30"
          >
            Search
          </button>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trending:</span>
          {['Wireless Earbuds', 'Mechanical Keyboards', 'Smart Watches'].map((tag) => (
            <button key={tag} className="text-xs font-bold text-primary dark:text-blue-400 hover:underline">
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Featured Card */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-4xl mx-auto mb-24"
      >
        <div className="glass-card rounded-[2.5rem] p-6 lg:p-10 flex flex-col lg:flex-row items-center gap-10 text-left bg-white/60 dark:bg-slate-800/60 relative group">
          <div className="w-full lg:w-2/5 aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-inner relative group/img">
            <img 
              alt="Premium Headphones" 
              className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700" 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop" 
            />
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-md px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white shadow-sm">
                Electronics
              </span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl lg:text-3xl font-bold dark:text-white">Quantum Ultra Pro</h3>
              <div className="flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
                <Star className="text-yellow-500 fill-yellow-500" size={16} />
                <span className="text-sm font-bold text-yellow-700 dark:text-yellow-400">4.8</span>
                <span className="text-xs text-slate-400">(12.4k reviews)</span>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              High-fidelity audio with active noise cancellation and 40-hour battery life. Top-rated for comfort and build quality.
            </p>

            <div className="ai-glow bg-purple-50/50 dark:bg-purple-900/10 rounded-2xl p-5 mb-10">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="text-purple-600 dark:text-purple-400" size={20} />
                <span className="text-sm font-bold text-purple-900 dark:text-purple-300">AI Summary Available</span>
              </div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                92% of users mention "Exceptional Comfort" as their primary purchasing driver. Update firmware to v2.4 to resolve reported Bluetooth jitter.
              </p>
            </div>

            <button 
              onClick={onStart}
              className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:-translate-y-1 active:scale-[0.98] shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              Start Analysis <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {[
          { icon: <Zap className="text-blue-500" />, title: 'Fast Analysis', text: 'Process 10k+ reviews in under 30 seconds with our neural engine.' },
          { icon: <Brain className="text-purple-500" />, title: 'Feature Discovery', text: 'Automatically identify trending features and common pain points.' },
          { icon: <BarChart3 className="text-slate-900 dark:text-white" />, title: 'Predictive ROI', text: 'Forecast the impact of feature improvements on your overall rating.' },
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i }}
            className="glass-card p-8 rounded-3xl text-left bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors"
          >
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6">
              {item.icon}
            </div>
            <h4 className="text-xl font-bold mb-3 dark:text-white">{item.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  </motion.div>
);

const DashboardView = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 lg:px-12 py-10 pb-20"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">Product Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Comprehensive AI analysis for "Quantum Ultra Pro" - Last updated 2h ago.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Download size={18} /> Export Report
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
            <RefreshCw size={18} /> Re-analyze
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-12">
        {[
          { label: 'Brand', value: 'ApexTech' },
          { label: 'Category', value: 'Smart Audio' },
          { label: 'Price', value: '$299.00' },
          { label: 'Avg Rating', value: '4.8 ★', highlight: true },
          { label: 'Total Reviews', value: '12,482' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "p-6 rounded-3xl border transition-all",
              stat.highlight 
                ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" 
                : "bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700"
            )}
          >
            <p className="text-[10px] font-black tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-2">{stat.label}</p>
            <p className={cn(
              "text-xl lg:text-2xl font-bold tracking-tight",
              stat.highlight ? "text-primary dark:text-blue-400" : "text-slate-900 dark:text-white"
            )}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-card bg-white/50 dark:bg-slate-800/50 p-8 rounded-[2.5rem]">
            <h3 className="text-xl font-bold mb-8 dark:text-white">Rating Breakdown</h3>
            <div className="space-y-6">
              {ratingData.map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                    <span className="text-slate-500">{item.name}</span>
                    <span className="text-slate-900 dark:text-white">{item.value}%</span>
                  </div>
                  <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card bg-white/50 dark:bg-slate-800/50 p-8 rounded-[2.5rem] flex flex-col items-center">
            <h3 className="text-xl font-bold mb-4 self-start dark:text-white">Sentiment Score</h3>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Positive', value: sentimentScore.positive },
                      { name: 'Negative', value: sentimentScore.negative },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    <Cell fill="#3B82F6" />
                    <Cell fill="#E2E8F0" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-10">
                <span className="text-4xl font-black text-slate-900 dark:text-white">{sentimentScore.positive}%</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Positive</span>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-xs font-bold text-slate-500">Positive ({sentimentScore.positive}%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                <span className="text-xs font-bold text-slate-500">Negative ({sentimentScore.negative}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-card bg-white/50 dark:bg-slate-800/50 p-8 rounded-[2.5rem]">
            <h3 className="text-xl font-bold mb-8 dark:text-white">Trending Keywords</h3>
            <div className="flex flex-wrap gap-3">
              {keywords.map((kw, i) => (
                <button 
                  key={i}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                    kw.type === 'positive' 
                      ? "bg-green-50 dark:bg-green-900/10 border-green-100 dark:border-green-800 text-green-700 dark:text-green-400"
                      : "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-800 text-red-700 dark:text-red-400"
                  )}
                >
                  {kw.type === 'positive' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {kw.text}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="glass-card bg-white/80 dark:bg-slate-800/80 p-8 rounded-[2rem]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600">
                  <ThumbsUp size={20} />
                </div>
                <h3 className="text-lg font-bold dark:text-white">Most Loved</h3>
              </div>
              <ul className="space-y-6">
                {[
                  "The active noise cancellation is superior to competitors in this price range.",
                  "Battery lasts significantly longer than the advertised 30 hours.",
                  "Packaging feels premium and eco-friendly."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white shrink-0">
                      <ChevronRight size={12} strokeWidth={4} />
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card bg-white/80 dark:bg-slate-800/80 p-8 rounded-[2rem]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="text-lg font-bold dark:text-white">Key Complaints</h3>
              </div>
              <ul className="space-y-6">
                {[
                  "Users report intermittent bluetooth drops when using the desktop app.",
                  "The included charging cable is perceived as too short.",
                  "Firmware updates are difficult to initiate for non-tech users."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white shrink-0">
                      <ChevronRight size={12} strokeWidth={4} />
                    </div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Strategic Recommendations */}
          <div className="ai-glow bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 border-indigo-200 dark:border-indigo-800 p-8 lg:p-10 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">
                  <Brain size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold dark:text-white leading-tight">Strategic Recommendations</h3>
                  <p className="text-xs font-black text-indigo-500 uppercase tracking-widest mt-1">ML-Driven Insights</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/60 dark:bg-slate-800/60 p-6 rounded-3xl border border-white dark:border-slate-700">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-4">Connectivity Optimization</p>
                <h4 className="text-lg font-bold mb-3 dark:text-white">Launch Firmware 2.4.1</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Data suggests a 14% drop in ratings due to Bluetooth latency. Prioritize the release of the "Instant Connect" patch.</p>
                <button className="text-xs font-bold text-primary dark:text-blue-400 flex items-center gap-2 hover:underline">View data clusters <ChevronRight size={14} /></button>
              </div>

              <div className="bg-white/60 dark:bg-slate-800/60 p-6 rounded-3xl border border-white dark:border-slate-700">
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-4">Marketing Strategy</p>
                <h4 className="text-lg font-bold mb-3 dark:text-white">Highlight "Endurance Mode"</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">Users consistently over-index on positive battery sentiment. Update ad copy to focus on the 48hr real-world performance.</p>
                <button className="text-xs font-bold text-primary dark:text-blue-400 flex items-center gap-2 hover:underline">View segment analysis <ChevronRight size={14} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background transition-colors duration-500 selection:bg-primary/20">
      <Navbar 
        view={view} 
        setView={setView} 
        isDark={isDark} 
        onToggleDark={() => setIsDark(!isDark)} 
      />
      
      <main>
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <LandingView key="landing" onStart={() => setView('dashboard')} />
          ) : (
            <DashboardView key="dashboard" />
          )}
        </AnimatePresence>
      </main>

      <footer className="w-full py-16 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 mt-20">
        <div className="max-w-7xl mx-auto px-12 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-4">
            <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">ReviewIQ</span>
            <p className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500">
              © 2026 ReviewIQ AI Analytics. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {['Documentation', 'Privacy Policy', 'Terms of Service', 'API Status'].map((item) => (
              <a key={item} href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary dark:hover:text-blue-400 transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

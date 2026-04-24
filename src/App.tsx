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
  Sun,
  Loader2,
  ShieldCheck,
  Target,
  Users,
  MapPin,
  Clock,
  LayoutGrid,
  TrendingUp as TrendType
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
  Line,
  AreaChart,
  Area
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

// UTILS
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// TYPES
type View = 'landing' | 'dashboard';

interface RecommendationCardProps {
  title: string;
  recommendation: string;
  icon: React.ReactNode;
  color: string;
}

const RecommendationCard = ({ title, recommendation, icon, color }: RecommendationCardProps) => (
  <div className={cn("p-6 rounded-3xl border transition-all glass-card", color)}>
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <h4 className="font-bold dark:text-white">{title}</h4>
    </div>
    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-4">{recommendation}</p>
    <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-indigo-500">
      <Brain size={12} /> Ready for ML Model
    </div>
  </div>
);

// COMPONENTS
const Navbar = ({ onToggleDark, isDark, view, setView }: { onToggleDark: () => void, isDark: boolean, view: View, setView: (v: View) => void }) => (
  <header className="sticky top-0 w-full z-50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm transition-all duration-300">
    <div className="flex items-center justify-between px-6 lg:px-12 py-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-8">
        <button onClick={() => setView('landing')} className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white transition-colors">
          ReviewIQ
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {['Dashboard', 'Products', 'Insights', 'History'].map((item) => (
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
  onSearch: (q: string) => void;
  isLoading: boolean;
  key?: string; // Explicitly adding for AnimatePresence
}

const LandingView = ({ onSearch, isLoading }: LandingProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim()) onSearch(query);
  };

  return (
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

      <section className="max-w-[1280px] mx-auto px-6 flex flex-col items-center text-center w-full">
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
          className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white max-w-4xl tracking-tight mb-8 leading-[1.1] text-center"
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

        {/* Featured Card (Moved Before Search) */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-4xl mx-auto mb-16"
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
                  <span className="text-xs text-slate-400 font-medium">(12.4k reviews)</span>
                </div>
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed text-sm font-medium">
                High-fidelity audio with active noise cancellation and 40-hour battery life. Top-rated for comfort and build quality.
              </p>

              <div className="ai-glow bg-purple-50/50 dark:bg-purple-900/10 rounded-2xl p-5 border-purple-100/50 dark:border-purple-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="text-purple-600 dark:text-purple-400" size={18} />
                  <span className="text-xs font-bold text-purple-900 dark:text-purple-300">AI Summary Available</span>
                </div>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 leading-relaxed">
                  92% of users mention "Exceptional Comfort" as their primary purchasing driver. Update firmware to v2.4 to resolve reported jitter.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search Container */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-3xl mx-auto mb-16"
        >
          <form onSubmit={handleSubmit} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-full p-2.5 flex items-center shadow-xl shadow-slate-200/50 dark:shadow-black/20 border border-slate-200 dark:border-slate-700">
            <div className="pl-6 pr-4 text-slate-400">
              <Search size={22} />
            </div>
            <input 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-400 font-medium" 
              placeholder="Search product name, URL, or ASIN..." 
              type="text" 
            />
            <button 
              disabled={isLoading}
              type="submit"
              className="bg-primary hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold transition-all active:scale-[0.98] shadow-lg shadow-blue-500/30 flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Analyze'}
            </button>
          </form>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trending:</span>
            {['Sony WH-1000XM5', 'MacBook Air M2', 'Kindle Paperwhite'].map((tag) => (
              <button key={tag} onClick={() => { setQuery(tag); onSearch(tag); }} className="text-xs font-bold text-primary dark:text-blue-400 hover:underline">
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Info Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {[
            { icon: <Zap className="text-blue-500" />, title: 'Fast Analysis', text: 'Process 10k+ reviews in under 30 seconds with our neural engine.' },
            { icon: <Brain className="text-purple-500" />, title: 'Feature Discovery', text: 'Automatically identify trending features and common pain points.' },
            { icon: <BarChart3 className="text-slate-900 dark:text-bold dark:text-white" />, title: 'Predictive ROI', text: 'Forecast the impact of feature improvements on your overall rating.' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="glass-card p-8 rounded-3xl text-left bg-white/40 dark:bg-slate-800/40 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors border-slate-200/50 dark:border-slate-700/50"
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
};

interface DashboardProps {
  data: any;
  key?: string; // Explicitly adding for AnimatePresence
}

const DashboardView = ({ data }: DashboardProps) => {
  const { product, insights } = data;
  const breakdownData = Object.entries(product.ratingBreakdown).map(([name, value]) => ({ 
    name, 
    value: typeof value === 'number' ? value : 0 
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-6 lg:px-12 py-10 pb-20"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-xl">
            <img src={product.image} className="w-full h-full object-cover" alt={product.title} />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white mb-2 max-w-2xl leading-tight">{product.title}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-lg">{product.brand}</span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-lg">{product.category}</span>
              <span className="text-sm text-slate-500 font-medium">Last analyzed: {new Date(product.lastFetched).toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <Download size={18} /> Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
            <RefreshCw size={18} /> Re-analyze
          </button>
        </div>
      </div>

      {/* Main Core Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Avg Rating', value: `${product.rating} ★`, icon: <Star size={20} />, color: 'text-yellow-500' },
          { label: 'Total Reviews', value: product.reviewsCount.toLocaleString(), icon: <Users size={20} />, color: 'text-blue-500' },
          { label: 'Price', value: product.price, icon: <LayoutGrid size={20} />, color: 'text-green-500' },
          { label: 'Sentiment Score', value: `${insights.sentimentScore}%`, icon: <Brain size={20} />, color: 'text-purple-500' },
        ].map((stat, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 border shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className={stat.color}>{stat.icon}</span>
              <span className="text-[10px] font-black tracking-widest uppercase text-slate-400">{stat.label}</span>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Stats Column */}
        <div className="lg:col-span-4 space-y-8">
          {/* Rating Distribution */}
          <div className="glass-card bg-white/50 dark:bg-slate-800/50 p-8 rounded-[2.5rem]">
            <h3 className="text-xl font-bold mb-8 dark:text-white">Rating Distribution</h3>
            <div className="space-y-6">
              {breakdownData.map((item, i) => (
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
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* New Metrics - Fake Review & Purchase Confidence */}
          <div className="grid grid-cols-1 gap-8">
            <div className="glass-card p-8 rounded-[2rem] bg-gradient-to-br from-red-50 to-white dark:from-red-900/10 dark:to-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-red-500" size={24} />
                <div>
                  <h4 className="font-bold dark:text-white">Fake Review Score</h4>
                  <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Integrity Check</p>
                </div>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-slate-900 dark:text-white">{insights.fakeReviewScore}%</span>
                <span className="text-xs font-bold text-slate-400 mb-1">Estimated anomaly rate</span>
              </div>
            </div>

            <div className="glass-card p-8 rounded-[2rem] bg-gradient-to-br from-green-50 to-white dark:from-green-900/10 dark:to-slate-800">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-green-500" size={24} />
                <div>
                  <h4 className="font-bold dark:text-white">Purchase Confidence</h4>
                  <p className="text-[10px] font-black text-green-400 uppercase tracking-widest">Buyer Intent</p>
                </div>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-slate-900 dark:text-white">{insights.purchaseConfidence}%</span>
                <span className="text-xs font-bold text-slate-400 mb-1">Global recommendation</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Main Dashboard Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Sentiment Area Chart */}
          <div className="glass-card bg-white/50 dark:bg-slate-800/50 p-8 rounded-[2.5rem]">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold dark:text-white">Trend Over Time</h3>
              <div className="flex items-center gap-4">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="text-xs font-bold text-slate-400">Volume</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-xs font-bold text-slate-400">Rating</span>
                 </div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={insights.trends}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fontWeight: 700, fill: '#94a3b8' }} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                  <Area type="monotone" dataKey="volume" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorVolume)" />
                  <Area type="monotone" dataKey="rating" stroke="#A855F7" strokeWidth={3} fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Feature Satisfaction Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.featureSatisfaction.map((feat: any, i: number) => (
              <div key={i} className="glass-card p-6 rounded-3xl bg-white dark:bg-slate-800">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{feat.name}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">{feat.score}%</span>
                  <div className="w-10 h-1 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${feat.score}%` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* AI Strategic Recommendations (The 5 Key Areas) */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Brain className="text-purple-600" />
              <h3 className="text-2xl font-bold dark:text-white">AI Strategic Intelligence</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RecommendationCard 
                title="Product Improvement" 
                recommendation={insights.strategicRecommendations.productImprovement}
                icon={<Zap size={20} className="text-blue-500" />}
                color="border-blue-100 dark:border-blue-900/30"
              />
              <RecommendationCard 
                title="Marketing Strategy" 
                recommendation={insights.strategicRecommendations.marketingStrategy}
                icon={<Target size={20} className="text-green-500" />}
                color="border-green-100 dark:border-green-900/30"
              />
              <RecommendationCard 
                title="Buyer Decision" 
                recommendation={insights.strategicRecommendations.buyerDecision}
                icon={<Lightbulb size={20} className="text-yellow-500" />}
                color="border-yellow-100 dark:border-yellow-900/30"
              />
              <RecommendationCard 
                title="Demand Forecast" 
                recommendation={insights.strategicRecommendations.demandForecast}
                icon={<TrendType size={20} className="text-purple-500" />}
                color="border-purple-100 dark:border-purple-900/30"
              />
              <RecommendationCard 
                title="Competitive Intelligence" 
                recommendation={insights.strategicRecommendations.competitorPositioning}
                icon={<Users size={20} className="text-indigo-500" />}
                color="border-indigo-100 dark:border-indigo-900/30"
              />
               <div className="p-6 rounded-3xl border glass-card bg-slate-900 text-white flex flex-col justify-center items-center text-center">
                  <Menu className="mb-4 text-blue-400" />
                  <h4 className="font-bold mb-1">More Modules Coming</h4>
                  <p className="text-xs text-slate-400 font-medium">Competitor Comparison & Persona Segments are pending ML training.</p>
               </div>
            </div>
          </div>

          {/* Regional & Segmentation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="glass-card p-8 rounded-[2rem]">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="text-primary" size={20} />
                  <h4 className="font-bold dark:text-white">Region-wise Sentiment</h4>
                </div>
                <div className="space-y-4">
                  {Object.entries(insights.regionWiseSentiment).map(([region, score]: any) => (
                    <div key={region} className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{region.replace(/([A-Z])/g, ' $1')}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-black dark:text-white">{score}%</span>
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${score}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="glass-card p-8 rounded-[2rem] bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 border-none">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="text-white" size={20} />
                  <h4 className="font-bold">Customer Persona Segments</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {insights.customerPersonaSegments.map((persona: string) => (
                    <span key={persona} className="px-3 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                      {persona}
                    </span>
                  ))}
                </div>
                <p className="mt-8 text-xs font-medium text-indigo-100">AI analysis indicates these segments show the highest retention probability for this product category.</p>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [isDark, setIsDark] = useState(true); // Default to dark as requested
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<any>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/analyze?q=${encodeURIComponent(query)}`);
      setAnalysisData(response.data);
      setView('dashboard');
    } catch (error: any) {
      console.error('Analysis failed:', error);
      const msg = error.response?.data?.details || error.response?.data?.error || 'Failed to analyze product. Please check your API key and network.';
      alert(msg);
    } finally {
      setIsLoading(false);
    }
  };

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
            <LandingView key="landing" onSearch={handleSearch} isLoading={isLoading} />
          ) : analysisData ? (
            <DashboardView key="dashboard" data={analysisData} />
          ) : (
            <div className="p-20 text-center dark:text-white">No data available. Please search for a product.</div>
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

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard,
  BarChart2,
  AlertTriangle,
  Upload,
  Plus,
  Loader2,
  TrendingDown,
  TrendingUp,
  BrainCircuit,
  ShieldAlert,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

// Supabase and Gemini fetch mockup simulation
interface ForecastData {
  month: string;
  savings: number;
  expenses: number;
}

interface DashboardData {
  chartData: ForecastData[];
  riskLevel: "Low" | "Med" | "High";
  riskScore: number;
  insight: string;
}

const steps = ["Analyzing Trends", "Calculating Risk", "Generating Forecast"];

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    // Simulate loading states
    const timer1 = setTimeout(() => {
      setLoadingStep(1);
    }, 1500);
    const timer2 = setTimeout(() => {
      setLoadingStep(2);
    }, 3000);
    const timer3 = setTimeout(() => {
      // Logic: Hook up Supabase transactions fetch to Gemini API service mapping
      // Here we simulate the return from "forecasts table JSON"
      setData({
        chartData: [
          { month: "Jan", savings: 2000, expenses: 1400 },
          { month: "Feb", savings: 2200, expenses: 1300 },
          { month: "Mar", savings: 2100, expenses: 1600 },
          { month: "Apr", savings: 2600, expenses: 1400 },
          { month: "May", savings: 2800, expenses: 1500 },
          { month: "Jun", savings: 3200, expenses: 1300 },
          { month: "Jul", savings: 3100, expenses: 1800 },
          { month: "Aug", savings: 3400, expenses: 1900 },
          { month: "Sep", savings: 3800, expenses: 1600 },
          { month: "Oct", savings: 4100, expenses: 1400 },
          { month: "Nov", savings: 4300, expenses: 1500 },
          { month: "Dec", savings: 4800, expenses: 1700 },
        ],
        riskLevel: "Low",
        riskScore: 22,
        insight: "Expected $400 spike in utilities next month due to winter season trends.",
      });
      setLoading(false);
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100, damping: 15 },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0A1A] flex flex-col items-center justify-center text-white">
        <div className="bento-card p-12 flex flex-col items-center max-w-md w-full">
          <BrainCircuit className="w-16 h-16 text-emerald-custom animate-pulse mb-6" />
          <h2 className="text-2xl font-semibold mb-8 text-center bg-gradient-to-r from-emerald-custom to-indigo-custom bg-clip-text text-transparent">
            Gemini AI Processing
          </h2>

          <div className="w-full space-y-4">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center space-x-4">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${loadingStep > index
                    ? "border-emerald-custom bg-emerald-custom/20 text-emerald-custom"
                    : loadingStep === index
                      ? "border-indigo-custom bg-indigo-custom/20 text-indigo-custom animate-pulse"
                      : "border-gray-600 text-gray-600"
                    }`}
                >
                  {loadingStep > index ? (
                    <span className="text-sm font-bold">✓</span>
                  ) : loadingStep === index ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <span className="text-xs">{index + 1}</span>
                  )}
                </div>
                <span
                  className={`${loadingStep === index ? "text-white font-medium" : "text-gray-400"
                    }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>

          <div className="w-full bg-gray-800 rounded-full h-2 mt-8 overflow-hidden">
            <motion.div
              className="bg-emerald-custom h-2 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((loadingStep + 1) / 3) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0A1A] text-white flex overflow-hidden">
      {/* Slim Sidebar */}
      <aside className="w-20 bg-[rgba(255,255,255,0.02)] border-r border-glass-border backdrop-blur-xl flex flex-col items-center py-8 justify-between z-10 shrink-0">
        <div className="space-y-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-custom to-emerald-custom flex items-center justify-center shadow-lg mb-8">
            <TrendingUp className="text-white w-6 h-6" />
          </div>
          <button onClick={() => toast("Dashboard active")} className="p-3 rounded-xl bg-glass-bg text-emerald-custom shadow-lg transition-all hover:scale-110">
            <LayoutDashboard size={24} />
          </button>
          <button onClick={() => toast("Analytics incoming")} className="p-3 rounded-xl text-gray-400 hover:text-white transition-all hover:scale-110 hover:bg-glass-bg">
            <BarChart2 size={24} />
          </button>
          <button onClick={() => toast("Risk Settings")} className="p-3 rounded-xl text-gray-400 hover:text-white transition-all hover:scale-110 hover:bg-glass-bg">
            <ShieldAlert size={24} />
          </button>
        </div>
        <div>
          <button onClick={() => toast("Profile Switcher")} className="p-3 rounded-full bg-glass-bg text-gray-400 hover:text-white transition-all">
            <span className="block w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></span>
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Financial Command Center</h1>
            <p className="text-gray-400">Enterprise AI Insights powered by Gemini</p>
          </div>
        </header>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-4 gap-6 grid-rows-[minmax(200px,auto)_minmax(150px,auto)]"
        >
          {/* Large Card: Chart */}
          <motion.div variants={itemVariants} className="bento-card p-6 lg:col-span-3 lg:row-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <BarChart2 className="text-indigo-custom" size={20} />
                Projected Savings vs. Expenses
              </h2>
              <span className="text-xs bg-indigo-custom/20 text-indigo-400 px-3 py-1 rounded-full border border-indigo-custom/30">
                12-Month Forecast
              </span>
            </div>
            <div className="flex-1 min-h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#2D2B42" vertical={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(30, 27, 75, 0.9)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    name="Savings"
                    stroke="#10B981"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorSavings)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    name="Expenses"
                    stroke="#EF4444"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorExpenses)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Medium Card: Risk Radar */}
          <motion.div variants={itemVariants} className="bento-card p-6 flex flex-col justify-center items-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-crimson-custom/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <h2 className="text-sm font-medium text-gray-400 absolute top-6 left-6 flex items-center gap-2">
              <AlertTriangle size={16} className="text-crimson-custom" />
              Risk Radar
            </h2>

            <div className="relative w-32 h-32 mt-8 flex items-center justify-center">
              {/* Circular Gauge Simulation */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                <motion.circle
                  initial={{ strokeDasharray: "0 251" }}
                  animate={{ strokeDasharray: `${(data?.riskScore || 0) * 2.51} 251` }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  cx="50" cy="50" r="40" stroke="#10B981" strokeWidth="8" fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
                  {data?.riskScore}
                </span>
                <span className="text-[10px] text-emerald-custom uppercase tracking-wider font-semibold">
                  {data?.riskLevel} Risk
                </span>
              </div>
            </div>
            <p className="text-xs text-center text-gray-400 mt-4 leading-relaxed">
              Your financial portfolio shows resilience. Keep maintaining the savings ratio.
            </p>
          </motion.div>

          {/* Small Card: Smart Forecast */}
          <motion.div variants={itemVariants} className="bento-card p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E1B4B]/80 to-transparent opacity-50"></div>
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex items-center gap-2 text-indigo-300 mb-3">
                <BrainCircuit size={18} />
                <h3 className="font-medium text-sm">Smart Forecast</h3>
              </div>
              <p className="text-lg font-medium leading-tight mb-4">
                {data?.insight}
              </p>
              <div className="flex items-center text-xs text-indigo-400 font-medium">
                <span className="flex items-center gap-1 group-hover:text-indigo-300 transition-colors">
                  View Detail Analysis <TrendingDown size={14} />
                </span>
              </div>
            </div>
          </motion.div>

          {/* Small Card: Quick Action */}
          <motion.div variants={itemVariants} className="bento-card p-6 flex flex-col justify-between">
            <h3 className="text-sm font-medium text-gray-400 mb-4">Quick Actions</h3>
            <div className="flex flex-col gap-3 h-full justify-end">
              <button onClick={() => toast.success("Upload successful", { description: "Processing bank statement..." })} className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-custom to-blue-900 border border-indigo-custom text-white py-3 px-4 rounded-xl hover:shadow-[0_0_15px_rgba(30,27,75,0.8)] transition-all hover:-translate-y-0.5 font-medium text-sm">
                <Upload size={16} />
                Upload Statement
              </button>
              <button onClick={() => toast.success("Expense form opened")} className="w-full flex items-center justify-center gap-2 bg-glass-bg border border-glass-border text-white py-3 px-4 rounded-xl hover:bg-white/10 transition-all hover:-translate-y-0.5 font-medium text-sm">
                <Plus size={16} />
                Add Expense
              </button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

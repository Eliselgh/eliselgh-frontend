import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

const analyticsData = [
  { name: 'Mon', sales: 4000, orders: 24, views: 2400 },
  { name: 'Tue', sales: 3000, orders: 18, views: 1398 },
  { name: 'Wed', sales: 2000, orders: 12, views: 9800 },
  { name: 'Thu', sales: 2780, orders: 20, views: 3908 },
  { name: 'Fri', sales: 1890, orders: 15, views: 4800 },
  { name: 'Sat', sales: 2390, orders: 22, views: 3800 },
  { name: 'Sun', sales: 3490, orders: 28, views: 4300 },
];

const categoryData = [
  { name: 'Textiles', value: 400 },
  { name: 'Crafts', value: 300 },
  { name: 'Food', value: 300 },
  { name: 'Beauty', value: 200 },
];

const COLORS = ['#00323d', '#1a73e8', '#fcd400', '#ba1a1a'];

const VendorPortalInterface: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'orders' | 'messages' | 'analytics' | 'payments' | 'ads' | 'settings' | 'support'>('dashboard');

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `Vendor Central | ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`;
    return () => {
      document.title = prevTitle;
    };
  }, [activeTab]);

  return (
    <div className="bg-[#f9f9fc] text-[#1a1c1e] min-h-screen font-['Inter'] antialiased">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 border-r border-slate-200 bg-white dark:bg-slate-900 font-['Manrope'] antialiased tracking-tight flex flex-col py-6 z-50 hidden lg:flex">
        <div className="px-6 mb-8">
          <h1 className="text-xl font-bold text-[#00323d] dark:text-teal-400">Vendor Portal</h1>
          <p className="text-xs text-slate-500 font-medium tracking-tight">Ghanaian Marketplace</p>
        </div>
        <nav className="flex-1 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ease-in-out text-left ${activeTab === 'dashboard' ? 'text-[#00323d] dark:text-teal-400 font-semibold bg-teal-50/50 dark:bg-teal-900/20 border-r-4 border-[#00323d]' : 'text-slate-600 dark:text-slate-400 hover:text-[#00323d] hover:bg-slate-100'}`}
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-medium">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ease-in-out text-left ${activeTab === 'inventory' ? 'text-[#00323d] dark:text-teal-400 font-semibold bg-teal-50/50 dark:bg-teal-900/20 border-r-4 border-[#00323d]' : 'text-slate-600 dark:text-slate-400 hover:text-[#00323d] hover:bg-slate-100'}`}
          >
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="text-sm font-medium">Inventory</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ease-in-out text-left ${activeTab === 'orders' ? 'text-[#00323d] dark:text-teal-400 font-semibold bg-teal-50/50 dark:bg-teal-900/20 border-r-4 border-[#00323d]' : 'text-slate-600 dark:text-slate-400 hover:text-[#00323d] hover:bg-slate-100'}`}
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="text-sm font-medium">Orders</span>
          </button>
          <button 
            onClick={() => setActiveTab('ads')}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ease-in-out text-left ${activeTab === 'ads' ? 'text-[#00323d] dark:text-teal-400 font-semibold bg-teal-50/50 dark:bg-teal-900/20 border-r-4 border-[#00323d]' : 'text-slate-600 dark:text-slate-400 hover:text-[#00323d] hover:bg-slate-100'}`}
          >
            <span className="material-symbols-outlined">campaign</span>
            <span className="text-sm font-medium">Ads</span>
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ease-in-out text-left ${activeTab === 'analytics' ? 'text-[#00323d] dark:text-teal-400 font-semibold bg-teal-50/50 dark:bg-teal-900/20 border-r-4 border-[#00323d]' : 'text-slate-600 dark:text-slate-400 hover:text-[#00323d] hover:bg-slate-100'}`}
          >
            <span className="material-symbols-outlined">analytics</span>
            <span className="text-sm font-medium">Analytics</span>
          </button>
          <button 
            onClick={() => setActiveTab('payments')}
            className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 ease-in-out text-left ${activeTab === 'payments' ? 'text-[#00323d] dark:text-teal-400 font-semibold bg-teal-50/50 dark:bg-teal-900/20 border-r-4 border-[#00323d]' : 'text-slate-600 dark:text-slate-400 hover:text-[#00323d] hover:bg-slate-100'}`}
          >
            <span className="material-symbols-outlined">payments</span>
            <span className="text-sm font-medium">Payments</span>
          </button>
        </nav>
        <div className="px-4 mt-auto space-y-1">
          <button 
            onClick={() => setActiveTab('settings')}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-[#00323d] transition-colors text-left"
          >
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-medium">Settings</span>
          </button>
          <button 
            onClick={() => setActiveTab('support')}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:text-[#00323d] transition-colors text-left"
          >
            <span className="material-symbols-outlined">help</span>
            <span className="text-sm font-medium">Support</span>
          </button>
        </div>
      </aside>

      {/* TopNavBar */}
      <header className="fixed top-0 right-0 left-0 lg:left-64 h-16 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/15 shadow-sm">
        <div className="flex justify-between items-center px-8 w-full h-full font-['Manrope'] font-medium text-sm">
          <div className="flex items-center gap-8">
            <div className="relative w-64 group hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
              <input 
                className="w-full bg-[#f3f3f6] border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-[#1b6778]/20 text-xs outline-none" 
                placeholder={`Search ${activeTab}...`} 
                type="text"
              />
            </div>
            <nav className="flex gap-6 items-center">
              <button className="text-[#00323d] dark:text-teal-400 border-b-2 border-[#00323d] pb-1">Overview</button>
              <button className="text-slate-500 dark:text-slate-400 hover:text-[#00323d] transition-opacity">Market Trends</button>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:opacity-80 transition-opacity active:scale-95">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <Link to="/messages" className="p-2 text-slate-500 hover:opacity-80 transition-opacity active:scale-95">
              <span className="material-symbols-outlined">chat_bubble</span>
            </Link>
            <div className="h-8 w-8 rounded-full bg-[#004a59] overflow-hidden border border-slate-200">
              <img 
                className="w-full h-full object-cover" 
                alt="Vendor Profile" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcOch4Omo4wzOfa085HXHGG9FCOvYDtYWWQEjDeIE62l8bTmiuEoFZJ0iE93Df1L8GT0nJaR0R5UfoPGDM8h8fm7_3J0zkx6032rdvDwH_tOaCcUKIettKJvpNYZR4xGKUdTKKJQ7uGgZiDPa9_p3j5GymajEyTBKH_Y8sP1jUZStxOCMnLMbqQ3KFotHAMxY2R_ZLplhTvh62dgSaoSMB-W1SUOJnmXFoumvsCeJM_CLgG-ReCZJ4xbd9Jl1uhNYtcOPKy0aWMBY"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="lg:ml-64 pt-16 min-h-screen bg-[#f9f9fc]">
        {activeTab === 'dashboard' && (
          <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-black text-[#00323d] font-['Manrope']">Vendor Dashboard</h1>
                <p className="text-[#3f4945] text-sm">Welcome back, John. Here's what's happening with your store today.</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-white border border-slate-200 text-[#1a1c1e] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#f3f3f6] transition-colors">
                  <span className="material-symbols-outlined text-lg">download</span> Export Report
                </button>
                <button 
                  onClick={() => setActiveTab('inventory')}
                  className="bg-[#00323d] text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg shadow-[#00323d]/20"
                >
                  <span className="material-symbols-outlined text-lg">add</span> Add New Product
                </button>
              </div>
            </div>

            {/* Stats Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-[#e8f0fe] text-[#1a73e8] rounded-lg">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <span className="text-[#137333] text-xs font-bold flex items-center bg-[#e6f4ea] px-2 py-0.5 rounded-full">+12.5%</span>
                </div>
                <p className="text-[#3f4945] text-xs font-bold uppercase tracking-widest">Total Sales</p>
                <h3 className="text-2xl font-black mt-1">GHS 42,850</h3>
                <p className="text-[10px] text-[#3f4945] mt-2">vs. last 30 days</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-[#fef7e0] text-[#b06000] rounded-lg">
                    <span className="material-symbols-outlined">shopping_bag</span>
                  </div>
                  <span className="text-[#137333] text-xs font-bold flex items-center bg-[#e6f4ea] px-2 py-0.5 rounded-full">+5.2%</span>
                </div>
                <p className="text-[#3f4945] text-xs font-bold uppercase tracking-widest">Orders</p>
                <h3 className="text-2xl font-black mt-1">158</h3>
                <p className="text-[10px] text-[#3f4945] mt-2">vs. last 30 days</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-[#e8f0fe] text-[#1a73e8] rounded-lg">
                    <span className="material-symbols-outlined">visibility</span>
                  </div>
                  <span className="text-[#ba1a1a] text-xs font-bold flex items-center bg-[#ffdad6] px-2 py-0.5 rounded-full">-2.4%</span>
                </div>
                <p className="text-[#3f4945] text-xs font-bold uppercase tracking-widest">Store Views</p>
                <h3 className="text-2xl font-black mt-1">12,402</h3>
                <p className="text-[10px] text-[#3f4945] mt-2">vs. last 30 days</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-[#ffdad6] text-[#ba1a1a] rounded-lg">
                    <span className="material-symbols-outlined">star</span>
                  </div>
                  <span className="text-[#3f4945] text-xs font-bold flex items-center bg-[#eeeef0] px-2 py-0.5 rounded-full">Stable</span>
                </div>
                <p className="text-[#3f4945] text-xs font-bold uppercase tracking-widest">Rating</p>
                <h3 className="text-2xl font-black mt-1">4.8 / 5.0</h3>
                <p className="text-[10px] text-[#3f4945] mt-2">Based on 84 reviews</p>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Orders Table */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="font-bold text-lg">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-[#1a73e8] text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f3f3f6]">
                        <th className="px-6 py-4 text-xs font-bold text-[#3f4945] uppercase tracking-widest">Order ID</th>
                        <th className="px-6 py-4 text-xs font-bold text-[#3f4945] uppercase tracking-widest">Customer</th>
                        <th className="px-6 py-4 text-xs font-bold text-[#3f4945] uppercase tracking-widest">Amount</th>
                        <th className="px-6 py-4 text-xs font-bold text-[#3f4945] uppercase tracking-widest">Status</th>
                        <th className="px-6 py-4 text-xs font-bold text-[#3f4945] uppercase tracking-widest">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="px-6 py-4 text-sm font-bold">#ORD-8492</td>
                        <td className="px-6 py-4 text-sm">Kwame Mensah</td>
                        <td className="px-6 py-4 text-sm font-bold">GHS 1,200</td>
                        <td className="px-6 py-4">
                          <span className="bg-[#fef7e0] text-[#b06000] text-[10px] font-bold px-2 py-1 rounded-full uppercase">Processing</span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-[#1a73e8] material-symbols-outlined hover:bg-[#e8f0fe] p-1 rounded transition-colors">visibility</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-bold">#ORD-8491</td>
                        <td className="px-6 py-4 text-sm">Ama Serwaa</td>
                        <td className="px-6 py-4 text-sm font-bold">GHS 450</td>
                        <td className="px-6 py-4">
                          <span className="bg-[#e6f4ea] text-[#137333] text-[10px] font-bold px-2 py-1 rounded-full uppercase">Shipped</span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-[#1a73e8] material-symbols-outlined hover:bg-[#e8f0fe] p-1 rounded transition-colors">visibility</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-bold">#ORD-8490</td>
                        <td className="px-6 py-4 text-sm">David Osei</td>
                        <td className="px-6 py-4 text-sm font-bold">GHS 2,100</td>
                        <td className="px-6 py-4">
                          <span className="bg-[#e6f4ea] text-[#137333] text-[10px] font-bold px-2 py-1 rounded-full uppercase">Delivered</span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-[#1a73e8] material-symbols-outlined hover:bg-[#e8f0fe] p-1 rounded transition-colors">visibility</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Inventory Alerts & Quick Actions */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                  <h3 className="font-bold text-lg mb-4">Inventory Alerts</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-[#ffdad6] rounded-xl border border-[#ffdad6]">
                      <span className="material-symbols-outlined text-[#ba1a1a]">warning</span>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-[#ba1a1a]">Out of Stock</p>
                        <p className="text-xs text-[#1a1c1e]">iPhone 13 Pro Max Case</p>
                      </div>
                      <button onClick={() => setActiveTab('inventory')} className="text-[10px] font-bold text-[#ba1a1a] underline">Restock</button>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-[#fef7e0] rounded-xl border border-[#feefc3]">
                      <span className="material-symbols-outlined text-[#b06000]">error</span>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-[#b06000]">Low Stock (2 left)</p>
                        <p className="text-xs text-[#1a1c1e]">Sony WH-1000XM4</p>
                      </div>
                      <button onClick={() => setActiveTab('inventory')} className="text-[10px] font-bold text-[#b06000] underline">Restock</button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#00323d] rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-2">Boost Your Sales</h3>
                    <p className="text-xs text-white/80 mb-4 leading-relaxed">Promote your listings to reach 5x more customers in Accra and beyond.</p>
                    <button className="bg-white text-[#00323d] px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#f3f3f6] transition-colors">Create Campaign</button>
                  </div>
                  <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-white/10 text-9xl">campaign</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-['Manrope'] font-extrabold tracking-tight text-[#00323d] mb-2">Inventory Management</h2>
                <p className="text-[#3f4945] font-['Inter']">Manage your product catalog, adjust stock levels, and track listing approvals.</p>
              </div>
              <button className="bg-gradient-to-br from-[#00323d] to-[#004a59] text-white px-8 py-4 rounded-full font-['Manrope'] font-bold text-sm flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#00323d]/10">
                <span className="material-symbols-outlined">add</span>
                Add New Listing
              </button>
            </div>

            {/* Stats & Quick Actions Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
              <div className="col-span-1 md:col-span-4 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="uppercase font-bold text-slate-400 tracking-widest text-[10px]">Total Revenue</span>
                  <span className="material-symbols-outlined text-teal-600">trending_up</span>
                </div>
                <p className="text-3xl font-['Manrope'] font-extrabold text-[#00323d]">₵ 45,280.00</p>
                <p className="text-xs text-[#59c488] mt-1 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">arrow_upward</span> +12% from last month
                </p>
              </div>
              <div className="col-span-1 md:col-span-4 bg-[#f3f3f6] p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="uppercase font-bold text-slate-400 tracking-widest text-[10px]">Active Listings</span>
                  <span className="material-symbols-outlined text-slate-500">check_circle</span>
                </div>
                <p className="text-3xl font-['Manrope'] font-extrabold text-[#00323d]">124 Items</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">8 listings pending approval</p>
              </div>
              <div className="col-span-1 md:col-span-4 bg-[#fcd400]/10 p-6 rounded-xl border border-[#fcd400]/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="uppercase font-bold text-[#705d00] tracking-widest text-[10px]">Low Stock Alert</span>
                  <span className="material-symbols-outlined text-[#705d00]">warning</span>
                </div>
                <p className="text-3xl font-['Manrope'] font-extrabold text-[#00323d]">12 Items</p>
                <p className="text-xs text-[#705d00] mt-1 font-bold cursor-pointer hover:underline">Restock now →</p>
              </div>
            </div>

            {/* Inventory Controls */}
            <div className="flex flex-col gap-6">
              {/* Multi-select Action Bar & Filters */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-[#00323d]/5 rounded-lg border border-[#00323d]/10">
                    <span className="text-xs font-bold text-[#00323d]">12 Selected</span>
                    <div className="h-4 w-px bg-[#00323d]/20 mx-1"></div>
                    <button className="text-xs font-bold text-[#00323d] hover:text-teal-600 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">edit</span> Bulk Edit
                    </button>
                    <button className="text-xs font-bold text-[#ba1a1a] hover:opacity-80 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">delete</span> Delete
                    </button>
                  </div>
                  <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
                  <div className="flex items-center gap-3">
                    <select className="bg-[#f3f3f6] border-none text-xs font-semibold rounded-lg focus:ring-[#00323d]/20 py-2 pl-3 pr-8 cursor-pointer outline-none">
                      <option>All Categories</option>
                      <option>Handmade Crafts</option>
                      <option>Textiles & Fabrics</option>
                      <option>Food & Spices</option>
                    </select>
                    <select className="bg-[#f3f3f6] border-none text-xs font-semibold rounded-lg focus:ring-[#00323d]/20 py-2 pl-3 pr-8 cursor-pointer outline-none">
                      <option>All Statuses</option>
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 bg-[#f3f3f6] hover:bg-[#e8e8ea] rounded-lg transition-colors">
                    <span className="material-symbols-outlined">filter_list</span>
                  </button>
                  <button className="p-2 bg-[#f3f3f6] hover:bg-[#e8e8ea] rounded-lg transition-colors">
                    <span className="material-symbols-outlined">download</span>
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead className="bg-[#f3f3f6]">
                      <tr>
                        <th className="py-5 px-6 w-12">
                          <input className="rounded border-slate-300 text-[#00323d] focus:ring-[#00323d]" type="checkbox"/>
                        </th>
                        <th className="py-5 px-6 font-['Manrope'] font-bold text-xs uppercase tracking-wider text-slate-500">Product Info</th>
                        <th className="py-5 px-6 font-['Manrope'] font-bold text-xs uppercase tracking-wider text-slate-500">Category</th>
                        <th className="py-5 px-6 font-['Manrope'] font-bold text-xs uppercase tracking-wider text-slate-500">Pricing</th>
                        <th className="py-5 px-6 font-['Manrope'] font-bold text-xs uppercase tracking-wider text-slate-500">Inventory</th>
                        <th className="py-5 px-6 font-['Manrope'] font-bold text-xs uppercase tracking-wider text-slate-500">Status</th>
                        <th className="py-5 px-6 font-['Manrope'] font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {/* Row 1 */}
                      <tr className="hover:bg-[#f9f9fc] transition-colors">
                        <td className="py-5 px-6">
                          <input className="rounded border-slate-300 text-[#00323d] focus:ring-[#00323d]" type="checkbox"/>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                              <img className="w-full h-full object-cover" alt="Kente cloth" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMQhLO_xIwo8zpvejh4TVfvQ16MHbj07pbWS62J1WCQpz-XDxQUlcecjID-xCV2necduA2w-biihb4ng93aGIfVtMGaLyIwZZ4NZqMhgoVu7F47ewfVGZkff7YiwZ56bcxcN0ExhGTyMPVOKZQRMPXH2wTAv7osJsNK86MG4Bu1mqup_AxC7dtr9tUTgXiVdym9WgEvexrrbaEnAD1NVzKhq_dUcfQ-yDvMZBUlsgeZDvRLmc_hmEdDheRDHyho_XxplztgLiTinI"/>
                            </div>
                            <div>
                              <p className="font-bold text-sm text-[#00323d]">Premium Kente Wrap (Bonwire)</p>
                              <p className="text-[10px] text-slate-400 font-mono">SKU: KEN-001-BN</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">Textiles</span>
                        </td>
                        <td className="py-5 px-6">
                          <p className="font-bold text-sm">₵ 1,200.00</p>
                          <p className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">Fixed Price</p>
                        </td>
                        <td className="py-5 px-6">
                          <div className="w-24">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-bold">42 Left</span>
                              <span className="text-[10px] text-slate-400">Low</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#e9c400] w-[42%]"></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] font-extrabold uppercase bg-[#8df8b7] text-[#002110] border border-[#00522f]/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#004e2d]"></span> Active
                          </span>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <button className="text-slate-400 hover:text-[#00323d] transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </td>
                      </tr>
                      {/* Row 2 */}
                      <tr className="hover:bg-[#f9f9fc] transition-colors bg-[#f3f3f6]/30">
                        <td className="py-5 px-6">
                          <input defaultChecked className="rounded border-slate-300 text-[#00323d] focus:ring-[#00323d]" type="checkbox"/>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                              <img className="w-full h-full object-cover" alt="Mahogany Elephant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBdgkFPtwS9_Lmo0RD6nMVHzhB7UoywJ-I5lcuTdCeCs8vcAdMthkmiVBh2d5EhAQ4TnPGWTLRw5s45pGxdsMVVP0iXCcn8lr0unVba-7KrUfbyXTckfVsqfVB1ZcZvqbRve1lIfK9M1jZ8btFm9sZRNMVaLdagi-mjwiS9kazkFA8MQGw6W5phlS2DU0amDCXdevGqzCAjSkwpw6J-cZDYMW7RjIGTo9JM4f5gqyH35QcA5ushhUqzricwAMxGwgc3Hft1un38k8"/>
                            </div>
                            <div>
                              <p className="font-bold text-sm text-[#00323d]">Hand-Carved Mahogany Elephant</p>
                              <p className="text-[10px] text-slate-400 font-mono">SKU: ART-WOD-09</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">Arts & Crafts</span>
                        </td>
                        <td className="py-5 px-6">
                          <p className="font-bold text-sm">₵ 450.00</p>
                          <p className="text-[10px] uppercase font-bold text-[#705d00] tracking-tighter">Negotiable</p>
                        </td>
                        <td className="py-5 px-6">
                          <div className="w-24">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-bold">5 Left</span>
                              <span className="text-[10px] text-[#ba1a1a] font-bold italic">Critical</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-[#ba1a1a] w-[5%]"></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-6">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] font-extrabold uppercase bg-[#ffe16d] text-[#221b00] border border-[#544600]/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#705d00]"></span> Pending Approval
                          </span>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <button className="text-slate-400 hover:text-[#00323d] transition-colors">
                            <span className="material-symbols-outlined">more_vert</span>
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* Pagination */}
                <div className="px-6 py-4 bg-[#f3f3f6] flex items-center justify-between border-t border-slate-200/50">
                  <p className="text-xs text-slate-500">Showing <span className="font-bold text-[#00323d]">1 - 10</span> of <span className="font-bold text-[#00323d]">124</span> products</p>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 disabled:opacity-50" disabled>
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="px-3 py-1 bg-[#00323d] text-white rounded-lg text-xs font-bold">1</button>
                    <button className="px-3 py-1 bg-white text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100">2</button>
                    <button className="px-3 py-1 bg-white text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100">3</button>
                    <button className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400">
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-['Manrope'] font-extrabold tracking-tight text-[#00323d] mb-2">Order Management</h2>
                <p className="text-[#3f4945] font-['Inter']">Track, manage, and fulfill your customer orders efficiently.</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-white border border-slate-200 text-[#1a1c1e] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#f3f3f6] transition-colors">
                  <span className="material-symbols-outlined text-lg">download</span> Export Orders
                </button>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Total Orders</p>
                <h3 className="text-2xl font-black text-[#00323d]">1,240</h3>
                <p className="text-[10px] text-[#59c488] mt-2 font-bold">+5.4% from last week</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Pending Fulfillment</p>
                <h3 className="text-2xl font-black text-[#b06000]">12</h3>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">Needs immediate action</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">In Transit</p>
                <h3 className="text-2xl font-black text-[#1a73e8]">85</h3>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">Currently with couriers</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Completed</p>
                <h3 className="text-2xl font-black text-[#137333]">1,143</h3>
                <p className="text-[10px] text-slate-500 mt-2 font-medium">Successfully delivered</p>
              </div>
            </div>

            {/* Order Controls */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative w-64">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                  <input 
                    className="w-full bg-[#f3f3f6] border-none rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-[#00323d]/20 text-xs outline-none" 
                    placeholder="Search by Order ID or Customer..." 
                    type="text"
                  />
                </div>
                <select className="bg-[#f3f3f6] border-none text-xs font-semibold rounded-lg focus:ring-[#00323d]/20 py-2 pl-3 pr-8 cursor-pointer outline-none">
                  <option>All Statuses</option>
                  <option>Pending</option>
                  <option>Processing</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                  <option>Cancelled</option>
                </select>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#f3f3f6] hover:bg-[#e8e8ea] rounded-lg transition-colors text-xs font-bold text-slate-600">
                  <span className="material-symbols-outlined text-lg">calendar_today</span>
                  Last 30 Days
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 bg-[#f3f3f6] hover:bg-[#e8e8ea] rounded-lg transition-colors">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[900px]">
                  <thead className="bg-[#f3f3f6]">
                    <tr>
                      <th className="py-5 px-6 font-['Manrope'] font-bold text-xs uppercase tracking-wider text-slate-500">Order ID</th>
                      <th className="py-5 px-6 font-['Manrope'] font-bold text-xs uppercase tracking-wider text-slate-500">Date</th>
                      <th className="py-5 px-6 font-['Manrope'] font-bold text-xs uppercase tracking-wider text-slate-500">Customer</th>
                      <th className="py-5 px-6 font-['Manrope'] font-bold text-xs uppercase tracking-wider text-slate-500">Total</th>
                      <th className="py-5 px-6 font-['Manrope'] font-bold text-xs uppercase tracking-wider text-slate-500">Status</th>
                      <th className="py-5 px-6 font-['Manrope'] font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-[#f9f9fc] transition-colors">
                      <td className="py-5 px-6 font-bold text-sm text-[#00323d]">#ORD-8492</td>
                      <td className="py-5 px-6 text-sm text-slate-600">Oct 24, 2023</td>
                      <td className="py-5 px-6">
                        <p className="font-bold text-sm text-[#00323d]">Kwame Mensah</p>
                        <p className="text-[10px] text-slate-400">kwame.m@example.com</p>
                      </td>
                      <td className="py-5 px-6 font-bold text-sm">₵ 1,200.00</td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] font-extrabold uppercase bg-[#fef7e0] text-[#b06000] border border-[#feefc3]">
                          Processing
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <button className="bg-[#00323d] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold hover:brightness-110 transition-all">
                          Manage
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#f9f9fc] transition-colors">
                      <td className="py-5 px-6 font-bold text-sm text-[#00323d]">#ORD-8491</td>
                      <td className="py-5 px-6 text-sm text-slate-600">Oct 23, 2023</td>
                      <td className="py-5 px-6">
                        <p className="font-bold text-sm text-[#00323d]">Ama Serwaa</p>
                        <p className="text-[10px] text-slate-400">ama.s@example.com</p>
                      </td>
                      <td className="py-5 px-6 font-bold text-sm">₵ 450.00</td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] font-extrabold uppercase bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
                          Shipped
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <button className="bg-white border border-slate-200 text-[#00323d] px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-slate-50 transition-all">
                          Track
                        </button>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#f9f9fc] transition-colors">
                      <td className="py-5 px-6 font-bold text-sm text-[#00323d]">#ORD-8490</td>
                      <td className="py-5 px-6 text-sm text-slate-600">Oct 23, 2023</td>
                      <td className="py-5 px-6">
                        <p className="font-bold text-sm text-[#00323d]">David Osei</p>
                        <p className="text-[10px] text-slate-400">david.o@example.com</p>
                      </td>
                      <td className="py-5 px-6 font-bold text-sm">₵ 2,100.00</td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[10px] font-extrabold uppercase bg-[#e6f4ea] text-[#137333] border border-[#ceead6]">
                          Delivered
                        </span>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <button className="bg-white border border-slate-200 text-[#00323d] px-3 py-1.5 rounded-lg text-[10px] font-bold hover:bg-slate-50 transition-all">
                          Details
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="px-6 py-4 bg-[#f3f3f6] flex items-center justify-between border-t border-slate-200/50">
                <p className="text-xs text-slate-500">Showing <span className="font-bold text-[#00323d]">1 - 10</span> of <span className="font-bold text-[#00323d]">1,240</span> orders</p>
                <div className="flex gap-2">
                  <button className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400 disabled:opacity-50" disabled>
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button className="px-3 py-1 bg-[#00323d] text-white rounded-lg text-xs font-bold">1</button>
                  <button className="px-3 py-1 bg-white text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100">2</button>
                  <button className="px-3 py-1 bg-white text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-100">3</button>
                  <button className="p-2 bg-white rounded-lg border border-slate-200 text-slate-400">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-['Manrope'] font-extrabold tracking-tight text-[#00323d] mb-2">Business Analytics</h2>
                <p className="text-[#3f4945] font-['Inter']">Deep dive into your store's performance metrics and customer behavior.</p>
              </div>
              <div className="flex gap-3">
                <button className="bg-white border border-slate-200 text-[#1a1c1e] px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-[#f3f3f6] transition-colors">
                  <span className="material-symbols-outlined text-lg">calendar_today</span> Last 30 Days
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-lg mb-6">Sales Performance</h3>
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00323d" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#00323d" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="sales" stroke="#00323d" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-lg mb-6">Sales by Category</h3>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Top Category</span>
                    <span className="text-sm font-bold text-[#00323d]">Textiles (33%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Growth Rate</span>
                    <span className="text-sm font-bold text-[#137333]">+14.2%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Conversion Rate</p>
                <h3 className="text-2xl font-black text-[#00323d]">3.2%</h3>
                <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3">
                  <div className="bg-[#00323d] h-full w-[32%] rounded-full"></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Avg. Order Value</p>
                <h3 className="text-2xl font-black text-[#00323d]">₵ 245.00</h3>
                <p className="text-[10px] text-[#137333] mt-2 font-bold">+₵ 12.00 vs last month</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Customer Retention</p>
                <h3 className="text-2xl font-black text-[#00323d]">68%</h3>
                <p className="text-[10px] text-[#137333] mt-2 font-bold">+2% improvement</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Return Rate</p>
                <h3 className="text-2xl font-black text-[#ba1a1a]">1.4%</h3>
                <p className="text-[10px] text-[#137333] mt-2 font-bold">-0.5% decrease</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="p-10 max-w-7xl mx-auto">
            {/* Header Section */}
            <header className="mb-12">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-primary opacity-60 mb-2 block">Account Dashboard</span>
              <h1 className="text-4xl font-extrabold text-on-surface tracking-tight">Financials & <span className="text-primary-container">Withdrawals</span></h1>
            </header>

            {/* Earnings Bento Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {/* Ready for Release */}
              <div className="md:col-span-2 relative overflow-hidden rounded-[2rem] primary-gradient p-8 text-white editorial-shadow flex flex-col justify-between min-h-[240px]">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-primary-fixed-dim text-sm font-medium mb-1">Current Balance</p>
                    <h2 className="text-5xl font-extrabold tracking-tighter">GH₵ 14,280.50</h2>
                  </div>
                  <span className="material-symbols-outlined text-4xl opacity-20">verified_user</span>
                </div>
                <div className="flex items-center gap-6">
                  <button className="bg-secondary-container text-on-secondary-container px-8 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-lg">paid</span>
                    Withdraw Funds
                  </button>
                  <p className="text-xs text-primary-fixed/60 max-w-[180px]">Available for instant release to your preferred account.</p>
                </div>
                {/* Abstract visual element */}
                <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
              </div>

              {/* Escrow/Pending */}
              <div className="bg-surface-container-low rounded-[2rem] p-8 flex flex-col justify-between border border-outline-variant/10">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-secondary text-xl">schedule</span>
                    <p className="text-sm font-semibold text-on-surface-variant">Pending Balance</p>
                  </div>
                  <h3 className="text-3xl font-bold text-on-surface tracking-tight">GH₵ 3,120.00</h3>
                </div>
                <div className="pt-6 border-t border-outline-variant/20">
                  <p className="text-xs text-on-surface-variant leading-relaxed">Held in escrow for active orders. Expected release: <span className="font-bold text-on-surface">Oct 24 - 26</span></p>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Transaction History */}
              <div className="lg:col-span-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-on-surface">Recent Activity</h3>
                  <div className="flex gap-2">
                    <button className="px-4 py-1.5 rounded-full text-xs font-semibold bg-surface-container-high text-on-surface">All</button>
                    <button className="px-4 py-1.5 rounded-full text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors">Sales</button>
                    <button className="px-4 py-1.5 rounded-full text-xs font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors">Payouts</button>
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Transaction Item 1 */}
                  <div className="group bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between hover:bg-surface-container-low transition-all duration-300 cursor-pointer border border-transparent hover:border-outline-variant/10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-tertiary-fixed/30 flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_shopping_cart</span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">Order #GH-9021</p>
                        <p className="text-xs text-on-surface-variant">Handwoven Kente Fabric • 2:40 PM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-tertiary">+ GH₵ 850.00</p>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-tertiary-fixed-dim/20 text-on-tertiary-fixed-variant font-bold uppercase tracking-wider">Completed</span>
                    </div>
                  </div>
                  {/* Transaction Item 2 */}
                  <div className="group bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between hover:bg-surface-container-low transition-all duration-300 cursor-pointer border border-transparent hover:border-outline-variant/10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-fixed/30 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">campaign</span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">Featured Ad Spend</p>
                        <p className="text-xs text-on-surface-variant">Weekly Homepage Placement • 11:15 AM</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-error">- GH₵ 120.00</p>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-bold uppercase tracking-wider">Billed</span>
                    </div>
                  </div>
                  {/* Transaction Item 3 */}
                  <div className="group bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between hover:bg-surface-container-low transition-all duration-300 cursor-pointer border border-transparent hover:border-outline-variant/10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-secondary-fixed/30 flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined">account_balance</span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">Withdrawal Request</p>
                        <p className="text-xs text-on-surface-variant">Bank Transfer to Stanbic • Yesterday</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-on-surface-variant">GH₵ 5,000.00</p>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-secondary-fixed/30 text-secondary font-bold uppercase tracking-wider">Processing</span>
                    </div>
                  </div>
                </div>
                <button className="mt-8 w-full py-4 text-sm font-bold text-primary hover:bg-surface-container transition-colors rounded-xl border border-dashed border-outline-variant/40">
                  View Full Transaction Ledger
                </button>
              </div>

              {/* Withdrawal Interface */}
              <div className="lg:col-span-4">
                <div className="bg-surface-container-lowest rounded-[2rem] p-8 editorial-shadow sticky top-24">
                  <h3 className="text-xl font-bold text-on-surface mb-6">Quick Withdrawal</h3>
                  <div className="space-y-6">
                    {/* Method Selection */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-3 block">Payout Method</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-primary-container bg-primary/5 text-primary">
                          <span className="material-symbols-outlined mb-2">smartphone</span>
                          <span className="text-xs font-bold">Mobile Money</span>
                        </button>
                        <button className="flex flex-col items-center justify-center p-4 rounded-2xl border-2 border-transparent bg-surface-container-low text-on-surface-variant hover:border-outline-variant transition-all">
                          <span className="material-symbols-outlined mb-2">account_balance</span>
                          <span className="text-xs font-bold">Bank Transfer</span>
                        </button>
                      </div>
                    </div>
                    {/* Amount Input */}
                    <div>
                      <label className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest mb-3 block">Amount to Withdraw</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-on-surface">GH₵</span>
                        <input className="w-full pl-12 pr-4 py-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary-container font-bold text-lg" placeholder="0.00" type="number" />
                      </div>
                      <p className="mt-2 text-[10px] text-on-surface-variant">Min: GH₵ 50.00 • Max: GH₵ 20,000.00</p>
                    </div>
                    {/* Verification Step */}
                    <div className="p-4 bg-secondary-container/10 rounded-2xl border border-secondary/10">
                      <div className="flex gap-3 items-start">
                        <span className="material-symbols-outlined text-secondary text-sm">verified</span>
                        <div>
                          <p className="text-xs font-bold text-on-surface">Verified Recipient</p>
                          <p className="text-[11px] text-on-secondary-container opacity-80 mt-0.5">MTN Mobile Money: ****9012 (Kwame M.)</p>
                        </div>
                      </div>
                    </div>
                    {/* Proceed Button */}
                    <button className="w-full py-4 primary-gradient text-white rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all">
                      Confirm Withdrawal
                    </button>
                    <div className="flex items-center justify-center gap-2 opacity-50">
                      <span className="material-symbols-outlined text-xs">lock</span>
                      <span className="text-[10px] font-medium">Secured by Marketplace Escrow Protocol</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Editorial Info Section */}
            <section className="mt-24 pt-16 border-t border-outline-variant/10 grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h4 className="font-bold text-on-surface mb-3">Escrow Safety</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">Payments are held securely until the buyer confirms delivery or 7 days have passed without a dispute.</p>
              </div>
              <div>
                <h4 className="font-bold text-on-surface mb-3">Payout Schedule</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">Mobile Money transfers are instant. Bank transfers typically settle within 24-48 business hours.</p>
              </div>
              <div>
                <h4 className="font-bold text-on-surface mb-3">Service Fees</h4>
                <p className="text-sm text-on-surface-variant leading-relaxed">We maintain a flat 5% marketplace commission on successful sales. Withdrawal fees may apply based on provider.</p>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'ads' && (
          <div className="p-6 md:p-10 max-w-[1600px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-['Manrope'] font-extrabold tracking-tight text-[#00323d] mb-2">Advertising Center</h2>
                <p className="text-[#3f4945] font-['Inter']">Boost your product visibility and reach more customers with targeted ads.</p>
              </div>
              <button className="bg-[#00323d] text-white px-8 py-4 rounded-full font-['Manrope'] font-bold text-sm flex items-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#00323d]/10">
                <span className="material-symbols-outlined">add</span>
                Create Campaign
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Active Campaigns</p>
                <h3 className="text-3xl font-black text-[#00323d]">4</h3>
                <p className="text-[10px] text-[#137333] mt-2 font-bold">2 ending soon</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Total Impressions</p>
                <h3 className="text-3xl font-black text-[#00323d]">42.5K</h3>
                <p className="text-[10px] text-[#137333] mt-2 font-bold">+15% this week</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Avg. CTR</p>
                <h3 className="text-3xl font-black text-[#00323d]">2.8%</h3>
                <p className="text-[10px] text-[#137333] mt-2 font-bold">Above industry avg</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="font-bold text-xl">Active Campaigns</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#00323d]/30 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-xl bg-[#f3f3f6] overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://picsum.photos/seed/kente/200" alt="Ad" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#00323d]">Kente Festive Sale</h4>
                        <p className="text-xs text-slate-500">Search Results Ad • Active</p>
                      </div>
                    </div>
                    <span className="bg-[#e6f4ea] text-[#137333] text-[10px] font-bold px-3 py-1 rounded-full uppercase">Running</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Spent</p>
                      <p className="text-sm font-bold">₵ 450.00</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Clicks</p>
                      <p className="text-sm font-bold">1,240</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">ROAS</p>
                      <p className="text-sm font-bold text-[#137333]">4.2x</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#f3f3f6] text-[#00323d] py-2 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">Edit</button>
                    <button className="flex-1 bg-[#f3f3f6] text-[#00323d] py-2 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">Pause</button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#00323d]/30 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-xl bg-[#f3f3f6] overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://picsum.photos/seed/craft/200" alt="Ad" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#00323d]">Handmade Crafts Promo</h4>
                        <p className="text-xs text-slate-500">Homepage Banner • Active</p>
                      </div>
                    </div>
                    <span className="bg-[#e6f4ea] text-[#137333] text-[10px] font-bold px-3 py-1 rounded-full uppercase">Running</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Spent</p>
                      <p className="text-sm font-bold">₵ 820.00</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">Clicks</p>
                      <p className="text-sm font-bold">2,850</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">ROAS</p>
                      <p className="text-sm font-bold text-[#137333]">3.8x</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#f3f3f6] text-[#00323d] py-2 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">Edit</button>
                    <button className="flex-1 bg-[#f3f3f6] text-[#00323d] py-2 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">Pause</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="p-6 md:p-10 max-w-[1000px] mx-auto">
            <h2 className="text-3xl font-black text-[#00323d] mb-10 font-['Manrope']">Account Settings</h2>
            
            <div className="space-y-12">
              <section>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00323d]">person</span>
                  Profile Information
                </h3>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="h-20 w-20 rounded-full bg-[#004a59] overflow-hidden border-4 border-white shadow-lg">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcOch4Omo4wzOfa085HXHGG9FCOvYDtYWWQEjDeIE62l8bTmiuEoFZJ0iE93Df1L8GT0nJaR0R5UfoPGDM8h8fm7_3J0zkx6032rdvDwH_tOaCcUKIettKJvpNYZR4xGKUdTKKJQ7uGgZiDPa9_p3j5GymajEyTBKH_Y8sP1jUZStxOCMnLMbqQ3KFotHAMxY2R_ZLplhTvh62dgSaoSMB-W1SUOJnmXFoumvsCeJM_CLgG-ReCZJ4xbd9Jl1uhNYtcOPKy0aWMBY" alt="Profile" />
                    </div>
                    <button className="bg-[#f3f3f6] text-[#00323d] px-4 py-2 rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors">Change Photo</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
                      <input className="w-full bg-[#f3f3f6] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#00323d]/20 outline-none font-medium" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                      <input className="w-full bg-[#f3f3f6] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#00323d]/20 outline-none font-medium" defaultValue="john.doe@ghcurated.com" />
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00323d]">store</span>
                  Business Details
                </h3>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Store Name</label>
                    <input className="w-full bg-[#f3f3f6] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#00323d]/20 outline-none font-medium" defaultValue="GhanaCurated Crafts" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase">Store Description</label>
                    <textarea className="w-full bg-[#f3f3f6] border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-[#00323d]/20 outline-none font-medium h-32 resize-none" defaultValue="Authentic Ghanaian handmade crafts and textiles sourced directly from local artisans in Kumasi and Accra." />
                  </div>
                </div>
              </section>

              <div className="flex justify-end gap-4">
                <button className="px-8 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors">Cancel</button>
                <button className="bg-[#00323d] text-white px-10 py-3 rounded-xl font-bold hover:brightness-110 transition-all shadow-lg shadow-[#00323d]/20">Save Changes</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="p-6 md:p-10 max-w-[1000px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-[#00323d] mb-4 font-['Manrope']">How can we help you?</h2>
              <div className="relative max-w-2xl mx-auto">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:ring-4 focus:ring-[#00323d]/5 outline-none font-medium shadow-sm" placeholder="Search help articles, guides, and more..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#00323d]/30 transition-all cursor-pointer group">
                <span className="material-symbols-outlined text-3xl text-[#00323d] mb-4 group-hover:scale-110 transition-transform">menu_book</span>
                <h4 className="font-bold mb-2">Knowledge Base</h4>
                <p className="text-xs text-slate-500">Browse detailed guides on selling, shipping, and payments.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#00323d]/30 transition-all cursor-pointer group">
                <span className="material-symbols-outlined text-3xl text-[#00323d] mb-4 group-hover:scale-110 transition-transform">chat</span>
                <h4 className="font-bold mb-2">Live Chat</h4>
                <p className="text-xs text-slate-500">Speak with our support team in real-time for urgent issues.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#00323d]/30 transition-all cursor-pointer group">
                <span className="material-symbols-outlined text-3xl text-[#00323d] mb-4 group-hover:scale-110 transition-transform">mail</span>
                <h4 className="font-bold mb-2">Email Support</h4>
                <p className="text-xs text-slate-500">Send us a ticket and we'll get back to you within 24 hours.</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-xl mb-8">Frequently Asked Questions</h3>
              <div className="space-y-6">
                <div className="pb-6 border-b border-slate-100">
                  <h4 className="font-bold text-[#00323d] mb-2">How do I request a payout?</h4>
                  <p className="text-sm text-slate-600">You can request a payout once your available balance reaches ₵ 100. Go to the Payments tab and click 'Request Payout'.</p>
                </div>
                <div className="pb-6 border-b border-slate-100">
                  <h4 className="font-bold text-[#00323d] mb-2">What are the commission fees?</h4>
                  <p className="text-sm text-slate-600">We charge a flat 10% commission on all successful sales. This covers platform maintenance and marketing.</p>
                </div>
                <div className="pb-6 border-b border-slate-100">
                  <h4 className="font-bold text-[#00323d] mb-2">How do I handle returns?</h4>
                  <p className="text-sm text-slate-600">Customers can request returns within 7 days of delivery. You can manage return requests from the Orders tab.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex items-center justify-around py-3 px-4 z-50">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-[#00323d]' : 'text-slate-500'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'dashboard' ? "'FILL' 1" : "" }}>dashboard</span>
          <span className="text-[10px] font-bold">Dashboard</span>
        </button>
        <button 
          onClick={() => setActiveTab('inventory')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'inventory' ? 'text-[#00323d]' : 'text-slate-500'}`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'inventory' ? "'FILL' 1" : "" }}>inventory_2</span>
          <span className="text-[10px] font-bold">Inventory</span>
        </button>
        <button 
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'orders' ? 'text-[#00323d]' : 'text-slate-500'} relative`}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: activeTab === 'orders' ? "'FILL' 1" : "" }}>shopping_cart</span>
          <span className="text-[10px] font-bold">Orders</span>
          <span className="absolute -top-1 -right-1 bg-[#ba1a1a] text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
        </button>
        <Link to="/messages" className="flex flex-col items-center gap-1 text-slate-500">
          <span className="material-symbols-outlined">chat</span>
          <span className="text-[10px] font-bold">Messages</span>
        </Link>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'settings' ? 'text-[#00323d]' : 'text-slate-500'}`}
        >
          <span className="material-symbols-outlined">account_circle</span>
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </nav>

      {/* Floating Action Feedback (Optional) */}
      {activeTab === 'inventory' && (
        <div className="fixed bottom-20 lg:bottom-8 right-8 bg-[#2f3133] text-[#f0f0f3] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 max-w-sm border border-white/10 z-40">
          <div className="h-8 w-8 rounded-full bg-[#8df8b7] flex items-center justify-center text-[#002110]">
            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          <div>
            <p className="text-sm font-bold">Stock Updated</p>
            <p className="text-xs opacity-80">12 items updated successfully.</p>
          </div>
          <button className="ml-auto text-xs font-bold uppercase tracking-widest text-[#ffe16d]">Dismiss</button>
        </div>
      )}
    </div>
  );
};

export default VendorPortalInterface;

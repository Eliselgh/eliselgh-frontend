import { 
  BarChart3, 
  ShieldCheck, 
  Wallet, 
  Gavel, 
  AlertTriangle, 
  Megaphone, 
  LineChart, 
  LogOut,
  Search,
  Bell,
  Settings,
  Filter,
  Download,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Lock,
  MoreVertical,
  ShieldAlert,
  History,
  Check,
  Flag,
  X,
  Maximize2,
  User,
  Shield,
  Zap,
  MessageSquare,
  Archive,
  Paperclip,
  Scale,
  Info,
  Layers,
  Activity,
  Globe,
  FileText,
  Truck,
  ShoppingCart,
  ArrowUp,
  AlertCircle,
  Package,
  RotateCcw,
  Eye,
  Ban,
  Edit,
  Circle,
  Users,
  UserCheck,
  School,
  Percent,
  Star,
  Rocket,
  Network,
  LayoutDashboard,
  HeartPulse,
  ReceiptText,
  Landmark,
  HelpCircle,
  BadgeCheck,
  Sliders,
  UserPlus,
  Bot,
  ArrowRight,
  Database,
  ExternalLink,
  Award,
  IdCard,
  Calendar,
  CreditCard,
  MousePointerClick,
  Store,
  LayoutGrid,
  Image,
  Columns,
  Tag,
  Mail,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import MarketInterface from './components/MarketInterface';
import CheckoutInterface from './components/CheckoutInterface';
import ServicesInterface from './components/ServicesInterface';
import MessagingInterface from './components/MessagingInterface';
import VendorPortalInterface from './components/VendorPortalInterface';

// --- Types ---

type View = 'verification' | 'moderation' | 'intelligence' | 'escrow' | 'disputes' | 'services' | 'ads' | 'ads-review' | 'analytics' | 'system-status' | 'forms' | 'students' | 'permissions' | 'wholesale' | 'settings' | 'security';

interface Seller {
  id: string;
  name: string;
  regId: string;
  avatar: string;
  isPremium: boolean;
  status: 'online' | 'offline' | 'busy';
  verification: {
    ghanaCard: 'verified' | 'conflicted' | 'pending';
    bizLicense: 'verified' | 'reviewing' | 'blocked';
  };
  tenure: string;
  stability: string;
  riskScore: number;
  riskLevel: 'Low' | 'Mid' | 'High';
}

interface ProductListing {
  id: string;
  title: string;
  seller: string;
  sellerTier: string;
  price: string;
  reliability: string;
  category: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  image: string;
  compliance: {
    label: string;
    status: 'pass' | 'fail' | 'info';
  }[];
}

interface EscrowTransaction {
  id: string;
  recipient: string;
  initials: string;
  amount: string;
  purpose: string;
  status: 'HELD' | 'RELEASED' | 'FROZEN';
  compliance: 'verified' | 'dispute';
  network?: string;
  timestamp?: string;
  commission?: string;
  commissionRate?: string;
}

interface DisputeMessage {
  id: string;
  sender: string;
  role: 'Buyer' | 'Vendor' | 'System';
  avatar: string;
  timestamp: string;
  content: string;
}

interface DisputeCase {
  id: string;
  title: string;
  buyer: string;
  vendor: string;
  amount: string;
  status: string;
  description: string;
  messages: DisputeMessage[];
  evidence: string[];
}

interface ServiceApplication {
  id: string;
  name: string;
  category: string;
  avatar: string;
  portfolioScore: number;
  status: 'Needs Review' | 'Background Flag' | 'Auto-Pass Candidate';
  projects: number;
  submittedAt: string;
}

interface ServiceBooking {
  id: string;
  provider: string;
  client: string;
  category: string;
  amount: string;
  status: 'Funds Secured' | 'Pending Release' | 'Disputed';
  initials?: string;
  avatar?: string;
}

// --- Mock Data ---

const SELLERS: Seller[] = [
  {
    id: '1',
    name: "Amina's Textile Hub",
    regId: "GH-5582-X",
    avatar: "https://picsum.photos/seed/amina/200",
    isPremium: true,
    status: 'online',
    verification: { ghanaCard: 'verified', bizLicense: 'reviewing' },
    tenure: "36+ Months",
    stability: "High Stability",
    riskScore: 12,
    riskLevel: 'Low'
  },
  {
    id: '2',
    name: "Osei Wholesale LTD",
    regId: "GH-9912-K",
    avatar: "https://picsum.photos/seed/osei/200",
    isPremium: false,
    status: 'busy',
    verification: { ghanaCard: 'conflicted', bizLicense: 'blocked' },
    tenure: "Unpredictable",
    stability: "Churn Risk",
    riskScore: 88,
    riskLevel: 'High'
  },
  {
    id: '3',
    name: "Kofi’s Agro-Tech",
    regId: "GH-1022-P",
    avatar: "https://picsum.photos/seed/kofi/200",
    isPremium: false,
    status: 'online',
    verification: { ghanaCard: 'verified', bizLicense: 'verified' },
    tenure: "24+ Months",
    stability: "Stable Growth",
    riskScore: 34,
    riskLevel: 'Mid'
  }
];

const PRODUCTS: ProductListing[] = [
  {
    id: 'p1',
    title: "Apex Velocity Runners",
    seller: "Kwame Osei",
    sellerTier: "Gold Vendor",
    price: "₵1,200",
    reliability: "98%",
    category: "Footwear",
    riskLevel: "High",
    image: "https://picsum.photos/seed/shoes/600/400",
    compliance: [
      { label: "Price within category range", status: 'pass' },
      { label: "Possible brand copyright: 'Apex'", status: 'fail' },
      { label: "High resolution assets", status: 'pass' }
    ]
  },
  {
    id: 'p2',
    title: "Eco-Digital Bamboo Watch",
    seller: "Abena Mensah",
    sellerTier: "New Seller",
    price: "₵450",
    reliability: "45%",
    category: "Lifestyle",
    riskLevel: "Low",
    image: "https://picsum.photos/seed/watch/600/400",
    compliance: [
      { label: "Authentic photography confirmed", status: 'pass' },
      { label: "Category match: Electronics", status: 'pass' },
      { label: "New seller verification pending", status: 'info' }
    ]
  },
  {
    id: 'p3',
    title: "Urban Edge High-Tops",
    seller: "John Doe",
    sellerTier: "Verified Vendor",
    price: "₵1,850",
    reliability: "88%",
    category: "Footwear",
    riskLevel: "Medium",
    image: "https://picsum.photos/seed/sneakers/600/400",
    compliance: [
      { label: "Metadata matches product tags", status: 'pass' },
      { label: "Keyword 'Limited Edition' detected", status: 'info' },
      { label: "Shipping policy compliant", status: 'pass' }
    ]
  }
];

const ESCROW_TRANSACTIONS: EscrowTransaction[] = [
  {
    id: 'TXN-9021-44B',
    recipient: 'Kwesi Arthur',
    initials: 'KA',
    amount: '₵4,200.00',
    purpose: 'Furniture Order',
    status: 'RELEASED',
    compliance: 'verified',
    network: 'MTN Mobile Money',
    timestamp: 'Oct 24, 2023 14:22:10 UTC',
    commission: '₵ 210.00',
    commissionRate: '5.00%'
  },
  {
    id: 'TXN-8840-21X',
    recipient: 'Ofori Electronics',
    initials: 'OE',
    amount: '₵12,850.00',
    purpose: 'Service Fee',
    status: 'HELD',
    compliance: 'verified',
    network: 'Visa/Mastercard',
    timestamp: 'Oct 24, 2023 13:05:44 UTC',
    commission: '₵ 578.25',
    commissionRate: '4.50%'
  },
  {
    id: 'TXN-0032-ERR',
    recipient: 'Abena Appiah',
    initials: 'AA',
    amount: '₵25,000.00',
    purpose: 'Estate Deposit',
    status: 'FROZEN',
    compliance: 'dispute',
    network: 'eliseladmin Internal',
    timestamp: 'Oct 24, 2023 12:50:01 UTC',
    commission: '₵ 1,250.00',
    commissionRate: 'Held'
  }
];

const DISPUTE_CASE: DisputeCase = {
  id: '#DX-99201',
  title: "High-Value Electronic Dispute",
  buyer: "Kofi Mensah",
  vendor: "TechHaven GH",
  amount: "₵24,500.00",
  status: "Mediation",
  description: "Dispute filed by Kofi Mensah (Buyer) against TechHaven GH (Vendor) regarding a Macbook Pro M2 transaction.",
  messages: [
    {
      id: 'm1',
      sender: 'Kofi Mensah',
      role: 'Buyer',
      avatar: 'https://picsum.photos/seed/kofi/100',
      timestamp: 'Oct 12, 14:32',
      content: "The laptop arrived with a noticeable crack on the screen hinge. The box was sealed, but this is a hardware defect or transit damage that wasn't disclosed. I want a full refund or a screen replacement voucher."
    },
    {
      id: 'm2',
      sender: 'TechHaven GH',
      role: 'Vendor',
      avatar: 'https://picsum.photos/seed/tech/100',
      timestamp: 'Oct 12, 16:05',
      content: "We inspect every unit before shipping. The pictures provided by the buyer show a crack that looks like impact damage after unboxing. We cannot issue a full refund for user-inflicted damage."
    }
  ],
  evidence: [
    'https://picsum.photos/seed/crack1/400',
    'https://picsum.photos/seed/box/400',
    'https://picsum.photos/seed/inspection/400'
  ]
};

const SERVICE_APPLICATIONS: ServiceApplication[] = [
  {
    id: '1',
    name: 'Ama Serwaa',
    category: 'Interior Architecture',
    avatar: 'https://picsum.photos/seed/ama/100',
    portfolioScore: 4.9,
    status: 'Needs Review',
    projects: 12,
    submittedAt: '2 Hours Ago'
  },
  {
    id: '2',
    name: 'Kofi Mensah',
    category: 'Cloud Infrastructure',
    avatar: 'https://picsum.photos/seed/kofi_dev/100',
    portfolioScore: 5.0,
    status: 'Background Flag',
    projects: 8,
    submittedAt: '5 Hours Ago'
  },
  {
    id: '3',
    name: 'Efua Boateng',
    category: 'Strategic Branding',
    avatar: 'https://picsum.photos/seed/efua/100',
    portfolioScore: 4.7,
    status: 'Auto-Pass Candidate',
    projects: 25,
    submittedAt: 'Yesterday'
  }
];

const SERVICE_BOOKINGS: ServiceBooking[] = [
  {
    id: '#SRV-8902',
    provider: 'Kwame Appiah',
    client: 'TechGlobal Ltd',
    category: 'DevOps Setup',
    amount: '₵12,400.00',
    status: 'Funds Secured',
    initials: 'KA'
  },
  {
    id: '#SRV-8891',
    provider: 'Linda Osei',
    client: 'ArchiDesign',
    category: 'Legal Audit',
    amount: '₵4,500.00',
    status: 'Pending Release',
    avatar: 'https://picsum.photos/seed/linda/100'
  },
  {
    id: '#SRV-8884',
    provider: 'John Sackey',
    client: 'Private Client',
    category: 'Event Planning',
    amount: '₵8,200.00',
    status: 'Disputed',
    initials: 'JS'
  }
];

// --- Components ---

const Sidebar = ({ currentView, onViewChange }: { currentView: View, onViewChange: (view: View) => void }) => (
  <aside className="fixed left-0 top-0 h-full w-[280px] z-50 bg-[#00323d] flex flex-col py-6 border-r border-white/5 shadow-2xl">
    <div className="px-8 mb-10">
      <h1 className="text-2xl font-black text-white leading-none font-headline">GhanaCurated</h1>
      <p className="font-headline uppercase tracking-widest text-[10px] font-bold text-teal-300/70 mt-2">Admin Command Center</p>
    </div>
    
    <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
      <div className="text-teal-300/40 font-headline uppercase tracking-widest text-[9px] font-bold px-8 mb-2">Core Systems</div>
      <NavItem icon={<BarChart3 size={18} />} label="Intelligence" active={currentView === 'intelligence'} onClick={() => onViewChange('intelligence')} />
      <NavItem icon={<ShieldCheck size={18} />} label="Verification" active={currentView === 'verification'} onClick={() => onViewChange('verification')} />
      <NavItem icon={<Shield size={18} />} label="Permissions" active={currentView === 'permissions'} onClick={() => onViewChange('permissions')} />
      <NavItem icon={<Gavel size={18} />} label="Moderation" active={currentView === 'moderation'} onClick={() => onViewChange('moderation')} />
      <NavItem icon={<Settings size={18} />} label="Settings" active={currentView === 'settings'} onClick={() => onViewChange('settings')} />
      <NavItem icon={<Package size={18} />} label="Wholesale" active={currentView === 'wholesale'} onClick={() => onViewChange('wholesale')} />
      <NavItem icon={<Wallet size={18} />} label="Escrow" active={currentView === 'escrow'} onClick={() => onViewChange('escrow')} />
      <NavItem icon={<AlertTriangle size={18} />} label="Disputes" active={currentView === 'disputes'} onClick={() => onViewChange('disputes')} />
      <NavItem icon={<Layers size={18} />} label="Services" active={currentView === 'services'} onClick={() => onViewChange('services')} />
      <NavItem icon={<FileText size={18} />} label="Forms" active={currentView === 'forms'} onClick={() => onViewChange('forms')} />
      <NavItem icon={<School size={18} />} label="Students" active={currentView === 'students'} onClick={() => onViewChange('students')} />
      
      <div className="text-teal-300/40 font-headline uppercase tracking-widest text-[9px] font-bold px-8 mb-2 mt-6">Growth & Data</div>
      <NavItem icon={<Megaphone size={18} />} label="Ads" active={currentView === 'ads'} onClick={() => onViewChange('ads')} />
      <NavItem icon={<LineChart size={18} />} label="Analytics" active={currentView === 'analytics'} onClick={() => onViewChange('analytics')} />
      <NavItem icon={<Activity size={18} />} label="System Status" active={currentView === 'system-status'} onClick={() => onViewChange('system-status')} />
      
      <div className="text-teal-300/40 font-headline uppercase tracking-widest text-[9px] font-bold px-8 mb-2 mt-6">Public Access</div>
      <a 
        href="/" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-8 py-3 text-teal-300/60 hover:text-teal-300 hover:bg-white/5 transition-all group"
      >
        <ExternalLink size={18} />
        <span className="font-headline font-bold text-sm">Market URL</span>
      </a>
    </nav>

    <div className="px-6 mt-auto">
      <Link 
        to="/"
        className="w-full bg-teal-500/20 p-4 rounded-xl mb-4 border border-teal-500/30 text-left group hover:bg-teal-500/30 transition-all flex items-center justify-between"
      >
        <div>
          <p className="text-[10px] font-bold text-teal-400 font-headline uppercase tracking-widest">Marketplace</p>
          <p className="text-[9px] text-teal-300/50 font-medium">Public Facing Store</p>
        </div>
        <ArrowRight size={14} className="text-teal-400 group-hover:translate-x-1 transition-transform" />
      </Link>
      <button 
        onClick={() => onViewChange('system-status')}
        className="w-full bg-white/5 p-4 rounded-xl mb-4 border border-white/10 text-left group hover:bg-white/10 transition-all"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <p className="text-[10px] font-bold text-emerald-400 font-headline">System Status: Healthy</p>
        </div>
        <p className="text-[9px] text-teal-300/50 font-medium">All systems operational</p>
      </button>
      <button className="w-full text-teal-300/70 py-3 px-4 flex items-center gap-3 hover:bg-white/5 hover:text-white transition-all rounded-lg">
        <LogOut size={18} />
        <span className="font-headline uppercase tracking-widest text-[10px] font-bold">Log Out</span>
      </button>
    </div>
  </aside>
);

const NavItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`w-full py-3 px-6 flex items-center gap-3 transition-all border-l-4 ${
      active 
        ? 'bg-white/10 text-white border-secondary-container' 
        : 'text-teal-300/70 border-transparent hover:bg-white/5 hover:text-white'
    }`}
  >
    {icon}
    <span className="font-headline uppercase tracking-widest text-[10px] font-bold">{label}</span>
  </button>
);

const TopBar = ({ title }: { title: string }) => (
  <header className="fixed top-0 right-0 w-[calc(100%-280px)] z-40 bg-white/80 glass-effect shadow-sm h-16 flex justify-between items-center px-8 border-b border-slate-100">
    <div className="flex items-center gap-6">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder={`Search ${title.toLowerCase()}...`} 
          className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20 w-64 transition-all focus:w-80 outline-none"
        />
      </div>
    </div>
    
    <div className="flex items-center gap-4">
      <Link 
        to="/market" 
        target="_blank"
        className="flex items-center gap-2 text-teal-600 hover:text-teal-800 transition-colors mr-4"
      >
        <ExternalLink size={16} />
        <span className="text-xs font-bold uppercase tracking-widest">Market</span>
      </Link>
      <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
        <Bell size={20} />
        <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
      </button>
      <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors">
        <Settings size={20} />
      </button>
      <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs font-bold text-primary leading-none">Kwame Mensah</p>
          <p className="text-[10px] text-slate-500 font-medium">Head of Verification</p>
        </div>
        <img 
          src="https://picsum.photos/seed/admin/100" 
          alt="Admin" 
          className="w-10 h-10 rounded-full object-cover border-2 border-primary/10"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  </header>
);

const StatCard = ({ label, value, trend, color = 'primary', icon }: { label: string, value: string, trend?: string, color?: string, icon?: React.ReactNode }) => (
  <div className={`p-6 bg-white rounded-xl shadow-sm border-b-2 flex flex-col justify-between ${
    color === 'error' ? 'border-error/20' : color === 'secondary' ? 'border-secondary/20' : color === 'primary-container' ? 'bg-primary-container border-primary' : 'border-primary/20'
  }`}>
    <div className="flex justify-between items-start">
      {icon && <div className={`${color === 'primary-container' ? 'text-white/70' : 'text-primary'}`}>{icon}</div>}
      {trend && (
        <div className={`flex items-center gap-1 text-[10px] font-bold ${color === 'primary-container' ? 'text-teal-300' : color === 'error' ? 'text-error' : 'text-emerald-600'}`}>
          <TrendingUp size={12} />
          {trend}
        </div>
      )}
    </div>
    <div className="mt-4">
      <p className={`text-3xl font-black font-headline ${color === 'primary-container' ? 'text-white' : color === 'error' ? 'text-error' : 'text-primary'}`}>{value}</p>
      <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${color === 'primary-container' ? 'text-white/70' : 'text-on-surface-variant'}`}>{label}</p>
    </div>
  </div>
);

const VerificationQueue = () => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('pending');
  const [search, setSearch] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: 'dateSubmitted', direction: 'asc' | 'desc' } | null>(null);
  const [showUrgentOnly, setShowUrgentOnly] = useState(false);

  const sellers = [
    {
      id: '1',
      name: "Kofi Anan",
      merchantId: "#3321",
      idType: "Ghana Card",
      dateSubmitted: new Date('2023-10-24'),
      status: "Pending",
      initials: "KA",
      avatar: null
    },
    {
      id: '2',
      name: "Ama Serwaa",
      merchantId: "#3324",
      idType: "Ghana Card",
      dateSubmitted: new Date('2023-10-24'),
      status: "Pending",
      initials: "AS",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmgw-uEnqmsUUhidTLvkdSH4ZmInTcBQR2KI5JIwDG11mkeFrx0EFqLJlt9VJGtoZMJo_E_xud11JvIiZMWiyeiDvuXwgHcCeHowsNebzsRU7xAKYmVWniJdFOHVPmV465Q9PiflEybnOKyBDV-AoMFRKeAdZFx2kYQqZm-_hcCDHeVFWtXf7rW6HMMXDLr0AVsCbhvOWGL5XxNpuusOWuMOJ4w3LIxmg_LfH5mOogWTIIKWMUfItUWkBUdFlK2inH-V5-n8LJMX0"
    },
    {
      id: '3',
      name: "Bright Mensah",
      merchantId: "#3328",
      idType: "Ghana Card",
      dateSubmitted: new Date('2023-10-23'),
      status: "Pending",
      initials: "BM",
      avatar: null
    },
    {
      id: '4',
      name: "Efua Appiah",
      merchantId: "#3331",
      idType: "Ghana Card",
      dateSubmitted: new Date('2023-10-23'),
      status: "Pending",
      initials: "EA",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv4gA744SoC6_UMn8Z0Ra4ktYIPihf_L9ue6xT9HbGbiv1ceWQeM_qpE1OgFpuFEvazz-FI4zRTgEZAyB9ec65FeyDuxdgSfdSswQOJFYxUvkylAEzmJJdmRxkG9FVnmCVTKdxuI1U4XiNho5Sq3Hf5sbjJ5qVbMFO05qow5oLARB2OhUa_JaUcfY_2TvvbozsNHlLIN2w4TWq-M2Ofi_igY5gZ5o2g9C7ht-um-nGU4RxhJjABlk7XQsef1y7VLC_sVHJplbqx_0"
    }
  ];

  const filteredSellers = sellers.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.merchantId.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || s.status.toLowerCase() === filter;
    const isUrgent = showUrgentOnly ? (new Date().getTime() - s.dateSubmitted.getTime()) > 48 * 60 * 60 * 1000 : true;
    return matchesSearch && matchesFilter && isUrgent;
  }).sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-12 px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-10 flex justify-between items-end">
        <div>
          <span className="inline-block px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest rounded mb-2">Internal Audit</span>
          <h2 className="text-4xl font-extrabold text-primary tracking-tight">Seller Verification Queue</h2>
          <p className="text-on-surface-variant mt-2 max-w-lg">Assess pending applications from Accra and Kumasi regions. Validate national identity metrics before granting market access.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high text-on-surface text-sm font-semibold rounded-full hover:bg-surface-container-highest transition-all">
            <span className="material-symbols-outlined text-[18px]">filter_list</span>
            Filters
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
            <span className="material-symbols-outlined text-[18px]">file_download</span>
            Export Report
          </button>
        </div>
      </div>
      {/* Dashboard Stats Bento */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="col-span-1 p-6 bg-surface-container-lowest rounded-xl shadow-sm border-b-2 border-primary/20">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Total Pending</p>
          <p className="text-3xl font-black text-primary">1,284</p>
          <div className="mt-4 flex items-center gap-1 text-emerald-600 text-[10px] font-bold">
            <span className="material-symbols-outlined text-xs">trending_up</span>
            +12% from yesterday
          </div>
        </div>
        <div className="col-span-1 p-6 bg-surface-container-lowest rounded-xl shadow-sm border-b-2 border-error/20">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">High Risk Flagged</p>
          <p className="text-3xl font-black text-error">42</p>
          <p className="mt-4 text-on-surface-variant text-[10px] font-medium">Requiring manual ID review</p>
        </div>
        <div className="col-span-1 p-6 bg-surface-container-lowest rounded-xl shadow-sm border-b-2 border-secondary/20">
          <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">Avg Process Time</p>
          <p className="text-3xl font-black text-primary">4.2 <span className="text-sm font-normal text-on-surface-variant">hrs</span></p>
          <p className="mt-4 text-on-surface-variant text-[10px] font-medium">Efficiency: Optimal</p>
        </div>
        <div className="col-span-1 p-6 bg-primary text-white rounded-xl shadow-xl shadow-primary/10">
          <p className="text-[10px] font-bold text-primary-fixed uppercase tracking-widest mb-1">Verification Rate</p>
          <p className="text-3xl font-black">94.8%</p>
          <div className="mt-4 h-1.5 w-full bg-primary-container rounded-full overflow-hidden">
            <div className="h-full bg-secondary-fixed w-[94.8%]"></div>
          </div>
        </div>
      </div>
      {/* Risk Filters */}
      <div className="flex flex-wrap gap-4 mb-8 items-center bg-surface-container-low p-4 rounded-2xl">
        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest px-4">Active Sorters:</span>
        <button className="px-4 py-2 bg-error-container text-on-error-container rounded-full text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-[16px]">warning</span>
          High Risk Only
        </button>
        <button className="px-4 py-2 bg-surface-container-highest text-on-surface-variant rounded-full text-xs font-bold flex items-center gap-2 hover:bg-slate-200 transition-all">
          <span className="material-symbols-outlined text-[16px]">content_copy</span>
          Duplicate Identity
        </button>
        <button className="px-4 py-2 bg-tertiary-container text-tertiary-fixed rounded-full text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          Pre-Screened (90+)
        </button>
        <button 
          onClick={() => setShowUrgentOnly(!showUrgentOnly)}
          className={`px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${showUrgentOnly ? 'bg-orange-500 text-white' : 'bg-surface-container-highest text-on-surface-variant hover:bg-slate-200'}`}
        >
          <span className="material-symbols-outlined text-[16px]">alarm</span>
          Urgent Attention
        </button>
        <div className="ml-auto flex items-center gap-2 text-xs font-medium text-on-surface-variant">
          Displaying {filteredSellers.length} of 1,284
          <div className="flex gap-1 ml-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-outline-variant/30 text-primary"><span className="material-symbols-outlined text-[18px]">chevron_left</span></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-outline-variant/30 text-primary"><span className="material-symbols-outlined text-[18px]">chevron_right</span></button>
          </div>
        </div>
      </div>
      {/* High Density Table */}
      <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm ring-1 ring-slate-100">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant/20">
              <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Seller Entity</th>
              <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Verification Assets</th>
              <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest cursor-pointer hover:text-primary" onClick={() => setSortConfig({ key: 'dateSubmitted', direction: sortConfig?.direction === 'asc' ? 'desc' : 'asc' })}>
                Date Submitted {sortConfig?.key === 'dateSubmitted' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-center">Risk Score</th>
              <th className="px-6 py-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest text-right">Verification Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredSellers.map(seller => (
              <UserRow 
                key={seller.id}
                seller={seller}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Verification Guidelines Floating Footer */}
      <div className="mt-12 p-8 bg-surface-container-low rounded-3xl grid grid-cols-3 gap-8 border border-white">
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-primary text-[20px]">policy</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-primary mb-1">Standard Operating Procedure</h4>
            <p className="text-[10px] text-on-surface-variant">Review digital Ghana Card watermarks at 400% zoom before final approval for Diamond badges.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-primary text-[20px]">gavel</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-primary mb-1">Rejection Protocol</h4>
            <p className="text-[10px] text-on-surface-variant">All rejections must be accompanied by a specific compliance failure code from the NIA list.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-primary text-[20px]">shield_with_heart</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-primary mb-1">Assisted Onboarding</h4>
            <p className="text-[10px] text-on-surface-variant">If a business license is expired but renewal is in progress, use the 'Pending Verification' grace period.</p>
          </div>
        </div>
      </div>
      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-secondary-container text-on-secondary-container rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-50">
        <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
      </button>
    </motion.div>
  );
};

const UserRow = ({ seller }: any) => (
  <tr className="hover:bg-slate-50 hover:shadow-lg transition-all duration-200 group">
    <td className="px-8 py-6">
      <div className="flex items-center gap-4">
        {seller.avatar ? (
          <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30">
            <img src={seller.avatar} alt={seller.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary-fixed-dim/20 flex items-center justify-center text-primary font-bold font-headline">
            {seller.initials}
          </div>
        )}
        <div>
          <p className="text-sm font-bold text-primary font-headline">{seller.name}</p>
          <p className="text-[10px] text-slate-400">Merchant {seller.merchantId}</p>
        </div>
      </div>
    </td>
    <td className="px-6 py-6">
      <div className="flex items-center gap-2">
        <IdCard size={18} className="text-primary/60" />
        <span className="text-xs font-medium text-on-surface-variant">{seller.idType}</span>
      </div>
    </td>
    <td className="px-6 py-6">
      <span className="text-xs text-on-surface-variant">{seller.dateSubmitted.toLocaleDateString()}</span>
    </td>
    <td className="px-6 py-6">
      <span className={`inline-flex items-center px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-wider ${
        seller.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
        seller.status === 'Verified' ? 'bg-green-100 text-green-800' : 
        'bg-red-100 text-red-800'
      }`}>
        {seller.status}
      </span>
    </td>
    <td className="px-8 py-6 text-right">
      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 rounded-full text-xs font-bold text-primary hover:bg-surface-container-high transition-colors">Review Details</button>
        <button className="px-4 py-2 rounded-full text-xs font-bold bg-tertiary text-on-tertiary shadow-lg shadow-tertiary/20 hover:scale-105 active:scale-95 transition-all">Quick Approve</button>
      </div>
    </td>
  </tr>
);

const SecuritySettings = () => (
  <main className="pl-64 pt-20 min-h-screen">
    <div className="p-10 max-w-screen-xl mx-auto space-y-24">
      {/* Hero Title */}
      <section className="space-y-4">
        <span className="inline-block px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold uppercase tracking-widest rounded-sm">System Operations</span>
        <h2 className="text-5xl font-extrabold tracking-tighter text-primary">Platform Infrastructure</h2>
        <p className="text-slate-500 max-w-2xl leading-relaxed">Configure the marketplace's core economic engine, security protocols, and vendor verification parameters from a single editorial interface.</p>
      </section>
      {/* Bento Grid - Financials & Rules */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* 1. Platform Fees & Commissions */}
        <div className="md:col-span-7 bg-surface-container-low p-8 rounded-[2rem] space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-primary">Platform Fees & Commissions</h3>
              <p className="text-slate-500 text-sm">Transactional revenue controls</p>
            </div>
            <span className="material-symbols-outlined text-teal-600 bg-white p-3 rounded-full shadow-sm">account_balance_wallet</span>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Standard Rate</label>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-primary">5.0</span>
                <span className="text-xl font-bold text-teal-600 mb-1">%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[50%]"></div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Diamond Rate</label>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-primary">3.5</span>
                <span className="text-xl font-bold text-teal-600 mb-1">%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-secondary-container w-[35%]"></div>
              </div>
            </div>
          </div>
          <div className="bg-primary p-6 rounded-2xl flex items-center justify-between text-white">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Escrow Processing Fee</p>
              <h4 className="text-xl font-bold">1.0% Fixed per Transaction</h4>
            </div>
            <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-colors">Adjust Fee</button>
          </div>
        </div>
        {/* 2. Verification Rules */}
        <div className="md:col-span-5 bg-white border border-outline-variant/10 p-8 rounded-[2rem] space-y-8 flex flex-col">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl font-bold text-primary">Verification Rules</h3>
              <p className="text-slate-500 text-sm">KYC & Trust parameters</p>
            </div>
            <span className="material-symbols-outlined text-teal-600">verified</span>
          </div>
          <div className="space-y-4 flex-1">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-sm font-semibold">Ghana Card Required</span>
              <div className="w-12 h-6 bg-tertiary-fixed rounded-full relative p-1 cursor-pointer">
                <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
              <span className="text-sm font-semibold">Auto-Rejection Triggers</span>
              <span className="text-xs bg-error-container text-on-error-container px-2 py-1 rounded font-bold">Enabled</span>
            </div>
            <div className="pt-4 space-y-3">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-400">Badge Tenure Requirements</label>
              <div className="flex justify-between text-sm py-2 border-b border-slate-100">
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-slate-400"></div> Silver</span>
                <span className="font-bold">0 - 1 year</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-slate-100">
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-secondary"></div> Gold</span>
                <span className="font-bold">1 - 3 years</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-teal-500"></div> Diamond</span>
                <span className="font-bold">3+ years</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Escrow & Funds - Editorial Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-[3rem] overflow-hidden aspect-video group">
          <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_2BU4F7ayjzEhAM2-97iA2GuXNhAiclcAy9FFhZiVnKXaS8f3DMOmXgwylvdiCjcqc1abfUyAPrqbxIyAoNsUqacLbEkkApAgiu-sEoei9YgiQWcPuKPgH0tEYjb_cTO3hG-0F9AlGuMpsIrMzQ179mroT5QzHScvFrpvlK-2KbxagLKBa-oubJhL_cVrLxRWAP90j9Pua5IRBASSAoHMuQvu0t7ARu8J_NEz05b0GhdEF4uOI9TDiduwnjEAJq8RPu-osoEpwbU" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm flex items-center justify-center p-12">
            <div className="text-white text-center space-y-4">
              <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'wght' 200;" }}>lock</span>
              <h4 className="text-3xl font-bold">Automated Escrow</h4>
              <p className="text-primary-fixed leading-relaxed opacity-90">Secure transactional flow managed by high-frequency auditing systems.</p>
            </div>
          </div>
        </div>
        <div className="space-y-8 pl-0 lg:pl-10">
          <h3 className="text-4xl font-bold text-primary tracking-tight">Escrow & Funds Management</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Auto-Release Timer</label>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-surface-container h-14 rounded-2xl flex items-center px-6">
                  <span className="text-lg font-bold">7</span>
                  <span className="ml-2 text-slate-500">Days after delivery</span>
                </div>
                <button className="h-14 w-14 bg-primary text-white rounded-2xl flex items-center justify-center"><span className="material-symbols-outlined">edit</span></button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Dispute Window</label>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-surface-container h-14 rounded-2xl flex items-center px-6">
                  <span className="text-lg font-bold">48</span>
                  <span className="ml-2 text-slate-500">Hours duration</span>
                </div>
                <button className="h-14 w-14 bg-primary text-white rounded-2xl flex items-center justify-center"><span className="material-symbols-outlined">edit</span></button>
              </div>
            </div>
            <p className="text-xs text-slate-400 italic">Funds are automatically held until the delivery confirmation is verified by the platform GPS gateway.</p>
          </div>
        </div>
      </section>
      {/* Ad Pricing Table */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h3 className="text-3xl font-bold text-primary">Ad Pricing & Placements</h3>
            <p className="text-slate-500">Tier-based weekly promotional costs (GHS)</p>
          </div>
          <button className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all">Update All Tiers</button>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-outline-variant/10 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="p-6 font-manrope text-xs font-black uppercase tracking-widest text-slate-400">Placement Area</th>
                <th className="p-6 font-manrope text-xs font-black uppercase tracking-widest text-slate-400">Silver Badge</th>
                <th className="p-6 font-manrope text-xs font-black uppercase tracking-widest text-slate-400">Gold Badge</th>
                <th className="p-6 font-manrope text-xs font-black uppercase tracking-widest text-slate-400">Diamond Badge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  <p className="font-bold text-primary">Homepage Banners</p>
                  <p className="text-[10px] text-slate-400">Main hero slider</p>
                </td>
                <td className="p-6"><span className="font-body font-medium">150.00</span></td>
                <td className="p-6"><span className="font-body font-medium">120.00</span></td>
                <td className="p-6"><span className="font-body font-bold text-teal-600">95.00</span></td>
              </tr>
              <tr className="bg-surface-container-low/30 hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  <p className="font-bold text-primary">Category Spotlights</p>
                  <p className="text-[10px] text-slate-400">Top of category feed</p>
                </td>
                <td className="p-6"><span className="font-body font-medium">85.00</span></td>
                <td className="p-6"><span className="font-body font-medium">70.00</span></td>
                <td className="p-6"><span className="font-body font-bold text-teal-600">55.00</span></td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  <p className="font-bold text-primary">Search Promotions</p>
                  <p className="text-[10px] text-slate-400">Pinned search results</p>
                </td>
                <td className="p-6"><span className="font-body font-medium">45.00</span></td>
                <td className="p-6"><span className="font-body font-medium">35.00</span></td>
                <td className="p-6"><span className="font-body font-bold text-teal-600">25.00</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      {/* Security & Notifications Bento */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-24">
        {/* System Security */}
        <div className="md:col-span-8 bg-primary rounded-[2rem] p-10 text-white space-y-10 relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <h3 className="text-3xl font-bold">System Security</h3>
            <p className="text-primary-fixed opacity-70">Infrastructure protection & fraud mitigation</p>
          </div>
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <span className="material-symbols-outlined text-tertiary-fixed mb-4">pin</span>
              <h4 className="font-bold text-lg mb-1">2FA Requirements</h4>
              <p className="text-xs text-white/60 mb-4">Mandatory for all Admin & Vendor accounts</p>
              <span className="text-[10px] font-bold uppercase py-1 px-2 bg-tertiary-fixed/20 text-tertiary-fixed rounded">Active</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <span className="material-symbols-outlined text-secondary-fixed mb-4">speed</span>
              <h4 className="font-bold text-lg mb-1">Rate Limiting</h4>
              <p className="text-xs text-white/60 mb-4">100 requests / minute per IP address</p>
              <span className="text-[10px] font-bold uppercase py-1 px-2 bg-white/10 text-white/60 rounded">Standard</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-md">
              <span className="material-symbols-outlined text-error-container mb-4">shield</span>
              <h4 className="font-bold text-lg mb-1">Fraud Flags</h4>
              <p className="text-xs text-white/60 mb-4">Automated blocking for high-risk IPs</p>
              <span className="text-[10px] font-bold uppercase py-1 px-2 bg-error-container/20 text-error-container rounded">Critical</span>
            </div>
          </div>
          {/* Decorative background circle */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl"></div>
        </div>
        {/* Notifications Settings */}
        <div className="md:col-span-4 bg-surface-container-high rounded-[2rem] p-10 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary">Notifications</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-teal-600">sms</span>
                  </div>
                  <span className="font-bold text-sm">SMS Gateway</span>
                </div>
                <div className="w-12 h-6 bg-slate-300 rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute left-1"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-teal-600">mail</span>
                  </div>
                  <span className="font-bold text-sm">Email Master</span>
                </div>
                <div className="w-12 h-6 bg-tertiary-fixed rounded-full relative p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white/50 p-4 rounded-2xl border border-white mt-8">
            <p className="text-[10px] text-slate-500 leading-relaxed font-medium uppercase tracking-wider">Gateway Status: <span className="text-tertiary font-bold">Optimal</span></p>
          </div>
        </div>
      </div>
    </div>
  </main>
);

const AdsDashboard = ({ onViewChange }: { onViewChange: (view: View) => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-10 space-y-8">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold text-primary">Ads Dashboard</h2>
      <button className="bg-primary text-white px-6 py-2 rounded-full font-bold">Create New Campaign</button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Active Campaigns</p>
        <h3 className="text-2xl font-black text-[#00323d]">12</h3>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Total Impressions</p>
        <h3 className="text-2xl font-black text-[#00323d]">1.2M</h3>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-1">Total Clicks</p>
        <h3 className="text-2xl font-black text-[#00323d]">45k</h3>
      </div>
    </div>
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <h3 className="font-bold text-lg mb-4">Recent Campaigns</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="py-3 text-xs font-bold text-slate-500 uppercase">Campaign Name</th>
            <th className="py-3 text-xs font-bold text-slate-500 uppercase">Status</th>
            <th className="py-3 text-xs font-bold text-slate-500 uppercase">Impressions</th>
            <th className="py-3 text-xs font-bold text-slate-500 uppercase">Clicks</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr>
            <td className="py-4 text-sm font-bold">Summer Sale</td>
            <td className="py-4 text-sm"><span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-[10px] font-bold">Active</span></td>
            <td className="py-4 text-sm">500k</td>
            <td className="py-4 text-sm">20k</td>
          </tr>
          <tr>
            <td className="py-4 text-sm font-bold">New Arrivals</td>
            <td className="py-4 text-sm"><span className="bg-slate-100 text-slate-800 px-2 py-1 rounded-full text-[10px] font-bold">Paused</span></td>
            <td className="py-4 text-sm">300k</td>
            <td className="py-4 text-sm">10k</td>
          </tr>
        </tbody>
      </table>
    </div>
  </motion.div>
);
const CampaignReview = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    {/* Top Actions Bar */}
    <div className="flex justify-between items-center mb-10">
      <div className="space-y-1">
        <h2 className="text-3xl font-headline font-extrabold text-primary tracking-tight">Review Campaign</h2>
        <p className="text-on-surface-variant flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">schedule</span>
          Submitted 2 hours ago by <span className="font-semibold text-primary">Kente Styles Ghana</span>
        </p>
      </div>
      <div className="flex gap-4">
        <button className="px-6 py-3 rounded-full bg-surface-container-high text-on-surface font-semibold hover:bg-surface-container-highest transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined">block</span>
          Reject with Feedback
        </button>
        <button className="px-8 py-3 rounded-full bg-gradient-to-br from-primary to-primary-container text-white font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          Approve Campaign
        </button>
      </div>
    </div>

    <div className="grid grid-cols-12 gap-8">
      {/* Left Column: Details & Compliance */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        {/* Ad Visual Mockup (Bento Style) */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-headline font-bold text-lg text-primary">Placement Preview</h3>
            <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold uppercase tracking-widest rounded-lg">Homepage Banner</span>
          </div>
          <div className="relative rounded-lg overflow-hidden border border-outline-variant/20 bg-surface">
            <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-2 py-1 rounded text-[10px] backdrop-blur-md">Mockup View</div>
            <img alt="Marketplace homepage layout mockup" className="w-full h-80 object-cover opacity-40" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAaUJDGzcRbzKXzklwM2dAaxdDHU_xIJkQ4z1nwDhUjpC1JPbOzz4CUzZW4pJdYb-en2FDI7_XkfzvDqnkspeIn3D31iOcnMy7uZDC1pX68yWpkJC6mPhfqaPnahpHjEuyj9CIUt8rfBZotR2BWqTnLY0N3ylXej_zLkHylL4rKvE0ESc4JZgzJ3nz-WIDm3rTzI1Ys7VVEXBf1UPE98XrNOtjfZ5eGjogmjvV-XbpAv_vQmHDrV90Vhl3IcKxf4QrrCxnGM45y3Q" referrerPolicy="no-referrer" />
            {/* Injected Ad Mockup */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-48 bg-white shadow-2xl rounded-xl flex overflow-hidden">
              <div className="w-1/2 p-8 flex flex-col justify-center">
                <h4 className="text-2xl font-headline font-extrabold text-primary leading-tight mb-2">Heritage Kente Collection</h4>
                <p className="text-sm text-on-surface-variant mb-4">Limited Edition Handwoven Fabrics from Bonwire.</p>
                <button className="w-max px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold uppercase tracking-widest">Shop Now</button>
              </div>
              <div className="w-1/2 relative">
                <img alt="Campaign Hero Image" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOT7sEz0HvsLBRXu_9IIIDLGEKde9K6VnWKg2Y0_sR6M16Mcnr9lRludTZDMTyNcK1bM8Wk5PiucuyrbNeFhg315Wy9DTyqztryJNjCT-vBhlbLAH4nZ39samCohWd-KGBDc6FdNsK_BxhpPMNR7rinin3OrZ9yaFcl_RGxM0kN_WCvo-y5WUkWTxuQIB6FFCcIIcNLU_OZc5fESrPXsRT_H_5UDhkkWGKVLoZXWeyfEK_no6cMM1XuNbXgJv7kCMH1TDl73GDi_c" referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Bento Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Compliance Checklist */}
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10">
            <h3 className="font-headline font-bold text-lg text-primary mb-4">Compliance Checklist</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span>High-quality image (Min 1200x600px)</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span>No offensive or prohibited content</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                <span>Accurate description & product match</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                <span className="text-secondary font-medium">Text-to-Image ratio slightly high (22%)</span>
              </li>
            </ul>
          </div>
          {/* Payment & Transaction */}
          <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10">
            <h3 className="font-headline font-bold text-lg text-primary mb-4">Payment Status</h3>
            <div className="p-4 bg-tertiary-container/10 rounded-xl border border-tertiary-container/20 mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase text-tertiary">Confirmed Status</span>
                <span className="px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] rounded font-black">PAID</span>
              </div>
              <p className="text-2xl font-headline font-extrabold text-primary">GHS 170.00</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Method</span>
                <span className="font-bold">Mobile Money (MTN)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-on-surface-variant">Transaction ID</span>
                <span className="font-bold font-mono">20938475512</span>
              </div>
            </div>
          </div>
        </div>

        {/* Target Listing */}
        <div className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 flex items-center gap-6">
          <img alt="Linked Product" className="w-24 h-24 rounded-lg object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk0eDhNyYZ4Ccdz9dtJ9QBx81CKeeK0QsZqXkVvVl7zPzCiIZOQHe3QwKvmdF5FDOC-ylIq3Kvudiso5PVwRDI1Gr3buBGMS4kuXw1alhTBPOV27P6eqC_3VAGuimm81CFnN6IyufpJoE2CBLyIImj7QzqLX3MWhMrek1_HfRTkMvDH_gQnLz7_Imnrv5w8KvVxIxMS7i8uDw7E9WxgIR_fHsK7yQJ9bhDDaKBxZ7-OloDgYetF-EXzIrsTaDKA9hzBv22rWmexaQ" referrerPolicy="no-referrer" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-primary-container uppercase tracking-wider mb-1">Target Product Listing</h4>
            <p className="text-xl font-headline font-bold text-primary mb-1">Authentic Royal Bonwire Kente (6-yards)</p>
            <a className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline" href="#">
              View Store Listing
              <span className="material-symbols-outlined text-xs">open_in_new</span>
            </a>
          </div>
          <div className="text-right">
            <p className="text-xs text-on-surface-variant mb-1">Current Price</p>
            <p className="text-xl font-black text-secondary">GHS 2,400</p>
          </div>
        </div>
      </div>

      {/* Right Column: Sidebar Stats */}
      <div className="col-span-12 lg:col-span-4 space-y-8">
        {/* Seller Details Card */}
        <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-sm relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary-fixed opacity-10 rounded-full blur-3xl"></div>
          <div className="text-center mb-8">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <img alt="Marketplace Logo" className="w-full h-full rounded-full border-4 border-surface shadow-md object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYoiGKkynuMVv_dt7a2_rv4K-0d6WpVDZWAR7XD_e4en-dBomoGZ3V_sno506iFGYasA9Wbu-tjNnOs3tWXQkyVFOKhim3t8i9KZguwhTZIxuI2GiwD6WjadvrPR4gPRjY1ZUpH9BOXodajVWlKSqbNyomHMr5ZLx47qmqsqa1OpSxVFXJsg4zRlmOeNk71WcFYLY-2CKJ4rGkWaY8IJ0tuUdiRkSQGWpJcf59jD0xNfNmNUPSjE3wO78vodcP2sOdfO1Bo2GH_sQ" referrerPolicy="no-referrer" />
              <div className="absolute bottom-0 right-0 bg-secondary-container text-on-secondary-container w-8 h-8 rounded-full flex items-center justify-center border-2 border-surface shadow-sm">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              </div>
            </div>
            <h3 className="text-2xl font-headline font-extrabold text-primary">Kente Styles Ghana</h3>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-[10px] font-black rounded-full uppercase tracking-tighter">Gold Verified</span>
            </div>
          </div>
          <div className="space-y-4 border-t border-slate-100 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-on-surface-variant">Tenure</span>
              <span className="text-sm font-bold text-primary">2.4 Years</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-on-surface-variant">Total Ad Spend</span>
              <span className="text-sm font-bold text-primary">GHS 12,500</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-on-surface-variant">Ad CTR Avg</span>
              <span className="text-sm font-bold text-tertiary-fixed-variant">4.8% (High)</span>
            </div>
          </div>
        </div>

        {/* Campaign Summary */}
        <div className="bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 shadow-sm">
          <h3 className="font-headline font-bold text-lg text-primary mb-6">Campaign Settings</h3>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">event</span>
              </div>
              <div>
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Duration</p>
                <p className="text-sm font-bold text-primary">1 Week (May 14 - May 21)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Price Calculation</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-xs text-on-surface-variant">
                    <span>Base Rate</span>
                    <span>GHS 200.00</span>
                  </div>
                  <div className="flex justify-between text-xs text-tertiary font-medium">
                    <span>Gold Discount (15%)</span>
                    <span>- GHS 30.00</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-primary pt-2 border-t border-slate-100">
                    <span>Total Paid</span>
                    <span>GHS 170.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Internal Notes */}
        <div className="bg-surface-container-low rounded-xl p-6">
          <h4 className="text-xs font-black uppercase text-on-surface-variant tracking-widest mb-3">Internal Note</h4>
          <p className="text-sm italic text-on-surface-variant leading-relaxed">
            "This seller has a clean history. Their last 3 campaigns were approved without revision. Banner dimensions are correct for responsive layout."
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const IntelligenceDashboard = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
    {/* Dashboard Header Section */}
    <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div>
        <span className="text-secondary font-bold text-xs uppercase tracking-[0.2em] mb-2 block">System Overview</span>
        <h2 className="text-4xl font-extrabold font-headline text-primary tracking-tight">Marketplace Intelligence</h2>
        <p className="text-on-surface-variant mt-2 max-w-md">Real-time performance analytics and operational monitoring for eliselgh Marketplace.</p>
      </div>
      <div className="flex items-center gap-3">
        <button className="px-6 py-2.5 bg-surface-container-high text-on-surface text-sm font-semibold rounded-full hover:bg-slate-200 transition-all">
          Download Report
        </button>
        <button className="px-6 py-2.5 bg-gradient-to-br from-primary to-primary-container text-white text-sm font-bold rounded-full shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
          Platform Settings
        </button>
      </div>
    </section>

    {/* Metric Cards (Bento Style) */}
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-[0_8px_32px_rgba(0,50,61,0.04)] group hover:shadow-xl transition-all border border-transparent hover:border-primary/5">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
            <Landmark size={24} />
          </div>
          <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded">+12.4%</span>
        </div>
        <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">Gross Merchandise Value</p>
        <h3 className="text-3xl font-extrabold font-headline text-primary mt-1">GHS 248.5k</h3>
        <p className="text-[10px] text-slate-400 mt-4 italic">Total sales volume in last 30 days</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-[0_8px_32px_rgba(0,50,61,0.04)] group hover:shadow-xl transition-all border border-transparent hover:border-primary/5">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
            <Users size={24} />
          </div>
          <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded">+842</span>
        </div>
        <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">Total Active Users</p>
        <h3 className="text-3xl font-extrabold font-headline text-primary mt-1">12,402</h3>
        <p className="text-[10px] text-slate-400 mt-4 italic">8.2% conversion from visitor to user</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-[0_8px_32px_rgba(0,50,61,0.04)] group hover:shadow-xl transition-all border border-transparent hover:border-primary/5">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-primary/5 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
            <ShoppingCart size={24} />
          </div>
          <span className="text-secondary text-xs font-bold bg-secondary-container/20 px-2 py-1 rounded">+4.2%</span>
        </div>
        <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">Active Sellers</p>
        <h3 className="text-3xl font-extrabold font-headline text-primary mt-1">1,154</h3>
        <p className="text-[10px] text-slate-400 mt-4 italic">Including 210 verified Gold Vendors</p>
      </div>

      <div className="bg-primary p-6 rounded-xl shadow-[0_8px_32px_rgba(0,50,61,0.15)] group hover:shadow-2xl transition-all border border-transparent">
        <div className="flex justify-between items-start mb-4">
          <div className="p-3 bg-white/10 rounded-xl text-white">
            <Clock size={24} />
          </div>
          <span className="text-secondary-fixed text-xs font-bold bg-white/10 px-2 py-1 rounded">Urgent</span>
        </div>
        <p className="text-primary-fixed/60 text-xs font-bold uppercase tracking-wider">Pending Approvals</p>
        <h3 className="text-3xl font-extrabold font-headline text-white mt-1">42</h3>
        <p className="text-[10px] text-white/40 mt-4 italic">Requires immediate moderation review</p>
      </div>
    </section>

    {/* Middle Section: Graph and Activity */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Transaction Volume Graph Area */}
      <div className="lg:col-span-2 bg-white rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(0,50,61,0.03)] flex flex-col border border-slate-100">
        <div className="p-8 pb-0 flex justify-between items-center">
          <div>
            <h4 className="text-xl font-bold font-headline text-primary">Transaction Volume</h4>
            <p className="text-xs text-on-surface-variant">Daily GHS movement across the ecosystem</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors"><Filter size={16} /></button>
            <span className="text-xs font-semibold text-primary/60">Last 30 Days</span>
          </div>
        </div>
        <div className="p-8 flex-1 flex flex-col justify-end relative h-80">
          {/* Abstract Graph Representation */}
          <div className="absolute inset-x-8 bottom-8 top-16 flex items-end justify-between space-x-1">
            <div className="bg-primary/10 w-full rounded-t-lg transition-all hover:bg-primary/30 h-[40%]"></div>
            <div className="bg-primary/10 w-full rounded-t-lg transition-all hover:bg-primary/30 h-[55%]"></div>
            <div className="bg-primary/10 w-full rounded-t-lg transition-all hover:bg-primary/30 h-[35%]"></div>
            <div className="bg-primary/10 w-full rounded-t-lg transition-all hover:bg-primary/30 h-[70%]"></div>
            <div className="bg-primary/10 w-full rounded-t-lg transition-all hover:bg-primary/30 h-[65%]"></div>
            <div className="bg-primary/10 w-full rounded-t-lg transition-all hover:bg-primary/30 h-[90%]"></div>
            <div className="bg-primary/10 w-full rounded-t-lg transition-all hover:bg-primary/30 h-[45%]"></div>
            <div className="bg-primary/10 w-full rounded-t-lg transition-all hover:bg-primary/30 h-[30%]"></div>
            <div className="bg-primary/10 w-full rounded-t-lg transition-all hover:bg-primary/30 h-[50%]"></div>
            <div className="bg-primary/10 w-full rounded-t-lg transition-all hover:bg-primary/30 h-[60%]"></div>
            <div className="bg-primary/10 w-full rounded-t-lg transition-all hover:bg-primary/30 h-[85%]"></div>
            <div className="bg-primary/10 w-full rounded-t-lg transition-all hover:bg-primary/30 h-[75%]"></div>
            <div className="bg-primary/10 w-full rounded-t-lg transition-all hover:bg-primary/30 h-[40%]"></div>
            <div className="bg-secondary/40 w-full rounded-t-lg transition-all hover:bg-secondary/60 h-[100%] shadow-lg"></div>
            <div className="bg-primary/10 w-full rounded-t-lg transition-all hover:bg-primary/30 h-[60%]"></div>
            <div className="bg-primary/10 w-full rounded-t-lg transition-all hover:bg-primary/30 h-[55%]"></div>
          </div>
          <div className="flex justify-between w-full pt-4 border-t border-slate-100 mt-2">
            <span className="text-[10px] text-slate-400">01 Oct</span>
            <span className="text-[10px] text-slate-400 font-bold text-secondary">Today (24k)</span>
            <span className="text-[10px] text-slate-400">30 Oct</span>
          </div>
        </div>
      </div>

      {/* Recent Activity Feed */}
      <div className="bg-surface-container-low p-8 rounded-2xl flex flex-col h-full shadow-inner border border-slate-200/50">
        <div className="mb-6 flex justify-between items-center">
          <h4 className="text-lg font-bold font-headline text-primary tracking-tight">System Logs</h4>
          <MoreVertical size={20} className="text-slate-400 cursor-pointer" />
        </div>
        <div className="space-y-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
          <div className="flex gap-4 relative">
            <div className="absolute left-3 top-8 bottom-[-24px] w-[1px] bg-slate-200"></div>
            <div className="w-6 h-6 rounded-full bg-secondary-fixed flex items-center justify-center z-10">
              <BadgeCheck size={14} className="text-on-secondary-fixed" />
            </div>
            <div>
              <p className="text-xs font-bold text-primary">New Seller Verification Submitted</p>
              <p className="text-[11px] text-on-surface-variant mt-0.5">Mansa Crafts Enterprise</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">2 Mins Ago</p>
            </div>
          </div>
          <div className="flex gap-4 relative">
            <div className="absolute left-3 top-8 bottom-[-24px] w-[1px] bg-slate-200"></div>
            <div className="w-6 h-6 rounded-full bg-error-container flex items-center justify-center z-10">
              <AlertTriangle size={14} className="text-on-error-container" />
            </div>
            <div>
              <p className="text-xs font-bold text-primary">Dispute #402 Opened</p>
              <p className="text-[11px] text-on-surface-variant mt-0.5">Item not as described (Electronics)</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">15 Mins Ago</p>
            </div>
          </div>
          <div className="flex gap-4 relative">
            <div className="absolute left-3 top-8 bottom-[-24px] w-[1px] bg-slate-200"></div>
            <div className="w-6 h-6 rounded-full bg-tertiary-fixed flex items-center justify-center z-10">
              <Wallet size={14} className="text-on-tertiary-fixed" />
            </div>
            <div>
              <p className="text-xs font-bold text-primary">Escrow Payout Complete</p>
              <p className="text-[11px] text-on-surface-variant mt-0.5">GHS 4,200 to 'Gold Coast Tech'</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">1 Hour Ago</p>
            </div>
          </div>
          <div className="flex gap-4 relative">
            <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center z-10">
              <UserPlus size={14} className="text-on-primary-fixed" />
            </div>
            <div>
              <p className="text-xs font-bold text-primary">Platform Alert: Traffic Spike</p>
              <p className="text-[11px] text-on-surface-variant mt-0.5">Concurrent users reached 2.4k limit</p>
              <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">3 Hours Ago</p>
            </div>
          </div>
        </div>
        <button className="mt-auto w-full py-3 text-[11px] font-bold uppercase tracking-widest text-primary hover:bg-primary/5 rounded-xl transition-all">View All Activity</button>
      </div>
    </div>

    {/* Bottom Section: Top Categories */}
    <section className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,50,61,0.02)] p-8 border border-slate-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h4 className="text-2xl font-extrabold font-headline text-primary tracking-tight">Market Category Performance</h4>
          <p className="text-sm text-on-surface-variant">Top revenue drivers and conversion leaders</p>
        </div>
        <button className="flex items-center gap-2 text-sm font-semibold text-primary px-4 py-2 border border-outline-variant/30 rounded-full hover:bg-slate-50 transition-all">
          <Download size={16} />
          Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant rounded-l-xl">Category Name</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant text-center">Volume (GHS)</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant text-center">Active Listings</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant text-center">Conversion</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-variant rounded-r-xl text-right">Growth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="group hover:bg-slate-50 transition-colors">
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img alt="Fashion" className="w-full h-full object-cover" src="https://picsum.photos/seed/fashion/200" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-sm font-bold text-primary">Apparel & Textiles</span>
                </div>
              </td>
              <td className="px-6 py-5 text-center text-sm font-medium">124,500.00</td>
              <td className="px-6 py-5 text-center text-sm font-medium">2,482</td>
              <td className="px-6 py-5 text-center">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-sm">12.5%</span>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center justify-end gap-1 text-emerald-600 font-bold text-sm">
                  <TrendingUp size={12} />
                  2.4%
                </div>
              </td>
            </tr>
            <tr className="group hover:bg-slate-50 transition-colors">
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img alt="Electronics" className="w-full h-full object-cover" src="https://picsum.photos/seed/electronics/200" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-sm font-bold text-primary">Consumer Electronics</span>
                </div>
              </td>
              <td className="px-6 py-5 text-center text-sm font-medium">89,200.50</td>
              <td className="px-6 py-5 text-center text-sm font-medium">842</td>
              <td className="px-6 py-5 text-center">
                <span className="px-3 py-1 bg-slate-100 text-on-surface-variant text-[10px] font-bold rounded-sm">8.2%</span>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center justify-end gap-1 text-emerald-600 font-bold text-sm">
                  <TrendingUp size={12} />
                  1.8%
                </div>
              </td>
            </tr>
            <tr className="group hover:bg-slate-50 transition-colors">
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    <img alt="Home" className="w-full h-full object-cover" src="https://picsum.photos/seed/home/200" referrerPolicy="no-referrer" />
                  </div>
                  <span className="text-sm font-bold text-primary">Home Decor & Artisanal</span>
                </div>
              </td>
              <td className="px-6 py-5 text-center text-sm font-medium">42,100.00</td>
              <td className="px-6 py-5 text-center text-sm font-medium">1,120</td>
              <td className="px-6 py-5 text-center">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-sm">15.1%</span>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center justify-end gap-1 text-error font-bold text-sm">
                  <AlertCircle size={12} className="rotate-180" />
                  0.5%
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </motion.div>
);

const ModerationQueue = () => (

  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="mb-10 flex justify-between items-end">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-2 block">Curation Hub</span>
        <h2 className="text-4xl font-extrabold text-primary tracking-tight font-headline">Product Moderation Queue</h2>
        <p className="text-on-surface-variant mt-2 max-w-xl">Reviewing 24 pending listings for category compliance and seller authenticity. Priorities assigned by risk score.</p>
      </div>
      <div className="flex gap-3">
        <button className="px-6 py-3 bg-white text-on-surface font-semibold rounded-full text-sm flex items-center gap-2 transition-all hover:scale-[1.02] border border-slate-200">
          <Filter size={18} /> Refine View
        </button>
        <button className="px-6 py-3 bg-primary text-white font-semibold rounded-full text-sm flex items-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-primary/20">
          <Zap size={18} /> Auto-Resolve Low Risk
        </button>
      </div>
    </div>

    <div className="grid grid-cols-12 gap-6 mb-12">
      <div className="col-span-12 md:col-span-4">
        <StatCard label="Pending Review" value="24" trend="12% vs last hr" icon={<History size={20} />} />
      </div>
      <div className="col-span-12 md:col-span-5">
        <StatCard label="Queue Health" value="Processing speed is optimal." color="primary-container" icon={<Zap size={20} />} />
      </div>
      <div className="col-span-12 md:col-span-3">
        <StatCard label="Approved Today" value="142" color="secondary" icon={<CheckCircle2 size={20} />} />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
      {PRODUCTS.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>

    <section className="mt-16 bg-slate-100/50 p-8 rounded-2xl border border-slate-200/50">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
          <History size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-primary tracking-tight font-headline">Bulk Rejection Feedback</h3>
          <p className="text-sm text-on-surface-variant">Select multiple items to reject with a shared reason.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Internal Feedback / Rejection Note</label>
          <textarea className="w-full bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 placeholder:text-slate-300 p-4 outline-none" placeholder="e.g. Imagery does not meet the 800x800 minimum resolution requirement..." rows={3}></textarea>
        </div>
        <div className="flex flex-col justify-end">
          <button className="w-full py-4 bg-primary text-white font-bold rounded-xl transition-all hover:bg-primary-container hover:scale-[1.02] shadow-lg shadow-primary/10">
            Process Batch
          </button>
        </div>
      </div>
    </section>
  </motion.div>
);

const ProductCard: React.FC<{ product: ProductListing }> = ({ product }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group flex flex-col border border-slate-100">
    <div className="relative h-56 w-full">
      <img src={product.image} alt={product.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      <div className="absolute top-4 left-4 flex gap-2">
        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm ${
          product.riskLevel === 'High' ? 'bg-error text-white' : 
          product.riskLevel === 'Medium' ? 'bg-secondary-container text-on-secondary-container' : 
          'bg-emerald-100 text-emerald-800'
        }`}>{product.riskLevel} Risk</span>
        <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">{product.category}</span>
      </div>
      <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
        <button className="bg-white text-primary p-3 rounded-full hover:scale-110 transition-transform"><Maximize2 size={20} /></button>
      </div>
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold text-primary leading-tight font-headline">{product.title}</h3>
          <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
            <User size={14} /> {product.seller} • {product.sellerTier}
          </p>
        </div>
        <div className="text-right">
          <span className="text-lg font-black text-primary font-headline">{product.price}</span>
          <div className="flex items-center gap-1 justify-end text-[10px] font-bold text-emerald-700">
            <Shield size={10} /> {product.reliability} Rel.
          </div>
        </div>
      </div>
      <div className="bg-slate-50 p-4 rounded-lg mb-6 flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Compliance Check</span>
          <div className="flex-1 border-t border-slate-200"></div>
        </div>
        <ul className="space-y-2">
          {product.compliance.map((c, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-on-surface">
              {c.status === 'pass' ? <CheckCircle2 size={14} className="text-emerald-600" /> : 
               c.status === 'fail' ? <AlertTriangle size={14} className="text-error" /> : 
               <Clock size={14} className="text-secondary" />}
              {c.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button className="py-3 bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase tracking-widest rounded-lg transition-all hover:bg-emerald-200 active:scale-95 flex flex-col items-center gap-1">
          <Check size={18} /> Accept
        </button>
        <button className="py-3 bg-secondary-container text-on-secondary-container font-bold text-[10px] uppercase tracking-widest rounded-lg transition-all hover:opacity-90 active:scale-95 flex flex-col items-center gap-1">
          <Flag size={18} /> Flag
        </button>
        <button className="py-3 bg-error-container text-on-error-container font-bold text-[10px] uppercase tracking-widest rounded-lg transition-all hover:opacity-90 active:scale-95 flex flex-col items-center gap-1">
          <X size={18} /> Reject
        </button>
      </div>
    </div>
  </div>
);

const EscrowManagement = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <HeroStatsGrid />
    {/* Breadcrumbs & Actions */}
    <div className="flex justify-between items-end mb-10">
      <div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-2 uppercase tracking-widest font-bold">
          <span>eliseladmin Intelligence</span>
          <ChevronRight size={12} />
          <span className="text-teal-600">Financial Ledger</span>
        </div>
        <h2 className="text-4xl font-black text-primary tracking-tight font-headline">Transaction Audit Trail</h2>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 text-on-surface rounded-full font-semibold text-sm hover:scale-105 transition-transform">
          <Filter size={18} />
          Advanced Filters
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-primary/20">
          <Download size={18} />
          Export ISO-20022
        </button>
      </div>
    </div>

    {/* Dashboard Stats: Bento Style */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <StatCard label="Total Volume (24h)" value="₵ 842,902.50" trend="+12.4% vs yesterday" icon={<TrendingUp size={20} />} />
      <StatCard label="Escrowed Funds" value="₵ 1,294,000" trend="412 Active Contracts" color="secondary" icon={<Lock size={20} />} />
      <StatCard label="Commission Earned" value="₵ 42,105.12" trend="Avg. 4.9% margin" color="primary" icon={<BarChart3 size={20} />} />
      <StatCard label="Flagged Activity" value="03" trend="Requires Immediate Review" color="error" icon={<AlertTriangle size={20} />} />
    </div>

    {/* The Audit Ledger Table */}
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-12">
      <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
        <h3 className="text-lg font-bold text-primary flex items-center gap-2 font-headline">
          <History size={20} className="text-teal-600" />
          Live Transaction Stream
        </h3>
        <div className="flex gap-4">
          <span className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Completed
          </span>
          <span className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            <span className="w-2 h-2 rounded-full bg-secondary"></span> In Escrow
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-50/50 text-left">
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Transaction ID</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Timestamp</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Participants</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Gross Amount</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Commission</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Status</th>
              <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {ESCROW_TRANSACTIONS.map((tx) => (
              <tr key={tx.id} className={`hover:bg-slate-50 transition-colors group ${tx.status === 'FROZEN' ? 'bg-error/5' : ''}`}>
                <td className="px-8 py-5">
                  <div className="font-mono text-xs font-bold text-primary">{tx.id}</div>
                  <p className="text-[10px] text-slate-400 mt-1">Network: {tx.network || 'eliseladmin Internal'}</p>
                </td>
                <td className="px-8 py-5">
                  <div className="text-sm font-semibold text-on-surface">{tx.timestamp?.split(' ')[0] || 'Oct 24, 2023'}</div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">{tx.timestamp?.split(' ').slice(1).join(' ') || '14:22:10 UTC'}</p>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src={`https://picsum.photos/seed/${tx.recipient}/100`} referrerPolicy="no-referrer" />
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold">{tx.initials}</div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface">{tx.recipient}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-tighter ${tx.compliance === 'verified' ? 'text-emerald-600' : 'text-error'}`}>
                        {tx.compliance === 'verified' ? 'Verified Contract' : 'Identity Mismatch'}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="text-sm font-black text-primary">{tx.amount}</div>
                </td>
                <td className="px-8 py-5 text-right">
                  <div className="text-sm font-bold text-secondary">{tx.commission || '₵ 0.00'}</div>
                  <p className="text-[10px] text-slate-400 font-semibold">({tx.commissionRate || '0%'})</p>
                </td>
                <td className="px-8 py-5">
                  <span className={`px-3 py-1 rounded-sm text-[10px] font-bold uppercase ${
                    tx.status === 'RELEASED' ? 'bg-emerald-100 text-emerald-800' :
                    tx.status === 'HELD' ? 'bg-secondary-container text-on-secondary-container' :
                    'bg-error text-white'
                  }`}>
                    {tx.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-8 py-6 bg-slate-50/50 flex justify-between items-center">
        <p className="text-xs font-semibold text-slate-500">Showing 1-{ESCROW_TRANSACTIONS.length} of 2,451 transactions</p>
        <div className="flex gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-primary transition-all">
            <ChevronLeft size={18} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-primary transition-all">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>

    {/* Transaction Detail Panel */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          <span className="text-[60px] font-black text-slate-50 select-none font-headline">AUDIT</span>
        </div>
        <div className="relative z-10">
          <h4 className="text-xl font-black text-primary mb-6 font-headline">Commission Breakdown Model</h4>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 w-full space-y-4">
              <BreakdownRow label="Platform Fee (3%)" value="₵ 12,631.50" />
              <BreakdownRow label="Escrow Insurance (1.5%)" value="₵ 6,315.75" />
              <BreakdownRow label="Payment Gateway Cost" value="₵ 2,105.25" />
              <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                <span className="text-base font-black text-primary">Total eliseladmin Revenue</span>
                <span className="text-base font-black text-teal-600">₵ 21,052.50</span>
              </div>
            </div>
            <div className="w-48 h-48 rounded-full border-[12px] border-slate-50 flex items-center justify-center relative">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="96" cy="96" r="84" fill="none" stroke="#0d9488" strokeWidth="12" strokeDasharray="527" strokeDashoffset="42" />
              </svg>
              <div className="text-center">
                <p className="text-[10px] font-black uppercase text-slate-400">Retention</p>
                <p className="text-2xl font-black text-primary">92%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white p-8 rounded-xl shadow-xl flex flex-col justify-between">
        <div>
          <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-6 text-secondary-fixed">
            <Shield size={24} />
          </div>
          <h4 className="text-lg font-bold mb-2 font-headline">Escrow Integrity Report</h4>
          <p className="text-primary-fixed-dim/70 text-sm leading-relaxed mb-6">
            All current transaction nodes are verified through Ghanaian banking regulatory standards. Last audit snapshot taken 4 minutes ago.
          </p>
          <div className="p-4 bg-primary-container rounded-lg border border-white/10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary-fixed-dim mb-2">Node Stability</p>
            <div className="flex gap-1 h-2">
              <div className="flex-1 bg-emerald-400 rounded-full"></div>
              <div className="flex-1 bg-emerald-400 rounded-full"></div>
              <div className="flex-1 bg-emerald-400 rounded-full"></div>
              <div className="flex-1 bg-emerald-400 rounded-full"></div>
              <div className="flex-1 bg-white/20 rounded-full"></div>
            </div>
          </div>
        </div>
        <button className="w-full py-4 bg-white text-primary font-black uppercase tracking-widest text-xs rounded-full hover:bg-secondary-container transition-colors mt-8 shadow-lg">
          View Detailed Log
        </button>
      </div>
    </div>
  </motion.div>
);

const BreakdownRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center pb-2 border-b border-slate-50">
    <span className="text-sm font-semibold text-slate-500">{label}</span>
    <span className="text-sm font-bold text-primary">{value}</span>
  </div>
);

const SecurityMetric = ({ label, value }: { label: string, value: number }) => (
  <div>
    <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2 text-teal-300/80">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
      <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1 }} className="h-full bg-teal-300 rounded-full" />
    </div>
  </div>
);

const DisputeResolution = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-[1600px]">
    <div className="mb-10 flex justify-between items-end">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-primary font-black uppercase tracking-[0.2em] bg-primary-fixed/30 px-2 py-1 rounded-sm text-[10px]">Case ID: {DISPUTE_CASE.id}</span>
          <span className="text-emerald-800 font-black uppercase tracking-[0.2em] bg-emerald-100 px-2 py-1 rounded-sm text-[10px]">Status: {DISPUTE_CASE.status}</span>
        </div>
        <h2 className="text-4xl font-extrabold text-primary tracking-tight leading-none mb-2 font-headline">{DISPUTE_CASE.title}</h2>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed text-sm">
          Dispute filed by <span className="font-bold">{DISPUTE_CASE.buyer} (Buyer)</span> against <span className="font-bold">{DISPUTE_CASE.vendor} (Vendor)</span> regarding a Macbook Pro M2 transaction. Total escrow amount: <span className="text-primary font-bold">{DISPUTE_CASE.amount}</span>.
        </p>
      </div>
      <div className="flex gap-3">
        <button className="px-6 py-3 rounded-full bg-slate-100 text-on-surface font-semibold text-sm transition-all hover:bg-slate-200 flex items-center gap-2">
          <Archive size={18} /> Archive Case
        </button>
        <button className="px-6 py-3 rounded-full bg-primary text-white font-bold text-sm transition-all hover:opacity-90 flex items-center gap-2 shadow-lg shadow-primary/20">
          <Gavel size={18} /> Final Ruling
        </button>
      </div>
    </div>

    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 lg:col-span-8 space-y-8">
        <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2 font-headline">
              <MessageSquare size={20} className="text-primary" /> Communication History
            </h3>
            <span className="text-[10px] uppercase font-bold text-slate-400">All times GMT+0</span>
          </div>
          <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100">
            {DISPUTE_CASE.messages.map((msg) => (
              <div key={msg.id} className="relative pl-12">
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full border-2 border-white shadow-sm overflow-hidden z-10">
                  <img src={msg.avatar} alt={msg.sender} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className={`p-4 rounded-xl rounded-tl-none ${msg.role === 'Buyer' ? 'bg-slate-50' : 'bg-primary/5 border border-primary/5'}`}>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-sm">{msg.sender} <span className="text-xs font-normal text-slate-500 ml-2">({msg.role})</span></span>
                    <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-on-surface-variant">{msg.content}</p>
                </div>
              </div>
            ))}
            <div className="relative pl-12">
              <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed z-10">
                <Zap size={20} />
              </div>
              <div className="bg-primary-container/10 p-3 rounded-xl border border-primary-fixed/30 italic">
                <p className="text-xs text-primary font-medium text-center">System: Mediation initiated. Both parties invited to provide additional evidence.</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex gap-4">
              <input className="flex-1 rounded-full border-none bg-slate-50 px-6 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="Send a message to both parties..." type="text" />
              <button className="bg-primary text-white px-6 rounded-full font-bold text-sm">Send</button>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 font-headline">
            <Paperclip size={20} className="text-primary" /> Uploaded Evidence
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {DISPUTE_CASE.evidence.map((img, i) => (
              <div key={i} className="group relative aspect-square rounded-lg overflow-hidden cursor-zoom-in">
                <img src={img} alt={`Evidence ${i+1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold uppercase">View Original</span>
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 text-white text-[8px] rounded uppercase font-bold">
                  {i < 2 ? 'Buyer Upload' : 'Seller Upload'}
                </div>
              </div>
            ))}
            <div className="border-2 border-dashed border-slate-200 rounded-lg flex flex-col items-center justify-center text-slate-400 hover:border-primary/30 hover:text-primary transition-all cursor-pointer">
              <Plus size={32} className="mb-2" />
              <span className="text-[10px] font-bold uppercase">Admin Upload</span>
            </div>
          </div>
        </section>
      </div>

      <div className="col-span-12 lg:col-span-4 space-y-8">
        <section className="bg-primary text-white rounded-xl overflow-hidden shadow-xl">
          <div className="p-6 bg-primary-container">
            <h4 className="text-xs font-black uppercase tracking-widest text-on-primary-container mb-4">Transaction Details</h4>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded bg-white p-2">
                <img src="https://picsum.photos/seed/laptop/200" alt="Product" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div>
                <p className="text-sm font-bold">MacBook Pro M2 (14-inch)</p>
                <p className="text-[10px] text-on-primary-container/80 uppercase tracking-tighter">SKU: APP-MBP-14-M2-S</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-70">Subtotal</span>
              <span className="font-bold">₵23,800.00</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-70">Logistics (Insured)</span>
              <span className="font-bold">₵700.00</span>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs uppercase font-black tracking-widest">Escrow Total</span>
              <span className="text-2xl font-black text-secondary-container">₵24,500.00</span>
            </div>
            <div className="pt-2">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-emerald-400">
                <Shield size={12} /> Funds secured in eliseladmin Escrow
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl p-8 shadow-sm border border-secondary-container/20">
          <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 font-headline">
            <Scale size={20} className="text-secondary" /> Mediation Tool
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-3">Proposed Action</label>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-4 py-3 rounded-xl border border-slate-100 text-xs font-bold hover:bg-slate-50 transition-all text-left flex flex-col gap-1">
                  <span className="text-primary">Partial Refund</span>
                  <span className="text-[9px] font-medium text-slate-400">Keep item + Credit</span>
                </button>
                <button className="px-4 py-3 rounded-xl border-2 border-primary bg-primary/5 text-xs font-bold transition-all text-left flex flex-col gap-1">
                  <span className="text-primary">Full Refund</span>
                  <span className="text-[9px] font-medium text-slate-400">Return item for 100%</span>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Refund Amount (GHS)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₵</span>
                <input className="w-full bg-slate-50 border-none rounded-xl pl-8 pr-4 py-3 font-bold text-primary focus:ring-2 focus:ring-primary/20 outline-none" type="number" defaultValue="24500" />
              </div>
            </div>
            <div className="bg-secondary-container/10 p-4 rounded-xl">
              <div className="flex items-start gap-3">
                <Info size={16} className="text-secondary shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed text-on-secondary-container font-medium">
                  A full refund requires the buyer to ship the item back to TechHaven GH within 72 hours. Escrow will only release funds once the vendor confirms receipt of the damaged unit.
                </p>
              </div>
            </div>
            <button className="w-full py-4 rounded-full bg-secondary-container text-on-secondary-container font-black uppercase tracking-widest text-xs hover:shadow-lg transition-all active:scale-[0.98]">
              Send Proposal to Parties
            </button>
          </div>
        </section>

        <section className="bg-slate-50 rounded-xl p-6">
          <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Case Timeline</h4>
          <div className="space-y-4">
            <TimelineItem title="Transaction Completed" time="Oct 10, 09:12" active={false} />
            <TimelineItem title="Dispute Filed by Buyer" time="Oct 12, 14:15" active={false} />
            <TimelineItem title="Mediation Initiated" time="Oct 13, 10:00 (Today)" active={true} last />
          </div>
        </section>
      </div>
    </div>
  </motion.div>
);

const TimelineItem = ({ title, time, active, last }: { title: string, time: string, active: boolean, last?: boolean }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-primary' : 'bg-slate-300'}`}></div>
      {!last && <div className="w-[1px] h-full bg-slate-200"></div>}
    </div>
    <div>
      <p className={`text-[11px] font-bold ${active ? 'text-primary' : 'text-on-surface'}`}>{title}</p>
      <p className="text-[9px] text-slate-400">{time}</p>
    </div>
  </div>
);

const ServicesManagement = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="flex justify-between items-end mb-10">
      <div>
        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">
          <span>eliseladmin</span>
          <ChevronRight size={12} />
          <span className="text-primary">Services Management</span>
        </div>
        <h2 className="text-4xl font-extrabold text-primary tracking-tight font-headline">Provider Vetting & Marketplace Oversight</h2>
      </div>
      <div className="flex gap-3">
        <button className="bg-slate-100 text-on-surface px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center gap-2">
          <Filter size={14} /> Filter View
        </button>
        <button className="bg-primary text-white px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2">
          <Plus size={14} /> Invite Provider
        </button>
      </div>
    </div>

    <div className="grid grid-cols-4 gap-6 mb-12">
      <StatCard label="Pending Vetting" value="24" trend="+8" color="error" />
      <StatCard label="Active Providers" value="1,482" />
      <StatCard label="Recent Bookings" value="312" />
      <div className="col-span-1 bg-primary text-white p-6 rounded-xl shadow-xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-teal-300 mb-1">Dispute Ratio</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black">0.4%</span>
          <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-tighter">Healthy</span>
        </div>
      </div>
    </div>

    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-primary flex items-center gap-2 font-headline">
          <Shield size={20} className="text-secondary" /> Critical Vetting Queue
        </h3>
        <button className="text-primary text-[10px] font-bold uppercase underline tracking-widest hover:opacity-80">View All Applications</button>
      </div>
      <div className="grid grid-cols-3 gap-8">
        {SERVICE_APPLICATIONS.map((app) => (
          <div key={app.id} className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group border border-slate-100">
            <div className="flex justify-between mb-4">
              <div className="flex gap-4">
                <img className="w-14 h-14 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={app.avatar} alt={app.name} referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold text-primary font-headline">{app.name}</h4>
                  <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{app.category}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Shield size={10} className="text-secondary" />
                    <span className="text-[10px] font-bold text-on-surface">{app.portfolioScore} Portfolio Score</span>
                  </div>
                </div>
              </div>
              <span className={`h-fit px-2 py-1 rounded text-[9px] font-bold uppercase tracking-tighter border ${
                app.status === 'Needs Review' ? 'bg-secondary-container/20 text-on-secondary-container border-secondary-container/30' :
                app.status === 'Background Flag' ? 'bg-error-container/20 text-on-error-container border-error-container/30' :
                'bg-emerald-100 text-emerald-800 border-emerald-200'
              }`}>{app.status}</span>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Identity Verified</span>
                <CheckCircle2 size={14} className="text-emerald-500" />
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Portfolio Items</span>
                <span className="text-on-surface font-bold">{app.projects} Projects</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Submission Date</span>
                <span className="text-on-surface font-bold">{app.submittedAt}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="w-full bg-primary text-white py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-colors">Review Portfolio</button>
              <div className="flex gap-2">
                <button className="flex-1 border border-slate-200 text-primary py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-colors">Approve</button>
                <button className={`px-3 border py-2 rounded-lg transition-colors ${app.status === 'Background Flag' ? 'bg-error text-white border-error' : 'border-error-container text-error hover:bg-error-container/20'}`}>
                  <Flag size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
      <div className="p-8 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-primary font-headline">Live Booking Monitor</h3>
          <p className="text-xs text-slate-400 mt-1">Real-time service transaction stream</p>
        </div>
        <div className="flex gap-2">
          <button className="text-xs font-bold uppercase tracking-widest text-primary bg-slate-50 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">Export CSV</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Service ID</th>
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Provider</th>
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Client</th>
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Service Category</th>
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Amount</th>
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-slate-400">Escrow Status</th>
              <th className="p-5 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {SERVICE_BOOKINGS.map((booking) => (
              <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-5 text-xs font-bold text-primary">{booking.id}</td>
                <td className="p-5">
                  <div className="flex items-center gap-3">
                    {booking.avatar ? (
                      <img className="w-8 h-8 rounded-full object-cover" src={booking.avatar} alt={booking.provider} referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-[10px] text-white font-bold">{booking.initials}</div>
                    )}
                    <span className="text-xs font-medium text-on-surface">{booking.provider}</span>
                  </div>
                </td>
                <td className="p-5 text-xs text-on-surface">{booking.client}</td>
                <td className="p-5">
                  <span className="bg-slate-100 text-primary px-3 py-1 rounded text-[10px] font-semibold">{booking.category}</span>
                </td>
                <td className="p-5 text-xs font-bold text-primary">{booking.amount}</td>
                <td className="p-5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      booking.status === 'Funds Secured' ? 'bg-emerald-400' :
                      booking.status === 'Pending Release' ? 'bg-secondary' :
                      'bg-error'
                    }`}></span>
                    <span className="text-xs font-medium text-on-surface">{booking.status}</span>
                  </div>
                </td>
                <td className="p-5 text-right">
                  {booking.status === 'Disputed' ? (
                    <button className="bg-error text-white text-[9px] font-black uppercase px-2 py-1 rounded">Action Needed</button>
                  ) : (
                    <button className="text-slate-400 hover:text-primary transition-colors"><Settings size={16} /></button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-slate-50/50 flex justify-between items-center">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Showing {SERVICE_BOOKINGS.length} of 152 live transactions</p>
        <div className="flex gap-2">
          <button className="p-2 bg-white border border-slate-200 rounded-lg disabled:opacity-50" disabled>
            <ChevronLeft size={16} />
          </button>
          <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  </motion.div>
);

const ServiceHealthItem = ({ name, status }: { name: string, status: string }) => (
  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
    <span className="text-sm font-bold text-primary">{name}</span>
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{status}</span>
      <CheckCircle2 size={16} className="text-emerald-500" />
    </div>
  </div>
);

const HeroStatsGrid = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
    <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-primary to-primary-container p-8 rounded-[2rem] text-white relative overflow-hidden shadow-2xl">
      <div className="relative z-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-2 font-headline">Total Platform Volume (MTD)</p>
        <h3 className="text-4xl font-extrabold tracking-tighter mb-4 font-headline">GHS 12,482,930.00</h3>
        <div className="flex items-center gap-3">
          <span className="bg-teal-300 text-primary px-3 py-1 rounded-full text-xs font-bold">+12.4%</span>
          <span className="text-xs opacity-70">vs last month</span>
        </div>
      </div>
      <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
    </div>
    
    <div className="bg-white p-8 rounded-[2rem] shadow-sm flex flex-col justify-between border border-slate-100">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-2 font-headline">Total Users</p>
        <h3 className="text-3xl font-extrabold tracking-tighter text-teal-950 font-headline">14,208</h3>
      </div>
      <div className="flex -space-x-3 mt-4">
        <img alt="User 1" className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/seed/u1/100/100" referrerPolicy="no-referrer" />
        <img alt="User 2" className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/seed/u2/100/100" referrerPolicy="no-referrer" />
        <img alt="User 3" className="w-8 h-8 rounded-full border-2 border-white" src="https://picsum.photos/seed/u3/100/100" referrerPolicy="no-referrer" />
        <div className="w-8 h-8 rounded-full border-2 border-white bg-primary-container flex items-center justify-center text-[10px] font-bold text-white">2k+</div>
      </div>
    </div>

    <div className="bg-secondary-container p-8 rounded-[2rem] shadow-sm flex flex-col justify-between border border-on-secondary-container/5">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-secondary-container/70 mb-2 font-headline">System Health Score</p>
        <h3 className="text-3xl font-extrabold tracking-tighter text-on-secondary-container font-headline">99.8%</h3>
      </div>
      <div className="h-1.5 w-full bg-on-secondary-container/10 rounded-full overflow-hidden">
        <div className="h-full bg-on-secondary-container w-[99.8%] rounded-full"></div>
      </div>
    </div>
  </div>
);

const SystemStatus = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
    {/* Hero Stats Grid */}
    <HeroStatsGrid />

    {/* Bento Control Center */}
    <div className="grid grid-cols-12 gap-8">
      {/* Platform Traffic Analysis */}
      <div className="col-span-12 lg:col-span-8 space-y-8">
        <div className="bg-slate-50 p-1 rounded-[2.5rem]">
          <div className="bg-white p-10 rounded-[2.25rem] shadow-sm">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tighter text-teal-950 font-headline">Live Platform Monitoring</h2>
                <p className="text-sm text-slate-500 mt-1">Real-time data synchronization with Accra & Kumasi Hubs</p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-xs font-bold bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">Daily</button>
                <button className="px-4 py-2 text-xs font-bold bg-primary text-white rounded-full">Weekly</button>
              </div>
            </div>
            
            <div className="h-64 flex items-end justify-between gap-4 px-2">
              {[60, 45, 80, 95, 70, 55, 40].map((height, i) => (
                <div 
                  key={i}
                  className={`w-full ${i === 3 ? 'bg-primary' : 'bg-slate-100'} rounded-t-xl transition-all hover:bg-primary/20 cursor-pointer relative group`}
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-white text-[10px] px-2 py-1 rounded">
                    {(height * 50).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <span key={day} className={`text-[10px] font-bold uppercase tracking-widest ${i === 3 ? 'text-primary underline decoration-2 underline-offset-4' : 'text-slate-400'}`}>
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Rapid Actions */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-emerald-900 p-8 rounded-[2rem] text-emerald-100 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <h4 className="text-xl font-bold mb-2 font-headline">Audit Logs</h4>
            <p className="text-sm opacity-70 mb-6">Review system-wide administrative actions and security overrides.</p>
            <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
              Access Logs <ArrowRight size={16} />
            </button>
            <FileText size={120} className="absolute -bottom-4 -right-4 opacity-10 rotate-12 pointer-events-none" />
          </div>
          <div className="bg-slate-100 p-8 rounded-[2rem] text-primary relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <h4 className="text-xl font-bold mb-2 font-headline">Vendor Verification</h4>
            <p className="text-sm text-slate-500 mb-6">12 pending applications requiring immediate compliance review.</p>
            <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary group-hover:gap-4 transition-all">
              Review Now <ArrowRight size={16} />
            </button>
            <BadgeCheck size={120} className="absolute -bottom-4 -right-4 opacity-5 rotate-12 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Control Side Bar */}
      <div className="col-span-12 lg:col-span-4 space-y-8">
        {/* Critical Alerts */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-error rounded-full"></span>
            <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-500 font-headline">Critical Priority</h4>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-error/5 rounded-2xl border border-error/10">
              <AlertCircle className="text-error shrink-0" size={20} />
              <div>
                <p className="text-sm font-bold text-error">Suspicious Volume Spike</p>
                <p className="text-[11px] text-error/70">Account #7729 detected anomalous outbound payout volume.</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-secondary/5 rounded-2xl border border-secondary/10">
              <Database className="text-secondary shrink-0" size={20} />
              <div>
                <p className="text-sm font-bold text-secondary">Maintenance Due</p>
                <p className="text-[11px] text-secondary/70">Database clustering scheduled for 02:00 GMT+0.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Global Config Quick Access */}
        <div className="bg-primary text-white p-8 rounded-[2rem] shadow-xl">
          <h4 className="text-lg font-bold mb-6 font-headline">System Configuration</h4>
          <div className="space-y-3">
            {[
              { icon: <Sliders size={18} />, label: 'Global Fee Schedule' },
              { icon: <Lock size={18} />, label: 'Auth Provider Settings' },
              { icon: <Globe size={18} />, label: 'Regional Parameters' },
              { icon: <ShieldAlert size={18} />, label: 'Role Matrix Manager' }
            ].map((item, i) => (
              <button key={i} className="w-full flex justify-between items-center p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-white/5">
                <div className="flex items-center gap-3">
                  <span className="text-teal-300">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <ChevronRight size={14} className="opacity-40" />
              </button>
            ))}
          </div>
        </div>

        {/* Vendor Map Preview */}
        <div className="h-64 rounded-[2rem] overflow-hidden relative shadow-lg group">
          <img alt="Market Map" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://picsum.photos/seed/map/400/300" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-primary/20"></div>
          <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-headline">Active Hubs</p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm font-bold text-primary font-headline">Greater Accra Region</span>
              <span className="bg-primary text-white text-[9px] px-2 py-0.5 rounded-full font-bold">8 ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Regional & Service Health */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-primary font-headline">Regional Node Status</h3>
        </div>
        <div className="p-6 space-y-6">
          <RegionalNode name="Accra (Primary)" status="Operational" load={42} />
          <RegionalNode name="Kumasi (Edge)" status="Operational" load={28} />
          <RegionalNode name="Tamale (Edge)" status="Operational" load={15} />
          <RegionalNode name="Lagos (Relay)" status="Operational" load={34} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-lg font-bold text-primary font-headline">Service Health Monitor</h3>
        </div>
        <div className="p-6 space-y-4">
          <ServiceHealthItem name="Escrow Engine" status="Healthy" />
          <ServiceHealthItem name="Verification API" status="Healthy" />
          <ServiceHealthItem name="Intelligence Core" status="Healthy" />
          <ServiceHealthItem name="Moderation Pipeline" status="Healthy" />
          <ServiceHealthItem name="Ads Delivery" status="Healthy" />
          <ServiceHealthItem name="Payment Gateway" status="Healthy" />
        </div>
      </div>
    </div>

    {/* Management Table */}
    <div className="bg-slate-50 rounded-[2.5rem] p-1 overflow-hidden">
      <div className="bg-white rounded-[2.25rem] overflow-hidden shadow-sm">
        <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-2xl font-extrabold tracking-tighter text-teal-950 font-headline">Administrative Access Control</h2>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-xs font-bold hover:opacity-90 transition-opacity">
            <UserPlus size={16} />
            Provision New Admin
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 font-headline">Identity</th>
                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 font-headline">Level / Role</th>
                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 font-headline">Regional Scope</th>
                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 font-headline">Status</th>
                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 font-headline">Activity</th>
                <th className="px-10 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 text-right font-headline">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: 'Kofi Ansah', email: 'k.ansah@akoma.sys', role: 'Operations Lead', scope: 'Greater Accra', status: 'Active', activity: '2 mins ago', initial: 'KA', color: 'bg-teal-100 text-teal-700' },
                { name: 'Akua Mensah', email: 'a.mensah@akoma.sys', role: 'Compliance Officer', scope: 'Ashanti / Global', status: 'Active', activity: '14 hours ago', initial: 'AM', color: 'bg-amber-100 text-amber-700' },
                { name: 'Ekow Baidoo', email: 'e.baidoo@akoma.sys', role: 'Finance Auditor', scope: 'Corporate HQ', status: 'Offline', activity: '3 days ago', initial: 'EB', color: 'bg-slate-100 text-slate-700' }
              ].map((admin, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${admin.color} flex items-center justify-center font-bold text-xs`}>{admin.initial}</div>
                      <div>
                        <p className="text-sm font-bold text-teal-950">{admin.name}</p>
                        <p className="text-[10px] text-slate-400">{admin.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="px-3 py-1 bg-slate-100 rounded-sm text-[10px] font-bold text-teal-900 border border-slate-200 uppercase">{admin.role}</span>
                  </td>
                  <td className="px-10 py-6 text-sm text-slate-600 font-medium">{admin.scope}</td>
                  <td className="px-10 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold ${
                      admin.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${admin.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                      {admin.status}
                    </span>
                  </td>
                  <td className="px-10 py-6 text-xs text-slate-400">{admin.activity}</td>
                  <td className="px-10 py-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </motion.div>
);

const FormsCatalog = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    {/* Hero Section */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">Registry Management</span>
        <h2 className="text-4xl font-extrabold text-primary mt-2 tracking-tight font-headline">Official Forms Catalog</h2>
        <p className="text-slate-500 mt-2 max-w-xl">Configure institutional documentation, manage service fees, and monitor processing throughput for government-tier transactions.</p>
      </div>
      <div className="flex gap-3">
        <button className="flex items-center gap-2 px-6 py-3 bg-surface-container-high text-on-surface font-semibold rounded-full hover:scale-102 transition-all">
          <span className="material-symbols-outlined text-xl">update</span>
          Update Pricing
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:shadow-lg hover:-translate-y-1 transition-all">
          <span className="material-symbols-outlined text-xl">add</span>
          Add New Form
        </button>
      </div>
    </div>

    {/* Bento Statistics Grid */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <div className="col-span-1 md:col-span-2 bg-primary-container rounded-xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
        <div className="z-10">
          <p className="text-primary-fixed text-xs font-bold uppercase tracking-widest opacity-80">Active Inventory</p>
          <h3 className="text-5xl font-black text-white mt-4 font-headline">124</h3>
          <p className="text-primary-fixed mt-2">Verified Government Forms</p>
        </div>
        <div className="z-10 flex gap-4 text-xs font-semibold">
          <span className="bg-white/10 px-3 py-1 rounded-full text-white">+12 this month</span>
          <span className="bg-white/10 px-3 py-1 rounded-full text-white">4 Pending Review</span>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <span className="material-symbols-outlined text-[180px]">description</span>
        </div>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-8 shadow-sm">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Avg. Processing Time</p>
        <div className="flex items-baseline gap-2 mt-4">
          <h3 className="text-4xl font-black text-primary font-headline">2.4</h3>
          <span className="text-lg font-bold text-slate-400 tracking-tight">DAYS</span>
        </div>
        <div className="mt-6 h-2 w-full bg-surface-container-low rounded-full overflow-hidden">
          <div className="h-full bg-secondary w-3/4 rounded-full"></div>
        </div>
        <p className="text-[10px] text-slate-500 mt-3 font-semibold uppercase">12% FASTER THAN LAST QUARTER</p>
      </div>
      <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-8 shadow-sm">
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Pending Assistance</p>
        <div className="flex items-baseline gap-2 mt-4 text-error">
          <h3 className="text-4xl font-black font-headline">48</h3>
          <span className="material-symbols-outlined animate-pulse">priority_high</span>
        </div>
        <p className="text-xs text-slate-500 mt-4 leading-relaxed">Requiring manual verification from senior moderator.</p>
        <button className="mt-6 text-primary font-bold text-xs underline underline-offset-4 hover:text-secondary-container transition-colors">REVIEW QUEUE</button>
      </div>
    </div>

    {/* Asymmetric Catalog Grid */}
    <h3 className="font-headline text-xl font-bold text-primary mb-8 flex items-center gap-3">
      <span className="w-8 h-[2px] bg-secondary-container"></span>
      Top-Tier Registry Forms
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Card 1 */}
      <div className="group col-span-1 md:col-span-2 flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
          <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG9et_JlaIaFiZkS4U21YYK3oSKQBZW1MusLFGKRwt3igEy-yF8RumItJXECKWLL9_h9wXVrpG9F3LtcQe0ZK3am9khlLfR-c__s8lE9fuTc_8nJgJb6GuPhc0UOlyhb_DsSx9Igecn2pgMezgckrwSiLk6zx6mRCtyNNMhoiPOubKVp1k6UJslaaDZJzKnxPvTPGRWN-U3XCuv9dH_-dODKGWSO0Ys2Ed5KQvFSZeVH-b2hkGDULaIW-OMjzBemaGRckYy17Esos" referrerPolicy="no-referrer" />
        </div>
        <div className="p-10 flex flex-col justify-between flex-1">
          <div>
            <div className="flex justify-between items-start">
              <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] px-3 py-1 rounded-sm font-bold tracking-widest uppercase">Institutional</span>
              <div className="text-right">
                <p className="text-slate-400 text-[10px] font-bold uppercase">Base Fee</p>
                <p className="text-xl font-black text-primary font-headline">₵1,250.00</p>
              </div>
            </div>
            <h4 className="text-2xl font-black text-primary mt-6 tracking-tight font-headline">Business Registration Certificate</h4>
            <p className="text-sm text-slate-500 mt-4 leading-relaxed">Mandatory documentation for new enterprises under the Registrar General's Department. Includes VAT and Tax Identification registration.</p>
          </div>
          <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 3-5 Working Days</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-secondary">verified</span> Guaranteed</span>
            </div>
            <button className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <span className="material-symbols-outlined">edit_note</span>
            </button>
          </div>
        </div>
      </div>
      {/* Card 2 */}
      <div className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="relative h-48">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMjaIRhm9OSZf6pCk6ED8IO6PzMSA4IDEAzoRS50h9jsIRpDABWiPTCoRQEyrWLlFm5-PrEmfEcTyidcE1jquqofnCZOEWvee2RBiYmmHMHG-Aa2F5a8wsTgzOPCAJv3jGPgMbI1Nb8PbvrFJE83VNRqY-BR9p9W76HvNoFnfER_HaTxdG9dLWfBR-z8BTxXsPo6M7Kh4BM4bYzbK2sFblDSXxI0JYYvwXcOvAVZXkShwP0V9JbwY5yYjCtHfwSwp9qZXHI1pLKmU" referrerPolicy="no-referrer" />
          <div className="absolute top-4 left-4 bg-primary/90 text-white text-[10px] px-3 py-1 font-bold uppercase tracking-widest">Construction</div>
        </div>
        <div className="p-8 flex-1 flex flex-col">
          <h4 className="text-xl font-black text-primary tracking-tight font-headline">EPA Environmental Permit</h4>
          <p className="text-xs text-slate-500 mt-3 leading-relaxed">Environmental assessment forms for industrial and residential development compliance.</p>
          <div className="mt-auto pt-8 flex items-center justify-between border-t border-slate-50">
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase">Pricing</p>
              <p className="text-lg font-black text-primary font-headline">₵4,500.00</p>
            </div>
            <button className="bg-secondary-container text-on-secondary-container text-xs font-bold px-4 py-2 rounded-full hover:brightness-95 transition-all">REVIEW</button>
          </div>
        </div>
      </div>
      {/* Card 3 */}
      <div className="group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="relative h-48">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6P10Z56Zvc1YYkW_3c5mJvjujvotYfUUz6UIzdXwATCcAP0ee7ADdFsuStr7NMtSvAYnHLVsVC_Oxao0Qr22xoZI3GPQ24EZ8VphcbQ33cDcdolb7JzlINrIZmYCTLkM6Rop6rGgXbnG-uIuChmMmqCsQw5SBErV39rrpdI7LvHipIQCVQfTmRtfzuLPeqlFiJ-itlUXgNte6dx0xXshv5qBUQ_Z4WOrJ5OMO9nKJr68DD8Lt0K0iu-B0HWI2B3WzupQZaSvrVRs" referrerPolicy="no-referrer" />
          <div className="absolute top-4 left-4 bg-primary/90 text-white text-[10px] px-3 py-1 font-bold uppercase tracking-widest">Immigration</div>
        </div>
        <div className="p-8 flex-1 flex flex-col">
          <h4 className="text-xl font-black text-primary tracking-tight font-headline">Expedited Resident Permit</h4>
          <p className="text-xs text-slate-500 mt-3 leading-relaxed">Application forms for foreign investors and long-term residency verification services.</p>
          <div className="mt-auto pt-8 flex items-center justify-between border-t border-slate-50">
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase">Pricing</p>
              <p className="text-lg font-black text-primary font-headline">₵8,900.00</p>
            </div>
            <button className="bg-secondary-container text-on-secondary-container text-xs font-bold px-4 py-2 rounded-full hover:brightness-95 transition-all">REVIEW</button>
          </div>
        </div>
      </div>
      {/* Card 4 */}
      <div className="group col-span-1 md:col-span-2 flex flex-col md:flex-row bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="p-10 flex flex-col justify-between flex-1">
          <div>
            <div className="flex justify-between items-start">
              <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] px-3 py-1 rounded-sm font-bold tracking-widest uppercase">Municipal</span>
              <div className="text-right">
                <p className="text-slate-400 text-[10px] font-bold uppercase">Base Fee</p>
                <p className="text-xl font-black text-primary font-headline">₵350.00</p>
              </div>
            </div>
            <h4 className="text-2xl font-black text-primary mt-6 tracking-tight font-headline">Street Naming & Digital Addressing</h4>
            <p className="text-sm text-slate-500 mt-4 leading-relaxed">Official certification for residential and commercial location tagging in metropolitan areas.</p>
          </div>
          <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> 24 Hours</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-secondary">flash_on</span> Fast Track</span>
            </div>
            <button className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
              <span className="material-symbols-outlined">edit_note</span>
            </button>
          </div>
        </div>
        <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
          <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuc_gZP1s517o92WJXUnO--lKCL15cE9RgQyyxrJBpYFkQ0iLUmXlpkI4CsBzDt_cAqlYR23olG0UITuwnKzGKLv235HrCrWZ8vvuUw1BplIqd5g7xCGC0wO7CWeZeICrPrhir11TqZ63l8-TbBnxwQvcAvUzSTQksSCntte5oIAdIyXuKN1smG50pqSDPjJf3mk7w0BaNZjBDvu2Qph8ZqUC3UoReuHhhtK0EdxAZqOe3P_fyGGpj1YsDR_M8ZgPyXSCDd2yexxE" referrerPolicy="no-referrer" />
        </div>
      </div>
    </div>

    {/* Table Section */}
    <div className="mt-24">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-headline text-2xl font-black text-primary">Pending Submission Reviews</h3>
        <a className="text-xs font-bold text-secondary uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all" href="#">View All Requests <span className="material-symbols-outlined">arrow_forward</span></a>
      </div>
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-surface-container-low text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <th className="px-8 py-4">Submission ID</th>
              <th className="px-8 py-4">Requester</th>
              <th className="px-8 py-4">Form Type</th>
              <th className="px-8 py-4">SLA Clock</th>
              <th className="px-8 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <tr className="hover:bg-surface-container transition-colors group">
              <td className="px-8 py-5">
                <p className="text-xs font-bold text-primary">#REF-882-901</p>
                <p className="text-[10px] text-slate-400">Mar 12, 14:30</p>
              </td>
              <td className="px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center text-[10px] font-bold">EK</div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">Emmanuel K. Mensah</p>
                    <p className="text-[10px] text-slate-500">Tier 2 Vendor</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-5 text-xs font-semibold text-slate-600">Land Title Transfer (Customs)</td>
              <td className="px-8 py-5">
                <span className="px-2 py-1 bg-error-container text-on-error-container text-[10px] font-bold rounded uppercase">12h Overdue</span>
              </td>
              <td className="px-8 py-5">
                <button className="bg-primary px-4 py-1.5 rounded-full text-white text-[10px] font-bold hover:bg-secondary-container hover:text-on-secondary-container transition-all">REVIEW SUBMISSION</button>
              </td>
            </tr>
            <tr className="hover:bg-surface-container transition-colors group">
              <td className="px-8 py-5">
                <p className="text-xs font-bold text-primary">#REF-210-445</p>
                <p className="text-[10px] text-slate-400">Mar 12, 15:10</p>
              </td>
              <td className="px-8 py-5">
                <div className="flex items-center gap-3">
                  <img className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoKQZMB9-tyVitPTzKab5jKqGpLdiLECIDVfog5hCmjXprBlWWw969qcVj_85c_IgXSuvWpwVh1ufRrx2xDIV89oEplvGJkLk-TUlq0diuNu1A3MThC8XeV64nolDnHLR54WMKrCgof2y4VHnzsDlwTKX_Tv7lFVr2y4ZavlSryEviyXBY7SJG5by0vw1G0_y2m2-zam1IRXwo03t06yJhiyMU1zsbCsF4rDvuhzw6t5aCn6Ue7Gyh-_9Nm0zD8NQYE3MTHWl9Co8" referrerPolicy="no-referrer" />
                  <div>
                    <p className="text-xs font-bold text-on-surface">Abena Asante</p>
                    <p className="text-[10px] text-slate-500">Standard User</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-5 text-xs font-semibold text-slate-600">Marriage License (Special)</td>
              <td className="px-8 py-5">
                <span className="px-2 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold rounded uppercase">4h Remaining</span>
              </td>
              <td className="px-8 py-5">
                <button className="bg-primary px-4 py-1.5 rounded-full text-white text-[10px] font-bold hover:bg-secondary-container hover:text-on-secondary-container transition-all">REVIEW SUBMISSION</button>
              </td>
            </tr>
            <tr className="hover:bg-surface-container transition-colors group">
              <td className="px-8 py-5">
                <p className="text-xs font-bold text-primary">#REF-551-003</p>
                <p className="text-[10px] text-slate-400">Mar 12, 16:45</p>
              </td>
              <td className="px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">JW</div>
                  <div>
                    <p className="text-xs font-bold text-on-surface">John Walker</p>
                    <p className="text-[10px] text-slate-500">Corporate Agent</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-5 text-xs font-semibold text-slate-600">Mining Prospecting License</td>
              <td className="px-8 py-5">
                <span className="px-2 py-1 bg-surface-container-high text-slate-500 text-[10px] font-bold rounded uppercase">Paused / Draft</span>
              </td>
              <td className="px-8 py-5">
                <button className="bg-primary px-4 py-1.5 rounded-full text-white text-[10px] font-bold hover:bg-secondary-container hover:text-on-secondary-container transition-all">REVIEW SUBMISSION</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </motion.div>
);

const StudentRegistry = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <div className="flex justify-between items-end mb-10">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mb-2 block">Academic Registry</span>
        <h2 className="text-4xl font-extrabold text-primary tracking-tight font-headline">Student Verification & Records</h2>
        <p className="text-on-surface-variant mt-2 max-w-xl">Centralized database for student identity verification, academic credentials, and institutional enrollment status.</p>
      </div>
      <div className="flex gap-3">
        <button className="px-6 py-3 bg-white text-on-surface font-semibold rounded-full text-sm flex items-center gap-2 transition-all hover:scale-[1.02] border border-slate-200">
          <Download size={18} /> Export Registry
        </button>
        <button className="px-6 py-3 bg-primary text-white font-semibold rounded-full text-sm flex items-center gap-2 transition-all hover:scale-[1.02] shadow-lg shadow-primary/20">
          <Plus size={18} /> Add Student Record
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
      <StatCard label="Total Students" value="12,402" icon={<School size={20} />} />
      <StatCard label="Verified Status" value="94%" color="secondary" icon={<ShieldCheck size={20} />} />
      <StatCard label="Pending Review" value="156" color="error" icon={<Clock size={20} />} />
      <StatCard label="Active Institutions" value="42" icon={<Globe size={20} />} />
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-8 border-b border-slate-50 flex justify-between items-center">
        <h3 className="text-xl font-headline font-extrabold text-primary">Student Directory</h3>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search by name or ID..." className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-full text-sm outline-none w-64" />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <th className="px-8 py-4">Student Entity</th>
              <th className="px-4 py-4">Institution</th>
              <th className="px-4 py-4">Program</th>
              <th className="px-4 py-4">Verification</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-8 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-white flex items-center justify-center font-bold">KA</div>
                  <div>
                    <p className="text-sm font-bold text-primary">Kwame Appiah</p>
                    <p className="text-xs text-slate-400">ID: STU-2024-001</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-on-surface">University of Ghana</td>
              <td className="px-4 py-4 text-sm text-on-surface">BSc. Computer Science</td>
              <td className="px-4 py-4">
                <span className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                  <CheckCircle2 size={14} /> Verified
                </span>
              </td>
              <td className="px-8 py-4 text-right">
                <button className="text-primary hover:underline text-xs font-bold">View Profile</button>
              </td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-8 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold">AA</div>
                  <div>
                    <p className="text-sm font-bold text-primary">Abena Asante</p>
                    <p className="text-xs text-slate-400">ID: STU-2024-042</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 text-sm text-on-surface">KNUST</td>
              <td className="px-4 py-4 text-sm text-on-surface">BFA. Communication Design</td>
              <td className="px-4 py-4">
                <span className="flex items-center gap-1.5 text-secondary text-xs font-bold">
                  <Clock size={14} /> Pending
                </span>
              </td>
              <td className="px-8 py-4 text-right">
                <button className="text-primary hover:underline text-xs font-bold">View Profile</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </motion.div>
);

const PermissionControls = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <HeroStatsGrid />
    <div className="flex justify-between items-end mb-12">
      <div>
        <span className="text-secondary font-bold tracking-[0.2em] text-[10px] uppercase block mb-2">Access Governance</span>
        <h2 className="text-4xl font-headline font-extrabold text-primary tracking-tight leading-none">Permission & Role Controls</h2>
      </div>
      <div className="flex gap-4">
        <button className="bg-surface-container-high text-on-surface font-semibold px-6 py-3 rounded-full hover:bg-surface-container-highest transition-all flex items-center gap-2">
          <Users size={18} /> Manage Staff
        </button>
        <button className="bg-primary text-white font-semibold px-8 py-3 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center gap-2">
          <Plus size={18} /> Create New Role
        </button>
      </div>
    </div>

    <div className="grid grid-cols-12 gap-6 mb-12">
      <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between border-l-4 border-primary border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Roles</p>
          <h4 className="text-3xl font-headline font-black text-primary mt-2">14</h4>
          <p className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <TrendingUp size={14} /> +2 this month
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm flex flex-col justify-between border-l-4 border-secondary border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Staff Assigned</p>
          <h4 className="text-3xl font-headline font-black text-primary mt-2">128</h4>
          <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1">
            <UserCheck size={14} /> 98% Security Coverage
          </p>
        </div>
        <div className="col-span-2 bg-primary-container text-white p-6 rounded-xl relative overflow-hidden shadow-lg">
          <div className="relative z-10">
            <h4 className="font-headline font-bold text-lg mb-2">Security Audit Pending</h4>
            <p className="text-sm text-white/80 mb-4 max-w-[200px]">3 roles have outdated permission clusters that require review.</p>
            <button className="text-xs font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors border border-white/20">Start Audit</button>
          </div>
          <RotateCcw size={120} className="absolute -right-4 -bottom-4 opacity-10" />
        </div>
      </div>

      <div className="col-span-12 lg:col-span-8 bg-slate-50 rounded-2xl p-8 flex flex-col gap-6 border border-slate-100">
        <div className="flex justify-between items-center">
          <h3 className="font-headline font-bold text-primary">Core Administrative Roles</h3>
          <button className="text-xs font-bold text-primary underline underline-offset-4 decoration-primary/30">View All Role Blueprints</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RoleCard 
            title="Super Admin" 
            desc="Total system control, user management & financial oversight." 
            badge="FULL ACCESS" 
            icon={<ShieldAlert size={20} />}
            avatars={['amina', 'osei']}
            count={2}
          />
          <RoleCard 
            title="Chief Moderator" 
            desc="Dispute resolution, content filtering & vendor compliance." 
            badge="MODERATOR" 
            color="secondary"
            icon={<Gavel size={20} />}
            avatars={['kofi']}
            count={8}
          />
          <RoleCard 
            title="Escrow Auditor" 
            desc="Transaction monitoring, tax reporting & payout verification." 
            badge="FINANCE" 
            icon={<Wallet size={20} />}
            avatars={['efua', 'admin']}
            count={12}
          />
        </div>
      </div>
    </div>

    <section className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100">
      <div className="p-8 flex justify-between items-center border-b border-slate-50">
        <div>
          <h3 className="text-2xl font-headline font-bold text-primary">Master Permission Matrix</h3>
          <p className="text-sm text-slate-400 mt-1">Cross-reference role capabilities across platform modules</p>
        </div>
        <div className="flex gap-2 bg-slate-50 p-1 rounded-xl">
          <button className="bg-white text-primary text-xs font-bold px-4 py-2 rounded-lg shadow-sm">By Module</button>
          <button className="text-slate-400 text-xs font-bold px-4 py-2 rounded-lg hover:text-primary">By Staff</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="p-6 font-headline uppercase tracking-widest text-[10px] font-black text-slate-400">Module Unit</th>
              <th className="p-6 font-headline uppercase tracking-widest text-[10px] font-black text-slate-400 text-center">Super Admin</th>
              <th className="p-6 font-headline uppercase tracking-widest text-[10px] font-black text-slate-400 text-center">Mod Manager</th>
              <th className="p-6 font-headline uppercase tracking-widest text-[10px] font-black text-slate-400 text-center">Sales Lead</th>
              <th className="p-6 font-headline uppercase tracking-widest text-[10px] font-black text-slate-400 text-center">Support Staff</th>
              <th className="p-6 font-headline uppercase tracking-widest text-[10px] font-black text-slate-400 text-center">Data Entry</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <MatrixRow title="User Identity Management" subtitle="Ban, verify, and edit profiles" icon={<User size={18} />} permissions={['full', 'full', 'none', 'view', 'none']} />
            <MatrixRow title="Financial Operations" subtitle="Process payouts & adjust fees" icon={<Wallet size={18} />} permissions={['full', 'none', 'view', 'none', 'none']} />
            <MatrixRow title="Marketing & Ads" subtitle="Manage listings & ad campaigns" icon={<Megaphone size={18} />} permissions={['full', 'view', 'full', 'edit', 'full']} />
            <MatrixRow title="Legal & Compliance" subtitle="Access contracts & legal logs" icon={<Gavel size={18} />} permissions={['full', 'full', 'none', 'none', 'none']} />
          </tbody>
        </table>
      </div>
      <div className="p-6 bg-slate-50/30 flex justify-between items-center">
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span className="text-slate-500">Full Control</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye size={14} className="text-secondary" />
            <span className="text-slate-500">View Only</span>
          </div>
          <div className="flex items-center gap-2">
            <Edit size={14} className="text-secondary" />
            <span className="text-slate-500">Partial Edit</span>
          </div>
          <div className="flex items-center gap-2">
            <Ban size={14} className="text-slate-300" />
            <span className="text-slate-500">No Access</span>
          </div>
        </div>
        <button className="text-xs font-bold text-primary flex items-center gap-2 hover:translate-x-1 transition-transform">
          Download Permissions Report <Download size={14} />
        </button>
      </div>
    </section>
  </motion.div>
);

const RoleCard = ({ title, desc, badge, icon, avatars, count, color = 'primary' }: any) => (
  <div className="bg-white p-5 rounded-xl border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group">
    <div className="flex justify-between items-start mb-4">
      <div className={`w-10 h-10 ${color === 'primary' ? 'bg-primary/5 text-primary' : 'bg-secondary/5 text-secondary'} rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded-sm ${color === 'primary' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}>{badge}</span>
    </div>
    <h5 className="font-bold text-primary mb-1 font-headline">{title}</h5>
    <p className="text-xs text-slate-400 mb-4 leading-relaxed">{desc}</p>
    <div className="flex -space-x-2">
      {avatars.map((a: string, i: number) => (
        <img key={i} className="w-6 h-6 rounded-full border-2 border-white object-cover" src={`https://picsum.photos/seed/${a}/100`} referrerPolicy="no-referrer" />
      ))}
      <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[8px] font-bold">+{count}</div>
    </div>
  </div>
);

const MatrixRow = ({ title, subtitle, icon, permissions }: any) => (
  <tr className="hover:bg-slate-50/50 transition-colors">
    <td className="p-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary">
          {icon}
        </div>
        <div>
          <p className="font-bold text-sm text-primary font-headline">{title}</p>
          <p className="text-[10px] text-slate-400">{subtitle}</p>
        </div>
      </div>
    </td>
    {permissions.map((p: string, i: number) => (
      <td key={i} className="p-6 text-center">
        {p === 'full' && <CheckCircle2 size={18} className="text-emerald-500 mx-auto" />}
        {p === 'view' && <Eye size={18} className="text-secondary mx-auto" />}
        {p === 'edit' && <Edit size={18} className="text-secondary mx-auto" />}
        {p === 'none' && <Ban size={18} className="text-slate-300 mx-auto" />}
      </td>
    ))}
  </tr>
);

const GlobalSettings = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 max-w-7xl mx-auto px-8 py-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <p className="text-secondary font-semibold uppercase tracking-[0.2em] text-[10px] mb-2">Platform Governance</p>
          <h2 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tighter text-primary">Super Admin: Global Settings</h2>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 rounded-full bg-surface-container-high text-on-surface text-sm font-semibold hover:bg-surface-container-highest transition-colors active:scale-95 duration-200">
            Discard Changes
          </button>
          <button className="px-8 py-2.5 rounded-full bg-gradient-to-br from-primary to-primary-container text-on-primary text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 duration-200">
            Publish Updates
          </button>
        </div>
      </div>

      {/* Bento Grid Settings Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Financial Master Switches */}
        <div className="md:col-span-8 bg-surface-container-lowest p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow border border-outline-variant/10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h3 className="text-2xl font-bold font-headline text-primary-container">Monetization Engine</h3>
              <p className="text-on-surface-variant text-sm mt-1">Global transaction architecture and fee structures.</p>
            </div>
            <Landmark className="text-teal-600/30 text-4xl" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4 p-6 bg-surface-container-low rounded-xl">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Global Service Fee</label>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold font-headline">12.5<span className="text-sm font-normal text-slate-400 ml-1">%</span></span>
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-white rounded-lg transition-colors"><Minus size={14} /></button>
                  <button className="p-1.5 hover:bg-white rounded-lg transition-colors"><Plus size={14} /></button>
                </div>
              </div>
              <div className="h-1 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[45%]"></div>
              </div>
            </div>
            <div className="space-y-4 p-6 bg-surface-container-low rounded-xl">
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500">Escrow Hold Period</label>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold font-headline">7<span className="text-sm font-normal text-slate-400 ml-1">Days</span></span>
                <div className="flex gap-1">
                  <button className="p-1.5 hover:bg-white rounded-lg transition-colors"><Minus size={14} /></button>
                  <button className="p-1.5 hover:bg-white rounded-lg transition-colors"><Plus size={14} /></button>
                </div>
              </div>
              <div className="h-1 bg-surface-variant rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[70%]"></div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-outline-variant/15 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                <CreditCard className="text-teal-600" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Min Payout</p>
                <p className="text-sm font-bold">$50.00</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                <MousePointerClick className="text-amber-600" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Ad CPC Base</p>
                <p className="text-sm font-bold">$0.85</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                <BadgeCheck className="text-emerald-600" size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Vendor Bond</p>
                <p className="text-sm font-bold">$250.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Verification Switchboard */}
        <div className="md:col-span-4 bg-primary text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary-fixed to-transparent"></div>
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-6">
              <h3 className="text-xl font-bold font-headline">Compliance Shield</h3>
              <p className="text-primary-fixed-dim text-xs mt-1">Enforce trust & safety protocols platform-wide.</p>
            </div>
            <div className="space-y-6 flex-1">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <p className="text-sm font-semibold">Strict KYC</p>
                  <p className="text-[10px] text-primary-fixed-dim">Requires ID document scan</p>
                </div>
                <div className="w-12 h-6 bg-tertiary-fixed rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <p className="text-sm font-semibold">Address Verification</p>
                  <p className="text-[10px] text-primary-fixed-dim">Validates physical presence</p>
                </div>
                <div className="w-12 h-6 bg-slate-600 rounded-full relative cursor-pointer">
                  <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-inner"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <div>
                  <p className="text-sm font-semibold">Bio-Link Lock</p>
                  <p className="text-[10px] text-primary-fixed-dim">Restrict external URLs</p>
                </div>
                <div className="w-12 h-6 bg-tertiary-fixed rounded-full relative cursor-pointer">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <button className="w-full flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] py-2 hover:bg-white/5 rounded-lg transition-colors">
                View Security Logs
                <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Advertising Pricing Bento */}
        <div className="md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-surface-container p-6 rounded-[2rem] flex flex-col gap-4 border border-outline-variant/10">
            <div className="flex items-center gap-3">
              <Zap className="text-secondary" size={20} />
              <h4 className="font-bold font-headline text-lg">Featured Slots</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">Top-of-search placements. Primary revenue driver for curated search results.</p>
            <div className="mt-auto flex items-end justify-between">
              <span className="text-sm font-bold text-primary">$12.00 <span className="text-[10px] font-normal text-slate-500">/day</span></span>
              <button className="text-[10px] font-bold text-secondary uppercase hover:underline">Adjust Rate</button>
            </div>
          </div>
          <div className="bg-surface-container p-6 rounded-[2rem] flex flex-col gap-4 border border-outline-variant/10">
            <div className="flex items-center gap-3">
              <Megaphone className="text-primary" size={20} />
              <h4 className="font-bold font-headline text-lg">Banner Ads</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">Category-wide visual banners. Optimized for high-traffic entry points.</p>
            <div className="mt-auto flex items-end justify-between">
              <span className="text-sm font-bold text-primary">$45.00 <span className="text-[10px] font-normal text-slate-500">/mil</span></span>
              <button className="text-[10px] font-bold text-secondary uppercase hover:underline">Adjust Rate</button>
            </div>
          </div>
          <div className="bg-surface-container p-6 rounded-[2rem] flex flex-col gap-4 border border-outline-variant/10">
            <div className="flex items-center gap-3">
              <Star className="text-tertiary" size={20} />
              <h4 className="font-bold font-headline text-lg">Vendor Badges</h4>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">Monthly subscription for trust indicators and priority support.</p>
            <div className="mt-auto flex items-end justify-between">
              <span className="text-sm font-bold text-primary">$29.99 <span className="text-[10px] font-normal text-slate-500">/mo</span></span>
              <button className="text-[10px] font-bold text-secondary uppercase hover:underline">Adjust Rate</button>
            </div>
          </div>
        </div>

        {/* Global Content Filter */}
        <div className="md:col-span-12 bg-white p-8 rounded-[2rem] border border-outline-variant/20 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-bold font-headline text-primary">Master Content Filter</h3>
              <p className="text-slate-500 text-sm">Automated moderation & keyword suppression engine.</p>
            </div>
            <button className="p-3 bg-tertiary/5 text-tertiary rounded-xl hover:bg-tertiary/10 transition-colors">
              <Filter size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Banned Keywords (Global)</h5>
              <div className="flex flex-wrap gap-2">
                {['Replica', 'Direct Sale', 'Outside Pay'].map(term => (
                  <span key={term} className="px-3 py-1 bg-surface-container-low text-xs font-medium rounded-sm border border-outline-variant/20 flex items-center gap-2">
                    {term} <X size={10} />
                  </span>
                ))}
                <button className="px-3 py-1 bg-primary text-on-primary text-xs font-bold rounded-sm flex items-center gap-1 active:scale-95">
                  <Plus size={10} /> Add Term
                </button>
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                  <Bot className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold">AI Auto-Moderation</p>
                  <p className="text-[10px] text-on-surface-variant font-medium">98.4% Accuracy Rating</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-tertiary uppercase">Active</span>
                <div className="w-14 h-7 bg-tertiary-container rounded-full relative p-1 cursor-pointer">
                  <div className="w-5 h-5 bg-on-tertiary-container rounded-full ml-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AdPricingCard = ({ title, subtitle, price, demand, active, adjust, icon }: any) => (
  <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-secondary border border-slate-100">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h4 className="font-bold text-primary font-headline">{title}</h4>
        <p className="text-[10px] font-medium text-slate-500 uppercase font-headline">{subtitle}</p>
      </div>
      <div className="text-secondary">{icon}</div>
    </div>
    <div className="text-3xl font-black text-primary mb-4 font-headline">{price}<span className="text-xs opacity-50 font-medium">/DAY</span></div>
    {demand && (
      <div className="flex items-center gap-2">
        <div className="h-1 flex-1 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-secondary w-2/3"></div>
        </div>
        <span className="text-[9px] font-bold text-slate-500 font-headline">{demand}</span>
      </div>
    )}
    {active && (
      <div className="flex items-center gap-2 text-[9px] font-bold text-emerald-600 font-headline">
        <CheckCircle2 size={12} />
        <span>CURRENTLY ACTIVE ({active})</span>
      </div>
    )}
    {adjust && (
      <button className="w-full bg-white text-primary text-[10px] font-black py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors font-headline">ADJUST SCALING</button>
    )}
  </div>
);

const GatewayRow = ({ provider, type, sig, rate, initial, expired }: any) => (
  <tr className="group hover:bg-slate-50 transition-colors">
    <td className="py-5">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded ${expired ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-primary'} flex items-center justify-center font-black text-xs`}>{initial}</div>
        <div>
          <div className="font-bold text-sm">{provider}</div>
          <div className={`text-[10px] ${expired ? 'text-red-600 font-bold uppercase' : 'text-slate-500'}`}>{type}</div>
        </div>
      </div>
    </td>
    <td className="py-5 font-mono text-xs opacity-40">{sig}</td>
    <td className="py-5">
      <div className="flex items-center gap-2">
        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full ${expired ? 'bg-red-600' : 'bg-emerald-500'} rounded-full`} style={{ width: `${rate}%` }}></div>
        </div>
        <span className={`text-[10px] font-black ${expired ? 'text-red-600' : 'text-emerald-600'}`}>{rate}%</span>
      </div>
    </td>
    <td className="py-5 text-right">
      {expired ? (
        <button className="bg-red-600 text-white px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest hover:bg-red-700 transition-colors font-headline">Update Now</button>
      ) : (
        <button className="text-primary font-black text-[10px] uppercase tracking-widest hover:underline font-headline">Configuration</button>
      )}
    </td>
  </tr>
);

const WholesaleCommand = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-10">
    <HeroStatsGrid />
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-1">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary font-headline">Wholesale Command</h1>
        <p className="text-on-surface-variant">Live oversight of bulk trade operations and high-volume fulfillment.</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 text-on-surface font-semibold text-sm hover:scale-105 transition-transform">
          <Users size={18} /> Manage Distributors
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 text-on-surface font-semibold text-sm hover:scale-105 transition-transform">
          <FileText size={18} /> Generate Procurement Report
        </button>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
          <Plus size={18} /> Add New Inventory
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-2 bg-primary-container text-white rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px] shadow-xl">
        <div className="relative z-10">
          <p className="text-sm font-bold uppercase tracking-widest opacity-70">Total Wholesale Value</p>
          <h3 className="text-5xl font-extrabold mt-2 tracking-tighter font-headline">GH₵ 12.84M</h3>
        </div>
        <div className="flex items-center gap-4 relative z-10">
          <span className="flex items-center text-teal-300 font-bold text-sm bg-white/10 px-3 py-1 rounded-full">
            <TrendingUp size={16} className="mr-1" /> +14.2%
          </span>
          <p className="text-xs opacity-80">vs Last Month</p>
        </div>
        <Package size={120} className="absolute -right-4 -bottom-4 opacity-10" />
      </div>

      <div className="bg-slate-50 rounded-xl p-6 flex flex-col justify-between border border-slate-100">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-xl bg-secondary-container/20 flex items-center justify-center text-secondary">
            <AlertTriangle size={24} />
          </div>
          <span className="text-[10px] font-bold uppercase text-secondary bg-secondary-container/30 px-2 py-0.5 rounded">Critical</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-primary font-headline">24</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Pending Restock Alerts</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-6 flex flex-col justify-between border border-slate-100">
        <div className="flex justify-between items-start">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <ShoppingCart size={24} />
          </div>
          <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">Active</span>
        </div>
        <div>
          <p className="text-2xl font-bold text-primary font-headline">1,402</p>
          <p className="text-xs text-slate-500 font-medium mt-1">Bulk Order Volume (MTD)</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="xl:col-span-2 space-y-8">
        <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-primary font-headline">Active Wholesale Inventory</h3>
              <span className="bg-primary/5 text-primary text-[10px] font-extrabold px-2 py-1 rounded uppercase tracking-wider">Live Feed</span>
            </div>
            <button className="text-primary font-bold text-xs hover:underline flex items-center gap-1">
              View Detailed Audit <ChevronRight size={14} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 rounded-l-lg">Product / SKU</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">Stock Capacity</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">Wholesale Price</th>
                  <th className="py-3 px-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center rounded-r-lg">Supplier Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <InventoryRow 
                  img="https://picsum.photos/seed/grain/100" 
                  name="Premium Grade Shea Butter (Bulk)" 
                  sku="WHS-SHEA-002" 
                  capacity={82} 
                  current="4,100" 
                  total="5,000kg" 
                  price="GH₵ 1,240.00" 
                  unit="per 50kg Unit" 
                  status="Verified" 
                />
                <InventoryRow 
                  img="https://picsum.photos/seed/cocoa/100" 
                  name="Raw Cocoa Beans - Grade A" 
                  sku="WHS-COCO-091" 
                  capacity={12} 
                  current="600" 
                  total="5,000kg" 
                  price="GH₵ 850.00" 
                  unit="per 25kg Bag" 
                  status="Re-Auditing" 
                  critical
                />
                <InventoryRow 
                  img="https://picsum.photos/seed/palmoil/100" 
                  name="Cold Pressed Palm Oil" 
                  sku="WHS-PALM-442" 
                  capacity={55} 
                  current="1,100" 
                  total="2,000L" 
                  price="GH₵ 2,100.00" 
                  unit="per 200L Drum" 
                  status="Verified" 
                />
              </tbody>
            </table>
          </div>
        </section>

        <section className="bg-slate-50 rounded-xl p-6 border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-primary font-headline">Recent Bulk Transactions</h3>
            <div className="flex gap-2">
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-white transition-all"><Filter size={18} /></button>
              <button className="p-1.5 rounded-lg border border-slate-200 hover:bg-white transition-all"><Download size={18} /></button>
            </div>
          </div>
          <div className="space-y-3">
            <TransactionItem icon={<Truck size={20} />} title="Accra Distribution Hub #204" subtitle="Order ID: TR-884931 • 12 Items • GH₵ 84,200" date="Oct 24, 2023" time="14:22" status="Shipped" />
            <TransactionItem icon={<Package size={20} />} title="Kumasi Retail Collective" subtitle="Order ID: TR-884928 • 5 Items • GH₵ 12,500" date="Oct 24, 2023" time="11:05" status="Processing" />
            <TransactionItem icon={<CheckCircle2 size={20} />} title="Volta Lake Exporters Ltd" subtitle="Order ID: TR-884925 • 42 Items • GH₵ 256,000" date="Oct 23, 2023" time="16:45" status="Delivered" />
          </div>
        </section>
      </div>

      <div className="space-y-8">
        <section className="bg-primary text-white rounded-xl p-8 relative overflow-hidden group shadow-xl">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <h3 className="text-xl font-bold font-headline">Supplier Health</h3>
              <p className="text-xs text-teal-300 opacity-80 mt-1">Cross-network performance index</p>
            </div>
            <div className="mt-8 space-y-6">
              <HealthMetric label="Average Lead Time" value="4.2 Days" progress={75} color="secondary" />
              <HealthMetric label="Fulfillment Rate" value="98.4%" progress={98} color="emerald" />
              <HealthMetric label="Compliance Score" value="92/100" progress={92} color="teal" />
            </div>
            <button className="mt-8 w-full py-3 bg-white/10 rounded-lg text-sm font-bold hover:bg-white/20 transition-all border border-white/20">
              Detailed Network Map
            </button>
          </div>
        </section>

        <section className="bg-slate-50 rounded-xl p-6 border border-slate-100">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Average Wholesale Margin</p>
          <div className="mt-4 flex items-baseline gap-2">
            <h4 className="text-3xl font-extrabold text-primary font-headline">18.4%</h4>
            <span className="text-emerald-600 font-bold text-xs flex items-center">
              <ArrowUp size={14} /> 2.1%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">System-wide weighted average across all product categories for the current fiscal quarter.</p>
          <div className="mt-6 p-4 rounded-xl bg-white flex items-center gap-4 shadow-sm">
            <div className="flex-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase">Top Yield Category</p>
              <p className="text-sm font-bold text-primary">Export Cocoa</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-emerald-600">22.8%</p>
            </div>
          </div>
        </section>

        <section className="bg-white border border-error/10 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={18} className="text-error" />
            <h3 className="text-sm font-extrabold text-primary uppercase tracking-tight font-headline">System Alerts</h3>
          </div>
          <ul className="space-y-4">
            <AlertItem text={<>Price surge detected for <span className="font-bold">Raw Palm Kernels</span>. Review distributor contracts.</>} color="error" />
            <AlertItem text={<>Supplier <span className="font-bold">North-Agron</span> certification expiring in 5 days.</>} color="secondary" />
            <AlertItem text={<>Inventory sync with Cape Coast warehouse completed successfully.</>} color="slate" muted />
          </ul>
        </section>
      </div>
    </div>
  </motion.div>
);

const InventoryRow = ({ img, name, sku, capacity, current, total, price, unit, status, critical }: any) => (
  <tr className="group hover:bg-slate-50 transition-colors">
    <td className="py-4 px-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
          <img src={img} alt={name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>
        <div>
          <p className="text-sm font-bold text-primary font-headline">{name}</p>
          <p className="text-[10px] text-slate-400 font-mono uppercase">SKU: {sku}</p>
        </div>
      </div>
    </td>
    <td className="py-4 px-4 w-48">
      <div className="space-y-1.5">
        <div className={`flex justify-between text-[10px] font-bold ${critical ? 'text-error' : 'text-slate-600'}`}>
          <span>{capacity}% {critical ? 'Critical' : 'Full'}</span>
          <span>{current} / {total}</span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className={`${critical ? 'bg-error' : 'bg-primary'} h-full rounded-full`} style={{ width: `${capacity}%` }}></div>
        </div>
      </div>
    </td>
    <td className="py-4 px-4">
      <p className="text-sm font-bold text-primary">{price}</p>
      <p className="text-[10px] text-slate-400">{unit}</p>
    </td>
    <td className="py-4 px-4 text-center">
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${status === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-secondary-container text-on-secondary-container'}`}>
        {status}
      </span>
    </td>
  </tr>
);

const TransactionItem = ({ icon, title, subtitle, date, time, status }: any) => (
  <div className="bg-white p-4 rounded-xl flex items-center justify-between border border-slate-100 hover:border-primary/20 transition-all cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold text-primary font-headline">{title}</p>
        <p className="text-[10px] text-slate-500">{subtitle}</p>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="text-right hidden sm:block">
        <p className="text-xs font-bold text-on-surface">{date}</p>
        <p className="text-[10px] text-slate-400 uppercase tracking-tighter">Ordered At {time}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
        status === 'Shipped' ? 'bg-emerald-100 text-emerald-800' :
        status === 'Processing' ? 'bg-secondary-container text-on-secondary-container' :
        'bg-slate-100 text-slate-500'
      }`}>
        {status}
      </span>
      <ChevronRight size={16} className="text-slate-300 group-hover:text-primary transition-colors" />
    </div>
  </div>
);

const HealthMetric = ({ label, value, progress, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest">
      <span>{label}</span>
      <span className={color === 'secondary' ? 'text-secondary-fixed' : color === 'emerald' ? 'text-emerald-400' : 'text-teal-300'}>{value}</span>
    </div>
    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
      <div className={`h-full ${color === 'secondary' ? 'bg-secondary-fixed' : color === 'emerald' ? 'bg-emerald-400' : 'bg-teal-300'}`} style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

const AlertItem = ({ text, color, muted }: any) => (
  <li className={`flex gap-3 ${muted ? 'opacity-50' : ''}`}>
    <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${color === 'error' ? 'bg-error' : color === 'secondary' ? 'bg-secondary' : 'bg-slate-400'}`}></div>
    <p className="text-xs text-on-surface leading-tight">{text}</p>
  </li>
);

const RegionalNode = ({ name, status, load }: { name: string, status: string, load: number }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
      <div>
        <p className="text-sm font-bold text-primary">{name}</p>
        <p className="text-[10px] text-slate-400 uppercase font-bold">{status}</p>
      </div>
    </div>
    <div className="flex items-center gap-4">
      <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${load}%` }}></div>
      </div>
      <span className="text-xs font-bold text-primary w-8 text-right">{load}%</span>
    </div>
  </div>
);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MarketInterface />} />
      <Route path="/services" element={<ServicesInterface />} />
      <Route path="/messages" element={<MessagingInterface />} />
      <Route path="/vendor" element={<VendorPortalInterface />} />
      <Route path="/checkout" element={<CheckoutInterface />} />
      <Route path="/admin" element={<MainDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function MainDashboard() {
  const [currentView, setCurrentView] = useState<View>('verification');

  const viewTitles: Record<View, string> = {
    verification: 'Verification',
    moderation: 'Moderation',
    intelligence: 'Intelligence',
    escrow: 'Escrow',
    disputes: 'Disputes',
    services: 'Services',
    ads: 'Ads Dashboard',
    'ads-review': 'Review: CP-90821-GH',
    analytics: 'Analytics',
    'system-status': 'System Status',
    forms: 'Forms Catalog',
    students: 'Student Registry',
    permissions: 'Permissions',
    wholesale: 'Wholesale',
    settings: 'Global Settings',
    security: 'Security Settings'
  };

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="ml-[280px] min-h-screen">
        <TopBar title={viewTitles[currentView]} />
        
        <section className="pt-24 pb-12 px-8 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {currentView === 'intelligence' && <IntelligenceDashboard key="intelligence" />}
            {currentView === 'verification' && <VerificationQueue key="verification" />}
            {currentView === 'moderation' && <ModerationQueue key="moderation" />}
            {currentView === 'escrow' && <EscrowManagement key="escrow" />}
            {currentView === 'disputes' && <DisputeResolution key="disputes" />}
            {currentView === 'services' && <ServicesManagement key="services" />}
            {currentView === 'ads' && <AdsDashboard onViewChange={setCurrentView} />}
            {currentView === 'ads-review' && <CampaignReview key="ads-review" />}
            {currentView === 'system-status' && <SystemStatus key="system-status" />}
            {currentView === 'forms' && <FormsCatalog key="forms" />}
            {currentView === 'students' && <StudentRegistry key="students" />}
            {currentView === 'permissions' && <PermissionControls key="permissions" />}
            {currentView === 'wholesale' && <WholesaleCommand key="wholesale" />}
            {currentView === 'settings' && <GlobalSettings key="settings" />}
            {currentView === 'security' && <SecuritySettings key="security" />}
            {!['intelligence', 'verification', 'moderation', 'escrow', 'disputes', 'services', 'ads', 'ads-review', 'system-status', 'forms', 'students', 'permissions', 'wholesale', 'settings', 'security'].includes(currentView) && (
              <motion.div 
                key="placeholder"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 text-on-surface-variant"
              >
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                  <BarChart3 size={40} />
                </div>
                <h3 className="text-xl font-bold text-primary font-headline">{viewTitles[currentView]} System</h3>
                <p className="text-sm">This module is currently initializing. Please check back later.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* AI Command Center FAB */}
      <button className="fixed bottom-10 right-10 w-14 h-14 bg-gradient-to-tr from-primary to-primary-container text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
        <Bot size={24} />
        <span className="absolute right-full mr-4 bg-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl border border-white/10">AI Command Center</span>
      </button>
    </div>
  );
}

const GuidelineItem = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
      {icon}
    </div>
    <div>
      <h4 className="text-xs font-bold text-primary mb-1 font-headline">{title}</h4>
      <p className="text-[10px] text-on-surface-variant leading-relaxed">{desc}</p>
    </div>
  </div>
);

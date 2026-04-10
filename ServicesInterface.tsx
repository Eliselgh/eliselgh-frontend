import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ServicesInterface: React.FC = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Government & Institutional Forms | GhanaCurated";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="bg-surface text-on-surface min-h-screen font-sans">
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full flex flex-col items-center px-6 py-3 max-w-full mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl z-50 shadow-sm dark:shadow-none">
        <div className="w-full flex items-center justify-between gap-8 max-w-7xl">
          <Link to="/" className="text-2xl font-black text-teal-900 dark:text-teal-50 shadow-sm">GhanaCurated</Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-slate-600 dark:text-slate-400 hover:text-teal-800 dark:hover:text-teal-200 transition-colors text-sm font-medium" to="/">Classifieds</Link>
            <Link className="text-slate-600 dark:text-slate-400 hover:text-teal-800 dark:hover:text-teal-200 transition-colors text-sm font-medium" to="/">Marketplace</Link>
            <Link className="text-teal-700 dark:text-teal-300 font-bold border-b-2 border-teal-700 dark:border-teal-300 pb-1 text-sm" to="/services">Services</Link>
          </nav>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/15">
              <span className="material-symbols-outlined text-outline">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-48 font-medium outline-none" placeholder="Search forms or agencies..." type="text"/>
            </div>
            <button className="material-symbols-outlined p-2 text-primary hover:bg-slate-50 rounded-lg transition-all">notifications</button>
            <button className="bg-primary text-white px-6 py-2 rounded-full font-bold text-sm hover:scale-95 active:scale-90 transition-transform">Post Ad</button>
          </div>
        </div>
        <div className="bg-slate-100/50 dark:bg-slate-800/50 h-[1px] w-full mt-3"></div>
      </header>

      <div className="flex pt-20">
        {/* SideNavBar */}
        <aside className="hidden lg:flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-slate-50 dark:bg-slate-950 border-r dark:border-slate-800 p-6 z-40">
          <div className="mb-8">
            <h3 className="font-headline text-lg font-bold text-teal-800 dark:text-teal-400">Welcome back</h3>
            <p className="text-sm font-medium text-slate-500">Verified Member</p>
          </div>
          <nav className="flex-1 space-y-1">
            <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:pl-6 hover:bg-teal-50/50 transition-all group" to="/">
              <span className="material-symbols-outlined">devices</span>
              <span className="font-medium">Electronics</span>
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:pl-6 hover:bg-teal-50/50 transition-all group" to="/">
              <span className="material-symbols-outlined">home</span>
              <span className="font-medium">Real Estate</span>
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:pl-6 hover:bg-teal-50/50 transition-all group" to="/">
              <span className="material-symbols-outlined">directions_car</span>
              <span className="font-medium">Vehicles</span>
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:pl-6 hover:bg-teal-50/50 transition-all group" to="/">
              <span className="material-symbols-outlined">deck</span>
              <span className="font-medium">Home & Garden</span>
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:pl-6 hover:bg-teal-50/50 transition-all group" to="/">
              <span className="material-symbols-outlined">work</span>
              <span className="font-medium">Jobs</span>
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 bg-teal-50 dark:bg-teal-900/30 text-teal-900 dark:text-teal-100 rounded-r-full font-semibold" to="/services">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
              <span className="font-medium">Forms Hub</span>
            </Link>
          </nav>
          <div className="mt-auto space-y-4">
            <Link to="/vendor" className="w-full bg-secondary-container text-on-secondary-fixed font-bold py-3 rounded-xl shadow-sm hover:scale-102 transition-transform text-center block">
              Become a Seller
            </Link>
            <div className="space-y-1">
              <a className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-teal-600 transition-colors" href="#">
                <span className="material-symbols-outlined text-sm">help</span>
                <span className="text-xs uppercase font-bold tracking-widest">Help Center</span>
              </a>
              <a className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-teal-600 transition-colors" href="#">
                <span className="material-symbols-outlined text-sm">settings</span>
                <span className="text-xs uppercase font-bold tracking-widest">Settings</span>
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-1 lg:ml-64 p-8 md:p-12 lg:p-16">
          {/* Hero Section */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-outline-variant/15 pb-8">
              <div className="max-w-2xl">
                <span className="text-secondary font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Official Portal</span>
                <h1 className="text-4xl md:text-5xl font-black text-primary tracking-tight mb-4">Government & Institutional Forms Hub</h1>
                <p className="text-lg text-on-surface-variant font-medium leading-relaxed">Access, verify, and purchase official documentation from Ghana's lead agencies. A curated library of compliant digital and physical forms for your administrative needs.</p>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <div className="text-2xl font-black text-primary">120+</div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Active Forms</div>
                </div>
                <div className="h-10 w-[1px] bg-outline-variant/30 self-center"></div>
                <div className="text-right">
                  <div className="text-2xl font-black text-primary">15</div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Verified Agencies</div>
                </div>
              </div>
            </div>
          </section>

          {/* Bento Grid of Services */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20">
            {/* Featured Card: Passport */}
            <div className="md:col-span-8 bg-surface-container-lowest rounded-full p-8 shadow-sm border border-outline-variant/5 relative overflow-hidden flex flex-col justify-between min-h-[400px]">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-black px-2 py-1 rounded-sm uppercase">Priority Service</span>
                  <span className="text-on-surface-variant font-bold text-xs uppercase tracking-widest">Ministry of Foreign Affairs</span>
                </div>
                <h2 className="text-3xl font-extrabold text-primary mb-2">Biometric Passport Application</h2>
                <p className="text-on-surface-variant max-w-sm font-medium">Standard and Expedited application forms for fresh, renewal, and replacement of Ghanaian Passports.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-8 relative z-10">
                <div>
                  <span className="text-[10px] font-black text-outline uppercase tracking-widest block mb-1">Processing Time</span>
                  <span className="text-primary font-bold">15 - 30 Working Days</span>
                </div>
                <div>
                  <span className="text-[10px] font-black text-outline uppercase tracking-widest block mb-1">Fee Range</span>
                  <span className="text-primary font-bold">GHS 100 - GHS 200</span>
                </div>
                <Link to="/checkout" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
                  Buy Official Copy <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
              {/* Decorative Background Image */}
              <div className="absolute right-0 bottom-0 w-1/2 h-full opacity-10 grayscale pointer-events-none">
                <img className="w-full h-full object-cover" alt="close-up of a dark passport cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnjxWUuDl1XiPdY18ouSDIMg5EptQhfB0LQ5gUkaIEC68dI6Vic9JDJh-vebcrizOvrpUb517Wkmjilo99Ix66b0OZHRkYqD1ORzWBbTet0je9n6GVyRZn1-zdJkgXcdxXh0hBPFq3WWUDq-pKN_V3IYLyoYo2FiUANk5y8-RqnY_GD8M8IxWc0PXDM90HFsD60JKyzX60RXZQHHB1oID0X9YKqKie0nl5B3U-o0nO2DSM9dWEjmAyJ2zTPbswBEz456JHwYRSsV4" referrerPolicy="no-referrer" />
              </div>
            </div>

            {/* Agency Filter Column */}
            <div className="md:col-span-4 bg-primary text-white rounded-full p-8 flex flex-col">
              <h3 className="font-bold text-xl mb-6">Agencies</h3>
              <div className="space-y-4">
                <button className="w-full flex justify-between items-center group">
                  <span className="font-medium text-primary-fixed">DVLA (Licensing)</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
                <button className="w-full flex justify-between items-center group opacity-60 hover:opacity-100 transition-opacity">
                  <span className="font-medium">Registrar General</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
                <button className="w-full flex justify-between items-center group opacity-60 hover:opacity-100 transition-opacity">
                  <span className="font-medium">Ghana Revenue Authority</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
                <button className="w-full flex justify-between items-center group opacity-60 hover:opacity-100 transition-opacity">
                  <span className="font-medium">Land Commission</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
                <button className="w-full flex justify-between items-center group opacity-60 hover:opacity-100 transition-opacity">
                  <span className="font-medium">SSNIT Portal</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
                </button>
              </div>
              <div className="mt-auto pt-8 border-t border-white/10 text-sm text-primary-fixed-dim">
                Select an agency to filter forms and requirements.
              </div>
            </div>

            {/* Form Card: Driver's License */}
            <div className="md:col-span-6 bg-surface-container-low rounded-full p-8 border border-outline-variant/10">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-secondary-fixed text-on-secondary-fixed text-[10px] font-black px-2 py-1 rounded-sm uppercase">DVLA Official</span>
                <span className="text-on-surface-variant font-bold text-xs">ID: F-DV-004</span>
              </div>
              <h3 className="text-2xl font-extrabold text-primary mb-4">Learner's Driving License (Form L1)</h3>
              <div className="space-y-3 mb-8">
                <h4 className="text-[10px] font-black text-outline uppercase tracking-widest">Required Documents</h4>
                <ul className="text-sm font-medium text-on-surface-variant space-y-1">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span> Ghana Card (Original & Copy)</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span> 2 Passport-sized photos</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span> Eye test certificate</li>
                </ul>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-on-surface-variant">Est. Time</div>
                  <div className="text-primary font-black">48 Hours</div>
                </div>
                <Link to="/checkout" className="bg-white border border-outline-variant/30 text-primary px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-50 transition-colors">
                  Buy Copy
                </Link>
              </div>
            </div>

            {/* Form Card: Business Reg */}
            <div className="md:col-span-6 bg-surface-container-low rounded-full p-8 border border-outline-variant/10">
              <div className="flex justify-between items-start mb-6">
                <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-black px-2 py-1 rounded-sm uppercase">Registrar General</span>
                <span className="text-on-surface-variant font-bold text-xs">ID: F-RG-012</span>
              </div>
              <h3 className="text-2xl font-extrabold text-primary mb-4">Sole Proprietorship Registration</h3>
              <div className="space-y-3 mb-8">
                <h4 className="text-[10px] font-black text-outline uppercase tracking-widest">Required Documents</h4>
                <ul className="text-sm font-medium text-on-surface-variant space-y-1">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span> Tax Identification Number (TIN)</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-tertiary">check_circle</span> Proof of business address</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-tertiary text-opacity-30">radio_button_unchecked</span> Valid Government ID</li>
                </ul>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-on-surface-variant">Est. Time</div>
                  <div className="text-primary font-black">5 - 7 Days</div>
                </div>
                <Link to="/checkout" className="bg-white border border-outline-variant/30 text-primary px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-50 transition-colors">
                  Buy Copy
                </Link>
              </div>
            </div>
          </div>

          {/* Informational Banner */}
          <section className="bg-surface-container-high rounded-full p-12 flex flex-col md:flex-row items-center gap-12 mb-20">
            <div className="flex-1">
              <h2 className="text-3xl font-black text-primary mb-4">Trust & Verification Standards</h2>
              <p className="text-on-surface-variant font-medium mb-6">All forms sold on GhanaCurated are official copies sourced directly from respective institutions. We use high-grade watermarking and verification codes to ensure acceptance at all processing centers.</p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/50 backdrop-blur px-4 py-2 rounded-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary">verified_user</span>
                  <span className="text-xs font-bold text-primary uppercase">Guaranteed Acceptable</span>
                </div>
                <div className="bg-white/50 backdrop-blur px-4 py-2 rounded-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary">history_edu</span>
                  <span className="text-xs font-bold text-primary uppercase">Current Versions (2024)</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 aspect-video rounded-xl overflow-hidden shadow-xl">
              <img className="w-full h-full object-cover" alt="professional person signing a legal document" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCm_PZueLAQFgqrgSFJiUkZHUmI6QIns15QLRgvUA89bzHpOeq-pC-Z3Jgy3ZAvwElqE2_6elx53UzzzFaG8B967lJtddeBcCp4zDscKSb-0rwsx9j2WnCC-sb1bpk9gvSVH_hL2fzo7pUj7BmIkcdEhXWdHyQ8A3NytJYYK71FqXnqiJUouzY6GzP8VEIIGMRdnNxNkgR4R_HOHwvwd9DGsY45dlWPedhYI4LgzzpF_evWLapwnG9Wc09wZXm9DCcc57OLDed_eaA" referrerPolicy="no-referrer" />
            </div>
          </section>
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex items-center justify-around py-2 px-4 z-50 shadow-2xl">
        <Link to="/" className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px]">Home</span>
        </Link>
        <Link to="/messages" className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">chat</span>
          <span className="text-[10px]">Messages</span>
        </Link>
        <button className="bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center -translate-y-4 shadow-lg shadow-primary/40 border-4 border-white">
          <span className="material-symbols-outlined">add</span>
        </button>
        <Link to="/services" className="flex flex-col items-center gap-1 text-teal-700 font-bold">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
          <span className="text-[10px]">Services</span>
        </Link>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="text-[10px]">Account</span>
        </button>
      </nav>

      {/* Footer */}
      <footer className="w-full px-8 md:px-24 grid grid-cols-1 md:grid-cols-4 gap-8 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8">
        <div className="col-span-1 md:col-span-1">
          <div className="text-lg font-bold text-teal-900 dark:text-teal-400 mb-4">GhanaCurated</div>
          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">The premier curated ecosystem for administrative and retail services in Ghana.</p>
        </div>
        <div>
          <h4 className="label-md uppercase tracking-widest Inter font-bold text-teal-950 dark:text-teal-100 mb-6 text-sm">Legal & Trust</h4>
          <ul className="space-y-3">
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Trust & Safety</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Buyer Protection</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Seller Policy</a></li>
          </ul>
        </div>
        <div>
          <h4 className="label-md uppercase tracking-widest Inter font-bold text-teal-950 dark:text-teal-100 mb-6 text-sm">Resources</h4>
          <ul className="space-y-3">
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Contact Support</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Privacy Hub</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="label-md uppercase tracking-widest Inter font-bold text-teal-950 dark:text-teal-100 mb-6 text-sm">Subscribe</h4>
          <div className="flex flex-col gap-3">
            <input className="bg-white dark:bg-slate-900 border-none rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-teal-500" placeholder="Updates on new forms..." type="email"/>
            <button className="bg-teal-900 text-white py-2 rounded-lg font-bold text-sm">Join Registry</button>
          </div>
        </div>
        <div className="col-span-1 md:col-span-4 border-t border-slate-200 dark:border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-slate-500 font-medium">© 2024 GhanaCurated Marketplace. Secured by Editorial Standards.</span>
          <div className="flex gap-6">
            <span className="material-symbols-outlined text-slate-400">shield</span>
            <span className="material-symbols-outlined text-slate-400">payments</span>
            <span className="material-symbols-outlined text-slate-400">verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicesInterface;

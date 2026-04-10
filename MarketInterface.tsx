import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const MarketInterface: React.FC = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Electronics - GhanaCurated Marketplace";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body">
      {/* TopNavBar */}
      <header className="fixed top-0 left-0 w-full flex flex-col items-center px-6 py-3 max-w-full mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl z-50 shadow-sm dark:shadow-none">
        <div className="w-full max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-black text-teal-900 dark:text-teal-50 shadow-sm tracking-tight font-headline">GhanaCurated</Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link className="text-slate-600 dark:text-slate-400 hover:text-teal-800 dark:hover:text-teal-200 transition-colors text-sm font-medium" to="/">Classifieds</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-teal-800 dark:hover:text-teal-200 transition-colors text-sm font-medium" to="/">Marketplace</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-teal-800 dark:hover:text-teal-200 transition-colors text-sm font-medium" to="/services">Services</Link>
            </nav>
          </div>
          <div className="flex-1 max-w-md mx-8 relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input 
              className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-surface-tint transition-all outline-none text-sm" 
              placeholder="Search electronics, phones, laptops..." 
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Link to="/admin" className="p-2 hover:bg-slate-50 rounded-lg transition-all cursor-pointer flex items-center gap-1 text-slate-500 hover:text-primary">
                <span className="material-symbols-outlined">admin_panel_settings</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter hidden xl:inline">Admin</span>
              </Link>
              <span className="material-symbols-outlined p-2 hover:bg-slate-50 rounded-lg transition-all cursor-pointer">notifications</span>
              <span className="material-symbols-outlined p-2 hover:bg-slate-50 rounded-lg transition-all cursor-pointer">favorite</span>
              <span className="material-symbols-outlined p-2 hover:bg-slate-50 rounded-lg transition-all cursor-pointer">account_circle</span>
            </div>
            <button className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20">Post Ad</button>
          </div>
        </div>
        <div className="bg-slate-100/50 dark:bg-slate-800/50 h-[1px] w-full mt-3"></div>
      </header>

      <div className="flex pt-20 min-h-screen max-w-[1600px] mx-auto">
        {/* SideNavBar / Filters */}
        <aside className="hidden lg:flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] w-72 bg-slate-50 dark:bg-slate-950 border-r dark:border-slate-800 overflow-y-auto p-6 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-bold">KA</div>
              <div>
                <p className="text-sm font-bold font-headline">Welcome back</p>
                <p className="text-xs text-slate-500">Verified Member</p>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-outline px-2">Browse Categories</h3>
            <nav className="space-y-1">
              <a className="flex items-center gap-3 px-3 py-2 bg-teal-50 dark:bg-teal-900/30 text-teal-900 dark:text-teal-100 rounded-r-full font-semibold transition-all" href="#">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>devices</span>
                <span className="text-sm">Electronics</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:pl-5 transition-all" href="#">
                <span className="material-symbols-outlined">home</span>
                <span className="text-sm">Real Estate</span>
              </a>
              <a className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:pl-5 transition-all" href="#">
                <span className="material-symbols-outlined">directions_car</span>
                <span className="text-sm">Vehicles</span>
              </a>
              <Link className="flex items-center gap-3 px-3 py-2 text-slate-600 dark:text-slate-400 hover:pl-5 transition-all" to="/services">
                <span className="material-symbols-outlined">description</span>
                <span className="text-sm">Forms Hub</span>
              </Link>
            </nav>
          </div>

          {/* Detailed Filters */}
          <div className="space-y-6 pt-4">
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-outline">Location</label>
              <select className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-3 py-2 text-sm focus:ring-primary">
                <option>Accra (Greater Accra)</option>
                <option>Kumasi (Ashanti)</option>
                <option>Takoradi (Western)</option>
                <option>Tamale (Northern)</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-outline">Price Range (GHS)</label>
              <div className="flex items-center gap-2">
                <input className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-3 py-2 text-sm" placeholder="Min" type="number"/>
                <input className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-3 py-2 text-sm" placeholder="Max" type="number"/>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-outline">Condition</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input className="rounded-sm text-primary focus:ring-primary border-outline-variant" type="checkbox"/>
                  <span>Brand New</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input defaultChecked className="rounded-sm text-primary focus:ring-primary border-outline-variant" type="checkbox"/>
                  <span>Used (Tested)</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input className="rounded-sm text-primary focus:ring-primary border-outline-variant" type="checkbox"/>
                  <span>Refurbished</span>
                </label>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-outline">Seller Type</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input className="text-primary focus:ring-primary border-outline-variant" name="seller" type="radio"/>
                  <span>All Sellers</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input defaultChecked className="text-primary focus:ring-primary border-outline-variant" name="seller" type="radio"/>
                  <span>Verified Business</span>
                </label>
              </div>
            </div>
          </div>
          <Link to="/vendor" className="w-full bg-secondary-container text-on-secondary-container py-3 rounded-full font-bold shadow-sm hover:brightness-95 transition-all text-center">Become a Seller</Link>
          <div className="pt-8 space-y-2">
            <a className="flex items-center gap-3 px-3 py-2 text-slate-500 text-xs" href="#">
              <span className="material-symbols-outlined text-lg">help</span>
              Help Center
            </a>
            <a className="flex items-center gap-3 px-3 py-2 text-slate-500 text-xs" href="#">
              <span className="material-symbols-outlined text-lg">settings</span>
              Settings
            </a>
          </div>
        </aside>

        {/* Main Content Canvas */}
        <main className="flex-1 ml-0 lg:ml-72 p-6 md:p-10">
          {/* Breadcrumbs and Title */}
          <div className="mb-8">
            <nav className="flex gap-2 text-xs text-slate-400 mb-2 font-medium">
              <a className="hover:text-primary transition-colors" href="#">Home</a>
              <span>/</span>
              <a className="hover:text-primary transition-colors" href="#">Electronics</a>
              <span>/</span>
              <span className="text-slate-600">Mobile Phones</span>
            </nav>
            <div className="flex items-end justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight font-headline text-primary">Electronics in Accra</h1>
                <p className="text-slate-500 text-sm mt-1">2,482 verified listings available today</p>
              </div>
              <div className="hidden md:flex gap-2">
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant/20 rounded-xl text-sm font-semibold shadow-sm">
                  <span className="material-symbols-outlined text-lg">sort</span> Sort: Newest
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant/20 rounded-xl text-sm font-semibold shadow-sm">
                  <span className="material-symbols-outlined text-lg">grid_view</span>
                </button>
              </div>
            </div>
          </div>

          {/* Promoted/Sponsored Bento Grid */}
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              <h2 className="text-xs font-bold uppercase tracking-widest text-secondary">Promoted Listings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Featured Item 1 */}
              <div className="group relative bg-white rounded-3xl overflow-hidden flex shadow-md hover:shadow-xl transition-all duration-300 border border-outline-variant/10">
                <div className="w-1/3 h-full min-h-[180px] bg-slate-200 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt="iPhone 14 Pro Max" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCifCf5B0BFtKdVtgVS1WWDOOGpj4-yCC5EpF7uGbfCcNwjsSB8BxfB5KPE3flpEblo5YwQizd-gGuQXdYda-Iw3iHdx10l_D3FUWkK_hc1MOl2XM2XAT_5rbC9OJgCRux5rb32_psKwuTJGppQ4dVEqObXYJsZy9oWU4ii6iROm3OGyc03VZ3wCKRXTYtTSARN4Ltl2P3zjjdS5xYYibj_4qIxQ6UHflrkwlA2zYQyo_o5cW22h1Q8YNlf7oXBi4oYBnM8UZgG6K0"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">Sponsored</span>
                      <span className="material-symbols-outlined text-outline cursor-pointer hover:text-error transition-colors">favorite</span>
                    </div>
                    <h3 className="font-bold text-lg mt-2 group-hover:text-primary transition-colors">iPhone 14 Pro Max 256GB</h3>
                    <p className="text-primary font-black text-xl mt-1">GHS 12,500</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[10px] text-tertiary font-bold bg-tertiary-fixed/20 px-2 py-1 rounded">
                      <span className="material-symbols-outlined text-sm">verified_user</span> Escrow Protected
                    </div>
                    <span className="text-xs text-slate-400">East Legon, Accra</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <Link to="/checkout" className="flex flex-col items-center justify-center gap-1 bg-primary text-on-primary py-2 rounded-xl text-[10px] font-bold hover:brightness-110 transition-all">
                      <span className="material-symbols-outlined text-base">payments</span>
                      <span>Buy Now</span>
                    </Link>
                    <a href="tel:+233200000000" className="flex flex-col items-center justify-center gap-1 bg-secondary-container text-on-secondary-container py-2 rounded-xl text-[10px] font-bold hover:brightness-110 transition-all">
                      <span className="material-symbols-outlined text-base">call</span>
                      <span>Call Now</span>
                    </a>
                    <Link to="/messages" className="flex flex-col items-center justify-center gap-1 bg-surface-container-high text-on-surface py-2 rounded-xl text-[10px] font-bold hover:brightness-110 transition-all">
                      <span className="material-symbols-outlined text-base">chat</span>
                      <span>Chat</span>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Featured Item 2 */}
              <div className="group relative bg-white rounded-3xl overflow-hidden flex shadow-md hover:shadow-xl transition-all duration-300 border border-outline-variant/10">
                <div className="w-1/3 h-full min-h-[180px] bg-slate-200 overflow-hidden">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    alt="MacBook Pro" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr7XT7mZRAHNTVGB82AKYgPUjNMTohzee948_A7Rbwnwhr6-JOXX--MDkx8Zw7qg4_qmZS-DIMwJzJe0cU3B1sCuYHfKHOq5gQOnnnlHsb05qgNhXauvprbBFSnXUdFXE0I6u8P9mvJ2nJliGYJ1zqiXK4nBvghs1x1iUm8AgZwCE5wU8MQbMcdVVE-nx-Z_QiyCK86_6yTkd8zNRwLJ5RY6NiuotiMClK2vnYoLKmx6SUp5Wy_dP_oq4n-Sqojxapup8ruVOvRoM"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">Premium</span>
                      <span className="material-symbols-outlined text-outline cursor-pointer hover:text-error transition-colors">favorite</span>
                    </div>
                    <h3 className="font-bold text-lg mt-2 group-hover:text-primary transition-colors">MacBook Pro M2 Chip 2023</h3>
                    <p className="text-primary font-black text-xl mt-1">GHS 18,900</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-[10px] text-tertiary font-bold bg-tertiary-fixed/20 px-2 py-1 rounded">
                      <span className="material-symbols-outlined text-sm">verified_user</span> Escrow Protected
                    </div>
                    <span className="text-xs text-slate-400">Kumasi Central</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <Link to="/checkout" className="flex flex-col items-center justify-center gap-1 bg-primary text-on-primary py-2 rounded-xl text-[10px] font-bold hover:brightness-110 transition-all">
                      <span className="material-symbols-outlined text-base">payments</span>
                      <span>Buy Now</span>
                    </Link>
                    <a href="tel:+233200000000" className="flex flex-col items-center justify-center gap-1 bg-secondary-container text-on-secondary-container py-2 rounded-xl text-[10px] font-bold hover:brightness-110 transition-all">
                      <span className="material-symbols-outlined text-base">call</span>
                      <span>Call Now</span>
                    </a>
                    <Link to="/messages" className="flex flex-col items-center justify-center gap-1 bg-surface-container-high text-on-surface py-2 rounded-xl text-[10px] font-bold hover:brightness-110 transition-all">
                      <span className="material-symbols-outlined text-base">chat</span>
                      <span>Chat</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Standard Listings */}
          <section className="space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-outline mb-4">Latest Listings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {/* Item Card 1 */}
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-outline-variant/20 flex flex-col h-full">
                <div className="relative h-48">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Samsung Galaxy S23 Ultra" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhFXU1YGYSzkmzUzZPQg4ELQMPK2HOg3NpQqF2_qCg_jF0ELytCaD9xnb42VtKZNcfp9RzpUt2_VSetAFrqu-C7fhH0mVwybDTIBIrGeNZO5J58UMVNW9Uip32HnyQUL-Lws-neNyF_N3SdcFkq67GYXR8y-iS8KPQI1Q-7YHWIOQdoyw1HpvPcllK-jGup6tM951YsB5OD9b7_S_ViLV-hD7RwfMk3E6LkUczT4i-lRVNp55RpBFDjKEP08GPdQdr8hOr7dVyqqU"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-sm text-primary text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">NEW</span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Samsung</p>
                    <h3 className="font-bold text-base leading-tight">Samsung Galaxy S23 Ultra - 512GB Sealed</h3>
                    <p className="text-primary font-black text-lg mt-2">GHS 10,200</p>
                    <div className="flex items-center gap-2 mt-3 mb-4">
                      <div className="flex items-center gap-1 text-[9px] text-tertiary font-bold bg-tertiary-fixed-dim/30 px-1.5 py-0.5 rounded">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> VERIFIED SELLER
                      </div>
                      <span className="text-[10px] text-slate-400">Spintex, Accra</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    <Link to="/checkout" className="flex flex-col items-center justify-center gap-1 bg-primary text-on-primary py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">shopping_cart</span>
                      <span>Buy Now</span>
                    </Link>
                    <a href="tel:+233200000000" className="flex flex-col items-center justify-center gap-1 bg-secondary-container text-on-secondary-container py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">call</span>
                      <span>Call Now</span>
                    </a>
                    <Link to="/messages" className="flex flex-col items-center justify-center gap-1 bg-surface-container-high text-on-surface py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">chat</span>
                      <span>Chat</span>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Item Card 2 */}
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-outline-variant/20 flex flex-col h-full">
                <div className="relative h-48">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Sony WH-1000XM4" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzxMZBwLIt6CYn3ZHIuJd32it_zegyzLXI9tAUsQiDs7lVkaJDbewpQYqtTqXaa660bBvHbDJjNfZPbfhhQkHkcLG4xEw-Zt4ObN8XnvC2fswq5uMXAvqCb01S8nPLGB8HpznauswyPGwPNlykMHJdoV36eNvlp5rq4DYnuKaDoMpKzl8kQ1NutdM0LGinthkJ1iKI0ucZh6L3LpnmkxnxYDq1G9Aen9q_qrXshFQwb1eJkR7LDdQcSgGK7v4XaALNXLFTlatRBYc"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">USED</span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Sony</p>
                    <h3 className="font-bold text-base leading-tight">Sony WH-1000XM4 Noise Canceling</h3>
                    <p className="text-primary font-black text-lg mt-2">GHS 2,800</p>
                    <div className="flex items-center gap-2 mt-3 mb-4">
                      <div className="flex items-center gap-1 text-[9px] text-tertiary font-bold bg-tertiary-fixed-dim/30 px-1.5 py-0.5 rounded">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> VERIFIED SELLER
                      </div>
                      <span className="text-[10px] text-slate-400">Osu, Accra</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    <Link to="/checkout" className="flex flex-col items-center justify-center gap-1 bg-primary text-on-primary py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">shopping_cart</span>
                      <span>Buy Now</span>
                    </Link>
                    <a href="tel:+233200000000" className="flex flex-col items-center justify-center gap-1 bg-secondary-container text-on-secondary-container py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">call</span>
                      <span>Call Now</span>
                    </a>
                    <Link to="/messages" className="flex flex-col items-center justify-center gap-1 bg-surface-container-high text-on-surface py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">chat</span>
                      <span>Chat</span>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Item Card 3 */}
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-outline-variant/20 flex flex-col h-full">
                <div className="relative h-48">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="HP EliteBook 840 G8" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-vDp2rf4-eCfuvBbsDlFixtaxfD0o2FXcNvcR_NGCIGfF31Hx9yXD9YgC8VAPbj8e_uqCwKIl7AS1hkF5HVt6Qbk5jd4X4emRiubiUTuG-G1s8WvkTpD72zMOxwbsVtl_UoTkHkb1FL3htdzcChnA7zJ0Jn6q-93srOO6-e3f4dbJ6mvaXC93pazME7DlaUl0zZzq5GsNKDk6YrJtGYLFvxQnLNKJ-_rQ3KLH2TmWOamEn8Dpb1fkEFg2roQw26BfI6x5oWTHk54"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">HP</p>
                    <h3 className="font-bold text-base leading-tight">HP EliteBook 840 G8 Core i7</h3>
                    <p className="text-primary font-black text-lg mt-2">GHS 6,500</p>
                    <div className="flex items-center gap-2 mt-3 mb-4">
                      <div className="flex items-center gap-1 text-[9px] text-tertiary font-bold bg-tertiary-fixed-dim/30 px-1.5 py-0.5 rounded">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> VERIFIED SELLER
                      </div>
                      <span className="text-[10px] text-slate-400">Lapaz, Accra</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    <Link to="/checkout" className="flex flex-col items-center justify-center gap-1 bg-primary text-on-primary py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">shopping_cart</span>
                      <span>Buy Now</span>
                    </Link>
                    <a href="tel:+233200000000" className="flex flex-col items-center justify-center gap-1 bg-secondary-container text-on-secondary-container py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">call</span>
                      <span>Call Now</span>
                    </a>
                    <Link to="/messages" className="flex flex-col items-center justify-center gap-1 bg-surface-container-high text-on-surface py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">chat</span>
                      <span>Chat</span>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Item Card 4 */}
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-outline-variant/20 flex flex-col h-full">
                <div className="relative h-48">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="GoPro Hero 11" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuApc6E7hCRB51JjPNrqduN_nkMkoEe_4E1E8U2tcXK9eEwnt8bYhmTmrjEdiKUqj2s0JPSo1KfpDssVoeRLRFb4QNwgd6yEAu__4ayH8UN_KJWzQ0vyHEq0WgfB4l-R3quduJByrqOFlqgABj6ZV_4zqYebnvK_iP98ba-ZmIHRANKI77ZZJrcWr4eUhwUZ7GOw_IZYPymzco_5ZxHkJjDV5jced10lnDhsQw557d8ddzE_i26A8BpS2ufMqbqIW-hynXQl6pXauu8"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">GoPro</p>
                    <h3 className="font-bold text-base leading-tight">GoPro Hero 11 Black Edition</h3>
                    <p className="text-primary font-black text-lg mt-2">GHS 4,200</p>
                    <div className="flex items-center gap-2 mt-3 mb-4">
                      <div className="flex items-center gap-1 text-[9px] text-tertiary font-bold bg-tertiary-fixed-dim/30 px-1.5 py-0.5 rounded">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> VERIFIED SELLER
                      </div>
                      <span className="text-[10px] text-slate-400">Tema Community 1</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    <Link to="/checkout" className="flex flex-col items-center justify-center gap-1 bg-primary text-on-primary py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">shopping_cart</span>
                      <span>Buy Now</span>
                    </Link>
                    <a href="tel:+233200000000" className="flex flex-col items-center justify-center gap-1 bg-secondary-container text-on-secondary-container py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">call</span>
                      <span>Call Now</span>
                    </a>
                    <Link to="/messages" className="flex flex-col items-center justify-center gap-1 bg-surface-container-high text-on-surface py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">chat</span>
                      <span>Chat</span>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Item Card 5 */}
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-outline-variant/20 flex flex-col h-full">
                <div className="relative h-48">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="KRK Rokit 5" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCxpEUREUG24e7R06Hpcm5XJcSGPE-fPYhPtdla7zRmDfNL9WsJYgCdFaU9PXYut7YvXcvLC-S7oYnVHlkTB1X-4cuZrJPQf5jwLD5jmeG6ccDQl9VNo_4TuuuKb7IikcKiM9aFO7e9Q9e9GN6Op_7qrwttiaiaLoWmYGSf41n3aDsHI3H-fICGUbQ3u4c3D4KBYvXcvx7lt2v3BUDvCEif0UpcJeSrJfjRhU-UW1Co7Du9G3Iz1yfE_gc6Y99Vr-0XBSbMpmTLzM"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">KRK</p>
                    <h3 className="font-bold text-base leading-tight">KRK Rokit 5 Generation 4 Pair</h3>
                    <p className="text-primary font-black text-lg mt-2">GHS 5,800</p>
                    <div className="flex items-center gap-2 mt-3 mb-4">
                      <div className="flex items-center gap-1 text-[9px] text-tertiary font-bold bg-tertiary-fixed-dim/30 px-1.5 py-0.5 rounded">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> VERIFIED SELLER
                      </div>
                      <span className="text-[10px] text-slate-400">Cantonments, Accra</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    <Link to="/checkout" className="flex flex-col items-center justify-center gap-1 bg-primary text-on-primary py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">shopping_cart</span>
                      <span>Buy Now</span>
                    </Link>
                    <a href="tel:+233200000000" className="flex flex-col items-center justify-center gap-1 bg-secondary-container text-on-secondary-container py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">call</span>
                      <span>Call Now</span>
                    </a>
                    <Link to="/messages" className="flex flex-col items-center justify-center gap-1 bg-surface-container-high text-on-surface py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">chat</span>
                      <span>Chat</span>
                    </Link>
                  </div>
                </div>
              </div>
              {/* Item Card 6 */}
              <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-transparent hover:border-outline-variant/20 flex flex-col h-full">
                <div className="relative h-48">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Apple Watch Series 8" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZVH5nYggnKzvwlD-raA1Z5imn26dbecopdHanVWc0h3Jlftw0Xj80Oe1rY0a59G3MO7Q4_dzg_rMs4iuitUWac91UmWr4G7JGBAmu3wD6HrL-glScjKlj2uox98owYRzl-z8EaQllUg6OS2K0TtKdbiQPA9jj0eLQy9AYnd2rQ_fgKkt0xvd9tow1aMZTAvWzvtCkSjzvUMHcr0Fuqz-rrZQV9_loBjDmGVkXpGpilxylJV3P5sFSqoSX4n-w0gVAMzeZj4p-Fww"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-outline mb-1">Apple</p>
                    <h3 className="font-bold text-base leading-tight">Apple Watch Series 8 45mm GPS</h3>
                    <p className="text-primary font-black text-lg mt-2">GHS 3,950</p>
                    <div className="flex items-center gap-2 mt-3 mb-4">
                      <div className="flex items-center gap-1 text-[9px] text-tertiary font-bold bg-tertiary-fixed-dim/30 px-1.5 py-0.5 rounded">
                        <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span> VERIFIED SELLER
                      </div>
                      <span className="text-[10px] text-slate-400">Dansoman, Accra</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-auto">
                    <Link to="/checkout" className="flex flex-col items-center justify-center gap-1 bg-primary text-on-primary py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">shopping_cart</span>
                      <span>Buy Now</span>
                    </Link>
                    <a href="tel:+233200000000" className="flex flex-col items-center justify-center gap-1 bg-secondary-container text-on-secondary-container py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">call</span>
                      <span>Call Now</span>
                    </a>
                    <Link to="/messages" className="flex flex-col items-center justify-center gap-1 bg-surface-container-high text-on-surface py-2 rounded-lg text-[10px] font-bold active:scale-95 transition-all">
                      <span className="material-symbols-outlined text-base">chat</span>
                      <span>Chat</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 pt-10 pb-20">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-outline-variant/20 text-outline hover:bg-slate-50">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <div className="flex gap-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-on-primary font-bold shadow-md">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-600 font-bold hover:bg-slate-50">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-600 font-bold hover:bg-slate-50">3</button>
                <span className="px-2 self-center text-slate-400">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-600 font-bold hover:bg-slate-50">24</button>
              </div>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-outline-variant/20 text-outline hover:bg-slate-50">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full px-8 md:px-24 grid grid-cols-1 md:grid-cols-4 gap-8 bg-slate-100 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8">
        <div className="md:col-span-1">
          <span className="text-lg font-bold text-teal-900 dark:text-teal-400 block mb-4">GhanaCurated</span>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">Connecting buyers and sellers with an editorial standard of excellence and safety in the Ghanaian marketplace.</p>
        </div>
        <div>
          <h4 className="label-md uppercase tracking-widest font-bold text-teal-950 dark:text-teal-100 mb-6 text-xs">Marketplace</h4>
          <ul className="space-y-3">
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Electronics</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Real Estate</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Vehicles</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Jobs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="label-md uppercase tracking-widest font-bold text-teal-950 dark:text-teal-100 mb-6 text-xs">Help & Support</h4>
          <ul className="space-y-3">
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Trust & Safety</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Buyer Protection</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Seller Policy</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Contact Support</a></li>
          </ul>
        </div>
        <div>
          <h4 className="label-md uppercase tracking-widest font-bold text-teal-950 dark:text-teal-100 mb-6 text-xs">Policies</h4>
          <ul className="space-y-3">
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Privacy Hub</a></li>
            <li><a className="text-slate-500 dark:text-slate-400 hover:text-teal-600 dark:hover:text-teal-300 transition-colors text-sm" href="#">Terms of Service</a></li>
          </ul>
          <p className="text-xs text-slate-400 mt-8 font-medium">© 2024 GhanaCurated Marketplace. Secured by Editorial Standards.</p>
        </div>
      </footer>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex items-center justify-around py-2 px-4 z-50 shadow-2xl">
        <button className="flex flex-col items-center gap-1 text-teal-700 font-bold">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px]">Home</span>
        </button>
        <Link to="/messages" className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">chat</span>
          <span className="text-[10px]">Messages</span>
        </Link>
        <button className="bg-primary text-on-primary w-12 h-12 rounded-full flex items-center justify-center -translate-y-4 shadow-lg shadow-primary/40 border-4 border-white">
          <span className="material-symbols-outlined">add</span>
        </button>
        <Link to="/services" className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">description</span>
          <span className="text-[10px]">Services</span>
        </Link>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="text-[10px]">Account</span>
        </button>
      </nav>
    </div>
  );
};

export default MarketInterface;

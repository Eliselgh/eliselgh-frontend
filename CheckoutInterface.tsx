import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CheckoutInterface: React.FC = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Checkout - GhanaCurated Marketplace";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body">
      {/* TopNavBar (Shared Component) */}
      <header className="fixed top-0 left-0 w-full flex flex-col items-center px-6 py-3 max-w-full mx-auto bg-white/80 backdrop-blur-xl shadow-sm z-50">
        <div className="w-full flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-black text-teal-900 shadow-sm tracking-tight font-headline">GhanaCurated</Link>
            <nav className="hidden md:flex gap-6">
              <a className="text-slate-600 hover:text-teal-800 transition-colors font-medium" href="#">Classifieds</a>
              <a className="text-slate-600 hover:text-teal-800 transition-colors font-medium" href="#">Marketplace</a>
              <a className="text-slate-600 hover:text-teal-800 transition-colors font-medium" href="#">Services</a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-slate-600">
              <span className="material-symbols-outlined p-2 hover:bg-slate-50 rounded-lg transition-all duration-200 cursor-pointer">notifications</span>
              <span className="material-symbols-outlined p-2 hover:bg-slate-50 rounded-lg transition-all duration-200 cursor-pointer">favorite</span>
              <span className="material-symbols-outlined p-2 hover:bg-slate-50 rounded-lg transition-all duration-200 cursor-pointer">account_circle</span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
        {/* Checkout Progress Stepper */}
        <div className="mb-12 flex justify-between items-center relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-surface-container-highest -z-10"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm ring-4 ring-surface">1</div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Shipping</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm ring-4 ring-surface">2</div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Payment</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-sm ring-4 ring-surface">3</div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Escrow</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface-variant flex items-center justify-center font-bold text-sm ring-4 ring-surface">4</div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Review</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form Section */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section 1: Shipping (Editorial Layout) */}
            <section className="bg-surface-container-lowest p-8 rounded-full shadow-sm border border-outline-variant/15">
              <div className="flex items-center gap-3 mb-6">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                <h2 className="text-2xl font-bold tracking-tight text-primary">Secure Delivery Details</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant px-1">Full Name</label>
                  <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-surface-tint transition-all" placeholder="Kofi Mensah" type="text"/>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant px-1">Phone Number</label>
                  <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-surface-tint transition-all" placeholder="+233 XX XXX XXXX" type="tel"/>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant px-1">Ghana Region</label>
                  <select className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-surface-tint transition-all">
                    <option>Greater Accra</option>
                    <option>Ashanti Region</option>
                    <option>Central Region</option>
                    <option>Western Region</option>
                    <option>Eastern Region</option>
                    <option>Northern Region</option>
                    <option>Volta Region</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-on-surface-variant px-1">Digital Address (GhanaPost GPS)</label>
                  <input className="w-full bg-surface-container-low border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-surface-tint transition-all" placeholder="GA-123-4567" type="text"/>
                </div>
              </div>
            </section>

            {/* Section 2: Mobile Money Methods (Bento Style) */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 px-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                <h2 className="text-2xl font-bold tracking-tight text-primary">Payment Method</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* MTN Card */}
                <label className="cursor-pointer group relative">
                  <input defaultChecked className="peer sr-only" name="payment" type="radio"/>
                  <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/15 peer-checked:border-secondary peer-checked:bg-secondary-container/10 transition-all flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center overflow-hidden">
                      <img className="w-full h-full object-cover" alt="MTN MoMo" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFT8qZtX0NFzlk2sp8hQVDm6F6K0BLczy4QchJBLb9vYT2v2Ay0lQpOExEtSVVzFkPGr37nVxwBEv-cFDtNJaaU2iZI3jnr7pqvVJNkyoIrsM5FARFEH5jmhFEdMNLxWNXJmL3G9mtMRBzK1MgUfHxZ03pllk7v8DjOKuComcVpaRqWv7QkERgEGsgSaW8YH29Q34bWONpiOdPD1h_cwcWlmwHQ9hAKfp-nN_C5ikGz9tC9oKkY8f-CX5YQU28UTDWhzHtZj20BEk"/>
                    </div>
                    <span className="font-bold text-primary">MTN MoMo</span>
                    <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-secondary">check_circle</span>
                    </div>
                  </div>
                </label>
                {/* Telecel Card */}
                <label className="cursor-pointer group relative">
                  <input className="peer sr-only" name="payment" type="radio"/>
                  <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/15 peer-checked:border-primary peer-checked:bg-primary-container/10 transition-all flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center overflow-hidden">
                      <img className="w-full h-full object-cover" alt="Telecel Cash" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoN5yq4pn6UrYG9tS6sgMTJyIRKCX8lmUEAI8C_pBNjQueuHiAmtKj9SwjK3xt4hPpaj0iv2jnnwv1GIiCyKqk_CElFgOna40vWA1RqgsZEgDc5zOAYCOoHZrhK1vJekB-phv8Fcr7HEoy8gLwghN3rmFLRLUm26A2yCgJcXYU9_afCMT_DuKjxcgby-399GDGBsN8ivW4ttYAL3VioCx0AUGkQwujfeEEjKh1vkfwWKbVeThKwAXc_OS73zoZ_wjubbaz-38H8tE"/>
                    </div>
                    <span className="font-bold text-primary">Telecel Cash</span>
                    <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-primary">check_circle</span>
                    </div>
                  </div>
                </label>
                {/* AT Card */}
                <label className="cursor-pointer group relative">
                  <input className="peer sr-only" name="payment" type="radio"/>
                  <div className="p-6 bg-surface-container-lowest rounded-xl border border-outline-variant/15 peer-checked:border-tertiary peer-checked:bg-tertiary-container/10 transition-all flex flex-col items-center gap-4">
                    <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center overflow-hidden">
                      <img className="w-full h-full object-cover" alt="AT Money" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC74KWlgE8s_h4HUjClWMClNiDQibrZPCQe0MNTmpueoECc4Qhmq7cZSjlAwpTsc49z8n1jLPO0xbA_3oUgr6Ydy743Dmq8hIxepMXiFIZ5ft4xS31S4hlacJ6fXfvGmyqMAIllfdnqCoj6g_iruC-WMnqpqmdChVb5wI8O0nBFRklbkxyHBRFiddwpj1iP0-Bwr4iFBnN8PmxZyICMLZJr0LSIKyHm1y8MbOgzQgXQ73JqV7tOfyVJNKJU_hqmHAsupHR-Nf6M2v8"/>
                    </div>
                    <span className="font-bold text-primary">AT Money</span>
                    <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-tertiary">check_circle</span>
                    </div>
                  </div>
                </label>
              </div>
            </section>

            {/* Section 3: Escrow Shield (Glassmorphism) */}
            <section className="relative overflow-hidden bg-primary rounded-full p-8 text-on-primary shadow-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/30 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full bg-on-primary/10 backdrop-blur-md flex items-center justify-center border border-on-primary/20">
                    <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">GhanaCurated Escrow Protection</h3>
                  <p className="text-on-primary-container/80 text-sm leading-relaxed mb-4">
                    Your funds are held securely in our neutral escrow account. We only release payment to the seller once you confirm receipt of your items in the specified condition.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="bg-on-primary/10 px-4 py-2 rounded-lg flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">percent</span>
                      <span className="text-xs font-bold uppercase">1% Flat Fee</span>
                    </div>
                    <div className="bg-on-primary/10 px-4 py-2 rounded-lg flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">lock</span>
                      <span className="text-xs font-bold uppercase">Buyer Protection</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-surface-container-low p-6 rounded-full border border-outline-variant/15">
                <h3 className="text-lg font-bold text-primary mb-6">Order Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-xl bg-white overflow-hidden flex-shrink-0">
                      <img className="w-full h-full object-cover" alt="Vintage Seamaster Watch" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhGZqBRrH3kZYkUzDjhqhWSzFWNQJqWWn2YnaEKGaxHORqJ-GXqFDtKT0BgbBTZ2tb7agxVfF5F6CLXdWej5uE_0ZdAYFJMVX0CDoZ7M47ny3SvZnm4Q5lpJsbVDohAY_Tv19YVjHW-hyb2iomGME8nAHOVCwkizhq-XYF1ELTxMERc4twoLxxQZsG1rYWXAGMI22nZ6haKI_Ivu2mU8SSBzs_utPHd9_6Ja0WcaTe3vX5OnxPL_-CnWu7ylQJ752hZBCaU5QUgHQ"/>
                    </div>
                    <div>
                      <p className="font-bold text-sm text-primary">Vintage Seamaster Watch</p>
                      <p className="text-xs text-on-surface-variant">Qty: 1</p>
                      <p className="font-bold text-primary mt-1">GHS 4,200.00</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-outline-variant/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Subtotal</span>
                    <span className="font-medium">GHS 4,200.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Shipping (Accra)</span>
                    <span className="font-medium">GHS 45.00</span>
                  </div>
                  <div className="flex justify-between text-sm text-tertiary">
                    <span className="flex items-center gap-1">Escrow Fee (1%) <span className="material-symbols-outlined text-xs">info</span></span>
                    <span className="font-bold">GHS 42.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-extrabold text-primary pt-2">
                    <span>Total</span>
                    <span>GHS 4,287.00</span>
                  </div>
                </div>
                <button className="w-full mt-8 bg-gradient-to-r from-primary to-primary-container text-on-primary py-4 rounded-full font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2">
                  <span>Proceed to Payment</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-on-surface-variant font-medium">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
                  Secure 256-bit SSL Encrypted Payment
                </div>
              </div>
              {/* Trust Indicators */}
              <div className="p-6 bg-tertiary-fixed/10 rounded-full border border-tertiary-fixed/20 flex items-start gap-4">
                <span className="material-symbols-outlined text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>gpp_good</span>
                <div>
                  <h4 className="text-sm font-bold text-tertiary-container">Verified Vendor Guarantee</h4>
                  <p className="text-xs text-tertiary-container/80 mt-1">This seller has completed over 150 successful escrow transactions this month.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer (Shared Component) */}
      <footer className="w-full px-8 md:px-24 grid grid-cols-1 md:grid-cols-4 gap-8 bg-slate-100 pt-12 pb-8 border-t border-slate-200">
        <div className="col-span-1 md:col-span-1">
          <span className="text-lg font-bold text-teal-900 mb-4 block">GhanaCurated</span>
          <p className="text-slate-500 text-sm leading-relaxed">The premier marketplace for authentic Ghanaian products and services, secured by elite standards.</p>
        </div>
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-widest font-bold text-teal-950 mb-4">Marketplace</h4>
          <a className="block text-sm text-slate-500 hover:text-teal-600 transition-colors" href="#">Trust & Safety</a>
          <a className="block text-sm text-slate-500 hover:text-teal-600 transition-colors" href="#">Buyer Protection</a>
          <a className="block text-sm text-slate-500 hover:text-teal-600 transition-colors" href="#">Seller Policy</a>
        </div>
        <div className="space-y-3">
          <h4 className="text-xs uppercase tracking-widest font-bold text-teal-950 mb-4">Support</h4>
          <a className="block text-sm text-slate-500 hover:text-teal-600 transition-colors" href="#">Contact Support</a>
          <a className="block text-sm text-slate-500 hover:text-teal-600 transition-colors" href="#">Privacy Hub</a>
          <a className="block text-sm text-slate-500 hover:text-teal-600 transition-colors" href="#">Terms of Service</a>
        </div>
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-bold text-teal-950 mb-4">Secure Network</h4>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-slate-400">lock</span>
            <span className="material-symbols-outlined text-slate-400">verified</span>
            <span className="material-symbols-outlined text-slate-400">credit_card</span>
          </div>
        </div>
        <div className="col-span-1 md:col-span-4 pt-8 mt-8 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest Inter">© 2024 GhanaCurated Marketplace. Secured by Editorial Standards.</p>
        </div>
      </footer>

      {/* Floating Security Badge (Contextual FAB) */}
      <div className="fixed bottom-8 right-8 z-40 md:hidden">
        <button className="w-16 h-16 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center scale-95 active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
        </button>
      </div>
    </div>
  );
};

export default CheckoutInterface;

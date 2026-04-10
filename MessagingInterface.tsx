import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const MessagingInterface: React.FC = () => {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Messaging & Negotiation | GhanaCurated";
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return (
    <div className="bg-surface text-on-surface antialiased overflow-hidden h-screen font-body">
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full flex flex-col items-center px-6 py-3 max-w-full mx-auto bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl z-50 shadow-sm">
        <div className="flex items-center justify-between w-full max-w-7xl">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-black text-teal-900 dark:text-teal-50 shadow-sm tracking-tight">GhanaCurated</Link>
            <nav className="hidden md:flex items-center gap-6">
              <Link className="text-slate-600 dark:text-slate-400 hover:text-teal-800 dark:hover:text-teal-200 transition-colors font-medium" to="/">Classifieds</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-teal-800 dark:hover:text-teal-200 transition-colors font-medium" to="/">Marketplace</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-teal-800 dark:hover:text-teal-200 transition-colors font-medium" to="/services">Services</Link>
              <Link className="text-slate-600 dark:text-slate-400 hover:text-teal-800 dark:hover:text-teal-200 transition-colors font-medium" to="/">Vendors</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <button className="material-symbols-outlined p-2 hover:bg-slate-50 rounded-lg transition-all">notifications</button>
            <button className="material-symbols-outlined p-2 hover:bg-slate-50 rounded-lg transition-all">favorite</button>
            <button className="bg-primary text-on-primary px-5 py-2 rounded-full font-semibold transition-transform active:scale-95">Post Ad</button>
            <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
              <img className="w-full h-full object-cover" alt="Close-up portrait of a professional African man" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlsxQWIBLPr-XOWMEpgi64ZwubRPhYOfE6w8H4ZKusbg65iNyQsjSiiJQ1p5WZExE7I7KRaoApH76cplvnejKgxGv0ZlSHvaNu7LE2XtvxKpXWL4pFrX5Kn1594lJC4-bIwv0ZfOOSgIKH7lVO3IfJCkJ67uQRxmwho2Fu2T262kqDJOFfZsksHbCqtgj_aS5-oMDo53m6ncfktRz50MsZh3jnXuxpoUsrUX9-659sx4yxM7r7xHrn9WTyWPDVPhSlMuiXZx1X_v8" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </header>

      <main className="pt-16 h-full flex flex-row">
        {/* Sidebar Navigation */}
        <aside className="hidden lg:flex flex-col fixed left-0 top-16 h-[calc(100vh-64px)] w-64 border-r border-outline-variant/15 bg-slate-50">
          <div className="p-6">
            <h3 className="text-xs uppercase tracking-widest font-bold text-outline mb-4">Categories</h3>
            <nav className="flex flex-col gap-1">
              <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:pl-6 transition-all duration-300" to="/">
                <span className="material-symbols-outlined">devices</span>
                <span className="font-medium">Electronics</span>
              </Link>
              <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:pl-6 transition-all duration-300" to="/">
                <span className="material-symbols-outlined">home</span>
                <span className="font-medium">Real Estate</span>
              </Link>
              <Link className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:pl-6 transition-all duration-300" to="/">
                <span className="material-symbols-outlined">directions_car</span>
                <span className="font-medium">Vehicles</span>
              </Link>
              <Link className="flex items-center gap-3 px-4 py-3 bg-teal-50 text-teal-900 rounded-r-full font-semibold border-l-4 border-teal-800" to="/messages">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
                <span className="font-medium">Messages</span>
              </Link>
            </nav>
          </div>
          <div className="mt-auto p-6 space-y-4">
            <div className="bg-secondary-container p-4 rounded-xl">
              <p className="text-xs font-bold text-on-secondary-fixed-variant uppercase tracking-tight">Pro Seller</p>
              <p className="text-sm font-medium mt-1">Start accepting payments securely.</p>
              <button className="mt-3 w-full bg-primary text-on-primary py-2 rounded-lg text-sm font-bold">Become a Seller</button>
            </div>
            <div className="flex items-center gap-3 text-outline text-sm">
              <span className="material-symbols-outlined">help</span>
              <span>Help Center</span>
            </div>
          </div>
        </aside>

        {/* Messaging Interface Container */}
        <div className="flex-1 lg:ml-64 flex overflow-hidden">
          {/* Chat List Panel */}
          <div className="w-full md:w-80 border-r border-outline-variant/15 flex flex-col bg-surface">
            <div className="p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-tight">Messages</h2>
              <button className="material-symbols-outlined text-primary">edit_square</button>
            </div>
            <div className="px-4 pb-4">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
                <input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20" placeholder="Search chats..." type="text"/>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {/* Active Chat */}
              <div className="px-4 py-4 flex gap-3 bg-surface-container-low cursor-pointer border-l-4 border-teal-800">
                <div className="relative shrink-0">
                  <img className="w-12 h-12 rounded-full object-cover" alt="Abena Osei" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzxfdUFl561bqkZS2sHpJ2BjV8rfmwNuXUDcjteTUOzrlrTGfHT5v-U4pQSCIn5jkPu0p1Bc9BnY-zCeYbB62BSVTgE40jeL-zI_vLjFBgXzLjUxEJvJUcfaosvu2DxFpWSuzLHbVLZLv3uc5MNp-k4Gv-xsMaFufi7Cd2dyO0JCvg-AlVUCNqxpmVGtXWdSkeFYvQ_19a16qVppMy5HjA_ICju758xYRGLo7aoW4xR03HF0ZEDVGpamBvp5OEQ_M3BYzJyhi4YCQ" referrerPolicy="no-referrer" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary-fixed border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-primary truncate">Abena Osei</h4>
                    <span className="text-[10px] text-outline font-medium">10:42 AM</span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate font-medium">Is the MacBook still available?</p>
                  <div className="mt-2 flex items-center gap-1">
                    <span className="text-[10px] bg-secondary-container/30 text-secondary px-2 py-0.5 rounded font-bold">OFFER PENDING</span>
                  </div>
                </div>
              </div>
              {/* Other Chat */}
              <div className="px-4 py-4 flex gap-3 hover:bg-surface-container-low/50 cursor-pointer transition-colors">
                <img className="w-12 h-12 rounded-full object-cover" alt="Kojo Mensah" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvHpYH5nQNfX0X35p_c-maQAqFA0LScR3zmrYOXnAXXn7BRGzzBHOKptDqYyypnu2S4Rdjvl2t0SvHc4BNS6_yjlC4i7v4X_ULUcwwMITxXP9B9l17FnrBmXUMcRVJs4G9_99OQFmBf2taKcYa7n9fodAznxBHBRic8Ix0V4Ku49kdg6DPl11JanjGsZpoPquwzgpKjvydtJa7FK3aJCYsAQ-I965Imrl2_2w79DfQtyrahfHwhqslk0kf4XPLGJa2JYryVkC0N-g" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-bold text-primary truncate">Kojo Mensah</h4>
                    <span className="text-[10px] text-outline font-medium">Yesterday</span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate">I can come for the pick up at 5 PM...</p>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Main Window */}
          <div className="hidden md:flex flex-1 flex-col bg-surface-container-lowest">
            {/* Chat Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-outline-variant/15">
              <div className="flex items-center gap-3">
                <img className="w-10 h-10 rounded-full object-cover" alt="Abena Osei" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlyMTBLActGPFLfp2Nup4oxeQXFnHnLqZDyftV4krSIocVQDfUf6wlkXl-xXMl1Njt2Stx_OnQ9sARKONKGTVqki3nM8B48lu0Pjtdm7lXLv79n4jplawFqttZVZRK7hsi3nPCxoGD-LaWc9nPmy0Jwws96Ogo9afGR69efGsOIHh6x_RMv74R2459HK25r_VRVI_yRl3uSffwWvSXU8dDXUvtS2-v9fK_ondWlvXZbSh0fpCAXeu541uCgugc30Au-92m1HmI0z8" referrerPolicy="no-referrer" />
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-primary">Abena Osei</h3>
                    <span className="material-symbols-outlined text-tertiary-fixed-dim text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  </div>
                  <p className="text-xs text-outline font-medium">Online • Response time: <span className="text-tertiary">~5 mins</span></p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline-variant/30 text-sm font-semibold hover:bg-surface-container-low transition-all">
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  View Listing
                </button>
                <button className="material-symbols-outlined p-2 text-outline">more_vert</button>
              </div>
            </div>

            {/* Chat Feed */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Listing Context Card */}
              <div className="max-w-md mx-auto bg-surface-container-low rounded-xl p-3 flex gap-4 border-l-4 border-primary">
                <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0">
                  <img className="w-full h-full object-cover" alt="MacBook Air" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMMBJfqRs5w39YfOX2S3SqBcStDjsZCEZwtQ4nNGn04PcJ2GTyxiT1CCPhSE72b4qLTvsPHWUBNk2iRxBeWgT6lUAV-1lnSzZ6QT5xQmv0aytlIrhWliP1Yfn1wM55FzsacecHwPq26AuxWIfhSCeNKKwIjSgC2FpZaF_to1K2tqD2CvK7JaFmv7H10eZtJRa0tN4xVgz6IttWD2JINJxRPiY9VypZAJaxtyk5XPZbO1XLBxnqK7q7WXY8vIHaAhXaD_H30CLQMi0" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-outline font-bold uppercase tracking-tight">Current Negotiation</p>
                  <h4 className="font-bold text-primary leading-tight mt-1">MacBook Air M2 - Space Gray (2022)</h4>
                  <p className="text-lg font-black text-primary mt-1">GH₵ 9,500</p>
                </div>
              </div>

              {/* Date Separator */}
              <div className="flex justify-center">
                <span className="px-4 py-1 bg-surface-container-high rounded-full text-[10px] font-bold text-outline uppercase tracking-widest">Today</span>
              </div>

              {/* Safety Warning */}
              <div className="max-w-lg mx-auto bg-error-container/20 p-4 rounded-xl border border-error/10 flex gap-3">
                <span className="material-symbols-outlined text-error">shield</span>
                <div>
                  <p className="text-xs font-bold text-error">STAY SAFE ON GHANACURATED</p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Never pay outside the platform. Use our Escrow service for guaranteed buyer protection. <a className="underline font-bold" href="#">Learn more</a></p>
                </div>
              </div>

              {/* Message Bubbles */}
              <div className="flex flex-col gap-4">
                {/* Buyer Message */}
                <div className="flex justify-end">
                  <div className="max-w-[70%] bg-primary text-on-primary p-4 rounded-2xl rounded-tr-none shadow-sm">
                    <p className="text-sm leading-relaxed">Hello Abena! I saw your listing for the MacBook. Is the price negotiable? I'm very interested.</p>
                    <p className="text-[10px] text-on-primary/60 mt-1 text-right">09:15 AM</p>
                  </div>
                </div>
                {/* Seller Message */}
                <div className="flex justify-start">
                  <div className="max-w-[70%] bg-surface-container-high p-4 rounded-2xl rounded-tl-none">
                    <p className="text-sm text-primary leading-relaxed">Hi there! Yes, I can consider a small discount for a quick sale. What was your offer in mind?</p>
                    <p className="text-[10px] text-outline mt-1">10:02 AM</p>
                  </div>
                </div>
                {/* System Prompt: Offer */}
                <div className="flex justify-center my-4">
                  <div className="bg-white border-2 border-dashed border-outline-variant/30 p-6 rounded-2xl max-w-sm text-center shadow-lg">
                    <span className="material-symbols-outlined text-4xl text-secondary mb-2">request_quote</span>
                    <h5 className="font-bold text-primary">Make an Official Offer</h5>
                    <p className="text-xs text-on-surface-variant mt-2 mb-4">Official offers are legally binding on our platform and secure the item for 24 hours.</p>
                    <div className="flex gap-2">
                      <button className="flex-1 bg-secondary-container text-on-secondary-container py-2.5 rounded-lg text-sm font-black shadow-sm active:scale-95 transition-transform">SEND OFFER</button>
                    </div>
                  </div>
                </div>
                {/* Buyer Message */}
                <div className="flex justify-end">
                  <div className="max-w-[70%] bg-primary text-on-primary p-4 rounded-2xl rounded-tr-none shadow-sm">
                    <p className="text-sm leading-relaxed">Would you accept GH₵ 8,800? I can start the Escrow payment immediately.</p>
                    <p className="text-[10px] text-on-primary/60 mt-1 text-right">10:42 AM</p>
                  </div>
                </div>
                {/* System Prompt: Escrow */}
                <div className="flex justify-center my-4">
                  <div className="bg-teal-900 text-white p-5 rounded-2xl max-w-sm w-full shadow-xl relative overflow-hidden">
                    <div className="absolute -right-4 -bottom-4 opacity-10">
                      <span className="material-symbols-outlined text-8xl">lock</span>
                    </div>
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
                        <span className="text-[10px] font-black uppercase tracking-widest">Escrow Secure Pay</span>
                      </div>
                      <p className="text-sm font-medium mb-4">The seller has pre-approved your negotiation range. Ready to secure the deal?</p>
                      <button className="w-full bg-tertiary-fixed text-on-tertiary-fixed py-3 rounded-xl font-bold text-sm tracking-tight flex items-center justify-center gap-2 active:scale-95 transition-transform">
                        START ESCROW PAYMENT
                        <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-outline-variant/15 bg-white">
              <div className="flex items-end gap-3 bg-surface-container-low p-2 rounded-2xl">
                <div className="flex flex-col gap-2">
                  <button className="material-symbols-outlined p-2 text-primary hover:bg-white rounded-lg transition-all">add_circle</button>
                </div>
                <textarea className="flex-1 bg-transparent border-none focus:ring-0 text-sm resize-none py-2 max-h-32 outline-none" placeholder="Type a message..." rows={1}></textarea>
                <div className="flex gap-1">
                  <button className="material-symbols-outlined p-2 text-outline hover:text-primary transition-all">mood</button>
                  <button className="bg-primary text-on-primary w-10 h-10 rounded-xl flex items-center justify-center transition-transform active:scale-90">
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                  </button>
                </div>
              </div>
              <div className="mt-4 flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                <button className="shrink-0 flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full text-xs font-bold text-primary hover:bg-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-xs">image</span>
                  Send Photos
                </button>
                <button className="shrink-0 flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full text-xs font-bold text-primary hover:bg-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-xs">location_on</span>
                  Share Location
                </button>
                <button className="shrink-0 flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full text-xs font-bold text-primary hover:bg-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-xs">gavel</span>
                  Counter Offer
                </button>
              </div>
            </div>
          </div>

          {/* Empty State for Mobile/Small Screens */}
          <div className="md:hidden flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
            <div className="w-20 h-20 bg-surface-container-high rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-outline">chat_bubble</span>
            </div>
            <h3 className="text-xl font-bold text-primary">Select a conversation</h3>
            <p className="text-sm text-outline">Manage your negotiations and securely close deals directly from the chat.</p>
          </div>
        </div>
      </main>

      {/* Contextual FAB for New Conversation */}
      <button className="fixed bottom-24 right-8 w-14 h-14 bg-primary text-on-primary rounded-full shadow-2xl flex items-center justify-center lg:hidden active:scale-90 transition-transform z-[60]">
        <span className="material-symbols-outlined text-2xl">chat</span>
      </button>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-100 flex items-center justify-around py-2 px-4 z-50 shadow-2xl">
        <Link to="/" className="flex flex-col items-center gap-1 text-slate-400">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px]">Home</span>
        </Link>
        <Link to="/messages" className="flex flex-col items-center gap-1 text-teal-700 font-bold">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
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

export default MessagingInterface;

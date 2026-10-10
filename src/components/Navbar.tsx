import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, Sun, Menu, X, Calendar, MessageSquare } from 'lucide-react';

interface Props {
  onOpenChat: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<Props> = ({ onOpenChat, onNavigateSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Discovery', id: 'hero' },
    { label: 'Destinations', id: 'destinations' },
    { label: 'AI Itinerary', id: 'itinerary' },
    { label: 'Food & Guide', id: 'guide' },
  ];

  const handleNavClick = (id: string) => {
    onNavigateSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-stone-900/90 backdrop-blur-md border-b border-stone-800 text-stone-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white font-serif">
                WanderAI
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                Penang
              </span>
            </div>
            <p className="text-[11px] text-stone-400 hidden sm:block">Smart Travel Concierge</p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="hover:text-amber-400 transition-colors cursor-pointer py-1 text-sm tracking-wide"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Quick Weather & CTA Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Quick weather pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-800/80 border border-stone-700/60 text-xs text-stone-300">
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>George Town 29°C</span>
            <span className="text-stone-500">·</span>
            <span className="text-amber-400/90 font-medium">Breezy</span>
          </div>

          {/* AI Assistant button */}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold transition-all hover:scale-[1.02] cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Assistant</span>
          </button>

          {/* Plan Trip CTA button */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-stone-950" />
            <span>Plan My Trip</span>
          </button>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenChat}
            className="p-2 rounded-xl bg-stone-800 text-amber-400 border border-stone-700"
            aria-label="Open AI Assistant"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-stone-800 text-stone-200 border border-stone-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-950/95 border-b border-stone-800 px-4 pt-3 pb-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-400 pb-2 border-b border-stone-800">
            <span>Destination: Penang, Malaysia</span>
            <span className="text-amber-400">29°C Tropical</span>
          </div>

          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left px-3 py-2 rounded-lg text-sm font-medium text-stone-200 hover:bg-stone-800/80 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenChat();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-800 text-stone-200 text-xs font-semibold"
            >
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>Open AI Travel Concierge</span>
            </button>
            <button
              onClick={() => handleNavClick('hero')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate Custom Itinerary</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

import React, { useState, useEffect } from 'react';
import { Utensils, Calendar, MapPin, Star, ShieldCheck, Menu as MenuIcon, X, Phone, Clock } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/initialData';

interface NavbarProps {
  onOpenReservation: () => void;
  isAdminOpen: boolean;
  onToggleAdmin: () => void;
  activeSection: string;
  reservationCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  isAdminOpen,
  onToggleAdmin,
  activeSection,
  reservationCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'About & Heritage', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 w-full max-w-full overflow-x-clip transition-all duration-300 ${
        isScrolled
          ? 'bg-[#141312]/95 backdrop-blur-md border-b border-[#2C2720] shadow-xl py-2.5 sm:py-3'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-3 sm:py-5'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <a href="#overview" className="flex items-center gap-2 sm:gap-3 group shrink min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#D4A359]/60 bg-[#1F1C18] flex items-center justify-center text-[#D4A359] shadow-inner group-hover:border-[#D4A359] transition-colors shrink-0">
            <span className="font-serif-heading font-bold text-sm sm:text-lg">M</span>
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="font-serif-heading text-sm sm:text-lg lg:text-xl font-bold tracking-wider text-[#F7F4EB] group-hover:text-[#D4A359] transition-colors truncate">
                MUSEUM PUB
              </span>
              <span className="hidden xl:inline-block text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-[#D4A359]/20 text-[#D4A359] border border-[#D4A359]/30 whitespace-nowrap">
                Hamam 18th C.
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-[#A89F91] tracking-wide truncate hidden xs:block">
              Mitrovica · Restaurant & Craft Bar
            </span>
          </div>
        </a>

        {/* Desktop Navigation (Visible on lg screens 1024px+) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition-colors hover:text-[#D4A359] relative py-1 whitespace-nowrap ${
                activeSection === link.href.substring(1)
                  ? 'text-[#D4A359] font-semibold'
                  : 'text-[#D2C9BD]'
              }`}
            >
              {link.name}
              {activeSection === link.href.substring(1) && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4A359] rounded-full" />
              )}
            </a>
          ))}
        </nav>

        {/* Action Controls & Navigation Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Admin Dashboard Switch */}
          <button
            id="btn-admin-toggle"
            onClick={onToggleAdmin}
            className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-medium rounded-lg border transition-all shrink-0 ${
              isAdminOpen
                ? 'bg-[#D4A359] text-black border-[#D4A359] font-semibold shadow-md'
                : 'bg-[#1E1B17] text-[#C4BCB0] border-[#383228] hover:border-[#D4A359]/50 hover:text-white'
            }`}
            title="Switch to Restaurant Booking Management"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4A359] shrink-0" />
            <span className="text-[11px] sm:text-xs">Admin</span>
            {reservationCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] sm:text-[10px] bg-[#2A241D] text-[#D4A359] border border-[#D4A359]/40 font-bold">
                {reservationCount}
              </span>
            )}
          </button>

          {/* Book Table CTA: Hidden on tiny mobile screens to avoid pushing header off-screen, visible on sm+ (tablets/desktops) */}
          <button
            id="btn-nav-reserve"
            onClick={onOpenReservation}
            className="hidden sm:flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#C59341] to-[#D4A359] text-[#121110] font-semibold text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all shrink-0 whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Reserve Table</span>
          </button>

          {/* Mobile & Tablet Drawer Menu Button (Visible on screens < lg) */}
          <button
            id="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 sm:p-2 text-[#ECE7DE] hover:text-[#D4A359] rounded-lg bg-[#1E1B17] border border-[#383228] lg:hidden shrink-0 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#141312] border-b border-[#2C2720] px-4 pt-3 pb-6 space-y-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md bg-[#1C1A17] text-sm text-[#D8D1C5] hover:text-[#D4A359] hover:bg-[#25221E] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-[#2C2720] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#C59341] to-[#D4A359] text-black font-semibold text-center flex items-center justify-center gap-2 shadow"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>

            <div className="flex items-center justify-between text-xs text-[#9E9587] pt-2 px-1">
              <a href={`tel:${RESTAURANT_INFO.phone}`} className="flex items-center gap-1.5 text-[#D4A359]">
                <Phone className="w-3.5 h-3.5" />
                <span>{RESTAURANT_INFO.phone}</span>
              </a>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#A69D8F]" />
                <span>Opens 8 AM Thu</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

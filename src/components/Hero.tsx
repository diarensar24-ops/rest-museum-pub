import React, { useState } from 'react';
import { Star, MapPin, Phone, Clock, Share2, Bookmark, Navigation, Coffee, Utensils, Beer, CheckCircle2 } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/initialData';

interface HeroProps {
  onOpenReservation: () => void;
  onScrollToMenu: () => void;
  onScrollToLocation: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenReservation,
  onScrollToMenu,
  onScrollToLocation
}) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Restaurant Museum Pub - Mitrovica',
        text: 'Historic Turkish bath gastropub in Mitrovica with famous macchiato & craft beer!',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  return (
    <section id="overview" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with layered atmospheric gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=2000&q=80"
          alt="Restaurant Museum Pub Ambient Vaulted Interior"
          className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.1] scale-105 transform animate-pulse-slow"
        />
        {/* Rich dark vignette overlay matching historic stone bath atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#11100F] via-[#11100F]/65 to-black/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#11100F]/40 to-[#11100F]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Reputation Badge */}
          <div className="inline-flex flex-wrap items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1F1C18]/90 border border-[#D4A359]/40 backdrop-blur-md text-xs sm:text-sm shadow-xl">
            <div className="flex items-center text-[#F5B83D] font-bold gap-1">
              <Star className="w-4 h-4 fill-[#F5B83D]" />
              <span>4.6</span>
            </div>
            <span className="text-[#8E8678]">•</span>
            <span className="text-[#D8D2C5] font-medium">43 Google Reviews</span>
            <span className="text-[#8E8678]">•</span>
            <span className="text-[#D4A359] font-medium flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Historic Turkish Bath (Hamam)
            </span>
          </div>

          {/* Main Title */}
          <div className="space-y-2">
            <h1 className="font-serif-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F7F4EB] leading-[1.1]">
              Restaurant <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A359] via-[#E4BE7A] to-[#D4A359]">
                Museum Pub
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-[#C9BFB0] font-light max-w-2xl leading-relaxed pt-2">
              Where centuries of Ottoman stone vault architecture harmonize with modern European craft pub culture. Famous for silky Kosovo macchiato, handmade pierogi, Balkan grills, and chilled tap beers.
            </p>
          </div>

          {/* Quick Info Tags */}
          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#B5ABA0] pt-1">
            <div className="flex items-center gap-1.5 bg-[#1C1A17]/80 px-3 py-1.5 rounded-lg border border-[#2E2A24]">
              <MapPin className="w-3.5 h-3.5 text-[#D4A359]" />
              <span>Rruga Shemsi Ahmeti, Mitrovica e Veriut</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#1C1A17]/80 px-3 py-1.5 rounded-lg border border-[#2E2A24]">
              <Clock className="w-3.5 h-3.5 text-[#D4A359]" />
              <span>Closed · Opens 8 AM Thu</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#2A241D] text-[#D4A359] border border-[#D4A359]/30 text-xs font-semibold">
                Dine-in
              </span>
              <span className="px-2 py-0.5 rounded bg-[#2A241D] text-[#D4A359] border border-[#D4A359]/30 text-xs font-semibold">
                Delivery
              </span>
            </div>
          </div>

          {/* Primary Call to Actions */}
          <div className="flex flex-wrap items-center gap-3.5 pt-4">
            <button
              id="hero-reserve-btn"
              onClick={onOpenReservation}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#C59341] via-[#D4A359] to-[#DFB46C] text-[#121110] font-bold text-base shadow-xl shadow-[#C59341]/20 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Utensils className="w-5 h-5 text-black" />
              <span>Reserve a Table</span>
            </button>

            <button
              id="hero-menu-btn"
              onClick={onScrollToMenu}
              className="px-6 py-3.5 rounded-xl bg-[#1C1A17]/90 hover:bg-[#28241F] text-[#EDE8DF] font-semibold text-base border border-[#3D372D] hover:border-[#D4A359]/60 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Coffee className="w-5 h-5 text-[#D4A359]" />
              <span>Interactive Menu</span>
            </button>

            <button
              id="hero-directions-btn"
              onClick={onScrollToLocation}
              className="px-4 py-3.5 rounded-xl bg-[#1A1815]/70 hover:bg-[#23201C] text-[#C4BCB0] hover:text-white border border-[#332D24] text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Navigation className="w-4 h-4 text-[#D4A359]" />
              <span>Directions</span>
            </button>
          </div>

          {/* Google Maps Actions Bar (Directions, Save, Share, Phone) */}
          <div className="pt-6 border-t border-[#2B2721] flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href="https://maps.google.com/?q=VVQC+68+Mitrovica"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#181614] border border-[#2F2B23] text-xs sm:text-sm text-[#C8C0B2] hover:text-[#D4A359] hover:border-[#D4A359]/40 transition-all"
            >
              <Navigation className="w-3.5 h-3.5 text-[#D4A359]" />
              <span>Directions</span>
            </a>

            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs sm:text-sm transition-all ${
                saved
                  ? 'bg-[#D4A359]/20 text-[#D4A359] border-[#D4A359]/50'
                  : 'bg-[#181614] border-[#2F2B23] text-[#C8C0B2] hover:text-white'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-[#D4A359]' : ''}`} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#181614] border border-[#2F2B23] text-xs sm:text-sm text-[#C8C0B2] hover:text-white transition-all"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#D4A359]" />
                  <span>Share</span>
                </>
              )}
            </button>

            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#181614] border border-[#2F2B23] text-xs sm:text-sm text-[#C8C0B2] hover:text-[#D4A359] transition-all ml-auto"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4A359]" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Landmark, MapPin, Phone, Clock, Heart, ShieldCheck, ExternalLink } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/initialData';

interface FooterProps {
  onOpenReservation: () => void;
  onToggleAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation, onToggleAdmin }) => {
  return (
    <footer className="bg-[#0C0B0A] text-[#EDE7DE] border-t border-[#24201A] pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#211E18]">
          {/* Col 1: Brand & Heritage */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4A359]/60 bg-[#1A1815] flex items-center justify-center text-[#D4A359]">
                <span className="font-serif-heading font-bold text-lg">M</span>
              </div>
              <span className="font-serif-heading text-lg font-bold text-[#F7F4EB]">
                Restaurant Museum Pub
              </span>
            </div>
            <p className="text-xs text-[#9E9587] leading-relaxed">
              Situated in an ancient Ottoman Turkish bath (hamam) monument in Mitrovica. Combining cultural conservation with authentic hospitality, Balkan grills, handmade pierogi, and specialty espresso.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-[#D4A359]">
              <Landmark className="w-4 h-4" />
              <span>Preserving Cultural Heritage</span>
            </div>
          </div>

          {/* Col 2: Hours */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-[#F7F4EB] uppercase tracking-wider">
              Operating Hours
            </h4>
            <div className="space-y-2 text-xs text-[#A89F90]">
              <div className="flex justify-between pb-1 border-b border-[#1E1B16]">
                <span>Monday - Thursday</span>
                <span className="text-[#EDE8DF] font-mono">8:00 AM - 12:00 AM</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-[#1E1B16]">
                <span>Friday - Saturday</span>
                <span className="text-[#EDE8DF] font-mono">8:00 AM - 1:00 AM</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-[#1E1B16]">
                <span>Sunday</span>
                <span className="text-[#EDE8DF] font-mono">9:00 AM - 11:30 PM</span>
              </div>
              <p className="text-[11px] text-[#F2C069] pt-1">
                Breakfast & Macchiato starts daily from 8:00 AM
              </p>
            </div>
          </div>

          {/* Col 3: Location & Contact */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-[#F7F4EB] uppercase tracking-wider">
              Find & Contact Us
            </h4>
            <div className="space-y-2.5 text-xs text-[#A89F90]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4A359] shrink-0 mt-0.5" />
                <span>
                  {RESTAURANT_INFO.address}
                  <br />
                  <span className="text-[11px] text-[#787165]">Plus Code: {RESTAURANT_INFO.plusCode}</span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4A359] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#D4A359] transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenReservation}
                  className="px-4 py-2 rounded-lg bg-[#221E19] border border-[#3A3327] hover:border-[#D4A359] text-xs font-bold text-[#D4A359] transition-all"
                >
                  Reserve Table Online
                </button>
              </div>
            </div>
          </div>

          {/* Col 4: Quick Links & Admin */}
          <div className="space-y-3">
            <h4 className="font-serif-heading text-sm font-bold text-[#F7F4EB] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs text-[#9E9587]">
              <li><a href="#overview" className="hover:text-[#D4A359] transition-colors">Overview</a></li>
              <li><a href="#about" className="hover:text-[#D4A359] transition-colors">Ottoman Bath History</a></li>
              <li><a href="#menu" className="hover:text-[#D4A359] transition-colors">Interactive Menu</a></li>
              <li><a href="#reviews" className="hover:text-[#D4A359] transition-colors">Guest Reviews (4.6★)</a></li>
              <li><a href="#location" className="hover:text-[#D4A359] transition-colors">Location & Directions</a></li>
              <li className="pt-2">
                <button
                  onClick={onToggleAdmin}
                  className="flex items-center gap-1.5 text-[#D4A359] hover:underline text-xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Booking Portal</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A7264]">
          <p>© {new Date().getFullYear()} Restaurant Museum Pub · Mitrovica, Kosovo. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Dine-in · Takeaway · Delivery
            </span>
            <span>•</span>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#D4A359] flex items-center gap-1"
            >
              <span>Facebook</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

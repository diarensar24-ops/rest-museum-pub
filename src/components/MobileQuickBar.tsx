import React from 'react';
import { Calendar, Utensils, Phone, MapPin, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/initialData';

interface MobileQuickBarProps {
  onOpenReservation: () => void;
  onToggleAdmin: () => void;
  isAdminOpen: boolean;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  onOpenReservation,
  onToggleAdmin,
  isAdminOpen
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#151311]/95 backdrop-blur-md border-t border-[#2C2720] px-3 py-2 flex items-center justify-around shadow-2xl">
      <a
        href="#menu"
        className="flex flex-col items-center gap-1 text-[10px] text-[#A89F90] hover:text-[#D4A359] py-1 px-2"
      >
        <Utensils className="w-4 h-4" />
        <span>Menu</span>
      </a>

      <a
        href="#location"
        className="flex flex-col items-center gap-1 text-[10px] text-[#A89F90] hover:text-[#D4A359] py-1 px-2"
      >
        <MapPin className="w-4 h-4" />
        <span>Location</span>
      </a>

      {/* Main Reservation CTA */}
      <button
        onClick={onOpenReservation}
        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#C59341] to-[#D4A359] text-black font-bold text-xs shadow-lg shadow-[#C59341]/30 active:scale-95 transition-transform"
      >
        <Calendar className="w-4 h-4" />
        <span>Reserve</span>
      </button>

      <a
        href={`tel:${RESTAURANT_INFO.phone}`}
        className="flex flex-col items-center gap-1 text-[10px] text-[#A89F90] hover:text-[#D4A359] py-1 px-2"
      >
        <Phone className="w-4 h-4" />
        <span>Call</span>
      </a>

      <button
        onClick={onToggleAdmin}
        className={`flex flex-col items-center gap-1 text-[10px] py-1 px-2 transition-colors ${
          isAdminOpen ? 'text-[#D4A359]' : 'text-[#A89F90]'
        }`}
      >
        <ShieldCheck className="w-4 h-4" />
        <span>Admin</span>
      </button>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Info, 
  Phone, 
  Mail, 
  User, 
  Utensils, 
  FileText,
  CalendarPlus,
  Share2
} from 'lucide-react';
import { Reservation, SeatingArea } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReservation: (reservation: Omit<Reservation, 'id' | 'createdAt' | 'status' | 'referenceNumber'>) => Reservation;
  preOrderedItems: { itemId: string; name: string; quantity: number; price: number }[];
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onSubmitReservation,
  preOrderedItems
}) => {
  // Form State
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  
  // Default date to today formatted YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(todayStr);
  const [time, setTime] = useState('19:30');
  const [seatingArea, setSeatingArea] = useState<SeatingArea>('stone-vault');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  if (!isOpen) return null;

  const timeSlots = [
    '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', 
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00'
  ];

  const seatingOptions: { id: SeatingArea; label: string; desc: string; vibe: string }[] = [
    {
      id: 'stone-vault',
      label: 'Ancient Turkish Bath Vault',
      desc: 'Inside the historic Ottoman hamam dome with exposed stone arches',
      vibe: 'Atmospheric & Romantic'
    },
    {
      id: 'pub-bar',
      label: 'Heritage Pub & Taps',
      desc: 'High wooden tables near the craft beer and Italian espresso bar',
      vibe: 'Lively & Social'
    },
    {
      id: 'historic-terrace',
      label: 'Cobblestone Terrace',
      desc: 'Outdoor seating overlooking the old street of Shemsi Ahmeti',
      vibe: 'Fresh Air & Casual'
    },
    {
      id: 'museum-mezzanine',
      label: 'Museum Mezzanine',
      desc: 'Elevated intimate balcony with views of antique artifacts',
      vibe: 'Quiet & Exclusive'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName || !guestPhone) return;

    const calculatedFinalPrice = preOrderedItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

    const newRes = onSubmitReservation({
      customerName: guestName,
      customerEmail: guestEmail || `${guestName.toLowerCase().replace(/\s+/g, '.')}@guest.com`,
      customerPhone: guestPhone,
      guests: guestsCount,
      date,
      time,
      seatingArea,
      specialRequests,
      preOrderedItems: preOrderedItems.length > 0 ? preOrderedItems : undefined,
      finalPrice: preOrderedItems.length > 0 ? calculatedFinalPrice : undefined
    });

    setConfirmedBooking(newRes);
  };

  const handleCopyRef = () => {
    if (confirmedBooking) {
      navigator.clipboard.writeText(confirmedBooking.referenceNumber);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  const handleDownloadICS = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Restaurant Museum Pub//Mitrovica//EN
BEGIN:VEVENT
SUMMARY:Table Reservation - Restaurant Museum Pub
DESCRIPTION:Booking Ref: ${confirmedBooking.referenceNumber} for ${confirmedBooking.guests} guests in ${confirmedBooking.seatingArea}. Phone: +386 4 929 97 66
LOCATION:Rruga Shemsi Ahmeti, Mitrovica e Veriut 40000 (VVQC+68)
DTSTART:${confirmedBooking.date.replace(/-/g, '')}T${confirmedBooking.time.replace(':', '')}00Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `reservation-${confirmedBooking.referenceNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetForm = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#171513] border border-[#383126] rounded-2xl max-w-2xl w-full my-8 overflow-hidden shadow-2xl relative text-[#ECE7DE]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-[#2C261F] flex items-center justify-between bg-[#1C1916]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4A359]/20 border border-[#D4A359]/40 flex items-center justify-center text-[#D4A359]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-heading text-xl font-bold text-[#F7F4EB]">
                {confirmedBooking ? 'Reservation Confirmed' : 'Table Reservation'}
              </h3>
              <p className="text-xs text-[#9E9587]">
                {confirmedBooking ? 'Your table is secured at Restaurant Museum Pub' : 'Experience dining within an 18th-century Ottoman Turkish bath'}
              </p>
            </div>
          </div>

          <button
            onClick={resetForm}
            className="w-8 h-8 rounded-lg bg-[#26221D] hover:bg-[#332D26] text-[#A89F91] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {confirmedBooking ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#D4A359] font-bold">
                Booking Reference
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="font-serif-heading text-3xl sm:text-4xl font-bold text-white tracking-wider">
                  {confirmedBooking.referenceNumber}
                </span>
                <button
                  onClick={handleCopyRef}
                  className="px-2.5 py-1 rounded bg-[#24201A] border border-[#3A3226] text-xs text-[#D4A359] hover:bg-[#302B21]"
                >
                  {copiedRef ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Booking Summary Card */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#1F1C18] border border-[#332C22] text-left space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3 border-b border-[#2D271F] pb-3">
                <div>
                  <span className="text-[#8E8677] block text-[11px]">Guest Name</span>
                  <strong className="text-[#EDE8DF] font-medium">{confirmedBooking.customerName}</strong>
                </div>
                <div>
                  <span className="text-[#8E8677] block text-[11px]">Party Size</span>
                  <strong className="text-[#EDE8DF] font-medium">{confirmedBooking.guests} Guests</strong>
                </div>
                <div>
                  <span className="text-[#8E8677] block text-[11px]">Date & Time</span>
                  <strong className="text-[#F2C069] font-medium">
                    {confirmedBooking.date} at {confirmedBooking.time}
                  </strong>
                </div>
                <div>
                  <span className="text-[#8E8677] block text-[11px]">Seating Area</span>
                  <strong className="text-[#EDE8DF] font-medium capitalize">
                    {confirmedBooking.seatingArea.replace('-', ' ')}
                  </strong>
                </div>
              </div>

              {confirmedBooking.specialRequests && (
                <div className="pt-1">
                  <span className="text-[#8E8677] block text-[11px]">Special Requests</span>
                  <p className="text-[#C4BCB0] italic text-xs">{confirmedBooking.specialRequests}</p>
                </div>
              )}

              {confirmedBooking.preOrderedItems && confirmedBooking.preOrderedItems.length > 0 && (
                <div className="pt-2 border-t border-[#2D271F] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8E8677] block text-[11px] uppercase tracking-wider font-semibold">Pre-Ordered Menu Courses</span>
                    <span className="text-[#D4A359] text-xs font-bold">Final Price: €{(confirmedBooking.finalPrice || confirmedBooking.preOrderedItems.reduce((a, c) => a + c.price * c.quantity, 0)).toFixed(2)}</span>
                  </div>
                  <div className="space-y-1 bg-[#151311] p-2 rounded-lg border border-[#2B251E]">
                    {confirmedBooking.preOrderedItems.map((item) => (
                      <div key={item.itemId} className="flex justify-between text-xs text-[#C4BCB0]">
                        <span><strong className="text-[#D4A359]">{item.quantity}x</strong> {item.name}</span>
                        <span className="font-mono text-[#F2C069]">€{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notification Notice */}
            <div className="p-3.5 rounded-xl bg-[#231F19] border border-[#3B3327] text-xs text-[#A89F90] flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D4A359]" />
              <span>SMS confirmation has been dispatched to <strong>{confirmedBooking.customerPhone}</strong></span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handleDownloadICS}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25211B] border border-[#3D362B] hover:border-[#D4A359] text-xs sm:text-sm text-[#EDE8DF] font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <CalendarPlus className="w-4 h-4 text-[#D4A359]" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={resetForm}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#C59341] to-[#D4A359] text-black font-bold text-xs sm:text-sm shadow hover:brightness-110 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 max-h-[78vh] overflow-y-auto">
            {/* Quick Guest Count Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89F90] mb-2">
                Number of Guests
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuestsCount(num)}
                    className={`w-10 h-10 rounded-xl font-bold text-sm shrink-0 transition-all ${
                      guestsCount === num
                        ? 'bg-[#D4A359] text-black shadow-md scale-105'
                        : 'bg-[#1F1C18] text-[#B8AF9F] border border-[#302A21] hover:border-[#D4A359]/50 hover:text-white'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Date and Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89F90] mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D4A359]" />
                  <span>Reservation Date</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-sm text-[#EDE7DE] focus:border-[#D4A359] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89F90] mb-2 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D4A359]" />
                  <span>Preferred Time Slot</span>
                </label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-sm text-[#EDE7DE] focus:border-[#D4A359] focus:outline-none"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot} {parseInt(slot.split(':')[0]) >= 17 ? '(Dinner & Pub)' : '(Lunch & Coffee)'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Seating Atmosphere Picker */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89F90] mb-2">
                Atmosphere & Seating Area
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {seatingOptions.map((opt) => (
                  <div
                    key={opt.id}
                    onClick={() => setSeatingArea(opt.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all ${
                      seatingArea === opt.id
                        ? 'bg-[#26211A] border-[#D4A359] shadow-md'
                        : 'bg-[#181614] border-[#2D271F] hover:border-[#40382B]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#EDE8DF]">{opt.label}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#1C1916] text-[#D4A359] border border-[#D4A359]/30">
                        {opt.vibe}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A49B8E] leading-tight">{opt.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-1">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89F90]">
                Contact Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F776B]" />
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-sm text-[#EDE7DE] focus:border-[#D4A359] focus:outline-none placeholder-[#766E62]"
                  />
                </div>

                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F776B]" />
                  <input
                    type="tel"
                    required
                    placeholder="Phone (e.g. +386 / +383) *"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-sm text-[#EDE7DE] focus:border-[#D4A359] focus:outline-none placeholder-[#766E62]"
                  />
                </div>
              </div>

              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F776B]" />
                <input
                  type="email"
                  placeholder="Email Address (for instant confirmation & receipt)"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-sm text-[#EDE7DE] focus:border-[#D4A359] focus:outline-none placeholder-[#766E62]"
                />
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89F90] mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#D4A359]" />
                <span>Special Requests / Dietary Notes</span>
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Vegan wrap adjustments, celebration anniversary, quiet corner..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#121110] border border-[#332D24] text-xs sm:text-sm text-[#EDE7DE] focus:border-[#D4A359] focus:outline-none placeholder-[#766E62]"
              />
            </div>

            {/* Pre-ordered items attachment notice */}
            {preOrderedItems.length > 0 && (
              <div className="p-3.5 rounded-xl bg-[#221E18] border border-[#D4A359]/30 text-xs text-[#D8D1C5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-[#D4A359]" />
                  <span>
                    <strong>{preOrderedItems.length} courses</strong> from your Pre-Order Tray will be prepared!
                  </span>
                </div>
                <span className="font-bold text-[#F2C069]">
                  €{preOrderedItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}
                </span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C59341] via-[#D4A359] to-[#DFB46C] text-[#11100F] font-bold text-sm sm:text-base shadow-xl shadow-[#C59341]/20 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm & Reserve Table</span>
              </button>
              <p className="text-[11px] text-[#7F776B] text-center mt-2">
                Instant confirmation · No booking fee · Cancellation up to 1 hour before arrival
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

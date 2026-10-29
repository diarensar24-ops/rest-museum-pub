import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  CheckCircle2, 
  Phone, 
  User, 
  Utensils, 
  MapPin, 
  CreditCard, 
  Clock, 
  FileText,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { OrderItem, CustomerOrder } from '../types';

interface OrderCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  finalPrice: number;
  onSubmitOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail?: string;
    orderType: 'dine-in' | 'pickup' | 'delivery';
    tableNumber?: string;
    specialInstructions?: string;
    items: OrderItem[];
    finalPrice: number;
  }) => CustomerOrder;
  onOpenAdmin: () => void;
}

export const OrderCheckoutModal: React.FC<OrderCheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  finalPrice,
  onSubmitOrder,
  onOpenAdmin
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderType, setOrderType] = useState<'dine-in' | 'pickup' | 'delivery'>('dine-in');
  const [tableNumber, setTableNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'counter' | 'card'>('counter');
  const [confirmedOrder, setConfirmedOrder] = useState<CustomerOrder | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || items.length === 0) return;

    const newOrder = onSubmitOrder({
      customerName,
      customerPhone,
      customerEmail,
      orderType,
      tableNumber: orderType === 'dine-in' ? tableNumber || 'Bar / Table' : undefined,
      specialInstructions,
      items,
      finalPrice
    });

    setConfirmedOrder(newOrder);
  };

  const handleClose = () => {
    setConfirmedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#171513] border border-[#383126] rounded-2xl max-w-xl w-full my-6 overflow-hidden shadow-2xl relative text-[#ECE7DE]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#2C261F] flex items-center justify-between bg-[#1C1916]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4A359]/20 border border-[#D4A359]/40 flex items-center justify-center text-[#D4A359]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-heading text-lg sm:text-xl font-bold text-[#F7F4EB]">
                {confirmedOrder ? 'Order Confirmed!' : 'Complete Menu Order'}
              </h3>
              <p className="text-xs text-[#9E9587]">
                {confirmedOrder
                  ? 'Your order was sent directly to the kitchen & admin console'
                  : 'Freshly prepared at Restaurant Museum Pub'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-[#26221D] hover:bg-[#332D26] text-[#A89F91] hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {confirmedOrder ? (
          <div className="p-5 sm:p-7 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#D4A359] font-bold">
                Order Receipt & Kitchen Code
              </span>
              <div className="font-serif-heading text-3xl sm:text-4xl font-bold text-white tracking-wider">
                {confirmedOrder.orderNumber}
              </div>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-[#1F1C18] border border-[#332C22] text-left space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#2D271F] pb-2.5">
                <div>
                  <span className="text-[#8E8677] block text-[10px]">Customer</span>
                  <strong className="text-[#EDE8DF]">{confirmedOrder.customerName}</strong>
                </div>
                <div className="text-right">
                  <span className="text-[#8E8677] block text-[10px]">Dining Option</span>
                  <span className="px-2 py-0.5 rounded bg-[#2A231A] text-[#D4A359] border border-[#D4A359]/30 capitalize font-medium">
                    {confirmedOrder.orderType.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Items Purchased List */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] text-[#8E8677] font-semibold uppercase tracking-wider block">
                  Items Purchased ({confirmedOrder.items.reduce((s, i) => s + i.quantity, 0)} total)
                </span>
                <div className="space-y-1 bg-[#151311] p-2.5 rounded-lg border border-[#28231C]">
                  {confirmedOrder.items.map((it) => (
                    <div key={it.itemId} className="flex justify-between items-center text-xs">
                      <span className="text-[#DDD5C7]">
                        <strong className="text-[#D4A359]">{it.quantity}x</strong> {it.name}
                      </span>
                      <span className="font-mono text-[#F2C069]">
                        €{(it.price * it.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final Price Highlight */}
              <div className="pt-2 border-t border-[#2D271F] flex items-center justify-between bg-gradient-to-r from-[#241F18] to-[#1C1814] p-3 rounded-lg border border-[#D4A359]/30">
                <div>
                  <span className="text-[11px] text-[#A89F90] uppercase tracking-wider font-semibold block">
                    Final Price Paid / Due
                  </span>
                  <span className="text-[10px] text-emerald-400">Taxes & preparation included</span>
                </div>
                <span className="font-serif-heading text-2xl font-bold text-[#F5C26B]">
                  €{confirmedOrder.finalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Notification to view in Admin page */}
            <div className="p-3 rounded-xl bg-[#231F19] border border-[#3B3327] text-xs text-[#A89F90] flex items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#D4A359] shrink-0" />
                <span>This purchase is registered in the <strong>Admin Dashboard</strong>!</span>
              </div>
              <button
                onClick={() => {
                  handleClose();
                  onOpenAdmin();
                }}
                className="px-3 py-1.5 rounded-lg bg-[#D4A359] text-black font-bold text-xs shrink-0 hover:brightness-110 flex items-center gap-1 transition-all"
              >
                <span>View in Admin</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-[#25211B] border border-[#3D362B] text-xs sm:text-sm text-[#EDE8DF] font-semibold hover:border-[#D4A359] transition-all"
            >
              Done / Back to Menu
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Order Items Breakdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#A89F90]">
                <span>Items in Order ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                <span className="text-[#D4A359]">Interactive Menu</span>
              </div>

              <div className="space-y-1.5 bg-[#141210] p-3 rounded-xl border border-[#2B251E] max-h-44 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.itemId} className="flex justify-between items-center text-xs py-1 border-b border-[#221D17] last:border-0">
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span className="w-5 h-5 rounded bg-[#27211A] text-[#D4A359] font-bold flex items-center justify-center text-[11px] shrink-0 border border-[#3D3427]">
                        {item.quantity}
                      </span>
                      <span className="text-[#EDE8DF] truncate">{item.name}</span>
                    </div>
                    <span className="font-mono text-[#F2C069] shrink-0">
                      €{(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Final Price Banner */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#241F18] via-[#2A231A] to-[#1F1B16] border border-[#D4A359]/40 flex items-center justify-between shadow-inner">
                <div>
                  <span className="text-xs text-[#C8BFB2] font-semibold uppercase tracking-wider block">
                    Final Total Price
                  </span>
                  <span className="text-[10px] text-[#8E8678]">All taxes & kitchen service included</span>
                </div>
                <div className="font-serif-heading text-2xl font-bold text-[#F5C26B]">
                  €{finalPrice.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Dining Method */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89F90] mb-2">
                Order Fulfillment Type
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setOrderType('dine-in')}
                  className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                    orderType === 'dine-in'
                      ? 'bg-[#26211A] border-[#D4A359] text-[#D4A359]'
                      : 'bg-[#141210] border-[#2D271F] text-[#A89F90] hover:text-white'
                  }`}
                >
                  <Utensils className="w-4 h-4 mx-auto mb-1" />
                  <span>Dine-In</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('pickup')}
                  className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                    orderType === 'pickup'
                      ? 'bg-[#26211A] border-[#D4A359] text-[#D4A359]'
                      : 'bg-[#141210] border-[#2D271F] text-[#A89F90] hover:text-white'
                  }`}
                >
                  <Clock className="w-4 h-4 mx-auto mb-1" />
                  <span>Takeout</span>
                </button>

                <button
                  type="button"
                  onClick={() => setOrderType('delivery')}
                  className={`p-2.5 rounded-xl border text-center font-medium transition-all ${
                    orderType === 'delivery'
                      ? 'bg-[#26211A] border-[#D4A359] text-[#D4A359]'
                      : 'bg-[#141210] border-[#2D271F] text-[#A89F90] hover:text-white'
                  }`}
                >
                  <MapPin className="w-4 h-4 mx-auto mb-1" />
                  <span>Delivery</span>
                </button>
              </div>
            </div>

            {/* Customer Details */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89F90]">
                Customer Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F776B]" />
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-xs sm:text-sm text-[#EDE7DE] focus:border-[#D4A359] focus:outline-none placeholder-[#766E62]"
                  />
                </div>

                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7F776B]" />
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-xs sm:text-sm text-[#EDE7DE] focus:border-[#D4A359] focus:outline-none placeholder-[#766E62]"
                  />
                </div>
              </div>

              {orderType === 'dine-in' && (
                <div>
                  <input
                    type="text"
                    placeholder="Table Number (e.g. Vault 02 or Bar Counter)"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-xs sm:text-sm text-[#EDE7DE] focus:border-[#D4A359] focus:outline-none placeholder-[#766E62]"
                  />
                </div>
              )}

              {orderType === 'delivery' && (
                <div>
                  <input
                    type="text"
                    placeholder="Delivery Address in Mitrovica (e.g. Rruga Shemsi Ahmeti 14)"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121110] border border-[#332D24] text-xs sm:text-sm text-[#EDE7DE] focus:border-[#D4A359] focus:outline-none placeholder-[#766E62]"
                  />
                </div>
              )}

              <div>
                <input
                  type="text"
                  placeholder="Kitchen Notes (e.g. extra dip, dressing on side, cutlery needed)"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#121110] border border-[#332D24] text-xs text-[#EDE7DE] focus:border-[#D4A359] focus:outline-none placeholder-[#766E62]"
                />
              </div>
            </div>

            {/* Payment Choice */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#A89F90] mb-2">
                Payment Option
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('counter')}
                  className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                    paymentMethod === 'counter'
                      ? 'bg-[#26211A] border-[#D4A359] text-[#D4A359]'
                      : 'bg-[#141210] border-[#2D271F] text-[#A89F90]'
                  }`}
                >
                  <span className="block font-bold">Pay at Counter / Pub</span>
                  <span className="text-[10px] text-[#8E8678]">Cash or Card upon receiving</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#26211A] border-[#D4A359] text-[#D4A359]'
                      : 'bg-[#141210] border-[#2D271F] text-[#A89F90]'
                  }`}
                >
                  <span className="block font-bold">Online Card</span>
                  <span className="text-[10px] text-[#8E8678]">Instant contactless processing</span>
                </button>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#C59341] via-[#D4A359] to-[#DFB46C] text-[#11100F] font-bold text-sm sm:text-base shadow-xl shadow-[#C59341]/20 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Confirm Purchase · €{finalPrice.toFixed(2)}</span>
              </button>
              <p className="text-[10px] text-[#7F776B] text-center mt-2">
                Order will appear instantly in the Restaurant Museum Pub admin system.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Lock, Eye, EyeOff, X, ShieldAlert, ArrowRight, ShieldCheck } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Required admin password
    if (password.trim() === 'Mpub123') {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setPassword('');
        setError('');
        onSuccess();
      }, 200);
    } else {
      setError('Incorrect password. Access denied.');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        id="admin-auth-dialog"
        className="bg-[#171513] border border-[#3A3328] rounded-2xl max-w-md w-full p-6 sm:p-7 relative text-[#ECE7DE] shadow-2xl space-y-5"
      >
        {/* Close Button */}
        <button
          id="btn-close-admin-auth"
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#8E8678] hover:text-white hover:bg-[#25211B] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="flex items-start gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4A359] to-[#996F2E] text-black flex items-center justify-center shrink-0 shadow-lg shadow-[#D4A359]/20">
            <Lock className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-serif-heading text-xl font-bold text-white">
                Admin & Staff Access
              </h3>
            </div>
            <p className="text-xs text-[#9E9587] mt-0.5">
              Enter the manager security password to access the reservation manifest and floor plan console.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          <div>
            <label 
              htmlFor="admin-password-input"
              className="block text-xs font-semibold uppercase tracking-wider text-[#A89F90] mb-1.5"
            >
              Management Password
            </label>
            <div className="relative">
              <input
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter password..."
                className={`w-full px-3.5 py-3 pr-11 rounded-xl bg-[#100F0E] border text-sm text-[#F7F4EB] placeholder-[#6E675B] focus:outline-none transition-colors ${
                  error
                    ? 'border-rose-500/80 focus:border-rose-500 ring-1 ring-rose-500/30'
                    : 'border-[#332D24] focus:border-[#D4A359] focus:ring-1 focus:ring-[#D4A359]/30'
                }`}
              />

              <button
                type="button"
                id="btn-toggle-password-visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#8E8678] hover:text-[#D4A359] transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {error && (
              <div 
                id="admin-auth-error"
                className="flex items-center gap-1.5 mt-2 text-xs text-rose-400 animate-fade-in"
              >
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-[#1F1C18] border border-[#2B261F] flex items-center gap-2.5 text-[11px] text-[#A89F90]">
            <ShieldCheck className="w-4 h-4 text-[#D4A359] shrink-0" />
            <span>
              Restricted area for Restaurant Museum Pub managers and host staff.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              id="btn-cancel-admin-auth"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-[#8E8678] hover:text-white hover:bg-[#221F1B] transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              id="btn-submit-admin-auth"
              disabled={isSubmitting || !password}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#C59341] to-[#D4A359] text-black font-bold text-xs shadow-lg shadow-[#C59341]/25 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-1.5"
            >
              <span>Unlock Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

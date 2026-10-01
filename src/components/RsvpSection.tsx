import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, Sparkles, PlusCircle, Loader2 } from 'lucide-react';
import { BabyBow, MiniHeart } from './Decorations';
import { soundManager } from '../utils/audio';
import { RsvpData } from '../types';
import { getSupabase } from '../utils/supabaseClient';
import { sendResendRsvpEmail } from '../utils/resendEmail';

export const RsvpSection: React.FC = () => {
  const [name, setName] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [attendance, setAttendance] = useState<'accepted' | 'declined'>('accepted');
  const [message, setMessage] = useState('');
  const [submittedRsvp, setSubmittedRsvp] = useState<RsvpData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const triggerCelebration = () => {
    soundManager.playChime();
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#7C9BB3', '#A8C5DA', '#E8B86D', '#FFFFFF', '#4A7291'],
    });
  };

  const handleResetForNewRsvp = () => {
    setSubmittedRsvp(null);
    setName('');
    setGuestCount(1);
    setAttendance('accepted');
    setMessage('');
    setValidationError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) {
      setValidationError('Please enter your full name');
      return;
    }
    setValidationError('');
    setIsSubmitting(true);

    const timestamp = new Date().toISOString();
    // Always generate a brand-new ID for every submission
    const freshEntryId = `rsvp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

    const rsvp: RsvpData = {
      id: freshEntryId,
      name: name.trim(),
      guestCount: attendance === 'accepted' ? Number(guestCount) : 0,
      attendance,
      message: message.trim(),
      submittedAt: timestamp,
    };

    // 1. Always force a fresh INSERT row into the Supabase `rsvps` table (never upsert/update)
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { error } = await supabase.from('rsvps').insert([
          {
            name: rsvp.name,
            guest_count: rsvp.guestCount,
            response: rsvp.attendance,
            message: rsvp.message,
            submitted_at: rsvp.submittedAt,
          },
        ]);
        if (error) {
          console.warn('Supabase insert warning:', error.message);
        }
      } catch (err) {
        console.warn('Supabase client insert error:', err);
      }
    }

    // 2. Send Resend email notification to trisha.saluja1993@gmail.com and tishajain1027@gmail.com
    await sendResendRsvpEmail(rsvp);

    setSubmittedRsvp(rsvp);
    setIsSubmitting(false);

    if (attendance === 'accepted') {
      triggerCelebration();
    }
  };

  return (
    <div
      id="rsvp-section"
      className="w-full relative rounded-3xl bg-white border border-[#CBDDE9] p-5 sm:p-7 shadow-lg overflow-hidden"
    >
      {/* Background soft styling */}
      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#7C9BB3] via-[#A6C5DB] to-[#7C9BB3]" />

      {/* Section Header */}
      <div className="text-center mb-6 pt-1">
        <div className="inline-flex items-center justify-center p-2 rounded-full bg-[#EBF2F7] text-[#476F8F] mb-2">
          <BabyBow className="w-5 h-5 text-[#5F85A2]" />
        </div>
        <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#1E3A5F]">
          Kindly RSVP
        </h3>
      </div>

      {submittedRsvp ? (
        /* Confirmation State */
        <div className="rounded-2xl bg-gradient-to-b from-[#F2F7FA] to-[#FAF7F2] p-5 border border-[#C6DAE7] text-center animate-fadeIn">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#DCEBF4] text-[#3F6685] flex items-center justify-center mb-3">
            <CheckCircle2 className="w-6 h-6 text-[#456E8E]" />
          </div>

          <h4 className="font-serif-playfair text-xl font-bold text-[#1C3852] mb-1">
            {submittedRsvp.attendance === 'accepted'
              ? 'RSVP Sent with Joy!'
              : 'Response Sent'}
          </h4>

          <p className="text-sm text-[#506C82] mb-4">
            Thank you, <strong className="text-[#1E3A5F]">{submittedRsvp.name}</strong>!{' '}
            {submittedRsvp.attendance === 'accepted'
              ? `We can't wait to celebrate together (${submittedRsvp.guestCount} ${
                  submittedRsvp.guestCount === 1 ? 'guest' : 'guests'
                }).`
              : 'We will miss you dearly, and thank you so much for sending your warm love!'}
          </p>

          <div className="pt-3 border-t border-[#D6E5EF] flex justify-center">
            <button
              type="button"
              onClick={handleResetForNewRsvp}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#3F6685] bg-white hover:bg-[#EBF2F7] border border-[#CBDDE9] shadow-xs transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Submit Another RSVP</span>
            </button>
          </div>
        </div>
      ) : (
        /* Interactive RSVP Form */
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {/* Attendance Choice: Joyfully Accepts / Regretfully Declines */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6780] mb-2 text-center">
              Will you be joining the celebration?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setAttendance('accepted')}
                className={`py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  attendance === 'accepted'
                    ? 'bg-[#5B82A0] text-white border-[#4A6E8A] shadow-md ring-2 ring-[#7C9BB3]/40'
                    : 'bg-[#F9FBFC] text-[#557187] border-[#D1E0EB] hover:bg-[#EFF5F9]'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Joyfully Accepts</span>
              </button>

              <button
                type="button"
                onClick={() => setAttendance('declined')}
                className={`py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  attendance === 'declined'
                    ? 'bg-[#7E8B94] text-white border-[#65727B] shadow-md ring-2 ring-[#99A7B0]/40'
                    : 'bg-[#F9FBFC] text-[#557187] border-[#D1E0EB] hover:bg-[#EFF5F9]'
                }`}
              >
                <MiniHeart
                  className={`w-4 h-4 ${
                    attendance === 'declined' ? 'text-white' : 'text-[#8A9BA8]'
                  }`}
                />
                <span>Regretfully Declines</span>
              </button>
            </div>
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold text-[#3F5B73] mb-1">
              Your Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (validationError) setValidationError('');
              }}
              placeholder="e.g., Jane & John Doe"
              className="w-full px-4 py-2.5 rounded-xl border border-[#CBDDE9] bg-[#FDFBF7] text-[#1E3A5F] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C9BB3] focus:bg-white transition-all"
            />
            {validationError && (
              <p className="text-xs text-rose-600 mt-1">{validationError}</p>
            )}
          </div>

          {/* Guest Count (Only relevant if accepted) */}
          {attendance === 'accepted' && (
            <div className="animate-fadeIn">
              <label className="block text-xs font-semibold text-[#3F5B73] mb-1">
                Total Attending Guests (Including You)
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setGuestCount(count)}
                    className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition-all ${
                      guestCount === count
                        ? 'bg-[#5B82A0] text-white border-[#4B708D] shadow-xs'
                        : 'bg-[#F9FBFC] text-[#4A6780] border-[#D1E0EB] hover:bg-[#EDF4F9]'
                    }`}
                  >
                    {count} {count === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Optional Note */}
          <div>
            <label className="block text-xs font-semibold text-[#3F5B73] mb-1">
              Sweet Note or Message (Optional)
            </label>
            <textarea
              name="message"
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a note for Aman, Trisha & Baby Gulati..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#CBDDE9] bg-[#FDFBF7] text-[#1E3A5F] text-sm focus:outline-none focus:ring-2 focus:ring-[#7C9BB3] focus:bg-white transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#5B82A0] to-[#456C8A] hover:from-[#4C728E] hover:to-[#385B77] disabled:opacity-65 text-white font-semibold text-sm shadow-md shadow-[#5B82A0]/25 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving RSVP...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Confirm RSVP</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

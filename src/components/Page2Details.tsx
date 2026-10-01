import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Sparkles, 
  Share2, 
  Heart, 
  ChevronUp, 
  Check, 
  Volume2, 
  VolumeX, 
  Info,
  Gift,
  ExternalLink
} from 'lucide-react';
import { CountdownTimer } from './CountdownTimer';
import { LocationCard } from './LocationCard';
import { RsvpSection } from './RsvpSection';
import { PhotoGallery, eventPhotos } from './PhotoGallery';
import { BabyBow, DaisyFlower, MiniHeart } from './Decorations';
import { soundManager } from '../utils/audio';

interface Page2DetailsProps {
  onBackToCover: () => void;
}

export const Page2Details: React.FC<Page2DetailsProps> = ({ onBackToCover }) => {
  const [copiedShare, setCopiedShare] = useState(false);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());
  const [heroView, setHeroView] = useState<'goose' | 'couple'>('goose');
  const [honkCount, setHonkCount] = useState(0);
  const [showHonkBubble, setShowHonkBubble] = useState(false);

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.startLullaby();
    }
  };

  const handleGooseHonk = () => {
    soundManager.playHonk();
    setHonkCount((prev) => prev + 1);
    setShowHonkBubble(true);
    setTimeout(() => setShowHonkBubble(false), 2000);
  };

  const handleShare = () => {
    const shareData = {
      title: 'A Silly Goose Baby Shower - Aman & Trisha Gulati',
      text: 'A Silly Goose is Almost on the Loose! Join Aman & Trisha Gulati to celebrate their baby shower on November 21st at 5:00 PM in Bridgewater, NJ.',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      navigator.share(shareData).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#FAF7F2] text-[#2C3E50] relative pb-20 overflow-x-hidden">
      {/* Top Floating Control Bar */}
      <div className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-md border-b border-[#CBDDE9]/80 py-2.5 px-4 shadow-xs">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBackToCover}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F5F8] hover:bg-[#E2EDF3] text-[#345B7B] text-xs font-semibold border border-[#CBDDE9] transition-all"
          >
            <span>✉ Back to Envelope</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Music Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className={`p-2 rounded-full border transition-all ${
                !isMuted 
                  ? 'bg-[#5B82A0] text-white border-[#476C8A]' 
                  : 'bg-[#F0F5F8] text-[#69889F] border-[#CBDDE9]'
              }`}
              title={isMuted ? "Play Music Box Lullaby" : "Mute Music"}
              aria-label="Toggle Sound"
            >
              {!isMuted ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Share Button */}
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#5B82A0] text-white hover:bg-[#486F8E] text-xs font-semibold shadow-xs transition-all active:scale-95"
            >
              {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedShare ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container (Mobile-First Framed) */}
      <main className="max-w-md mx-auto px-4 pt-6 space-y-6">

        {/* Hero Card: Header & Honorees */}
        <section className="relative rounded-3xl bg-gradient-to-b from-[#FFFFFF] via-[#FAF7F2] to-[#F3F8FB] border border-[#CBDDE9] p-6 text-center shadow-lg overflow-hidden">
          {/* Decorative gingham top banner */}
          <div className="absolute top-0 inset-x-0 h-3 bg-gingham-blue opacity-50" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EBF2F7] text-[#476E8E] text-xs font-bold uppercase tracking-wider mb-3 mt-1">
            <BabyBow className="w-3.5 h-3.5 text-[#5F85A2]" />
            <span>Baby Shower Celebration</span>
            <BabyBow className="w-3.5 h-3.5 text-[#5F85A2]" />
          </div>

          {/* Exact Required Title: "A Silly Goose is Almost on the Loose!" */}
          <h1 className="font-serif-cormorant text-3xl sm:text-4xl font-bold text-[#17324B] leading-tight mb-2 tracking-tight">
            A Silly Goose is Almost on the Loose!
          </h1>

          {/* Exact Required Host & Honorees: Aman & Trisha Gulati */}
          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-px w-10 bg-[#CBDDE9]" />
            <DaisyFlower className="w-5 h-5" />
            <div className="h-px w-10 bg-[#CBDDE9]" />
          </div>

          <p className="text-xs uppercase tracking-widest text-[#728FA4] font-semibold">
            Parents - to - Be
          </p>
          <h2 className="font-serif-playfair text-2xl sm:text-3xl font-bold text-[#2A4D6B] mt-0.5 mb-3">
            Aman &amp; Trisha Gulati
          </h2>

          {/* View Mode Toggle: Silly Goose / Parents Photo */}
          <div className="inline-flex p-1 rounded-full bg-[#EBF2F7] border border-[#CBDDE9] mb-3">
            <button
              type="button"
              onClick={() => setHeroView('goose')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                heroView === 'goose'
                  ? 'bg-[#5B82A0] text-white shadow-xs'
                  : 'text-[#54738C] hover:text-[#23435E]'
              }`}
            >
              🪿 Silly Goose
            </button>
            <button
              type="button"
              onClick={() => setHeroView('couple')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                heroView === 'couple'
                  ? 'bg-[#5B82A0] text-white shadow-xs'
                  : 'text-[#54738C] hover:text-[#23435E]'
              }`}
            >
              📷 Aman &amp; Trisha
            </button>
          </div>

          {/* Hero Visual Display */}
          {heroView === 'goose' ? (
            <div className="relative my-3 flex flex-col items-center justify-center animate-fadeIn">
              {showHonkBubble && (
                <div className="absolute -top-6 bg-[#203D56] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-bounce z-20">
                  Honk! Honk! 🪿💙
                </div>
              )}

              <div
                onClick={handleGooseHonk}
                className="relative cursor-pointer group transition-transform active:scale-95 select-none"
                title="Tap the Silly Goose for a happy honk!"
              >
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-b from-[#EBF3F8] to-[#FBF9F5] p-3 shadow-inner border-2 border-[#D3E2EC] flex items-center justify-center overflow-hidden">
                  <img
                    src="/assets/images/goose_watercolor.jpg"
                    alt="Watercolor Silly Goose with Dusty Blue Bow"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:rotate-1 transition-transform"
                  />
                </div>

                {/* Floating Little Bow Badge */}
                <div className="absolute -bottom-2 right-2 bg-white rounded-full p-2 shadow-md border border-[#CBDDE9]">
                  <BabyBow className="w-6 h-6 text-[#5F85A2]" />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative my-3 flex flex-col items-center justify-center animate-fadeIn">
              {/* Polaroid-style Framed Keepsake Photo */}
              <div className="relative p-2.5 pb-3.5 bg-white rounded-2xl shadow-lg border border-[#D5E3EE] max-w-[280px] sm:max-w-[320px] transform -rotate-1 hover:rotate-0 transition-transform">
                <div className="aspect-[9/16] rounded-xl overflow-hidden bg-[#F0F5F8] border border-[#E8EFF4]">
                  <img
                    src="https://iili.io/n7gAjvn.jpg"
                    alt="Aman & Trisha"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.endsWith('/assets/images/silly_goose_illustration.png')) {
                        target.src = '/assets/images/silly_goose_illustration.png';
                      }
                    }}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="mt-2.5 text-center px-1">
                  <span className="font-serif-playfair text-sm font-bold text-[#1E3A54] block">
                    It&apos;s a Boy
                  </span>
                </div>
                {/* Decorative bow pin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 p-1 rounded-full bg-white shadow-sm border border-[#CBDDE9]">
                  <BabyBow className="w-5 h-5 text-[#5F85A2]" />
                </div>
              </div>
            </div>
          )}

          <p className="font-script text-2xl sm:text-3xl text-[#537A99] leading-snug">
            Join us for a joyful day!
          </p>
        </section>

        {/* Live Countdown Timer */}
        <section>
          <CountdownTimer />
        </section>

        {/* Event Details Section (Date, Time, Location) */}
        <section className="rounded-3xl bg-white border border-[#CBDDE9] p-5 sm:p-6 shadow-md space-y-4">
          <div className="text-center pb-2 border-b border-[#EAF1F6]">
            <h3 className="font-serif-cormorant text-2xl font-bold text-[#1A3751]">
              Event Details
            </h3>
            <p className="text-xs text-[#708EA3]">Everything you need to know</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Date Card */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E3ECE5]">
              <div className="w-10 h-10 rounded-xl bg-[#EBF2F7] flex items-center justify-center text-[#486F8F] shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#698A9F]">Date</span>
                <p className="font-serif-playfair text-base font-bold text-[#1E3A54] leading-tight">
                  21st November
                </p>
                <p className="text-xs text-[#637C8F]">Saturday, 2026</p>
              </div>
            </div>

            {/* Time Card */}
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E3ECE5]">
              <div className="w-10 h-10 rounded-xl bg-[#EBF2F7] flex items-center justify-center text-[#486F8F] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#698A9F]">Time</span>
                <p className="font-serif-playfair text-base font-bold text-[#1E3A54] leading-tight">
                  5:00 PM onwards
                </p>
                <p className="text-xs text-[#637C8F]">Evening celebration</p>
              </div>
            </div>
          </div>
        </section>

        {/* Location & Google Maps Card */}
        <section>
          <LocationCard />
        </section>

        {/* Interactive RSVP Form */}
        <section>
          <RsvpSection />
        </section>

        {/* Amazon Baby Registry Section */}
        <section className="relative rounded-3xl bg-white border border-[#CBDDE9] p-5 sm:p-6 shadow-md text-center overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gingham-blue opacity-40" />

          <div className="w-12 h-12 rounded-2xl bg-[#EBF2F7] border border-[#D5E4EF] flex items-center justify-center text-[#486F8F] mx-auto mb-3 shadow-xs">
            <Gift className="w-6 h-6" />
          </div>

          <h3 className="font-serif-cormorant text-2xl font-bold text-[#1A3751]">
            Amazon Baby Registry
          </h3>
          <p className="text-xs text-[#708EA3] mt-0.5">
            Feathering the Nest for Baby Gulati
          </p>

          <div className="flex items-center justify-center gap-2 my-2.5">
            <div className="h-px w-8 bg-[#CBDDE9]" />
            <BabyBow className="w-4 h-4 text-[#5F85A2]" />
            <div className="h-px w-8 bg-[#CBDDE9]" />
          </div>

          <p className="text-xs sm:text-sm text-[#4F6B82] leading-relaxed max-w-md mx-auto mb-4">
            Your love, blessings, and presence are the greatest gifts of all! If you would like to help us prepare for our little silly goose&apos;s arrival, we have put together a baby registry on Amazon.
          </p>

          <a
            href="https://www.amazon.com/baby-reg/babygulatisregistry-gulati-january-2027-bridgewater/1P1W6FP99V5HG#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#5B82A0] hover:bg-[#496D89] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-98"
          >
            <Gift className="w-4 h-4" />
            <span>View Amazon Baby Registry</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </section>

        {/* Photo & Memories Inspiration Card */}
        <section>
          <PhotoGallery />
        </section>

        {/* Aman & Trisha Baby Gulati Message Column / Card at the bottom */}
        <section className="relative rounded-3xl bg-white border border-[#CBDDE9] p-5 sm:p-6 shadow-md text-center overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-2 bg-gingham-blue opacity-40" />

          <h3 className="font-serif-cormorant text-2xl font-bold text-[#1A3751]">
            Baby Gulati
          </h3>

          <div className="flex items-center justify-center gap-2 my-2">
            <div className="h-px w-8 bg-[#CBDDE9]" />
            <DaisyFlower className="w-4 h-4" />
            <div className="h-px w-8 bg-[#CBDDE9]" />
          </div>

          <div className="mt-2 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E3ECE5]">
            <p className="font-serif-playfair text-base sm:text-lg text-[#24445F] italic leading-relaxed">
              &ldquo;Join us as we shower our baby boy with love, laughter, and sweet wishes before he waddles into the world. 🤍&rdquo;
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-[#CBDDE9]/60">
          <BabyBow className="w-7 h-7 mx-auto text-[#7C9BB3] mb-2" />
          <p className="text-xs text-[#6E8BA0] mt-0.5">
            With Love, Aman &amp; Trisha Gulati
          </p>
          <div className="mt-4">
            <button
              type="button"
              onClick={onBackToCover}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-[#406482] bg-white hover:bg-[#EFF5F9] border border-[#CBDDE9] shadow-xs"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              <span>Back to Top Envelope</span>
            </button>
          </div>
        </footer>

      </main>
    </div>
  );
};

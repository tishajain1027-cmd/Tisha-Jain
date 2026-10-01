import React, { useState } from 'react';
import { ArrowDown, Sparkles, Heart, MailOpen, Compass } from 'lucide-react';
import { BabyBow, DaisyFlower, MiniHeart } from './Decorations';
import { soundManager } from '../utils/audio';

interface Page1EnvelopeProps {
  onOpen: () => void;
}

export const Page1Envelope: React.FC<Page1EnvelopeProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening || isOpen) {
      onOpen();
      return;
    }
    setIsOpening(true);
    soundManager.playWaxSealSound();

    setTimeout(() => {
      setIsOpen(true);
      setTimeout(() => {
        onOpen();
      }, 750);
    }, 450);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-[#F2F7FA] via-[#FAF7F2] to-[#EEF5F9] relative overflow-hidden select-none">
      {/* Delicate floating background motifs */}
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-gingham-blue opacity-30 blur-xs pointer-events-none" />
      <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-gingham-blue opacity-30 blur-xs pointer-events-none" />

      {/* Top Banner Ribbon */}
      <header className="w-full max-w-md pt-3 pb-2 text-center z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#CBDDE9] shadow-xs backdrop-blur-xs mb-2">
          <BabyBow className="w-4 h-4 text-[#5F85A2]" />
          <span className="font-serif-cormorant text-xs tracking-widest uppercase font-semibold text-[#406482]">
            Baby Shower Invitation
          </span>
          <BabyBow className="w-4 h-4 text-[#5F85A2]" />
        </div>
        <p className="font-script text-2xl sm:text-3xl text-[#5B82A0] leading-tight">
          Special Delivery for You
        </p>
      </header>

      {/* Main Envelope Container */}
      <div className="w-full max-w-md my-auto relative z-20 flex flex-col items-center">
        {/* Envelope Outer Shell */}
        <div
          onClick={handleOpen}
          className={`relative w-full min-h-[300px] sm:min-h-[320px] max-w-[390px] rounded-2xl bg-[#FCFBF8] border-2 border-[#D3E2EC] shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden flex flex-col justify-between ${
            isOpen ? 'scale-95 opacity-90' : 'hover:scale-[1.015]'
          }`}
          style={{
            boxShadow: '0 20px 40px -10px rgba(91, 130, 160, 0.25), 0 1px 3px rgba(0, 0, 0, 0.05)',
          }}
        >
          {/* Gingham Inner Lining Peek - extended under "Loose!" */}
          <div className="absolute inset-x-4 top-2 h-[104px] sm:h-[108px] bg-gingham-blue rounded-t-xl opacity-60 border-b border-[#CBDDE9]/60" />

          {/* Envelope Body Card Design */}
          <div className="relative flex-1 flex flex-col items-center justify-between pt-4 pb-5 px-5 sm:px-6 text-center z-10">
            {/* Invitation Lettering on Envelope Face (shifted slightly up) */}
            <div className="pt-1 pb-2">
              <p className="text-[11px] uppercase tracking-widest text-[#6C8DA6] font-semibold mb-0.5">
                You&apos;re Invited to Celebrate
              </p>
              <h1 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#19354E] tracking-normal leading-tight">
                A Silly Goose is Almost on the Loose!
              </h1>
              <div className="flex items-center justify-center gap-2 my-1">
                <div className="h-px w-8 bg-[#CBDDE9]" />
                <BabyBow className="w-4 h-4 text-[#5F85A2]" />
                <div className="h-px w-8 bg-[#CBDDE9]" />
              </div>
              <p className="font-serif-playfair text-base sm:text-lg italic font-semibold text-[#3D6381]">
                Celebrating Baby Gulati
              </p>
              <p className="text-xs text-[#738B9C] mt-0.5 font-medium">
                Saturday, November 21, 2026 • 5:00 PM
              </p>
            </div>

            {/* Interactive Wax Seal Button */}
            <div className="relative mt-2 mb-1">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpen();
                }}
                className="group relative flex items-center justify-center focus:outline-none"
                aria-label="Tap to Open Invitation"
              >
                {/* Glowing subtle ring */}
                <span className="absolute -inset-2 rounded-full bg-[#7C9BB3]/25 animate-ping duration-1000" />

                {/* Wax Seal Disk */}
                <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-[#799DB7] via-[#5F85A2] to-[#456C8A] p-1 shadow-lg group-hover:scale-105 transition-transform duration-300 border-2 border-[#BCD4E4] flex flex-col items-center justify-center text-center">
                  <BabyBow className="w-5 h-5 text-white filter drop-shadow mb-0.5" color="#FFFFFF" />
                  <span className="font-serif-cormorant text-[10px] tracking-wider uppercase font-bold text-white leading-none">
                    {isOpening ? "Opening..." : "Tap to Open"}
                  </span>
                  <Sparkles className="w-3 h-3 text-[#FFE79A] mt-0.5" />
                </div>
              </button>
            </div>
          </div>

          {/* Envelope Bottom Decorative Crease V-Lines */}
          <div
            className="absolute inset-x-0 bottom-0 h-16 pointer-events-none opacity-30 border-t border-[#CBDDE9]"
            style={{
              backgroundImage: 'linear-gradient(135deg, transparent 49.5%, #CBDDE9 50%, transparent 50.5%), linear-gradient(225deg, transparent 49.5%, #CBDDE9 50%, transparent 50.5%)',
              backgroundSize: '100% 100%',
            }}
          />
        </div>

        {/* Action helper prompt */}
        <button
          type="button"
          onClick={handleOpen}
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-[#2D5372] text-xs sm:text-sm font-semibold border border-[#CBDDE9] shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          <MailOpen className="w-4 h-4 text-[#5F85A2]" />
          <span>Tap Wax Seal or Here to Unfold Invitation</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#5F85A2] animate-bounce" />
        </button>
      </div>

      {/* Footer Details */}
      <footer className="w-full max-w-md py-3 text-center z-10">
        <div className="flex items-center justify-center gap-2 text-xs text-[#7A93A6]">
          <DaisyFlower className="w-3.5 h-3.5" />
          <span>Celebrating Baby Gulati</span>
          <MiniHeart className="w-3 h-3 text-[#7C9BB3] fill-current" />
        </div>
      </footer>
    </div>
  );
};

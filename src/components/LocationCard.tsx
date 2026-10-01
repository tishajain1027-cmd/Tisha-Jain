import React, { useState } from 'react';
import { Navigation, Copy, Check, ExternalLink } from 'lucide-react';

export const LocationCard: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const address = "The Clubhouse at Beacon Hill, 4300 Winder Dr, Bridgewater, NJ 08807";
  const mapsUrl = "https://maps.app.goo.gl/efDTPK2s8dehmhg86?g_st=ic";

  const handleCopy = () => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      // fallback
    });
  };

  return (
    <div className="w-full relative rounded-3xl bg-white border border-[#CBDDE9] p-5 sm:p-6 shadow-md space-y-4 overflow-hidden">
      {/* Consistent Heading with Event Details */}
      <div className="text-center pb-2 border-b border-[#EAF1F6]">
        <h3 className="font-serif-cormorant text-2xl font-bold text-[#1A3751]">
          Event Location
        </h3>
        <p className="text-xs text-[#708EA3]">Bridgewater, New Jersey</p>
      </div>

      {/* Styled Address Box */}
      <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#E3ECE5]">
        <p className="font-serif-playfair text-lg font-bold text-[#203953] leading-snug">
          The Clubhouse at Beacon Hill
        </p>
        <p className="text-sm font-medium text-[#3F5B73] mt-0.5">
          4300 Winder Dr, Bridgewater, NJ 08807
        </p>
      </div>

      {/* Actions: Direct Location Pin Button & Copy Address */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        {/* Exact Location Pin Button specified in prompt */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#5B82A0] to-[#456C8A] hover:from-[#4E7491] hover:to-[#3B5F7B] text-white font-semibold text-sm shadow-md shadow-[#5B82A0]/25 transition-all transform active:scale-[0.98] group"
        >
          <Navigation className="w-4 h-4 transition-transform group-hover:rotate-12" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>

        {/* Copy Address Button */}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#F0F5F8] hover:bg-[#E2EDF3] text-[#2C4F6E] border border-[#CBDDE9] text-sm font-semibold transition-all active:scale-[0.98]"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700">Address Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#5F85A2]" />
              <span>Copy Address</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

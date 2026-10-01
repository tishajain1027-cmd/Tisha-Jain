import React, { useState, useEffect } from 'react';
import { Calendar, Clock, BellRing, Sparkles } from 'lucide-react';
import { BabyBow, MiniHeart } from './Decorations';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export const CountdownTimer: React.FC = () => {
  // Target: November 21, 2026, 5:00 PM (17:00) EST (Bridgewater, NJ = UTC-5)
  const targetDate = new Date('2026-11-21T17:00:00-05:00').getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isComplete: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format to two digits
  const formatNum = (n: number) => n.toString().padStart(2, '0');

  // Google Calendar Link generator
  const createGoogleCalendarUrl = () => {
    const title = encodeURIComponent("A Silly Goose Baby Shower - Aman & Trisha Gulati");
    const details = encodeURIComponent("A Silly Goose is Almost on the Loose! Celebrating Aman & Trisha Gulati and baby-to-be! Location: 4300 Winder Dr, Bridgewater, 08807, NJ");
    const location = encodeURIComponent("4300 Winder Dr, Bridgewater, 08807, NJ");
    // 2026-11-21 17:00 EST is 22:00 UTC
    const dates = "20261121T220000Z/20261122T020000Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  // iCal .ics download generator
  const downloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Silly Goose Baby Shower//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'SUMMARY:A Silly Goose Baby Shower - Aman & Trisha Gulati',
      'DESCRIPTION:A Silly Goose is Almost on the Loose! Celebrating Aman & Trisha Gulati and baby-to-be.',
      'LOCATION:4300 Winder Dr, Bridgewater, 08807, NJ',
      'DTSTART:20261121T220000Z',
      'DTEND:20261122T020000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Aman-Trisha-Baby-Shower.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full relative rounded-2xl bg-white/90 backdrop-blur-sm border border-[#C5D8E4] p-5 sm:p-6 shadow-md text-center overflow-hidden">
      {/* Background delicate gingham corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gingham-blue opacity-30 rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gingham-blue opacity-30 rounded-tr-full pointer-events-none" />

      {/* Decorative mini badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2F7] text-[#4A7291] text-xs font-semibold tracking-wider uppercase mb-3">
        <Clock className="w-3.5 h-3.5" />
        <span>Countdown to the Big Day</span>
        <BabyBow className="w-3.5 h-3.5 text-[#5F85A2]" />
      </div>

      <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#1E3A5F] mb-1">
        Counting Down with Joy
      </h3>
      <p className="text-xs sm:text-sm text-[#64748B] mb-5 font-medium flex items-center justify-center gap-1">
        <span>November 21, 2026 • 5:00 PM EST</span>
        <MiniHeart className="w-3 h-3 text-[#7C9BB3] fill-current inline" />
      </p>

      {/* Ticker Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-sm mx-auto mb-5">
        {[
          { label: 'Days', value: formatNum(timeLeft.days) },
          { label: 'Hours', value: formatNum(timeLeft.hours) },
          { label: 'Minutes', value: formatNum(timeLeft.minutes) },
          { label: 'Seconds', value: formatNum(timeLeft.seconds) },
        ].map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-[#F0F6FA] to-[#E3EEF6] border border-[#CBDDE9] shadow-sm transition-all hover:scale-105"
          >
            <span className="font-serif-playfair text-2xl sm:text-3xl font-bold text-[#1E3A5F] tracking-tight">
              {item.value}
            </span>
            <span className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-[#5A7E9C] mt-0.5">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Calendar reminder triggers */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 border-t border-[#E8EFF4]">
        <a
          href={createGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#2D5474] bg-[#EDF4F9] hover:bg-[#DDEBF5] rounded-lg transition-colors border border-[#CFDFEB]"
        >
          <Calendar className="w-3.5 h-3.5 text-[#5F85A2]" />
          <span>Google Calendar</span>
        </a>
        <button
          type="button"
          onClick={downloadIcs}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#2D5474] bg-[#EDF4F9] hover:bg-[#DDEBF5] rounded-lg transition-colors border border-[#CFDFEB]"
        >
          <BellRing className="w-3.5 h-3.5 text-[#5F85A2]" />
          <span>Apple / Outlook (.ics)</span>
        </button>
      </div>
    </div>
  );
};

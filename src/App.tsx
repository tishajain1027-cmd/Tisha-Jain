import React, { useState, useEffect } from 'react';
import { Page1Envelope } from './components/Page1Envelope';
import { Page2Details } from './components/Page2Details';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'cover' | 'details'>('cover');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Transition from Page 1 (Cover / Envelope) to Page 2 (Details)
  const handleOpenInvitation = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('details');
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  // Back to Page 1 (Cover / Envelope)
  const handleBackToCover = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('cover');
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2C3E50] overflow-x-hidden font-sans">
      <div
        className={`transition-opacity duration-500 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {currentPage === 'cover' ? (
          <Page1Envelope onOpen={handleOpenInvitation} />
        ) : (
          <Page2Details onBackToCover={handleBackToCover} />
        )}
      </div>
    </div>
  );
}

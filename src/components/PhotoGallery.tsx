import React, { useState } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Heart, Camera } from 'lucide-react';
import { BabyBow, DaisyFlower, MiniHeart } from './Decorations';

export interface GalleryPhoto {
  id: string;
  title: string;
  subtitle: string;
  src: string;
  description: string;
  tag: string;
}

export const eventPhotos: GalleryPhoto[] = [
  {
    id: 'parents',
    title: 'Parents to Be',
    subtitle: '',
    src: 'https://iili.io/n75OZ7t.jpg',
    description: '',
    tag: 'Parents to Be'
  },
  {
    id: 'tablescape',
    title: '',
    subtitle: '',
    src: 'https://iili.io/n7UoGV9.jpg',
    description: '',
    tag: ''
  },
  {
    id: 'canopy',
    title: '',
    subtitle: '',
    src: 'https://iili.io/n7UhL3g.jpg',
    description: '',
    tag: ''
  },
  {
    id: 'arches',
    title: '',
    subtitle: '',
    src: 'https://iili.io/n7Usoep.jpg',
    description: '',
    tag: ''
  }
];

export const PhotoGallery: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<number>(0);

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % eventPhotos.length);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((selectedPhotoIndex - 1 + eventPhotos.length) % eventPhotos.length);
    }
  };

  return (
    <div className="w-full relative rounded-3xl bg-white border border-[#CBDDE9] p-5 sm:p-6 shadow-md overflow-hidden">
      {/* Section Header */}
      <div className="text-center mb-5 pb-3 border-b border-[#EAF0F5]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF2F7] text-[#456E8E] text-[11px] font-bold uppercase tracking-wider mb-2">
          <Camera className="w-3.5 h-3.5" />
          <span>Celebration Gallery</span>
          <BabyBow className="w-3.5 h-3.5 text-[#5F85A2]" />
        </div>
        <h3 className="font-serif-cormorant text-2xl sm:text-3xl font-bold text-[#193652]">
          Our Silly Goose Story
        </h3>
        <p className="text-xs text-[#6B8599] max-w-xs mx-auto mt-0.5">
          Tap any photo to view full-size gallery details
        </p>
      </div>

      {/* Featured Photo Spotlight (Parents-to-Be) */}
      <div className="relative rounded-2xl overflow-hidden border border-[#CBDDE9] shadow-sm mb-4 group cursor-pointer"
        onClick={() => openLightbox(activeTab)}
      >
        <div className="relative aspect-[4/5] sm:aspect-[3/4] w-full bg-[#F0F5F8] overflow-hidden">
          <img
            src={eventPhotos[activeTab].src}
            alt={eventPhotos[activeTab].title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500"
          />
          {(eventPhotos[activeTab].title || eventPhotos[activeTab].subtitle) && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#152B3F]/80 via-transparent to-black/15" />
          )}
          
          {/* Top Tag */}
          {eventPhotos[activeTab].tag && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#2A4D6B] text-[10px] font-bold uppercase tracking-wider shadow-xs">
                {eventPhotos[activeTab].tag}
              </span>
            </div>
          )}

          {/* Expand icon */}
          <div className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 text-white backdrop-blur-xs group-hover:bg-black/60 transition-colors">
            <Maximize2 className="w-4 h-4" />
          </div>

          {/* Bottom Title & Description */}
          {(eventPhotos[activeTab].title || eventPhotos[activeTab].subtitle) && (
            <div className="absolute bottom-3 left-3 right-3 text-white">
              {eventPhotos[activeTab].title && (
                <h4 className="font-serif-playfair text-lg sm:text-xl font-bold leading-tight drop-shadow">
                  {eventPhotos[activeTab].title}
                </h4>
              )}
              {eventPhotos[activeTab].subtitle && (
                <p className="text-xs text-white/90 line-clamp-1 mt-0.5 drop-shadow-sm font-light">
                  {eventPhotos[activeTab].subtitle}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Selector Row */}
      <div className="grid grid-cols-4 gap-2 mb-2">
        {eventPhotos.map((photo, index) => (
          <button
            key={photo.id}
            type="button"
            onClick={() => setActiveTab(index)}
            className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all ${
              activeTab === index
                ? 'border-[#5B82A0] ring-2 ring-[#7C9BB3]/40 scale-102 shadow-sm'
                : 'border-[#D9E6EE] opacity-75 hover:opacity-100 hover:border-[#8EADC4]'
            }`}
          >
            <img
              src={photo.src}
              alt={photo.title || `Gallery photo ${index + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            {activeTab === index && (
              <div className="absolute inset-0 bg-[#5B82A0]/15" />
            )}
          </button>
        ))}
      </div>

      {/* Caption for active tab */}
      {eventPhotos[activeTab].description && (
        <div className="bg-[#FAF7F2] rounded-xl p-3 border border-[#E4ECE3] text-center mt-3">
          {eventPhotos[activeTab].title && (
            <p className="font-serif-cormorant text-base font-semibold text-[#1F3D58]">
              {eventPhotos[activeTab].title}
            </p>
          )}
          <p className="text-xs text-[#5D778B] mt-0.5 leading-relaxed">
            {eventPhotos[activeTab].description}
          </p>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-[#0E1F2D]/90 backdrop-blur-md flex flex-col items-center justify-between p-4 animate-fadeIn select-none"
          onClick={closeLightbox}
        >
          {/* Top Bar */}
          <div className="w-full max-w-lg flex items-center justify-between text-white py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <BabyBow className="w-5 h-5 text-white" color="#FFFFFF" />
              <span className="font-serif-cormorant text-lg font-bold">
                {eventPhotos[selectedPhotoIndex].tag || eventPhotos[selectedPhotoIndex].title} ({selectedPhotoIndex + 1}/{eventPhotos.length})
              </span>
            </div>
            <button
              type="button"
              onClick={closeLightbox}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Photo Center Container */}
          <div className="relative my-auto w-full max-w-md flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={eventPhotos[selectedPhotoIndex].src}
              alt={eventPhotos[selectedPhotoIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/20"
            />

            {/* Previous Button */}
            <button
              type="button"
              onClick={prevPhoto}
              className="absolute left-2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-2 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="w-full max-w-md text-center text-white pb-3 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="font-serif-playfair text-lg font-bold">
              {eventPhotos[selectedPhotoIndex].title}
            </h4>
            {eventPhotos[selectedPhotoIndex].description && (
              <p className="text-xs text-white/80 mt-1 max-w-sm mx-auto">
                {eventPhotos[selectedPhotoIndex].description}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

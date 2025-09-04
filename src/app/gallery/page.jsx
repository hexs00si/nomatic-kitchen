'use client'

import GalleryContent from '@/components/sections/gallery/GalleryContent';
import GalleryHero from '@/components/sections/gallery/Galleryhero' 


export default function GalleryPage() {
  return (
    <div>
      <GalleryHero />
      <GalleryContent />
    </div>
  );
}
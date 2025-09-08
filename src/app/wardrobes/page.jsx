// Complete Wardrobes Page with Gallery Integration
'use client';
import GenericHero from '@/components/common/GenericHero';
import WardrobeGallery from '@/components/common/WardrobeGallery';
import WardrobeStackingCards from '@/components/common/WardrobeStackingCards';
import NomaticMarqueeStripe from '@/components/marque-stripes/NomaticMarqueeStripe';
import { wardrobeFinishesData, wardrobeHeroData, wardrobeIntroData } from '@/data/wardrobe';
import { wardrobeGalleryData } from '@/data/wardrobeGalleryData';


const WardrobesPage = () => {
  return (
    <>
      {/* Hero Section */}
      <GenericHero 
        title={wardrobeHeroData.title}
        images={wardrobeHeroData.images}
        height="90vh"
        showCursor={true}
      />
      
      {/* Marquee Stripe */}
      <NomaticMarqueeStripe />
      
      {/* Stacking Cards Section */}
      <WardrobeStackingCards 
        cards={wardrobeFinishesData}
        introTitle={wardrobeIntroData.title}
        introDescription={wardrobeIntroData.description}
      />

      {/* Wardrobe Gallery Section */}
      <WardrobeGallery galleryData={wardrobeGalleryData} />
    </>
  );
};

export default WardrobesPage;
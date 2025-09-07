// Complete Kitchens Page with Gallery Integration
'use client';
import GenericHero from '@/components/common/GenericHero';
import KitchenGallery from '@/components/common/KitchenGallery';
import StackingCards from '@/components/common/StackingCards';
import NomaticMarqueeStripe from '@/components/marque-stripes/NomaticMarqueeStripe';
import { kitchenGalleryData } from '@/data/kitchenGalleryData';
import { kitchenFinishesData, kitchenHeroData, kitchenIntroData } from '@/data/kitchens';

const KitchensPage = () => {
  return (
    <>
      {/* Hero Section */}
      <GenericHero 
        title={kitchenHeroData.title}
        images={kitchenHeroData.images}
        height="90vh"
        showCursor={true}
      />
      
      {/* Marquee Stripe */}
      <NomaticMarqueeStripe />
      
      {/* Stacking Cards Section */}
      <StackingCards 
        cards={kitchenFinishesData}
        introTitle={kitchenIntroData.title}
        introDescription={kitchenIntroData.description}
      />

      {/* Kitchen Gallery Section */}
      <KitchenGallery galleryData={kitchenGalleryData} />
    </>
  );
};

export default KitchensPage;
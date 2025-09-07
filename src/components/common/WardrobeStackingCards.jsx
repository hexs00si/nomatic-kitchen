// Fixed Wardrobe Stacking Cards Component
'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import Image from 'next/image';
import { useRef } from 'react';

export const WardrobeStackingCard = ({
  i,
  title,
  description,
  category,
  type,
  image,
  color,
  progress,
  range,
  targetScale,
}) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  // Wardrobe-specific color scheme
  const getCardColors = (baseColor) => {
    const colorMap = {
      '#8B4513': { // Saddle brown - Laminate
        bg: 'linear-gradient(135deg, #F5F5DC 0%, #E6E6E6 100%)',
        text: '#2F1B14',
        accent: '#8B4513',
        categoryBg: 'rgba(139, 69, 19, 0.1)',
        categoryText: '#8B4513'
      },
      '#2F4F4F': { // Dark slate gray - Acrylic
        bg: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)',
        text: '#FFFFFF',
        accent: '#4CAF50',
        categoryBg: 'rgba(76, 175, 80, 0.15)',
        categoryText: '#4CAF50'
      },
      '#483D8B': { // Dark slate blue - PU Plain
        bg: 'linear-gradient(135deg, #F8F8FF 0%, #E6E6FA 100%)',
        text: '#2C2C54',
        accent: '#483D8B',
        categoryBg: 'rgba(72, 61, 139, 0.1)',
        categoryText: '#483D8B'
      },
      '#8B0000': { // Dark red - PU Fluted
        bg: 'linear-gradient(135deg, #2C1810 0%, #1A0E0A 100%)',
        text: '#FFFFFF',
        accent: '#FF6B6B',
        categoryBg: 'rgba(255, 107, 107, 0.15)',
        categoryText: '#FF6B6B'
      },
      '#191970': { // Midnight blue - Lacquered Glass
        bg: 'linear-gradient(135deg, #F0F8FF 0%, #E0F6FF 100%)',
        text: '#191970',
        accent: '#00CED1',
        categoryBg: 'rgba(0, 206, 209, 0.1)',
        categoryText: '#00CED1'
      },
      '#2F2F2F': { // Dark gray - Glass Mirror
        bg: 'linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)',
        text: '#1F1F1F',
        accent: '#2F2F2F',
        categoryBg: 'rgba(47, 47, 47, 0.1)',
        categoryText: '#2F2F2F'
      },
      '#654321': { // Dark brown - Leatherite
        bg: 'linear-gradient(135deg, #D2B48C 0%, #DEB887 100%)',
        text: '#3E2723',
        accent: '#8D6E63',
        categoryBg: 'rgba(141, 110, 99, 0.15)',
        categoryText: '#8D6E63'
      },
      '#556B2F': { // Dark olive - PU Sandwich
        bg: 'linear-gradient(135deg, #2E2E2E 0%, #1C1C1C 100%)',
        text: '#FFFFFF',
        accent: '#8BC34A',
        categoryBg: 'rgba(139, 195, 74, 0.15)',
        categoryText: '#8BC34A'
      },
      '#4B0082': { // Indigo - Wallpaper Profile
        bg: 'linear-gradient(135deg, #E6E6FA 0%, #D8BFD8 100%)',
        text: '#4B0082',
        accent: '#9C27B0',
        categoryBg: 'rgba(156, 39, 176, 0.1)',
        categoryText: '#9C27B0'
      },
      '#A0522D': { // Sienna - Walk-in
        bg: 'linear-gradient(135deg, #F5DEB3 0%, #DEB887 100%)',
        text: '#5D4E37',
        accent: '#D2691E',
        categoryBg: 'rgba(210, 105, 30, 0.15)',
        categoryText: '#D2691E'
      },
      '#708090': { // Slate gray - All-glass
        bg: 'linear-gradient(135deg, #F8F8FF 0%, #F0F8FF 100%)',
        text: '#2F4F4F',
        accent: '#4682B4',
        categoryBg: 'rgba(70, 130, 180, 0.1)',
        categoryText: '#4682B4'
      },
      '#4682B4': { // Steel blue - Sliders
        bg: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)',
        text: '#FFFFFF',
        accent: '#60A5FA',
        categoryBg: 'rgba(96, 165, 250, 0.15)',
        categoryText: '#60A5FA'
      },
      '#B8860B': { // Dark goldenrod
        bg: 'linear-gradient(135deg, #FFF8DC 0%, #FFEBCD 100%)',
        text: '#8B6914',
        accent: '#DAA520',
        categoryBg: 'rgba(218, 165, 32, 0.15)',
        categoryText: '#DAA520'
      },
      '#8B008B': { // Dark magenta
        bg: 'linear-gradient(135deg, #4A0E4E 0%, #2E0631 100%)',
        text: '#FFFFFF',
        accent: '#E91E63',
        categoryBg: 'rgba(233, 30, 99, 0.15)',
        categoryText: '#E91E63'
      },
      '#CD853F': { // Peru
        bg: 'linear-gradient(135deg, #FFF8DC 0%, #F5DEB3 100%)',
        text: '#8B4513',
        accent: '#D2691E',
        categoryBg: 'rgba(210, 105, 30, 0.15)',
        categoryText: '#D2691E'
      },
      '#8B7355': { // Burlywood4
        bg: 'linear-gradient(135deg, #F5F5DC 0%, #DEB887 100%)',
        text: '#654321',
        accent: '#A0522D',
        categoryBg: 'rgba(160, 82, 45, 0.15)',
        categoryText: '#A0522D'
      }
    };
    return colorMap[baseColor] || colorMap['#8B4513'];
  };

  const cardColors = getCardColors(color);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0'
    >
      <motion.div
        style={{
          background: cardColors.bg,
          scale,
          top: `calc(-5vh + ${i * 20}px)`, // Reduced offset for better stacking
          color: cardColors.text
        }}
        className={`flex flex-col relative h-[600px] w-[90%] max-w-6xl rounded-3xl p-8 md:p-12 origin-top shadow-2xl border border-opacity-20`}
      >
        <div className="mb-8">
          <div 
            className="inline-block px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
            style={{ 
              backgroundColor: cardColors.categoryBg,
              color: cardColors.categoryText
            }}
          >
            {category}
          </div>
          <h2 className='text-3xl md:text-4xl font-bold mb-3 leading-tight'>{title}</h2>
          <div className="text-lg font-medium opacity-80">
            {type}
          </div>
        </div>
        
        <div className={`flex h-full gap-8 md:gap-12`}>
          <div className={`w-[45%] flex flex-col justify-center`}>
            <p className='text-base md:text-lg leading-relaxed mb-8 opacity-90'>{description}</p>
            <span className='flex items-center gap-3'>
              <button
                onClick={() => {
                  if (window.scrollToWardrobeGallery) {
                    window.scrollToWardrobeGallery(category);
                  }
                }}
                className='inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg'
                style={{ 
                  backgroundColor: cardColors.accent,
                  color: cardColors.bg.includes('F5F5DC') || cardColors.bg.includes('F8F8FF') ? '#FFFFFF' : cardColors.text === '#FFFFFF' ? '#000000' : '#FFFFFF'
                }}
              >
                View in Gallery
                <svg
                  width='16'
                  height='9'
                  viewBox='0 0 22 12'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                    fill='currentColor'
                  />
                </svg>
              </button>
            </span>
          </div>

          <div className={`relative w-[55%] h-full rounded-2xl overflow-hidden shadow-2xl`}>
            <motion.div
              className={`w-full h-full`}
              style={{ scale: imageScale }}
            >
              <Image 
                fill 
                src={image} 
                alt={title} 
                className='object-cover' 
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function WardrobeStackingCards({ cards, introTitle, introDescription }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <ReactLenis root>
      <main className='bg-brand-dark text-white' ref={container}>
        {/* Intro Section */}
        {(introTitle || introDescription) && (
          <section className='min-h-[80vh] w-full bg-brand-dark grid place-content-center relative px-4'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
            
            <div className="relative z-10 max-w-5xl mx-auto text-center">
              {introTitle && (
                <h1 className='text-5xl md:text-6xl lg:text-8xl font-bold mb-8 tracking-tight leading-[110%]'>
                  {introTitle}
                </h1>
              )}
              {introDescription && (
                <p className='text-xl md:text-2xl opacity-85 leading-relaxed max-w-4xl mx-auto'>
                  {introDescription}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Stacking Cards Section */}
        <section className='text-white w-full bg-brand-dark pb-20'>
          {cards.map((card, i) => {
            // Fixed scaling calculation for 13 cards - matches kitchen logic
            const targetScale = 1 - ((cards.length - i) * 0.03);
            const range = [i * 0.15, (i + 1) * 0.15]; // Better range distribution
            
            return (
              <WardrobeStackingCard
                key={`card_${i}`}
                i={i}
                title={card.title}
                description={card.description}
                category={card.category}
                type={card.type}
                image={card.image}
                color={card.color}
                progress={scrollYProgress}
                range={range}
                targetScale={targetScale}
              />
            );
          })}
        </section>
      </main>
    </ReactLenis>
  );
}
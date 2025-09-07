// Thanks to Oliver: https://www.youtube.com/@olivierlarose1
'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import Image from 'next/image';
import { useRef } from 'react';

export const StackingCard = ({
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

  // Better color scheme based on kitchen theme
  const getCardColors = (baseColor) => {
    const colorMap = {
      '#EB1B26': { // brand-identity (red)
        bg: 'linear-gradient(135deg, #2C1810 0%, #1F0F0A 100%)',
        text: '#FFFFFF',
        accent: '#EB1B26',
        categoryBg: 'rgba(235, 27, 38, 0.1)',
        categoryText: '#EB1B26'
      },
      '#1F1E1E': { // brand-dark
        bg: 'linear-gradient(135deg, #F5F5F0 0%, #E8E8E3 100%)',
        text: '#1F1E1E',
        accent: '#8B4513',
        categoryBg: 'rgba(31, 30, 30, 0.1)',
        categoryText: '#1F1E1E'
      },
      '#302F30': { // brand-dark-secondary
        bg: 'linear-gradient(135deg, #4A4A4A 0%, #2A2A2A 100%)',
        text: '#FFFFFF',
        accent: '#D4AF37',
        categoryBg: 'rgba(212, 175, 55, 0.15)',
        categoryText: '#D4AF37'
      },
      '#F0F0F0': { // brand-light
        bg: 'linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%)',
        text: '#F0F0F0',
        accent: '#40E0D0',
        categoryBg: 'rgba(64, 224, 208, 0.15)',
        categoryText: '#40E0D0'
      },
      '#ECECEC': { // brand-background
        bg: 'linear-gradient(135deg, #2F4F4F 0%, #1C3333 100%)',
        text: '#FFFFFF',
        accent: '#FF6B35',
        categoryBg: 'rgba(255, 107, 53, 0.15)',
        categoryText: '#FF6B35'
      }
    };
    return colorMap[baseColor] || colorMap['#1F1E1E'];
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
                  if (window.scrollToKitchenGallery) {
                    window.scrollToKitchenGallery(category);
                  }
                }}
                className='inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg'
                style={{ 
                  backgroundColor: cardColors.accent,
                  color: cardColors.bg.includes('F5F5F0') ? '#FFFFFF' : cardColors.text === '#FFFFFF' ? '#000000' : '#FFFFFF'
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

export default function StackingCards({ cards, introTitle, introDescription }) {
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
            // Improved scaling calculation for better animation
            const targetScale = 1 - ((cards.length - i) * 0.03);
            const range = [i * 0.15, (i + 1) * 0.15]; // Better range distribution
            
            return (
              <StackingCard
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
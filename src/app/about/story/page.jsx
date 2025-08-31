
'use client'

import AboutStoryPageHero from '@/components/sections/about-story/AboutStoryPageHero'
import NomaticMarqueeStripe from '@/components/marque-stripes/NomaticMarqueeStripe'
import AboutStoryFactory from '@/components/sections/about-story/AboutStoryFactory'
import SimpleTextMarquee from '@/components/marque-stripes/SimpleTextMarquee'
import AboutDirectorWords from '@/components/sections/about-story/AboutDirectorWords'

const AboutStoryPage = () => {
  return (
    <main className="relative overflow-hidden">
      {/* 1. Hero Section */}
      <AboutStoryPageHero />
      
      {/* 2. First Marquee */}
      <NomaticMarqueeStripe />
      
      {/* 3. Our Factory */}
      <AboutStoryFactory />
      
      {/* 4. Second Marquee */}
      <SimpleTextMarquee 
        text="QUALITY • INNOVATION • EXCELLENCE • CRAFTSMANSHIP"
        bgColor="bg-brand-identity" 
        textColor="text-white"
      />
      
      {/* 5. Words of Director */}
      <AboutDirectorWords />
    </main>
  )
}

export default AboutStoryPage 
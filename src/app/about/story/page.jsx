
'use client'

import FollowUsMarqueeStripe from '@/components/marque-stripes/FollowUsMarqueeStripe'
import NomaticMarqueeStripe from '@/components/marque-stripes/NomaticMarqueeStripe'
import AboutDirectorWords from '@/components/sections/about-story/AboutDirectorWords'
import AboutStoryFactory from '@/components/sections/about-story/AboutStoryFactory'
import AboutStoryPageHero from '@/components/sections/about-story/AboutStoryPageHero'

const AboutStoryPage = () => {
  return (
    <main className="relative overflow-hidden">
      <AboutStoryPageHero />
      <NomaticMarqueeStripe />
      <AboutStoryFactory />
      <FollowUsMarqueeStripe/>
      <AboutDirectorWords />
    </main>
  )
}

export default AboutStoryPage 
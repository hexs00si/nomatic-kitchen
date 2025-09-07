
'use client'

import FollowUsMarqueeStripe from '@/components/marque-stripes/FollowUsMarqueeStripe'
import NomaticMarqueeStripe from '@/components/marque-stripes/NomaticMarqueeStripe'
import AboutDirectorWords from '@/components/sections/about-story/AboutDirectorWords'
import AboutStoryFactory from '@/components/sections/about-story/AboutStoryFactory'
import AboutStoryHero from '@/components/sections/about-story/AboutStoryHero'

const AboutStoryPage = () => {
  return (
    <main className="relative overflow-hidden">
      <AboutStoryHero />
      <NomaticMarqueeStripe />
      <AboutStoryFactory />
      <FollowUsMarqueeStripe/>
      <AboutDirectorWords />
    </main>
  )
}

export default AboutStoryPage 
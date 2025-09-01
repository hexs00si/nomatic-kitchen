

'use client'

import FollowUsMarqueeStripe from '@/components/marque-stripes/FollowUsMarqueeStripe'
import NomaticMarqueeStripe from '@/components/marque-stripes/NomaticMarqueeStripe'
import AboutTeamBentoGrid from '@/components/sections/about-team/AboutTeamBentoGrid'
import AboutTeamCareers from '@/components/sections/about-team/AboutTeamCareers'
import AboutTeamIntro from '@/components/sections/about-team/AboutTeamIntro'

const AboutTeamPage = () => {
  return (
    <main className="relative overflow-hidden">
      <AboutTeamIntro />
      <NomaticMarqueeStripe />
      <AboutTeamBentoGrid />
      <FollowUsMarqueeStripe/>
      <AboutTeamCareers />
    </main>
  )
}

export default AboutTeamPage
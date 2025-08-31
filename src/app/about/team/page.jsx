

'use client'

import AboutTeamIntro from '@/components/sections/about-team/AboutTeamIntro'
import AboutTeamBentoGrid from '@/components/sections/about-team/AboutTeamBentoGrid'
import AboutTeamCareers from '@/components/sections/about-team/AboutTeamCareers'

const AboutTeamPage = () => {
  return (
    <main className="relative overflow-hidden">
      {/* 1. Intro Section */}
      <AboutTeamIntro />
      
      {/* 2. Bento Grid */}
      <AboutTeamBentoGrid />
      
      {/* 3. Careers */}
      <AboutTeamCareers />
    </main>
  )
}

export default AboutTeamPage
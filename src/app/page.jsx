'use client'

import HomeFAQ from '@/components/sections/home/HomeFAQ'
import HomeMeetNomatic from '@/components/sections/home/HomeMeetNomatic'
import HomeOurHappyClients from '@/components/sections/home/HomeOurHappyClients'
import HomeOurProjects from '@/components/sections/home/HomeOurProjects'
import HomeOurServices from '@/components/sections/home/HomeOurServices'
import HomeSectionHero from '@/components/sections/home/HomeSectionHero'

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <HomeSectionHero />
      <HomeMeetNomatic/>
      <HomeOurServices />
      <HomeOurProjects />
      <HomeOurHappyClients />
      <HomeFAQ />
    </main>
  )
}

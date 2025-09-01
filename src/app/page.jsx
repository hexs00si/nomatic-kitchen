'use client'

import HomeFAQ from '@/components/sections/home/HomeFAQ'
import HomeOurHappyClients from '@/components/sections/home/HomeOurHappyClients'
import HomeOurProjects from '@/components/sections/home/HomeOurProjects'
import HomeOurServices from '@/components/sections/home/HomeOurServices'
import HomeSectionHero from '@/components/sections/home/HomeSectionHero'

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <HomeSectionHero />
      <HomeOurServices />
      <HomeOurProjects />
      <HomeOurHappyClients />
      <HomeFAQ />
    </main>
  )
}

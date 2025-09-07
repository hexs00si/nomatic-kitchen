"use client";

import GenericHero from "@/components/common/GenericHero";
import { aboutTeamData } from "@/data/aboutTeam";

const AboutTeamIntro = () => {
  const { hero } = aboutTeamData;

  return (
    <GenericHero 
      title="Our Team"
      images={hero.heroImages}
    />
  );
};

export default AboutTeamIntro;

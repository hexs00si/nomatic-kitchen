import GenericHero from "@/components/common/GenericHero";
import { aboutStoryData } from "@/data/aboutStory";

const AboutStoryHero = () => {
  const { storyHero } = aboutStoryData;

  return (
    <GenericHero
      title={storyHero.title}
      images={storyHero.heroImages}
      showCursor={true}
    />
  );
};

export default AboutStoryHero;

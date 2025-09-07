import TextScrollAnimation from '../../common/TextScrollAnimation'

export default function ExperienceStudio() {
  const studioText = "Step into our Experience Studio and discover interiors that truly define you. Whether you're designing a modular kitchen, a tailored wardrobe, or a media wall, we're here to bring your vision to life."
  const highlightWord = "Experience Studio"

  return (
    <TextScrollAnimation
      text={studioText}
      highlightWord={highlightWord}
      containerHeight="300vh"
      backgroundGradient="linear-gradient(135deg, #383838 0%, #1F1E1E 100%)"
      showTwinklingDots={true}
      showDottedGrid={true}
      maxWidth="max-w-4xl"
    />
  )
}
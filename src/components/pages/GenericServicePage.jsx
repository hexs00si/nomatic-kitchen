
import GenericHero from '../common/GenericHero'
import TextScrollAnimation from '../common/TextScrollAnimation'
import SimpleTextMarquee from '../marque-stripes/SimpleTextMarquee'

const GenericServicePage = ({ 
  // Hero section props
  heroTitle,
  heroSubtitle,
  heroImages,
  heroBackgroundImage,
  
  // Text scroll animation props
  scrollText,
  highlightWord,
  scrollContainerHeight = "300vh",
  scrollBackgroundGradient = "linear-gradient(135deg, #383838 0%, #1F1E1E 100%)",
  showTwinklingDots = true,
  showDottedGrid = true,
  
  // Marquee props
  marqueeText = "NOMATIC KITCHEN",
  marqueeSpeed = 50,
  
  // Additional content
  children
}) => {
  return (
    <div className="min-h-screen">
      {/* Generic Hero Section */}
      {heroTitle && (
        <GenericHero
          title={heroTitle}
          subtitle={heroSubtitle}
          images={heroImages}
          backgroundImage={heroBackgroundImage}
        />
      )}
      
      {/* Marquee Stripe */}
      <SimpleTextMarquee 
        text={marqueeText}
        speed={marqueeSpeed}
      />
      
      {/* Text Scroll Animation Section */}
      {scrollText && (
        <TextScrollAnimation
          text={scrollText}
          highlightWord={highlightWord}
          containerHeight={scrollContainerHeight}
          backgroundGradient={scrollBackgroundGradient}
          showTwinklingDots={showTwinklingDots}
          showDottedGrid={showDottedGrid}
        />
      )}
      
      {/* Additional Content */}
      {children}
    </div>
  )
}

export default GenericServicePage
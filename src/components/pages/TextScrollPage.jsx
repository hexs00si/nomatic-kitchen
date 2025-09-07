import TextScrollAnimation from '../common/TextScrollAnimation'

const TextScrollPage = ({ 
  // Text scroll animation props
  scrollText,
  highlightWord,
  containerHeight = "300vh",
  backgroundGradient = "linear-gradient(135deg, #383838 0%, #1F1E1E 100%)",
  showTwinklingDots = true,
  showDottedGrid = true,
  textClassName = "",
  maxWidth = "max-w-4xl",
  
  // Page wrapper props
  beforeContent,
  afterContent,
  className = ""
}) => {
  return (
    <div className={`min-h-screen ${className}`}>
      {/* Content before text scroll animation */}
      {beforeContent}
      
      {/* Text Scroll Animation */}
      <TextScrollAnimation
        text={scrollText}
        highlightWord={highlightWord}
        containerHeight={containerHeight}
        backgroundGradient={backgroundGradient}
        showTwinklingDots={showTwinklingDots}
        showDottedGrid={showDottedGrid}
        textClassName={textClassName}
        maxWidth={maxWidth}
      />
      
      {/* Content after text scroll animation */}
      {afterContent}
    </div>
  )
}

export default TextScrollPage

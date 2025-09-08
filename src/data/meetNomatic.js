export const meetNomaticContent = [
  {
    id: "Spaces that evolve with you",
    text: "At Nomatic , we believe that building a home is more than just a process - it's an emotional investment",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    highlight: "visions to life",
  },
  {
    id: "Design that moves with life",
    text: "Every wall , every corner , every finish tells a story. That's why we specialize in mordern luxury interiors and premium furniture that not only elevate your space but also reflect your vision. ",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    highlight: "premium spaces",
  },
  {
    id: "Where dreams take shape",
    text: "We deliver spaces that are both functional and deeply personal. From design to installation, we ensure a carpenter-free experience, delivered with precision, speed, and zero delays. ",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    highlight: "German engineering precision",
  },
  {
    id: "Every corner, every you",
    text: "With over 20 expert installation teams, a global network, and a 10-year after-sales service, Nomatic blends German precision with an Indian soul, delivering luxury interiors that reflect who you are and how you want to live.",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    highlight: "evolve with you",
  },
];

export const meetNomaticSection = {
  title: "Why Nomatic",
  subtitle: "Hi, Come on in.",
  greeting: "Spaces that evolve with you",
  content: meetNomaticContent,
};

export const getMeetNomaticContentByIndex = () => {
  return meetNomaticContent[index] || null;
};

export const getImageForParagraph = () => {
  const content = getMeetNomaticContentByIndex(paragraphIndex);
  return content ? content.image : meetNomaticContent[0].image;
};

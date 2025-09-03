export const meetNomaticContent = [
  {
    id: "intro",
    text: "At Nomatic, we bring your visions to life. We don't just build; instead we shape spaces that evolve with you. Designed for those who move, grow, and reinvent themselves, our modular interiors integrate German engineering precision with the soulful essence of Indian living.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    highlight: "visions to life",
  },
  {
    id: "premium-spaces",
    text: "We create premium spaces that are intelligent, intuitive, and uniquely tailored to you. From modular kitchens and bespoke wardrobes to artistically curated bars and media walls, every element is structured to reflect who you are today and who you will become tomorrow.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    highlight: "premium spaces",
  },
  {
    id: "german-precision",
    text: "Our modular interiors integrate German engineering precision with the soulful essence of Indian living, creating spaces that are both functional and deeply personal.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    highlight: "German engineering precision",
  },
  {
    id: "evolving-spaces",
    text: "Designed for those who move, grow, and reinvent themselves. Every element is structured to reflect who you are today and who you will become tomorrow.",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    highlight: "evolve with you",
  },
];

export const meetNomaticSection = {
  title: "Meet Nomatic!",
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

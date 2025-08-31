export const meetNomaticContent = [
  {
    id: "intro",
    text: "At Nomatic, we bring your visions to life. We don't just build; instead we shape spaces that evolve with you. Designed for those who move, grow, and reinvent themselves, our modular interiors integrate German engineering precision with the soulful essence of Indian living.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
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
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
    highlight: "German engineering precision",
  },
  {
    id: "evolving-spaces",
    text: "Designed for those who move, grow, and reinvent themselves. Every element is structured to reflect who you are today and who you will become tomorrow.",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
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

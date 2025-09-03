"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const styles = [
  {
    title: "Minimalist",
    subtitle: "Pure & Simple",
    desc: "Clean lines, open spaces, simplicity, and functionality.",
    img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Industrial",
    subtitle: "Raw & Bold",
    desc: "Exposed materials, raw textures, bold, and modern aesthetics.",
    img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Futuristic",
    subtitle: "Advanced & Visionary",
    desc: "Futuristic design, advanced technology, sleek, and visionary.",
    img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80",
  },
];

export default function HomeSignatureStyle() {
  const sectionRef = useRef(null);
  const card1 = useRef(null);
  const card2 = useRef(null);
  const card3 = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });
      tl.fromTo(
        [card1.current, card2.current, card3.current],
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }
      );
    });
    return () => ctx.revert(); // clean-up
  }, []);

  return (
    <section ref={sectionRef} className="bg-white py-24">
      <div className="container mx-auto px-6">
        {/* header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Timeless Architecture, <br />
            <span className="text-red-600">Modern Innovation</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-600">
            We blend classic and contemporary architectural styles, creating
            visually stunning, functional, and sustainable spaces that stand the
            test of time with elegance.
          </p>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div
            ref={card1}
            className="group relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={styles[0].img}
              alt={styles[0].title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-6 text-white">
              <span className="text-sm uppercase tracking-wider opacity-80">
                {styles[0].subtitle}
              </span>
              <h3 className="text-2xl font-bold mt-1">{styles[0].title}</h3>
              <p className="mt-2 text-sm opacity-90">{styles[0].desc}</p>
            </div>
          </div>

          <div
            ref={card2}
            className="group relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={styles[1].img}
              alt={styles[1].title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-6 text-white">
              <span className="text-sm uppercase tracking-wider opacity-80">
                {styles[1].subtitle}
              </span>
              <h3 className="text-2xl font-bold mt-1">{styles[1].title}</h3>
              <p className="mt-2 text-sm opacity-90">{styles[1].desc}</p>
            </div>
          </div>

          <div
            ref={card3}
            className="group relative h-96 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <img
              src={styles[2].img}
              alt={styles[2].title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-6 text-white">
              <span className="text-sm uppercase tracking-wider opacity-80">
                {styles[2].subtitle}
              </span>
              <h3 className="text-2xl font-bold mt-1">{styles[2].title}</h3>
              <p className="mt-2 text-sm opacity-90">{styles[2].desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
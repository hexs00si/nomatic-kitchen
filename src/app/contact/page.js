"use client";

import LetsTalkCard from "@/components/sections/LetsTalkCard";
import EmailSection from "@/components/sections/EmailSection";
import FindShowroomSection from "@/components/sections/FindShowroom";


export default function ContactPage() {
  return (
    <div>
      <FindShowroomSection />
      <EmailSection />
      <LetsTalkCard /> 
    </div>
  );
}

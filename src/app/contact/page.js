"use client";

import LetsTalkCard from "@/components/sections/LetsTalkCard";
import EmailSection from "@/components/sections/EmailSection";
import FindShowroomSection from "@/components/sections/FindShowroom";
import WelcomeContact from "@/components/sections/welcomecontact";


export default function ContactPage() {
  return (
    <div>
      <WelcomeContact />
      <FindShowroomSection />
      <EmailSection />
      <LetsTalkCard /> 
    </div>
  );
}

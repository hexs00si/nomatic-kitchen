"use client";

import EmailSection from "@/components/sections/contact/EmailSection";
import FindShowroomSection from "@/components/sections/contact/FindShowroom";
import LetsTalkCard from "@/components/sections/contact/LetsTalkCard";
import WelcomeContact from "@/components/sections/contact/welcomecontact";


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

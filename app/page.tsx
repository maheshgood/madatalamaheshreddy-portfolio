import { Hero } from "@/components/sections/Hero";
import { ToolsSuite } from "@/components/sections/ToolsSuite";
import { Capabilities } from "@/components/sections/Capabilities";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ToolsSuite />
      <Capabilities />
      <CaseStudies />
      <RoiCalculator />
      <Experience />
      <Contact />
    </>
  );
}

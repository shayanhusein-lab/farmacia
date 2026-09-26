import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { WhatIs } from "@/components/sections/what-is";
import { MissionVision } from "@/components/sections/mission-vision";
import { Stats } from "@/components/sections/stats";
import { IssueChapters } from "@/components/sections/issue-chapters";
import { HumanSide } from "@/components/sections/human-side";
import { ReaderJourney } from "@/components/sections/reader-journey";
import { Audience } from "@/components/sections/audience";
import { Team } from "@/components/sections/team";
import { Contribute } from "@/components/sections/contribute";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="top">
        <Hero />
        <Marquee />
        <WhatIs />
        <MissionVision />
        <Stats />
        <IssueChapters />
        <HumanSide />
        <ReaderJourney />
        <Audience />
        <Team />
        <Contribute />
      </main>
      <SiteFooter />
    </>
  );
}

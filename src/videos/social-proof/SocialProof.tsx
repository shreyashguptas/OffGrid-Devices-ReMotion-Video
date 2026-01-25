import { AbsoluteFill, Sequence } from "remotion";
import { DarkOpen } from "../../scenes/DarkOpen";
import { LogoCTA } from "../../scenes/LogoCTA";
import { COLORS } from "../../lib/colors";
import { SocialIntro } from "./scenes/SocialIntro";
import { TestimonialCarousel } from "./scenes/TestimonialCarousel";
import { StatsShowcase } from "./scenes/StatsShowcase";
import { TrustBadges } from "./scenes/TrustBadges";

export const SocialProof: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Scene 1: Dark Open (0-1.5s = frames 0-45) */}
      <Sequence from={0} durationInFrames={45}>
        <DarkOpen />
      </Sequence>

      {/* Scene 2: Social Intro (1.5-3.5s = frames 45-105) */}
      <Sequence from={45} durationInFrames={60}>
        <SocialIntro />
      </Sequence>

      {/* Scene 3: Testimonial Carousel (3.5-9s = frames 105-270) */}
      <Sequence from={105} durationInFrames={165}>
        <TestimonialCarousel />
      </Sequence>

      {/* Scene 4: Stats Showcase (9-12.5s = frames 270-375) */}
      <Sequence from={270} durationInFrames={105}>
        <StatsShowcase />
      </Sequence>

      {/* Scene 5: Trust Badges (12.5-15s = frames 375-450) */}
      <Sequence from={375} durationInFrames={75}>
        <TrustBadges />
      </Sequence>

      {/* Scene 6: Logo + CTA (15-18s = frames 450-540) */}
      <Sequence from={450} durationInFrames={90}>
        <LogoCTA />
      </Sequence>
    </AbsoluteFill>
  );
};

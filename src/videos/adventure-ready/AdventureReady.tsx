import { AbsoluteFill, Sequence } from "remotion";
import { DarkOpen } from "../../scenes/DarkOpen";
import { LogoCTA } from "../../scenes/LogoCTA";
import { COLORS } from "../../lib/colors";
import { AdventureHero } from "./scenes/AdventureHero";
import { UseCaseShowcase } from "./scenes/UseCaseShowcase";
import { TerrainProof } from "./scenes/TerrainProof";
import { CallToAction } from "./scenes/CallToAction";

export const AdventureReady: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Scene 1: Dark Open (0-1.5s = frames 0-45) */}
      <Sequence from={0} durationInFrames={45}>
        <DarkOpen />
      </Sequence>

      {/* Scene 2: Adventure Hero (1.5-4.5s = frames 45-135) */}
      <Sequence from={45} durationInFrames={90}>
        <AdventureHero />
      </Sequence>

      {/* Scene 3: Use Case Showcase (4.5-10s = frames 135-300) */}
      <Sequence from={135} durationInFrames={165}>
        <UseCaseShowcase />
      </Sequence>

      {/* Scene 4: Terrain Proof (10-13.5s = frames 300-405) */}
      <Sequence from={300} durationInFrames={105}>
        <TerrainProof />
      </Sequence>

      {/* Scene 5: Call to Action (13.5-15s = frames 405-450) */}
      <Sequence from={405} durationInFrames={45}>
        <CallToAction />
      </Sequence>

      {/* Scene 6: Logo + CTA (15-18s = frames 450-540) */}
      <Sequence from={450} durationInFrames={90}>
        <LogoCTA />
      </Sequence>
    </AbsoluteFill>
  );
};

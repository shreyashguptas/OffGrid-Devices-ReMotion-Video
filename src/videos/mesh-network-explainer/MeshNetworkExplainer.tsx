import { AbsoluteFill, Sequence } from "remotion";
import { DarkOpen } from "../../scenes/DarkOpen";
import { LogoCTA } from "../../scenes/LogoCTA";
import { COLORS } from "../../lib/colors";
import { HeroTitle } from "./scenes/HeroTitle";
import { NetworkVisualization } from "./scenes/NetworkVisualization";
import { HowItWorks } from "./scenes/HowItWorks";
import { RangeDemo } from "./scenes/RangeDemo";

export const MeshNetworkExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Scene 1: Dark Open (0-1.5s = frames 0-45) */}
      <Sequence from={0} durationInFrames={45}>
        <DarkOpen />
      </Sequence>

      {/* Scene 2: Hero Title (1.5-4s = frames 45-120) */}
      <Sequence from={45} durationInFrames={75}>
        <HeroTitle />
      </Sequence>

      {/* Scene 3: Network Visualization (4-8s = frames 120-240) */}
      <Sequence from={120} durationInFrames={120}>
        <NetworkVisualization />
      </Sequence>

      {/* Scene 4: How It Works (8-12s = frames 240-360) */}
      <Sequence from={240} durationInFrames={120}>
        <HowItWorks />
      </Sequence>

      {/* Scene 5: Range Demo (12-15s = frames 360-450) */}
      <Sequence from={360} durationInFrames={90}>
        <RangeDemo />
      </Sequence>

      {/* Scene 6: Logo + CTA (15-18s = frames 450-540) */}
      <Sequence from={450} durationInFrames={90}>
        <LogoCTA />
      </Sequence>
    </AbsoluteFill>
  );
};

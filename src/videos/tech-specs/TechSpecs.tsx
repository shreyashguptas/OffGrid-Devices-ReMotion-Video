import { AbsoluteFill, Sequence } from "remotion";
import { DarkOpen } from "../../scenes/DarkOpen";
import { LogoCTA } from "../../scenes/LogoCTA";
import { COLORS } from "../../lib/colors";
import { SpecsIntro } from "./scenes/SpecsIntro";
import { RangeSpec } from "./scenes/RangeSpec";
import { BatterySpec } from "./scenes/BatterySpec";
import { ConnectivitySpec } from "./scenes/ConnectivitySpec";
import { SpecsSummary } from "./scenes/SpecsSummary";

export const TechSpecs: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Scene 1: Dark Open (0-1.5s = frames 0-45) */}
      <Sequence from={0} durationInFrames={45}>
        <DarkOpen />
      </Sequence>

      {/* Scene 2: Specs Intro (1.5-3.5s = frames 45-105) */}
      <Sequence from={45} durationInFrames={60}>
        <SpecsIntro />
      </Sequence>

      {/* Scene 3: Range Spec (3.5-6.5s = frames 105-195) */}
      <Sequence from={105} durationInFrames={90}>
        <RangeSpec />
      </Sequence>

      {/* Scene 4: Battery Spec (6.5-9.5s = frames 195-285) */}
      <Sequence from={195} durationInFrames={90}>
        <BatterySpec />
      </Sequence>

      {/* Scene 5: Connectivity Spec (9.5-12.5s = frames 285-375) */}
      <Sequence from={285} durationInFrames={90}>
        <ConnectivitySpec />
      </Sequence>

      {/* Scene 6: Specs Summary (12.5-15s = frames 375-450) */}
      <Sequence from={375} durationInFrames={75}>
        <SpecsSummary />
      </Sequence>

      {/* Scene 7: Logo + CTA (15-18s = frames 450-540) */}
      <Sequence from={450} durationInFrames={90}>
        <LogoCTA />
      </Sequence>
    </AbsoluteFill>
  );
};

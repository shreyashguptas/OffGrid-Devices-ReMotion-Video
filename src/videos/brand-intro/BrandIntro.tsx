import { AbsoluteFill, Audio, Sequence, staticFile } from "remotion";
import { DarkOpen } from "../../scenes/DarkOpen";
import { LogoCTA } from "../../scenes/LogoCTA";
import { TaglineReveal } from "./scenes/TaglineReveal";
import { ProductReveal } from "./scenes/ProductReveal";
import { FeatureFlash } from "./scenes/FeatureFlash";
import { COLORS } from "../../lib/colors";

// Set to true once you add audio/ambient.mp3 to public folder
const ENABLE_AUDIO = false;

export const BrandIntro: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Background audio - add your own mp3 to public/audio/ambient.mp3 */}
      {ENABLE_AUDIO && (
        <Audio src={staticFile("audio/ambient.mp3")} volume={0.3} />
      )}

      {/* Scene 1: Dark Open (0-2s = frames 0-60) */}
      <Sequence from={0} durationInFrames={60}>
        <DarkOpen />
      </Sequence>

      {/* Scene 2: Tagline Reveal (2-5s = frames 60-150) */}
      <Sequence from={60} durationInFrames={90}>
        <TaglineReveal />
      </Sequence>

      {/* Scene 3: Product Reveal (5-9s = frames 150-270) */}
      <Sequence from={150} durationInFrames={120}>
        <ProductReveal />
      </Sequence>

      {/* Scene 4: Feature Flash (9-12s = frames 270-360) */}
      <Sequence from={270} durationInFrames={90}>
        <FeatureFlash />
      </Sequence>

      {/* Scene 5: Logo + CTA (12-15s = frames 360-450) */}
      <Sequence from={360} durationInFrames={90}>
        <LogoCTA />
      </Sequence>
    </AbsoluteFill>
  );
};

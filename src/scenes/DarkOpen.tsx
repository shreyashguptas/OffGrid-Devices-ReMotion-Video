import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../lib/colors";

export const DarkOpen: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in the grid
  const gridOpacity = interpolate(frame, [0, 40], [0, 0.3], {
    extrapolateRight: "clamp",
  });

  // Generate grid dots
  const dots = [];
  const gridSize = 12;
  const spacing = 160;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const delay = (i + j) * 0.5;
      const dotOpacity = interpolate(
        frame,
        [delay, delay + 20],
        [0, 1],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      );

      // Subtle float animation
      const floatY = Math.sin((frame + i * 10 + j * 7) * 0.05) * 3;

      dots.push(
        <div
          key={`${i}-${j}`}
          style={{
            position: "absolute",
            left: i * spacing + 80,
            top: j * spacing + 60 + floatY,
            width: 4,
            height: 4,
            borderRadius: "50%",
            backgroundColor: COLORS.accent,
            opacity: dotOpacity * gridOpacity,
          }}
        />
      );
    }
  }

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        overflow: "hidden",
      }}
    >
      {dots}
    </AbsoluteFill>
  );
};

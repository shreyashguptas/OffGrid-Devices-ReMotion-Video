import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

const highlights = [
  {
    label: "Rugged Enclosure",
    description: "Military-grade durability",
    position: { x: -280, y: -120 },
    lineAngle: 45,
  },
  {
    label: "MagSafe Mount",
    description: "Secure attachment",
    position: { x: 280, y: -80 },
    lineAngle: -45,
  },
  {
    label: "LED Indicator",
    description: "Status at a glance",
    position: { x: -260, y: 100 },
    lineAngle: 30,
  },
  {
    label: "Antenna Array",
    description: "10km+ range",
    position: { x: 270, y: 130 },
    lineAngle: -30,
  },
];

export const DesignHighlights: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Product fade in
  const productProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const productOpacity = interpolate(productProgress, [0, 1], [0, 1]);
  const productScale = interpolate(productProgress, [0, 1], [0.9, 1]);

  // Float
  const floatY = Math.sin(frame * 0.05) * 8;

  // Active highlight (cycles)
  const highlightDuration = 25;
  const activeIndex = Math.floor((frame - 30) / highlightDuration) % highlights.length;

  // Fade out
  const fadeOut = interpolate(frame, [100, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeOut,
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 80,
          fontFamily: "Syne, sans-serif",
          fontSize: 48,
          fontWeight: 700,
          color: COLORS.text,
          opacity: interpolate(frame, [0, 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        Precision <span style={{ color: COLORS.accent }}>Engineering</span>
      </div>

      {/* Center product */}
      <div
        style={{
          position: "relative",
          opacity: productOpacity,
          transform: `scale(${productScale}) translateY(${floatY}px)`,
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${COLORS.accent}30 0%, transparent 60%)`,
            filter: "blur(40px)",
          }}
        />

        <Img
          src="https://i.etsystatic.com/61623051/r/il/9f66b4/7517364106/il_fullxfull.7517364106_5bbx.jpg"
          style={{
            width: 350,
            height: "auto",
            borderRadius: 20,
            position: "relative",
          }}
        />

        {/* Highlight callouts */}
        {highlights.map((highlight, index) => {
          const highlightDelay = 20 + index * 15;
          const isActive = frame > 30 && index === activeIndex;

          const calloutProgress = spring({
            frame: frame - highlightDelay,
            fps,
            config: SPRING_CONFIG,
          });

          const calloutOpacity = interpolate(calloutProgress, [0, 1], [0, isActive ? 1 : 0.4]);
          const calloutScale = interpolate(calloutProgress, [0, 1], [0.8, isActive ? 1.05 : 1]);

          // Line length
          const lineLength = 60;
          const radians = (highlight.lineAngle * Math.PI) / 180;
          const lineEndX = Math.cos(radians) * lineLength;
          const lineEndY = Math.sin(radians) * lineLength;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `calc(50% + ${highlight.position.x}px)`,
                top: `calc(50% + ${highlight.position.y}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: highlight.position.x < 0 ? "flex-end" : "flex-start",
                opacity: calloutOpacity,
                transform: `scale(${calloutScale})`,
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: highlight.position.x < 0 ? "auto" : 0,
                  right: highlight.position.x < 0 ? 0 : "auto",
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: isActive ? COLORS.accentLight : COLORS.accent,
                  boxShadow: isActive ? `0 0 20px ${COLORS.accent}` : "none",
                }}
              />

              {/* Line */}
              <svg
                width={Math.abs(lineEndX) + 20}
                height={Math.abs(lineEndY) + 20}
                style={{
                  position: "absolute",
                  left: highlight.position.x < 0 ? `calc(100% + 5px)` : -5,
                  top: -5,
                  overflow: "visible",
                }}
              >
                <line
                  x1={highlight.position.x < 0 ? Math.abs(lineEndX) : 0}
                  y1={0}
                  x2={highlight.position.x < 0 ? 0 : Math.abs(lineEndX)}
                  y2={Math.abs(lineEndY)}
                  stroke={isActive ? COLORS.accent : COLORS.accent}
                  strokeWidth={2}
                  opacity={0.6}
                />
              </svg>

              {/* Text */}
              <div
                style={{
                  marginTop: 20,
                  textAlign: highlight.position.x < 0 ? "right" : "left",
                }}
              >
                <div
                  style={{
                    fontFamily: "Syne, sans-serif",
                    fontSize: 20,
                    fontWeight: 600,
                    color: isActive ? COLORS.accent : COLORS.text,
                  }}
                >
                  {highlight.label}
                </div>
                <div
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: 14,
                    color: COLORS.textMuted,
                    marginTop: 4,
                  }}
                >
                  {highlight.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

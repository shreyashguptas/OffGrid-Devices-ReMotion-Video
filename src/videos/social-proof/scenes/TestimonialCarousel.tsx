import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../lib/colors";
import { SPRING_CONFIG } from "../../../lib/animations";

const testimonials = [
  {
    quote: "Saved our hiking group when we got separated in the backcountry. Absolute lifesaver!",
    author: "Sarah M.",
    role: "Mountain Guide",
    rating: 5,
  },
  {
    quote: "Finally, reliable communication without cell towers. Perfect for our sailing trips.",
    author: "James K.",
    role: "Yacht Captain",
    rating: 5,
  },
  {
    quote: "The mesh network feature is incredible. Our whole team stays connected effortlessly.",
    author: "Mike R.",
    role: "Search & Rescue",
    rating: 5,
  },
];

export const TestimonialCarousel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Each testimonial gets ~50 frames
  const testimonialDuration = 50;
  const activeIndex = Math.min(
    Math.floor(frame / testimonialDuration),
    testimonials.length - 1
  );

  // Fade out
  const fadeOut = interpolate(frame, [145, 165], [1, 0], {
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
      {testimonials.map((testimonial, index) => {
        const isActive = index === activeIndex;
        const testimonialFrame = frame - index * testimonialDuration;

        if (!isActive && testimonialFrame < 0) return null;

        const cardProgress = spring({
          frame: testimonialFrame,
          fps,
          config: SPRING_CONFIG,
        });

        const cardOpacity = isActive
          ? interpolate(cardProgress, [0, 1], [0, 1])
          : interpolate(testimonialFrame, [45, 50], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

        const cardScale = interpolate(cardProgress, [0, 1], [0.9, 1]);
        const cardY = interpolate(cardProgress, [0, 1], [40, 0]);

        if (cardOpacity <= 0) return null;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 1000,
              padding: 60,
              opacity: cardOpacity,
              transform: `scale(${cardScale}) translateY(${cardY}px)`,
            }}
          >
            {/* Quote mark */}
            <div
              style={{
                fontSize: 120,
                color: COLORS.accent,
                opacity: 0.3,
                lineHeight: 0.5,
                marginBottom: 20,
              }}
            >
              "
            </div>

            {/* Quote text */}
            <div
              style={{
                fontFamily: "Syne, sans-serif",
                fontSize: 42,
                fontWeight: 500,
                color: COLORS.text,
                textAlign: "center",
                lineHeight: 1.4,
                marginBottom: 50,
              }}
            >
              {testimonial.quote}
            </div>

            {/* Rating stars */}
            <div style={{ display: "flex", gap: 8, marginBottom: 25 }}>
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 28,
                    filter: `drop-shadow(0 0 8px ${COLORS.accent})`,
                  }}
                >
                  ⭐
                </span>
              ))}
            </div>

            {/* Author info */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <div
                style={{
                  fontFamily: "Syne, sans-serif",
                  fontSize: 24,
                  fontWeight: 600,
                  color: COLORS.accent,
                }}
              >
                {testimonial.author}
              </div>
              <div
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: 18,
                  color: COLORS.textMuted,
                }}
              >
                {testimonial.role}
              </div>
            </div>
          </div>
        );
      })}

      {/* Pagination dots */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          display: "flex",
          gap: 15,
        }}
      >
        {testimonials.map((_, index) => (
          <div
            key={index}
            style={{
              width: index === activeIndex ? 30 : 10,
              height: 10,
              borderRadius: 5,
              backgroundColor: index === activeIndex ? COLORS.accent : COLORS.textMuted,
              transition: "width 0.3s, background-color 0.3s",
              boxShadow: index === activeIndex ? `0 0 10px ${COLORS.accent}` : "none",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

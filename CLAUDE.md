# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm start                              # Open Remotion Studio for preview
npm run render                         # Render BrandIntro to out/brand-intro.mp4
npx remotion render <VideoId> out.mp4  # Render specific video
npx remotion compositions              # List all registered compositions
npx tsc --noEmit                       # Type-check without emitting files
```

## Architecture

This is a Remotion video generation project for OffGrid marketing content. Videos run at 30fps at 1920x1080.

**Video Structure:**
- Each video lives in `src/videos/<video-name>/` with a main component and a `scenes/` subfolder
- Videos compose scenes using Remotion's `<Sequence>` component with frame-based timing
- Shared scenes (DarkOpen, LogoCTA) live in `src/scenes/` for cross-video reuse

**Shared Libraries:**
- `src/lib/colors.ts` - Brand color palette (COLORS.background, accent, text, textMuted)
- `src/lib/animations.ts` - Spring configs (SPRING_CONFIG, SPRING_CONFIG_SLOW) and FADE_DURATION

**Registration:**
- All videos must be registered as `<Composition>` in `src/Root.tsx` with id, duration, fps, and dimensions
- Videos are organized in `<Folder>` components by category (e.g., "Marketing", "Social")

**Assets:**
- Static files (images, audio, models) go in `public/` and are accessed via `staticFile()`

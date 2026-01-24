# OffGrid Product Videos

Remotion-based video generation project for OffGrid marketing content.

## Quick Start

```bash
npm start          # Open Remotion Studio
npm run render     # Render BrandIntro video
```

## Creating a New Video

### 1. Create the video folder

```
src/videos/your-video-name/
├── YourVideo.tsx           # Main video component
└── scenes/                 # Scenes specific to this video
    ├── Scene1.tsx
    └── Scene2.tsx
```

### 2. Create the main video component

```tsx
// src/videos/your-video-name/YourVideo.tsx
import { AbsoluteFill, Sequence } from "remotion";
import { DarkOpen } from "../../scenes/DarkOpen";      // Shared scene
import { LogoCTA } from "../../scenes/LogoCTA";        // Shared scene
import { YourScene } from "./scenes/YourScene";        // Video-specific scene
import { COLORS } from "../../lib/colors";

export const YourVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Sequence from={0} durationInFrames={60}>
        <DarkOpen />
      </Sequence>
      <Sequence from={60} durationInFrames={120}>
        <YourScene />
      </Sequence>
      <Sequence from={180} durationInFrames={90}>
        <LogoCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
```

### 3. Register in Root.tsx

```tsx
import { Composition, Folder } from "remotion";
import { YourVideo } from "./videos/your-video-name/YourVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Marketing">
        {/* existing videos... */}
        <Composition
          id="YourVideo"
          component={YourVideo}
          durationInFrames={270}  // total frames (frames / 30 = seconds)
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
```

### 4. Add render script (optional)

In `package.json`:
```json
"render:yourvideo": "remotion render YourVideo out/your-video.mp4"
```

## Project Structure

```
src/
├── lib/                    # Shared constants
│   ├── colors.ts           # COLORS.background, accent, text, etc.
│   └── animations.ts       # SPRING_CONFIG, FADE_DURATION
├── scenes/                 # SHARED scenes (used across videos)
│   ├── DarkOpen.tsx        # Animated grid opening
│   └── LogoCTA.tsx         # Logo + CTA closing
├── components/             # SHARED reusable components
└── videos/                 # Each video gets its own folder
    └── brand-intro/
        ├── BrandIntro.tsx
        └── scenes/

public/
├── logo.png
├── audio/                  # Background music
├── images/                 # Product images
└── models/                 # 3D models (if needed)
```

## Common Video Sizes

| Platform       | Size      | Aspect |
|----------------|-----------|--------|
| YouTube/Web    | 1920x1080 | 16:9   |
| Instagram Reel | 1080x1920 | 9:16   |
| Square Post    | 1080x1080 | 1:1    |

## Useful Commands

```bash
npm start                              # Studio preview
npm run render                         # Render default video
npx remotion render YourVideo out.mp4  # Render specific video
npx remotion compositions              # List all compositions
```

## Brand Colors

Available in `src/lib/colors.ts`:
- `COLORS.background` - #050505 (dark)
- `COLORS.accent` - #00d4aa (teal)
- `COLORS.text` - #ffffff (white)
- `COLORS.textMuted` - #888888 (gray)

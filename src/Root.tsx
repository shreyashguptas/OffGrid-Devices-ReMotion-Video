import { Composition, Folder } from "remotion";
import { BrandIntro } from "./videos/brand-intro/BrandIntro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Marketing">
        <Composition
          id="BrandIntro"
          component={BrandIntro}
          durationInFrames={450}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>

      {/* Future videos can be added here */}
      {/*
      <Folder name="Social">
        <Folder name="Instagram">
          <Composition
            id="InstagramReel"
            component={SocialAd}
            durationInFrames={270}
            fps={30}
            width={1080}
            height={1920}
            defaultProps={{ platform: "instagram" }}
          />
        </Folder>
      </Folder>
      */}
    </>
  );
};

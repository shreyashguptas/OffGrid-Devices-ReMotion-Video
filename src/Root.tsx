import { Composition, Folder } from "remotion";
import { BrandIntro } from "./videos/brand-intro/BrandIntro";
import { MeshNetworkExplainer } from "./videos/mesh-network-explainer/MeshNetworkExplainer";
import { AdventureReady } from "./videos/adventure-ready/AdventureReady";
import { TechSpecs } from "./videos/tech-specs/TechSpecs";
import { ProductShowcase } from "./videos/product-showcase/ProductShowcase";
import { SocialProof } from "./videos/social-proof/SocialProof";

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
        <Composition
          id="MeshNetworkExplainer"
          component={MeshNetworkExplainer}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="AdventureReady"
          component={AdventureReady}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="TechSpecs"
          component={TechSpecs}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="ProductShowcase"
          component={ProductShowcase}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="SocialProof"
          component={SocialProof}
          durationInFrames={540}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};

import { getResolvedLandingImages } from "@/lib/getResolvedLandingImages";
import LandingPage from "@/modules/landing/LandingPage";

/** Always read latest landing images from Mongo after admin updates. */
export const dynamic = "force-dynamic";

export default async function Home() {
  const landingImages = await getResolvedLandingImages();
  return <LandingPage landingImages={landingImages} />;
}

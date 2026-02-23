import { MaylinHero } from "../components/MaylinHero";
import { MaylinMarquee } from "../components/MaylinMarquee";
import { MaylinCategories } from "../components/MaylinCategories";
import { MaylinSpotlight } from "../components/MaylinSpotlight";
import { MaylinProducts } from "../components/MaylinProducts";
import { MaylinFooter } from "../components/MaylinFooter";

export function HomePage() {
  return (
    <>
      <MaylinHero />
      <MaylinMarquee />
      <MaylinCategories />
      <MaylinSpotlight />
      <MaylinProducts />
      <MaylinFooter />
    </>
  );
}

import { HeroSection } from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturedCaterers from "@/components/landing/FeaturedCaterers";
import CategoryScroll from "@/components/custom/nav/CategoryScroll";
// import ClientSearch from "@/components/platform/search/client-search";

export default function Home() {
  return (
    <div>
      <CategoryScroll />
      <div className="flex flex-col">
        <HowItWorks />
        <FeaturedCaterers />
      </div>
    </div>
  );
}

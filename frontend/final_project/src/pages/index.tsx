import { Inter } from "next/font/google";
import Navbar from "@/components/layouts/Landing_Page/Navbar";
import ProjectTeam from "@/components/layouts/Landing_Page/ProjectTeam";
import Testimonials from "@/components/layouts/Landing_Page/Testimonials";
import Footer from "@/components/layouts/Landing_Page/Footer";
import CTA_left from "@/components/fragments/CTA_left";
import CTA_right from "@/components/fragments/CTA_right";
import CarouselLogo from "@/components/fragments/Carousel_Logo";
import HeroSection from "@/components/layouts/Landing_Page/HeroSection";
import CarbonFootprintSection from "@/components/layouts/Landing_Page/CarbonFootprintSection";
import ProductCardCategory from "@/components/layouts/Landing_Page/ProductCardCategory";
import Map from "@/components/fragments/Map";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <CarouselLogo/>
      <Map/>
      <CarbonFootprintSection/>
      <ProductCardCategory/>
      <ProductCardCategory/>
      <CTA_left/>
      <CTA_right/>
      <CTA_left/>
      <CTA_right/>
      <ProjectTeam/>
      <Testimonials/>
      <Footer/>
    </div>
  );
}

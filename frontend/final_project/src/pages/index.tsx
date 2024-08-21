import { Inter } from "next/font/google";
import Navbar from "@/components/layouts/Landing_Page/Navbar";
import ProjectTeam from "@/components/layouts/Landing_Page/ProjectTeam";
import Testimonials from "@/components/layouts/Landing_Page/Testimonials";
import Footer from "@/components/layouts/Landing_Page/Footer";
import CTA_left from "@/components/fragments/CTA_left";
import CTA_right from "@/components/fragments/CTA_right";
import CarouselLogo from "@/components/fragments/Carousel_Logo";
import HeroSection from "@/components/layouts/Landing_Page/HeroSection";
import ProductCardCategory from "@/components/layouts/Landing_Page/ProductCardCategory";
import Slider from "@/components/layouts/Landing_Page/GreenProject/Slider";
import withIntersectionObserver from "@/components/hoc/withIntersectionObserver";
import Header from "@/components/layouts/Landing_Page/ProjectTeam/header";

const inter = Inter({ subsets: ["latin"] });

const NavbarWithObserver = withIntersectionObserver(Navbar);
const HeroSectionWithObserver = withIntersectionObserver(HeroSection);
const CarouselLogoWithObserver = withIntersectionObserver(CarouselLogo);
const ProductCardCategoryWithObserver = withIntersectionObserver(ProductCardCategory);
const CTA_leftWithObserver = withIntersectionObserver(CTA_left);
const CTA_rightWithObserver = withIntersectionObserver(CTA_right);
const ProjectTeamWithObserver = withIntersectionObserver(ProjectTeam);
const TestimonialsWithObserver = withIntersectionObserver(Testimonials);
const FooterWithObserver = withIntersectionObserver(Footer);
const SliderWithObserver = withIntersectionObserver(Slider);
const HeaderWithObserver = withIntersectionObserver(Header);

export default function Home() {
  return (
    <div>
      <NavbarWithObserver />
      <HeroSectionWithObserver />
      <CarouselLogoWithObserver />
      <div id="green-movement"></div>
      <SliderWithObserver />
      <ProductCardCategoryWithObserver />
      <ProductCardCategoryWithObserver />
      <CTA_leftWithObserver />
      <CTA_rightWithObserver />
      <CTA_leftWithObserver />
      <CTA_rightWithObserver />
      <HeaderWithObserver />
      <ProjectTeamWithObserver />
      <TestimonialsWithObserver />
      <FooterWithObserver />
    </div>
  );
}
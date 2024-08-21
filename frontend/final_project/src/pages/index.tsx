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
import HeaderStore from "@/components/fragments/CTA_left/header";

const inter = Inter({ subsets: ["latin"] });

const NavbarWithObserver = withIntersectionObserver(Navbar);
const HeroSectionWithObserver = withIntersectionObserver(HeroSection);
const CarouselLogoWithObserver = withIntersectionObserver(CarouselLogo);
const ProductCardCategoryWithObserver =
	withIntersectionObserver(ProductCardCategory);
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
			<HeaderStore />
			<CTA_leftWithObserver
				title="Kartika Sari - Bandung"
				description="A beloved culinary icon in Bandung, known for its delicious pastries and traditional treats. Established decades ago, it has become a must-visit destination for locals and tourists. Kartika Sari blends authentic flavors with modern innovations, making it a cherished part of Bandung’s rich culinary heritage."
				firstLink="https://storage.googleapis.com/localbites_storage/Screenshot%202024-08-21%20at%2016.26.04.png"
				secondLink="https://storage.googleapis.com/localbites_storage/Screenshot%202024-08-21%20at%2016.26.15.png"
        buttonText="Taste it"
        buttonLink="/product/2"
        bulletPoints={[
          "Pioneers in sustainable packaging, reducing plastic waste by 90%.",
          "Committed to sourcing ingredients from eco-friendly, local farms.",
          "Implements a strict no-waste policy."
      ]}
			/>
			<CTA_rightWithObserver 
      title="Tugu Jogja - Yogyakarta"
      description="Experience the authentic flavors of Yogyakarta, wrapped in a commitment to sustainability. Bakpia Kukus Tugu Jogja offers a delectable fusion of traditional bakpia with a modern twist, all while minimizing our environmental impact."
      firstLink="https://storage.googleapis.com/localbites_storage/Screenshot%202024-08-21%20at%2017.14.48.png"
      secondLink="https://storage.googleapis.com/localbites_storage/Screenshot%202024-08-21%20at%2017.20.49.png"
      buttonText="Taste it"
      buttonLink="/product/2"
      bulletPoints={[
        "Their bakpia is packaged using sustainable materials.",
        "They source their ingredients locally, supporting local farmers.",
        "Their production processes are optimized for energy efficiency."
    ]}/>
			<CTA_leftWithObserver 
      title="Kawanua Souvenir - Manado"
      description="Discover the rich heritage of North Sulawesi through our exquisite Kawanua souvenirs. Each piece is crafted with passion and attention to detail, reflecting the unique culture and traditions of this beautiful region."
      firstLink="https://storage.googleapis.com/localbites_storage/Screenshot%202024-08-21%20at%2017.32.04.png"
      secondLink="https://storage.googleapis.com/localbites_storage/Screenshot%202024-08-21%20at%2017.32.19.png"
      buttonText="Taste it"
      buttonLink="/product/2"
      bulletPoints={[
        "Their souvenirs are made by skilled artisans using traditional techniques",
        "Inspired by the natural beauty and cultural heritage of North Sulawesi.",
        "They prioritize sustainable sourcing and production methods."
    ]}/>
			<CTA_rightWithObserver 
      title="Pempek Candy - Palembang"
      description="Experience the unique fusion of flavors and textures in Pempek Candy, now crafted with a commitment to sustainability. This innovative treat combines the traditional taste of pempek with the sweetness of candy, all while minimizing our environmental impact."
      firstLink="https://storage.googleapis.com/localbites_storage/Screenshot%202024-08-21%20at%2017.43.25.png"
      secondLink="https://storage.googleapis.com/localbites_storage/Screenshot%202024-08-21%20at%2017.48.46.png"
      buttonText="Taste it"
      buttonLink="/product/2"
      bulletPoints={[
        "The perfect blend of savory pempek offering a truly unique taste.",
        "Wrapped in eco-friendly packaging, making it easy to enjoy on-the-go.",
        "They source their ingredients locally and use sustainable practices."
    ]}/>
			<HeaderWithObserver />
			<ProjectTeamWithObserver />
			<TestimonialsWithObserver />
			<FooterWithObserver />
		</div>
	);
}

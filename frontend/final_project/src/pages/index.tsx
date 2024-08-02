import { Inter } from "next/font/google";
import Navbar from "@/components/layouts/Landing_Page/Navbar";
import ProjectTeam from "@/components/layouts/Landing_Page/ProjectTeam";
import Testimonials from "@/components/layouts/Landing_Page/Testimonials";
import Footer from "@/components/layouts/Landing_Page/Footer";
import CTA from "@/components/fragments/CTA";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Navbar/>
      <CTA/>
      <ProjectTeam/>
      <Testimonials/>
      <Footer/>
    </div>
  );
}

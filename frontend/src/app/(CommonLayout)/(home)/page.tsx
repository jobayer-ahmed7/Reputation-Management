import Hero from "@/components/home/Hero";
import ServiceSection from "@/components/home/ServiceSection";
import Testimonial from "@/components/home/Testimonial";
import Loading from "@/components/shared/Loading";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ServiceSection />
      <Testimonial />
      <Loading/>
    </div>
  );
};

export default HomePage;

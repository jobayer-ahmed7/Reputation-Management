import Hero from "@/components/home/Hero";
import ServiceSection from "@/components/home/ServiceSection";
import Testimonial from "@/components/home/Testimonial";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ServiceSection />
      <Testimonial />
    </div>
  );
};

export default HomePage;

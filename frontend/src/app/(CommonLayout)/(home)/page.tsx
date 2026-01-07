import Hero from "@/components/home/Hero";
import ServiceSection from "@/components/home/ServiceSection";
import Testimonial from "@/components/home/Testimonial";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ServiceSection />
      <WhyChooseUs/>
      <Testimonial />
    </div>
  );
};

export default HomePage;
 
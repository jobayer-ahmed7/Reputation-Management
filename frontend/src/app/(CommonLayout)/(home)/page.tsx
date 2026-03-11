import ContactUs from "@/components/home/ContactUs";
import FAQ from "@/components/home/FAQ";
import Hero from "@/components/home/Hero";
import ServiceSection from "@/components/home/ServiceSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ServiceSection />
      <WhyChooseUs/>
      <FAQ/>
      <ContactUs/>
    </div>
  );
};

export default HomePage;
 
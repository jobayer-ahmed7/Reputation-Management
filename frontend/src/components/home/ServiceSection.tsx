import { mockServices } from "@/constants/service";
import ServiceCard from "../shared/ServiceCard";

const ServiceSection = () => {
  const services = mockServices.filter((service) => service.isFeatured);

  return (
    <section className="py-16 lg:py-24 bg-linear-to-b from-white via-blue-50 to-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 text-center space-y-4">
          <p className="inline-flex items-center text-xs font-semibold tracking-widest text-pblue uppercase bg-pblue/5 px-3 py-1 rounded-full border border-pblue/10">
            Our core services
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Protect and grow your online reputation
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            From review management to crisis response, we combine strategy and
            execution to keep your brand trusted across every platform.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;

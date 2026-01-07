import { CheckCircle, MessageCircle, TrendingUp, Users } from "lucide-react"

const WhyChooseUs = () => {
  return (
    <div>      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              We stand out with quality, reliability, and customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "100% Authentic",
                description:
                  "Real accounts, real engagement, no bots or fake activity",
                icon: <CheckCircle className="w-8 h-8" />,
              },
              {
                title: "Fast Delivery",
                description: "Most orders delivered within 24-48 hours",
                icon: <TrendingUp className="w-8 h-8" />,
              },
              {
                title: "Money-Back Guarantee",
                description: "Not satisfied? We offer a full refund guarantee",
                icon: <Users className="w-8 h-8" />,
              },
              {
                title: "24/7 Support",
                description: "Our dedicated team is always ready to help you",
                icon: <MessageCircle className="w-8 h-8" />,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-linear-to-br from-white to-slate-50 p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-xl bg-linear-to-br from-pblue/10 to-bluegray/10 text-pblue">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section></div>
  )
}

export default WhyChooseUs
import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const Testimonial = () => {
  const testimonials = [
    {
      title: "Helped My Store Get Noticed",
      content: "I always wondered how to get Google reviews until I used their service. The 5-star reviews were custom-written and looked real. My footfall increased within two weeks. Amazing service!",
      rating: 4.2,
      author: "Anna Lewis, Boutique Owner - USA",
      date: "19/01/2023"
    },
    {
      title: "Boosted My Online Visibility",
      content: "I used their Google reviews website and saw traffic improve on my own site. Their 5-star reviews helped me rank higher and attract better leads online. Very professional team.",
      rating: 4.4,
      author: "Maria Gonzalez, Freelance Designer - Spain",
      date: "17/06/2024"
    },
    {
      title: "Boosted My Online Reputation",
      content: "Choosing to buy Google 5 star reviews was a great decision. It helped improve my business credibility fast. More customers started leaving organic reviews after seeing positive feedback from others.",
      rating: 4.5,
      author: "Sarah Williams, Café Manager",
      date: "18/08/2024"
    },
    {
      title: "Excellent Service and Quick Results",
      content: "I decided to buy Google reviews for my store, and it truly helped build customer trust. After using the service, I noticed a clear increase in both traffic and sales.",
      rating: 4.1,
      author: "Michael Roberts, E-commerce Owner",
      date: "11/11/2024"
    },
    {
      title: "Great for Local Shops",
      content: "I needed to get more Google positive reviews to build trust. The 3-month package really worked. Customers started visiting more, and sales went up gradually. Definitely a smart move for small businesses.",
      rating: 4.7,
      author: "James Tanaka, Florist - Japan",
      date: "05/11/2024"
    },
    {
      title: "Helped Me Reach More Customers",
      content: "When I decided to purchase Google reviews, I wanted more visibility for my small store. The results were quick, and I gained a steady flow of new customer inquiries within weeks.",
      rating: 4.4,
      author: "Emma Johnson, Boutique Owner, UK",
      date: "17/02/2025"
    }
  ];

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf key="half" className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <section className="my-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hear Directly From Our Clients
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            See why thousands of people trust us with their online reputation.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
            >
              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {testimonial.title}
              </h3>

              {/* Content */}
              <p className="text-gray-600 leading-relaxed mb-6 min-h-[120px]">
                {testimonial.content}
              </p>

              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-2">
                {renderStars(testimonial.rating)}
              </div>

              {/* Rating Number */}
              <div className="text-2xl font-bold text-gray-900 mb-3">
                {testimonial.rating}
              </div>

              {/* Author Info */}
              <div className="border-t border-gray-100 pt-4">
                <p className="font-semibold text-gray-900 text-sm mb-1">
                  {testimonial.author}
                </p>
                <p className="text-gray-500 text-xs">
                  {testimonial.date}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Read More Button */}
        {/* <div className="text-center">
          <button className="bg-linear-to-r from-pblue to-bluegray text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
            Read More
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default Testimonial;
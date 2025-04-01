import Image from 'next/image';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "Small Business Owner",
      quote: "ZippCall has revolutionized how I stay in touch with my suppliers abroad. The call quality is excellent, and I've cut my international calling costs by over 70%!",
      avatar: "/images/testimonial-1.jpg"
    },
    {
      name: "Michael Chen",
      position: "International Student",
      quote: "As a student studying abroad, I need to call home regularly. ZippCall makes it affordable for me to talk to my family for hours without worrying about the cost.",
      avatar: "/images/testimonial-2.jpg"
    },
    {
      name: "Elena Rodriguez",
      position: "Travel Blogger",
      quote: "I travel constantly and need to stay connected with partners worldwide. ZippCall works everywhere I go and saves me a fortune compared to roaming charges.",
      avatar: "/images/testimonial-3.jpg"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zippcall-blue mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-zippcall-neutral max-w-3xl mx-auto">
            Join thousands of satisfied users who've discovered a better way to make international calls.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-md border border-zippcall-light-blue/20 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-zippcall-light-blue/20 flex items-center justify-center text-zippcall-blue mr-4">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-zippcall-blue">{testimonial.name}</h3>
                  <p className="text-sm text-zippcall-neutral">{testimonial.position}</p>
                </div>
              </div>
              <blockquote className="text-zippcall-neutral italic mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex text-zippcall-yellow">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-zippcall-cream rounded-lg p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-zippcall-yellow" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-xl font-bold text-zippcall-blue mb-2">
              4.9 out of 5 stars from over 1,000 reviews
            </p>
            <p className="text-zippcall-neutral">
              Our users love the clarity, simplicity, and affordability of ZippCall
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 
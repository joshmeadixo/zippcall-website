import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-16 bg-zippcall-blue">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make Affordable International Calls?
          </h2>
          <p className="text-lg text-zippcall-light-blue mb-8 max-w-3xl mx-auto">
            Join thousands of users already enjoying crystal-clear international calling directly from their browser. 
            Get started today with $5 in free credit.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/signup" 
              className="btn bg-zippcall-yellow text-zippcall-blue hover:bg-zippcall-yellow/80 text-lg px-8 py-4"
            >
              Start Your Free Trial
            </Link>
            <Link 
              href="#how-it-works" 
              className="btn btn-outline border-white text-white hover:bg-white hover:text-zippcall-blue text-lg px-8 py-4"
            >
              Learn More
            </Link>
          </div>
          <p className="mt-6 text-zippcall-light-blue">
            No credit card required. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  );
} 
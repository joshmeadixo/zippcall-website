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
          </p>
          <div className="flex justify-center">
            <Link 
              href="https://app.zippcall.com" 
              className="flex items-center justify-center bg-zippcall-yellow text-zippcall-blue hover:bg-zippcall-yellow/80 text-lg font-medium px-8 h-14 rounded-md"
            >
              Start Calling Now
            </Link>
          </div>
          <p className="mt-6 text-zippcall-light-blue">
            1 minute setup. No subscription required.
          </p>
        </div>
      </div>
    </section>
  );
} 
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-zippcall-light-blue/10 to-white py-16 md:py-24 relative overflow-hidden">
      {/* Mobile Product Hunt Badge */}
      <div className="md:hidden absolute top-2 right-2 z-10">
        <a 
          href="https://www.producthunt.com/posts/zippcall?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-zippcall" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="block rotate-6 shadow-lg rounded-lg overflow-hidden hover:rotate-0 transition-all duration-300"
        >
          <img 
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=949544&theme=light&t=1743815067332" 
            alt="ZippCall on Product Hunt" 
            className="w-36 h-auto" 
          />
        </a>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-5/12 mb-10 md:mb-0 md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-zippcall-blue mb-6">
              Make International Calls <span className="text-zippcall-light-blue">Directly from Your Browser</span>
            </h1>
            <p className="text-lg text-zippcall-neutral mb-8">
              ZippCall lets you connect with loved ones, work, your bank, anyone worldwide at incredibly affordable rates. No downloads, no hassle — just crystal-clear international calling right from your web browser.
            </p>
            <div className="flex flex-col items-start">
              <Link href="https://app.zippcall.com" className="btn bg-zippcall-blue text-white hover:bg-zippcall-blue/80 inline-flex items-center justify-center text-lg px-8 py-3">
                Start calling now
              </Link>
              <p className="text-sm bg-zippcall-light-blue/10 text-zippcall-blue font-medium mt-3 py-1 px-3 rounded-md border-l-2 border-zippcall-light-blue flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-zippcall-light-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Signup to calling in less than 1 minute
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center rounded-lg relative bg-zippcall-light-blue/5">
                <Image 
                  src="/images/hero.png" 
                  alt="ZippCall Hero" 
                  fill
                  className="object-contain object-center scale-110"
                  priority
                />
              </div>
            </div>
            <div className="absolute -bottom-5 -left-5 bg-zippcall-yellow rounded-lg p-4 shadow-lg z-20 border-l-4 border-zippcall-blue">
              <div className="text-zippcall-blue font-bold text-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Calls from $0.15 /min
              </div>
              <div className="text-sm font-medium text-zippcall-blue">Save up to 90% vs traditional providers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
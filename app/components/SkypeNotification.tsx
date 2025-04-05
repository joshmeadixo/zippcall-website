import Link from 'next/link';

export default function SkypeNotification() {
  return (
    <section className="bg-zippcall-blue text-white py-3 md:py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between md:space-x-6">
          <div className="flex items-center mb-2 md:mb-0 max-w-full md:max-w-3xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
            <p className="font-medium text-sm md:text-sm">
              <span className="font-bold">Skype is closing down in May!</span> ZippCall is the perfect alternative: pay as you go, no subscription, easy international calls.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 flex-shrink-0">
            <div className="hidden md:block">
              <a href="https://www.producthunt.com/posts/zippcall?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-zippcall" target="_blank" rel="noopener noreferrer">
                <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=949544&theme=light&t=1743815067332" 
                  alt="ZippCall - Cheap international calls in your web-browser | Product Hunt" 
                  className="h-8 w-auto" />
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="https://app.zippcall.com" className="bg-white text-zippcall-blue px-4 py-1.5 rounded-md font-medium text-xs md:text-sm hover:bg-zippcall-yellow transition duration-150">
                Try ZippCall
              </Link>
              <Link href="#founder-note" className="text-zippcall-yellow hover:text-white text-xs md:text-sm font-medium flex items-center transition duration-150 whitespace-nowrap">
                <span>Message from our founder</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
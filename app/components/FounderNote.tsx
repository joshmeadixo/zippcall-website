import Image from 'next/image';
import Link from 'next/link';

export default function FounderNote() {
  return (
    <section id="founder-note" className="py-16 bg-zippcall-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12 border border-zippcall-light-blue/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-zippcall-blue mb-4">
              A Note from Our Founder
            </h2>
            <div className="inline-block rounded-full overflow-hidden w-24 h-24 mb-4 border-2 border-zippcall-blue">
              <Image src="/images/founder.png" alt="Josh Mead" width={96} height={96} className="object-cover" />
            </div>
          </div>
          
          <div className="prose prose-lg max-w-none text-zippcall-neutral space-y-4">
            <p>
              Hi, I'm Josh. I created ZippCall out of a personal need. As someone originally from the UK who spends a significant amount of time in Morocco, I constantly faced the challenge of making affordable and straightforward calls back home, especially to essential services like my bank or credit card company.
            </p>
            <p>
              I found the existing solutions either too complicated, requiring software downloads and fiddly setups, or surprisingly expensive for simple calls. I used to rely on services like Skype, but found their shift away from flexible pay-as-you-go options towards mandatory subscriptions didn't fit my needs – I just wanted a simple, clear way to pay only for the minutes I used.
            </p>
            <p>
              On top of that, I run a business back in the UK and often work remotely. This means needing to connect with customers and partners across the globe without breaking the bank or dealing with technical hassles. ZippCall is the solution I built to address these exact problems – making international calling easy, affordable, and accessible directly from your web browser, whether it's for personal admin, family catch-ups, or global business.
            </p>
            <div className="mt-8 text-center">
              <p className="text-2xl font-caveat text-zippcall-blue">
                Josh Mead
              </p>
              <p className="text-sm text-zippcall-neutral mb-2">
                Founder, ZippCall
              </p>
              <Link 
                href="https://x.com/JoshMead" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-zippcall-blue hover:text-zippcall-light-blue transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1">
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5549 21H20.7996L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/>
                </svg>
                <span>@JoshMead</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
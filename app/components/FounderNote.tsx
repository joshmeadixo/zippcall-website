import Image from 'next/image';

export default function FounderNote() {
  return (
    <section id="founder-note" className="py-16 bg-zippcall-cream">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12 border border-zippcall-light-blue/20">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-zippcall-blue mb-4">
              A Note from Our Founder
            </h2>
            {/* Optional: Add an Image component here if you have a founder photo 
            <div className="inline-block rounded-full overflow-hidden w-24 h-24 mb-4 border-2 border-zippcall-blue">
              <Image src="/images/josh-mead.jpg" alt="Josh Mead" width={96} height={96} className="object-cover" />
            </div> 
            */}
            <p className="text-lg font-semibold text-zippcall-blue">Josh Mead</p>
          </div>
          
          <div className="prose prose-lg max-w-none text-zippcall-neutral space-y-4">
            <p>
              "Hi, I'm Josh. I created ZippCall out of a personal need. As someone originally from the UK who spends a significant amount of time in Morocco, I constantly faced the challenge of making affordable and straightforward calls back home, especially to essential services like my bank or credit card company."
            </p>
            <p>
              "I found the existing solutions either too complicated, requiring software downloads and fiddly setups, or surprisingly expensive for simple calls. I used to rely on services like Skype, but found their shift away from flexible pay-as-you-go options towards mandatory subscriptions didn't fit my needs – I just wanted a simple, clear way to pay only for the minutes I used."
            </p>
            <p>
              "On top of that, I run a business back in the UK and often work remotely. This means needing to connect with customers and partners across the globe without breaking the bank or dealing with technical hassles. ZippCall is the solution I built to address these exact problems – making international calling easy, affordable, and accessible directly from your web browser, whether it's for personal admin, family catch-ups, or global business."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 
import Link from 'next/link';

export default function SkypeNotification() {
  return (
    <section className="bg-zippcall-blue/10 text-zippcall-blue py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 flex-shrink-0 hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
          <p className="font-medium text-xs sm:text-sm">
            <span className="font-semibold">Skype is closing down in May!</span> ZippCall is the perfect alternative: pay as you go, no subscription, easy international calls.
          </p>
        </div>
      </div>
    </section>
  );
} 
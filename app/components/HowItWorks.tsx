"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HowItWorks() {
  const [callTarget, setCallTarget] = useState("Your Bank");
  const callTargets = ["Your Bank", "Your Mom", "Your Boss", "Your Friend", "Your Family", "Your Client", "Your Doctor", "Your Hotel", "Airlines", "Tech Support", "Colleagues"];
  
  // Mobile-friendly shorter alternatives
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCallTarget(prev => {
        const currentIndex = callTargets.indexOf(prev);
        const nextIndex = (currentIndex + 1) % callTargets.length;
        return callTargets[nextIndex];
      });
    }, 2000); // Change every 2 seconds
    
    return () => clearInterval(interval);
  }, []);

  const steps = [
    {
      number: "01",
      title: "Create Your Account",
      description: "Sign up for free in seconds using your email or Google account. No credit card required to start."
    },
    {
      number: "02",
      title: "Add Credits to Your Account",
      description: "Purchase calling credits using your preferred payment method. Start with as little as $5."
    },
    {
      number: "03",
      title: "Dial Your Number",
      description: "Enter the number you want to call, including the country code. Calls start at just $0.15 /min."
    },
    {
      number: "04",
      title: "Start Talking",
      description: "Click the call button and connect instantly with crystal-clear audio quality."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zippcall-blue mb-4">How ZippCall Works</h2>
          <p className="text-lg text-zippcall-neutral max-w-3xl mx-auto">
            Making international calls has never been easier. Follow these simple steps to get started.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-md border border-zippcall-light-blue/20 hover:shadow-xl transition-shadow relative"
            >
              <div className="absolute -top-4 -left-4 bg-zippcall-blue rounded-full w-12 h-12 flex items-center justify-center text-white font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-zippcall-blue mb-3 mt-4">{step.title}</h3>
              <p className="text-zippcall-neutral">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-zippcall-neutral mb-6">
            Try ZippCall now and experience the simplicity of browser-based international calling.
          </p>
          <div className="flex flex-col items-center">
            <Link 
              href="https://app.zippcall.com" 
              className="btn bg-zippcall-blue text-white hover:bg-zippcall-blue/80 text-lg px-8 py-3 sm:text-lg text-base relative"
            >
              <span className="whitespace-nowrap">
                Start calling <span className="text-zippcall-yellow font-bold">{callTarget}</span> now
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 
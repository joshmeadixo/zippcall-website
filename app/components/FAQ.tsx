"use client";

import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
}

function FAQItem({ question, answer, isOpen, toggleOpen }: FAQItemProps) {
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left font-bold text-zippcall-blue"
        onClick={toggleOpen}
      >
        <span>{question}</span>
        <span className="text-xl">{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && (
        <div className="mt-3 text-zippcall-neutral">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [openItem, setOpenItem] = useState(0);
  
  const faqItems = [
    {
      question: "How does ZippCall work?",
      answer: "ZippCall uses WebRTC technology to enable voice calls directly through your web browser. When you dial a number, our service connects your browser to the regular phone network, allowing you to make calls to any phone number worldwide without needing to install additional software."
    },
    {
      question: "Do I need to download anything to use ZippCall?",
      answer: "No! That's one of the best parts about ZippCall. Everything works directly in your web browser. There's no need to download or install any software. Just create an account, add credits, and start making calls."
    },
    {
      question: "How much does it cost to use ZippCall?",
      answer: "ZippCall offers pay-as-you-go pricing with no monthly fees or subscriptions. Rates vary by country, starting as low as $0.15 per minute. We provide transparent pricing for all countries, and you only pay for what you use."
    },
    {
      question: "Can I receive calls with ZippCall?",
      answer: "Currently, ZippCall is designed for outbound calling only. You can make calls to any regular phone number worldwide, but you cannot receive incoming calls."
    },
    {
      question: "Why can't I just use WhatsApp or Telegram for free?",
      answer: "Messaging services like WhatsApp and Telegram allow free calls between users on platform but it doesn't allow you to call landlines or mobile numbers."
    },
    {
      question: "Is there a monthly subscription fee?",
      answer: "No, ZippCall is entirely pay-as-you-go. There are no monthly fees, no contracts, and no minimum usage requirements. You only pay for the call time you actually use."
    },
    {
      question: "How do I add credits to my account?",
      answer: "You can buy calling time through a secure payment processor in your account. We accept all major credit and debit cards as well as PayPal."
    },
    {
      question: "What devices can I use with ZippCall?",
      answer: "ZippCall works on any device with a modern web browser that supports WebRTC (including Chrome, Firefox, Safari, and Edge). This includes desktops, laptops, tablets, and smartphones."
    },
    {
      question: "Is ZippCall secure?",
      answer: "Yes, security is our priority. All calls are encrypted using industry-standard protocols. Your personal information and payment details are protected with advanced security measures."
    }
  ];

  return (
    <section id="faq" className="py-16 bg-zippcall-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zippcall-blue mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-zippcall-neutral max-w-3xl mx-auto">
            Got questions about ZippCall? Find answers to our most commonly asked questions below.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 border border-zippcall-light-blue/20">
          {faqItems.map((item, index) => (
            <FAQItem 
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openItem === index}
              toggleOpen={() => setOpenItem(openItem === index ? -1 : index)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-zippcall-neutral mb-6">
            Still have questions?
          </p>
          <button className="btn bg-zippcall-blue text-white hover:bg-zippcall-blue/80">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
} 
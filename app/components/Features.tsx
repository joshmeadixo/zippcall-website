export default function Features() {
  const features = [
    {
      icon: "💻",
      title: "Browser-Based",
      description: "Make calls directly from your web browser - no downloads or installations required."
    },
    {
      icon: "💰",
      title: "Affordable Rates",
      description: "Save up to 90% compared to traditional providers with our competitive international rates."
    },
    {
      icon: "🔊",
      title: "Crystal Clear Quality",
      description: "Experience HD voice quality for all your international calls."
    },
    {
      icon: "🔒",
      title: "Secure & Private",
      description: "Your calls are encrypted and your privacy is always protected."
    },
    {
      icon: "🌍",
      title: "Global Coverage",
      description: "Connect to over 200 countries and territories worldwide."
    },
    {
      icon: "📱",
      title: "Works Everywhere",
      description: "Use on any device with a browser - desktop, laptop, tablet, or smartphone."
    }
  ];

  return (
    <section id="features" className="py-16 bg-zippcall-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-zippcall-blue mb-4">Why Choose ZippCall?</h2>
          <p className="text-lg text-zippcall-neutral max-w-3xl mx-auto">
            ZippCall combines convenience and affordability for the best international calling experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-md border border-zippcall-light-blue/20 hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-zippcall-blue mb-3">{feature.title}</h3>
              <p className="text-zippcall-neutral">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
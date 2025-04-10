import InteractiveMap from '../components/InteractiveMap';

export default function TestPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">Interactive Map Test</h1>
      <div className="max-w-4xl mx-auto">
        <InteractiveMap />
      </div>
      <p className="text-center mt-8 text-gray-600">
        Testing the interactive map component. Click on a country to navigate.
      </p>
    </div>
  );
} 
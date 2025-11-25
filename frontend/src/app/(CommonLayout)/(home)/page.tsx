import { Button } from "@/components/ui/button";

const HomePage = () => {
  return (
    <div>
            {/* Demo Content */}
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to{" "}
              <span className="text-pblue">Reputation Manage</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Monitor, protect, and enhance your online reputation with our
              comprehensive platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

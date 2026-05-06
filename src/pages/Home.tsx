import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-blue-500">
          SpendPilot
        </h1>

        <button
          onClick={() => navigate("/audit")}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg transition"
        >
          Start Audit
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <p className="text-blue-400 font-semibold mb-4">
          AI Spend Optimization Platform
        </p>

        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight">
          Stop Overpaying For AI Tools
        </h1>

        <p className="text-gray-400 text-lg mt-8 max-w-2xl">
          Analyze your AI stack, discover hidden overspending,
          and save thousands annually with intelligent audit recommendations.
        </p>

        <div className="flex gap-4 mt-10">
          <button
            onClick={() => navigate("/audit")}
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold transition"
          >
            Run Free Audit
          </button>

          <button className="border border-gray-700 hover:border-gray-500 px-8 py-4 rounded-xl text-lg transition">
            View Demo
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 w-full max-w-5xl">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-4xl font-bold text-blue-500">$12k+</h2>
            <p className="text-gray-400 mt-2">
              Average Annual Savings
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-4xl font-bold text-blue-500">8+</h2>
            <p className="text-gray-400 mt-2">
              Supported AI Platforms
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h2 className="text-4xl font-bold text-blue-500">5 min</h2>
            <p className="text-gray-400 mt-2">
              Instant Audit Results
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
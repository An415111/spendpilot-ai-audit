import { runAudit } from "../utils/auditEngine";

const Results = () => {

  const storedData = localStorage.getItem("auditData");

  const auditData = storedData
    ? JSON.parse(storedData)
    : null;

  if (!auditData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        No audit data found.
      </div>
    );
  }

  const result = runAudit(auditData);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">

        {/* Hero Card */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-10 mb-10">
          <h1 className="text-5xl font-bold mb-4">
            ${result.monthlySavings}/mo Saved
          </h1>

          <p className="text-xl text-blue-100">
            Estimated annual savings:
            {" "}
            ${result.annualSavings}
          </p>
        </div>

        {/* Recommendation Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4">
            Recommendation
          </h2>

          <p className="text-lg text-blue-400 mb-3">
            {result.recommendation}
          </p>

          <p className="text-gray-400">
            {result.reason}
          </p>
        </div>

        {/* Spend Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h3 className="text-gray-400 mb-2">
              Current Spend
            </h3>

            <p className="text-4xl font-bold">
              ${result.currentSpend}
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <h3 className="text-gray-400 mb-2">
              Optimized Spend
            </h3>

            <p className="text-4xl font-bold text-green-400">
              ${result.optimizedSpend}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
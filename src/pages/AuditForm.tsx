import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AuditForm = () => {
  const navigate = useNavigate();

  const [tool, setTool] = useState("");
  const [plan, setPlan] = useState("");
  const [monthlySpend, setMonthlySpend] = useState("");
  const [seats, setSeats] = useState("");
  const [useCase, setUseCase] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const auditData = {
      tool,
      plan,
      monthlySpend,
      seats,
      useCase,
    };

    console.log(auditData);

    // Save to localStorage
    localStorage.setItem(
      "auditData",
      JSON.stringify(auditData)
    );

    // Redirect to results page
    navigate("/results");
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <div className="max-w-3xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-10">

        <h1 className="text-4xl font-bold mb-3">
          AI Spend Audit
        </h1>

        <p className="text-gray-400 mb-10">
          Analyze your AI stack and discover optimization opportunities.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Tool */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              AI Tool
            </label>

            <select
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Tool</option>
              <option value="ChatGPT">ChatGPT</option>
              <option value="Claude">Claude</option>
              <option value="Cursor">Cursor</option>
              <option value="Copilot">GitHub Copilot</option>
              <option value="Gemini">Gemini</option>
            </select>
          </div>

          {/* Plan */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Current Plan
            </label>

            <input
              type="text"
              placeholder="e.g. Team Plan"
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Monthly Spend */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Monthly Spend ($)
            </label>

            <input
              type="number"
              placeholder="100"
              value={monthlySpend}
              onChange={(e) => setMonthlySpend(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Seats */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Number of Seats
            </label>

            <input
              type="number"
              placeholder="5"
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Use Case */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Primary Use Case
            </label>

            <select
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Use Case</option>
              <option value="Coding">Coding</option>
              <option value="Writing">Writing</option>
              <option value="Research">Research</option>
              <option value="Data Analysis">Data Analysis</option>
              <option value="Mixed">Mixed</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold text-lg transition"
          >
            Generate Audit
          </button>

        </form>
      </div>
    </div>
  );
};

export default AuditForm;
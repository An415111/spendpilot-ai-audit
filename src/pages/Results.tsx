import { useEffect, useState } from "react";
import axios from "axios";
import { runAudit } from "../utils/auditEngine";
import { supabase } from "../lib/supabase";

const Results = () => {

  const storedData = localStorage.getItem("auditData");

  const auditData = storedData
    ? JSON.parse(storedData)
    : null;

  const [summary, setSummary] = useState(
    "Generating AI financial summary..."
  );

  const [loading, setLoading] = useState(true);

  // Lead Form States
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [success, setSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  // AI Summary Generation
  useEffect(() => {

    const generateSummary = async () => {

      try {

        const response = await axios.post(
          "http://localhost:5000/generate-summary",
          auditData
        );

        setSummary(response.data.summary);

      } catch (error) {

        console.error(error);

        setSummary(
          "Unable to generate AI summary at this time."
        );

      } finally {

        setLoading(false);

      }
    };

    if (auditData) {
      generateSummary();
    }

  }, []);

  // Supabase Test Connection
  useEffect(() => {

    const testSupabase = async () => {

      const { data, error } = await supabase
        .from("leads")
        .select("*");

      console.log("SUPABASE DATA:", data);

      console.log("SUPABASE ERROR:", error);
    };

    testSupabase();

  }, []);

  // Save Lead
  const saveLead = async () => {

    setSaving(true);

    const { error } = await supabase
      .from("leads")
      .insert([
        {
          email,
          company,
          role,
          team_size: Number(teamSize),
        },
      ]);

    setSaving(false);

    if (error) {

      console.error(error);

      alert("Failed to save lead");

      return;
    }

    setSuccess(true);

    console.log("Lead saved successfully");
  };

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

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-3">
            Audit Results
          </h1>

          <p className="text-gray-400 text-lg">
            Financial optimization insights for your AI stack.
          </p>
        </div>

        {/* Hero Card */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-10 mb-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>
              <p className="text-blue-100 mb-2">
                Estimated Monthly Savings
              </p>

              <h2 className="text-6xl font-bold">
                ${result.monthlySavings}
              </h2>

              <p className="text-blue-100 mt-4 text-lg">
                Annual Savings:
                {" "}
                ${result.annualSavings}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4">
              <p className="text-sm text-blue-100 mb-1">
                Audit Status
              </p>

              <h3 className="text-2xl font-bold">
                {result.status}
              </h3>
            </div>

          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-3xl font-bold">
              AI Financial Summary
            </h2>

            {loading && (
              <span className="text-blue-400 text-sm">
                Generating...
              </span>
            )}

          </div>

          <p className="text-gray-300 leading-relaxed text-lg">
            {summary}
          </p>
        </div>

        {/* Recommendation */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-bold">
              Recommendation
            </h2>

            <span className="bg-blue-600 px-4 py-2 rounded-full text-sm font-medium">
              {result.confidence} Confidence
            </span>

          </div>

          <p className="text-2xl text-blue-400 font-semibold mb-4">
            {result.recommendation}
          </p>

          <p className="text-gray-400 text-lg leading-relaxed">
            {result.reason}
          </p>
        </div>

        {/* Spend Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <p className="text-gray-400 mb-3">
              Current Spend
            </p>

            <h3 className="text-5xl font-bold">
              ${result.currentSpend}
            </h3>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <p className="text-gray-400 mb-3">
              Optimized Spend
            </p>

            <h3 className="text-5xl font-bold text-green-400">
              ${result.optimizedSpend}
            </h3>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <p className="text-gray-400 mb-3">
              Annual Savings
            </p>

            <h3 className="text-5xl font-bold text-blue-400">
              ${result.annualSavings}
            </h3>
          </div>

        </div>

        {/* Lead Capture Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-10">

          <h2 className="text-3xl font-bold mb-3">
            Get Full Savings Report
          </h2>

          <p className="text-gray-400 mb-8">
            Receive a detailed AI cost optimization report from SpendPilot.
          </p>

          {success ? (

            <div className="bg-green-600/20 border border-green-500 rounded-xl p-4 text-green-300">
              Lead saved successfully. Our team will contact you soon.
            </div>

          ) : (

            <div className="space-y-5">

              <input
                type="email"
                placeholder="Work Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3"
              />

              <input
                type="text"
                placeholder="Your Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3"
              />

              <input
                type="number"
                placeholder="Team Size"
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3"
              />

              <button
                onClick={saveLead}
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-semibold transition disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Report"}
              </button>

            </div>
          )}

        </div>

        {/* Credex CTA */}
        {result.monthlySavings >= 500 && (
          <div className="bg-blue-950 border border-blue-800 rounded-2xl p-8">

            <h2 className="text-3xl font-bold mb-4">
              Unlock More Savings With Credex
            </h2>

            <p className="text-blue-100 text-lg mb-6">
              Your audit indicates significant overspending opportunities.
              Credex can help your team access discounted AI infrastructure credits.
            </p>

            <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-semibold transition">
              Book Consultation
            </button>

          </div>
        )}

      </div>
    </div>
  );
};

export default Results;
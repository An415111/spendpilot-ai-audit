export interface AuditInput {
  tool: string;
  plan: string;
  monthlySpend: string;
  seats: string;
  useCase: string;
}

export interface AuditResult {
  currentSpend: number;
  optimizedSpend: number;
  monthlySavings: number;
  annualSavings: number;
  recommendation: string;
  reason: string;
  confidence: string;
  status: string;
}

export const runAudit = (
  data: AuditInput
): AuditResult => {

  const currentSpend = Number(data.monthlySpend);

  let optimizedSpend = currentSpend;

  let recommendation =
    "Current setup is already optimized.";

  let reason =
    "Your AI stack appears financially efficient based on the provided usage.";

  let confidence = "High";

  let status = "Healthy Spending";

  // ChatGPT
  if (
    data.tool === "ChatGPT" &&
    data.plan === "Team" &&
    Number(data.seats) <= 2
  ) {
    optimizedSpend = currentSpend - 20;

    recommendation =
      "Downgrade from ChatGPT Team to ChatGPT Plus.";

    reason =
      "Collaboration-focused Team features may be unnecessary for small teams.";

    status = "Overspending Detected";
  }

  // Cursor
  if (
    data.tool === "Cursor" &&
    data.plan === "Business" &&
    Number(data.seats) === 1
  ) {
    optimizedSpend = currentSpend - 15;

    recommendation =
      "Switch from Cursor Business to Cursor Pro.";

    reason =
      "Business collaboration features are underutilized for solo workflows.";

    status = "Optimization Available";
  }

  // Claude
  if (
    data.tool === "Claude" &&
    data.useCase === "Writing"
  ) {
    optimizedSpend = currentSpend - 10;

    recommendation =
      "Claude Pro may offer similar value at lower cost.";

    reason =
      "Your usage pattern may not require premium enterprise-level throughput.";

    confidence = "Medium";

    status = "Potential Savings";
  }

  const monthlySavings =
    currentSpend - optimizedSpend;

  const annualSavings =
    monthlySavings * 12;

  return {
    currentSpend,
    optimizedSpend,
    monthlySavings,
    annualSavings,
    recommendation,
    reason,
    confidence,
    status,
  };
};
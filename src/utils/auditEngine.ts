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
}

export const runAudit = (
  data: AuditInput
): AuditResult => {

  const currentSpend = Number(data.monthlySpend);

  let optimizedSpend = currentSpend;
  let recommendation = "Current setup is already optimized.";
  let reason = "Your current AI stack appears cost efficient.";

  // ChatGPT Logic
  if (
    data.tool === "ChatGPT" &&
    data.plan.toLowerCase().includes("team") &&
    Number(data.seats) <= 2
  ) {
    optimizedSpend = currentSpend - 20;

    recommendation =
      "Downgrade from ChatGPT Team to ChatGPT Plus.";

    reason =
      "Team collaboration features may be unnecessary for very small teams.";
  }

  // Cursor Logic
  if (
    data.tool === "Cursor" &&
    Number(data.seats) === 1
  ) {
    optimizedSpend = currentSpend - 10;

    recommendation =
      "Consider switching to Cursor Pro instead of higher-tier plans.";

    reason =
      "Advanced collaboration features are underutilized for solo usage.";
  }

  // Claude Logic
  if (
    data.tool === "Claude" &&
    data.useCase === "Writing"
  ) {
    optimizedSpend = currentSpend - 15;

    recommendation =
      "Claude Pro may provide similar value at lower cost.";

    reason =
      "Your workload may not require higher-tier Claude plans.";
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
  };
};
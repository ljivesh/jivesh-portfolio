export type ControlScores = { reliability: number; autonomy: number; latency: number; cost: number };

export function applyScoreDelta(scores: ControlScores, delta: ControlScores): ControlScores {
  return {
    reliability: scores.reliability + delta.reliability,
    autonomy: scores.autonomy + delta.autonomy,
    latency: scores.latency + delta.latency,
    cost: scores.cost + delta.cost,
  };
}

export function launchRating(scores: ControlScores) {
  if (scores.reliability >= 10) return "PRODUCTION READY";
  if (scores.reliability >= 7) return "CONDITIONAL RELEASE";
  return "LAUNCH BLOCKED";
}

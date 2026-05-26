export const fmt = (n) => n >= 1_000_000
  ? `\u20AC${(n / 1_000_000).toFixed(1)}M`
  : `\u20AC${(n / 1_000).toFixed(0)}K`;

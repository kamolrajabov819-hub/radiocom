export const INDUSTRY_SLUGS = ["horeca", "construction", "security", "mining", "transport", "manufacturing"] as const;
export type IndustrySlug = typeof INDUSTRY_SLUGS[number];

// Recommended product IDs per industry slug (subset of catalog to feature)
export const industryPicks: Record<IndustrySlug, string[]> = {
  horeca:        ["m-clp446", "m-clk446", "m-xt185", "rc-21", "m-t62", "d-dc63-red"],
  construction:  ["m-dp4400", "m-dp2600", "rc-5d", "m-tlkr-t92h2o", "h-s35-pro-lf", "m-slr5500"],
  security:      ["m-dp3441", "m-dp4400", "m-clp446", "rc-21", "m-t82-extreme-rsm", "m-dp1400"],
  mining:        ["m-dp4800", "m-dp4600", "m-dm4600", "m-slr8000", "m-slr5500", "c-e690"],
  transport:     ["m-dm4600", "m-dm2600", "m-dp4600", "c-e690", "c-e600", "pda-pad-6000m2"],
  manufacturing: ["m-dp2400", "m-dp2600", "m-dp4600", "c-e690", "m-slr5500", "pda-pad-6000m2"],
};

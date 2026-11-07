import { site } from "../../site.config";
import { MODULES, type ModuleId, type Tier } from "./modules";

export const PLAN_ORDER = ["basic", "start", "plus", "pro"] as const;

/** True when `tier` is included in `plan` (add-ons never are). */
export function tierIncluded(tier: Tier, plan: (typeof PLAN_ORDER)[number]): boolean {
  if (tier === "addon") return false;
  return PLAN_ORDER.indexOf(tier) <= PLAN_ORDER.indexOf(plan);
}

/**
 * Is a module on? Plan default (tier ≤ plan) merged with `site.features`
 * overrides. Safe in server components, route handlers and client components —
 * site.config.ts contains no secrets.
 */
export function isOn(id: ModuleId): boolean {
  const override = site.features[id];
  if (typeof override === "boolean") return override;
  const def = MODULES[id];
  if (def.kind !== "flag") return false;
  return tierIncluded(def.tier, site.plan);
}

/** Max number of extra content pages allowed by the current plan/flags. */
export function maxExtraPages(): number {
  if (isOn("CNT-03")) return 10;
  if (isOn("CNT-02")) return 5;
  return 0;
}

/** Env vars the enabled modules expect; used by the demo-mode banner in README/dev. */
export function missingEnvForEnabledModules(env: NodeJS.ProcessEnv = process.env): string[] {
  const missing: string[] = [];
  for (const [id, def] of Object.entries(MODULES)) {
    if (!isOn(id as ModuleId) || !("envVars" in def) || !def.envVars) continue;
    for (const v of def.envVars) if (!env[v]) missing.push(`${id}:${v}`);
  }
  return missing;
}

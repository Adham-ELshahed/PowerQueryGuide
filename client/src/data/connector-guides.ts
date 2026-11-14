import { databaseGuides } from "./guides/databases";
import { cloudStorageGuides } from "./guides/cloud-storage";
import { saasGuides } from "./guides/saas";
import { analyticsGuides } from "./guides/analytics";
import { filesWebGuides } from "./guides/files-web";
import { databasesNewGuides } from "./guides/databases-new";
import { saasNewGuides } from "./guides/saas-new";
import { saasNewGuides2 } from "./guides/saas-new2";
import { analyticsNewGuides } from "./guides/analytics-new";
import { filesWebNewGuides } from "./guides/files-web-new";
import { cloudStorageNewGuides } from "./guides/cloud-storage-new";
import { azureFabricGuides } from "./guides/azure-fabric";
import { powerPlatformGuides } from "./guides/power-platform";
import { saasNewGuides3 } from "./guides/saas-new3";
import { databasesNewGuides2 } from "./guides/databases-new2";

/**
 * Practical connector guides — the dual-structure counterpart to the
 * auto-parsed /function/<name> reference pages.
 *
 * Phase 1 of this system cross-referenced the Microsoft connectors index
 * (learn.microsoft.com/en-us/power-query/connectors/) with the local
 * functions.json dataset: every Microsoft connector whose entry M function
 * exists locally got a guide here (content is written from scratch in a
 * data-engineer voice — no Microsoft text is copied). Microsoft connectors
 * with no local function are skipped entirely and listed in the audit
 * report.
 *
 * Each guide powers:
 *  - a dedicated page at /connectors/<slug> (rendered by connector-guide.tsx),
 *  - the guide/reference tab switch shown on BOTH the guide page and the
 *    function's reference page (components/connector-tabs.tsx),
 *  - the "Guide" badge + link target on the Connectors index cards.
 *
 * `functions[0]` is the primary entry function (the toggle's reference
 * target); additional entries let sibling functions (Sql.Databases,
 * SharePoint.Files, …) share one guide.
 */
export interface ConnectorGuide {
  /** Route slug — page lives at /connectors/<slug> */
  slug: string;
  /** Display name as shown in the Get Data experience, e.g. "SQL Server" */
  name: string;
  /** Catalog group label — must match a ConnectorCatalogGroup.label */
  group: string;
  /** One-line summary used on the page lead and index cards */
  tagline: string;
  /** Host experiences from the Microsoft availability matrix */
  products: string[];
  /** Sign-in methods, when documented */
  authentication?: string[];
  /** Data access modes */
  capabilities: string[];
  /** Entry functions — first is primary (toggle target) */
  functions: string[];
  /** Microsoft Learn connector reference, when one exists */
  msdoc: string | null;
  /** Practical guide body — markdown rendered by lib/markdown.tsx */
  content: string;
}

/** Every practical guide, grouped in catalog order. */
export const connectorGuides: ConnectorGuide[] = [
  ...databaseGuides,
  ...cloudStorageGuides,
  ...saasGuides,
  ...analyticsGuides,
  ...filesWebGuides,
  ...databasesNewGuides,
  ...saasNewGuides,
  ...saasNewGuides2,
  ...analyticsNewGuides,
  ...filesWebNewGuides,
  ...cloudStorageNewGuides,
  ...azureFabricGuides,
  ...powerPlatformGuides,
  ...saasNewGuides3,
  ...databasesNewGuides2,
];

/** Canonical href for a connector guide. */
export const connectorHref = (slug: string): string => `/connectors/${slug}`;

/** The guide that documents a given entry function, if one exists. */
export function connectorGuideForFunction(
  functionName: string,
): ConnectorGuide | null {
  return (
    connectorGuides.find((guide) => guide.functions.includes(functionName)) ??
    null
  );
}

/** Look up a guide by its route slug. */
export function connectorGuideForSlug(slug: string): ConnectorGuide | null {
  return connectorGuides.find((guide) => guide.slug === slug) ?? null;
}

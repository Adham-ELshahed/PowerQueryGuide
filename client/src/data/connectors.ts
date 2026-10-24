/**
 * Connector guides — practical, example-driven documentation for the data
 * sources Power Query connects to.
 *
 * Each guide complements the auto-parsed /function/<entry> reference page
 * (rendered from functions.json) with the surrounding story the reference
 * format cannot hold: prerequisites, capabilities, limitations and working
 * recipes. Guides live at /connectors/<slug>; this registry powers the
 * /connectors index and the cross-link rendered on each entry function's
 * reference page, so adding a connector never touches the function pipeline.
 */

export interface ConnectorGuide {
  /** Route slug — page lives at /connectors/<slug> */
  slug: string;
  /** Product name as shown in the Get Data experience */
  name: string;
  /** One-line summary used on index cards and cross-links */
  tagline: string;
  /** Host experiences that ship this connector */
  products: string[];
  /** Supported authentication methods */
  authentication: string[];
  /** Data access modes */
  capabilities: string[];
  /** Entry M functions, linked to their /function/<name> reference pages */
  functions: string[];
  /** Microsoft Learn documentation for the connector */
  msdoc: string;
}

export const connectorGuides: ConnectorGuide[] = [
  {
    slug: "exchange-online",
    name: "Microsoft Exchange Online",
    tagline:
      "Extract mail, calendars and contacts from a Microsoft 365 mailbox into Power Query.",
    products: ["Excel", "Power BI", "Power Query Online"],
    authentication: ["Exchange account", "Microsoft account"],
    capabilities: ["Import"],
    functions: ["Exchange.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/microsoft-exchange-online",
  },
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

import type { ConnectorGuide } from "../connector-guides";

/**
 * Practical guides for the Files & Web group — added by the Microsoft connectors
 * index expansion. Content is original (data-engineer voice), generated from
 * the connector audit facts under Temp/opencode/guides-src.
 */
export const filesWebNewGuides: ConnectorGuide[] = [
  {
    slug: "google-sheets",
    name: "Google Sheets",
    group: "Files & Web",
    tagline:
      "Load any Google Sheet you can open into Power BI or a dataflow by pasting its URL.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Google Account"],
    capabilities: ["Import"],
    functions: ["GoogleSheets.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/google-sheets",
    content: `## When to Use It
Google Sheets is where the unofficial numbers live: ops trackers, regional budgets, survey responses, and the spreadsheet someone maintains because it started as a one-off. This connector takes the sheet's URL and returns its content as a table, so Power BI can consume a shared drive file the same way it consumes a database. It is the right pick when the sheet is genuinely the source of truth — and a poor one when the sheet is a manual export you could pull from upstream instead.
## Before You Start
You need a Google account with access to the sheet you are connecting to; sign-in runs through Google Account OAuth in an external browser window, where you approve Power BI's access. The one required parameter is the Google Sheet URL, copied from the address bar while viewing the sheet: the connector checks that it starts with https://docs.google.com/spreadsheets/d/, pulls the spreadsheet ID out, and ignores the rest — that full URL becomes the connection's resource path. Shared drives are supported. Because each sheet URL is its own resource path, a new URL means a new authentication step, though an active Google session usually saves you the repeated sign-in. Power BI and Power Query Online are both supported with Import only, and the cloud source means no gateway.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, search for Google Sheets, select it, then Connect. Paste the sheet URL when prompted and select Sign In — a Sign in with Google dialog opens in an external browser; pick your account and approve the connection. Navigator then shows the data available on the sheet: choose it, then Load or Transform Data.
## Connect in Power Query Online
Select Google Sheets on the Connect to data source page, paste the same URL, and sign in with the Google account that can open the sheet. Select Next, choose the sheets you want on the Choose data page, and continue to the Power Query Editor to transform before saving.
## Recipes in M
### Connect by sheet URL
The URL is the only argument; everything else comes from the signed-in Google session.
\`\`\`powerquery
let
 Source = GoogleSheets.Contents(
 "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
 )
in
 Source
\`\`\`
### Drill into one sheet by name
The workbook exposes its sheets as navigation rows — index by Name and take the Data.
\`\`\`powerquery
let
 Source = GoogleSheets.Contents(
 "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
 ),
 Sheet1 = Source{[Name = "Sheet1"]}[Data]
in
 Sheet1
\`\`\`
## Limitations & Tips
Each sheet URL is a distinct resource path, so connecting a second workbook means authenticating for that path too — keep one query per sheet rather than trying to enumerate workbooks. Only Import is supported, so schedule refresh, and remember the sheet's owners can change columns or delete rows at any time: promote headers only after confirming the first row really is the header. No gateway is needed in Power Query Online, but a sheet restricted to specific people will fail refresh if the credential you saved belongs to someone else.`,
  },
  {
    slug: "sis-cc-sdmx",
    name: "SIS-CC SDMX",
    group: "Files & Web",
    tagline:
      "Query statistical data from any SDMX RESTful web service that serves SDMX-CSV 2.1.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Anonymous"],
    capabilities: ["Import"],
    functions: ["SDMX.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/sis-cc-sdmx",
    content: `## When to Use It
SDMX is the exchange format statistical agencies use for time series, and this connector reads from an SDMX RESTful web service that supports the CSV format. You supply the data query URL, choose a display format, optionally set a label language, and get back a table of the series it returns. It is the practical route when an official statistics source publishes SDMX and the alternative is hand-copying CSV exports into a workbook.
## Before You Start
The URL must be correctly configured from the service provider's API — the exact shape depends on the provider, so build and test the query URL in a browser first. Authentication is Anonymous: no account, no token, just a Connect confirmation when you first touch that URL. Two parameters are required — the data query URL and the display format, which takes one of Show codes and labels, Show codes only, or Show labels only. The optional Language argument takes IETF BCP 47 tags such as fr-CH, fr, en and controls the label language. Power BI and Power Query Online are supported; the service is a public web endpoint, so no gateway is required. The connector is in Preview and supports Import of the SDMX-CSV 2.1 format only.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, choose All in the categories, select SIS-CC SDMX, then Connect. Fill in the Data query URL with an SDMX REST data query that supports SDMX-CSV, pick a Display format — for example codes and labels together, codes only (FREQ), or labels only (Frequency) — and optionally enter a BCP 47 language tag. The first connection to a URL shows an authentication step; since the connection is anonymous, select Connect. Then Load or Transform Data.
## Connect in Power Query Online
Add SIS-CC SDMX from the data source page, enter the same data query URL, display format, and optional language, and confirm the anonymous connection. Once it succeeds, choose the data on the Choose data page and continue into the Power Query Editor before saving.
## Recipes in M
### Query a series with codes and labels
The URL and display format are both required; language stays optional.
\`\`\`powerquery
let
 Source = SDMX.Contents(
 "https://stats.example.org/data/DF_SZ_1",
 "Show codes and labels"
 )
in
 Source
\`\`\`
### Ask for codes only in French labels
Adding the BCP 47 tag changes how labels come back without touching the data query itself.
\`\`\`powerquery
let
 Source = SDMX.Contents(
 "https://stats.example.org/data/DF_SZ_1",
 "Show codes only",
 "fr-CH, fr, en"
 )
in
 Source
\`\`\`
## Limitations & Tips
Only SDMX-CSV 2.1 is supported — SDMX-ML and SDMX-JSON will not import, so confirm the provider serves CSV before writing the query. The display format is required and limited to the three allowed values; wrong casing or an invented option fails the call. The URL, not the connector, does the filtering: narrow the data query upstream rather than pulling a full dataset and trimming in Power Query, since a broad statistical query can be slow to refresh. Preview status means the connector may change, and Import is the only capability, so schedule refresh rather than expecting a live connection.`,
  },
];

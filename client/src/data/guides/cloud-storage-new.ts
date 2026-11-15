import type { ConnectorGuide } from "../connector-guides";

/**
 * Practical guides for the Cloud Storage group — added by the Microsoft connectors
 * index expansion. Content is original (data-engineer voice), generated from
 * the connector audit facts under Temp/opencode/guides-src.
 */
export const cloudStorageNewGuides: ConnectorGuide[] = [
  {
    slug: "azure-data-lake-storage-gen1",
    name: "Azure Data Lake Storage Gen1",
    group: "Cloud Storage",
    tagline:
      "Browse an Azure Data Lake Storage Gen1 account and pull its files into Excel, Power BI, or dataflows.",
    products: ["Excel", "Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["DataLake.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/azure-data-lake-storage-gen1",
    content: `## When to Use It
A Gen1 account is where raw landings files land before anything shapes them — logs, exports, weekly drops. This connector is for reading that file tree without a compute engine in between. \`DataLake.Contents(url, optional options)\` returns a table with one row per folder and file found at the URL, each row carrying its properties plus a link to its content, which you drill into to walk down a folder or to read a file's bytes.

## Before You Start
You need an Azure subscription and a Data Lake Storage Gen1 account with files in it. Sign-in is Microsoft Entra ID only — your organizational account, redirected through your organization's sign-in page the first time. The source lives in the cloud, so no gateway is involved in Power Query Online.

Supported capability is Import only: there's no DirectQuery for a file listing. Products are Excel, Power BI, and Power Query Online.

## Connect from the Desktop
In Power BI Desktop: Get Data → Azure → Azure Data Lake Storage Gen1 → Connect. Enter the account URL — the \`swebhdfs://\` form — and optionally a Page Size in Bytes, then OK. Sign in on the first connection, and Navigator shows the files you uploaded; load or transform them. Excel offers the same connector from its Data → Get Data menu, with the same URL field and the same Entra sign-in.

## Connect in Power Query Online
Pick Azure Data Lake Storage Gen1 on the connect-to-data-source page, enter the account URL, sign in with your organizational account, and continue. Select the data you need in the choose-data step, then Transform data to finish the shape in the editor — no gateway selection is required for a cloud account.

## Recipes in M
### List the account root
\`\`\`powerquery
let
 Source = DataLake.Contents("swebhdfs://contoso.azuredatalake.net/")
in
 Source
\`\`\`
The URL argument is required and points at the account (or a folder within it); the result is a row per folder and file.

### Descend into a folder
\`\`\`powerquery
let
 Source = DataLake.Contents("swebhdfs://contoso.azuredatalake.net/"),
 Sample = Source{[Name = "sample"]}[Content]
in
 Sample
\`\`\`
Pulling the content link of a folder row yields that folder's entries, so the same query pattern walks the tree one level at a time.

### Read larger files in fewer pieces
\`\`\`powerquery
let
 Source = DataLake.Contents("swebhdfs://contoso.azuredatalake.net/", [PageSize = 8388608])
in
 Source
\`\`\`
PageSize is an options field in bytes that controls how big files are split up; the documented default is 4 MB, and 8388608 is 8 MB.

## Limitations & Tips
- Import only — anything you want in a model gets copied into it at refresh.
- Entra ID is the sole sign-in kind, so service principal or key-style access isn't available through this connector.
- Raise Page Size when you read many large files and want fewer round trips; lower it if memory pressure appears during refresh.
- The URL must be the Gen1 account address in \`swebhdfs://\` form — a mismatch fails at connect time rather than returning an empty listing.
- Keep file selection narrow in the editor; a root listing can include hundreds of entries you never load.`,
  },
  {
    slug: "delta-sharing",
    name: "Delta Sharing",
    group: "Cloud Storage",
    tagline:
      "Pull tables from a Delta Sharing share using the endpoint URL and token in the credentials file you were sent.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth", "Authentication"],
    capabilities: ["Import"],
    functions: ["DeltaSharing.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/delta-sharing",
    content: `## When to Use It
Delta Sharing is how a data provider hands you Delta tables without granting you a workspace: you get a credentials file, and this connector turns it into queryable tables. \`DeltaSharing.Contents(host, optional options)\` takes the endpoint URL from that file and returns a navigation table of the shared tables — drill by Name to load the one you care about.

## Before You Start
The provider sends an activation URL; download the credentials file from it and open it in a text editor to extract two things: the endpoint URL (which goes in the Server URL field) and the token. Sign-in kinds are Authentication — the bearer token from that file — and OAuth, where you sign in through your organization's identity provider using OpenID Connect.

Power BI Desktop needs the November release or later. The share comes over the network from a cloud service, so Power Query Online connects without a gateway. Capability is Import only.

## Connect from the Desktop
Get Data → search Delta Sharing → Connect. Paste the endpoint URL from the credentials file into Delta Sharing Server URL, and optionally set a Row Limit under Advanced Options — 1,000,000 rows by default. In the authentication dialog choose Authentication and paste the bearer token, or choose OAuth and sign in, then Connect and pick the tables in Navigator.

## Connect in Power Query Online
Select Delta Sharing on the connect-to-data-source page and enter the Server URL from the credentials file. Pick the authentication kind — bearer token or OAuth (OIDC) — sign in, then on the choose-data page select the tables and continue to Transform data.

## Recipes in M
### Connect with the shared endpoint
\`\`\`powerquery
let
 Source = DeltaSharing.Contents("https://example.databricks.com/api/2.0/delta-sharing/metastores/19a85dee-54bc-43a2-87ab-023d0ec16013")
in
 Source
\`\`\`
The URL is the endpoint from the credentials file, and it is the only required argument.

### Open one shared table
\`\`\`powerquery
let
 Source = DeltaSharing.Contents("https://example.databricks.com/api/2.0/delta-sharing/metastores/19a85dee-54bc-43a2-87ab-023d0ec16013"),
 Daily = Source{[Name = "sales_daily"]}[Data]
in
 Daily
\`\`\`
The navigation table lists the tables the share exposes; the Name lookup pins the one you want independent of ordering.

### Cap what comes across
\`\`\`powerquery
let
 Source = DeltaSharing.Contents(
 "https://example.databricks.com/api/2.0/delta-sharing/metastores/19a85dee-54bc-43a2-87ab-023d0ec16013",
 [rowLimitHint = 250000]
 )
in
 Source
\`\`\`
rowLimitHint is the options field behind the dialog's Row Limit; the default is one million rows, and lower it when the share is wider than your model needs.

## Limitations & Tips
- Everything loaded has to fit in the memory of the machine refreshing it — that's what the row limit protects.
- The token is a credential: treat the credentials file like a password and rotate it when the provider reissues it.
- OAuth sign-in needs an identity provider your tenant already federates with; otherwise use the bearer token path.
- Import only, so schedule refreshes deliberately — every row lands in the model.
- If a share grows past what you can model, reduce the row limit or ask the provider for a narrower share.`,
  },
];

import type { ConnectorGuide } from "../connector-guides";

/**
 * Practical guides for the Power Platform group — added by the Microsoft connectors
 * index expansion. Content is original (data-engineer voice), generated from
 * the connector audit facts under Temp/opencode/guides-src.
 */
export const powerPlatformGuides: ConnectorGuide[] = [
  {
    slug: "common-data-service-legacy",
    name: "Common Data Service (Legacy)",
    group: "Power Platform",
    tagline:
      "Read Dataverse tables through the legacy Common Data Service connector over its OData endpoint.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["Cds.Entities"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/common-data-service-legacy",
    content: `## When to Use It
Dataverse holds the tables behind Power Apps — accounts, contacts, and whatever the app team defined — and this legacy connector reads them over OData. \`Cds.Entities(url, optional options)\` takes the environment URL and returns a navigation table of entities; drill by Name into an entity's Data to get its rows alongside everything else in your model. It's the established path for reports already built on it.

## Before You Start
You need a Common Data Service (Legacy) environment where you have maker permissions to access the portal and read permissions on the tables you want; sign-in is Microsoft Entra ID. The URL is the environment root in \`https:// .crm.dynamics.com/\` form — the settings dialog in Power Apps shows it.

Dataverse is cloud-hosted, so Power Query Online needs no gateway unless you're combining it with on-premises data such as a local SQL Server, in which case pick one. Capability is Import only.

## Connect from the Desktop
Get Data → Common Data Service (Legacy). Enter the environment URL, optionally adjust advanced settings — Reorder columns and Add display column both default to true — then OK. Sign in with your organizational account, and Navigator shows the tables: load or transform.

## Connect in Power Query Online
Select Common Data Service (Legacy) in the get-data experience, enter the server URL, and add an on-premises gateway only if you're joining this data with on-premises sources. Sign in to your organizational account, continue to the navigation page, select the data, and transform it.

## Recipes in M
### Connect to an environment
\`\`\`powerquery
let
 Source = Cds.Entities("https://tenant.crm.dynamics.com/")
in
 Source
\`\`\`
The URL is the only required argument and must be the environment root; the result is the entity navigation table.

### Open one entity
\`\`\`powerquery
let
 Source = Cds.Entities("https://tenant.crm.dynamics.com/"),
 Accounts = Source{[Name = "accounts"]}[Data]
in
 Accounts
\`\`\`
Entities are listed by their logical names, so drilling on \`accounts\` gives you the account rows regardless of how the Navigator sorts.

### Change the default column behavior
\`\`\`powerquery
let
 Source = Cds.Entities(
 "https://tenant.crm.dynamics.com/",
 [ReorderColumns = false, UseFormattedValue = false]
 )
in
 Source
\`\`\`
Both options default to true — columns arrive alphabetized and picklists get a \`_display\` companion. Turning them off keeps the schema as it exists in Dataverse.

## Limitations & Tips
- Throughput sits around 500 rows per second for typical tables, and the OData API applies its own performance and throttling limits — plan refreshes accordingly.
- For large or frequent extraction, consider alternatives: export to data lake, the OData connector, or the Dataverse connector may suit better than repeated pulls here.
- Reorder columns and Add display column are options record fields with defaults of true — flipping them changes the output shape, so pin drills by Name after you decide.
- Import only: everything selected lands in the model, so filter rows early.
- Sign in with an identity that holds read permission on the target tables; maker permission alone doesn't grant data access.`,
  },
  {
    slug: "dataflows",
    name: "Dataflows",
    group: "Power Platform",
    tagline:
      "Reuse the curated entities your team already publishes as dataflows instead of re-pointing your model at the raw sources.",
    products: ["Excel", "Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["PowerPlatform.Dataflows"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/dataflows",
    content: `## When to Use It
Dataflows are where scheduled transformation logic already runs in the Power Platform and Power BI services. This connector is the right pick when a report or downstream dataflow should consume a published dataflow rather than re-implement its source queries. \`PowerPlatform.Dataflows\` takes a single optional \`options\` record and returns a table of the dataflows your account can read; each row drills into that dataflow's entities, which is the table you shape next.
## Before You Start
You need an existing dataflow, maker permissions to browse it in the portal, and read permission on the data it produces. Sign-in is Microsoft Entra ID with an organizational account — there is no anonymous or key option. The dataflow itself is cloud-hosted, so no gateway is required unless you combine it with an on-premises source such as SQL Server; if you do, attach an on-premises data gateway while configuring the connection in Power Query Online. The connector appears in Excel, Power BI, and Power Query Online. Two access details to confirm early: consuming a Dataflow Gen2 requires Admin, Member, or Contributor rights on the dataflow (Viewer is not enough), and the Excel host does not support sovereign cloud clusters.
## Connect from the Desktop
Open Get Data and select **Dataflows** — the surrounding list differs between Excel, Power BI Desktop, and other hosts. Sign in with your organizational account the first time, select Connect, then pick your dataflow in the Navigator and either load it or open it in the query editor.
## Connect in Power Query Online
Choose the Dataflows option in the get data experience and adjust the connection name if you want. Add a gateway only when you will mix the dataflow with on-premises data, then sign in with your organizational account, continue to the navigation page, select the data you need, and choose Transform Data.
## Recipes in M
An empty call is enough to enumerate everything the signed-in account can reach; the optional record can simply be omitted.
\`\`\`powerquery
let
 Source = PowerPlatform.Dataflows()
in
 Source
\`\`\`
Drill by the dataflow's name to pin it regardless of how the navigation table happens to be sorted. The entity table that comes back is what you filter, append, or reference from other queries.
\`\`\`powerquery
let
 Source = PowerPlatform.Dataflows(),
 Sales = Source{[Name = "Sales"]}[Data]
in
 Sales
\`\`\`
## Limitations & Tips
This connector is generally available, and the entry function has zero required parameters, so nothing blocks a refresh. Import works everywhere; DirectQuery for Power BI semantic models depends on where the dataflow runs — Gen1 needs a Premium capacity with the enhanced compute engine on, Gen2 needs Fabric. Refresh time stacks the dataflow's own schedule on top of yours, so avoid chaining several heavy dataflows behind one report. If a Gen2 table is missing from the Navigator, check permissions before debugging anything else.`,
  },
  {
    slug: "dataverse",
    name: "Dataverse",
    group: "Power Platform",
    tagline:
      "Query Dataverse tables behind Dynamics 365 and Power Apps through the connector's TDS-backed path, with Import or DirectQuery.",
    products: ["Excel", "Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["CommonDataService.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/dataverse",
    content: `## When to Use It
Dataverse is the table store behind Dynamics 365 and Power Apps: accounts, opportunities, custom entities, and the relationships between them. \`CommonDataService.Database\` accepts an optional environment domain and an optional options record, and returns a navigation table you drill into per table. Pass the domain to land straight in one environment, or leave it null to list every environment your sign-in can see.
## Before You Start
You need a Dataverse environment, read permission on the tables you want, and the TDS endpoint setting enabled for that environment. Connections ride TCP port 1433 by default; if 1433 is blocked in your network, port 5558 is the fallback and you append it to the environment URL. Sign-in is Microsoft Entra ID — note that service principal authentication does not work together with an on-premises or virtual network data gateway. It appears in Excel, Power BI, and Power Query Online; Dataverse is cloud-hosted, so a gateway only matters when you combine it with an on-premises source in Power Query Online, and Excel's connector skips sovereign cloud clusters.
## Connect from the Desktop
Select **Dataverse** from Get Data and sign in with your organizational account. In Navigator, expand the environment and pick your tables; Power BI Desktop then asks you to choose Import or DirectQuery. The connector suits analytics workloads, not bulk extraction.
## Connect in Power Query Online
Choose Dataverse on the Choose data source page. Leave the server URL blank to list every environment you can use, or type an environment URL — append \`,5558\` when that port is required. Attach a gateway only if you will combine Dataverse with on-premises data, sign in with your organizational account, then continue to the navigation page and select Transform Data. Advanced options let you toggle include relationship columns.
## Recipes in M
A plain call with the environment domain returns that environment's tables as a navigation table.
\`\`\`powerquery
let
 Source = CommonDataService.Database("orgname.crm.dynamics.com")
in
 Source
\`\`\`
Drill into a table by its logical name — Dataverse tables come back plural and lower-cased, so the drill stays stable no matter how Navigator sorts.
\`\`\`powerquery
let
 Source = CommonDataService.Database("orgname.crm.dynamics.com"),
 Accounts = Source{[Name = "accounts"]}[Data]
in
 Accounts
\`\`\`
When 1433 is closed off, build the source with the port appended; in Power Query Desktop this has to be written in M rather than typed into a dialog.
\`\`\`powerquery
let
 Source = CommonDataService.Database("orgname.crm.dynamics.com,5558")
in
 Source
\`\`\`
## Limitations & Tips
Generally available, with Import supported broadly and DirectQuery available to Power BI semantic models. Both parameters are optional, but an empty call only lists environments — supply a domain to skip a navigation step. Expect roughly 500 rows per second on default tables as a guideline; for bulk extraction, export to a data lake or query over TDS instead. Leave relationship columns out unless needed, filter early, and remember that a service principal cannot go through a gateway.`,
  },
  {
    slug: "power-bi",
    name: "Power BI dataflows (Legacy)",
    group: "Power Platform",
    tagline:
      "Pull published Power BI dataflow output through the legacy dataflows entry point when an existing model still depends on it.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["DirectQuery"],
    functions: ["PowerBI.Dataflows"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/power-bi",
    content: `## When to Use It
This is the legacy connector for Power BI dataflows — the older entry point that existing reports were built against. Reach for it when your dataflows live in the Power BI service and the model you are maintaining already calls \`PowerBI.Dataflows\`. The function takes a single optional \`options\` record and returns a table of the dataflows your account can access; you drill into a row to get the entities underneath it, then load or transform those.
## Before You Start
You need at least one dataflow published in the service and read permission on it. Authentication is Microsoft Entra ID with your organizational account — no other sign-in kinds are offered. Dataflows are cloud-hosted, so no gateway is needed for a straight read; only when you combine a dataflow with an on-premises source inside Power Query Online do you attach an on-premises data gateway. The connector is available in Power BI and Power Query Online, not Excel.
## Connect from the Desktop
Open Get Data from the Home ribbon, find the dataflows entry in the list, and select Connect. Sign in with your organizational account the first time, then use the Navigator to expand the dataflow you want and either load it or open it in the query editor for shaping.
## Connect in Power Query Online
Pick the dataflows option in the get data experience for your app, adjust the connection name, and add a gateway only if you will combine the dataflow with on-premises data. Sign in with your organizational account, move on to the navigation page, select the data you need, and choose Transform Data.
## Recipes in M
The function has no required arguments, so an empty call enumerates every dataflow the account can read.
\`\`\`powerquery
let
 Source = PowerBI.Dataflows()
in
 Source
\`\`\`
Drill into a dataflow by name to get its entity table; the Name value mirrors what the Navigator shows, so the reference survives changes in row order.
\`\`\`powerquery
let
 Source = PowerBI.Dataflows(),
 Customers = Source{[Name = "Customer360"]}[Data]
in
 Customers
\`\`\`
When a workspace holds many dataflows, narrow the listing first instead of scrolling a giant preview.
\`\`\`powerquery
let
 Source = PowerBI.Dataflows(),
 SalesFlows = Table.SelectRows(Source, each Text.Contains([Name], "Sales"))
in
 SalesFlows
\`\`\`
## Limitations & Tips
Generally available, and the only parameter is an optional record that never blocks a refresh. DirectQuery is listed as a capability, but whether it applies depends on the host and capacity behind your dataflows — verify it in your own workspace rather than assuming it. Since this is the legacy path, treat the newer Power Platform dataflows connector as the default for new work and keep this one for compatibility. Keep each query narrowed to a single dataflow's entities so refreshes stay predictable.`,
  },
];

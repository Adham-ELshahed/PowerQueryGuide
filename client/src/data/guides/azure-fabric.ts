import type { ConnectorGuide } from "../connector-guides";

/**
 * Practical guides for the Azure & Fabric group — added by the Microsoft connectors
 * index expansion. Content is original (data-engineer voice), generated from
 * the connector audit facts under Temp/opencode/guides-src.
 */
export const azureFabricGuides: ConnectorGuide[] = [
  {
    slug: "azure-cost-management",
    name: "Azure Cost Management",
    group: "Azure & Fabric",
    tagline:
      "Bring Azure spend for an Enterprise Agreement or Microsoft Customer Agreement into Power BI by billing scope.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["AzureCostManagement.Tables"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/azure-cost-management",
    content: `## When to Use It
Cost data answers "which subscription is burning the budget" questions that operational tables can't. This connector pulls Azure cost records for a billing scope over a window of months, ready to model by service, resource group, or tag. \`AzureCostManagement.Tables(scope, scopeValue, numberOfMonths, optional options)\` is the entry point — three required arguments that together say whose costs, for how long.

## Before You Start
You need an Azure subscription plus either a direct Microsoft Customer Agreement or an Enterprise Agreement. Sign-in is Microsoft Entra ID over OAuth 2.0, and the account has to carry weight: an Enterprise Administrator for EA scopes, or appropriate permissions at the billing account or billing profile level for Microsoft Customer Agreements.

The source is cloud-side, so no gateway is needed in Power Query Online. Capability is Import only. Note this connector replaces the older Azure Consumption Insights and Azure Cost Management (Beta) connectors — reports built on those have to be rebuilt here.

## Connect from the Desktop
Home → Get Data → Azure → Azure Cost Management. Set Choose Scope to Enrollment Number for an Enterprise Agreement, or Manually Input Scope for a Microsoft Customer Agreement and paste the billing resource ID from the Azure portal (Cost Management + Billing → billing profile → Properties → Billing profile ID). Enter the number of months — or 0 and pin dates through the Start Date and End Date advanced options — then OK and sign in.

## Connect in Power Query Online
Choose Azure Cost Management on the connect-to-data-source page, fill in the same scope, identifier, and month fields, sign in with your organizational account, and continue to the data selection. Transform the returned data in the editor before creating it.

## Recipes in M
### Fetch six months of manual scope
\`\`\`powerquery
let
 Source = AzureCostManagement.Tables(
 "Manually Input Scope",
 "/providers/Microsoft.Billing/billingAccounts/contoso-billing/billingProfiles/primary",
 6
 )
in
 Source
\`\`\`
Scope and scopeValue pair up: the identifier argument only matters when the scope is Manually Input Scope, where it is the billing resource path.

### Browse what a scope exposes
\`\`\`powerquery
let
 Source = AzureCostManagement.Tables("Enrollment Number", "", 3),
 First = Source{0}[Data]
in
 First
\`\`\`
scopeValue stays empty for preset scopes — it is still a required argument. Indexing the first entry is a quick way to see what a new scope returns before you commit to a name-based drill.

## Limitations & Tips
- Pay-as-you-go Microsoft Customer Agreements, indirect Microsoft Customer Agreements, and Microsoft Partner Agreements are unsupported — use Cost Management exports for those instead.
- Result sets beyond one million rows aren't supported; narrow the date window or lean on exports for heavy history.
- The connector doesn't work with Office 365 GCC customer accounts.
- Use 0 months with Start Date/End Date when you need an exact range rather than "last N months".
- Sign in with an account that actually holds billing permissions; a successful Entra sign-in can still fail on scope authorization.`,
  },
  {
    slug: "azure-data-explorer",
    name: "Azure Data Explorer (Kusto)",
    group: "Azure & Fabric",
    tagline:
      "Query Kusto tables and KQL from Excel, Power BI, and dataflows — imported or live through DirectQuery.",
    products: ["Excel", "Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["AzureDataExplorer.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/azure-data-explorer",
    content: `## When to Use It
Azure Data Explorer is where telemetry, logs, and time-series land, and KQL is how you slice them. This connector covers both browsing and querying: \`AzureDataExplorer.Contents(cluster, optional database, optional tableOrQuery, optional options)\` returns a navigation table of databases when you stop at the cluster, but with a database and a table or KQL query supplied it goes straight at the rows.

## Before You Start
You need an Azure subscription and an organizational email that's a member of Microsoft Entra ID — that's the sign-in kind. For KQL Database targets you need read permissions on the database itself.

The cluster is a cloud endpoint, so Power Query Online normally connects with no gateway (the dialog still lets you select one if your tenant routes traffic that way). Both Import and DirectQuery are supported. Release status is split: Azure Data Explorer (Kusto) is generally available, KQL Database is in preview.

## Connect from the Desktop
Get Data → Azure Data Explorer (Kusto). Enter the cluster URL in the \`https:// . .kusto.windows.net\` form, optionally choose a database and a table — or a query like \`StormEvents | take 1000\` — then set any advanced options, pick Import or DirectQuery, and sign in with an organizational account. Navigator follows.

## Connect in Power Query Online
Pick Azure Data Explorer (Kusto) in the get-data experience, provide the cluster URL, database, and query if you have them, select a gateway only if needed, and sign in with your organizational account. Continue to the choose-data page, select what you want, and transform.

## Recipes in M
### Open a cluster
\`\`\`powerquery
let
 Source = AzureDataExplorer.Contents("https://mycluster.kusto.windows.net")
in
 Source
\`\`\`
The cluster URL is the only required argument; without a database you get the navigation table of databases.

### Drill database to table
\`\`\`powerquery
let
 Source = AzureDataExplorer.Contents("https://mycluster.kusto.windows.net", "MyDatabase"),
 Logs = Source{[Name = "Logs"]}[Data]
in
 Logs
\`\`\`
Pass the database as the second argument and the remaining navigation table lists its tables — the Name lookup pins the one you want.

### Push the KQL down
\`\`\`powerquery
let
 Source = AzureDataExplorer.Contents(
 "https://mycluster.kusto.windows.net",
 "MyDatabase",
 "Logs | where [Timestamp] > ago(1h) | take 5000"
 )
in
 Source
\`\`\`
A KQL string in the tableOrQuery position executes on the cluster, so filtering and row caps happen in Kusto rather than in the model.

## Limitations & Tips
- Advanced options let you cap result records, cap result bytes, disable result-set truncation, and add set statements — useful when a query is wider than you realized.
- Query result limits are your friend in DirectQuery: an unbounded KQL statement runs on every visual interaction.
- Import mode copies the result set into memory; keep \`take\` or \`where\` clauses in the query to bound it.
- KQL Database remains preview, so retest published queries after releases.
- The database and tableOrQuery arguments are optional — omit them while exploring, then pin them once the query is settled.`,
  },
  {
    slug: "azure-device-registry",
    name: "Azure Device Registry",
    group: "Azure & Fabric",
    tagline:
      "Pull assets and devices from Azure Device Registry across a tenant or chosen subscriptions.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["AzureDeviceRegistry.Query"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/azure-device-registry",
    content: `## When to Use It
Azure Device Registry is the inventory behind Azure IoT Operations — namespace assets and namespace devices with their attributes. This connector queries that registry in one call: \`AzureDeviceRegistry.Query(scope, optional subscriptions, optional namespaces, optional customAttributes, optional options)\` takes a scope, optional filters, and returns the matching records as a flat table ready to shape.

## Before You Start
You need an Azure subscription and Azure RBAC rights with at least read access to the Device Registry resources you intend to query. Sign-in is Microsoft Entra ID. The connector currently works only for namespace assets and namespace devices in AIO 1.2.x versions.

It's a cloud source, so Power Query Online connects with no gateway. Capability is Import only, and the connector is in Preview.

## Connect from the Desktop
Home → Get Data, search for Azure Device Registry (or ADR), and select it. Choose a scope — Tenant or Subscription — then optionally fill in comma-separated Subscription IDs, ADR Namespace(s), and Custom Attributes; under advanced options you can set Maximum Rows per Page (default 500) and Limit Results. Sign in, then pick your data in Navigator.

## Connect in Power Query Online
Choose Azure Device Registry on the choose-data-source page, set the same scope and optional fields — leaving scope unset runs at tenant level — then sign in and continue. Select the data you need and transform it in the editor.

## Recipes in M
### List everything at tenant scope
\`\`\`powerquery
let
 Source = AzureDeviceRegistry.Query("Tenant")
in
 Source
\`\`\`
Scope is required and accepts Tenant or Subscription; tenant scope needs none of the optional filters.

### Parse the attributes column
\`\`\`powerquery
let
 Source = AzureDeviceRegistry.Query("Tenant"),
 Kept = Table.SelectColumns(Source, {"attributes"}),
 Parsed = Table.TransformColumns(Kept, {{"attributes", Json.Document}})
in
 Parsed
\`\`\`
An attributes column always comes back carrying all custom attributes as JSON text; decoding it in place turns each row's blob into a record you can expand.

### Narrow the pull with filters
\`\`\`powerquery
let
 Source = AzureDeviceRegistry.Query(
 "Subscription",
 "6B8D12CE-0A74-4CC5-9524-DCFC09AD4F9E, BC70CD3B-10B3-43C0-8DEC-F47E3133E782",
 "Namespace1",
 "CustomAttribute1, CustomAttribute2"
 )
in
 Source
\`\`\`
Subscriptions, namespaces, and custom attributes are comma-separated strings applied before the request goes out — list up to 100 attribute names to surface them as separate columns.

## Limitations & Tips
- Preview status: expect shape changes between releases and retest after updating.
- Scope must be exactly Tenant or Subscription; the subscription and namespace filters do nothing under tenant scope.
- Maximum Rows per Page (default 500) trades response size against request count — raise it for speed, lower it if pages come back unwieldy.
- Limit Results caps output to the first 100 records, handy while developing but wrong for production loads.
- Import only: keep the selected columns minimal so registry snapshots stay small in the model.`,
  },
  {
    slug: "azure-resource-graph",
    name: "Azure Resource Graph",
    group: "Azure & Fabric",
    tagline:
      "Run one Resource Graph query across every Azure subscription you can read, from Power BI or dataflows.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["AzureResourceGraph.Query"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/azure-resource-graph",
    content: `## When to Use It
Keeping an estate inventory in a report means asking Azure itself, not exporting spreadsheets. Azure Resource Graph answers Kusto-style queries over resources across subscriptions and management groups, and \`AzureResourceGraph.Query(query, optional scope, optional subscription, optional managementGroup, optional options)\` is how you fire one from Power Query: the query is required, the rest narrows where it runs, and the rows come straight back as a table.

## Before You Start
You need an Azure subscription and Azure RBAC rights with read access to the resources the query will touch — sign-in is Microsoft Entra ID. Scope is optional: with neither a subscription nor a management group selected, the query runs at tenant level.

The service is cloud-hosted, so Power Query Online needs no gateway. Capability is Import only. One housekeeping item: if you ever ran the private preview connector, delete the leftover \`AzureResourceGraph.mez\` file, otherwise Power Query may load your old test connector instead of the certified one.

## Connect from the Desktop
Home → Get Data → Azure → Azure Resource Graph. Fill in the Query box with your Kusto query — multiline is fine — and optionally set Scope plus Subscription Id(s) or Management Group Id(s), comma-separated. Sign in with your organizational account, then select the tables in Navigator and load or transform.

## Connect in Power Query Online
Choose Azure Resource Graph on the choose-data-source page, enter the query and any scope fields, sign in to your organizational account, and continue. Select the data you need and transform — expect longer waits when a query returns a lot.

## Recipes in M
### Project a handful of columns
\`\`\`powerquery
let
 Source = AzureResourceGraph.Query("Resources | project name, type | limit 5 | order by name asc")
in
 Source
\`\`\`
The query argument is required and is plain Kusto; the starter shape above keeps the first refresh cheap while you verify access.

### Filter inside the query
\`\`\`powerquery
let
 Source = AzureResourceGraph.Query(
 "Resources | where type == 'microsoft.storage/storageaccounts' | project name, location, resourceGroup | order by name asc"
 )
in
 Source
\`\`\`
Pushing the predicate into Resource Graph means fewer rows cross the network — the columns you project are exactly the columns you get.

### Trim the result in Power Query
\`\`\`powerquery
let
 Source = AzureResourceGraph.Query("Resources | project name, type"),
 Machines = Table.SelectRows(Source, each [type] = "microsoft.compute/virtualmachines"),
 Kept = Table.SelectColumns(Machines, {"name", "type"})
in
 Kept
\`\`\`
Because your own \`project\` clause chose the column names, filtering on \`[type]\` and selecting \`name\` in Power Query is safe rather than guesswork.

## Limitations & Tips
- Resource Graph returns at most 1,000 records by default — set the \`$resultTruncated\` advanced option to FALSE when you need more.
- Scope, subscription IDs, and management group IDs are optional fields; subscription IDs become required once you pick subscription scope.
- Keep the query's \`project\` narrow: everything projected is what refreshes carry into the model.
- Large result sets take noticeably longer, especially online — schedule with that in mind.
- Import only, so bound the query with \`limit\` or \`where\` clauses instead of post-filtering everything in the model.`,
  },
  {
    slug: "power-bi-datamarts",
    name: "Datamarts",
    group: "Azure & Fabric",
    tagline:
      "Point Power Query at a Power BI datamart, either by browsing what you can reach or by its TDS endpoint.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["DirectQuery"],
    functions: ["PowerBI.Datamarts"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/power-bi-datamarts",
    content: `## When to Use It
A datamart is a SQL-shaped slice of Power BI — curated tables behind a warehouse-style endpoint — and this connector is how Power Query reaches one. \`PowerBI.Datamarts(optional server)\` works in two modes: call it bare to get a navigation table of the datamarts your account can access, or pass a Datamart TDS endpoint to connect straight to a single datamart's tables.

## Before You Start
You need access to datamarts in your tenant; sign-in is Microsoft Entra ID. For direct mode, the server argument is the datamart's TDS endpoint — a host string like \`abcyz.xxxx-datamart.pbidedicated.windows.net\` rather than a URL with a scheme.

Datamarts are cloud-hosted, so Power Query Online connects with no gateway. The supported capability is DirectQuery, and the connector is in Preview: expect behavior to shift between releases.

## Connect from the Desktop
In Power BI Desktop: Home → Get Data, search for Datamarts, select the connector, and Connect. Leave the server field empty to browse the datamarts you can reach, or paste a datamart TDS endpoint to target one directly, then sign in with your organizational account and choose the tables in Navigator. Pick DirectQuery in the connectivity options — it's the mode this connector supports.

## Connect in Power Query Online
Select Datamarts on the connect-to-data-source page, sign in with your organizational account, and continue to the choose-data step. Select the datamart tables you want and transform them in the editor; no gateway applies to a cloud datamart.

## Recipes in M
### Browse available datamarts
\`\`\`powerquery
let
 Source = PowerBI.Datamarts()
in
 Source
\`\`\`
The only argument is optional, so an empty call is legitimate — it returns the datamarts your identity can see.

### Drill datamart to table
\`\`\`powerquery
let
 Source = PowerBI.Datamarts(),
 Datamart = Source{[Name = "SalesMart"]}[Data],
 Daily = Datamart{[Name = "daily_sales"]}[Data]
in
 Daily
\`\`\`
Two Name lookups walk from the datamart list to the tables inside one, keeping the query independent of Navigator ordering.

### Aim at one endpoint
\`\`\`powerquery
let
 Source = PowerBI.Datamarts("abcyz.xxxx-datamart.pbidedicated.windows.net")
in
 Source
\`\`\`
Supplying the TDS endpoint skips the browse step and connects directly to that datamart's tables.

## Limitations & Tips
- Preview: retest published queries after Desktop and service updates, since the shape may change.
- DirectQuery is the only supported mode, so queries execute against the datamart as you interact with visuals — keep them light.
- The endpoint host comes from the datamart's SQL connection settings; a wrong host fails at connect, not at drill time.
- Browse mode depends on your access: a datamart you can't see in the portal won't appear here either.
- Since nothing is imported, there's no refresh schedule to manage — but every visual interaction is a live query.`,
  },
  {
    slug: "onelakesql",
    name: "Fabric SQL Analytics endpoint",
    group: "Azure & Fabric",
    tagline:
      "Query a Fabric item's SQL analytics endpoint by workspace ID, database name, and item type.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["DirectQuery"],
    functions: ["OneLake.SqlAnalytics"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/onelakesql",
    content: `## When to Use It
Some Fabric work is easier written in SQL than read out of a lakehouse browser. \`OneLake.SqlAnalytics(workspace, database, artifactType, optional options)\` addresses a Fabric item's SQL analytics endpoint directly: give the workspace GUID, the database name, and the item type — a Lakehouse, for instance — and you get back a table of what that endpoint exposes, ready to drill into its tables.

## Before You Start
You need a Fabric workspace containing an item that publishes a SQL analytics endpoint, plus read access to it; sign-in is Microsoft Entra ID. All three leading arguments are required, so have the workspace ID (a GUID), the database name, and the item type on hand before you open the dialog.

The endpoint is cloud-hosted, so Power Query Online connects with no gateway. The supported capability is DirectQuery, and the connector is in Preview.

## Connect from the Desktop
Home → Get Data, search for the Fabric SQL analytics endpoint connector, and Connect. Supply Workspace Id, Database Name, and Item Type, sign in with your organizational account, then pick tables in Navigator and load or transform. Choose DirectQuery as the connectivity mode — it's what this connector supports.

## Connect in Power Query Online
Select the connector on the choose-data-source page, fill in the same three required fields, sign in, and continue to the data selection. Pick what you need and transform it in the editor — no gateway is involved for a Fabric-hosted endpoint.

## Recipes in M
### Open an endpoint
\`\`\`powerquery
let
 Source = OneLake.SqlAnalytics("85599f29-c009-4253-b53b-c3ba6e4afa97", "mySqlAnalyticsDatabase", "Lakehouse")
in
 Source
\`\`\`
Workspace GUID, database name, and item type are all required; the result is the endpoint's table listing.

### Pick one table
\`\`\`powerquery
let
 Source = OneLake.SqlAnalytics("85599f29-c009-4253-b53b-c3ba6e4afa97", "mySqlAnalyticsDatabase", "Lakehouse"),
 Orders = Source{[Name = "orders"]}[Data]
in
 Orders
\`\`\`
The Name lookup pins the table regardless of how the navigation table sorts, which keeps the query stable as the endpoint's contents evolve.

### Wait longer for slow endpoints
\`\`\`powerquery
let
 Source = OneLake.SqlAnalytics(
 "85599f29-c009-4253-b53b-c3ba6e4afa97",
 "mySqlAnalyticsDatabase",
 "Lakehouse",
 [ConnectionTimeout = 0]
 )
in
 Source
\`\`\`
ConnectionTimeout is an options field; 0 means no timeout, which suits endpoints that take a while to warm up.

## Limitations & Tips
- Preview status: expect changes between releases and retest after updates.
- Three required arguments — the connector can't guess your workspace or item, so document the IDs alongside the query.
- DirectQuery only, so each visual interaction sends SQL to the endpoint; keep measures and filters selective.
- Item Type must match the actual Fabric item (for example Lakehouse); a mismatch fails at connection.
- No gateway needed, but the signing-in identity still needs read permission on the workspace.`,
  },
  {
    slug: "lakehouse",
    name: "Lakehouse",
    group: "Azure & Fabric",
    tagline:
      "Bring Lakehouse tables into Power BI by browsing every Lakehouse your account can reach in OneLake.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["Lakehouse.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/lakehouse",
    content: `## When to Use It
Lakehouse is where your Fabric files and tables live together, and sometimes the report simply needs a few of its tables. \`Lakehouse.Contents(optional options)\` takes no required arguments: it returns a navigation table of the Lakehouses you have access to, each row carrying a Data field you drill into to reach the tables inside — one call sets up the whole path.

## Before You Start
You need an existing Lakehouse in Microsoft Fabric and an account that can read it; sign-in is Microsoft Entra ID. The source is cloud-side, so Power Query Online connects with no gateway selection. Capability is Import only, and the connector is generally available.

## Connect from the Desktop
In Power BI Desktop, select the Lakehouses connector in the connector selection and Connect. The OneLake data hub shows the Lakehouses you can reach — filter with All, My data, or Endorsed in your org — then Connect. You can also choose a SQL endpoint instead if that better fits the query. Select the data in the Data pane once connected.

## Connect in Power Query Online
Pick Lakehouse in the get-data experience, sign in to your organizational account, and continue. In the choose-data step, select the data items you want to transform, then Create; the editor opens with them ready.

## Recipes in M
### List your Lakehouses
\`\`\`powerquery
let
 Source = Lakehouse.Contents()
in
 Source
\`\`\`
No arguments are required — the call returns the Lakehouses your identity can open, each with a Data field to drill into.

### Walk Lakehouse to table
\`\`\`powerquery
let
 Source = Lakehouse.Contents(),
 Sales = Source{[Name = "SalesLakehouse"]}[Data],
 Orders = Sales{[Name = "orders"]}[Data]
in
 Orders
\`\`\`
Two Name lookups take you from the top-level list to the rows of one table without relying on Navigator ordering.

### Turn on hierarchical navigation
\`\`\`powerquery
let
 Source = Lakehouse.Contents([HierarchicalNavigation = true])
in
 Source
\`\`\`
HierarchicalNavigation is an options field that enables the full hierarchy, including schema support — useful when tables live under schemas rather than flat in the Lakehouse.

## Limitations & Tips
- Import only, so everything you select is copied into the model at refresh — choose tables, not "select all".
- The browse step depends on access: Lakehouses you can't see in the portal don't appear in the result.
- HierarchicalNavigation changes how the listing is structured; pin drills by Name once you know the layout you want.
- EnableVorder and OutputMetadataRefresh are further options fields — the latter synchronizes SQL analytics endpoint metadata when you mix navigation styles.
- No gateway applies, but the refreshing identity still needs Lakehouse read rights.`,
  },
  {
    slug: "microsoftazuredatamanagerforenergy",
    name: "Microsoft Azure Data Manager for Energy",
    group: "Azure & Fabric",
    tagline:
      "Search OSDU records in Azure Data Manager for Energy by partition, record kind, and Lucene query.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["MicrosoftAzureDataManagerForEnergy.Search"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/microsoftazuredatamanagerforenergy",
    content: `## When to Use It
Azure Data Manager for Energy stores OSDU records — wells, facilities, and the master data your subsurface and operations teams curate. This connector queries that store directly: \`MicrosoftAzureDataManagerForEnergy.Search(serviceName, dataPartition, kind, query, optional limit, optional returnedFields)\` takes the instance, the partition, the record kind, and a Lucene query string, and returns the matching records as a table.

## Before You Start
You need the name of your Azure Data Manager for Energy instance and the ID of the data partition you're querying — both come from whoever runs the platform — plus read access to it. Sign-in is Microsoft Entra ID.

The service is cloud-hosted, so Power Query Online connects with no gateway. Capability is Import only, and the connector is in Preview.

## Connect from the Desktop
Home → Get Data, search for Microsoft Azure Data Manager for Energy, and Connect. Fill in the instance name, data partition, record kind, and query — start with \`*\` to match everything — and optionally a Limit and Returned Fields. Sign in with your organizational account, then select the results in Navigator.

## Connect in Power Query Online
Select the connector on the choose-data-source page, enter the same instance, partition, kind, and query values, sign in, and continue to the data selection. Transform the results in the editor before creating them.

## Recipes in M
### Match every record of a kind
\`\`\`powerquery
let
 Source = MicrosoftAzureDataManagerForEnergy.Search(
 "platform4321",
 "platform4321-opendes",
 "osdu:wks:master-data--Well:1.0.0",
 "*"
 )
in
 Source
\`\`\`
Four arguments are required; a wildcard query with a single record kind is the fastest way to confirm the connection works.

### Filter, cap, and project
\`\`\`powerquery
let
 Source = MicrosoftAzureDataManagerForEnergy.Search(
 "platform4321",
 "platform4321-opendes",
 "osdu:wks:master-data--Well:1.0.0",
 "data.FacilityName:alp*",
 2000,
 "data.FacilityName, data.Source"
 )
in
 Source
\`\`\`
The query uses Lucene syntax against the record fields, limit caps the result count, and returnedFields projects just the fields you name — all three travel with the request.

### Trim what you keep
\`\`\`powerquery
let
 Source = MicrosoftAzureDataManagerForEnergy.Search(
 "platform4321",
 "platform4321-opendes",
 "osdu:wks:master-data--Well:1.0.0",
 "*",
 2000
 ),
 Picked = Table.SelectColumns(Source, {"data.FacilityName", "data.Source"})
in
 Picked
\`\`\`
When you know the shape after a first pass, select the columns you need in Power Query so the import stays small.

## Limitations & Tips
- Preview status: the function signature and result shape may change, so retest after updates.
- The record kind string is exact — version suffixes like \`1.0.0\` are part of it, and a stale kind returns nothing rather than an error.
- Lucene query syntax governs the query argument; \`*\` matches all, field queries narrow to specific paths.
- Limit and returnedFields are optional — leave them off while exploring, then set them once the query is right.
- Import only: keep limits and projections tight so refreshes don't pull a partition wholesale.`,
  },
  {
    slug: "microsoftsentinel",
    name: "Microsoft Sentinel",
    group: "Azure & Fabric",
    tagline:
      "Query Microsoft Sentinel's Kusto tables live from Power BI through the Sentinel cluster endpoint.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["DirectQuery"],
    functions: ["MicrosoftSentinel.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/microsoftsentinel",
    content: `## When to Use It
Security data wants answering where it sits: alerts, incidents, and raw logs in the Sentinel Kusto store. This connector speaks that endpoint directly. \`MicrosoftSentinel.Contents(cluster, optional database, optional tableOrQuery, optional options)\` browses like its Azure Data Explorer cousin — stop at the cluster for a navigation table of databases, or supply a database plus a table name or KQL query to go straight at rows.

## Before You Start
You need a Microsoft Sentinel workspace you're allowed to read from, and sign-in is Microsoft Entra ID. The cluster argument is the Sentinel endpoint — \`https://api.securityplatform.microsoft.com/lake/kql\` is the standard form.

It's a cloud endpoint, so Power Query Online connects without a gateway. The supported capability is DirectQuery, and the connector is in Preview.

## Connect from the Desktop
Get Data → search Microsoft Sentinel → Connect. Enter the cluster URL, optionally pick a database and a table — or a query such as \`Logs | where [Timestamp] > ago(1h)\` — set any advanced options, and sign in with your organizational account. Note the connectivity mode is DirectQuery; there's no Import choice on this connector. Navigator follows.

## Connect in Power Query Online
Select Microsoft Sentinel on the choose-data-source page, provide the cluster URL and optional database or query, sign in with your organizational account, and continue. Select the data you need and transform it in the editor.

## Recipes in M
### Open the Sentinel cluster
\`\`\`powerquery
let
 Source = MicrosoftSentinel.Contents("https://api.securityplatform.microsoft.com/lake/kql")
in
 Source
\`\`\`
Only the cluster is required; without a database you get back the navigation table of databases on the endpoint.

### Drill to a table
\`\`\`powerquery
let
 Source = MicrosoftSentinel.Contents("https://api.securityplatform.microsoft.com/lake/kql", "MyDatabase"),
 Events = Source{[Name = "SecurityEvent"]}[Data]
in
 Events
\`\`\`
Pass the database as the second argument, then index the table by Name — the lookup pins it no matter how the listing sorts.

### Bound the query in KQL
\`\`\`powerquery
let
 Source = MicrosoftSentinel.Contents(
 "https://api.securityplatform.microsoft.com/lake/kql",
 "MyDatabase",
 "MyTable | where [Timestamp] > ago(24h) | take 1000"
 )
in
 Source
\`\`\`
A KQL string in the tableOrQuery slot executes on the cluster, so the time window and row cap travel with the query instead of being applied in the model.

## Limitations & Tips
- Preview status: expect changes and retest published queries after releases.
- DirectQuery only — every visual interaction becomes a live query against the cluster, so keep KQL filters narrow and use \`take\` while developing.
- Advanced options cover result record limits, result size in bytes, truncation control, and additional set statements; use them to stop oversized results before they leave the cluster.
- The database and tableOrQuery arguments are optional — omit them while exploring, pin them when settled.
- No gateway needed, but the signing-in identity needs read access to the Sentinel data.`,
  },
  {
    slug: "onelakefile",
    name: "OneLake Files",
    group: "Azure & Fabric",
    tagline:
      "Browse and read files stored in OneLake by pointing Power Query at a workspace and artifact path.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["OneLake.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/onelakefile",
    content: `## When to Use It
Not everything in Fabric is a table — sometimes the payload is a CSV or Parquet file dropped into OneLake. This connector treats OneLake like a file system: \`OneLake.Contents(path, optional options)\` takes a path in \`/workspaceId/artifactId/partial/path\` form and returns a navigation table of the folders and files at that location, which you drill through to reach what you came for.

## Before You Start
You need a Fabric workspace containing items with files you're allowed to read, and sign-in is Microsoft Entra ID. The path argument is required and addresses the location by IDs rather than display names, so capture the workspace and artifact identifiers before you build the query.

OneLake is cloud-hosted, so Power Query Online connects with no gateway. Capability is Import only, and the connector is in Preview.

## Connect from the Desktop
Home → Get Data, search for OneLake Files, and Connect. Enter the path to the folder you want — starting from the workspace ID and artifact ID — sign in with your organizational account, and select the entries in Navigator. Load or transform from there.

## Connect in Power Query Online
Select OneLake Files on the choose-data-source page, enter the same path, sign in with your organizational account, and continue to the data selection. Pick the entries you need and transform them in the editor — no gateway applies to OneLake.

## Recipes in M
### List a folder in OneLake
\`\`\`powerquery
let
 Source = OneLake.Contents("/85599f29-c009-4253-b53b-c3ba6e4afa97/2f9c6a1e-77b4-4c63-9d0f-5a1e8b2c4d11/Files")
in
 Source
\`\`\`
The path is required and built from the workspace ID, the artifact ID, and the remaining folder path — the result is one row per entry found there.

### Keep only the files you want
\`\`\`powerquery
let
 Source = OneLake.Contents("/85599f29-c009-4253-b53b-c3ba6e4afa97/2f9c6a1e-77b4-4c63-9d0f-5a1e8b2c4d11/Files"),
 Csv = Table.SelectRows(Source, each Text.EndsWith([Name], ".csv"))
in
 Csv
\`\`\`
Every listing row carries a Name, so a suffix filter separates the files you care about from the rest of the folder before anything loads.

### Give slow paths more time
\`\`\`powerquery
let
 Source = OneLake.Contents(
 "/85599f29-c009-4253-b53b-c3ba6e4afa97/2f9c6a1e-77b4-4c63-9d0f-5a1e8b2c4d11/Files",
 [ConnectionTimeout = 0]
 )
in
 Source
\`\`\`
ConnectionTimeout is an options field; 0 disables the timeout, which helps when the workspace is cold or the path is deep.

## Limitations & Tips
- Preview status: behavior and result shape may shift between releases, so retest after updates.
- Paths are ID-based — renaming an item in the portal doesn't break your query, but deleting or recreating it will.
- Import only: files you select are copied into the model at refresh, so filter by Name early.
- No gateway is involved, but the refreshing identity needs read rights on the workspace and item.
- Walk one level at a time: each drill returns the entries under that folder, which keeps individual steps small and debuggable.`,
  },
  {
    slug: "fabricsql",
    name: "SQL database in Fabric",
    group: "Azure & Fabric",
    tagline:
      "Connect Power Query to a SQL database in Fabric, imported or queried live through DirectQuery.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["FabricSql.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/fabricsql",
    content: `## When to Use It
SQL database in Fabric gives you a familiar T-SQL surface over your Fabric data, and this connector is how Power Query reaches it. \`FabricSql.Contents(optional options)\` needs no arguments: it opens the databases your account can read and returns a navigation table you drill into for tables — then you either import the result or let Power BI query it live.

## Before You Start
You need a SQL database in a Fabric workspace and read access to it; sign-in is Microsoft Entra ID. Because it's a Fabric-hosted cloud source, Power Query Online connects with no gateway. Both Import and DirectQuery are supported, and the connector is in Preview — expect it to keep evolving.

## Connect from the Desktop
Home → Get Data, search for SQL database in Fabric, and Connect. There are no required fields to fill — sign in with your organizational account, and Navigator shows what you can reach. Choose Import or DirectQuery as your connectivity mode, then load or transform the tables you pick.

## Connect in Power Query Online
Select SQL database in Fabric on the choose-data-source page, sign in with your organizational account, and continue to the choose-data step. Select the tables you want and create the connection — no gateway applies to a Fabric-hosted database.

## Recipes in M
### Open what you can access
\`\`\`powerquery
let
 Source = FabricSql.Contents()
in
 Source
\`\`\`
An empty call is the whole connection — the optional options record is only there when you need to tune it.

### Drill to a table
\`\`\`powerquery
let
 Source = FabricSql.Contents(),
 Orders = Source{[Name = "orders"]}[Data]
in
 Orders
\`\`\`
The Name lookup pins the table you want regardless of how the navigation table is ordered, which keeps the query stable as the database grows.

### Shape it before it loads
\`\`\`powerquery
let
 Source = FabricSql.Contents(),
 Orders = Source{[Name = "orders"]}[Data],
 Recent = Table.SelectRows(Orders, each [order_date] >= #date(2026, 1, 1)),
 Kept = Table.SelectColumns(Recent, {"order_id", "customer_id", "order_date"})
in
 Kept
\`\`\`
Row and column filters written here fold into the SQL where the connector allows, so both Import refreshes and DirectQuery visuals start from less.

## Limitations & Tips
- Preview status: retest published queries after releases, since navigation or options may change.
- DirectQuery means every visual interaction runs SQL against the database — keep filters selective and measures narrow.
- The function takes no required arguments; permissions, not connection strings, decide what appears.
- Import mode copies whatever you select into the model, so trim columns before loading.
- No gateway needed, but the identity used for refresh must retain read rights on the Fabric item.`,
  },
  {
    slug: "warehouse",
    name: "Warehouse",
    group: "Azure & Fabric",
    tagline:
      "Load tables from a Microsoft Fabric Warehouse through the OneLake data hub, in Power BI or dataflows.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["Fabric.Warehouse"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/warehouse",
    content: `## When to Use It
A Fabric Warehouse is your SQL-shaped analytical store inside Fabric, and sometimes the report just needs its tables. \`Fabric.Warehouse(optional options)\` takes no required arguments and returns a navigation table of the Warehouses you can access — each row carries a Data field you drill into to reach the tables, so one call establishes the path from tenant to rows.

## Before You Start
You need an existing Warehouse in Microsoft Fabric and an account that can read it; sign-in is Microsoft Entra ID. The source is cloud-hosted, so Power Query Online connects with no gateway. Capability is Import only, and the connector is generally available.

## Connect from the Desktop
In Power BI Desktop, go to the connector selection, choose Microsoft Fabric → Warehouses, and Connect. The OneLake data hub lists the Warehouses you can reach — filter with All, My data, or Endorsed in your org — then Connect. You can also choose a SQL endpoint instead. Select the tables in the Data pane once you're connected.

## Connect in Power Query Online
From the New source page, choose Microsoft Fabric → Warehouse. Sign in to your organizational account, continue, and in the choose-data step select the data items you want to transform, then Create.

## Recipes in M
### List your Warehouses
\`\`\`powerquery
let
 Source = Fabric.Warehouse()
in
 Source
\`\`\`
Nothing is required — the call returns the Warehouses your identity can open, ready to drill into.

### Walk Warehouse to table
\`\`\`powerquery
let
 Source = Fabric.Warehouse(),
 Sales = Source{[Name = "SalesWarehouse"]}[Data],
 Orders = Sales{[Name = "orders"]}[Data]
in
 Orders
\`\`\`
Two Name lookups go from the top-level listing to one table's rows, so the query doesn't depend on how the hub happens to sort things.

### Include schemas in the navigation
\`\`\`powerquery
let
 Source = Fabric.Warehouse([HierarchicalNavigation = true])
in
 Source
\`\`\`
HierarchicalNavigation is the options field that turns on full hierarchical navigation with schema support — set it when tables are organized under schemas you want to see.

## Limitations & Tips
- Import only, so every selected table is copied into the model at refresh — pick the tables you need rather than everything visible.
- Browse mode reflects your access: Warehouses you can't open in the portal don't appear here.
- HierarchicalNavigation changes the listing's structure; settle on it (or not) before pinning drills by Name.
- No gateway applies, but the refreshing identity needs Warehouse read rights.
- Direct yourself to the SQL endpoint option in the dialog when a query is better expressed against T-SQL surfaces.`,
  },
];

import type { ConnectorGuide } from "../connector-guides";

/**
 * Practical guides for the Analytics & BI group — added by the Microsoft connectors
 * index expansion. Content is original (data-engineer voice), generated from
 * the connector audit facts under Temp/opencode/guides-src.
 */
export const analyticsNewGuides: ConnectorGuide[] = [
  {
    slug: "appfigures",
    name: "appFigures",
    group: "Analytics & BI",
    tagline:
      "Load the tables your appFigures account exposes into Power BI with a single no-argument call.",
    products: ["Power BI"],
    authentication: ["appFigures"],
    capabilities: ["Import"],
    functions: ["appFigures.Tables"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/appfigures",
    content: `## When to Use It
appFigures aggregates the performance numbers behind your mobile apps, and this connector is the direct line from that account into Power BI. The entry function takes no parameters at all — it returns a table listing what your account exposes, which you then drill into for each dataset you want in the model. Reach for it when the report needs app performance figures on the same refresh cadence as the rest of your Import-mode sources.
## Before You Start
You need an appFigures account with permission to read the data you plan to load; sign-in uses appFigures credentials, prompted the first time the query runs. There are no connection parameters — no URL, no profile ID — so the account itself scopes everything the function can see. The connector is available in Power BI, with Import as the only capability. appFigures is a hosted service, so Power BI Desktop talks to it directly; if you later host the query in a dataflow you still do not need an on-premises gateway, since the source lives in the cloud.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, search for appFigures, select it, and choose Connect. The connector shows no parameter dialog because the function has no arguments — complete the appFigures sign-in when prompted, and Navigator opens on the tables your account can read. Select what you need and choose Load to build the model, or Transform Data to shape it in the editor first.
## Recipes in M
### List everything the account exposes
One line gets you the full table of available items, which is the fastest way to see what the signed-in account can read.
\`\`\`powerquery
let
 Source = appFigures.Tables()
in
 Source
\`\`\`
### Drill into one table by name
The result is a navigation table: find the Name you want in the preview, then index it so the query survives any reordering.
\`\`\`powerquery
let
 Source = appFigures.Tables(),
 Report = Source{[Name = "my_table"]}[Data]
in
 Report
\`\`\`
### Filter the navigation rows while you hunt
Instead of scrolling the preview, query the navigation table itself to locate a name before you commit to a drill.
\`\`\`powerquery
let
 Source = appFigures.Tables(),
 Matches = Table.SelectRows(Source, each Text.Contains([Name], "performance"))
in
 Matches
\`\`\`
## Limitations & Tips
This is a Preview connector, so table names and behavior may change between releases — verify the Name you drill into after any update, and keep the exploratory query separate from the production one. The function has no required or optional parameters, which means filtering can only happen after the call, not pushed into it. Import is the only capability, so schedule a refresh instead of expecting live queries, and drill into a single table per query rather than loading every row the navigation returns.`,
  },
  {
    slug: "celonis-ems",
    name: "Celonis EMS",
    group: "Analytics & BI",
    tagline:
      "Navigate your Celonis EMS team hierarchy and bring knowledge model records into Power BI.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Celonis"],
    capabilities: ["Import"],
    functions: ["Celonis.Navigation"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/celonis-ems",
    content: `## When to Use It
Celonis EMS is where the process mining lives: packages, knowledge models, and the defined records the EMS team publishes for analysis. This connector opens your team's EMS URL and returns the full hierarchy as a navigation table, so you can walk from team to package to record and land the specific knowledge model record your report needs. It is Import only and works in both Power BI and Power Query Online.
## Before You Start
You need a Celonis EMS account (username/password) plus a key to prove it: the desktop flow asks for an Application Key or a Personal API Key generated in Celonis EMS. The one required parameter is your team's Celonis URL, for example https://team.eu-1.celonis.cloud — copy it from the browser so the region segment is right. Because EMS is a cloud service, Power Query Online connects without an on-premises gateway. The supported capability is Import, and navigation works across the full hierarchy.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, select Celonis EMS, then Connect. The dialog shows an example URL — replace it with your team URL and select OK. Enter your Application Key or Personal API Key when prompted and continue. Navigator opens with the packages available in that EMS team; select the knowledge model record you want and choose Load or Transform Data.
## Connect in Power Query Online
Select Celonis EMS on the data source page, enter the team URL, and sign in with your EMS credentials and key. Once connected, pick the record you need on the Choose data page and continue into the Power Query Editor to finish shaping before you save.
## Recipes in M
### Open the team hierarchy
The URL is the only argument; the function returns the navigation structure underneath it.
\`\`\`powerquery
let
 Source = Celonis.Navigation("https://team.eu-1.celonis.cloud")
in
 Source
\`\`\`
### Drill to a knowledge model record
Index the navigation row by its Name, then take its Data — this pins the record regardless of how the hierarchy is sorted.
\`\`\`powerquery
let
 Source = Celonis.Navigation("https://team.eu-1.celonis.cloud"),
 Record = Source{[Name = "MyKnowledgeModel"]}[Data]
in
 Record
\`\`\`
### Narrow the navigation before drilling
When a team publishes many packages, filter the navigation table first so you can confirm the exact name you are about to index.
\`\`\`powerquery
let
 Source = Celonis.Navigation("https://team.eu-1.celonis.cloud"),
 Packages = Table.SelectRows(Source, each Text.Contains([Name], "finance"))
in
 Packages
\`\`\`
## Limitations & Tips
EMS caps what a record can return — 200 thousand rows and 20 columns per record — so large records need aggregation on the EMS side or a narrower record, not a bigger pull. Only defined records can be imported; autogenerated records are excluded from what this connector returns (the limit does not apply to Celonis OCPM). There is one required parameter and no options record. Import only, so schedule refreshes, and the cloud URL means no gateway is required for Power Query Online.`,
  },
  {
    slug: "microstrategy-for-power-bi",
    name: "MicroStrategy for Power BI",
    group: "Analytics & BI",
    tagline:
      "Connect Power BI to your MicroStrategy Library environment and pull datasets through its REST API.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Library/OIDC Standard/LDAP"],
    capabilities: ["Import"],
    functions: ["MicroStrategyDataset.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/microstrategy-for-power-bi",
    content: `## When to Use It
MicroStrategy holds the governed reporting layer for organizations that standardized on it, and this connector reaches that layer through the Library REST URL. The entry function returns a table of what your account can access, which you navigate to the dataset you want to load — the right pick when the MicroStrategy environment is already the curated source and Power BI only needs to consume it. Import and data refresh are the supported capabilities.
## Before You Start
Your organization needs a configured MicroStrategy environment, and your account on it must have access to the Power BI connector — without it sign-in will not get you anywhere. Sign-in kinds cover Library/OIDC Standard/LDAP: Standard and LDAP take a username and password, while Library and OIDC ride the library session. The required parameter is the environment URL ending in /MicroStrategyLibrary; append #OIDCMode to that URL when you want OIDC, and register the Power BI redirect URL (https://oauth.powerbi.com/views/oauthredirect.html) as a reply URL in your identity provider. The optional authMode is Standard (the default) or LDAP. Power BI and Power Query Online are supported; no gateway is needed if the URL is publicly reachable.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, choose Other > MicroStrategy for Power BI, then Connect. Acknowledge the third-party notice if it appears, enter a valid Library URL (add #OIDCMode for OIDC), optionally pick the authentication mode and fill the advanced options, then select OK. Choose your authentication mode and sign in; Navigator opens on the datasets your account can read — select one and Load or Transform Data.
## Connect in Power Query Online
Add MicroStrategy for Power BI from the data source page, enter the same Library URL and authentication mode, and sign in with the credential type that matches. After the connection succeeds, choose the dataset on the Choose data page and continue to the Power Query Editor before saving.
## Recipes in M
### Connect with Standard authentication
Only the URL is required; authMode is optional and defaults to Standard.
\`\`\`powerquery
let
 Source = MicroStrategyDataset.Contents(
 "https://mycompany.microstrategy.com/MicroStrategyLibrary/"
 )
in
 Source
\`\`\`
### Use OIDC by changing the URL
OIDC is selected by the URL suffix rather than by authMode — the function still takes the same shape.
\`\`\`powerquery
let
 Source = MicroStrategyDataset.Contents(
 "https://mycompany.microstrategy.com/MicroStrategyLibrary/#OIDCMode"
 )
in
 Source
\`\`\`
## Limitations & Tips
Only one parameter is required; authMode and the options record are optional, and authMode affects basic authentication only, not Library or OIDC flows. Treat the trailing slash and the #OIDCMode suffix as part of the contract — a URL that does not resolve to a Library endpoint fails before you ever see data. Import is the only mode, so schedule refresh rather than expecting DirectQuery, and confirm your account has connector access before debugging a query. If the environment sits behind your network, a gateway is needed for Power Query Online.`,
  },
  {
    slug: "mixpanel",
    name: "Mixpanel",
    group: "Analytics & BI",
    tagline:
      "Load the tables your Mixpanel account exposes into Power BI with a zero-parameter query.",
    products: ["Power BI"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["Mixpanel.Tables"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/mixpanel",
    content: `## When to Use It
Mixpanel is where product teams watch events, funnels, and retention, and this connector brings that data into Power BI without an export step. The entry function takes no arguments — it returns a table of what your account exposes, which you drill into for each dataset you want in the model. Use it when the report needs product analytics alongside the rest of your Import-mode sources on a scheduled refresh.
## Before You Start
You need a Mixpanel account with Basic (username/password) credentials; the connector prompts for them the first time the query runs. There are no parameters, so the signed-in account determines everything the function can see — make sure that account can read the projects you plan to report on. The connector is Preview status and available in Power BI with Import as the only capability. Mixpanel is cloud-hosted, so the desktop connects directly and no on-premises gateway is required when you later host the query online.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, search for Mixpanel, select it, and choose Connect. No parameter dialog appears — complete the Basic credential prompt, and Navigator opens on the tables your account can read. Select the ones you need and choose Load, or Transform Data to shape them in the editor first.
## Recipes in M
### List what the account exposes
A single no-argument call returns the navigation table of available items.
\`\`\`powerquery
let
 Source = Mixpanel.Tables()
in
 Source
\`\`\`
### Drill into one dataset by name
Find the Name in the preview and index it, so the query does not depend on the Navigator's sort order.
\`\`\`powerquery
let
 Source = Mixpanel.Tables(),
 Events = Source{[Name = "events"]}[Data]
in
 Events
\`\`\`
### Shape the drilled table
Event tables arrive wide; keep only what the report plots before you load.
\`\`\`powerquery
let
 Source = Mixpanel.Tables(),
 Events = Source{[Name = "events"]}[Data],
 Keep = Table.SelectColumns(Events, {"date", "event", "count"})
in
 Keep
\`\`\`
## Limitations & Tips
Preview status means names and shape can change — verify the Name you drill into after a connector or Power BI update. With no parameters there is nothing to push down: every filter runs after the call, so drill into one table per query instead of loading the whole navigation. Only Import is supported, so plan a refresh schedule rather than a live connection, and confirm your Mixpanel credentials have read access to the projects you expect before troubleshooting the query.`,
  },
  {
    slug: "paxata",
    name: "Paxata",
    group: "Analytics & BI",
    tagline:
      "Connect Power BI to your Paxata deployment and pull prepared datasets by base URL.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["REST Access Token"],
    capabilities: ["Import"],
    functions: ["Paxata.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/paxata",
    content: `## When to Use It
Paxata is where data preparation happens — cleaned, joined, curated datasets that analysts have already reasoned about. This connector points at a Paxata deployment URL and returns a table of what that deployment exposes, so Power BI can consume work that is already shaped instead of re-deriving it. Reach for it when the prep work is done in Paxata and the modeling job belongs in Power BI.
## Before You Start
You need a Paxata account with a REST access token; the connector authenticates with that token, so generate one with access to the datasets you plan to read before you start. The single required parameter is the deployment's base URL, for example https://paxatadeploymentname.apps.azurehdinsight.net — copy it from your deployment rather than reconstructing it. Paxata deployments are cloud-hosted, so Power Query Online can reach one that is publicly addressable without an on-premises gateway. Both Power BI and Power Query Online are supported, with Import as the only capability.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, search for Paxata, select it, and choose Connect. Enter the deployment base URL at the prompt, then supply the REST access token when the credential window appears. Navigator opens on the datasets your token can read — select the ones you need and choose Load or Transform Data.
## Connect in Power Query Online
Select Paxata on the data source page, enter the same base URL, and sign in with the REST access token. Once the connection succeeds, pick the datasets on the Choose data page and continue into the Power Query Editor to finish shaping before you save the dataflow.
## Recipes in M
### Connect to the deployment
The base URL is the only argument the function accepts.
\`\`\`powerquery
let
 Source = Paxata.Contents("https://paxatadeploymentname.apps.azurehdinsight.net")
in
 Source
\`\`\`
### Drill into one dataset by name
Treat the result as a navigation table and index the dataset you want, so reordering never breaks the query.
\`\`\`powerquery
let
 Source = Paxata.Contents("https://paxatadeploymentname.apps.azurehdinsight.net"),
 Dataset = Source{[Name = "customer_master"]}[Data]
in
 Dataset
\`\`\`
### Find the dataset first, then commit
Filter the navigation rows when you cannot remember the exact published name.
\`\`\`powerquery
let
 Source = Paxata.Contents("https://paxatadeploymentname.apps.azurehdinsight.net"),
 Matches = Table.SelectRows(Source, each Text.Contains([Name], "customer"))
in
 Matches
\`\`\`
## Limitations & Tips
One required parameter, no options record — every shaping decision happens after the call, so drill into a single dataset per query to keep refresh light. Import is the only capability, so schedule refresh instead of expecting DirectQuery. Keep the REST token scoped to the datasets you report on, and rotate it on the same cadence you rotate other secrets: an expired token shows up as a failed credential, not a data error. A deployment behind your network needs a gateway for Power Query Online.`,
  },
  {
    slug: "product-insights",
    name: "Product Insights",
    group: "Analytics & BI",
    tagline:
      "Load your Product Insights data into Power BI with a no-argument query signed in through Microsoft Entra ID.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["ProductInsights.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/product-insights",
    content: `## When to Use It
Product Insights is the source you reach when the report needs the insight data your organization has already published there, without an intermediate export. The entry function takes no parameters at all: it returns a table listing what your account can access, and you drill into the item you want from there. It is a straightforward Import-mode pull, which suits a scheduled refresh feeding a model that also carries warehouse and SaaS tables.
## Before You Start
Sign-in uses Microsoft Entra ID — the credential prompt asks for the organizational account that has access to the Product Insights content you plan to read, so make sure that account is the one you intend to refresh with. There are no connection parameters: no URL, no workspace ID, so the identity scopes everything the function can see. Both Power BI and Power Query Online support the connector, and because the service is cloud-hosted, Power Query Online reaches it directly with no on-premises data gateway. The connector is in Preview and the only capability is Import.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, search for Product Insights, select it, then choose Connect. No parameter dialog appears because the function has no arguments — complete the Microsoft Entra ID sign-in when prompted, and Navigator opens on the content your account can read. Select what you need and choose Load, or Transform Data to shape it in the editor first.
## Connect in Power Query Online
Add Product Insights from the Connect to data source page, sign in with the Entra ID account that owns the access, and continue once the connection succeeds. Pick the content you want on the Choose data page and move into the Power Query Editor to finish shaping before you save the dataflow.
## Recipes in M
### List everything the account can reach
The whole query is one call; the result is the navigation table of available items.
\`\`\`powerquery
let
 Source = ProductInsights.Contents()
in
 Source
\`\`\`
### Drill into one item by name
Index the row by its Name and take its Data, so the query survives any change in how the navigation is sorted.
\`\`\`powerquery
let
 Source = ProductInsights.Contents(),
 Item = Source{[Name = "my_insight_table"]}[Data]
in
 Item
\`\`\`
### Filter the navigation while you explore
Query the navigation table itself when you are still hunting for the right name.
\`\`\`powerquery
let
 Source = ProductInsights.Contents(),
 Matches = Table.SelectRows(Source, each Text.Contains([Name], "insight"))
in
 Matches
\`\`\`
## Limitations & Tips
Preview status means names and behavior can shift between releases — confirm the Name you drill into after a Power BI update rather than trusting an old query. With zero parameters there is no way to push filters into the call; everything is shaped after the fact, so load one item per query instead of the entire navigation. Import is the only capability, so schedule refresh rather than expecting DirectQuery, and the cloud source means no gateway configuration for Power Query Online.`,
  },
  {
    slug: "softone-bi",
    name: "SoftOne BI",
    group: "Analytics & BI",
    tagline:
      "Bring your Soft1 or Atlantis ERP datalake tables into Power BI through the SoftOne BI connector module.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["SoftOneBI.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/softone-bi",
    content: `## When to Use It
SoftOne BI exposes the tables that Soft1 ERP/CRM and Atlantis ERP keep in their datalake — sales, collections, finance, and the rest of the operational record. This connector retrieves those tables as a navigable set, so Power BI can sit on top of the ERP data without a separate integration project. Use it when the ERP is the system of record and the report needs its numbers on a refresh schedule.
## Before You Start
Prerequisites are specific: Soft1 ERP/CRM or Atlantis ERP must be installed with a licensed SoftOne BI connector module, and a web account configured in that application with access to the SoftOne BI Connector service. The connector validates the account information and installation serial number during authentication. Sign-in is OAuth, and the form asks for the installation serial number alongside the web account credential. The function takes no parameters. Both Power BI and Power Query Online are supported with Import only; the ERP is typically inside your network, so Power Query Online usually needs a data gateway. The connector also requires a Soft1 Series 5 or Atlantis ERP build recent enough to include the module — confirm that before troubleshooting a query.
## Connect from the Desktop
In Power BI Desktop, choose Home > Get Data > More, pick Online Services, and search for SoftOne BI, then Connect. Select Sign in and complete the authentication form with the installation serial number and web account credential. If credentials are wrong you get an invalid-credential message; if the module is not activated or the account lacks access, you get an access-denied message instead. After signing in, Connect takes you to the navigator listing the datalake tables — select what you need and load or transform.
## Connect in Power Query Online
Add SoftOne BI from the data source page, configure a gateway so the online service can reach the ERP installation, then sign in with the same serial number and web account. Once connected, choose the tables on the Choose data page and continue into the Power Query Editor before saving.
## Recipes in M
### Open the datalake table list
The function has no parameters — the signed-in account decides what comes back.
\`\`\`powerquery
let
 Source = SoftOneBI.Contents()
in
 Source
\`\`\`
### Drill into one table by name
Index the navigation row by Name and take its Data, which keeps the query stable regardless of sort order in the navigator.
\`\`\`powerquery
let
 Source = SoftOneBI.Contents(),
 Invoices = Source{[Name = "invoices"]}[Data]
in
 Invoices
\`\`\`
## Limitations & Tips
This is a Preview connector, so table names in the navigation may change — verify the Name you index after updates, and keep an exploratory query separate from the production one. Zero parameters means no pushdown: every filter runs after the call, so pick one table per query. Import only, so plan a refresh schedule. The two failure messages differ for a reason — invalid credentials versus an unactivated module or unconfigured web account — read which one you got before changing the query. A gateway is required for Power Query Online whenever the ERP sits on your network.`,
  },
  {
    slug: "solver",
    name: "Solver",
    group: "Analytics & BI",
    tagline:
      "Pull Solver data warehouse data into Power BI by pasting the API URL from your Solver Portal.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Solver Access Token"],
    capabilities: ["Import"],
    functions: ["BI360.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/solver",
    content: `## When to Use It
Solver (BI360) is the budgeting and reporting layer for finance teams, and its data warehouse API is what this connector consumes. Paste the API URL from your Solver Portal and the entry function returns a table of what that endpoint exposes, which you then drill into for the datasets the report needs. The fit is clear when finance has already modeled the numbers in Solver and Power BI only has to present them next to operational data.
## Before You Start
You need a Solver access token — the connector authenticates with that token, so generate one with permission to read the data you plan to use before you start. The single required parameter is the API URL copied from the Solver Portal, for example https://demo.app.solverglobal.com/api/dw/externalApi/ — copy it rather than typing it, since the path matters as much as the host. Solver's service is cloud-hosted, so Power Query Online can reach a publicly addressable URL with no on-premises gateway. Both Power BI and Power Query Online are supported, and the capability set is Import only.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, search for Solver, select it, then Connect. Enter the API URL from your portal at the prompt and supply the access token when the credential window appears. Navigator opens on what the endpoint exposes — select the items you need and choose Load or Transform Data.
## Connect in Power Query Online
Choose Solver on the data source page, paste the same API URL, and sign in with the Solver access token. Once the connection succeeds, select the data on the Choose data page and continue into the Power Query Editor to shape it before you save the dataflow.
## Recipes in M
### Connect with the portal API URL
The URL is the only argument; the token is supplied through the credential, not the query.
\`\`\`powerquery
let
 Source = BI360.Contents("https://demo.app.solverglobal.com/api/dw/externalApi/")
in
 Source
\`\`\`
### Drill into one dataset by name
The result behaves like a navigation table — index the row by Name so the query does not depend on sort order.
\`\`\`powerquery
let
 Source = BI360.Contents("https://demo.app.solverglobal.com/api/dw/externalApi/"),
 Dataset = Source{[Name = "actuals"]}[Data]
in
 Dataset
\`\`\`
### Locate a dataset before drilling
When you cannot recall the exact published name, filter the navigation rows first.
\`\`\`powerquery
let
 Source = BI360.Contents("https://demo.app.solverglobal.com/api/dw/externalApi/"),
 Matches = Table.SelectRows(Source, each Text.Contains([Name], "budget"))
in
 Matches
\`\`\`
## Limitations & Tips
One required parameter and no options record — shaping happens entirely after the call, so keep one dataset per query instead of loading everything the navigation returns. Import is the only capability, so schedule refresh rather than expecting DirectQuery. Keep the access token scoped and rotate it deliberately; an expired token shows up as a failed credential, not a data error. The URL must be the API endpoint from the portal, not the portal's front page — a wrong path fails before any data is fetched. Cloud URL means no gateway for Power Query Online.`,
  },
  {
    slug: "webtrends-analytics",
    name: "Webtrends Analytics",
    group: "Analytics & BI",
    tagline:
      "Pull Webtrends profile reports into Power BI with profile ID, period, and report type as inputs.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["WebtrendsAnalytics.Tables"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/webtrends-analytics",
    content: `## When to Use It
Webtrends Analytics holds the traffic and behavior reports for your site, keyed to a profile. This connector calls the analytics API directly: give it a profile ID, a period designation, and a report type, and it returns a table with the relevant Webtrends data for that combination. Use it when a dashboard needs Webtrends figures on a schedule and the shape of the answer — summary, trend, or day-by-day detail — should be decided at the query rather than in the report.
## Before You Start
You need Webtrends credentials; sign-in uses Basic (username/password). Three parameters are required. The Profile ID comes from the Webtrends URL you are already browsing — if the URL contains profiles/98765, your ID is 98765. The Period value decides whether the connector processes a custom date range (the start and end dates) or a standard report period (the start and end period tokens); only the values for the selected type are used. The report type is Summary (aggregated for the period), Trend (trended as if for a graph), or Individual (each day listed separately). The optional startDate defaults to 30 days ago, endDate to today, startPeriod to current_month-1, and endPeriod to current_month. Power BI and Power Query Online both work here; the service is cloud-hosted so no gateway is needed, and the connector is Preview with Import only.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, search for Webtrends Analytics, select it, then Connect. Fill in the Profile ID, Period, and Report Type fields plus any optional dates or periods, complete the Basic sign-in, then choose Load or Transform Data from Navigator.
## Connect in Power Query Online
Add Webtrends Analytics from the data source page, supply the same three required values, and sign in with the Basic credentials. Once connected, pick the data on the Choose data page and continue into the Power Query Editor before saving.
## Recipes in M
### Pull a summary over a custom date range
Dates are typed as dates, so pass \`#date\` values once Period selects the custom range.
\`\`\`powerquery
let
 Source = WebtrendsAnalytics.Tables(
 ProfileId = "98765",
 Period = "Custom",
 reportType = "Summary",
 startDate = #date(2026, 1, 1),
 endDate = #date(2026, 3, 31)
 )
in
 Source
\`\`\`
### Use standard period tokens instead of dates
When Period selects a standard report period, the period tokens do the work and the dates are ignored.
\`\`\`powerquery
let
 Source = WebtrendsAnalytics.Tables(
 ProfileId = "98765",
 Period = "Standard",
 reportType = "Trend",
 startPeriod = "current_month-1",
 endPeriod = "current_month"
 )
in
 Source
\`\`\`
## Limitations & Tips
Preview status applies, so validate the Period tokens your profile accepts — the connector processes only the start and end values for whichever period type you select, so passing both kinds of arguments is wasted work. On a multi-dimensional report, Trend returns only the first dimension; use Summary or Individual when you need more. Three parameters are required and the rest default sensibly, so a minimal query still runs. Import only — schedule refresh — and a large date window in Individual mode can be slow; narrow the range or aggregate upstream.`,
  },
  {
    slug: "windsor",
    name: "Windsor",
    group: "Analytics & BI",
    tagline:
      "Load the queries you saved in Windsor Onboard straight into Power BI after signing in once.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["Windsor.Main"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/windsor",
    content: `## When to Use It
Windsor pulls marketing and advertising data from your connected platforms into one place, and the workflow that matters here starts outside Power BI: you build and save a query in Windsor Onboard, then this connector exposes those saved queries as a table you drill into. The entry function takes no parameters — signing in is the whole connection — so the right pick is when the shaping has already been decided in Onboard and Power BI only needs to consume the saved result.
## Before You Start
You need a Windsor account with at least one saved query. The setup path: sign in to Windsor.ai with email and password, a Microsoft account, or a Google account; pick a data source and connect your platform account; configure the query with a flexible date range (for example Last 7 days) and the fields you want; choose the accounts to fetch from; then select Save Query and give it a recognizable name. Those saved queries are what appear after you sign in to the connector. Sign-in in Power Query is OAuth. Windsor is cloud-hosted, so Power Query Online connects with no on-premises gateway; both Power BI and Power Query Online are supported, Import only.
## Connect from the Desktop
In Power BI Desktop, open Get Data, search for Windsor, select it, then Connect. Choose Sign in and complete the OAuth window with the same account you used in Onboard. When Navigator loads, it lists every query you saved; tick the ones you want — the preview reflects the saved query settings, though you can switch the account set before loading. Choose Load or Transform Data.
## Connect in Power Query Online
Select Windsor on the data source page and finish the OAuth sign-in with the Onboard account. Once connected, choose the saved queries on the Choose data page and continue into the Power Query Editor to shape them before you save the dataflow.
## Recipes in M
### List your saved queries
The function has no arguments — the signed-in account determines which queries appear.
\`\`\`powerquery
let
 Source = Windsor.Main()
in
 Source
\`\`\`
### Load one saved query by name
Index the navigation row by the name you gave the query in Onboard, so the drill matches your naming convention rather than the Navigator order.
\`\`\`powerquery
let
 Source = Windsor.Main(),
 Campaigns = Source{[Name = "last_7_days_all_sources"]}[Data]
in
 Campaigns
\`\`\`
## Limitations & Tips
Queries can only be created and managed in Windsor Onboard — this connector reads them, it does not define them, so a missing query means a trip back to Onboard. Polling a query's results times out at 30 minutes. Two errors are worth recognizing: an empty-response error means the saved query has no data in Onboard, and a data-source error usually means the source connection there dropped — reconnect it in Onboard rather than editing M. The function has zero parameters, so all filtering happens after the call. Preview-adjacent behavior aside, it is Import only: schedule refresh, and no gateway is needed for the cloud service.`,
  },
];

import type { ConnectorGuide } from "../connector-guides";

/**
 * Practical guides for the SaaS & Business Apps group — added by the Microsoft connectors
 * index expansion. Content is original (data-engineer voice), generated from
 * the connector audit facts under Temp/opencode/guides-src.
 */
export const saasNewGuides: ConnectorGuide[] = [
  {
    slug: "acterys",
    name: "Acterys: Model Automation & Planning",
    group: "SaaS & Business Apps",
    tagline:
      "Bring tables from your Acterys model automation and planning workspace into Power BI or a dataflow with a single no-argument call.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["Acterys.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/acterys",
    content: `## When to Use It
Acterys hosts planning, budgeting, and model automation content; this connector is how Power Query reads it back out. \`Acterys.Contents\` takes no parameters and returns a table describing what your workspace exposes — you drill into the row you want to load its data. It is the right pick when the numbers you need already exist as a curated Acterys model rather than as a raw database table.
## Before You Start
You need access to an Acterys workspace and a sign-in that passes Microsoft Entra ID authentication — complete the org-account prompt on first connection. Only Import is supported, so plan on materializing rows into the model. Acterys is a cloud service, which means no gateway is needed in Power Query Online unless you deliberately combine it with an on-premises source in the same query. The connector ships in Power BI and Power Query Online.
## Connect from the Desktop
Open Get Data from the Home ribbon, search for Acterys, and select Connect. Sign in with your organizational account when prompted, then pick the tables you want from the Navigator and choose Load to push them into the model or Transform Data to shape them first.
## Connect in Power Query Online
Find Acterys in the get data experience of your app, create or reuse the connection, and sign in with your organizational account. Continue to the navigation page, select the tables you need, and choose Transform Data so you can trim them before the dataflow saves them.
## Recipes in M
The entry point has no arguments, so the simplest query is the complete query.
\`\`\`powerquery
let
 Source = Acterys.Contents()
in
 Source
\`\`\`
Treat the result as a navigation table: drill by the row's Name to load one table, leaving the rest of the workspace untouched. The names below are examples — use the values your own Navigator shows.
\`\`\`powerquery
let
 Source = Acterys.Contents(),
 Actuals = Source{[Name = "Actuals"]}[Data]
in
 Actuals
\`\`\`
## Limitations & Tips
This connector is in Preview, so column names, row shapes, and refresh behavior can change between builds — pin expectations loosely and re-test after updates. It is Import-only; there is no DirectQuery mode here, and the single optional record offers no required parameters to tune. Keep queries on one table at a time rather than appending everything the workspace returns, and expect the Entra ID sign-in to be the only credential path when you schedule a refresh in the service.`,
  },
  {
    slug: "adp-analytics",
    name: "ADP Analytics",
    group: "SaaS & Business Apps",
    tagline:
      "Land ADP workforce metrics — detail and employee-level tables — into Power BI from your ADP DataCloud subscription.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["ADPAnalytics.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/adp-analytics",
    content: `## When to Use It
ADP Analytics serves workforce and HR metrics out of ADP's HCM products. Use this connector when the report you are building needs those pre-modeled metrics rather than a raw payroll extract. \`ADPAnalytics.Contents\` takes no parameters and returns a table listing what your subscription exposes; you drill into a row — the metric detail or employee detail tables — to get the data itself.
## Before You Start
You need an ADP account in Workforce Now, Vantage HCM, or Enterprise HR (V5 or V6), plus a subscription to ADP DataCloud Enhanced Insights and the Microsoft Power BI connector for it in the ADP marketplace. Sign-in is OAuth against those ADP credentials. Before the connector will show anything, subscribe to it from the Power BI tile on ADP's Dashboards > Data Mashup page, then use Connect Now to pick the metrics you want imported. Everything is cloud-hosted, so no gateway is required in Power Query Online. The connector appears in Power BI and Power Query Online.
## Connect from the Desktop
After subscribing and selecting your metrics in ADP, open Get Data from the Home ribbon, choose **ADP Analytics**, and select Connect. Sign in through the OAuth prompt, then pick the tables in the Navigator — pick Transform Data rather than Load if you selected functions, because functions need parameters added in the editor.
## Connect in Power Query Online
Choose ADP Analytics from the get data experience, sign in with your OAuth credentials, and continue to the navigation page. Select the tables you configured in ADP and choose Transform Data to trim them before the dataflow persists them.
## Recipes in M
A parameterless call returns the tables your ADP configuration exposes.
\`\`\`powerquery
let
 Source = ADPAnalytics.Contents()
in
 Source
\`\`\`
Drill into the metric detail table by name — the Name value mirrors the Navigator. The columns that come back depend on the metrics you ticked during configuration.
\`\`\`powerquery
let
 Source = ADPAnalytics.Contents(),
 MetricDetail = Source{[Name = "Metric Detail"]}[Data]
in
 MetricDetail
\`\`\`
## Limitations & Tips
Generally available and Import-only, with no parameters to pass. Three limits shape how you schedule it: one connection imports at most 25 metrics, a single API call returns at most 100,000 rows, and ADP runs daily maintenance between 6:00 and 6:15 AM EST — keep scheduled refreshes outside that window. Signing into Power BI Desktop after a cloud refresh has been scheduled invalidates the cloud session, which forces a re-authentication; be deliberate about which credential the refresh uses.`,
  },
  {
    slug: "anaplan",
    name: "Anaplan",
    group: "SaaS & Business Apps",
    tagline:
      "Run your saved Anaplan export actions straight into Power BI by pointing the connector at your API and authentication URLs.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)", "OAuth"],
    capabilities: ["Import"],
    functions: ["Anaplan.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/anaplan",
    content: `## When to Use It
Anaplan models hold planning and forecasting outputs, and the sanctioned way out of them is a saved export action. This connector loads those export actions directly: \`Anaplan.Contents\` requires two URLs — where the API lives and where authentication happens — and returns a table of the non-archived models in your tenant that you can drill into. Use it when the forecast already exists in Anaplan and your job is to report on it, not to rebuild it.
## Before You Start
Verify the system requirements for Power BI Desktop first, then confirm you have Anaplan credentials: either a user ID and password for basic authentication, or designation as an Anaplan SSO user when your tenant runs through a configured identity provider. Both URLs are required parameters, and each authentication kind pairs with a different auth URL — basic auth uses the auth host, while the identity-provider path uses your tenant's app host. Everything is cloud-to-cloud, so Power Query Online needs no gateway. The connector is available in Power BI and Power Query Online.
## Connect from the Desktop
Get Data, choose More, and search for Anaplan. In the connection configuration dialog enter the API URL and the authentication URL that matches your sign-in method, then OK and sign in. From the next dialog choose the export actions you want to run; those saved exports become the rows you load.
## Connect in Power Query Online
Select Anaplan from the connect to data source page, enter both the API URL and the authentication URL, choose your authentication kind, and sign in. On the Choose data page select the export actions to run, then Transform data to shape the result in the editor.
## Recipes in M
Both URLs are required — the API host first, then the auth host that matches how you sign in.
\`\`\`powerquery
let
 Source = Anaplan.Contents("https://api.anaplan.com", "https://us1a.app.anaplan.com")
in
 Source
\`\`\`
The result lists export actions saved in your models; drill into one by name to pull its rows.
\`\`\`powerquery
let
 Source = Anaplan.Contents("https://api.anaplan.com", "https://us1a.app.anaplan.com"),
 Export = Source{[Name = "MonthlyForecast"]}[Data]
in
 Export
\`\`\`
## Limitations & Tips
Generally available, Import-only, and strict about its two required text parameters — an empty or mistyped auth URL fails at sign-in rather than at refresh. If the Navigator starts reporting credential errors, the stored API token has likely expired: clear the Anaplan permissions under Data source settings and sign in again to mint a fresh one. When a query errors in the editor, Refresh Preview or Close and Apply usually re-runs it cleanly. Keep each query to one export action so a slow model export does not stall every other table in the report.`,
  },
  {
    slug: "asana",
    name: "Asana",
    group: "SaaS & Business Apps",
    tagline:
      "Pull task data from an Asana portfolio or team — every project under it — into your Power BI or dataflow model.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Asana Auth"],
    capabilities: ["Import"],
    functions: ["Asana.Tables"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/asana",
    content: `## When to Use It
Asana is where project and task work gets tracked, and this connector turns a portfolio or team URL into a table of tasks spanning all the projects beneath it. \`Asana.Tables\` requires exactly one argument, the link, and returns the task rows for everything under that link. It is the right pick when you want one consolidated task feed rather than connecting to each project separately.
## Before You Start
You need an Asana account that can see the portfolio or team you point at, and a link of the right kind — the URL for a portfolio or team, not a single project. Sign-in runs through the connector's own Asana Auth flow; complete it once on first connection and the service reuses the credential on refresh. Asana is cloud-hosted, so Power Query Online needs no gateway. The connector ships in Power BI and Power Query Online, with Import as its only capability.
## Connect from the Desktop
Open Get Data, search for Asana, and select Connect. Paste the portfolio or team URL — something like a link ending in \`/overview\` — sign in through the Asana Auth prompt, then pick the returned table in the Navigator and load or transform it.
## Connect in Power Query Online
Choose Asana from the get data experience, paste the same portfolio or team URL, and complete the Asana Auth sign-in. Continue to the navigation page, select the task table, and choose Transform Data so you can filter before the dataflow stores it.
## Recipes in M
The link is the only required argument; a URL with a numeric portfolio or team id is enough.
\`\`\`powerquery
let
 Source = Asana.Tables("https://app.asana.com/0/1204567890123/overview")
in
 Source
\`\`\`
Because one link spans every project underneath it, filter early — a completion flag is the obvious cut, though the exact column names depend on what your workspace exposes in the preview.
\`\`\`powerquery
let
 Source = Asana.Tables("https://app.asana.com/0/1204567890123/overview"),
 OpenTasks = Table.SelectRows(Source, each [Completed] = false)
in
 OpenTasks
\`\`\`
Two portfolios or teams in scope? Combine them in one query instead of maintaining two connections.
\`\`\`powerquery
let
 Portfolio = Asana.Tables("https://app.asana.com/0/1204567890123/overview"),
 Team = Asana.Tables("https://app.asana.com/0/1209876543210/overview"),
 Combined = Table.Combine({Portfolio, Team})
in
 Combined
\`\`\`
## Limitations & Tips
Generally available and Import-only, with one required text parameter and no options record to tune. The blast radius of that parameter is the thing to watch: every project under the link comes back, so a big portfolio means a big preview — filter or select columns before loading. There is no DirectQuery mode, so refresh cost scales with task volume; trim columns in the editor rather than loading everything and filtering in the model. Re-run the Asana Auth sign-in if a scheduled refresh starts failing with a credential error.`,
  },
  {
    slug: "assemble-views",
    name: "Assemble Views",
    group: "SaaS & Business Apps",
    tagline:
      "Load saved Assemble Insight views and model properties into Power BI from your construction project's site URL.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["AssembleViews.Feed"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/assemble-views",
    content: `## When to Use It
Assemble Views exposes what your construction team has already curated inside Assemble Insight: saved views with their visible columns, plus selectable properties from model versions. \`AssembleViews.Feed\` takes your site URL and returns a navigation table organized by project, with Models and Views folders underneath — drill into a saved view to get its rows. Use it when the view definition is the contract and your report should reflect exactly those columns.
## Before You Start
You need an Autodesk account with a username and password, membership in at least one Assemble project, and at least one view associated with that project. Sign-in runs through the Autodesk OAuth prompt on first connection. Assemble is cloud-hosted, so no gateway is needed in Power Query Online. The connector is offered in Power BI and Power Query Online, with Import as its capability.
## Connect from the Desktop
Select Assemble Views from Get Data under the Online Services category and Connect. Enter your site URL — a host like \`https://example.tryassemble.com\` — and optionally a start date; leaving the date blank pulls the latest data on every refresh. Sign in with your Autodesk account, then expand a project in the Navigator and pick items from its Models and Views folders.
## Connect in Power Query Online
Find Assemble Views in the get data experience, enter the site URL, and sign in with your Autodesk account when prompted. Continue to the navigation page, expand the project you want, select its views or models, and choose Transform Data.
## Recipes in M
The site URL is the only required argument; a blank optional date in the dialog simply means "latest on every refresh".
\`\`\`powerquery
let
 Source = AssembleViews.Feed("https://demo.tryassemble.com")
in
 Source
\`\`\`
The Navigator tree is two levels deep — project first, then its folders — so drill twice to reach a saved view's columns. The names below are examples; use the ones your project shows.
\`\`\`powerquery
let
 Source = AssembleViews.Feed("https://demo.tryassemble.com"),
 Project = Source{[Name = "Riverside Tower"]}[Data],
 StatusView = Project{[Name = "4D Status"]}[Data]
in
 StatusView
\`\`\`
## Limitations & Tips
Generally available and Import-only. Three ceilings shape how you design the query: a view with much more than 100,000 rows may not load depending on how many fields it carries, view images come back only as thumbnails because of row size limits, and a Models query can select at most 200 properties. Split oversized views into smaller ones and append them, or model the relationships instead of one giant table. Refresh cost follows view size, so prefer the narrowest saved view that answers the question.`,
  },
  {
    slug: "autodesk-construction-cloud",
    name: "Autodesk Construction Cloud",
    group: "SaaS & Business Apps",
    tagline:
      "Read the latest account and project extracts from Autodesk Construction Cloud into Power BI by region.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["AutodeskConstructionCloud.Feed"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/autodesk-construction-cloud",
    content: `## When to Use It
Autodesk Construction Cloud stores account- and project-level data behind BIM 360 and ACC, and this connector reads the extracts those Data Connector runs produce. \`AutodeskConstructionCloud.Feed\` requires one argument — your server region — and returns a navigation table with an Account Extract folder and Project Extracts folders to drill into. Use it when the executive overview data you need has already been extracted and you want it in the model on a schedule.
## Before You Start
You need an Autodesk account with a username and password and access to the Executive Overview in a BIM 360 or ACC account. The extract must have run: either trigger a Data Connector extraction manually or schedule it, because the connector reads the most recent run rather than live account data. Sign-in is OAuth with your Autodesk credentials. Supported regions are Australia, Canada, Europe, Germany, India, Japan, UK, and United States — pick the one your servers live in. Everything is cloud-hosted, so Power Query Online needs no gateway. Available in Power BI and Power Query Online.
## Connect from the Desktop
Get Data → Online Services → **Autodesk Construction Cloud** → Connect. A connector notice appears the first time, then you pick the server region and sign in with Autodesk credentials. In the Navigator, expand the Account you want: an Account Extract folder plus Project Extracts hold the data from the last run.
## Connect in Power Query Online
Choose Autodesk Construction Cloud from the get data experience, enter the region, and sign in with your Autodesk account. Continue to the navigation page, expand the account and extract folders you need, and choose Transform Data.
## Recipes in M
Region is required and is spelled out as a full name, not a code.
\`\`\`powerquery
let
 Source = AutodeskConstructionCloud.Feed("United States")
in
 Source
\`\`\`
Drill into the account-level extract first, then into a project extract inside it — names come from what your account published in its last run.
\`\`\`powerquery
let
 Source = AutodeskConstructionCloud.Feed("United States"),
 AccountExtract = Source{[Name = "Account Extract"]}[Data]
in
 AccountExtract
\`\`\`
## Limitations & Tips
Generally available and Import-only, with one required text parameter and no options record. The headline constraint is freshness: this reads the last Data Connector extract, not the live account, so refresh cadence is capped by how often the extraction runs upstream — schedule the extract first, then the Power BI refresh. A first connection shows a preview-connector notice you can dismiss permanently. If a region or extract is missing, verify the extraction actually completed before debugging the query.`,
  },
  {
    slug: "automation-anywhere",
    name: "Automation Anywhere",
    group: "SaaS & Business Apps",
    tagline:
      "Bring Control Room automation metrics into Power BI by naming your Control Room version and host.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["AutomationAnywhere.Feed"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/automation-anywhere",
    content: `## When to Use It
Automation Anywhere's Control Room runs the bots; this connector reads the automation data it exposes so bot activity can sit alongside the rest of your operational reporting. \`AutomationAnywhere.Feed\` requires two arguments — the Control Room version and its host — and returns a table you drill into for the measures you need. Use it when the operational numbers already exist on the Control Room side.
## Before You Start
You need a reachable Control Room and an account that can sign in with a username and password; that is the connector's only authentication kind. The version parameter takes \`10.x\`/\`11.x\` or Automation 360, and the host parameter is the hostname or IP address of the server running the Control Room service. If the Control Room sits on your own network rather than the public internet, Power Query Online will need an on-premises data gateway to reach it. The connector is available in Power BI and Power Query Online, and only supports Import.
## Connect from the Desktop
Open Get Data from the Home ribbon, search for Automation Anywhere, and select Connect. Enter the Control Room version and host in the dialog, sign in with your Control Room username and password, then pick the tables you want from the Navigator and load or transform them.
## Connect in Power Query Online
Choose Automation Anywhere from the get data experience, supply the version and host values, and sign in with Basic credentials. Attach an on-premises data gateway when the Control Room is not publicly reachable, then continue to the navigation page and select Transform Data.
## Recipes in M
Both parameters are required text — version first, then the host where the Control Room service runs.
\`\`\`powerquery
let
 Source = AutomationAnywhere.Feed("11.x", "https://controlroom.example.com")
in
 Source
\`\`\`
Drill into the table the Navigator lists for your Control Room — row names reflect what your Control Room version publishes — then keep only the measures the report needs.
\`\`\`powerquery
let
 Source = AutomationAnywhere.Feed("11.x", "https://controlroom.example.com"),
 BotData = Source{[Name = "Bot Statistics"]}[Data]
in
 BotData
\`\`\`
## Limitations & Tips
Generally available, Import-only, and strict: both text parameters are required, so a mistyped host fails immediately at sign-in. For Automation 360, note that Bot Insight ships as part of the Control Room, so you do not need a separate BI host — pass the Control Room itself. On-premises Control Rooms are the common gateway case: cloud Power Query Online cannot reach a private host without one. Keep queries on one table per query and filter in the editor, since scheduled refreshes will re-run everything you leave in preview.`,
  },
  {
    slug: "automy-data-analytics",
    name: "Automy Data Analytics",
    group: "SaaS & Business Apps",
    tagline:
      "Query Automy's report tables with your report token and land delegation and approval data in Power BI.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["API key"],
    capabilities: ["Import"],
    functions: ["AutomyDataAnalytics.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/automy-data-analytics",
    content: `## When to Use It
Automy's Data Analytics service publishes report tables — delegations, delegation items, delegated tasks, instance approvers, and more — for consumption downstream. \`AutomyDataAnalytics.Contents\` takes no parameters and returns a table of the tables your token can read; drill into one by name to load it. Use it when the report has already been modeled on the Automy side and you just need the rows.
## Before You Start
You need an Automy Report Token — generate it from the configuration options in Automy — plus an account with a valid subscription. Sign-in uses the API key credential kind: paste the token when the connector prompts. Certain tables and functions also expose optional start and end date parameters, which you add in the query editor after selecting them with Transform Data. Automy is cloud-hosted, so no gateway is needed in Power Query Online unless you combine it with an on-premises source. The connector ships in Power BI and Power Query Online.
## Connect from the Desktop
Get Data → Online Services → **Automy Data Analytics** → Connect. Acknowledge the third-party notice, sign in with the API key, then complete the parameter window — report type, data type, and token details — before the Navigator appears. Choose Transform Data when you selected functions so you can supply their parameters.
## Connect in Power Query Online
Choose Automy Data Analytics from the get data experience, sign in with your API key, and continue to the navigation page. Select the tables you need and choose Transform Data so the dataflow stores a trimmed result.
## Recipes in M
The entry point has no arguments; the token travels in the credential store rather than in the query.
\`\`\`powerquery
let
 Source = AutomyDataAnalytics.Contents()
in
 Source
\`\`\`
Drill into a published table by name — the name below is one of those Automy's release notes have listed. Select the columns the report uses after the drill.
\`\`\`powerquery
let
 Source = AutomyDataAnalytics.Contents(),
 Delegations = Source{[Name = "Delegations"]}[Data]
in
 Delegations
\`\`\`
## Limitations & Tips
Generally available and Import-only, with zero required parameters. Two hard ceilings govern refresh design: 100,000 rows per connection and a default rate limit of 120 requests per minute per user, and the connector raises an error rather than silently truncating when either is hit. Use the optional start and end date parameters on the tables that offer them to keep pulls inside those ceilings, and avoid stacking many queries in one refresh that would collectively trip the rate limit. If the Navigator reports a credential error, clear the saved data source permissions and sign in again with a fresh token.`,
  },
  {
    slug: "vsts",
    name: "Azure DevOps (Boards only)",
    group: "SaaS & Business Apps",
    tagline:
      "Load the Analytics views defined for an Azure DevOps project into Power BI — Boards work item trends on a schedule.",
    products: ["Power BI"],
    authentication: ["Microsoft Entra ID", "Basic (username/password)", "Personal Access Token"],
    capabilities: ["Import"],
    functions: ["VSTS.AnalyticsViews"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/vsts",
    content: `## When to Use It
Azure DevOps Analytics views are pre-scoped queries over a project's Boards data, and this connector hands them to Power Query as a table of views you can drill into. \`VSTS.AnalyticsViews\` takes the organization, the project, and an optional options record, and returns the Analytics views that project offers — pick one and its rows become your dataset. It is the right pick when the view author has already decided which work item fields matter and you want that definition reused rather than re-expressed in M.
## Before You Start
You need the organization name — the segment after \`dev.azure.com\`, such as \`fabrikam-fiber-inc\` — and the project name exactly as it appears in the URL, such as \`Fabrikam-Fiber\`. Your account needs access to the project's Analytics views. Three sign-in kinds are accepted: Microsoft Entra ID, a username and password, and a personal access token; pick the one your organization's policy allows. This connector is offered in Power BI only, with Import as its capability — there is no Excel or Power Query Online path here. Azure DevOps is a cloud service, so no gateway is involved.
## Connect from the Desktop
Open Get Data from the Home ribbon, search for the Azure DevOps entry, and select Connect. Supply the organization and team project when prompted, choose your sign-in kind and authenticate, then expand the list of Analytics views in the Navigator and either load one or open it in the query editor.
## Recipes in M
Both required text arguments come straight from the project URL: organization first, then team project.
\`\`\`powerquery
let
 Source = VSTS.AnalyticsViews("fabrikam-fiber-inc", "Fabrikam-Fiber")
in
 Source
\`\`\`
Drill into a view by name to get its rows; the Name value matches what the Navigator displays, so the reference does not depend on sort order.
\`\`\`powerquery
let
 Source = VSTS.AnalyticsViews("fabrikam-fiber-inc", "Fabrikam-Fiber"),
 Trend = Source{[Name = "Work Item Trend"]}[Data]
in
 Trend
\`\`\`
If a project publishes many views, filter the listing down before drilling so the preview stays readable.
\`\`\`powerquery
let
 Source = VSTS.AnalyticsViews("fabrikam-fiber-inc", "Fabrikam-Fiber"),
 Mine = Table.SelectRows(Source, each Text.Contains([Name], "Trend"))
in
 Mine
\`\`\`
## Limitations & Tips
Generally available and Import-only. The scope is Boards — plan, track, and ship work items — so Pipelines and Repos data is out of reach through this entry point. Two of the three parameters are required and there is no default organization, so a wrong spelling fails fast rather than returning empty results; the options record is optional and never blocks a refresh. Views can grow with work item history, so prefer a published view with a sensible date window over loading every view a project defines.`,
  },
  {
    slug: "bitsight-security-ratings",
    name: "Bitsight Security Ratings",
    group: "SaaS & Business Apps",
    tagline:
      "Pull Bitsight security ratings and findings for a single company into Power BI using your API token.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["API Authentication"],
    capabilities: ["Import"],
    functions: ["BitSightSecurityRatings.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/bitsight-security-ratings",
    content: `## When to Use It
Bitsight Security Ratings scores outside-in security posture, and this connector surfaces that scored data for reporting. \`BitSightSecurityRatings.Contents\` takes two optional arguments — a company identifier and a logical flag — and returns a table of the data points your token can read; drill into the one you need. Use it when security posture belongs in the same model as your operational data and the ratings already exist on the Bitsight side.
## Before You Start
You need a Bitsight Security Ratings product; without it the data simply is not there to pull. Sign-in uses the API Authentication kind: retrieve your API token from Bitsight and paste it when the connector prompts. Power BI Desktop should be a March 2021 build or later for this connector to work. Bitsight is cloud-hosted, so no gateway is needed in Power Query Online. The connector appears in Power BI and Power Query Online, with Import as its only capability.
## Connect from the Desktop
Get Data → More → search for Bitsight → Connect. Acknowledge the third-party service notice, paste your API token into the credential window, and once the connection establishes you can preview and select multiple data points in the Navigator. Load brings the whole table in; Transform Data opens the editor so you can filter first.
## Connect in Power Query Online
Choose the Bitsight connector from the get data experience, enter the API token as the credential, and continue to the navigation page. Select the data points you want and choose Transform Data so the stored result is already narrowed.
## Recipes in M
Scope the call to one company with its GUID, passing the \`affects_rating_findings\` flag alongside it.
\`\`\`powerquery
let
 Source = BitSightSecurityRatings.Contents("3f2a9c7e-1b4d-4e8f-9c2a-6d5b8e1f7a3c", true)
in
 Source
\`\`\`
An empty call is also valid: it falls back to the parent company the account assumes, which is handy for a quick preview before you commit to a GUID.
\`\`\`powerquery
let
 Source = BitSightSecurityRatings.Contents()
in
 Source
\`\`\`
Drill into a data point by name once you know which one the report needs; the rows that come back follow whatever your subscription exposes.
\`\`\`powerquery
let
 Source = BitSightSecurityRatings.Contents("3f2a9c7e-1b4d-4e8f-9c2a-6d5b8e1f7a3c", true),
 Ratings = Source{[Name = "Security Ratings"]}[Data]
in
 Ratings
\`\`\`
## Limitations & Tips
Generally available, Import-only, and both parameters optional — nothing blocks a refresh. The important constraint is scope: you can view data for one company at a time, and the connector assumes the parent company unless you pass a GUID; switch the parent in Bitsight if a different company should be the default. Column names follow whatever data points your subscription exposes, so confirm them in the preview before hard-coding selections. If the Navigator rejects the credential, regenerate the API token rather than reusing an old one.`,
  },
  {
    slug: "bloomberg-data-and-analytics",
    name: "Bloomberg Data and Analytics",
    group: "SaaS & Business Apps",
    tagline:
      "Run Bloomberg Query Language or SQL against your Bloomberg subscription and land the result set in Power BI.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Bloomberg Account"],
    capabilities: ["Import"],
    functions: ["Bloomberg.Query"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/bloomberg-data-and-analytics",
    content: `## When to Use It
Bloomberg data reaches Power Query as a query you write, not a browsable catalog. \`Bloomberg.Query\` takes a single text argument — either a Bloomberg Query Language statement or a SQL statement — and returns the result set as a table you can then shape. Use it when your organization already knows the instruments and fields it needs and wants them refreshed into the model on a schedule.
## Before You Start
Your organization needs a subscription to the Bloomberg product the query draws on, a Bloomberg Anywhere license, and either the Bloomberg B-Unit mobile app or a B-Unit device. Sign-in runs under the Bloomberg Account kind and is completed on first connection. Bloomberg is a hosted service, so the standard cloud path needs no gateway. The connector is offered in Power BI and Power Query Online, and Import is the only capability.
## Connect from the Desktop
Get Data → **Bloomberg Data and Analytics** → Connect. Acknowledge the third-party notice, write your query in the dialog, and select OK to execute it. The connector accepts both BQL and SQL and picks the matching data source from the query text you supplied.
## Connect in Power Query Online
Choose Bloomberg Data and Analytics from the get data experience, enter your query, and sign in with your Bloomberg Account credentials. Continue to the navigation page and choose Transform Data so you can inspect the result set before the dataflow persists it.
## Recipes in M
The documented sample form shows both accepted styles in one string; in practice you pass your own BQL or SQL text.
\`\`\`powerquery
let
 Source = Bloomberg.Query("select ... from ... or for(...) get(...)")
in
 Source
\`\`\`
SQL statements get query folding in the editor, which keeps the transfer down; BQL results come back as a finished table you shape locally.
\`\`\`powerquery
let
 Source = Bloomberg.Query("select ... from ..."),
 Sample = Table.FirstN(Source, 250)
in
 Sample
\`\`\`
Two separate queries can be unioned into one table when a report needs more than one pull.
\`\`\`powerquery
let
 First = Bloomberg.Query("for(...) get(...)"),
 Second = Bloomberg.Query("select ... from ..."),
 Combined = Table.Combine({First, Second})
in
 Combined
\`\`\`
## Limitations & Tips
Generally available, Import-only, with one required text parameter. Two practical notes: query folding applies to SQL queries only, so BQL pulls always bring back the full result set — keep them narrow — and the older \`BQL.Query()\` entry point still works but authenticates separately, so standardize on \`Bloomberg.Query()\` to avoid signing in twice. Results reflect whatever the query returns at refresh time, so prefer explicit instrument lists over broad selects to keep refresh times predictable.`,
  },
  {
    slug: "bqecore",
    name: "BQE Core",
    group: "SaaS & Business Apps",
    tagline:
      "Sign in to your BQE Core company file and load its practice-management tables into Power BI.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["CORE Login"],
    capabilities: ["Import"],
    functions: ["BQECore.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/bqecore",
    content: `## When to Use It
BQE Core holds time, billing, and practice data, and this connector reads it back for reporting. \`BQECore.Contents\` takes no parameters and returns a table of what the signed-in company file exposes — you drill into the module and table you want. It is the right pick when the numbers already live in Core and the report should reflect that single source of truth rather than an export.
## Before You Start
You need a BQE Core account with a username and password — that is the CORE Login sign-in kind the connector uses. On first connection you are asked to sign in with your Core email and password, pick a company file, and grant permission to it; ticking the remember-consent option skips that grant next time. Core is a cloud service, so Power Query Online needs no gateway for the standard path. The connector ships in Power BI and Power Query Online, with Import as its capability.
## Connect from the Desktop
Get Data → Other → **BQEDataConnector** → Connect. Select Sign In, enter your Core email and password, choose the company file, and grant permission — optionally remembering the consent. Connect, pick a module, then select the tables you want in the Navigator and choose Transform Data to shape them.
## Connect in Power Query Online
Choose the BQE Core connector from the get data experience, sign in with the same Core email and password, and select the company file to grant against. Continue to the navigation page, pick the tables you need, and choose Transform Data so the dataflow stores a trimmed result.
## Recipes in M
No arguments — the company file and module choices are carried by the sign-in session.
\`\`\`powerquery
let
 Source = BQECore.Contents()
in
 Source
\`\`\`
Treat the result as a navigation tree: drill by name into the module first, then into the table inside it. The names below are examples; use what your company file shows.
\`\`\`powerquery
let
 Source = BQECore.Contents(),
 Module = Source{[Name = "Accounting"]}[Data],
 Invoices = Module{[Name = "Invoices"]}[Data]
in
 Invoices
\`\`\`
## Limitations & Tips
Generally available and Import-only, with zero required parameters — the whole connection is governed by the credential and the consent you granted. Permission is per company file, so switching files means granting again; if a refresh fails with a consent error, re-run the sign-in flow rather than editing the query. Keep each query pinned to one module's tables instead of expanding everything, and remember that scheduled refreshes in the service reuse whichever account stored the credential.`,
  },
  {
    slug: "buildingconnected",
    name: "BuildingConnected",
    group: "SaaS & Business Apps",
    tagline:
      "Load BuildingConnected bids and TradeTapp opportunities with a date range and closed-project switch built into the query.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["BuildingConnected.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/buildingconnected",
    content: `## When to Use It
BuildingConnected covers bid management and TradeTapp covers subcontractor prequalification, and this connector reads both. \`BuildingConnected.Contents\` takes three optional arguments — a range start, a range end, and an include-closed flag — and returns a table of entities you drill into. Use it when the opportunity or bid records you need are already tracked in BuildingConnected and the report should follow their lifecycle.
## Before You Start
You need a BuildingConnected account linked to your Autodesk ID, plus the right subscription for the data you want: an active Bidboard Pro subscription for Opportunity data, and an active TradeTapp subscription for TradeTapp data. Sign-in runs through the Autodesk OAuth prompt with those credentials. Both products are cloud-hosted, so no gateway is needed in Power Query Online. The connector appears in Power BI and Power Query Online, with Import as its only capability.
## Connect from the Desktop
Get Data → Online Services → **BuildingConnected & TradeTapp** → Connect. A connector notice appears on first use; then sign in with your Autodesk credentials and pick the data type you want in the Navigator. Loading all records can take several minutes when the object count is large, so Transform Data first if you only need a slice.
## Connect in Power Query Online
Choose BuildingConnected & TradeTapp from the get data experience, sign in with your Autodesk account, and continue to the navigation page. Select the entities you need and choose Transform Data so the dataflow persists only what the report uses.
## Recipes in M
The three optional parameters let you push the window into the source call rather than filtering afterwards.
\`\`\`powerquery
let
 Source = BuildingConnected.Contents(
 #datetimezone(2026, 1, 1, 0, 0, 0, 0),
 #datetimezone(2026, 6, 30, 0, 0, 0, 0),
 false
 )
in
 Source
\`\`\`
Drill into an entity by name to get its rows; the names come from what your account exposes in Navigator.
\`\`\`powerquery
let
 Source = BuildingConnected.Contents(),
 Opportunities = Source{[Name = "Opportunities"]}[Data]
in
 Opportunities
\`\`\`
## Limitations & Tips
Generally available, Import-only, and all three parameters are optional — omit them to get the default, unfiltered listing. Which entities appear depends on your subscriptions, so a missing TradeTapp folder usually means the subscription, not the query. The include-closed switch matters for history: set it to false for a live pipeline view, true when the report needs previous bid versions. Because loads pull whole objects, set the date range in the query rather than loading everything and filtering in the model.`,
  },
  {
    slug: "cdata-connect-cloud",
    name: "CData Connect Cloud",
    group: "SaaS & Business Apps",
    tagline:
      "Surface any connection configured in CData Connect Cloud inside Power Query, with an optional SQL pass-through.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["CData Connect account"],
    capabilities: ["Import"],
    functions: ["CDataConnectCloud.ContentsV2"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/cdata-connect-cloud",
    content: `## When to Use It
CData Connect Cloud is the hub where your source connections are already defined; this connector reads from them so Power Query does not have to know the underlying drivers. \`CDataConnectCloud.ContentsV2\` takes an optional options record and returns a table of the data from the connected source — the Navigator shows your configured connections as a tree you drill into. Use it when several sources are managed centrally and you want one consistent entry point.
## Before You Start
You need a CData Connect Cloud account and at least one connection already configured in it — the connector cannot create connections on your behalf. Sign-in uses the CData Connect account kind: enter your sign-in details on first connection. Everything runs through the cloud service, so no gateway is needed in Power Query Online. The connector is offered in Power BI and Power Query Online, with Import as its capability.
## Connect from the Desktop
Get Data → search for CData → **CData Connect Cloud** → Connect. Sign in with your CData Connect Cloud credentials, then Connect again; the Navigator expands into a tree where each configured connection appears as a subtree. Select the data you want and choose Load, or Transform Data to adjust the query first.
## Connect in Power Query Online
Choose CData Connect Cloud from the get data experience, sign in with your account, and continue to the navigation page. Expand the connection you want, select its tables, and choose Transform Data so the dataflow stores the shaped result.
## Recipes in M
An empty call opens the tree of configured connections; drill into one by name to reach its tables. The name below is an example — yours comes from the connection you configured.
\`\`\`powerquery
let
 Source = CDataConnectCloud.ContentsV2(),
 Orders = Source{[Name = "SqlServerProd"]}[Data]
in
 Orders
\`\`\`
The options record accepts a \`Query\` field for a SQL statement pushed into the connection, which keeps row-level filtering on the source side.
\`\`\`powerquery
let
 Source = CDataConnectCloud.ContentsV2([Query = "SELECT * FROM Orders WHERE OrderDate >= '2026-01-01'"])
in
 Source
\`\`\`
## Limitations & Tips
Generally available, Import-only, with no required parameters — but the account must already have a connection configured, or the tree is empty. The \`Query\` option is documented as unsupported with DirectQuery, and this connector's capability here is Import, so treat the SQL pass-through as an import-time optimization. Write the statement narrowly: it executes against the configured connection on every refresh. If a table is missing, look at the connection's permissions in Connect Cloud before editing M.`,
  },
  {
    slug: "cherwell",
    name: "Cherwell",
    group: "SaaS & Business Apps",
    tagline:
      "Browse the saved searches behind your Cherwell REST API — by API URL, client ID, and optional locale.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["Cherwell.SavedSearches"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/cherwell",
    content: `## When to Use It
Cherwell's saved searches are the reports its administrators have already defined, and this connector returns them as a table you can drill into. \`Cherwell.SavedSearches\` requires the REST API URL and the API client ID, with optional locale and saved search path arguments; leave the search path blank to browse everything, or supply one to go straight to a known search. Use it when the search definition is the contract and the report should match it.
## Before You Start
You need a reachable Cherwell REST API — the sample form is a server path such as \`https://myserver/CherwellAPI/api/\` — and the client ID or key issued for that API. Sign-in runs through the connector's OAuth flow. If your Cherwell server sits on your own network rather than the public internet, Power Query Online will need an on-premises data gateway to reach it; a hosted instance does not. The connector is offered in Power BI and Power Query Online, and only supports Import.
## Connect from the Desktop
Open Get Data, search for Cherwell, and select Connect. Enter the REST API URL and the client ID — add the locale and a saved search path if you already know them — then sign in through the OAuth prompt and pick the searches you want from the Navigator.
## Connect in Power Query Online
Choose Cherwell from the get data experience, supply the API URL and client ID, and sign in with OAuth. Attach an on-premises data gateway when the API is not publicly reachable, then continue to the navigation page, select the searches, and choose Transform Data.
## Recipes in M
The two required arguments come first: the API endpoint, then the client ID that authorizes the call.
\`\`\`powerquery
let
 Source = Cherwell.SavedSearches("https://myserver/CherwellAPI/api/", "my-client-id")
in
 Source
\`\`\`
The result lists the saved searches you can read; drill into one by name to get its rows.
\`\`\`powerquery
let
 Source = Cherwell.SavedSearches("https://myserver/CherwellAPI/api/", "my-client-id"),
 Search = Source{[Name = "Open Incidents"]}[Data]
in
 Search
\`\`\`
Passing a locale and a search path skips the browsing step entirely — the path targets a specific saved search, and the example below is illustrative of the shape.
\`\`\`powerquery
let
 Source = Cherwell.SavedSearches(
 "https://myserver/CherwellAPI/api/",
 "my-client-id",
 "de-DE",
 "service desk/open incidents"
 )
in
 Source
\`\`\`
## Limitations & Tips
This connector is in Preview, so expect possible changes to parameters and output shape between builds. Two parameters are required and there is no default endpoint, so a stale client ID fails immediately rather than returning empty results. Leave the saved search path blank when you want to discover what exists; fill it in for production queries so a renamed search surfaces as a clear error instead of silently changing your dataset. Keep the locale consistent with the Cherwell server's localization, and budget for a gateway when the API lives on-premises.`,
  },
  {
    slug: "cloudbluepsa",
    name: "CloudBluePSA",
    group: "SaaS & Business Apps",
    tagline:
      "Page through a CloudBlue PSA report API endpoint and get every page combined into a single table.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["API key"],
    capabilities: ["Import"],
    functions: ["CloudBluePSA.Feed"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/cloudbluepsa",
    content: `## When to Use It
CloudBlue PSA serves report data through GET endpoints, and this connector handles the pagination you would otherwise write by hand. \`CloudBluePSA.Feed\` takes the endpoint URL plus a JSON filter, walks the pages, and returns one combined table — use it when the endpoint already exists and you want the full result set.
## Before You Start
You need a CloudBlue PSA instance (username and password) plus an API key: sign in — usually at a host like your company name on \`cloudbluepsa.io\` — then create an API user under Setup > Employees to get the key. Sign-in uses the API key credential kind. The instance is cloud-hosted, so Power Query Online needs no gateway. It appears in Power BI and Power Query Online, Import only.
## Connect from the Desktop
Get Data → search for **CloudBluePSA** → Connect. Paste the URL from the GET side of your endpoint and the filter built for it, then OK. Provide your API key, connect, and choose Transform Data: expand the Data column, then the payload column inside it, and select the grid columns you want.
## Connect in Power Query Online
Choose CloudBluePSA from the Choose data source page, paste the same URL and Filter, and put the API key in the Account Key field. Continue to Next, then expand the Data column and the payload column beneath it.
## Recipes in M
Both arguments are required: the GET endpoint and a JSON filter; \`gridcolumns\` decides which fields come back. Doubled quotes escape JSON in M.
\`\`\`powerquery
let
 Source = CloudBluePSA.Feed("https://INSTANCE_URL/webapi/v1.2/tickets/getticketsreport", "{""pageno"": 1, ""pagesize"": 100, ""resulttype"": ""Json"", ""includeccysymbols"": true, ""gridcolumns"": ""RefNumber,Type,Status,CustomerName""}")
in
 Source
\`\`\`
The payload arrives nested: expand the outer Data column, then the one inside it; field names follow your \`gridcolumns\`.
\`\`\`powerquery
let
 Source = CloudBluePSA.Feed("https://INSTANCE_URL/webapi/v1.2/tickets/getticketsreport", "{""pageno"": 1, ""pagesize"": 100, ""resulttype"": ""Json"", ""gridcolumns"": ""RefNumber,Type,Status""}"),
 Outer = Table.ExpandRecordColumn(Source, "Data", {"Column1.1"}, {"Column1.1"}),
 Payload = Table.ExpandRecordColumn(Outer, "Column1.1", {"RefNumber", "Type", "Status"}, {"RefNumber", "Type", "Status"})
in
 Payload
\`\`\`
Push row filtering into the endpoint with a \`filters\` entry — fewer rows cross the wire on every refresh.
\`\`\`powerquery
let
 Source = CloudBluePSA.Feed("https://INSTANCE_URL/webapi/v1.3/tickets/getticketsreport", "{""pageno"": 1, ""pagesize"": 100, ""filters"": [{""field"": ""Type"", ""op"": ""cn"", ""data"": ""n""}], ""resulttype"": ""Json"", ""gridcolumns"": ""RefNumber,Type,Name""}")
in
 Source
\`\`\`
## Limitations & Tips
Preview status means field names and expansion behavior can shift between builds — confirm the payload column's actual name first. Both parameters are required, and the filter must be valid JSON or the call fails. Paging is handled for you, so \`pageno\` is a starting point, not a loop you manage. Request only the grid columns the report needs: they define the output shape, and trimming them here beats dropping them in the model.`,
  },
  {
    slug: "cognite-data-fusion-odata",
    name: "Cognite Data Fusion (OData)",
    group: "SaaS & Business Apps",
    tagline:
      "Query a Cognite Data Fusion project — by name, data model URL, or custom OData — through Microsoft Entra ID.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["Cognite.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/cognite-data-fusion-(odata)",
    content: `## When to Use It
Cognite Data Fusion holds industrial asset, time series, and contextual data, and this connector reads it over OData. \`Cognite.Contents\` requires a data source identifier — a project name, a data model URL, or a custom OData query — and takes an optional CDF API URL; it returns a table you drill into for the entities you need. Use it when the CDF project is already contextualized and the report should consume that model rather than raw source data.
## Before You Start
The environment must be federated with Microsoft Entra ID, you need a valid CDF project, an account that can reach that project through Entra ID, and the appropriate permissions inside the project. Sign-in is Microsoft Entra ID; guest users add their tenant to the identifier. The API URL defaults to the public endpoint, and some OData services also need an API version segment on it. Everything is cloud-to-cloud, so Power Query Online needs no gateway unless you combine the query with an on-premises source. The connector is offered in Power BI and Power Query Online, with Import as its capability.
## Connect from the Desktop
Get Data → search for Cognite → **Cognite Data Fusion (OData)** → Connect. Enter the Data Source Identifier — project name, model URL, or custom query — and the CDF API URL, then sign in with your Microsoft Entra ID account. Pick the data you want in the Navigator and load or transform it.
## Connect in Power Query Online
Choose Cognite Data Fusion (OData) in the get data experience, fill in the same two connection settings, and create a new connection or reuse an existing one. Sign in with your Entra ID account, let your organization's gateway selection apply if one is required, then continue to the navigation page and choose Transform Data.
## Recipes in M
A project name alone is enough for the common case; the optional second argument pins the API endpoint.
\`\`\`powerquery
let
 Source = Cognite.Contents("publicdata")
in
 Source
\`\`\`
Drill into an entity by name — the Name value mirrors the Navigator, so the reference survives a re-sorted preview.
\`\`\`powerquery
let
 Source = Cognite.Contents("publicdata"),
 Assets = Source{[Name = "assets"]}[Data]
in
 Assets
\`\`\`
When the service needs an API version, append it to the endpoint rather than the identifier; guest access instead goes on the identifier as a tenant parameter.
\`\`\`powerquery
let
 Source = Cognite.Contents("publicdata", "https://bluefield.cognitedata.com/20230821")
in
 Source
\`\`\`
## Limitations & Tips
Generally available and Import-only, with one required parameter and no options record. Three environment details cause most failures: the project must be Entra ID-federated, some OData services require an API version segment on the URL, and guest sign-in needs \`tenantId\` on the identifier — append it after the query string when the identifier already carries parameters. Sign-in reuses your Entra ID credentials, so scheduled refreshes fail only when access to the project is revoked, not when a password rotates. Keep identifiers to one project per query so a permissions change cannot silently empty every table at once.`,
  },
  {
    slug: "cognite-data-fusion-rest-api",
    name: "Cognite Data Fusion (REST API)",
    group: "SaaS & Business Apps",
    tagline:
      "Reach a Cognite Data Fusion project from Power Query and pull the functions it exposes straight into your model.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Cognite Data Fusion"],
    capabilities: ["Import"],
    functions: ["CogniteDataSource.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/cognite-data-fusion-(rest-api)",
    content: `## When to Use It
Reach for this when the data already lives in Cognite Data Fusion and you want it queryable next to everything else instead of exported to files. The entry function, \`CogniteDataSource.Contents\`, takes two required text values (the CDF project and the CDF organization) and returns a table describing what the project exposes, one row per entry. That table is what the Navigator lists when you connect, and you can filter it or drill into entries the same way you would in any other query. Import mode only.
## Before You Start
You need a valid CDF project and a user account that can read it; teams usually keep production and test work in separate projects, so confirm which one you are pointing at. The sign-in kind is a Cognite Data Fusion account, requested the first time the connection is created.
CDF is a cloud service, so Desktop and Power Query Online normally reach it with no gateway at all. If your organization routes traffic through a gateway, the Power Query Online dialog offers that choice; leave it at (none) for a direct connection and set the Privacy Level there. The connector appears in both Power BI and Power Query Online.
## Connect from the Desktop
From the Home ribbon in Power BI Desktop, select Get Data, search for Cognite, pick Cognite Data Fusion (REST API) and Connect. The dialog has exactly two fields: CDF project and CDF organization. Sign in, confirm, and the Navigator opens with the available functions; tick one to preview or go straight to Transform Data.
## Connect in Power Query Online
In the Power Query Online get data experience, select Cognite Data Fusion (REST API). Connection settings take the same two values: CDF project and CDF organization. Under Connection credentials, create a new connection or reuse an existing one, choose your gateway or (none), set the Privacy Level, sign in, then move on to Choose data and Transform data.
## Recipes in M
### Connect with project and organization
\`\`\`powerquery
let
 Source = CogniteDataSource.Contents("publicdata", "publicdata")
in
 Source
\`\`\`
Both arguments are required text. The values shown are the public sample project; replace them with your own project name and the organization, which is typically your company name or an abbreviation of it.
### Filter the list down to a topic
\`\`\`powerquery
let
 Source = CogniteDataSource.Contents("publicdata", "publicdata"),
 Matching = Table.SelectRows(Source, each Text.StartsWith([Name], "List"))
in
 Matching
\`\`\`
The result has a Name column per exposed entry, so a prefix filter keeps only the group you care about before you pick one to expand.
## Limitations & Tips
- Import only: there is no DirectQuery option, so build a scheduled refresh into the deployment.
- Both parameters are required with no optional extras; a wrong project or organization fails while the connection is being built, not halfway through a refresh.
- Keep project and organization on parameters so queries can be repointed between test and production without editing each one.
- Refresh runs live against CDF, so check row counts after you widen what you pull.`,
  },
  {
    slug: "data-world-get-dataset",
    name: "Data.World - Get Dataset",
    group: "SaaS & Business Apps",
    tagline:
      "Pull a data.world dataset into Power BI, optionally sending a dwSQL query so only matching rows cross the wire.",
    products: ["Power BI"],
    authentication: ["OAuth", "API Token v2"],
    capabilities: ["Import"],
    functions: ["DataWorld.Dataset"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/data-world-get-dataset",
    content: `## When to Use It
data.world hosts datasets published by individuals and organizations, each addressed by the owner and dataset id that appear in its URL. \`DataWorld.Dataset\` returns the dataset's contents as a table, and its optional third argument lets you hand over a dwSQL query that runs against the dataset before anything comes back, which is useful when the dataset is wide and you only need one slice. Import only, and the connector is still in Preview.
## Before You Start
You need a data.world account with access to the dataset. The owner is the user or organization named in the dataset URL; the id is the final URL segment. Two sign-in kinds are offered: OAuth through the browser, or an API Token v2 pasted from your profile. Both required text arguments must match the dataset exactly or the call fails.
The source is a cloud service, so no gateway is involved from a desktop machine. The product list here covers Power BI only, so refresh happens on the service with the credential you stored.
## Connect from the Desktop
In Power BI Desktop, open Get Data, search for Data.World, select Data.World - Get Dataset and Connect. Enter Owner and Dataset Id, and optionally a Query to run first, then sign in with OAuth or your API token. The Navigator shows what the dataset returned; load it or open Transform Data to shape it.
## Recipes in M
### Connect to a dataset
\`\`\`powerquery
let
 Source = DataWorld.Dataset("uscensusbureau", "an-intro-to-dataworld-dataset")
in
 Source
\`\`\`
Owner and id are both required, and the values here mirror the address of a public sample dataset, so swap in the pair from your own dataset's URL.
### Preview before you commit to columns
\`\`\`powerquery
let
 Source = DataWorld.Dataset("uscensusbureau", "an-intro-to-dataworld-dataset"),
 First = Table.FirstN(Source, 50)
in
 First
\`\`\`
Columns in a shared dataset can change without warning, so look at a slice first and only then reference column names in later steps.
### Push the dwSQL query down
\`\`\`powerquery
let
 Source = DataWorld.Dataset("uscensusbureau", "an-intro-to-dataworld-dataset", "SELECT * FROM Tables")
in
 Source
\`\`\`
The optional third parameter is a dwSQL query executed against the dataset, so fewer rows travel over the connection and the shaping starts server-side.
## Limitations & Tips
- Preview status: behavior can shift between releases, so avoid leaning on undocumented quirks.
- Import only, no DirectQuery; schedule refresh on the Power BI service.
- The query parameter is optional. Omit it (or pass null) to pull everything the dataset gives back.
- Whichever sign-in kind you pick on the desktop becomes the credential the service uses at refresh, so choose one the service can renew.`,
  },
  {
    slug: "digital-construction-works-insights",
    name: "Digital Construction Works Insights",
    group: "SaaS & Business Apps",
    tagline:
      "Read OData data sets from a Digital Construction Works Insights project, as a legacy path since the connector is deprecated.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["API key"],
    capabilities: ["Import"],
    functions: ["DCWInsights.Feed"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/digital-construction-works-insights",
    content: `## When to Use It
Digital Construction Works (DCW) runs an Integrations Platform for construction data, and this connector reaches the OData API of one of its projects. The entry function is \`DCWInsights.Feed\`, which takes no arguments and returns a table from the feed you are connected to. Treat it as a legacy route: the connector is marked Deprecated, so new work should weigh the deprecation before building on it.
## Before You Start
Use of the platform requires a DCW Integrations Platform subscription. A project administrator issues you a JSON Web Token (JWT), which is the credential you present at sign-in; the sign-in kind is catalogued as an API key. You also need the OData API URL for your project: it must use https, include the full project URL and product name, and may carry query string parameters. Both Power BI and Power Query Online host this connector.
## Connect from the Desktop
In Power BI Desktop, Get Data and choose Digital Construction Works Insights from the Online Services category. Fill Insights Api Url with your https project URL (including product name and any query string), then OK. On a first connection you are asked for the JWT; after that, Navigator shows the database information to load or transform.
## Connect in Power Query Online
From the Power Query Online get data experience, choose Digital Construction Works Insights and supply the same https API URL as the connection setting. Create a new connection or reuse an existing one, enter the JWT as the credential when prompted, and set the Privacy Level. Pick your gateway only if the endpoint is reachable exclusively from your network; otherwise (none) connects directly, then continue to Choose data.
## Recipes in M
### Connect to the feed
\`\`\`powerquery
let
 Source = DCWInsights.Feed()
in
 Source
\`\`\`
The documented entry point takes no arguments: the URL you typed into the dialog travels with the connection rather than the query, so the same call works anywhere the connection is defined.
### Inspect what came back
\`\`\`powerquery
let
 Source = DCWInsights.Feed(),
 Preview = Table.FirstN(Source, 50)
in
 Preview
\`\`\`
Feeds vary by project, so preview a slice before naming columns downstream; the first rows tell you whether you are looking at the entity you expected.
## Limitations & Tips
- Deprecated: connector behavior and support can be withdrawn, which matters if you are planning a long-lived dataset.
- Import only, so the Power BI service refresh path is scheduled pull, not a live connection.
- The JWT comes from your project administrator, not a self-service portal, so factor credential rotation into whoever owns the refresh.
- Only https endpoints work; a plain http URL prompts you to correct it.`,
  },
  {
    slug: "dynamics-365-business-central",
    name: "Dynamics 365 Business Central",
    group: "SaaS & Business Apps",
    tagline:
      "Connect Power Query to Dynamics 365 Business Central APIs, choosing environment, company, and API route up front.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["Dynamics365BusinessCentral.ApiContentsWithOptions"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/dynamics-365-business-central",
    content: `## When to Use It
Business Central is where the ERP records live (customers, vendors, items, ledger entries), and this connector reaches its APIs so you can model them alongside the rest of your data. The entry function is \`Dynamics365BusinessCentral.ApiContentsWithOptions\`, and all four of its arguments are optional: environment, company, apiRoute, and an options record. It returns a table of Business Central data that you then drill into or shape. Import only.
## Before You Start
You need an account with access to the target Business Central environment and company. The sign-in kind is Microsoft Entra ID (an organizational account), so the tenant administrator controls who can reach what. Every parameter is optional (zero required), which means the dialog can be accepted as-is, but supplying environment and company explicitly makes queries predictable.
Business Central is a cloud service, so no gateway is needed from Desktop or Power Query Online; leave the gateway at (none) unless your organization routes service traffic through one. Available in Power BI and Power Query Online.
## Connect from the Desktop
In Power BI Desktop, Get Data, search for Business Central and Connect. The dialog fields map onto the function arguments: Environment, Company, and API category (or API route), with Advanced Options for the options record. Sign in with your organizational account, then pick tables in the Navigator to load or transform.
## Connect in Power Query Online
Pick Dynamics 365 Business Central in the Power Query Online get data experience and fill the same three fields. Sign in with an organizational account, keep the gateway at (none) for the cloud endpoint, set the Privacy Level, then continue to Choose data and Transform data.
## Recipes in M
### Connect with everything pinned
\`\`\`powerquery
let
 Source = Dynamics365BusinessCentral.ApiContentsWithOptions("Production", "Microsoft", null, null)
in
 Source
\`\`\`
Each position matches the dialog: environment, company, apiRoute, then the options record. Pass null anywhere you do not care about.
### Preview the shape
\`\`\`powerquery
let
 Source = Dynamics365BusinessCentral.ApiContentsWithOptions(null, null, "v2.0", null),
 First = Table.FirstN(Source, 20)
in
 First
\`\`\`
Which columns land depends on the API route you chose, so inspect a few rows before the rest of the model starts referencing names.
### Narrow to one API category
\`\`\`powerquery
let
 Source = Dynamics365BusinessCentral.ApiContentsWithOptions("Production", "Microsoft", "v2.0", null)
in
 Source
\`\`\`
Setting apiRoute scopes what the query walks, keeping the Navigator and the result away from APIs you never intended to refresh.
## Limitations & Tips
- Import only: no DirectQuery against Business Central through this connector, so plan scheduled refresh.
- Zero required parameters hides mistakes: an environment name that does not exist surfaces at refresh time, so test early.
- The fourth argument is an options record for advanced settings; leave it null until you have a documented need for one of its fields.
- Keep environment and company in the query rather than dialog defaults so it reproduces on another machine.`,
  },
  {
    slug: "dynamics-365-business-central-premises",
    name: "Dynamics 365 Business Central (on-premises)",
    group: "SaaS & Business Apps",
    tagline:
      "Pull Business Central on-premises OData into Power BI with a base URL, optional company, and basic credentials.",
    products: ["Power BI"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["Dynamics365BusinessCentralOnPremises.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/dynamics-365-business-central-premises",
    content: `## When to Use It
When Business Central runs on your own servers, the cloud connector is the wrong tool. \`Dynamics365BusinessCentralOnPremises.Contents\` takes the OData URL of the instance (required text) plus an optional company name and returns a table of Business Central data for you to shape. This is the on-premises counterpart of the cloud connector, and it appears in Power BI only.
## Before You Start
You need network reachability to the Business Central server from wherever the query runs, plus credentials for the OData endpoint: the sign-in kind is Basic (username/password). The URL must point at the ODataV4 root of your instance, and the company value, when supplied, should match the company name configured in Business Central. Because the server sits inside your infrastructure, refresh from the Power BI service requires an on-premises data gateway with these credentials configured.
## Connect from the Desktop
In Power BI Desktop, Get Data, search for Business Central (on-premises) and Connect. The dialog asks for the OData URL (required) and an optional Company. Sign in with the Basic credentials for the server, then use the Navigator to pick what to load or transform. If the machine can reach the server directly, no gateway is involved at authoring time.
## Recipes in M
### Connect to the instance
\`\`\`powerquery
let
 Source = Dynamics365BusinessCentralOnPremises.Contents("https://bc.contoso.com/Production/ODataV4/")
in
 Source
\`\`\`
The URL is the required argument and must be the ODataV4 root for the instance; swap the placeholder host above for your own server address.
### Preview before naming columns
\`\`\`powerquery
let
 Source = Dynamics365BusinessCentralOnPremises.Contents("https://bc.contoso.com/Production/ODataV4/"),
 First = Table.FirstN(Source, 25)
in
 First
\`\`\`
OData surfaces depend on how the instance is published, so confirm what came back before other queries start referencing column names.
### Scope to a company
\`\`\`powerquery
let
 Source = Dynamics365BusinessCentralOnPremises.Contents("https://bc.contoso.com/Production/ODataV4/", "Microsoft")
in
 Source
\`\`\`
The second argument filters to a single company at the source instead of pulling every company and splitting them apart in Power Query.
## Limitations & Tips
- Import only; there is no DirectQuery option against on-premises Business Central here.
- The URL is the one required parameter and it is strict: wrong path or non-ODataV4 endpoint, no data. The company name is optional but must match exactly when used.
- Gateway matters: authoring on your desktop can work with no gateway while service refresh fails without one. Configure the gateway and stored Basic credentials before publishing.
- Basic credentials are tied to an account on the server, so pick one whose permissions match the data you intend to refresh.`,
  },
  {
    slug: "dynamics-365-customer-insights",
    name: "Dynamics 365 Customer Insights",
    group: "SaaS & Business Apps",
    tagline:
      "Bring Dynamics 365 Customer Insights data into Power BI through an organizational sign-in, while the connector is in Preview.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["CustomerInsights.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/dynamics-365-customer-insights",
    content: `## When to Use It
Customer Insights holds your customer data in the cloud, and this connector is the path from Power Query into that instance. The entry function, \`CustomerInsights.Contents\`, accepts a single optional options record and returns a table you can drill into or shape like any other source. Import only, and the connector is in Preview, so treat behavior as not final.
## Before You Start
You need a Microsoft Entra ID account with access to the Customer Insights instance you are targeting; the sign-in kind is Microsoft Entra ID, and access is governed by what your tenant grants on that instance. There are zero required parameters, so the connection dialog can be accepted without filling anything in.
Customer Insights is a cloud service: Desktop and Power Query Online reach it directly with no gateway under normal circumstances. If your organization mandates one, the Power Query Online dialog offers the gateway dropdown; leave it at (none) for a direct connection. Hosted in both Power BI and Power Query Online.
## Connect from the Desktop
In Power BI Desktop, open Get Data, search for Customer Insights and Connect. The dialog offers no required fields; sign in with your organizational account when prompted. Navigator then lists what the instance exposes; load an item or select Transform Data to shape it in the editor.
## Connect in Power Query Online
Choose Dynamics 365 Customer Insights in the Power Query Online get data experience. Leave the optional settings at their defaults unless you have a reason not to, pick a new or existing connection, sign in with an organizational account, and keep the gateway at (none) for the cloud endpoint. Set the Privacy Level, then continue to Choose data and Transform data.
## Recipes in M
### Connect with defaults
\`\`\`powerquery
let
 Source = CustomerInsights.Contents()
in
 Source
\`\`\`
No argument is required, so an empty call is a complete query; the sign-in you completed on the connection does the rest.
### Inspect the returned shape
\`\`\`powerquery
let
 Source = CustomerInsights.Contents(),
 Names = Table.ColumnNames(Source)
in
 Names
\`\`\`
Preview connectors change what they return between releases, so read the column list first and write downstream steps against names you have actually seen.
## Limitations & Tips
- Preview status: expect shape or behavior changes, and re-test after any Power BI update.
- Import only, so refresh is a scheduled pull on the Power BI service using your Entra credential.
- The options record is the only knob exposed here; pass nothing (or null) until you know which fields it accepts.
- If a query suddenly fails after an update, check the column names you hard-coded first, since the Preview surface is the most likely thing to have moved.`,
  },
  {
    slug: "dynamics-nav",
    name: "Dynamics NAV",
    group: "SaaS & Business Apps",
    tagline:
      "Connect Power BI to a Dynamics NAV instance over OData with a URL, an optional company, and basic credentials.",
    products: ["Power BI"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["DynamicsNav.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/dynamics-nav",
    content: `## When to Use It
Dynamics NAV on your own network exposes its data through OData, and \`DynamicsNav.Contents\` reads that feed. The required argument is the OData URL of the instance; the optional second argument is the company to scope to. Either way you get back a table of NAV data to shape into your model. This connector is listed for Power BI only.
## Before You Start
You need a Dynamics NAV server with the OData endpoint published and credentials the endpoint accepts: the sign-in kind is Basic (username/password). The URL must address the ODataV4 root for the instance, and the optional company value should match the name configured in NAV. Because the server lives on your own infrastructure, any refresh from the Power BI service has to travel through an on-premises data gateway that holds these credentials.
## Connect from the Desktop
In Power BI Desktop, Get Data, search for Dynamics NAV and Connect. Enter the OData URL in the required field and, if you want a single company, the optional Company field. Sign in with the Basic credentials, then use the Navigator to load or transform the entities the feed exposes.
## Recipes in M
### Connect to the feed
\`\`\`powerquery
let
 Source = DynamicsNav.Contents("https://nav.contoso.com/Production/ODataV4/")
in
 Source
\`\`\`
Only the URL is required; point it at the ODataV4 root of your instance and replace the placeholder host with your own server address.
### Check what the feed exposes
\`\`\`powerquery
let
 Source = DynamicsNav.Contents("https://nav.contoso.com/Production/ODataV4/"),
 Columns = Table.ColumnNames(Source)
in
 Columns
\`\`\`
Reading the column list before you commit tells you whether the connection landed on entities or a navigation layer, which decides how the next step should be written.
### Filter to one company
\`\`\`powerquery
let
 Source = DynamicsNav.Contents("https://nav.contoso.com/Production/ODataV4/", "Microsoft")
in
 Source
\`\`\`
Supplying the company hands the scope to the source so the query does not return rows for every company on the instance.
## Limitations & Tips
- Import only; there is no DirectQuery path to NAV through this connector.
- The URL is unforgiving: it has to be the ODataV4 root, and a mistyped path fails when the query runs.
- The company argument is optional but exact; a name that does not match the instance changes what comes back rather than raising a friendly error.
- Gateway coverage is the usual production gap: authoring locally can succeed while service refresh fails until the gateway and Basic credentials are configured.`,
  },
  {
    slug: "dynatrace-grail-dql",
    name: "Dynatrace Grail",
    group: "SaaS & Business Apps",
    tagline:
      "Query a Dynatrace Grail environment from Power BI using DQL, either per record type or with your own query.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["DynatraceGrail.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/dynatrace-grail-dql",
    content: `## When to Use It
Dynatrace Grail is the data lakehouse behind a Dynatrace environment, and this connector runs DQL queries against it. \`DynatraceGrail.Contents\` takes the environment URL (required), an optional DQL query, and an options record for query limits, returning a table. Without a query you get the record types to browse; selecting one runs its default query, or you supply your own DQL. Import only.
## Before You Start
You need a Dynatrace environment with Grail enabled on the current Dynatrace version, not the classic one, plus permission to run queries on it. The sign-in kind is OAuth; sign in with your organizational account when prompted. The connector appears in Power BI and Power Query Online, and as a cloud service it needs no gateway.
## Connect from the Desktop
In Power BI Desktop, Get Data and select Dynatrace Grail DQL. Enter your environment URL; the Custom DQL Query field is optional and is where a query beyond the built-in selections belongs. Open Advanced options to set query limits, sign in through the browser window that appears, and Connect. Navigator lists the Grail record types.
## Connect in Power Query Online
Pick Dynatrace Grail DQL in the Power Query Online get data experience, enter the environment URL, and optionally the DQL query plus Advanced options. Sign in with an organizational account, then Next. The Choose data page lists the record types; selecting one issues its default query (a logs fetch with a 1000-row limit, for example), and you need environment permissions. Transform data to shape the result.
## Recipes in M
### Connect to the environment
\`\`\`powerquery
let
 Source = DynatraceGrail.Contents("https://123environment.apps.dynatrace.com")
in
 Source
\`\`\`
The environment URL is the only required value; the connection's sign-in supplies authorization.
### Run your own DQL
\`\`\`powerquery
let
 Source = DynatraceGrail.Contents("https://123environment.apps.dynatrace.com", "fetch bizevents | limit 10")
in
 Source
\`\`\`
The second parameter is a custom DQL query, so the shaping happens inside Grail and only the matching rows return. Keep an explicit limit in the query while you explore.
### Drill into a record type
\`\`\`powerquery
let
 Source = DynatraceGrail.Contents("https://123environment.apps.dynatrace.com"),
 Bizevents = Source{[Name = "bizevents"]}[Data]
in
 Bizevents
\`\`\`
When no query is passed, the result behaves like a navigation table keyed by record type, so drilling by Name pins the type regardless of Navigator sort order.
## Limitations & Tips
- Import only, and a custom DQL query is capped at one million rows, so aggregate or limit inside DQL rather than after.
- Advanced options expose read data, record, and result size limits plus sampling; use them to stop a wide query dragging more than the model needs.
- Selecting a record type in Navigator runs a default fetch with a 1000-row limit; a custom query is the way past that.
- Queries execute with your permissions on the environment, so a query that works on your desktop can fail for a service refresh running as a different identity.`,
  },
  {
    slug: "eduframe",
    name: "Eduframe Reporting",
    group: "SaaS & Business Apps",
    tagline:
      "Report on Eduframe data from Power BI once your account has the reporting integration enabled.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Access Token Eduframe Login"],
    capabilities: ["Import"],
    functions: ["EduFrame.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/eduframe",
    content: `## When to Use It
Eduframe is the platform behind your organization's Eduframe address, and this connector reads its reporting data into Power Query. \`EduFrame.Contents\` takes one required argument, the domain slug from your Eduframe URL (the part before .eduframe.nl), and returns a table to shape. The connector is in Preview and available in both Power BI and Power Query Online.
## Before You Start
Two things must happen before the first sign-in: you need an Eduframe Admin account (username and password), and the Eduframe Reporting integration has to be enabled for your account, which the Eduframe support team does on request. The sign-in kind is the Eduframe access token flow that follows when you choose Sign in. Bring the domain slug; the connector does not guess it.
Eduframe is a cloud service, so no gateway is required from Desktop or Power Query Online. Note that the API behind it throttles, which shapes how often you should refresh (see the tips).
## Connect from the Desktop
In Power BI Desktop, Get Data and choose Online Services on the left, select Eduframe (Beta) and Connect. A preview connector notice appears on first use; dismiss it if you do not want to see it again. Enter the Eduframe domain (the URL without .eduframe.nl), then sign in with your Eduframe account and approve the integration. Navigator then shows the data to load or transform.
## Connect in Power Query Online
Choose Eduframe (Beta) on the Power Query Connect to data source page. Enter your Eduframe domain, which is the organization name without .eduframe.nl, select the authentication method and sign in. On the Choose data page, tick the data you require and select Transform data to open the editor.
## Recipes in M
### Connect with your domain slug
\`\`\`powerquery
let
 Source = EduFrame.Contents("drieam-opleidingen")
in
 Source
\`\`\`
The single argument is the slug from your own Eduframe address, everything before .eduframe.nl; swap in yours rather than the sample.
### Preview before shaping
\`\`\`powerquery
let
 Source = EduFrame.Contents("drieam-opleidingen"),
 First = Table.FirstN(Source, 50)
in
 First
\`\`\`
A quick slice shows what the reporting feed actually returns, so you only reference column names you have confirmed.
## Limitations & Tips
- Preview connector: the Beta label in Get Data and changes between releases are both expected.
- Throttling is real: the API allows 100 calls per 60 seconds, so avoid refresh cycles that fan out into many separate queries against the same account.
- One required parameter, no optional ones, and the domain must belong to an account where the reporting integration is switched on.
- Import only; schedule refreshes at a cadence that respects the throttle rather than the fastest interval the service allows.`,
  },
  {
    slug: "emigo-data-source",
    name: "Emigo Data Source",
    group: "SaaS & Business Apps",
    tagline:
      "Query an Emigo data source with optional restrictions that trim what comes back before it reaches your model.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["Emigo.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/emigo-data-source",
    content: `## When to Use It
Emigo is the source behind this connector, and \`Emigo.Contents\` returns its data as a table. Every parameter is optional: a restriction type, a restriction value, a restriction mode, and an authorization mode, which together let you narrow what the connector retrieves instead of pulling everything and filtering locally. Import only, hosted in Power BI and Power Query Online.
## Before You Start
You need credentials for the Emigo system; the sign-in kind is Basic (username/password). No parameter is required (zero required count), so an empty call is valid, but you should understand what the four optional text arguments do before you rely on them: the restriction type and value pair defines which slice is requested, the restriction mode controls how strictly that restriction is applied (Exact means only the selected restriction comes back), and the authorization mode overrides the default one for your user when supplied.
Emigo runs as a service, so Desktop and Power Query Online reach it directly with no gateway unless your organization routes cloud traffic through one.
## Connect from the Desktop
In Power BI Desktop, Get Data, search for Emigo and select Emigo Data Source, then Connect. The dialog shows the optional fields: Restriction type for data, the restriction value, Restriction mode, and Authorization Mode. Leave any you do not need blank, sign in with your Basic credentials, then load or transform from the Navigator.
## Connect in Power Query Online
Pick Emigo Data Source in the Power Query Online get data experience, fill the same optional restriction and authorization fields, and create or reuse a connection under Connection credentials. Sign in with the Basic credentials, keep the gateway at (none) for the cloud service, set the Privacy Level, then continue to Choose data and Transform data.
## Recipes in M
### Connect with everything defaulted
\`\`\`powerquery
let
 Source = Emigo.Contents()
in
 Source
\`\`\`
All four arguments are optional, so an empty call is a complete query and the user's default authorization mode applies.
### Preview the result
\`\`\`powerquery
let
 Source = Emigo.Contents(),
 First = Table.FirstN(Source, 40)
in
 First
\`\`\`
Look at a sample of rows first; that tells you whether the default view is already narrow enough or whether a restriction is worth setting.
## Limitations & Tips
- Import only: no DirectQuery option, so build refresh into the plan.
- Zero required parameters makes the dialog easy to accept, but skipping the restrictions means the widest possible pull, which is slower to refresh and heavier on the source.
- The restriction arguments are positional in M, so a value for the mode means passing nulls in the slots before it; get the order right rather than guessing.
- Basic credentials belong to a specific user account; the authorization mode argument only changes behavior when it is actually supplied.`,
  },
  {
    slug: "entersoft-business-suite",
    name: "Entersoft Business Suite",
    group: "SaaS & Business Apps",
    tagline:
      "Connect Power BI to an Entersoft Business Suite account and pull its data through a zero-argument entry point.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Authenticate"],
    capabilities: ["Import"],
    functions: ["EntersoftBusinessSuite.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/entersoft-business-suite",
    content: `## When to Use It
Entersoft Business Suite is the business system this connector reaches, and \`EntersoftBusinessSuite.Contents\` is the whole surface: it takes no arguments and returns a table for you to shape. The connection itself carries the account context, so the query stays short. Import only, and the connector is in Preview. It appears in both Power BI and Power Query Online.
## Before You Start
You need an Entersoft Business Suite account the connector can sign in to; the sign-in kind is the connector's own Authenticate step, presented when the connection is created. Because the entry function has no parameters, there is nothing to configure beyond credentials, which also means the connection you build is the one every query shares.
Entersoft is reached as a service, so Desktop and Power Query Online connect directly in the normal case, with no gateway required. If your organization forces cloud traffic through a gateway, the Power Query Online dialog exposes that choice; leave it at (none) for a direct connection.
## Connect from the Desktop
In Power BI Desktop, open Get Data, search for Entersoft Business Suite and Connect. The dialog has no data fields; run the Authenticate sign-in and confirm. Navigator then lists what the account can see; pick an item to preview it or go to Transform Data to shape it there.
## Connect in Power Query Online
Choose Entersoft Business Suite in the Power Query Online get data experience. There are no connection settings to fill, only credentials: create a new connection or reuse an existing one, run the sign-in, set the Privacy Level, and leave the gateway at (none) unless you have a specific reason to route through it. Continue to Choose data and Transform data.
## Recipes in M
### Connect
\`\`\`powerquery
let
 Source = EntersoftBusinessSuite.Contents()
in
 Source
\`\`\`
The entry point takes no arguments; everything the query needs lives on the connection, so this three-line query is complete.
### Inspect before shaping
\`\`\`powerquery
let
 Source = EntersoftBusinessSuite.Contents(),
 Names = Table.ColumnNames(Source)
in
 Names
\`\`\`
Read the column list as a first step so the rest of your model references names the connector actually returned.
## Limitations & Tips
- Preview status: the connector's behavior is not final, and the Authenticate flow may change between releases.
- Import only, so refresh on the Power BI service uses the credential stored on the connection.
- With no parameters, all your leverage comes from connection settings and what happens after the source returns; there is no way to push a filter into the call itself.
- Because every query shares one connection, a credential expiry breaks all of them at once, so know who owns that account.`,
  },
  {
    slug: "equis",
    name: "EQuIS",
    group: "SaaS & Business Apps",
    tagline:
      "Read data sets and grid reports from an EQuIS Enterprise site into Power BI with three sign-in choices.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID", "Basic (username/password)", "API Token"],
    capabilities: ["Import"],
    functions: ["EQuIS.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/equis",
    content: `## When to Use It
EQuIS Enterprise hosts environmental and operational data sets, and \`EQuIS.Contents\` opens one: its single required argument is the site URL, and what comes back is a table you drill into or shape. The Navigator exposes the data sets and reports your account can reach. Import only, hosted in Power BI and Power Query Online.
## Before You Start
You need a valid user account on an EQuIS Enterprise site whose REST API is licensed, and that account must be a member of the REST API role (check the Roles tab of your user profile). Three sign-in kinds are offered: Basic (username/password), an API Token generated from your EQuIS Enterprise user profile, or Microsoft Entra ID organizational account if the site is configured for it. The connector is a cloud-facing web call, so no gateway is needed when the site is publicly reachable; a site behind your network would need one in Power Query Online.
## Connect from the Desktop
In Power BI Desktop, Get Data, select EQuIS from the connector list and Connect. Enter the EQuIS Enterprise site URL (for example the address you use in a browser), then OK. Choose Basic, API Token, or Organizational Account at the sign-in prompt. Navigator shows the available data sets and reports; load one or select Transform Data. Only grid reports appear in the Navigator.
## Connect in Power Query Online
Pick EQuIS in the Power Query Online get data experience and enter the Enterprise site URL as the connection setting. Under Connection credentials, choose the sign-in kind your site supports, create or reuse the connection, sign in, and set the gateway if the site is only reachable from your network, otherwise (none). Set the Privacy Level, then continue to Choose data and Transform data.
## Recipes in M
### Connect to the site
\`\`\`powerquery
let
 Source = EQuIS.Contents("https://mysite.equisonline.com")
in
 Source
\`\`\`
The only required argument is the base URL of your Enterprise site; replace the sample host with the address your account logs into.
### Drill into a data set by name
\`\`\`powerquery
let
 Source = EQuIS.Contents("https://mysite.equisonline.com"),
 Chosen = Source{[Name = "Results summary"]}[Data]
in
 Chosen
\`\`\`
The navigation lists items by the exact name shown in the Navigator, so pinning by Name keeps your query stable no matter how the list is sorted.
## Limitations & Tips
- Import only, and each data set is fetched in a single API request, so very large data sets land in one gulp; keep selections tight.
- Column names arrive in camelCase, which is worth knowing before you write reference steps against them.
- Only grid reports show up in the Navigator, and non-administrator users need permission to every facility behind a facility group report.
- Three sign-in kinds give you flexibility, but pick one the Power BI service can use at refresh; a token pasted on your desktop does not automatically work on the service.`,
  },
  {
    slug: "eway-crm",
    name: "eWay-CRM",
    group: "SaaS & Business Apps",
    tagline:
      "Load eWay-CRM records into Power BI through your eWay-CRM login, with an options record for advanced settings.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["eWay-CRM Login"],
    capabilities: ["Import"],
    functions: ["eWayCRM.Contents2"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/eway-crm",
    content: `## When to Use It
eWay-CRM stores the CRM data this connector exposes, and \`eWayCRM.Contents2\` is the entry point: one optional options record in, a table out, which you then drill into or shape. The connection carries your eWay-CRM identity, so the query itself stays minimal. Import only, generally available, and listed for both Power BI and Power Query Online.
## Before You Start
You need an eWay-CRM account the connector can authenticate against; the sign-in kind is the eWay-CRM Login flow presented when the connection is created. The entry function has zero required parameters, so nothing has to be typed into the query, but the credential has to exist before any query will run.
eWay-CRM is a cloud service, so Desktop and Power Query Online reach it directly with no gateway under normal circumstances. If your organization mandates one, the Power Query Online dialog offers the gateway dropdown; keep it at (none) for a direct connection. Privacy Level is set alongside the credentials.
## Connect from the Desktop
In Power BI Desktop, open Get Data, search for eWay-CRM and Connect. The dialog presents Advanced options (the optional options record) and a sign-in; run the eWay-CRM login and confirm. Navigator lists what your account can read; preview an item or go straight to Transform Data.
## Connect in Power Query Online
Choose eWay-CRM in the Power Query Online get data experience. Leave Advanced options alone unless you need them, create a new connection or reuse an existing one, and run the eWay-CRM sign-in. Keep the gateway at (none) for the cloud source, set the Privacy Level, then continue to Choose data and Transform data.
## Recipes in M
### Connect with defaults
\`\`\`powerquery
let
 Source = eWayCRM.Contents2()
in
 Source
\`\`\`
The options record is optional, so an empty call is a normal, complete query.
### Look at what you got
\`\`\`powerquery
let
 Source = eWayCRM.Contents2(),
 First = Table.FirstN(Source, 30)
in
 First
\`\`\`
Confirm the returned shape with a small preview before later steps start depending on specific column names.
## Limitations & Tips
- Import only, so refresh on the service is a scheduled pull using the stored eWay-CRM credential.
- Zero required parameters means there is nowhere to push a filter down; narrowing happens after the source responds.
- The second slot accepts an options record for advanced settings, but passing null (or nothing) is the well-trodden path.
- One shared connection backs every query against it, so a changed password or expired session will fail them all at refresh time.`,
  },
];

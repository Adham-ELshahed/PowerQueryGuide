import type { ConnectorGuide } from "../connector-guides";

/**
 * Practical guides for the SaaS & Business Apps group — added by the Microsoft connectors
 * index expansion. Content is original (data-engineer voice), generated from
 * the connector audit facts under Temp/opencode/guides-src.
 */
export const saasNewGuides3: ConnectorGuide[] = [
  {
    slug: "smartsheet",
    name: "Smartsheet",
    group: "SaaS & Business Apps",
    tagline:
      "Browse every Smartsheet sheet, report, folder, and workspace your account can reach, with the US or EU region picked up front.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["SmartsheetGlobal.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/smartsheet",
    content: `## When to Use It
Smartsheet spreads work across sheets, reports, folders, and workspaces, and the connector hands them all back as a nested table. \`SmartsheetGlobal.Contents(region, optional options)\` is the entry point: the top level lists the containers your account can read, and each row's \`Data\` drills one level deeper until you reach a sheet's actual rows. It's the right pick when you want spreadsheet-shaped collaboration data alongside the rest of your model.
## Before You Start
You need a Smartsheet account. Sign-in is OAuth: a Smartsheet window opens, you pick your method, and you Allow the connector access on first use. The \`region\` parameter is required and accepts \`US\` or \`EU\` — match it to where your account lives (app.smartsheet.com versus app.smartsheet.eu). Import is the only capability; Power BI and Power Query Online are both supported. The source is cloud-hosted, so no gateway is involved.
## Connect from the Desktop
Get Data from the Home ribbon in Power BI Desktop, search \`Smartsheet\`, select it, and Connect. Choose the region. On first use a third-party notice appears — Continue past it. Select Sign in, complete the OAuth prompt and the Allow step, then Connect. Navigator shows the nested table; expand, tick, and Load or Transform data.
## Connect in Power Query Online
Pick Smartsheet on the "Connect to data source" page, select your Region (US or EU), sign in and allow access, then select Next. On Choose data, select the sheets, folders, or workspaces you want and continue to the editor with Transform data.
## Recipes in M
### Connect to the US region
\`\`\`powerquery
let
 Source = SmartsheetGlobal.Contents("US")
in
 Source
\`\`\`
\`region\` is required and only \`US\` or \`EU\` are valid — pass the one that hosts your account and leave \`options\` off unless you need it.
### Drill through the nesting to a sheet
\`\`\`powerquery
let
 Source = SmartsheetGlobal.Contents("US"),
 Workspace = Source{[Name = "Marketing Ops"]}[Data],
 Sheet = Workspace{[Name = "Campaign Calendar"]}[Data]
in
 Sheet
\`\`\`
Folders and workspaces nest, so repeat the \`{[Name = "..."]}[Data]\` drill per level rather than depending on how Navigator happens to expand things.
### Trim the sheet to the columns you model
\`\`\`powerquery
let
 Source = SmartsheetGlobal.Contents("US"),
 Workspace = Source{[Name = "Marketing Ops"]}[Data],
 Sheet = Workspace{[Name = "Campaign Calendar"]}[Data],
 Trimmed = Table.SelectColumns(Sheet, {"Task", "Owner", "Due Date"})
in
 Trimmed
\`\`\`
Sheets accumulate stray columns over time; selecting the three you report on keeps refreshes small and the schema predictable.
## Limitations & Tips
Import only — no DirectQuery. The region argument is mandatory, and signing in against the wrong region wastes a round trip, so check the URL your account opens in first. Because the table is nested, a high-level drill pulls everything beneath that node; go deep, then filter. \`options\` is optional and nullable — most queries never touch it.`,
  },
  {
    slug: "solarwinds-service-desk",
    name: "SolarWinds Service Desk",
    group: "SaaS & Business Apps",
    tagline:
      "Import SolarWinds Service Desk records by their updated date, with date-range parameters built for incremental refresh.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["JSON Web Token"],
    capabilities: ["Import"],
    functions: ["SolarWindsServiceDesk.ContentsV113"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/solarwinds-service-desk",
    content: `## When to Use It
SolarWinds Service Desk holds the service records your support org works on. The connector's entry function reads records by their \`updated_at\` value, so each refresh picks up new rows and edits inside the range you set — which is exactly what incremental refresh wants. \`SolarWindsServiceDesk.ContentsV113()\` accepts an optional \`RangeStart\`, \`RangeEnd\`, and \`CustomFieldsStr\`, and returns a table of records you then filter or group.
## Before You Start
You need a SolarWinds Service Desk user with Token authentication set up for API integration — sign-in is with that JSON Web Token, pasted into the credential prompt. On an ESM account the token must be generated by a Service Provider Administrator. The connector supports Import and runs in Power BI and Power Query Online; as a cloud SaaS source there's no gateway, credentials live with the data source.
## Connect from the Desktop
Home > Get Data in Power BI Desktop, choose SolarWinds Service Desk, and Connect. Paste the JSON web token you generated and let the connector verify access. In Navigator, tick the tables you want and Load — a fresh connection lands on roughly the last month of records, then widen the range as needed.
## Connect in Power Query Online
Select SolarWinds Service Desk on the "Connect to data source" page, paste the same token to sign in, and select Next. Choose the tables on the data page and continue to Transform data.
## Recipes in M
### Connect with the default window
\`\`\`powerquery
let
 Source = SolarWindsServiceDesk.ContentsV113()
in
 Source
\`\`\`
All three parameters are optional, so an empty call returns the default slice of records — useful for checking credentials before wiring up ranges.
### Pass a range for incremental refresh
\`\`\`powerquery
let
 Source = SolarWindsServiceDesk.ContentsV113(
 RangeStart = #datetime(2026, 1, 1, 0, 0, 0),
 RangeEnd = #datetime(2026, 11, 1, 0, 0, 0)
 )
in
 Source
\`\`\`
Pair \`RangeStart\` and \`RangeEnd\` with Power BI incremental refresh: the service re-evaluates them per partition, so each refresh only reads the changed window instead of the whole history.
### Filter on updated_at after loading
\`\`\`powerquery
let
 Source = SolarWindsServiceDesk.ContentsV113(),
 Recent = Table.SelectRows(Source, each [updated_at] >= DateTime.AddMonths(DateTime.LocalNow(), -3))
in
 Recent
\`\`\`
When you're not using parameterized ranges, filtering on \`updated_at\` yourself keeps the imported volume honest.
## Limitations & Tips
Without incremental refresh, a pull spanning more than one year limits each user to one refresh every 24 hours. The imported field set is fixed — extra fields require a feature request upstream. Credential errors in Navigator usually mean stale permissions: File > Data source settings, clear permissions for the source, and reconnect. Import only, no DirectQuery; general availability.`,
  },
  {
    slug: "sparkpost",
    name: "SparkPost",
    group: "SaaS & Business Apps",
    tagline:
      "Aggregate SparkPost activity over a rolling window of days into a Power BI navigation table.",
    products: ["Power BI"],
    authentication: ["API key"],
    capabilities: ["Import"],
    functions: ["SparkPost.NavTable"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/sparkpost",
    content: `## When to Use It
SparkPost's datasets are all defined over a window of days, which is exactly what \`SparkPost.NavTable(DaysToAggregate)\` asks for: one required number — how many days of data to aggregate — and it returns a navigation table over that window, one row per dataset you can drill into. Use it when you want a time-boxed slice of SparkPost activity in a report without hand-building queries against the API.
## Before You Start
You need a SparkPost account and an API key; the connector authenticates with that key. It's marked Preview, supports Import only, and is offered for Power BI — there's no Power Query Online entry, so this connector doesn't go into dataflows. SparkPost is a cloud service, so no gateway is required for the Power BI service either.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, search \`SparkPost\`, and Connect. Enter your API key when prompted. The dialog asks for the number of days worth of data to aggregate — the documented sample is 5 — then Navigator shows the navigation table; tick what you want and Load or Transform data.
## Recipes in M
### Ask for the last five days
\`\`\`powerquery
let
 Source = SparkPost.NavTable(5)
in
 Source
\`\`\`
\`DaysToAggregate\` is required and numeric; 5 mirrors the sample value and gives a quick look at recent activity before you commit to a bigger window.
### Drill into a dataset from the navigation table
\`\`\`powerquery
let
 Source = SparkPost.NavTable(7),
 Summary = Source{[Name = "Summary"]}[Data]
in
 Summary
\`\`\`
The \`Name\` value identifies the row directly, so the drill survives changes in how the navigation table sorts.
### Widen the window for a trend view
\`\`\`powerquery
let
 Source = SparkPost.NavTable(30),
 Recent = Table.SelectRows(Source, each [Date] >= Date.AddDays(Date.From(DateTime.LocalNow()), -14))
in
 Recent
\`\`\`
Pull a month but keep a fortnight: fetching a wider aggregation gives the navigation table room to breathe while the row filter keeps the model lean.
## Limitations & Tips
The connector is in Preview — expect behavior to change and validate refreshes after upgrading. Import only, so refresh cost scales with \`DaysToAggregate\`: a larger number means a heavier pull, which is why the parameter exists rather than a fixed default. The API key is the credential, so rotating it means updating data source settings. Power BI only — no Excel or Power Query Online path for this connector.`,
  },
  {
    slug: "sumtotal",
    name: "SumTotal",
    group: "SaaS & Business Apps",
    tagline:
      "Query your SumTotal hosted OData entities and append a RowVersionId to pull changed rows incrementally.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["SumTotal"],
    capabilities: ["Import"],
    functions: ["SumTotal.ODataFeed"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/sumtotal",
    content: `## When to Use It
SumTotal's external OData API exposes the tables behind your hosted environment, and \`SumTotal.ODataFeed(url)\` connects straight to it. The function takes one required \`url\` — your customer environment root — and returns the list of supported OData entities for Navigator to pick from. It's the pick when you're building a warehouse-style model on SumTotal data and want multiple entities from one connection.
## Before You Start
You need a SumTotal hosted environment with standard portal permissions plus read permission on the tables you'll pull. Copy the hosted root URL in full — it looks like \`https:// .sumtotal.host/\` and nothing beyond that. Sign-in uses the SumTotal credential kind the connector offers; the first connection prompts for it. Import is supported, multiple OData endpoints can be queried, and the cloud source needs no gateway in Power BI or Power Query Online.
## Connect from the Desktop
Home > Get Data, then Other > SumTotal, and Connect. Enter the server URL. A script error prompt appears — it's the login form's JS/CSS loading, so select Yes. Sign in on first use. Navigator lists the OData API entities the connector supports; tick one or more, then Load or Transform data.
## Connect in Power Query Online
Choose SumTotal on the source page, enter your environment URL, sign in, and select Next. Pick the entities you need and continue to Transform data.
## Recipes in M
### Connect to the environment root
\`\`\`powerquery
let
 Source = SumTotal.ODataFeed("https://contoso.sumtotal.host/")
in
 Source
\`\`\`
Pass the hosted root only — the connector appends what it needs, so a full OData path here is one step too far.
### Drill into one entity
\`\`\`powerquery
let
 Source = SumTotal.ODataFeed("https://contoso.sumtotal.host/"),
 Learners = Source{[Name = "Learners"]}[Data]
in
 Learners
\`\`\`
The entity list in Navigator maps to navigation rows, so drilling by \`Name\` targets the entity without depending on list order.
### Filter by RowVersionId for incremental pulls
\`\`\`powerquery
let
 Source = SumTotal.ODataFeed("https://contoso.sumtotal.host/?RowVersionId=810016899151691776")
in
 Source
\`\`\`
The \`RowVersionId\` rides along as a query string on the URL, letting you fetch rows changed since a version instead of rescanning tables.
## Limitations & Tips
Default retrieval runs at roughly 1000 rows per second as a guideline — if that's too slow, use the RowVersionId filter. SumTotal's own OData performance and throttling limits apply to this connector as well. The entity list is limited to what the connector supports, so check Navigator before promising a table in your model. Import only; available in Power BI and Power Query Online.`,
  },
  {
    slug: "supermetrics",
    name: "Supermetrics",
    group: "SaaS & Business Apps",
    tagline:
      "Load every query you've saved in the Supermetrics Hub into Power BI without rebuilding its metrics in M.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["Supermetrics.Render"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/supermetrics",
    content: `## When to Use It
Supermetrics pulls marketing and analytics platform data into the Supermetrics Hub, where you define queries — source, accounts, date range, metrics, breakdown. The Power Query connector picks up the output: \`Supermetrics.Render()\` takes no arguments and returns a table of the queries you've saved, organized in folders by data source, each row ready to drill into its records. Use it when the query logic already lives in the Hub and Power BI only needs the result.
## Before You Start
Create a Supermetrics Hub account and save at least one query: pick a data source, sign in to it, choose accounts, a flexible date range, metrics, and a breakdown, then Run and Save. Sign-in to the connector is OAuth via SSO — the same Microsoft or Google account you used in the Hub. Import is supported; the source is cloud-hosted so no gateway is needed, and the connector appears in Power BI and Power Query Online.
## Connect from the Desktop
Home > Get Data, search \`Supermetrics\`, Connect. A third-party notice appears on first use — Continue. Sign in with Microsoft or Google SSO, then Continue and Connect. Navigator loads your saved queries in folders grouped by data source; tick the ones you need and load them.
## Connect in Power Query Online
Select Supermetrics on the source page, sign in with the same SSO account, and select Next. On Choose data, tick the queries you want and Transform data to refine them in the editor.
## Recipes in M
### Connect to the saved queries
\`\`\`powerquery
let
 Source = Supermetrics.Render()
in
 Source
\`\`\`
No parameters — the rows you get back are exactly the queries saved in the signed-in Hub account.
### Drill through folder to a query
\`\`\`powerquery
let
 Source = Supermetrics.Render(),
 Folder = Source{[Name = "Google Ads"]}[Data],
 Query = Folder{[Name = "Paid search last 2 months"]}[Data]
in
 Query
\`\`\`
Folders group queries by data source, so a two-step drill reaches the query itself rather than the folder wrapper.
## Limitations & Tips
Queries are created and managed in the Hub's Query Manager — you can't define new ones from M; edit them upstream and the connector picks up the change. Polling for query results times out at 30 minutes, so heavy queries belong in the Hub schedule, not a last-minute refresh. If a query errors with an expired authentication, the connection to its data source has lapsed: reconnect it in the Hub. Import only; general availability; available in Power BI and Power Query Online.`,
  },
  {
    slug: "surveymonkey",
    name: "SurveyMonkey",
    group: "SaaS & Business Apps",
    tagline:
      "Land SurveyMonkey survey results in Power BI and drill straight into one survey's response data.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Access Token"],
    capabilities: ["Import"],
    functions: ["SurveyMonkey.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/surveymonkey",
    content: `## When to Use It
SurveyMonkey holds the questions you asked and the answers people gave. \`SurveyMonkey.Contents()\` takes no parameters and returns a navigation table of the surveys your credentials can read — one row per survey, each with a \`Data\` payload holding the responses. It's the right pick when you want response-level analysis (segments, trends, open-text themes) joined against the rest of your model rather than exported CSVs.
## Before You Start
You need a SurveyMonkey account and an access token; authentication kind is Access Token, so generate one and paste it when Power Query prompts. The connector supports Import and runs in Power BI and Power Query Online. The service is hosted, so no gateway applies — in the Power BI service the source registers as online and the token is stored with the data source.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, search \`SurveyMonkey\`, and Connect. Supply the access token at the credential prompt. Navigator lists the surveys behind \`SurveyMonkey.Contents()\`; tick the ones you need, then Load or Transform data.
## Connect in Power Query Online
Pick SurveyMonkey on the "Connect to data source" page, enter the access token, and select Next. On the Choose data page, select the surveys you want and Transform data to shape them in the editor.
## Recipes in M
### Connect with no arguments
\`\`\`powerquery
let
 Source = SurveyMonkey.Contents()
in
 Source
\`\`\`
The function needs nothing but a stored token — the surveys listed are the ones that token's owner can see.
### Open one survey's responses
\`\`\`powerquery
let
 Source = SurveyMonkey.Contents(),
 Survey = Source{[Name = "Customer Satisfaction Q3"]}[Data]
in
 Survey
\`\`\`
Drilling by the survey's \`Name\` makes the query read like a reference to that survey, and keeps working if the navigation table's order shifts.
### Keep only the response columns you report on
\`\`\`powerquery
let
 Source = SurveyMonkey.Contents(),
 Survey = Source{[Name = "Customer Satisfaction Q3"]}[Data],
 Keep = Table.SelectColumns(Survey, {"respondent_id", "submitted_at", "score"})
in
 Keep
\`\`\`
Response tables carry per-question columns that multiply over time; selecting a stable core avoids schema surprises on refresh.
## Limitations & Tips
Access Token authentication means a token rotation breaks refreshes until you update the credential in data source settings — plan for that when you hand the report over. There are no query parameters, so server-side filtering isn't available: drill into the right survey first, then filter. Import only, no DirectQuery. General availability, and available in Power BI and Power Query Online.`,
  },
  {
    slug: "sweetiq",
    name: "SweetIQ",
    group: "SaaS & Business Apps",
    tagline:
      "Pull the tables your SweetIQ account exposes into Power BI from a single parameterless entry function.",
    products: ["Power BI"],
    authentication: ["SweetIQ"],
    capabilities: ["Import"],
    functions: ["SweetIQ.Tables"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/sweetiq",
    content: `## When to Use It
\`SweetIQ.Tables()\` is the whole surface: no parameters, one call, and a table listing what your SweetIQ account exposes, each row expandable to the underlying records. Use it when you're not sure what's available — connect, look at the navigation table, and drill into the entries that matter for the report. The account behind the stored credential decides what appears.
## Before You Start
You need SweetIQ credentials — the connector's sign-in kind is SweetIQ, entered when Power Query first connects. The connector is marked Preview and supports Import only. It's offered for Power BI, with no Power Query Online entry, so this one doesn't participate in dataflows. SweetIQ is a cloud service: no on-premises gateway, and credentials are configured per data source in the service.
## Connect from the Desktop
Home > Get Data in Power BI Desktop, search \`SweetIQ\`, select it, and Connect. Sign in with your SweetIQ credentials at the prompt. Navigator shows the tables the entry function returned; tick what you need, then Load or Transform data to shape it in the editor.
## Recipes in M
### Connect with no arguments
\`\`\`powerquery
let
 Source = SweetIQ.Tables()
in
 Source
\`\`\`
Nothing to configure — the credential in data source settings is the only input, so the same query means different tables for different users.
### Drill into a single table
\`\`\`powerquery
let
 Source = SweetIQ.Tables(),
 Accounts = Source{[Name = "Accounts"]}[Data]
in
 Accounts
\`\`\`
The drill pins the row by \`Name\`, so the query keeps pointing at the same table regardless of how Navigator sorts the list.
### Inspect the shape before you model it
\`\`\`powerquery
let
 Source = SweetIQ.Tables(),
 Accounts = Source{[Name = "Accounts"]}[Data],
 Columns = Table.ColumnNames(Accounts)
in
 Columns
\`\`\`
Return the column list first when you're unsure what a table contains; it's cheaper than guessing names in \`Table.SelectColumns\`.
## Limitations & Tips
Preview status means behavior can change — recheck refreshes after connector updates. Import only, so no DirectQuery option exists. With no parameters there's no server-side pushdown; select columns right after the drill to keep payloads small. The connector appears in Power BI only — plan on Power BI Desktop or the service rather than dataflows. If a refresh fails on credentials, fix them in data source settings rather than editing the query.`,
  },
  {
    slug: "teamdesk",
    name: "TeamDesk",
    group: "SaaS & Business Apps",
    tagline:
      "Point TeamDesk.Database at your database URL and drill into any table your credentials can read.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)", "Token"],
    capabilities: ["Import"],
    functions: ["TeamDesk.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/teamdesk",
    content: `## When to Use It
TeamDesk databases are table-shaped, and \`TeamDesk.Database(url)\` opens yours: one required URL parameter — any address pointing at your TeamDesk database — returns a table listing the database's tables for Navigator to choose from. It's the pick when you want table-level access rather than a curated feed, and you know the database address up front.
## Before You Start
You need a TeamDesk database and credentials; authentication is Basic (username/password) or Token — use whichever your organization issues. The connector is marked Preview, supports Import, and runs in Power BI and Power Query Online. TeamDesk lives in the cloud, so no gateway is involved in either host; credentials are stored with the data source.
## Connect from the Desktop
Home > Get Data, search \`TeamDesk\`, select it, and Connect. Enter the Database URL — the documented sample shape is \`https://www.teamdesk.net/secure/db/57692\` — then sign in with Basic or Token credentials. Navigator lists the tables; tick what you need and Load or Transform data.
## Connect in Power Query Online
Select TeamDesk on the source page, enter the database URL, sign in with Basic or Token, and select Next. Choose the tables on the data page and continue to Transform data.
## Recipes in M
### Connect to a database by URL
\`\`\`powerquery
let
 Source = TeamDesk.Database("https://www.teamdesk.net/secure/db/57692")
in
 Source
\`\`\`
The parameter accepts any URL to your database — keep the full secure/db path so the connector lands on the right instance.
### Drill into one table
\`\`\`powerquery
let
 Source = TeamDesk.Database("https://www.teamdesk.net/secure/db/57692"),
 Tasks = Source{[Name = "Tasks"]}[Data]
in
 Tasks
\`\`\`
The navigation rows are table names as TeamDesk exposes them, so a \`Name\` drill is the reliable way to address one.
### Filter rows straight after the drill
\`\`\`powerquery
let
 Source = TeamDesk.Database("https://www.teamdesk.net/secure/db/57692"),
 Tasks = Source{[Name = "Tasks"]}[Data],
 Open = Table.SelectRows(Tasks, each [Status] = "Open")
in
 Open
\`\`\`
Drill first, filter second — the filter only touches the one table, not the whole database listing.
## Limitations & Tips
Preview status applies: expect possible changes and revalidate scheduled refreshes. The URL is required and a wrong path fails immediately, so copy the full database address rather than the site root. There's no server-side filter parameter — narrow in the editor right after drilling. A rotated token or changed password shows up as a credential error; fix it in data source settings. Import only; no DirectQuery; available in Power BI and Power Query Online.`,
  },
  {
    slug: "tenforce-smart-list",
    name: "Tenforce (Smart)List",
    group: "SaaS & Business Apps",
    tagline:
      "Fetch one Tenforce (Smart)List — plus its children or related items — from URL, list ID, and data type alone.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Windows", "Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["Tenforce.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/tenforce-smart-list",
    content: `## When to Use It
Tenforce (Smart)Lists are the shaped extracts your Tenforce application exposes, and \`Tenforce.Contents(ApplicationUrl, ListId, DataType)\` reads one of them directly. All three arguments are required: the application URL, the list ID (its \`l\` or \`f\` prefix included), and a data type that decides whether you get children and related items or a flatter set of rows. Use it when the list definition already exists upstream and Power BI just needs the rows.
## Before You Start
You need access to the Tenforce application and a (Smart)List to fetch. Authentication kinds are Windows and Basic (username/password) — pick the one matching how your environment hands out access. The application URL must end with \`/\`. The connector is generally available, Import only, and offered for Power BI and Power Query Online; the source is a cloud web application, so no gateway applies, though Windows credentials get configured per data source like any other kind.
## Connect from the Desktop
Home > Get Data, search for the Tenforce (Smart)List connector, and Connect. Fill the three fields: Application url with its trailing slash, (Smart)List ID including the \`l\` or \`f\` prefix, and Children and related items. Sign in with Windows or Basic credentials, then pick the table in Navigator and Load or Transform data.
## Connect in Power Query Online
Choose Tenforce on the "Connect to data source" page, supply the same three values, sign in, and select Next. On Choose data, select what to load and continue to Transform data.
## Recipes in M
### Fetch a list with all three arguments
\`\`\`powerquery
let
 Source = Tenforce.Contents(
 "https://www.tenforceApplication.com/",
 "l1042",
 "Children"
 )
in
 Source
\`\`\`
The URL keeps its trailing slash, the list ID keeps its prefix, and \`DataType\` selects what shape of data comes back.
### Keep only the columns the model needs
\`\`\`powerquery
let
 Source = Tenforce.Contents("https://www.tenforceApplication.com/", "l1042", "Children"),
 Keep = Table.SelectColumns(Source, {"Id", "Title", "Owner"})
in
 Keep
\`\`\`
SmartList extracts can carry wide attribute sets; trimming to three columns right after the call keeps the refresh payload small.
### Re-read the same list for related items
\`\`\`powerquery
let
 Source = Tenforce.Contents("https://www.tenforceApplication.com/", "l1042", "Related")
in
 Source
\`\`\`
Change only \`DataType\` to request the other shape — handy for comparing children against related items from the same list ID in one query bundle.
## Limitations & Tips
Every parameter is required — there are no defaults, and each one failing shows up at call time rather than at refresh. The trailing \`/\` on the URL and the \`l\`/\`f\` prefix on the list ID are part of the contract; omit either and the fetch misbehaves. Import only, no DirectQuery. Because there's no paging or filter argument, shape and filter the returned table in the editor. General availability, available in Power BI and Power Query Online.`,
  },
  {
    slug: "topcon-aptix-insights",
    name: "Topcon Aptix Insights",
    group: "SaaS & Business Apps",
    tagline:
      "Hit the Topcon Aptix Insights OData endpoint directly, pushing querystring filters down before rows land in Power BI.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["API key"],
    capabilities: ["Import"],
    functions: ["AptixInsights.Feed"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/topcon-aptix-insights",
    content: `## When to Use It
Topcon Aptix Insights publishes its data through an OData API, and \`AptixInsights.Feed(url, optional query)\` connects to one endpoint of it. The \`url\` is the API endpoint you want — shaped like an OData path on your project — and the optional \`query\` record becomes querystring values on the request. That makes this connector a genuine pushdown tool: what you can express in the query record is filtered server-side, so Power BI never sees the rest.
## Before You Start
You need the Aptix Insights API URL for your project and an API key; authentication is API key. The connector supports Import and runs in Power BI and Power Query Online. The endpoint is a cloud URL, so no gateway is required in either host — store the key with the data source and refreshes proceed unattended.
## Connect from the Desktop
Home > Get Data, search for Topcon Aptix Insights, and Connect. Enter the Aptix Insights API URL you wish to connect to, then supply the API key when prompted. Navigator shows what the endpoint returns; select the data and Load or Transform data.
## Connect in Power Query Online
Select Topcon Aptix Insights on the source page, paste the API endpoint URL, sign in with the API key, and select Next. Choose the data you want and Transform data to continue in the editor.
## Recipes in M
### Connect to an endpoint
\`\`\`powerquery
let
 Source = AptixInsights.Feed("https://contoso.aptixinsights.com/odata/Devices")
in
 Source
\`\`\`
Point \`url\` at the OData endpoint for the product you want; the API key stored in credentials does the rest.
### Shape the returned rows
\`\`\`powerquery
let
 Source = AptixInsights.Feed("https://contoso.aptixinsights.com/odata/Devices"),
 Active = Table.SelectRows(Source, each [statusId] = 414),
 Keep = Table.SelectColumns(Active, {"id", "name", "statusId"})
in
 Keep
\`\`\`
Filter then narrow: rows that don't enter the model never get typed, which is the cheapest kind of optimization.
### Push a filter down with the query record
\`\`\`powerquery
let
 Source = AptixInsights.Feed(
 "https://contoso.aptixinsights.com/odata/Devices",
 [statusId = "414"]
 )
in
 Source
\`\`\`
The record's fields become querystring parameters, so the API returns only matching rows — compare its row count with the unfiltered call to confirm the pushdown works.
## Limitations & Tips
\`url\` is required; \`query\` is optional but it's your only server-side lever, and the record's field names must be ones the endpoint understands — mismatches typically surface as empty results rather than errors. Rotating the API key means updating data source settings, not the query. Import only, no DirectQuery. General availability, available in Power BI and Power Query Online — filter early and refresh on a schedule that matches how often the endpoint changes.`,
  },
  {
    slug: "usercube",
    name: "Usercube",
    group: "SaaS & Business Apps",
    tagline:
      "Read the universes your Usercube server exposes into Power BI using client credentials.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Client credentials"],
    capabilities: ["Import"],
    functions: ["Usercube.Universes"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/usercube",
    content: `## When to Use It
Your Usercube instance defines the universes worth reporting on, and \`Usercube.Universes(serverUrl)\` reads them: one required parameter — your Usercube server instance URL — returns a table of what the instance provides, listed for Navigator to choose from. Use it when data defined upstream in Usercube has to sit next to the rest of your model and you'd rather drill into a universe than hand-build API calls.
## Before You Start
You need a Usercube instance with the Power BI option enabled. Authentication is Client credentials, and the Client ID has a specific construction: take the Identifier of an OpenIdClient element defined in your Usercube configuration and concatenate the \`@\` character plus the instance's domain name onto it. The connector is marked Preview, Import only, offered for Power BI and Power Query Online. The server is a hosted URL, so no gateway applies.
## Connect from the Desktop
Enter Get Data in Power BI Desktop, choose Other > Usercube, and Connect. Supply the server URL — the sample shape is \`https://mycompany.usercube.com\` — then enter the client credentials built as described above. In Navigator, pick the data you need and either Transform data or Load.
## Connect in Power Query Online
Select Usercube on the source page, enter the server URL, sign in with the client credentials, and select Next. On Choose data, select the universes you want and Transform data.
## Recipes in M
### Connect to the server instance
\`\`\`powerquery
let
 Source = Usercube.Universes("https://mycompany.usercube.com")
in
 Source
\`\`\`
Pass the bare instance URL — no path beyond the host — and let the stored client credentials authenticate the call.
### Drill into one universe
\`\`\`powerquery
let
 Source = Usercube.Universes("https://mycompany.usercube.com"),
 Users = Source{[Name = "All Users"]}[Data]
in
 Users
\`\`\`
The navigation row's \`Name\` is the universe as the instance labels it; drilling by name documents which universe a query reads.
### Buffer the result for repeated use
\`\`\`powerquery
let
 Source = Usercube.Universes("https://mycompany.usercube.com"),
 Users = Source{[Name = "All Users"]}[Data],
 Stable = Table.Buffer(Users)
in
 Stable
\`\`\`
Buffer when downstream steps read the same table more than once — it evaluates the source a single time instead of per reference.
## Limitations & Tips
Preview status: validate scheduled refreshes after any connector update. The client ID format is the most common failure point — forget the \`@domain\` suffix and sign-in fails before you see data. \`serverUrl\` is required and has no default path. Import only, no DirectQuery, so refresh intervals are your only freshness control. Available in Power BI and Power Query Online; the credential lives with the data source.`,
  },
  {
    slug: "vena",
    name: "Vena",
    group: "SaaS & Business Apps",
    tagline:
      "Pull Vena hierarchies and intersections in one call, using MQL to scope exactly what comes back.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Application Token"],
    capabilities: ["Import"],
    functions: ["Vena.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/vena",
    content: `## When to Use It
Vena exposes hierarchies and intersections, and \`Vena.Contents(source, optional modelQuery, optional apiVersion)\` reads them into Power Query. The required \`source\` is your region — read it from the URL you log into, \`us2\` for \`https://us2.vena.io\` for instance. The optional \`modelQuery\` is an MQL string scoping hierarchies and intersections; leave it blank and you get every member and intersection the model exposes. \`apiVersion\` picks the response format, with the V2 endpoint adding operators.
## Before You Start
You need a Vena account and its Application Token — that token is the sign-in kind the connector uses. The region argument must match where your tenant lives, which the sign-in URL answers. Import is the only capability; Power BI and Power Query Online are both supported, and the cloud source needs no gateway in either.
## Connect from the Desktop
Home > Get Data, search \`Vena\`, select it, and Connect. Enter your region (the short code from your vena.io URL), optionally a model query and endpoint version, then paste the application token at the credential prompt. Navigator shows the data; Load or Transform data.
## Connect in Power Query Online
Choose Vena on the source page, enter the region, sign in with the application token, and select Next. On Choose data, pick what you want and Transform data.
## Recipes in M
### Connect with just the region
\`\`\`powerquery
let
 Source = Vena.Contents("us2")
in
 Source
\`\`\`
Pass the short region code, not the full URL — that's the value your sign-in address already contains.
### Trim the returned columns
\`\`\`powerquery
let
 Source = Vena.Contents("us2"),
 Members = Table.SelectColumns(Source, {"Name", "Level", "Value"})
in
 Members
\`\`\`
Intersections and members can arrive with more descriptive columns than a model wants; selecting a stable core keeps the schema from drifting.
### Scope with MQL and pin the endpoint version
\`\`\`powerquery
let
 Source = Vena.Contents("us2", "dimension(...)", "V2")
in
 Source
\`\`\`
The MQL string narrows which hierarchies and intersections come back — far better than pulling everything and filtering — while the version argument fixes the response format so refreshes stay consistent.
## Limitations & Tips
\`source\` is required and must match your tenant's region; a plausible-but-wrong code is a wasted sign-in. A blank \`modelQuery\` returns all members and intersections, which is convenient for exploration and expensive for scheduled refresh — scope it before you publish. \`apiVersion\` is optional but controls the shape you receive, so set it deliberately rather than letting it drift. Import only; general availability; available in Power BI and Power Query Online.`,
  },
  {
    slug: "vessel-insight",
    name: "Vessel Insight",
    group: "SaaS & Business Apps",
    tagline:
      "Bring Vessel Insight time series into Power BI — one table per tag — with tight date windows under the import cap.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["VesselInsight.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/vessel-insight",
    content: `## When to Use It
Vessel Insight stores time series as tags with associated values, and \`VesselInsight.Contents()\` opens your tenant's data: no parameters, a navigation table of what's available, and each time series tag surfacing as its own table. Use it when time series has to be modeled alongside business data — and be ready to aggregate, because raw series grow fast.
## Before You Start
You need an organization account (username/password) connected to a tenant. Sign-in is OAuth: the connector asks for your tenant URL in the form \` .kognif.ai\`, validates it, then takes your credentials. The connector supports Import and appears in Power BI and Power Query Online; it's a cloud service, so no gateway is needed — but the 1-GB import limit below applies to regular capacity.
## Connect from the Desktop
Home > Get Data, choose Other > Vessel Insight, and Connect. A third-party notice appears on first use — Continue. Select Sign in, enter the tenant URL and Validate, provide credentials and Continue, then Save. Navigator previews the available data; pick and Load or Transform data.
## Connect in Power Query Online
Select Vessel Insight on the source page, sign in with the tenant URL and your credentials, and select Next. Choose the data you want and Transform data to continue in the editor.
## Recipes in M
### Connect to the tenant
\`\`\`powerquery
let
 Source = VesselInsight.Contents()
in
 Source
\`\`\`
The tenant comes from the stored credential, not an argument — so the same query resolves to different data if you switch accounts.
### Drill into one time series tag
\`\`\`powerquery
let
 Source = VesselInsight.Contents(),
 Series = Source{[Name = "Fuel Consumption Rate"]}[Data]
in
 Series
\`\`\`
Each tag outputs its own table, so a \`Name\` drill is how you pick the series you're reporting on.
### Restrict the window before loading
\`\`\`powerquery
let
 Source = VesselInsight.Contents(),
 Series = Source{[Name = "Fuel Consumption Rate"]}[Data],
 Window = Table.SelectRows(Series, each [Timestamp] >= DateTime.AddMonths(DateTime.LocalNow(), -1))
in
 Window
\`\`\`
Date-range discipline matters here: one month of a series stays well inside both the import cap and the API's one-minute request timeout.
## Limitations & Tips
Imports are capped at 1-GB per workspace unless the workspace sits on Premium capacity — aggregate and choose short date ranges for time series. Tags arrive as separate tables; merge them in the Power Query editor if you need tags and values together. API requests time out after one minute by default, so a sprawling unfiltered pull can fail where an aggregated one succeeds. Import only; general availability; Power BI and Power Query Online.`,
  },
  {
    slug: "viva-insights",
    name: "Viva Insights",
    group: "SaaS & Business Apps",
    tagline:
      "Feed a saved Viva Insights query into Power BI by passing its partition identifier, job name, or job ID.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Organizational account"],
    capabilities: ["Import"],
    functions: ["VivaInsights.Data"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/viva-insights",
    content: `## When to Use It
Viva Insights analyses live in the advanced insights app, and \`VivaInsights.Data(scopeId, optional jobName, optional jobId, options)\` brings a saved query's results into Power Query. The required \`scopeId\` is the partition identifier — in the app, go to Analysis > Query results, find your query, and select Link to get it. \`jobName\` and \`jobId\` are optional ways to pin the specific query on top of that partition, and \`options\` carries advanced settings.
## Before You Start
You need access to the advanced insights app with at least one query defined on its Query results page — that's where both identifiers come from. Authentication is an Organizational account. The connector supports Import and runs in Power BI and Power Query Online; the service is cloud-hosted, so no gateway applies and the organizational credential sits with the data source.
## Connect from the Desktop
Home > Get Data, search \`VivaInsights\`, and Connect. Paste the Partition Identifier from the Link on Query results — optionally the query name or query identifier too — then sign in with your organizational account. Navigator shows the result table; Load or Transform data.
## Connect in Power Query Online
Select Viva Insights on the source page, sign in with your organizational account, and select Next. Enter the identifiers for the query you want, then Transform data on the Choose data page.
## Recipes in M
### Connect with the partition identifier
\`\`\`powerquery
let
 Source = VivaInsights.Data("5f142ea5-c08a-eb02-de68-41dccdefb141")
in
 Source
\`\`\`
\`scopeId\` alone is enough — it's the identifier the app hands you from the Link action on Query results.
### Pin the query by name
\`\`\`powerquery
let
 Source = VivaInsights.Data(
 "5f142ea5-c08a-eb02-de68-41dccdefb141",
 jobName = "Contoso's Person Metrics"
 )
in
 Source
\`\`\`
Naming the query is the equivalent of drilling into that specific result instead of whatever the partition happens to hold — it shows in \`Analysis > Query results\` under that name.
### Reference by job identifier and cap the rows
\`\`\`powerquery
let
 Source = VivaInsights.Data(
 "5f142ea5-c08a-eb02-de68-41dccdefb141",
 jobId = "ad4052e-0925-4b2e-99be-62789d4227ff"
 ),
 Preview = Table.FirstN(Source, 500)
in
 Preview
\`\`\`
The job identifier pins the result even if the query is renamed, and a row cap keeps exploratory refreshes fast while you settle on a shape.
## Limitations & Tips
\`scopeId\` is the only required argument; \`jobName\` and \`jobId\` are optional but worth setting so the query you get is the one you mean. The identifiers all come from the advanced insights app — copy them from Link rather than reconstructing by hand. \`options\` is an optional record for advanced settings; leave it out until you need it. Import only, no DirectQuery; general availability; available in Power BI and Power Query Online.`,
  },
  {
    slug: "witivio",
    name: "Witivio",
    group: "SaaS & Business Apps",
    tagline:
      "Load a single Witivio chatbot's data into Power BI by pasting its chatbot ID and signing in with Microsoft Entra ID.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["Witivio.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/witivio",
    content: `## When to Use It
\`Witivio.Contents(botId)\` reads the data behind a single Witivio chatbot. The function takes a single required argument — the chatbot's ID as a GUID — and returns a table of what that bot exposes, listed in Navigator for you to pick from. Use it when bot usage or content belongs in the same report as your other workspace metrics.
## Before You Start
You need a Witivio chatbot and its ID; authentication is Microsoft Entra ID, so the person connecting signs in with their organizational account and must have access to that bot. The connector is marked Preview, supports Import, and runs in Power BI and Power Query Online. The service is cloud-hosted — no gateway, credential stored per data source.
## Connect from the Desktop
Home > Get Data, search \`Witivio\`, select it, and Connect. Enter the chatbot ID (a GUID — the documented sample is all zeros, so replace it with your bot's), then complete the Microsoft Entra ID sign-in. Navigator shows the returned table; Load or Transform data.
## Connect in Power Query Online
Choose Witivio on the source page, enter the chatbot ID, sign in with your Microsoft Entra ID account, and select Next. Pick the data you want and Transform data to shape it in the editor.
## Recipes in M
### Connect with a bot identifier
\`\`\`powerquery
let
 Source = Witivio.Contents("00000000-0000-0000-0000-000000000000")
in
 Source
\`\`\`
Swap the placeholder GUID for your bot's real identifier — a malformed one fails at call time, so verify it before wiring the query into a model.
### Drill into the bot's content
\`\`\`powerquery
let
 Source = Witivio.Contents("00000000-0000-0000-0000-000000000000"),
 Conversations = Source{[Name = "Conversations"]}[Data]
in
 Conversations
\`\`\`
Drilling by \`Name\` documents which part of the bot's data a query reads and insulates it from navigation-table sort order.
### Parameterize the identifier for reuse
\`\`\`powerquery
let
 BotId = "00000000-0000-0000-0000-000000000000",
 Source = Witivio.Contents(BotId),
 Conversations = Source{[Name = "Conversations"]}[Data]
in
 Conversations
\`\`\`
Hoisting the GUID to its own binding makes a bot swap a one-line edit — or a target for a Power BI parameter — instead of a find-and-replace across queries.
## Limitations & Tips
Preview status applies: behavior may change and scheduled refreshes deserve a check after updates. The bot ID is required with no default, and the Entra account you sign in with needs access to that specific bot — permission gaps show up as sign-in failures rather than empty tables. Import only, no DirectQuery. Available in Power BI and Power Query Online; filter and select columns early, since there's no server-side argument beyond the ID.`,
  },
  {
    slug: "wolters-kluwer-cch-tagetik",
    name: "Wolters Kluwer CCH Tagetik",
    group: "SaaS & Business Apps",
    tagline:
      "Read CCH Tagetik financial and analytical data into Power BI against a URL, database code, and optional model options.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Authentication"],
    capabilities: ["Import"],
    functions: ["CCHTagetik.Contents4"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/wolters-kluwer-cch-tagetik",
    content: `## When to Use It
CCH Tagetik's financial and analytical layers hold the numbers, and \`CCHTagetik.Contents4(URL, Database, optional options)\` reads from them: your environment endpoint plus a database code, then Navigator lists the sources drawn from those layers for you to load. It's the pick when those layers already define what gets reported and Power BI's job is presentation.
## Before You Start
Verify Power BI Desktop's system requirements, then make sure the CCH Tagetik environment you're reading from is configured. Sign-in uses ad-hoc credentials configured in CCH Tagetik — Basic (username and password) or the OAuth 2.0 client credentials flow. Import is supported, including data loading from the financial and analytical layer. The endpoints are cloud URLs, so no gateway applies; the connector appears in Power BI and Power Query Online.
## Connect from the Desktop
Home > Get Data, select More, search for Wolters Kluwer CCH Tagetik, and Connect. Enter the URL environment, the database code, and optionally the analytical workspace and dataset or financial model codes. Provide the credentials and Connect. Navigator lists the sources implied by those parameters — pick one and load.
## Connect in Power Query Online
Choose Wolters Kluwer CCH Tagetik on the source page, enter the URL and database parameters, sign in with Basic or OAuth client credentials, and select Next. Pick your source and Transform data.
## Recipes in M
### Connect with URL and database
\`\`\`powerquery
let
 Source = CCHTagetik.Contents4(
 "https://contoso.api.tagetik.com/basic",
 "TCPM_ABC_001"
 )
in
 Source
\`\`\`
Both required arguments: the environment endpoint and the database code. The sample database code shows the expected shape.
### Drill into one source
\`\`\`powerquery
let
 Source = CCHTagetik.Contents4("https://contoso.api.tagetik.com/basic", "TCPM_ABC_001"),
 Actuals = Source{[Name = "Financial Actuals"]}[Data]
in
 Actuals
\`\`\`
Navigator's source list maps to navigation rows, so a \`Name\` drill addresses the layer you mean directly.
### Pass advanced options in the record
\`\`\`powerquery
let
 Source = CCHTagetik.Contents4(
 "https://contoso.api.tagetik.com/basic",
 "TCPM_ABC_001",
 [FinancialModel = "2", AWDatasets = "WS01_DS01"]
 )
in
 Source
\`\`\`
The \`options\` record carries the advanced arguments: \`FinancialModel\` accepts only \`"1"\` or \`"2"\`, and each \`AWDatasets\` code follows workspace code, underscore, dataset code — comma-separate several.
## Limitations & Tips
Two parameters are required; the optional \`options\` record is where model selection happens, and its fields are constrained — a financial model outside 1/2 or a malformed workspace dataset code won't behave. The URL and database must match an environment that exists, or Navigator comes back thin. Credentials live in CCH Tagetik's ad-hoc configuration, so password or client-secret changes mean updating the stored credential. Import only; general availability; Power BI and Power Query Online.`,
  },
  {
    slug: "wrike",
    name: "Wrike",
    group: "SaaS & Business Apps",
    tagline:
      "Open your Wrike workspace in Power BI as a navigation table and drill into the folders and items you report on.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Authentication"],
    capabilities: ["Import"],
    functions: ["Wrike.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/wrike",
    content: `## When to Use It
\`Wrike.Contents()\` opens your Wrike account with no arguments, returning a navigation table of what the signed-in user can see — one row per item, each drillable to its records. Use it when Wrike data needs to sit beside delivery and finance data in one model, and you'd rather drill into a named item than hand-build API calls.
## Before You Start
You need a Wrike account with access to the content you want; the connector's sign-in kind is the Authentication option it presents — complete it with your Wrike credentials when prompted. The connector is marked Preview and supports Import only. It's offered for Power BI and Power Query Online; Wrike is a cloud service, so no gateway is needed and credentials are stored per data source.
## Connect from the Desktop
Home > Get Data in Power BI Desktop, search \`Wrike\`, select it, and Connect. Sign in when the authentication prompt appears. Navigator shows the navigation table \`Wrike.Contents()\` returned — expand, tick what you need, then Load or Transform data.
## Connect in Power Query Online
Select Wrike on the "Connect to data source" page, complete the sign-in, and select Next. On Choose data, pick the items you want and Transform data to continue in the editor.
## Recipes in M
### Connect with no arguments
\`\`\`powerquery
let
 Source = Wrike.Contents()
in
 Source
\`\`\`
Nothing to pass — the stored credential scopes the table, which is why two accounts can run the identical query and see different rows.
### Drill into one folder's data
\`\`\`powerquery
let
 Source = Wrike.Contents(),
 Projects = Source{[Name = "Projects"]}[Data]
in
 Projects
\`\`\`
Drilling by \`Name\` reads as a reference to the folder itself and survives changes to the navigation table's order.
### Narrow to the columns you model
\`\`\`powerquery
let
 Source = Wrike.Contents(),
 Projects = Source{[Name = "Projects"]}[Data],
 Keep = Table.SelectColumns(Projects, {"Title", "Status", "Owner"})
in
 Keep
\`\`\`
Workspace folders carry whatever columns Wrike exposes for that item type; selecting your reporting core keeps refreshes predictable.
## Limitations & Tips
Preview status means behavior can shift — revalidate scheduled refreshes after updates. With no parameters there's no server-side filtering, so drill into the narrowest folder first and filter immediately. Import only; no DirectQuery, so your refresh schedule is the freshness control. The connector appears in Power BI and Power Query Online, not Excel. If refresh fails after a password or sign-in change, reset the credential in data source settings rather than editing the query.`,
  },
  {
    slug: "zendesk-data",
    name: "Zendesk Data",
    group: "SaaS & Business Apps",
    tagline:
      "Bring your Zendesk support data — tickets, users, organizations — into Power BI from a single URL.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Zendesk Auth"],
    capabilities: ["Import"],
    functions: ["ZendeskData.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/zendesk-data",
    content: `## When to Use It
Zendesk is where the support conversation lives: tickets, end users, organizations, and whatever custom fields the desk team bolted on last quarter. This connector reaches a Zendesk instance by URL and hands back the data your account can read as a navigable table, so you can blend service volume and backlog measures with sales and finance data in one model. It is Import only, which makes it the right pick for scheduled snapshots of Zendesk records rather than a live query against the support desk.
## Before You Start
You need a Zendesk account with a username and password; the connector prompts for those credentials through Zendesk Auth the first time you connect. The single required input is the full Zendesk URL including the subdomain, starting with https:// — for example https://contoso.zendesk.com. Because Zendesk is a hosted service, Power Query Online reaches it directly with no on-premises data gateway. Both Power BI and Power Query Online are supported and the capability set is Import only.
## Connect from the Desktop
In Power BI Desktop, choose Home > Get Data, pick Online Services in the category list, select Zendesk Data, then Connect. Enter the full Zendesk URL at the prompt and select OK. Choose Sign in, complete the Zendesk credential window, and confirm. Navigator then lists what the connection exposes — select the items you want and either Load them straight into the model or Transform Data to shape them first.
## Connect in Power Query Online
On the Connect to data source page, select Zendesk Data, enter the same full Zendesk URL, and sign in with the Zendesk account that owns the data. Once the connection succeeds, choose the tables on the Choose data page and continue into the Power Query Editor to finish the shaping before you save the dataflow.
## Recipes in M
### Open the connection with the entry function
\`ZendeskData.Contents\` takes the URL as its required argument; everything else hangs off the navigation it returns.
\`\`\`powerquery
let
 Source = ZendeskData.Contents("https://contoso.zendesk.com")
in
 Source
\`\`\`
### Drill into one item by name
The result behaves like a navigation table, so pinning a row by Name keeps the query stable no matter how the Navigator sorts.
\`\`\`powerquery
let
 Source = ZendeskData.Contents("https://contoso.zendesk.com"),
 Tickets = Source{[Name = "tickets"]}[Data]
in
 Tickets
\`\`\`
### Pass the options record
The optional second argument accepts a record; \`TestConnection\` is the documented example.
\`\`\`powerquery
let
 Source = ZendeskData.Contents("https://contoso.zendesk.com", [TestConnection = true])
in
 Source
\`\`\`
## Limitations & Tips
Import is the only capability here — there is no DirectQuery mode, so plan for refresh rather than live queries, and keep the drill-in step early so you only materialize one table per query. One parameter is required; the options record is optional and can usually be omitted. Zendesk is cloud-hosted, so no gateway is needed for Power Query Online, but each scheduled refresh still runs against the live instance — favor filtered drills over loading every table the Navigator offers.`,
  },
  {
    slug: "zoho-creator",
    name: "Zoho Creator",
    group: "SaaS & Business Apps",
    tagline:
      "Query reports from your Zoho Creator apps by naming the domain, workspace, app, and report.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["ZohoCreator.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/zoho-creator",
    content: `## When to Use It
Zoho Creator is where teams build the lightweight apps that never made it into the ERP: intake forms, approval workflows, field survey submissions. This connector targets one report inside one Creator app and returns its rows as a table, which is exactly what you want when the reporting need is narrow and repeatable. You pick the report by four text values — domain, workspace, application link name, report link name — and the connector brings back that report's data, ready to stack next to your other SaaS sources.
## Before You Start
Sign-in uses OAuth: a Zoho credential window appears when the query first runs, and you approve it with the account that can open the app. All four parameters are required text — the Zoho account domain, the workspace name (for example jack), the application link name (for example zylker-management), and the report link name (for example Employee_Details). Get the link names from the Creator app's URL rather than guessing. Zoho Creator is cloud-hosted, so Power Query Online needs no gateway; both Power BI and Power Query Online are supported, Import only.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, search for Zoho Creator, select it, then Connect. The dialog asks for the four values in order: domain, workspace name, application link name, and report link name. Select OK, complete the OAuth sign-in, and Navigator opens on the selected report. Choose Transform Data if you want to shape it first, or Load to bring it into the model as-is.
## Connect in Power Query Online
Add Zoho Creator from the data source page, fill in the same four fields, and finish the OAuth sign-in with the right Zoho account. After the connection succeeds, pick the report on the Choose data page and continue to the Power Query Editor before saving the dataflow.
## Recipes in M
### Connect to a specific report
All four arguments are positional and required, so the query below maps directly to the dialog fields.
\`\`\`powerquery
let
 Source = ZohoCreator.Contents(
 "zoho.com",
 "jack",
 "zylker-management",
 "Employee_Details"
 )
in
 Source
\`\`\`
### Take a bounded slice while you explore
Because the function returns the report's own table rather than a hierarchy, the first shaping step is usually a row cap while you confirm the columns.
\`\`\`powerquery
let
 Source = ZohoCreator.Contents(
 "zoho.com",
 "jack",
 "zylker-management",
 "Employee_Details"
 ),
 Sample = Table.FirstN(Source, 500)
in
 Sample
\`\`\`
## Limitations & Tips
There is no default report — miss one link name and the query fails, so treat all four strings as configuration and keep them in one place per query. Only Import is supported, so schedule refreshes instead of expecting DirectQuery, and remember that a report's schema changes when the app builder edits it: filter on column names you have verified, not remembered. No gateway is required for the cloud-hosted service in Power Query Online.`,
  },
  {
    slug: "zucchetti-hr-infinity",
    name: "Zucchetti HR Infinity",
    group: "SaaS & Business Apps",
    tagline:
      "Pull employee and HR portal data from Zucchetti HR Infinity into Power BI with a URL and environment code.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["Zucchetti.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/zucchetti-hr-infinity",
    content: `## When to Use It
Zucchetti HR Infinity holds the people data: employee records, org structure, absence and payroll-adjacent tables maintained by HR. This connector points at an Infinity HR Portal and returns a table you navigate for the portal content your account can see, which is the practical route when HR data has to land beside headcount and cost figures in the same model. It is in Preview, so expect the surface to shift a little between releases.
## Before You Start
You need credentials for the HR portal itself; the connector authenticates with Basic (username/password). Two values are required: the portal URL, such as https://myurl/HRPortal/, and the environment code, such as 001 or 000001 — the code identifies which environment on that portal you are querying, so confirm it with your HR system administrator rather than assuming. Power BI and Power Query Online both support the connector, Import only. Because the portal is typically reached inside your own network, plan on a data gateway for Power Query Online if the URL is not publicly reachable.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, locate Zucchetti HR Infinity, and select Connect. Enter the portal URL and environment code, then sign in with the Basic credentials issued for your portal account. When Navigator opens, select the content you need and choose Load or Transform Data.
## Connect in Power Query Online
Choose Zucchetti HR Infinity on the data source page, supply the same URL and environment code, and sign in with the portal username and password. If the portal sits behind your corporate network, configure a gateway on that data source before you continue, then pick the tables on the Choose data page and move on to the Power Query Editor.
## Recipes in M
### Connect to the portal
Both arguments are required text; the environment code is what keeps the query pointed at the right tenant.
\`\`\`powerquery
let
 Source = Zucchetti.Contents("https://myurl/HRPortal/", "001")
in
 Source
\`\`\`
### Drill into portal content by name
Treat the result as a navigation table and pin the item you care about, so sorting changes in the Navigator never break the query.
\`\`\`powerquery
let
 Source = Zucchetti.Contents("https://myurl/HRPortal/", "001"),
 Employees = Source{[Name = "Employees"]}[Data]
in
 Employees
\`\`\`
### Keep only the columns you report on
HR tables carry a lot of operational noise; trim after the drill so refresh stays quick.
\`\`\`powerquery
let
 Source = Zucchetti.Contents("https://myurl/HRPortal/", "001"),
 Employees = Source{[Name = "Employees"]}[Data],
 Keep = Table.SelectColumns(Employees, {"EmployeeId", "LastName", "Department"})
in
 Keep
\`\`\`
## Limitations & Tips
Preview status means the connector and its Navigator items can change — pin drills by Name rather than by position, and re-check the query after a Power BI update. Only the two parameters exist, so there is no options record to fall back on; a wrong environment code surfaces as a failed or empty result, not a helpful message. Import only, so schedule refresh, and use a gateway in Power Query Online whenever the portal URL is an internal address.`,
  },
];

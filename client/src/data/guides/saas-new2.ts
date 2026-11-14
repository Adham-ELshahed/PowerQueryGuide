import type { ConnectorGuide } from "../connector-guides";

/**
 * Practical guides for the SaaS & Business Apps group — added by the Microsoft connectors
 * index expansion. Content is original (data-engineer voice), generated from
 * the connector audit facts under Temp/opencode/guides-src.
 */
export const saasNewGuides2: ConnectorGuide[] = [
  {
    slug: "factset",
    name: "FactSet",
    group: "SaaS & Business Apps",
    tagline:
      "Pull FactSet data into Power BI through a unified connector that lists the endpoints your subscription covers.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["API key", "Using FactSet Login"],
    capabilities: ["Import"],
    functions: ["FactSetAnalytics.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/factset",
    content: `## When to Use It
FactSet is the market and financial data source, and \`FactSetAnalytics.Contents\` opens it: the function takes no arguments and returns a table of the functions your account can reach, one row per entry. The Navigator shows that list, and you pick the endpoints you want to load. Which entries appear depends on your subscriptions, so the list itself is the map of what you may query. Import only.
## Before You Start
A FactSet subscription is required for access; talk to your FactSet representative about what your account covers. Two sign-in kinds are offered: an API key generated from the FactSet Developer Portal, or Use FactSet Login (the recommended path). You also need a current Power BI build, since FactSet's major updates only arrive there. The service is cloud-hosted, so no gateway is required from Desktop or Power Query Online; both products list this connector.
## Connect from the Desktop
In Power BI Desktop, go to Get Data > More, search for FactSet and select the FactSet connector (it unifies the contents of the earlier FactSet connectors). At the authentication page, sign in with FactSet credentials or supply Username - Serial plus API key. The Navigator then lists the functions your account can see; tick what you need and choose Load or Transform Data.
## Connect in Power Query Online
Pick FactSet in the Power Query Online get data experience, then create a new connection or reuse an existing one. Sign in with your FactSet credentials or API key, set the Privacy Level, and leave the gateway at (none) since the source is cloud-hosted. On the next page, select the endpoints to include and Transform data to shape them.
## Recipes in M
### Connect and list the functions
\`\`\`powerquery
let
 Source = FactSetAnalytics.Contents()
in
 Source
\`\`\`
No arguments are required; the call returns the function list your subscriptions entitle you to, which is exactly what the Navigator was showing.
### Narrow the list to a topic
\`\`\`powerquery
let
 Source = FactSetAnalytics.Contents(),
 Matching = Table.SelectRows(Source, each Text.Contains([Name], "Pricing"))
in
 Matching
\`\`\`
Filtering by Name is a quick way to find the endpoints you care about in a long list before picking one to invoke.
## Limitations & Tips
- Import only; no DirectQuery, so plan scheduled refresh on the Power BI service.
- Availability is subscription-bound: an endpoint missing from your list is an access question for your account team, not a query bug.
- Sign-in kind matters for refresh; API key or FactSet Login must be usable by the service, not just your desktop.
- The entry function has no parameters, so filtering and shaping happen after the list returns rather than inside the call.`,
  },
  {
    slug: "fhir",
    name: "FHIR",
    group: "SaaS & Business Apps",
    tagline:
      "Query a FHIR server from Power BI, with an optional search query that filters resources server-side.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID", "Anonymous"],
    capabilities: ["Import"],
    functions: ["Fhir.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/fhir/fhir",
    content: `## When to Use It
FHIR is the healthcare data standard, and this connector reads resources from any FHIR server you can reach. \`Fhir.Contents\` takes the server URL (required) and an optional search query, and returns a table; the Navigator then lists the resource types available, ready to drill into or shape. Import only.
## Before You Start
Reading from the server requires the FHIR Data Reader role on that server, so check your assignment before blaming the query. Two sign-in kinds exist: Microsoft Entra ID (organizational account) for secured servers, and Anonymous, which Power Query Desktop also supports for public servers with no access controls; Power Query Online requires the organizational account. For Entra authentication, the server's expected audience should equal its base URL, and the server must challenge for authorization; other non-Azure servers need a preauthorized client registration on your tenant. The source is a web endpoint, so normally no gateway; Power Query Online offers one if your server sits inside your network. Both Power BI and Power Query Online host this connector.
## Connect from the Desktop
In Power BI Desktop, Get Data, select Other > FHIR and Connect. Enter the FHIR server URL, and optionally an initial query if you know exactly what you need. Choose Anonymous for a public test server or an organizational account otherwise, then select the resource types in the Navigator to load or transform.
## Connect in Power Query Online
In Choose data, search FHIR and select the connector. Enter the server URL plus the optional query, include your on-premises gateway if the server requires it, and sign in with an Organizational account, the only kind Power Query Online accepts. You still need the FHIR Data Reader role. Select Next, choose the resources, then Transform data (expanding nested fields such as address components is common).
## Recipes in M
### Connect to the server
\`\`\`powerquery
let
 Source = Fhir.Contents("https://fhir.contoso.com")
in
 Source
\`\`\`
The URL is the only required value; pass no query and the Navigator shows the resource types to browse.
### Drill into a resource type
\`\`\`powerquery
let
 Source = Fhir.Contents("https://fhir.contoso.com"),
 Patients = Source{[Name = "Patient"]}[Data]
in
 Patients
\`\`\`
Resource types are listed by their FHIR name, so drilling by Name pins the resource you want regardless of Navigator ordering.
### Push a search down
\`\`\`powerquery
let
 Source = Fhir.Contents("https://fhir.contoso.com", "Patient?address-postalcode=98052")
in
 Source
\`\`\`
The optional second argument is a FHIR search string evaluated by the server, so only matching resources cross the wire instead of the whole resource type.
## Limitations & Tips
- Import only, so schedule refresh rather than expecting a live connection.
- Missing role or a bad audience fails at sign-in, not at query time; verify both before debugging M.
- Guest accounts can fail Entra sign-in when the server does not return the right authorization challenge; a tenant account is safer.
- Use the search query parameter to cut payload early, especially against large resource types.`,
  },
  {
    slug: "funnel",
    name: "Funnel",
    group: "SaaS & Business Apps",
    tagline:
      "Bring Funnel marketing data into Power BI by drilling from a workspace to a Data Share and setting the months to pull.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Funnel Sign in"],
    capabilities: ["Import"],
    functions: ["Funnel.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/funnel",
    content: `## When to Use It
Funnel collects marketing platform data and hands it to destinations like Power BI, and this connector reaches your Funnel workspace. \`Funnel.Contents\` takes no arguments and returns a navigation table of your workspaces and their Data Shares, so you drill from workspace to share and get a table from each. Import only, generally available, in both Power BI and Power Query Online.
## Before You Start
You need a Funnel subscription and, inside the Funnel app, a Data Share containing the fields you want exposed to Power BI (create it from the Microsoft Power BI page in your workspace's left navigation). The sign-in kind is the Funnel sign-in: use the Google account connected to your Funnel workspace or your Funnel credentials. Since Funnel is a cloud service, no gateway is involved under normal circumstances; both Power BI and Power Query Online list this connector.
## Connect from the Desktop
In Power BI Desktop, Get Data, pick Funnel under Online Services and Connect. Sign in with your Google or Funnel credentials, then Connect to continue. The Navigator shows workspaces and their Data Shares; for each share you can enter how many rolling months to import (12 by default), then Load or Transform Data.
## Connect in Power Query Online
Choose Funnel on the Power Query Connect to data source page and sign in with Google or Funnel credentials. Once signed in, select Next; the Choose data page lists the Data Shares in your workspace. Pick the ones you want, set the rolling months where offered, and Transform data to shape them in the editor.
## Recipes in M
### Connect and see the workspaces
\`\`\`powerquery
let
 Source = Funnel.Contents()
in
 Source
\`\`\`
No parameters: the call returns the navigation table of workspaces, and your sign-in decides what appears in it.
### Drill from workspace to Data Share
\`\`\`powerquery
let
 Source = Funnel.Contents(),
 Workspace = Source{[Name = "Contoso Marketing"]}[Data],
 Share = Workspace{[Name = "Channel performance"]}[Data]
in
 Share
\`\`\`
The navigation is two levels deep, so first pin the workspace by Name, then pin the Data Share inside it; that chain survives any change in Navigator sort order.
## Limitations & Tips
- A Data Share that holds too much data for a single month raises a TOO_MANY_ROWS error, so narrow the fields in the share or reduce the month window rather than retrying.
- The rolling-months window defaults to 12 and counts back from today; understand that it moves with every refresh.
- Import only, so refresh cadence and window size together decide how much data each cycle pulls.
- The entry function has no parameters, so months and share selection are chosen in the Navigator, not in the M call.`,
  },
  {
    slug: "github",
    name: "GitHub",
    group: "SaaS & Business Apps",
    tagline:
      "Read a GitHub repository's contents into Power BI by naming its owner and repository.",
    products: ["Power BI"],
    authentication: ["GitHub"],
    capabilities: ["Import"],
    functions: ["Github.Tables"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/github",
    content: `## When to Use It
GitHub repositories hold issues, code metadata, and whatever else the repo exposes, and \`Github.Tables\` opens one: give it the repository owner and the repository name (both required text) and it returns a table of what that repo contains. Import only, in Preview, and listed for Power BI only.
## Before You Start
You need a GitHub account the connector can sign in as; the sign-in kind is GitHub authentication, run when the connection is created. The owner is the user or organization that owns the repo, and the repository name is the repo's short name, both taken straight from the repo's URL. Because GitHub is a cloud service, no gateway is needed from your desktop, and refresh on the Power BI service reuses the credential you stored.
## Connect from the Desktop
In Power BI Desktop, Get Data, search for GitHub and select the GitHub connector, then Connect. Enter the Owner (a name or organization) and the Repository name, sign in with your GitHub account, and confirm. The Navigator shows what the repository exposes; preview an entry or select Transform Data to shape it in the editor.
## Recipes in M
### Connect to a repository
\`\`\`powerquery
let
 Source = Github.Tables("contoso-org", "reporting")
in
 Source
\`\`\`
Both arguments are required text: the owner exactly as it appears in the repo URL, then the repository name as its final URL segment.
### Preview the contents
\`\`\`powerquery
let
 Source = Github.Tables("contoso-org", "reporting"),
 First = Table.FirstN(Source, 25)
in
 First
\`\`\`
What a repository exposes varies, so inspect a few rows before later steps start referencing column names you have not seen.
## Limitations & Tips
- Preview status: expect changes between releases and re-test after Power BI updates.
- Import only, so refresh is a scheduled pull using the GitHub credential stored on the connection.
- Two required parameters and no optional ones: a wrong owner or repo name fails the call outright, which is quick to diagnose.
- The sign-in scopes what the repo list contains; if an expected repository is missing, check the account you authenticated with.`,
  },
  {
    slug: "hexagon-ppm-smart-api",
    name: "Hexagon PPM Smart API",
    group: "SaaS & Business Apps",
    tagline:
      "Consume a Hexagon PPM Smart API OData feed, passing request headers or an OData version when the service needs them.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Hexagon PPM Smart API"],
    capabilities: ["Import"],
    functions: ["HexagonSmartApi.Feed"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/hexagon-ppm-smart-api",
    content: `## When to Use It
Hexagon PPM exposes its data as a Smart API OData feed, and \`HexagonSmartApi.Feed\` reads one: the service document URL is required, while request headers and the OData feed version are optional. The call returns the feed as a table you drill into or shape. Import only, generally available, in both Power BI and Power Query Online.
## Before You Start
You need the OData service document URL for your Smart API instance and whatever credentials the service expects; the sign-in kind is catalogued as Hexagon PPM Smart API authentication, presented when the connection is built. The optional headers argument carries comma-separated name and value pairs when the API demands them, and the version argument defaults to 2.0 when omitted. The endpoint is reached over the network, so no gateway is needed for a publicly reachable URL; a server inside your network needs one in Power Query Online.
## Connect from the Desktop
In Power BI Desktop, Get Data, search for Hexagon PPM Smart API and Connect. Enter the OData service document URL in the required field, add request headers or change the OData version if your service calls for it, then sign in. The Navigator shows the feed; load it or select Transform Data to shape it.
## Connect in Power Query Online
Pick Hexagon PPM Smart API in the Power Query Online get data experience, enter the OData service document URL, and add the optional headers or OData version where needed. Create or reuse a connection, sign in with the Smart API credential, and choose a gateway only if the endpoint lives inside your network, otherwise (none). Set the Privacy Level, then continue to Choose data and Transform data.
## Recipes in M
### Connect to the service document
\`\`\`powerquery
let
 Source = HexagonSmartApi.Feed("https://api.sample.com/SampleService/V1")
in
 Source
\`\`\`
The URL alone is enough for an open or already-authenticated feed; it must be the service document address, not the path of a single entity set.
### Supply headers and pin the OData version
\`\`\`powerquery
let
 Source = HexagonSmartApi.Feed(
 "https://api.sample.com/SampleService/V1",
 "SampleHeader1=SampleValue1, SampleHeader2=SampleValue2",
 "2.0"
 ),
 First = Table.FirstN(Source, 30)
in
 First
\`\`\`
Headers arrive as one comma-separated string of name and value pairs, and the third argument pins the OData version instead of accepting the 2.0 default; preview a slice to confirm both had the intended effect.
## Limitations & Tips
- Import only, so the Power BI service refresh path is a scheduled pull.
- The URL must be the service document; pointing at an entity set directly breaks the feed's navigation.
- Headers are positional after the URL, so an omitted version means passing null in that slot rather than skipping it.
- Keep the OData version explicit once you know which one your service speaks; letting it default can produce different results across environments.`,
  },
  {
    slug: "industrial-app-store",
    name: "Industrial App Store",
    group: "SaaS & Business Apps",
    tagline:
      "Open the Industrial App Store navigation table and drill to the data your account can see.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["IndustrialAppStore.NavigationTable"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/industrial-app-store",
    content: `## When to Use It
The Industrial App Store is the source behind this connector, and \`IndustrialAppStore.NavigationTable\` is deliberately named: it returns a navigation table, one row per item your account can reach, with the actual data tucked behind each row. That makes it a browsing entry point rather than a single flat table. Import only, generally available, hosted in Power BI and Power Query Online.
## Before You Start
You need an account the connector can authenticate; the sign-in kind is OAuth, which runs in the browser when the connection is created. There are no data parameters at all (zero required), so everything is decided by your identity and by which row you drill into afterwards. As a cloud source, it needs no gateway in Desktop or Power Query Online unless your organization routes service traffic through one.
## Connect from the Desktop
In Power BI Desktop, Get Data, search for Industrial App Store and Connect. Sign in through the OAuth prompt and confirm. The Navigator shows the navigation items; preview one or select Transform Data to work with the navigation table in the editor, where you can pin the row you want by name.
## Connect in Power Query Online
Choose Industrial App Store in the Power Query Online get data experience. There are no connection settings to fill; create a new connection or reuse an existing one, run the OAuth sign-in, set the Privacy Level, and keep the gateway at (none) for the cloud source. Continue to Choose data, pick your items, and Transform data.
## Recipes in M
### Open the navigation table
\`\`\`powerquery
let
 Source = IndustrialAppStore.NavigationTable()
in
 Source
\`\`\`
The entry point takes no arguments; your sign-in decides what rows appear in the navigation table.
### Drill into an item by name
\`\`\`powerquery
let
 Source = IndustrialAppStore.NavigationTable(),
 Chosen = Source{[Name = "Sample item"]}[Data]
in
 Chosen
\`\`\`
Each row's Data holds that item's table, so drilling by the exact Name pins it regardless of how the Navigator sorts or how many items show up later.
## Limitations & Tips
- Import only: no DirectQuery, so refresh is scheduled on the Power BI service.
- Zero parameters means no server-side filter at call time; the drill step is where you commit to a specific item.
- Because the entry returns navigation rather than data, a query that stops at Source loads a table of names, not values.
- One OAuth credential backs every query, so an expired session fails them together at refresh.`,
  },
  {
    slug: "informationgrid",
    name: "InformationGrid",
    group: "SaaS & Business Apps",
    tagline:
      "Connect Power Query to an InformationGrid server by host name or IP and drill into what it serves.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Token"],
    capabilities: ["Import"],
    functions: ["InformationGrid.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/informationgrid",
    content: `## When to Use It
InformationGrid serves data from a server you address directly, and \`InformationGrid.Contents\` opens it: pass the resolvable host name or IP address and you get a table back, ready to drill into or shape. Import only, generally available, in both Power BI and Power Query Online.
## Before You Start
You need an InformationGrid server the machine can resolve and reach, plus a credential for it; the sign-in kind is a token, presented when the connection is built. The single required argument is the server name, which can be a DNS host name or a literal IP address. Network position matters: if the server sits inside your network, Power Query Online needs a gateway pointing at it, while Desktop on the same network connects directly.
## Connect from the Desktop
In Power BI Desktop, Get Data, search for InformationGrid and Connect. Enter the server name, either a resolvable host name or an IP address, then sign in with your token. The Navigator shows what the server exposes; preview an item or select Transform Data to shape it in the editor.
## Connect in Power Query Online
Pick InformationGrid in the Power Query Online get data experience and enter the server name as the connection setting. Under Connection credentials, create a new connection or reuse an existing one and sign in with the token. If the server is only reachable from your network, select the appropriate gateway; with (none), the service attempts a direct connection, which only works when the host is publicly resolvable. Set the Privacy Level, then continue to Choose data and Transform data.
## Recipes in M
### Connect to the server
\`\`\`powerquery
let
 Source = InformationGrid.Contents("igserver.contoso.com")
in
 Source
\`\`\`
The argument is the server address itself, a host name your machine can resolve; an IP address works in the same position.
### Check the shape before modeling
\`\`\`powerquery
let
 Source = InformationGrid.Contents("igserver.contoso.com"),
 First = Table.FirstN(Source, 30)
in
 First
\`\`\`
A small preview shows what the server returned before any later step starts naming columns or filtering rows.
## Limitations & Tips
- Import only, so the Power BI service refresh path is a scheduled pull with your stored token.
- One required parameter and no optional ones; a host that does not resolve fails the call immediately, which makes typos easy to spot.
- Gateway is the practical risk: authoring on the network can succeed while service refresh fails until a gateway and token are configured for the online path.
- Tokens expire like any credential; when refresh starts failing for every query at once, the token is the first thing to check.`,
  },
  {
    slug: "intunev2",
    name: "Intune Data Warehouse (v2)",
    group: "SaaS & Business Apps",
    tagline:
      "Load Intune Data Warehouse reporting entities into Power BI through the v2 OData feed.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["IntuneV2.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/intunev2",
    content: `## When to Use It
Intune's Data Warehouse is the OData reporting feed Microsoft publishes for device, compliance, and inventory reporting across a tenant. This connector connects straight to that feed, so Intune numbers land in the same model as your asset, HR, or ticketing data instead of a manual export. \`IntuneV2.Contents\` takes the feed URI and returns a table of what the warehouse exposes for your tenant — start there, then narrow rows and columns to the reporting grain you actually publish.
## Before You Start
Authentication is Microsoft Entra ID, and the signing account needs permission to read Intune reporting in the tenant. The one required argument is the feed address itself: in the Intune admin console, open Reports, go to the Data Warehouse page, and copy the OData feed URL shown there. It is a hosted Microsoft service, so Power Query Online refreshes need no gateway. The connector ships in Power BI and Power Query Online, supports Import only, and is still in Preview.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, choose Online Services, select Intune Data Warehouse (v2) and Connect. Paste the OData feed URL into the connection dialog, sign in with your Entra ID account, then pick tables in the Navigator — Load to stage everything, Transform Data to trim first. Keep the URI in one parameter query so a tenant or region change is a one-field edit instead of a hunt through queries.
## Connect in Power Query Online
From the Power Query connect-to-data page, choose Intune Data Warehouse (v2), paste the same OData feed URI into the connection dialog, and sign in with Microsoft Entra ID. Leave the gateway unset — the feed is cloud-hosted — then pick the tables you need in Navigator and select Transform data.
## Recipes in M
The minimal call that opens the warehouse:
\`\`\`powerquery
let
 Source = IntuneV2.Contents("https://fef.amsua0602.manage.microsoft.com/TrafficGateway/TrafficRoutingService/ReportingService/DataWarehouseFEService?api-version=v1.0")
in
 Source
\`\`\`
Before committing anything to the model, profile the result — types and null percentages tell you which columns are worth keeping:
\`\`\`powerquery
let
 FeedUri = "https://fef.amsua0602.manage.microsoft.com/TrafficGateway/TrafficRoutingService/ReportingService/DataWarehouseFEService?api-version=v1.0",
 Source = IntuneV2.Contents(FeedUri),
 Profile = Table.Profile(Source)
in
 Profile
\`\`\`
## Limitations & Tips
Preview status means the shape of the returned table can change between builds, so re-check column names after any update. Import is the only connectivity mode — there is no DirectQuery path to this feed. The URI is required and tenant-specific; the trailing \`options\` parameter is an optional record with no keys documented in the reference, so leave it null until something you need is published. Cloud-hosted source: service refreshes run without a gateway. Because every preview re-queries the warehouse, do exploratory profiling once and iterate on a buffered copy while shaping.`,
  },
  {
    slug: "inwink",
    name: "inwink",
    group: "SaaS & Business Apps",
    tagline:
      "Pull inwink audience, event, or community data into Power BI using customer and scope IDs.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["connect to inwink"],
    capabilities: ["Import"],
    functions: ["inwink.ScopeContents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/inwink",
    content: `## When to Use It
inwink runs events, communities, and audience lists, and this connector reaches one slice of that platform at a time. \`inwink.ScopeContents\` takes three identifiers and returns a table of data for that single scope, which is what makes it a fit for campaign or attendance reporting: you bind a query to one event or one audience, then repeat the pattern per scope and combine downstream.
## Before You Start
You need an inwink account with username and password — that is the sign-in the connector prompts for. On top of the credentials, all three parameters are required: your inwink customer ID (a GUID), the scope kind (Audience, Event, or Community), and the scope ID, which is the audience, event, or community GUID the scope kind refers to. It is a cloud SaaS source, so Power Query Online refreshes run without a gateway. Available in Power BI and Power Query Online; Import only; currently in Preview.
## Connect from the Desktop
In Power BI Desktop: Home > Get Data > Online Services > inwink > Connect. The dialog asks for the inwink customer ID, the scope (Event, Community, or Audience), and the scope ID. Select Sign in and authenticate with your inwink email and password. When the Navigator opens, preview the tables and either Load them or Transform Data to refine the query first.
## Connect in Power Query Online
Select inwink on the Power Query connect-to-data page, create a new connection, and supply the customer ID, scope, and scope ID exactly as you would on the desktop. Authenticate with your inwink email and password. No gateway applies to this cloud source; continue to Navigator and select Transform data.
## Recipes in M
Fetch everything for one event scope:
\`\`\`powerquery
let
 Source = inwink.ScopeContents(
 "662cc909-4695-4fc1-b3f3-b194c63256c4",
 "Event",
 "e63a2cea-3f80-46f5-9b02-7b934dfbbe8a"
 )
in
 Source
\`\`\`
Drop rows where the Status column is empty so half-populated records never reach the model:
\`\`\`powerquery
let
 Source = inwink.ScopeContents(
 "662cc909-4695-4fc1-b3f3-b194c63256c4",
 "Event",
 "e63a2cea-3f80-46f5-9b02-7b934dfbbe8a"
 ),
 Active = Table.SelectRows(Source, each [Status] <> null and [Status] <> "")
in
 Active
\`\`\`
Parameterize the scope so one query template serves every event:
\`\`\`powerquery
let
 CustomerId = "662cc909-4695-4fc1-b3f3-b194c63256c4",
 ScopeId = "e63a2cea-3f80-46f5-9b02-7b934dfbbe8a",
 Source = inwink.ScopeContents(CustomerId, "Community", ScopeId)
in
 Source
\`\`\`
## Limitations & Tips
All three arguments are required — there is no default scope, so a missing GUID fails the refresh immediately. Power BI Desktop tends to auto-create relationships involving the Status column during load; delete those relationships and wire up your own keys instead of accepting the guess. One query covers one scope, which multiplies refresh time as events accumulate — combine scopes only when the model needs them together. Preview status applies, and the source is cloud-hosted, so no gateway is involved in Power Query Online.`,
  },
  {
    slug: "jamf-pro",
    name: "Jamf Pro",
    group: "SaaS & Business Apps",
    tagline:
      "Point Power BI at your Jamf Pro instance and load device management data for analysis.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["API Client Username Password"],
    capabilities: ["Import"],
    functions: ["JamfPro.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/jamf-pro",
    content: `## When to Use It
Jamf Pro is where Mac and mobile inventory, policies, and compliance state live, and this connector reaches the instance you host by URL. \`JamfPro.Contents\` needs only the Jamf Pro address and hands back a table of what your instance exposes, so you can drill into the resources you care about and join device posture against asset or helpdesk data in one model.
## Before You Start
Sign-in uses API client credentials — username and password for the API client — so create those in Jamf Pro before you start and grant them read access to the objects you plan to report on. The only other input is the Jamf Pro URL itself. Jamf Pro is a cloud service from Power Query's point of view, so Power Query Online refreshes need no gateway when the instance is publicly reachable. The connector is generally available, supports Import, and appears in both Power BI and Power Query Online.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, pick Online Services, select Jamf Pro and Connect. Enter your Jamf Pro URL, then authenticate with the API client username and password when prompted. The Navigator lists what the connection returned; preview it, then Load or Transform Data. If your instance sits behind a private hostname, resolve that before publishing to the service.
## Connect in Power Query Online
On the connect-to-data page, pick Jamf Pro, enter the instance URL, and authenticate with the API client username and password. The connection runs with no gateway as long as the Jamf URL resolves from the internet. Choose your tables in Navigator, then select Transform data to refine them.
## Recipes in M
Open the connection with the instance URL:
\`\`\`powerquery
let
 Source = JamfPro.Contents("https://contoso.jamfcloud.com")
in
 Source
\`\`\`
Drill into a single resource by the name your Navigator shows, rather than loading every row of the navigation table:
\`\`\`powerquery
let
 Source = JamfPro.Contents("https://contoso.jamfcloud.com"),
 Computers = Source{[Name = "computers"]}[Data]
in
 Computers
\`\`\`
Replace the name with the exact value from your instance's Navigator preview; drilling by Name keeps the query stable regardless of how the Navigator sorts.
## Limitations & Tips
Import is the only mode, so very large device fleets materialize in full at each refresh — filter and select columns right after the drill instead of later in the query. One URL parameter drives the whole connection; if you administer several Jamf instances, keep one query per instance and append in a separate query. Credentials are API client username and password, so rotate them on the same schedule you rotate other service accounts. The source is cloud-hosted and needs no gateway in Power Query Online, as long as the Jamf URL resolves from the internet.`,
  },
  {
    slug: "kognitwin",
    name: "Kognitwin",
    group: "SaaS & Business Apps",
    tagline:
      "Bring the data published by your Kognitwin environment into Power BI with one URL.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["Kognitwin.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/kognitwin",
    content: `## When to Use It
Kognitwin environments publish the data your organization keeps about physical assets and their operating context, and this connector reads that environment directly. \`Kognitwin.Contents\` takes the environment URL and returns a table of what the connection exposes, which makes it the right pick when Kognitwin figures need to be modeled next to maintenance, telemetry, or financial data rather than exported by hand.
## Before You Start
Sign-in is OAuth, so you need an account entitled to read the environment you point at. The single required parameter is the Kognitwin URL — the sample in the reference uses \`https://example.kognitwin.com\`, and yours is the address of your own environment. It is a cloud-hosted source, so Power Query Online refreshes run with no gateway. The connector is generally available, supports Import, and works from Power BI and Power Query Online.
## Connect from the Desktop
From Power BI Desktop, Home > Get Data > Online Services > Kognitwin > Connect. Enter the Kognitwin URL for your environment, complete the OAuth sign-in, and continue into the Navigator. Select the data you need and choose Load to stage it or Transform Data to shape it in the Power Query editor first.
## Connect in Power Query Online
Choose Kognitwin from the connector list, create a new connection carrying the environment URL, and complete the OAuth sign-in with your organizational account. A cloud environment needs no data gateway; proceed to Navigator and select Transform data.
## Recipes in M
Connect with the environment address:
\`\`\`powerquery
let
 Source = Kognitwin.Contents("https://example.kognitwin.com")
in
 Source
\`\`\`
List the columns the connection handed back before you pick any for the model:
\`\`\`powerquery
let
 Source = Kognitwin.Contents("https://example.kognitwin.com"),
 Columns = Table.ColumnNames(Source)
in
 Columns
\`\`\`
Run this once per environment upgrade; if the column list shifts, you will see it here rather than in a broken report.
## Limitations & Tips
The connector is a single-URL wrapper with no filtering parameters, so narrowing happens after the call — keep the shaping steps light to preserve query folding where the backend supports it. Import only, no DirectQuery, which means every refresh materializes the full result set. OAuth tokens are cached per user; when a refresh fails in the service, re-verify the sign-in before assuming an API problem. Cloud source, no gateway required in Power Query Online. As always, buffer only when you must — repeated previews otherwise re-query the environment.`,
  },
  {
    slug: "leap",
    name: "LEAP",
    group: "SaaS & Business Apps",
    tagline:
      "Load LEAP admin-level practice data into Power BI with a parameterless call.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["LEAP.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/leap",
    content: `## When to Use It
LEAP holds the matters, contacts, and practice records your firm runs on, and this connector reads it at the admin level. \`LEAP.Contents()\` takes no arguments at all — it connects and returns a table of relevant LEAP data, which makes it a quick way to get practice reporting scheduled without hunting for endpoint URLs or scope identifiers. Shape it down immediately: the function gives you the extract, not a filtered view.
## Before You Start
You need a LEAP Admin user account; that is the account the sign-in expects. Authentication is OAuth through an organizational account, and there are no parameters to configure beyond signing in. It is a cloud source, so Power Query Online refreshes run without a gateway. The connector is available in Power BI and Power Query Online, supports Import, and is in Preview — the desktop dialog may show a preview notice the first time you connect.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data > Online Services, select LEAP (Beta) and Connect. Acknowledge the preview notice if it appears, then choose Sign in and enter your LEAP Admin credentials. When the Navigator opens, pick what you want and either Load it or Transform Data to edit the query before loading.
## Connect in Power Query Online
Select LEAP (Beta) in the connector list and create a new connection with the data gateway left empty, since the source is cloud-hosted. The authentication kind is an organizational account: sign in to your LEAP Admin credentials — required again after a password change — then pick your data in Navigator and Transform data.
## Recipes in M
Open the connection — there is nothing to pass:
\`\`\`powerquery
let
 Source = LEAP.Contents()
in
 Source
\`\`\`
Profile the returned table before wiring it into a model, so column types and null density are known facts rather than surprises:
\`\`\`powerquery
let
 Source = LEAP.Contents(),
 Profile = Table.Profile(Source)
in
 Profile
\`\`\`
Use the profile output to decide which columns to keep, then delete everything else in the editor.
## Limitations & Tips
Preview status applies, and with no parameters the function always returns the whole extract — the cost of every refresh is fixed whether you use one column or twenty, so prune early. Import is the only connectivity mode. The required credential is a LEAP Admin account, which is broader than most report readers need; keep the query under a service identity rather than an individual's login when you publish. No gateway is needed for Power Query Online since the source is cloud-hosted. If a refresh suddenly returns fewer rows, check the admin account's access first.`,
  },
  {
    slug: "linkedin-learning",
    name: "LinkedIn Learning - Power BI",
    group: "SaaS & Business Apps",
    tagline:
      "Extract LinkedIn Learning course and learner engagement data into Power BI without CSV exports.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["LinkedIn Learning"],
    capabilities: ["Import"],
    functions: ["LinkedInLearning.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/linkedin-learning",
    content: `## When to Use It
LinkedIn Learning reporting is normally a download-and-merge chore; this connector turns it into a query. \`LinkedInLearning.Contents\` accepts an optional start and end datetime and returns a table of learner engagement and course information, so you can report on training participation over periods longer than a year and refresh it on a schedule instead of dropping CSVs into a folder.
## Before You Start
You need LinkedIn Learning admin access to generate API keys — a Client ID and Client Secret, created with the content and report options enabled — and those are what the connection authenticates with. Some capabilities may not be switched on by default and can require LinkedIn to enable them for your account; learner license status is not exposed by the reporting API at all. It is a cloud source, so Power Query Online refreshes need no gateway. Available in Power BI and Power Query Online, Import mode, generally available.
## Connect from the Desktop
In Power BI Desktop, open File > Get Data, search for LinkedIn Learning, select the connector and confirm. In the credentials step, paste the Client ID and Client Secret from your LinkedIn Learning admin area (Admin > Me > Integrate). Once connected, the Navigator shows the available data; choose Load or Transform Data. Use a current Power BI build so you are on the latest connector version.
## Connect in Power Query Online
From the connect-to-data page, select LinkedIn Learning and provide the Client ID and Client Secret generated in the LinkedIn Learning admin area. The source is cloud-hosted, so no gateway applies; select Next, choose your data in Navigator, and continue to Transform data.
## Recipes in M
Pull a fixed reporting window:
\`\`\`powerquery
let
 Source = LinkedInLearning.Contents(
 #datetime(2025, 1, 1, 0, 0, 0),
 #datetime(2025, 6, 30, 23, 59, 59)
 )
in
 Source
\`\`\`
Roll the window forward on every refresh so the query always asks for the period since a fixed start rather than filtering after the load:
\`\`\`powerquery
let
 Start = #datetime(2025, 1, 1, 0, 0, 0),
 Finish = DateTime.LocalNow(),
 Source = LinkedInLearning.Contents(Start, Finish)
in
 Source
\`\`\`
## Limitations & Tips
Both parameters are optional — passing nothing (or \`null\` for each) requests everything the connector will return, which is convenient for a first load and expensive for a scheduled one. Learner license status cannot be retrieved through the reporting API, so it will not appear in this data no matter how you shape the query. Some features depend on LinkedIn enabling them for your account; if a dataset is missing, that is the first thing to check. Import only, no gateway needed. When a refresh fails, open the warning details on the failing step — the error message there identifies whether the credentials or the window is at fault.`,
  },
  {
    slug: "linkedin-sales-navigator",
    name: "LinkedIn Sales Navigator",
    group: "SaaS & Business Apps",
    tagline:
      "Query LinkedIn Sales Navigator contract reporting for a chosen date window inside Power BI.",
    products: ["Power BI"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["LinkedIn.SalesNavigator"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/linkedin-sales-navigator",
    content: `## When to Use It
Sales Navigator keeps the pipeline activity your sales team generates; this connector pulls its contract reporting into Power BI. \`LinkedIn.SalesNavigator\` asks which contracts to report on — all of them or a selection — plus an optional start and end date, and returns a table for that window. It is the pick when you want engagement and contract metrics modeled alongside CRM data rather than reviewed inside the Sales Navigator UI.
## Before You Start
You need a LinkedIn Sales Navigator account with reporting access to the contracts you want to read. Sign-in is OAuth, and use the same email address you sign into Sales Navigator with on the web or authentication will not match your entitlements. The contract selector accepts all contracts or selected contracts; you refine which contracts in the Query Editor as the data loads. This connector is Power BI only — there is no Power Query Online path — and it is in Preview with Import as the only mode.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data > Online Services, scroll to LinkedIn Sales Navigator (Beta) and Connect. Acknowledge the third-party preview notice, then choose whether to return data for all contracts or selected contracts and set the start and end dates. Sign in with your Sales Navigator email address, pick the data in the Navigator, and Load or Transform Data.
## Recipes in M
A bounded window over every contract you can report on:
\`\`\`powerquery
let
 Source = LinkedIn.SalesNavigator(
 "All Contracts",
 #date(2025, 9, 1),
 #date(2025, 11, 30)
 )
in
 Source
\`\`\`
Reproduce the connector's default — the trailing 90 days ending today — but keep it dynamic so scheduled refreshes always ask for a current window:
\`\`\`powerquery
let
 Finish = Date.From(DateTime.LocalNow()),
 Start = Date.AddDays(Finish, -90),
 Source = LinkedIn.SalesNavigator("All Contracts", Start, Finish)
in
 Source
\`\`\`
## Limitations & Tips
Preview status applies, so expect the contract selector and returned columns to move. Only Power BI is supported, so this data cannot be loaded through a dataflow in Power Query Online, and there is no DirectQuery mode. \`selectContracts\` is required while both dates are optional: leave the start blank and the connector defaults to 90 days back from the end date; leave the end blank and it defaults to today. Narrow windows refresh faster than open-ended ones, and the Query Editor is where you narrow the contract selection — decide that once per query rather than per refresh.`,
  },
  {
    slug: "marketo",
    name: "Marketo",
    group: "SaaS & Business Apps",
    tagline:
      "Fetch Marketo REST data from a chosen start date straight into a Power BI model.",
    products: ["Power BI"],
    authentication: ["Marketo"],
    capabilities: ["Import"],
    functions: ["Marketo.Tables"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/marketo",
    content: `## When to Use It
Marketo holds the marketing activity — programs, leads, engagement — that revenue reporting depends on. This connector reads from your Marketo REST API endpoint starting at a date you specify and returns a table of that Marketo data, which suits incremental marketing marts: anchor a start date, load what happened since, and append it in the model. \`Marketo.Tables\` is the entry point and both of its arguments are mandatory.
## Before You Start
Authentication uses Marketo credentials — sign in with the account authorized for the connector. You need two values ready: the Marketo REST API endpoint, which looks like \`https://100-AAA-900.mktorest.com/rest\`, and the query start date that bounds the pull. This connector is Power BI only, so there is no Power Query Online or dataflow option, and it is currently in Preview with Import as the only connectivity mode.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data > Online Services, select Marketo and Connect. Enter the Marketo REST API endpoint and the start date in the dialog, then sign in when prompted. The Navigator opens on the returned data — Load to take it as-is, or Transform Data to filter and shape before it enters the model.
## Recipes in M
Load everything from a fixed anchor date:
\`\`\`powerquery
let
 Source = Marketo.Tables(
 "https://100-AAA-900.mktorest.com/rest",
 #date(2025, 1, 1)
 )
in
 Source
\`\`\`
Slide the anchor on each refresh so a scheduled report only pulls the last 30 days and lets the model handle history:
\`\`\`powerquery
let
 QueryStart = Date.AddDays(Date.From(DateTime.LocalNow()), -30),
 Source = Marketo.Tables(
 "https://100-AAA-900.mktorest.com/rest",
 QueryStart
 )
in
 Source
\`\`\`
## Limitations & Tips
Both parameters are required — there is no way to call the function without an endpoint and a start date, so an empty date fails the refresh outright. Preview status means the returned table can change shape between builds. Because the start date drives how much data is read, keep it as late as your model allows: a rolling anchor plus append logic refreshes far faster than re-reading months of activity. Power BI only, Import only — plan for full materialization each refresh, and store the endpoint as a parameter so environment changes stay in one place.`,
  },
  {
    slug: "onestream",
    name: "OneStream",
    group: "SaaS & Business Apps",
    tagline:
      "Load OneStream cube, dimension, and adapter data into Power BI from your environment URL.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["OneStream.Navigation"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/onestream",
    content: `## When to Use It
OneStream carries the financial consolidation, planning, and reporting logic that finance teams own, and this connector reaches your environment by URL. \`OneStream.Navigation\` returns a navigation table whose rows are the calls the connector supports — Get Cube, Get Custom Adapter, Get Dimension, and Get Member Properties — so you drill into the one you need, pull cube views or adapter output into Power BI, and leave the calculations where they belong.
## Before You Start
Your OneStream platform must be version 8.2 or higher, and the environment URL must start with \`https://\` or the connection will not resolve. Authentication is OAuth: selecting Sign in redirects you to the OneStream Identity Server, where you log in with your organizational account before the Navigator appears. The source is cloud-hosted, so Power Query Online refreshes need no gateway. The connector is generally available, Import only, and present in both Power BI and Power Query Online.
## Connect from the Desktop
In Power BI Desktop, open Get Data and search for OneStream, then select it and Connect. Enter the environment URL including the \`https://\` prefix — omitting it is the most common reason the first attempt fails — and select OK. Sign in through the OneStream Identity Server, then choose the functions you want in the Navigator and Load or Transform Data.
## Connect in Power Query Online
Choose OneStream from the connector list and enter the environment URL with the https:// prefix. Sign in with your organizational account, which redirects to the OneStream Identity Server, then on the Choose data page pick the functions you want — Get Cube, Get Dimension, and the rest — and select Transform data.
## Recipes in M
Open the navigation table for your environment:
\`\`\`powerquery
let
 Source = OneStream.Navigation("https://customer.onestreamcloud.com")
in
 Source
\`\`\`
Drill into one of the callable lookups instead of browsing the whole navigation table every refresh:
\`\`\`powerquery
let
 Source = OneStream.Navigation("https://customer.onestreamcloud.com"),
 Cube = Source{[Name = "Get Cube"]}[Data]
in
 Cube
\`\`\`
The Name values mirror the functions your instance exposes; confirm the exact text against your Navigator preview.
## Limitations & Tips
Import is the only mode, so the data you select is what refreshes materialize — request only the grain the report uses rather than daily detail for a monthly visual. The platform version floor is 8.2; older environments will not connect. Keep heavy financial logic in OneStream by reading cube views or data adapters that already compute it, instead of rebuilding consolidation rules in M. Limit the number of transformation steps, since each one is a chance for the query to fail, and for large extracts split the pull across several queries and combine in Power BI. Cloud source, no gateway required.`,
  },
  {
    slug: "oracle-erp",
    name: "Oracle ERP",
    group: "SaaS & Business Apps",
    tagline:
      "Point Power BI at your Oracle ERP application URL and load its reporting tables for finance models.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["OracleERP.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/oracle-erp",
    content: `## When to Use It
Oracle ERP is the system of record for general ledger, payables, and procurement activity, and this connector reaches it through the application URL. \`OracleERP.Contents\` takes that URL and returns a table of what the instance exposes for reporting, which makes it a natural fit for finance models that blend ERP balances with budgeting or operational data. The call is deliberately thin: one address in, one table out, then you shape.
## Before You Start
Authentication is Basic — username and password — so use a dedicated reporting account rather than a personal admin login, and grant it only the reporting access the dashboards need. The single required argument is the application URL of your ERP instance. Because the endpoint is a hosted service by default, Power Query Online refreshes normally run without a gateway; if your instance resolves only inside your corporate network, attach an on-premises gateway instead. Available in Power BI and Power Query Online, Import only, and in Preview.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data > Online Services, select Oracle ERP and Connect. Enter the application URL, then supply the Basic credentials when prompted. The Navigator shows the returned data — Load it directly, or Transform Data to trim columns and rows before the model sees them.
## Connect in Power Query Online
Select Oracle ERP on the connect-to-data page, enter the application URL, and authenticate with the Basic username and password. A publicly reachable endpoint needs no gateway; an internal one must be routed through an on-premises gateway connection you configure beforehand. Pick your data and Transform data.
## Recipes in M
Connect with the application URL:
\`\`\`powerquery
let
 Source = OracleERP.Contents("https://contoso.oraclecloud.com")
in
 Source
\`\`\`
Buffer a bounded slice while you explore, so each click in the editor does not re-query the ERP endpoint:
\`\`\`powerquery
let
 Source = OracleERP.Contents("https://contoso.oraclecloud.com"),
 Buffered = Table.Buffer(Source),
 Preview = Table.FirstN(Buffered, 1000)
in
 Preview
\`\`\`
Use this while deciding on columns; drop the buffering and the row cap before publishing the final query.
## Limitations & Tips
Preview status applies — column names and types from the ERP endpoint can shift, so re-validate after upgrades. Basic authentication means the password lives in the credential store; rotate it deliberately and keep the account read-only. There is one required parameter and no filter argument, so selection happens after the call: filter early to keep refreshes quick. Import only, no DirectQuery, and no options record to pass. If refreshes in the service start failing after working on the desktop, check whether the URL is publicly resolvable — that is the usual gateway question for this connector.`,
  },
  {
    slug: "palantir-foundry-datasets",
    name: "Palantir Foundry",
    group: "SaaS & Business Apps",
    tagline:
      "Load Foundry datasets into Power BI with Import or DirectQuery, RID and branch optional.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth", "Foundry Client Credentials Foundry Foundry Token"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["Foundry.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/palantir-foundry-datasets",
    content: `## When to Use It
Palantir Foundry datasets are the governed tables your data engineers publish, and this connector reads them straight into Power BI. \`Foundry.Contents\` takes the environment's base URL with an optional dataset RID and branch, and returns a table you can either browse through the Navigator or address directly by RID. It is one of the few connectors here offering DirectQuery for Power BI semantic models, which matters when the Foundry dataset is large and you would rather query it live than copy it.
## Before You Start
You need an active Foundry environment and the Foundry datasets ODBC driver installed. Sign-in options are OAuth (with the Power BI third-party application enabled by an administrator in Control Panel), Foundry client credentials, or a Foundry token. One detail differs from the usual cloud connector: in Power Query Online this connection runs through an on-premises gateway that already holds a connection to Foundry — set that up before you publish a dataflow. Power BI and Power Query Online are supported; the connector is generally available with Import and DirectQuery (for Power BI semantic models).
## Connect from the Desktop
In Get Data, select Palantir Foundry and Connect. Enter the base URL of your environment (for example \`https://subdomain.palantirfoundry.com/\`), optionally a dataset RID and a branch, then choose Import or DirectQuery. Sign in with Foundry OAuth (recommended) or paste a Foundry token, and continue to the Navigator to pick datasets and load or transform them.
## Connect in Power Query Online
Select Palantir Foundry on the connect-to-data page and supply a Base URL that already exists as an on-premises gateway connection — this connector requires the gateway. Add an RID or branch if needed, then Transform data.
## Recipes in M
Read a specific dataset directly by its RID:
\`\`\`powerquery
let
 Source = Foundry.Contents(
 "https://contoso.palantirfoundry.com/",
 "ri.foundry.main.dataset.00000000-1111-2222-3333-444444444444"
 )
in
 Source
\`\`\`
Browse first, then drill into a dataset by the name your Navigator shows:
\`\`\`powerquery
let
 Source = Foundry.Contents("https://contoso.palantirfoundry.com/"),
 Dataset = Source{[Name = "sales_transactions"]}[Data]
in
 Dataset
\`\`\`
Swap in the dataset name from your own Navigator; drilling by Name keeps the query independent of row order.
Read from a non-default branch when validating changes before they reach master:
\`\`\`powerquery
let
 Source = Foundry.Contents("https://contoso.palantirfoundry.com/", null, "develop")
in
 Source
\`\`\`
## Limitations & Tips
DirectQuery applies to Power BI semantic models only — it is not a dataflow capability, and a dataflow path still goes through the gateway. The ODBC driver is a hard prerequisite on any machine that connects, including the gateway host, and Power Query Online requires an existing gateway connection to Foundry with a matching base URL. RID and branch are optional: omit the RID to browse, pass it to pin one dataset. DirectQuery pushes filtering questions to the backend, so prefer it for wide, rarely-copied datasets and Import for shaped extracts.`,
  },
  {
    slug: "planview-enterprise-architecture",
    name: "Planview Enterprise Architecture",
    group: "SaaS & Business Apps",
    tagline:
      "Feed Planview Enterprise Architecture model data into Power BI over its OData endpoint.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["Troux.Feed"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/planview-enterprise-architecture",
    content: `## When to Use It
Planview Enterprise Architecture (formerly Troux) holds the application, capability, and technology maps that architecture teams curate. This connector reads from the OData feed URL of that environment: \`Troux.Feed\` takes the address and returns a table of Enterprise Architecture data, ready to blend with cost, ownership, or portfolio facts in a Power BI model. Use it when architecture mappings need to drive reporting rather than sit in the tool.
## Before You Start
Authentication is Basic — username and password — so prepare an account with access to the Enterprise Architecture feed and keep it read-only. The one required parameter is the OData feed URL; the dialog's own hint uses \`https://www.contoso.com\` as the shape of the value. If the feed resolves from the internet, Power Query Online refreshes run without a gateway; if it is only reachable inside your network, attach an on-premises gateway first. The connector is generally available, Import only, and offered in Power BI and Power Query Online.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data > Online Services, select Planview Enterprise Architecture and Connect. Enter the OData feed URL and authenticate with the Basic credentials when prompted. The Navigator opens on the feed contents; preview, then Load or Transform Data to narrow the query before it enters the model.
## Connect in Power Query Online
On the connect-to-data page, pick Planview Enterprise Architecture, enter the OData feed URL, and sign in with the Basic credentials. Attach a gateway connection first when the feed is internal; a publicly reachable feed needs none. Select your data and Transform data.
## Recipes in M
Open the feed with its URL:
\`\`\`powerquery
let
 Source = Troux.Feed("https://www.contoso.com")
in
 Source
\`\`\`
Check the inferred column types before mapping the result into a star schema — architecture feeds tend to return identifiers as text and numeric measures inconsistently:
\`\`\`powerquery
let
 Source = Troux.Feed("https://www.contoso.com"),
 Schema = Table.Schema(Source)
in
 Schema
\`\`\`
Use the schema output to decide which conversions belong in the query and which can wait for the model.
## Limitations & Tips
Both arguments beyond the URL are absent: there is only one required parameter and no filter option, so selection happens after the call, where query folding is limited against OData backends. Basic authentication stores a password in the credential store, so use a service account and rotate deliberately. Enterprise architecture models can be wide; select just the columns the report uses and refresh on a schedule rather than on demand. Import only, no DirectQuery. Gateway needs depend entirely on where the feed is hosted — test the URL from outside your network before publishing.`,
  },
  {
    slug: "planview-ideaplace",
    name: "Planview IdeaPlace",
    group: "SaaS & Business Apps",
    tagline:
      "Bring Planview IdeaPlace innovation data into Power BI through its OData URL.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["Spigit.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/planview-ideaplace",
    content: `## When to Use It
Planview IdeaPlace (Spigit) is where idea submissions, votes, and innovation pipelines live. This connector reads that data from the IdeaPlace OData URL: \`Spigit.Contents\` takes the address and returns a table of the connector's Planview IdeaPlace data, which is what you want when idea-stage reporting has to sit next to product or financial figures in one model. One argument in, one table out — the shaping is yours.
## Before You Start
Sign-in is OAuth, and the account must be entitled to read the IdeaPlace OData feed you pass in. The single required parameter is the Planview IdeaPlace OData URL for your instance. The service is cloud-hosted, so Power Query Online refreshes run without a gateway as long as the URL is publicly reachable. The connector is generally available, supports Import only, and appears in both Power BI and Power Query Online.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data > Online Services, select Planview IdeaPlace and Connect. Enter the OData URL for your instance, complete the OAuth sign-in, then review the Navigator preview. Load the selection as-is or choose Transform Data to filter stages and drop unused columns first.
## Connect in Power Query Online
Choose Planview IdeaPlace from the connector list, enter the instance OData URL in a new connection, and complete the OAuth sign-in. The endpoint is cloud-hosted, so leave the gateway out. Continue to Navigator, select the data, and Transform data.
## Recipes in M
Connect with the OData URL:
\`\`\`powerquery
let
 Source = Spigit.Contents("https://contoso.ideaplace.com")
in
 Source
\`\`\`
Confirm what the feed actually returned before you reference any column in a step downstream:
\`\`\`powerquery
let
 Source = Spigit.Contents("https://contoso.ideaplace.com"),
 Columns = Table.ColumnNames(Source)
in
 Columns
\`\`\`
If the list is empty or shorter than expected, the problem is the feed address or permissions, not your transformation code.
## Limitations & Tips
The connector exposes exactly one required parameter and no options record, so all filtering happens after the call. Import only — large innovation histories materialize fully at each refresh, so select the few columns the report needs right after connecting. OAuth sign-in is per user; refreshes in the service use the stored credential, so re-authenticate when it expires. Preview status does not apply here — the connector is generally available — but the OData surface itself can change on the provider side, which shows up as missing columns after an upgrade. Cloud source, no gateway needed in Power Query Online.`,
  },
  {
    slug: "planview-okr",
    name: "Planview OKR",
    group: "SaaS & Business Apps",
    tagline:
      "Pull Planview OKR objective and key result data into Power BI from its OData URL.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["PlanviewOKR.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/planview-okr",
    content: `## When to Use It
Planview OKR carries the objectives, key results, and progress updates the business tracks quarterly. This connector reads them from the Planview OKR OData URL: \`PlanviewOKR.Contents\` takes that address and returns a table of Planview OKR data, so goal progress can be reported next to delivery or revenue data instead of screenshot into slide decks. It is a direct, single-argument path to the feed.
## Before You Start
You need a Planview Admin account — that is the credential the sign-in expects — and authentication is OAuth. The one required parameter is the OData URL of your Planview OKR account; the desktop dialog labels it the Planview OKR OData URL. Cloud-hosted source, so Power Query Online refreshes need no gateway when the URL is reachable from the internet. Available in Power BI and Power Query Online, Import only, and currently in Preview — the desktop entry appears as Planview OKR (Beta).
## Connect from the Desktop
In Power BI Desktop, Home > Get Data > Online Services, select Planview OKR (Beta) and Connect. Acknowledge the preview notice if one appears, enter the Planview OKR OData URL, and select OK. Choose Sign in, provide your Planview Admin credentials, then select Connect again. In the Navigator, pick the data and Load or Transform Data.
## Connect in Power Query Online
Select Planview OKR (Beta) on the connect-to-data page, enter the Planview OKR OData URL, and sign in to your Planview Admin account — that step reappears the first time you connect or after a credential change. No gateway applies. Pick your data in Navigator, then Transform data.
## Recipes in M
Open the OKR feed:
\`\`\`powerquery
let
 Source = PlanviewOKR.Contents("https://contoso.planview.com")
in
 Source
\`\`\`
Sanity-check the row count after a refresh so a quietly truncated feed is caught here rather than in a chart that suddenly looks wrong:
\`\`\`powerquery
let
 Source = PlanviewOKR.Contents("https://contoso.planview.com"),
 Rows = Table.RowCount(Source)
in
 Rows
\`\`\`
Comparing this number across refreshes is the cheapest possible data-quality gate.
## Limitations & Tips
Preview status applies: expect the returned columns to shift, and re-check your steps after connector updates. The OData URL is the only parameter, so there is no pushdown argument — keep the query simple and let the feed return what it returns, filtering in the model afterwards. The required sign-in is a Planview Admin account, which is more privilege than a report reader needs; publish under a service identity. Import only, no DirectQuery, and the source is cloud-hosted, so no gateway is involved. First-time desktop connections show a preview notice — dismiss it once and move on.`,
  },
  {
    slug: "planview-portfolios",
    name: "Planview Portfolios",
    group: "SaaS & Business Apps",
    tagline:
      "Query Planview Portfolios data by URL and database name straight into Power BI.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["PlanviewEnterprise.Feed"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/planview-portfolios",
    content: `## When to Use It
Planview Portfolios is the work and investment management system this connector reads, and it identifies a source in two parts: the server address and the database on it. \`PlanviewEnterprise.Feed\` takes both — the Planview Portfolios URL and the database name — and returns a table of Planview Portfolios data, which suits reporting that spans projects, resources, and financials in one place.
## Before You Start
Authentication is Basic: username and password, so provision a read-only reporting account and grant it access to the databases you query. Two parameters are required — the Planview Portfolios URL (the dialog hints \`https://contoso.com/planview\`) and the database name (the reference samples \`pve\`). If the URL is only resolvable inside your network, Power Query Online refreshes will need an on-premises gateway; a public endpoint needs none. The connector is generally available, Import only, and works from Power BI and Power Query Online.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data > Online Services, select Planview Portfolios and Connect. Enter the Planview Portfolios URL and the database name in the dialog, then authenticate with the Basic credentials when prompted. The Navigator previews the returned table — Load it or Transform Data to shape it before loading.
## Connect in Power Query Online
From the connect-to-data page, select Planview Portfolios and provide both the URL and the database name in a new connection, then authenticate with the Basic username and password. If the server resolves only internally, attach a gateway connection first. Continue to Navigator and Transform data.
## Recipes in M
Connect to a single database:
\`\`\`powerquery
let
 Source = PlanviewEnterprise.Feed(
 "https://contoso.com/planview",
 "pve"
 )
in
 Source
\`\`\`
Read two databases from the same server and append them when the model needs a combined view — swap in your own database names:
\`\`\`powerquery
let
 Base = "https://contoso.com/planview",
 Primary = PlanviewEnterprise.Feed(Base, "pve"),
 Secondary = PlanviewEnterprise.Feed(Base, "ppm"),
 Combined = Table.Combine({Primary, Secondary})
in
 Combined
\`\`\`
Keeping \`Base\` in one place means a server migration is a single edit for both calls.
## Limitations & Tips
Both parameters are required — the function will not guess a database, and a wrong name fails the refresh immediately. Basic authentication stores a password per user; publish under a service account and rotate it deliberately. There are no filtering arguments, so keep the append queries lean and select only the columns the model uses; each extra database multiplies refresh time. Import only, no DirectQuery. Gateway requirements follow the URL: test whether it resolves outside your network before you schedule anything in the service.`,
  },
  {
    slug: "planview-projectplace",
    name: "Planview ProjectPlace",
    group: "SaaS & Business Apps",
    tagline:
      "Load Planview ProjectPlace project data into Power BI from its OData URL.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["PlanviewProjectplace.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/planview-projectplace",
    content: `## When to Use It
Planview ProjectPlace holds projects, tasks, and collaboration activity, and this connector reads it through the OData URL for your instance. \`PlanviewProjectplace.Contents\` takes that address and returns a table of Planview ProjectPlace data — the right pick when delivery status from ProjectPlace has to be reported alongside financials or resource plans in Power BI.
## Before You Start
Authentication is OAuth, so sign in with an account that has access to the ProjectPlace OData feed. The single required parameter is the Planview ProjectPlace OData URL of your instance. It is a cloud source: Power Query Online refreshes run without a gateway as long as the URL is reachable from the internet. The connector is generally available, supports Import only, and is available in both Power BI and Power Query Online.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data > Online Services, select Planview ProjectPlace and Connect. Enter the OData URL for your instance, complete the OAuth sign-in, and continue to the Navigator. Preview the returned table, then choose Load or Transform Data — shaping first is usually worth it, since project tables carry many columns you will not chart.
## Connect in Power Query Online
Select Planview ProjectPlace, enter the OData URL for your instance in a new connection, and sign in with your organizational account. The endpoint is cloud-hosted, so no gateway is involved. Continue to Navigator and select Transform data to shape the table before it lands.
## Recipes in M
Connect with the OData URL:
\`\`\`powerquery
let
 Source = PlanviewProjectplace.Contents("https://contoso.projectplace.com")
in
 Source
\`\`\`
Pull a bounded slice while deciding which columns the report needs, so repeated previews do not re-read the whole feed each time:
\`\`\`powerquery
let
 Source = PlanviewProjectplace.Contents("https://contoso.projectplace.com"),
 Sample = Table.FirstN(Source, 500)
in
 Sample
\`\`\`
Once the column list is settled, delete the row cap and publish the full query.
## Limitations & Tips
Treat this as a one-parameter connector: the URL is required and there are no filter arguments, so all narrowing happens after the call. Import only — every refresh materializes the full result, which is fine for project lists but heavy for large task histories. OAuth sign-in is stored per user; when a scheduled refresh fails with an authentication error, re-authenticate rather than editing the query. No gateway is required for Power Query Online given the cloud endpoint. The connector is generally available, so column changes here come from the provider's OData surface rather than from a preview build.`,
  },
  {
    slug: "profisee",
    name: "Profisee",
    group: "SaaS & Business Apps",
    tagline:
      "Load Profisee master data entities into Power BI through a navigation table.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["Profisee.Tables"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/profisee",
    content: `## When to Use It
Profisee is the master data layer — golden records for customers, products, and reference entities — and this connector exposes it as a navigation table of Profisee entities. \`Profisee.Tables\` takes the instance URL and returns that navigation table, so you drill into the entity you want and model governed records alongside transactions from other systems. It is the cleanest way to get MDM values into Power BI without flattening exports.
## Before You Start
You need a Profisee account with username and password, plus a running Profisee instance at version 2022.R1 or higher. Sign-in uses OAuth through your organizational account once the connection is created. The required parameter is the Profisee instance URL — the reference samples \`https://server/profisee\`. Profisee is reached as a hosted service here, so Power Query Online refreshes need no gateway when the URL is publicly resolvable. The connector is generally available, Import only, in Power BI and Power Query Online.
## Connect from the Desktop
In Power BI Desktop, open Home > Get Data, search Profisee or pick it under Online Services, and Connect. Enter the instance URL, then sign in through the authentication service the first time. The Navigator lists every entity in the instance — use the search box to find one by name — and then Load or Transform Data.
## Connect in Power Query Online
Choose Profisee on the connect-to-data page, enter the instance URL, and sign in with your organizational account; no gateway is required while the instance is reachable. On the Choose data page select the entities you need and Transform data — the relationships between them still have to be built in the model yourself.
## Recipes in M
Open the navigation table for the instance:
\`\`\`powerquery
let
 Source = Profisee.Tables("https://server/profisee")
in
 Source
\`\`\`
Drill into one entity by name instead of loading every entity the Navigator lists:
\`\`\`powerquery
let
 Source = Profisee.Tables("https://server/profisee"),
 Customer = Source{[Name = "Customer"]}[Data]
in
 Customer
\`\`\`
Name values come from your own instance; check the Navigator preview for the exact spelling, and drilling by Name keeps the query stable across sorts.
## Limitations & Tips
Note the behaviors that shape your model: relationships defined in Profisee are not carried into the Power BI model, so create and verify relationships yourself after the entities load. Only one parameter — the URL — is required, and there is no filtering argument, so keep each drilled entity narrow. Import only, no DirectQuery. The instance must be at 2022.R1 or later or the connection will not behave as documented. Cloud source, no gateway needed in Power Query Online when the URL resolves publicly; otherwise attach one. Prefer drilling into named entities over loading the whole navigation table to keep refreshes quick.`,
  },
  {
    slug: "quickbase",
    name: "Quickbase",
    group: "SaaS & Business Apps",
    tagline:
      "Connect Power BI to a Quickbase application and load its tables through the app URL.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Usertoken"],
    capabilities: ["Import"],
    functions: ["QuickBase.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/quickbase",
    content: `## When to Use It
Quickbase applications hold the operational data — intake forms, tracked assets, process records — that teams run in no-code tables. This connector reaches one application at a time: \`QuickBase.Contents\` takes the application URL and returns a navigation table of the app's tables, so you drill into the table you need, then join Quickbase records against your other sources in one model.
## Before You Start
Authentication is a Quickbase user token: generate one for an account with read access to the application and store it as the credential for the connection. The required parameter is the application URL, in the form of the Quickbase domain plus the application's ID — the dialog spells this out as \`https://domain/db/appID\`, and the reference samples \`https://realm.quickbase.com/db/ApplicationID\`. It is a cloud service, so Power Query Online refreshes run without a gateway. The connector is generally available, Import only, in Power BI and Power Query Online.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data > Online Services, select Quickbase and Connect. Enter the application URL including the database and application ID segments, then provide the user token when prompted. The Navigator lists the application's tables; preview one, then Load or Transform Data to shape it first.
## Connect in Power Query Online
Select Quickbase from the connector list, enter the application URL including the database and application ID segments, and authenticate with the user token. The service is cloud-hosted, so no gateway is involved. Select the application tables in Navigator and Transform data.
## Recipes in M
Open the application's table list:
\`\`\`powerquery
let
 Source = QuickBase.Contents("https://realm.quickbase.com/db/ApplicationID")
in
 Source
\`\`\`
Drill straight into the table you report on, so the query does not depend on Navigator ordering:
\`\`\`powerquery
let
 Source = QuickBase.Contents("https://realm.quickbase.com/db/ApplicationID"),
 Requests = Source{[Name = "Requests"]}[Data]
in
 Requests
\`\`\`
Replace \`Requests\` with the table name shown in your application's Navigator preview.
## Limitations & Tips
One required parameter and no filter arguments: the URL must include the application ID or the connection has nothing to resolve, and all selection happens after the drill. Authentication is a user token, so treat it like a password — scope it to one service account, store it in the credential store, and rotate it when people leave. Import only, so wide tables materialize fully at each refresh; select columns right after the drill. Cloud-hosted, so no gateway is needed in Power Query Online. If a table you expect is missing from the Navigator, check the token's access to that table before debugging M code.`,
  },
  {
    slug: "roamler",
    name: "Roamler",
    group: "SaaS & Business Apps",
    tagline:
      "Load Roamler task and execution data into Power BI with an API key and no parameters.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["API key"],
    capabilities: ["Import"],
    functions: ["Roamler.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/roamler",
    content: `## When to Use It
Roamler captures field execution data — tasks, submissions, results from in-store and on-site work — and this connector reads it for reporting. \`Roamler.Contents()\` takes no arguments: it authenticates with your API key and returns a table of what your account can access. That makes it the quickest kind of connector to wire up — add the query, shape the result, schedule it.
## Before You Start
You need a Roamler account and an API key for it; the API key is the sign-in kind the connector uses, so generate one with read access before you start. There are no endpoint or scope parameters to configure. The source is cloud-hosted, so Power Query Online refreshes run without a gateway. Available in Power BI and Power Query Online, Import only, and currently in Preview.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data > Online Services, select Roamler and Connect. Provide the API key when prompted for credentials. The Navigator opens on the returned data — pick what you need and either Load it or choose Transform Data to filter and reduce columns before the model sees them.
## Connect in Power Query Online
Pick Roamler on the connect-to-data page, create a new connection, and provide the API key when asked for credentials. No gateway applies to this cloud source. Continue to Navigator, select what the query needs, and Transform data.
## Recipes in M
The entire connection is one line:
\`\`\`powerquery
let
 Source = Roamler.Contents()
in
 Source
\`\`\`
Buffer the result while you explore, so every preview click does not hit the API again and burn quota:
\`\`\`powerquery
let
 Source = Roamler.Contents(),
 Buffered = Table.Buffer(Source)
in
 Buffered
\`\`\`
Buffering is for the editor session; remove it from the published query unless the result is small and stable.
## Limitations & Tips
Preview status applies, so returned columns may change between connector builds. With zero parameters, the function always returns everything your key can read — the shaping burden falls entirely on your query, so filter and select columns immediately after the call to keep refreshes fast. API-key authentication means the key is a secret: store it as a credential, not inside the query text, and rotate it on a schedule. Import only, no DirectQuery, and no gateway is required in Power Query Online. If refreshes start failing after a key rotation, the old key is the first suspect.`,
  },
  {
    slug: "samsara",
    name: "Samsara",
    group: "SaaS & Business Apps",
    tagline:
      "Pull Samsara fleet and telematics records into Power BI for a chosen region and date range.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Samsara API Token"],
    capabilities: ["Import"],
    functions: ["Samsara.Records"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/samsara",
    content: `## When to Use It
Samsara holds vehicle, driver, and site activity — trips, speeding events, utilization — and this connector retrieves it in bounded time slices. \`Samsara.Records\` takes a region, a start date, and an optional end date, and returns a table of records from the supported Samsara APIs for that window. The date range is the design center: request six months or less, refresh on a schedule, and let the model accumulate history.
## Before You Start
You need a Samsara account and an API token for it; the token is the credential the connector asks for. Parameters: region (US, EU, or CA), a start date in month/day/year format, and an optional end date in the same format or blank. It is a cloud service, so Power Query Online refreshes run without a gateway. The connector is generally available, Import only, and appears in Power BI and Power Query Online.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data > Online Services, select Samsara and Connect. Acknowledge the third-party notice if shown, then enter the region and the date range for the data you want. Provide your Samsara API token at the sign-in step. The Navigator lists multiple tables; preview and select them, then Load or Transform Data to trim what you do not need.
## Connect in Power Query Online
Select Samsara from the connector list, choose a new connection, and enter the region plus the date range in month/day/year text before supplying your Samsara API token. No gateway is needed. In Navigator take only the tables you use, then Transform data.
## Recipes in M
A single region-window pull:
\`\`\`powerquery
let
 Source = Samsara.Records(
 "US",
 "1/1/2023",
 "12/31/2023"
 )
in
 Source
\`\`\`
Requests longer than six months are not allowed in one call, so split a year into two pulls and append — the standard pattern for building history:
\`\`\`powerquery
let
 First = Samsara.Records("US", "1/1/2023", "6/30/2023"),
 Second = Samsara.Records("US", "7/1/2023", "12/31/2023"),
 Combined = Table.Combine({First, Second})
in
 Combined
\`\`\`
Bound each half at six months or less to stay inside the connector's range limit.
## Limitations & Tips
The maximum range for one pull is six months and data goes back no further than six months in Power BI, so plan incremental windows rather than one historic extract. Dates must use month/day/year text; the end date is optional and may be left blank. The initial historical sync can take a while, and if an underlying Samsara API answers with a 4xx or 5xx during refresh (429s aside), the matching table is skipped rather than partially loaded — check for missing tables before trusting a refresh. Power BI Pro caps table size at 1GB, which granular tables like trips can hit within a couple of months, so select only the columns you need. Import only; cloud source, no gateway required.`,
  },
  {
    slug: "sap-erp",
    name: "SAP ERP",
    group: "SaaS & Business Apps",
    tagline:
      "Reach an SAP ERP system straight from Power Query by handing it an application server or message server connection string.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["SAPERP.Functions"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/sap-erp",
    content: `## When to Use It
SAP ERP usually holds the masters and transactions every other report keys off, and getting them out typically means someone's export routine. This connector talks to the SAP system itself: you supply a connection string, sign in, and get back a table of what that connection exposes. Drill into the rows you need and the data lands in your model on refresh. Use it when SAP figures need to move on a schedule instead of being pasted around.
## Before You Start
- Sign-in kind is Basic (username/password). Use an SAP account that is allowed to read the objects you intend to pull; a dialog-only account will fail halfway through a drill.
- The single required argument is \`connectionString\`, a JSON text blob describing how to reach the system: either an application-server logon (host, client, system number) or a group logon through a message server (message server host and service, system ID, logon group). An optional \`options\` record exists for advanced settings.
- The connector is Preview and supports Import only.
- SAP systems normally live behind the corporate firewall, so Power Query Online will need a gateway that can reach the host. Desktop queries use your machine's network path, which is why a connection that works locally can still fail in the service.
## Connect from the Desktop
In Power BI Desktop, open Get Data, search for SAP ERP, and press Connect. Paste your JSON connection string into the connection string box, then authenticate with Basic credentials. When the Navigator opens, pick what you want and choose Transform data before loading.
## Connect in Power Query Online
From the Power Query "Connect to data source" page, choose SAP ERP, enter the same connection string, and sign in with Basic credentials. If the SAP host isn't reachable from the cloud, select the gateway you've registered for it. Once authenticated, pick your data and continue to the editor.
## Recipes in M
The connection string is just JSON inside a text literal — build it once and reuse it across every query against that system:
\`\`\`powerquery
let
 Source = SAPERP.Functions("{""LogonType"":""ApplicationServer"",""AppServerHost"":""sap.corp.contoso.com"",""Client"":""800"",""SystemNumber"":""00""}")
in
 Source
\`\`\`
The result is a navigation table. Pull out the item you care about by name and take its Data column:
\`\`\`powerquery
let
 Source = SAPERP.Functions("{""LogonType"":""ApplicationServer"",""AppServerHost"":""sap.corp.contoso.com"",""Client"":""800"",""SystemNumber"":""00""}"),
 Selected = Source{[Name = "SalesOrders"]}[Data]
in
 Selected
\`\`\`
## Limitations & Tips
- Preview: the exposed objects and options can shift between releases; pin what you depend on and retest after updates.
- Import only — no DirectQuery, so every refresh re-reads what you selected.
- Only \`connectionString\` is mandatory. Treat \`options\` as a tuning surface once you know the default behavior, not as a starting point.
- A stray quote inside the JSON is the usual cause of a failed first connection; validate the string before blaming credentials.
- Refresh cost scales with what you drill into; select the narrowest object that feeds the model.`,
  },
  {
    slug: "shortcuts-business-insights",
    name: "Shortcuts Business Insights",
    group: "SaaS & Business Apps",
    tagline:
      "Open the Shortcuts Business Insights tables from Power BI with an API key or a Power BI sign-in.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["API key", "Power BI"],
    capabilities: ["Import"],
    functions: ["ShortcutsBI.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/shortcuts-business-insights",
    content: `## When to Use It
Shortcuts Business Insights exposes its reporting tables for downstream models, and this connector is the read path. \`ShortcutsBI.Contents\` takes no parameters and returns a table of what your account can reach — you drill into the row you want to load. It is the right pick when the analysis already exists on the Shortcuts side and the report just needs the rows on a refresh schedule.
## Before You Start
You need access to the Shortcuts Business Insights service, and the connector accepts two sign-in kinds: an API key and a Power BI credential. Pick whichever your organization provisions — the key path suits unattended refreshes, while the Power BI sign-in rides your existing identity. The service is cloud-hosted, so Power Query Online needs no gateway for the standard path. The connector appears in Power BI and Power Query Online, with Import as its only capability.
## Connect from the Desktop
Open Get Data from the Home ribbon, search for Shortcuts Business Insights, and select Connect. Complete the credential prompt with your API key or Power BI sign-in, then pick the tables you want from the Navigator and either load them or open them in the query editor for shaping.
## Connect in Power Query Online
Find Shortcuts Business Insights in the get data experience, choose or create the connection, and sign in with the same credential kind. Continue to the navigation page, select the tables you need, and choose Transform Data so the dataflow stores a narrowed result.
## Recipes in M
The entry point takes no arguments; everything is carried by the stored credential.
\`\`\`powerquery
let
 Source = ShortcutsBI.Contents()
in
 Source
\`\`\`
Treat the result as a navigation table and drill by name, using the values your Navigator shows rather than ones copied from elsewhere.
\`\`\`powerquery
let
 Source = ShortcutsBI.Contents(),
 Insights = Source{[Name = "Insights"]}[Data]
in
 Insights
\`\`\`
## Limitations & Tips
This connector is in Preview, so table names, output shape, and credential handling can change between builds — verify your drill names after any update. It is Import-only with zero required parameters, so there is nothing to tune in the call itself; the design work happens after the drill, where you should select only the columns the report uses. Choose the credential kind with scheduled refresh in mind: an API key survives without an interactive session, while an identity-based sign-in depends on that identity staying valid. Since the service is cloud-hosted, gateway configuration is only relevant if you combine this query with on-premises sources.`,
  },
  {
    slug: "siteimprove",
    name: "Siteimprove",
    group: "SaaS & Business Apps",
    tagline:
      "Pull your Siteimprove account's data into Power BI as a navigation table you drill from one entry at a time.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["Siteimprove.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/siteimprove",
    content: `## When to Use It
This connector reaches the Siteimprove account behind your credential. \`Siteimprove.Contents()\` takes no arguments and returns a table describing what that account can reach — one row per entry, each expandable into the data behind it. It's the right pick when you can't name the entries offhand: connect once, read the table, then pick an entry, drill in, and shape.
## Before You Start
You need Siteimprove credentials; authentication is Basic (username/password), so whatever the user signs into the service with is what Power Query stores. The connector ships for Power BI and Power Query Online and supports Import only. Siteimprove is hosted, so there's no gateway to stand up — in the Power BI service or a dataflow it registers as a cloud source and credentials are applied per data source.
## Connect from the Desktop
In Power BI Desktop, Home > Get Data, search for \`Siteimprove\`, select it, and Connect. Enter the Siteimprove username and password when prompted. Navigator shows the table the entry function returned; tick what you need, then Load or Transform data to open it in the editor.
## Connect in Power Query Online
On the Power Query "Connect to data source" page, select Siteimprove, sign in with the same Basic credentials, and select Next. On Choose data, tick the entries you want and select Transform data to finish shaping them in the editor.
## Recipes in M
### Connect with no arguments
\`\`\`powerquery
let
 Source = Siteimprove.Contents()
in
 Source
\`\`\`
There is nothing to configure — the stored credential and that account's access level decide which rows come back, so two users can get different tables from the same query.
### Drill into one entry by name
\`\`\`powerquery
let
 Source = Siteimprove.Contents(),
 Pages = Source{[Name = "Pages"]}[Data]
in
 Pages
\`\`\`
Pinning the entry by \`Name\` keeps the query stable; a positional index like \`Source{0}\` would silently point at a different row if the table reorders.
## Limitations & Tips
General availability, Import only — no DirectQuery, so every refresh re-reads the service. There are no parameters for server-side filtering; do the narrowing in the query with \`Table.SelectRows\` right after the drill, and drop unneeded columns before loading. A Basic credential means a password change surfaces as a failed refresh — update it under data source settings instead of rebuilding the query. Available in Power BI and Power Query Online, not Excel.`,
  },
];

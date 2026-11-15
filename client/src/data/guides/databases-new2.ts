import type { ConnectorGuide } from "../connector-guides";

/**
 * Practical guides for the Databases group — added by the Microsoft connectors
 * index expansion. Content is original (data-engineer voice), generated from
 * the connector audit facts under Temp/opencode/guides-src.
 */
export const databasesNewGuides2: ConnectorGuide[] = [
  {
    slug: "kx-kdb-insights-enterprise",
    name: "KX kdb Insights Enterprise Power Query",
    group: "Databases",
    tagline:
      "Explore running kdb Insights Enterprise databases from Power BI and import only what Navigator's push-down lets you keep.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth"],
    capabilities: ["Import"],
    functions: ["kxkdbinsightsenterprise.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/kx-kdb-insights-enterprise",
    content: `## When to Use It
kdb Insights Enterprise hosts kdb+ time-series databases, and \`kxkdbinsightsenterprise.Contents\` takes the deployment URL to reach them. The function returns a table of the running databases and tables for that host; previews flow through the platform's getData REST API, and Navigator's parameters let you filter, aggregate, and group before anything is imported. Use it when the kdb side should do the heavy lifting and Power BI only carries the summarized result.
## Before You Start
The prerequisites are concrete: kdb Insights Enterprise 1.11.0 or above installed and running at least one database, plus permission to query those databases. The sign-in kind is OAuth. This connector supports Import — with filtering, aggregation, and group-by applied before import — and is in Preview state, so plan scheduled refresh rather than live queries. If the deployment URL is reachable from the cloud service, no gateway is needed; if it sits on a private network, register one in Power Query Online. Power BI and Power Query Online both work.
## Connect from the Desktop
Get Data → search "KX kdb" → KX kdb Insights Enterprise → Connect. Enter the Hostname URL for your deployment and select OK. Sign in when prompted — the button flips to signing in as a different user if credentials have expired — then pick databases and tables in Navigator.
## Connect in Power Query Online
Choose the connector, enter the same Host URL, sign in through OAuth, select a gateway only if the deployment isn't publicly reachable, and continue to Navigator.
## Recipes in M
### Connect to a deployment
\`\`\`powerquery
let
 Source = kxkdbinsightsenterprise.Contents(
 "https://kxi.contoso.swedencentral.sysgen.cloudapp.azure.com"
 )
in
 Source
\`\`\`
HostUrl is the only parameter; it must include the scheme so the REST calls resolve.
### Drill database then table
\`\`\`powerquery
let
 Source = kxkdbinsightsenterprise.Contents("https://kxi.contoso.swedencentral.sysgen.cloudapp.azure.com"),
 Db = Source{[Name = "marketdata"]}[Data],
 Ticks = Db{[Name = "ticks"]}[Data]
in
 Ticks
\`\`\`
Names come from whatever Navigator listed for your host.
### Inventory what's running
\`\`\`powerquery
let
 Source = kxkdbinsightsenterprise.Contents("https://kxi.contoso.swedencentral.sysgen.cloudapp.azure.com"),
 Inventory = Table.SelectColumns(Source, {"Name", "ItemKind"})
in
 Inventory
\`\`\`
Two columns are enough to audit which databases are up before you build anything on them.
## Limitations & Tips
It's Preview and Import-only: there's no DirectQuery path, so freshness depends on refresh schedules. HostUrl is required and must match the deployment exactly. Filtering and aggregation belong in Navigator where they run on the kdb side — pushing work there keeps imports small. OAuth tokens expire, so re-authenticate when a refresh fails, and use a gateway if the URL isn't reachable from the service.`,
  },
  {
    slug: "kyligence",
    name: "Kyligence",
    group: "Databases",
    tagline:
      "DirectQuery Kyligence model data by service host, port, and project, with an optional options record.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["DirectQuery"],
    functions: ["Kyligence.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/kyligence",
    content: `## When to Use It
Kyligence serves pre-aggregated model data over big datasets, and \`Kyligence.Database\` connects with three required text values — service host, port, and project — plus an optional options record. The return value is a catalog table to drill into for the objects your project exposes. Reach for it when aggregation already lives on the server and Power BI should query that layer rather than base tables.
## Before You Start
Authentication is Basic (username/password). DirectQuery is the only capability, so visuals query Kyligence live on every interaction. The service normally sits inside your network, so Power Query Online needs an on-premises data gateway. Both Power BI and Power Query Online are supported, and the connector is generally available.
## Connect from the Desktop
Get Data → Database → Kyligence → Connect. Enter the server host, port, and project — note the port is a text field here — then sign in with user name and password. Navigator shows the project contents for Load or Transform Data.
## Connect in Power Query Online
Select Kyligence in the connector list, enter server, port, and project, pick a gateway that can reach the service, sign in with Basic credentials, and continue to Navigator.
## Recipes in M
### Connect to a project
\`\`\`powerquery
let
 Source = Kyligence.Database("kyligence.contoso.com", "8080", "retail")
in
 Source
\`\`\`
All three arguments are text — the port is quoted because its declared type isn't number.
### Drill into a model object
\`\`\`powerquery
let
 Source = Kyligence.Database("kyligence.contoso.com", "8080", "retail"),
 Sales = Source{[Name = "sales_cube"]}[Data]
in
 Sales
\`\`\`
Replace the label with the one Navigator shows for your project.
### Filter the catalog by keyword
\`\`\`powerquery
let
 Source = Kyligence.Database("kyligence.contoso.com", "8080", "retail"),
 Matches = Table.SelectRows(Source, each Text.Contains([Name], "sales"))
in
 Matches
\`\`\`
A keyword filter on Name narrows a crowded catalog before you expand anything.
## Limitations & Tips
DirectQuery-only: there's no import mode, so lean on the server's aggregation and keep filters foldable. Three parameters are required and the options record is optional. Port being text is easy to trip over when you write the query by hand. The gateway needs network access to the service, and credentials must be the Basic ones configured for the project.`,
  },
  {
    slug: "kyvos-odbc",
    name: "Kyvos ODBC",
    group: "Databases",
    tagline:
      "List Kyvos datasets from Power BI and query them over ODBC with SSL, using portal credentials or OAuth 2.0.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth", "2.0 Username and Password"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["KyvosODBC.Databases"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/kyvos-odbc",
    content: `## When to Use It
Kyvos publishes dimensional datasets, and \`KyvosODBC.Databases\` returns exactly the dataset list Navigator shows — one row per dataset on the server — for you to drill into. It takes three required values: Kyvos server, HTTP path, and an SSL switch. Use it when analysts should browse Kyvos models directly instead of waiting on extracts.
## Before You Start
Two sign-in kinds are available: OAuth 2.0, which redirects to your identity provider, and username/password with Kyvos Web Portal credentials. The Kyvos ODBC driver must be installed on the machine running Power BI — in the Power BI service that means the gateway machine. Import and DirectQuery are both supported, and the connector is generally available.
## Connect from the Desktop
Get Data → Kyvos ODBC → Connect. Fill in Kyvos Server ("servername:8081"), HTTP Path ("kyvos/sql"), and Use SSL (Enabled or Disabled), choose your data connectivity mode, then OK. Authenticate with either method and select Connect; Navigator lists the datasets.
## Connect in Power Query Online
Create or select a connection, enter server, HTTP path, and the SSL value, choose a gateway hosting the Kyvos ODBC driver, sign in, and continue to Navigator.
## Recipes in M
### List the datasets
\`\`\`powerquery
let
 Source = KyvosODBC.Databases("servername:8081", "kyvos/sql", "Enabled")
in
 Source
\`\`\`
The encryption argument accepts "Enabled" or "Disabled" as text.
### Open one dataset
\`\`\`powerquery
let
 Source = KyvosODBC.Databases("servername:8081", "kyvos/sql", "Enabled"),
 Revenue = Source{[Name = "Revenue"]}[Data]
in
 Revenue
\`\`\`
Drill with the dataset name exactly as the server reports it.
### Audit names without pulling rows
\`\`\`powerquery
let
 Source = KyvosODBC.Databases("servername:8081", "kyvos/sql", "Disabled"),
 Names = Table.SelectColumns(Source, {"Name"})
in
 Names
\`\`\`
Switching to Disabled matches a server that doesn't terminate TLS; the Name column alone is enough for an inventory.
## Limitations & Tips
All three parameters are required, including the "Enabled"/"Disabled" text — there's no default to lean on. Authentication happens at the connection level, separate from these arguments. The driver has to exist wherever queries run, so treat the gateway as part of the deployment. Both Import and DirectQuery work; for online refresh, verify the HTTP path matches what the Kyvos server expects.`,
  },
  {
    slug: "linkar",
    name: "Linkar PICK Style / MultiValue Databases",
    group: "Databases",
    tagline:
      "Query a Linkar-fronted PICK/MultiValue database with entry point, port, and optional select, sort, and SQL-mode switches.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["Linkar.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/linkar",
    content: `## When to Use It
Linkar sits in front of PICK-style MultiValue databases and exposes them through a schema layer. \`Linkar.Contents\` takes a host, entry point name, and TCP port, then eight optional arguments — language, session label, custom variables, table name, select clause, dictionary clause, sort clause, and a SQL-mode flag. What you get back is a table shaped by the Linkar schema you name, with server-side selection and sorting applied before rows reach Power Query.
## Before You Start
Sign-in is Basic (username/password). The connector is Import-only and in Preview. The entry point's TCP port must be reachable from wherever queries run — for Power Query Online, that means an on-premises data gateway. Table names must already exist in Linkar Schemas; they're not invented at query time. Power BI and Power Query Online are supported.
## Connect from the Desktop
Get Data → Linkar → Connect. Enter the Linkar host ("127.0.0.1"), entry point ("DEMO"), and entry point port (11300), then fill optional fields such as language, table name, and clauses only where you need them. Sign in and continue to Navigator.
## Connect in Power Query Online
Pick Linkar in the connector list, supply host, entry point, and port, select a gateway that can reach the entry point, sign in with Basic credentials, and continue.
## Recipes in M
### Minimal connection
\`\`\`powerquery
let
 Source = Linkar.Contents("127.0.0.1", "DEMO", 11300)
in
 Source
\`\`\`
Only the first three arguments are required; everything after them is positional, so skipping one means passing null.
### Pull a shaped table
\`\`\`powerquery
let
 Source = Linkar.Contents(
 "127.0.0.1",
 "DEMO",
 11300,
 "EN",
 "From Power BI",
 null,
 "Orders",
 null,
 "Customer Date Item IItemDescription",
 "BY Customer",
 false
 )
in
 Source
\`\`\`
Here the language, a session label for Linkar Manager, the table name, the visible properties, and the sort are all applied server-side.
### Filter one customer with SQL mode on
\`\`\`powerquery
let
 Source = Linkar.Contents(
 "127.0.0.1",
 "DEMO",
 11300,
 null,
 null,
 null,
 "Orders",
 "WITH Customer = ""84""",
 null,
 null,
 true
 )
in
 Source
\`\`\`
The select clause carries its own quoting inside the M string, and sqlmode true reshapes the output toward a SQL table style.
## Limitations & Tips
Preview status and Import-only both apply. Argument order matters: once you start passing SelectClause you must supply every optional slot before it, null included. Table names must be defined in Linkar Schemas, and multivalue or segment groups need extended notation like "Orders.MVItems". The freetext value only labels your session in Linkar Manager — it doesn't filter data. Gateway reachability to the entry point port is the usual failure point.`,
  },
  {
    slug: "mariadb",
    name: "MariaDB",
    group: "Databases",
    tagline:
      "DirectQuery MariaDB by connection string, optionally turning foreign keys into expandable navigation properties.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["DirectQuery"],
    functions: ["MariaDB.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/mariadb",
    content: `## When to Use It
MariaDB is the MySQL-compatible database family, and \`MariaDB.Contents\` opens it with a data source string — "servername:portnumber;databasename" — plus an optional database name and an optional CreateNavigationProperties flag. It returns a navigation table: leave the database empty and Navigator browses every database on the server. Use it when relationships discovered at the source should become expandable columns in the editor.
## Before You Start
Authentication is Basic (username/password). DirectQuery is the only capability, so queries run against MariaDB live. The server is usually on-premises, which makes an on-premises data gateway mandatory for Power Query Online refresh. Power BI and Power Query Online are both supported, and the connector is generally available.
## Connect from the Desktop
Get Data → Database → MariaDB → Connect. Enter the data source string and, if you want to browse just one database, its name. Sign in with user name and password, then choose your tables in Navigator — the query runs in DirectQuery mode against the server.
## Connect in Power Query Online
Select MariaDB, enter the same data source string, choose a gateway that reaches the server, sign in with Basic credentials, and continue to Navigator.
## Recipes in M
### Connect with database in the string
\`\`\`powerquery
let
 Source = MariaDB.Contents("db.contoso.com:3306;retail")
in
 Source
\`\`\`
Port and database ride along in the one string, so no extra arguments are needed.
### Drill to a table
\`\`\`powerquery
let
 Source = MariaDB.Contents("db.contoso.com:3306", "retail"),
 Orders = Source{[Name = "orders"]}[Data]
in
 Orders
\`\`\`
Passing the database separately gives Navigator a narrower starting point.
### Turn off foreign-key navigation
\`\`\`powerquery
let
 Source = MariaDB.Contents("db.contoso.com:3306;retail", null, false)
in
 Source
\`\`\`
CreateNavigationProperties defaults to true; set it false when the driver's foreign-key detection is expensive, and join in the model instead.
## Limitations & Tips
DirectQuery-only, so push filters as far as the fold allows. The database argument is optional — an empty value browses all databases — while the data source string is required. Navigation properties depend on what the driver reports; if they're slow to compute, flip the flag off. The gateway must be able to reach the port named in the data source string.`,
  },
  {
    slug: "marklogic",
    name: "MarkLogic",
    group: "Databases",
    tagline:
      "DirectQuery a MarkLogic ODBC server by hostname and the port its ODBC layer listens on.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["DirectQuery"],
    functions: ["MarkLogicODBC.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/marklogic",
    content: `## When to Use It
MarkLogic is a multi-model database, and its ODBC server exposes SQL access that this connector consumes. \`MarkLogicODBC.Contents\` needs just a hostname and the port the ODBC server runs on — common choices include 5432, 7033, and 6050 — and returns a catalog table you drill into for schemas and tables. Use it when SQL-shaped access to documents and tables is enough for the report.
## Before You Start
Sign-in is Basic (username/password). DirectQuery is the only capability, so every visual query travels to MarkLogic. The ODBC server must be configured and reachable, and since it lives on infrastructure you control, Power Query Online needs an on-premises data gateway. Power BI and Power Query Online are supported, and the connector is generally available.
## Connect from the Desktop
Get Data → Database → MarkLogic → Connect. Enter the hostname and the ODBC port — not necessarily the application port — then sign in with user name and password. Navigator lists what the ODBC server exposes for Load or Transform Data.
## Connect in Power Query Online
Select MarkLogic in the connector list, enter hostname and port, choose a gateway that reaches the ODBC server, sign in with Basic credentials, and continue to Navigator.
## Recipes in M
### Connect to the ODBC server
\`\`\`powerquery
let
 Source = MarkLogicODBC.Contents("localhost", 7033)
in
 Source
\`\`\`
The port is a number argument and must be the ODBC server's port, not a client-facing one.
### Walk schema to view
\`\`\`powerquery
let
 Source = MarkLogicODBC.Contents("marklogic.contoso.com", 7033),
 Schema = Source{[Name = "dbo"]}[Data],
 Customers = Schema{[Name = "customers"]}[Data]
in
 Customers
\`\`\`
Two drills mirror the folder path Navigator shows for your content.
### Check what the server publishes
\`\`\`powerquery
let
 Source = MarkLogicODBC.Contents("marklogic.contoso.com", 7033),
 Kinds = Table.SelectColumns(Source, {"Name", "ItemKind"})
in
 Kinds
\`\`\`
Listing names with their kinds is a fast way to see which object types are exposed.
## Limitations & Tips
Both parameters are required and there's no options record, so connection tuning happens at the driver level. DirectQuery-only means filter design determines load — keep predicates simple enough to fold. Confirm you're using the ODBC server's port rather than a client-facing one, and make sure that server is reachable from wherever queries execute, gateway included.`,
  },
  {
    slug: "mongodb-atlas-sql-interface",
    name: "MongoDB Atlas SQL interface",
    group: "Databases",
    tagline:
      "Query an Atlas federated dataset through the SQL interface with a credential-free MongoDB URI.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["MongoDBAtlasODBC.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/mongodb-atlas-sql-interface",
    content: `## When to Use It
The Atlas SQL interface turns federated MongoDB data into relational tables, and \`MongoDBAtlasODBC.Contents\` takes the MongoDB URI from Atlas's connection dialog plus the federated database name, with an optional options record. What returns is a catalog table to drill into for the collections the federated layer exposes. Use it when analysts need SQL-shaped access to Atlas data without leaving Power BI.
## Before You Start
You need an Atlas federated database: in Atlas, open Data Federation, choose Connect → Connect using the Atlas SQL Interface → Power BI Connector, and copy the federated database name and MongoDB URI. If data comes from an Atlas cluster, that cluster must run MongoDB 5.0 or later to benefit from Atlas SQL, and the MongoDB Atlas SQL ODBC Driver is required. Sign-in kind is Basic (username/password) — for X.509, OAuth (OIDC), or AWS IAM mechanisms, leave username and password blank in the dialog. The URI itself must not contain credentials; URIs with embedded username or password are rejected. Import and DirectQuery are both available.
## Connect from the Desktop
Get Data → Database → MongoDB Atlas SQL → Connect. A third-party notice appears on first use. Paste the URI (credential-free), the federated database name, and optionally a native query such as "SELECT * FROM orders", choose Import or DirectQuery, then enter your Atlas database credentials.
## Connect in Power Query Online
On the connection settings page, fill in the MongoDB URI, federated database, and a connection name, choose a data gateway, enter the database access username and password, then continue to Navigator and Transform data.
## Recipes in M
### Connect to a federated database
\`\`\`powerquery
let
 Source = MongoDBAtlasODBC.Contents(
 "mongodb://atlas.contoso.com:27017/?ssl=true&authSource=admin",
 "federated_sales"
 )
in
 Source
\`\`\`
The URI must be free of embedded credentials — authentication happens at the connection level.
### Drill into a collection
\`\`\`powerquery
let
 Source = MongoDBAtlasODBC.Contents(
 "mongodb://atlas.contoso.com:27017/?ssl=true&authSource=admin",
 "federated_sales"
 ),
 Orders = Source{[Name = "orders"]}[Data]
in
 Orders
\`\`\`
The drill name is whatever the federated layer reports for that collection.
### Filter the catalog first
\`\`\`powerquery
let
 Source = MongoDBAtlasODBC.Contents(
 "mongodb://atlas.contoso.com:27017/?ssl=true&authSource=admin",
 "federated_sales"
 ),
 Matches = Table.SelectRows(Source, each Text.Contains([Name], "order"))
in
 Matches
\`\`\`
Narrowing the navigation table avoids previewing every collection in a large database.
## Limitations & Tips
A URI carrying username or password will be refused outright, so strip credentials and use the dialog's sign-in instead. The Atlas SQL ODBC driver must be installed wherever queries run — desktop or gateway. If the connection fails with a generic driver version error, check credentials and network reachability first. Both Import and DirectQuery work, and the optional native query from the dialog saves you from pulling more than you need.`,
  },
  {
    slug: "opensearch-project",
    name: "OpenSearch Project",
    group: "Databases",
    tagline:
      "Pull OpenSearch indices into Power BI over the SQL ODBC driver, with SSL as an explicit switch.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)", "AWS_SIGV4 NONE"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["OpenSearchProject.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/opensearch-project",
    content: `## When to Use It
OpenSearch holds JSON documents behind an HTTP API, and this connector reaches it through the OpenSearch SQL ODBC driver. \`OpenSearchProject.Contents\` takes three required arguments — server, port, and a UseSSL logical — and returns a table of the exposed content you drill into for indices. Use it when the cluster is the store you want reported rather than exported.
## Before You Start
The OpenSearch SQL ODBC driver is a prerequisite on the machine running the query. Sign-in kinds are Basic (username/password) and AWS SigV4. Import and DirectQuery are both supported, and the connector is in Preview. A cluster on a private network needs an on-premises data gateway for Power Query Online refresh; a reachable one doesn't. Both Power BI and Power Query Online work with this connector.
## Connect from the Desktop
Home → Get Data → More → Other → OpenSearch Project → Connect. You'll see a third-party notice; continue past it, then enter host ("localhost"), port (9200), and your SSL choice. Pick an authentication option, sign in, select the required table, and Load.
## Connect in Power Query Online
Choose OpenSearch Project in the connector list, enter server, port, and the SSL flag, set the authentication kind, select a gateway if the cluster isn't internet-reachable, and continue to Navigator.
## Recipes in M
### Connect with SSL on
\`\`\`powerquery
let
 Source = OpenSearchProject.Contents("opensearch.contoso.com", 9200, true)
in
 Source
\`\`\`
UseSSL is a logical — true or false, unquoted — and all three arguments are required.
### Open an index pattern
\`\`\`powerquery
let
 Source = OpenSearchProject.Contents("opensearch.contoso.com", 9200, true),
 Logs = Source{[Name = "logstash-2026.11"]}[Data]
in
 Logs
\`\`\`
Drill with the index name exactly as the cluster reports it.
### List recent indices only
\`\`\`powerquery
let
 Source = OpenSearchProject.Contents("opensearch.contoso.com", 9200, false),
 Recent = Table.SelectRows(Source, each Text.StartsWith([Name], "logs-"))
in
 Recent
\`\`\`
Passing false drops SSL for a cluster that doesn't terminate it, and the prefix filter keeps the catalog focused.
## Limitations & Tips
Preview status applies, and there's no optional parameter to soften the three required ones. If you get an error saying the driver wasn't installed, install the OpenSearch SQL ODBC driver on the machine that runs the query. Connection problems usually come down to host, port, credentials, or a stopped server. Gateway when the cluster is private; DirectQuery and Import both available.`,
  },
  {
    slug: "qubole-presto",
    name: "QubolePresto",
    group: "Databases",
    tagline:
      "DirectQuery Presto queries through Qubole using a single DSN argument and anonymous sign-in.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Anonymous"],
    capabilities: ["DirectQuery"],
    functions: ["QubolePresto.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/qubole-presto",
    content: `## When to Use It
Qubole runs Presto SQL over cloud-hosted data, and \`QubolePresto.Contents\` opens it with one argument: a DSN that identifies the endpoint. The function returns the catalog as a table you drill into for schemas and tables. Use it when the SQL engine already lives behind Qubole and Power BI should hand queries to it rather than compute locally.
## Before You Start
The sign-in kind is Anonymous, so the DSN itself carries the endpoint details and network reachability does the gating. DirectQuery is the only capability, and the connector is in Preview. The DSN must exist wherever queries run — on your desktop or on the on-premises data gateway you select in Power Query Online. Power BI and Power Query Online are both supported.
## Connect from the Desktop
Get Data → QubolePresto → Connect. Enter the DSN, then continue to Navigator and pick Load or Transform Data. There's no credential prompt with anonymous sign-in, so a failure here points at the DSN or network rather than a password.
## Connect in Power Query Online
Select QubolePresto in the connector list, enter the same DSN, choose a gateway whose machine has that DSN configured, and continue to Navigator.
## Recipes in M
### Connect through a DSN
\`\`\`powerquery
let
 Source = QubolePresto.Contents("DSN=QubolePresto")
in
 Source
\`\`\`
The single required argument is the DSN as text; there's nothing else to configure.
### Drill catalog then table
\`\`\`powerquery
let
 Source = QubolePresto.Contents("DSN=QubolePresto"),
 Catalog = Source{[Name = "hive"]}[Data],
 Events = Catalog{[Name = "events"]}[Data]
in
 Events
\`\`\`
Two steps take you from the top-level table to a concrete one, following Navigator's nesting.
### Keep only your schemas
\`\`\`powerquery
let
 Source = QubolePresto.Contents("DSN=QubolePresto"),
 Schemas = Table.SelectRows(Source, each Text.StartsWith([Name], "app_"))
in
 Schemas
\`\`\`
A prefix filter stops previews from wandering into schemas you don't own.
## Limitations & Tips
Preview plus DirectQuery-only is a demanding combination: shapes may shift, and every visual interaction hits Presto. The single parameter is required, and the DSN must resolve on the machine executing the query — the usual cause of online refresh failures. Anonymous auth means there's no credential to rotate, but it also means network policy is your only gate. Push filters down and keep imports small.`,
  },
  {
    slug: "singlestore",
    name: "SingleStore",
    group: "Databases",
    tagline:
      "Import or DirectQuery a SingleStore cluster with an optional native SQL query, over Windows or Basic credentials.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Windows", "Basic (username/password)"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["SingleStoreODBC.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/singlestore",
    content: `## When to Use It
SingleStore is a HTAP, MySQL-compatible database, and \`SingleStoreODBC.Contents\` connects with a server address and database name plus an optional options record. It returns the database catalog for drilling, and the desktop dialog also lets you paste a native query up front. Use it when operational tables should back both import-mode models and live queries.
## Before You Start
Two sign-in kinds apply: Windows (which needs Kerberos set up on the server and Power BI running as the mapped user) and Basic — the only option for SingleStoreDB Cloud. The database runs on infrastructure you control, so Power Query Online refreshes need an on-premises data gateway. Import and DirectQuery are both supported, and the connector is generally available.
## Connect from the Desktop
Home → Get Data → More → SingleStore Direct Query Connector. Enter Server ("127.0.0.1:3306") and Database ("mydatabase"), choose Import or DirectQuery, optionally paste a native query, then select Windows or Basic authentication and Connect. For Windows auth, the Power BI user must map to the database user.
## Connect in Power Query Online
Choose the connector, enter server and database, select your gateway, sign in with the authentication kind that matches your deployment, and continue to Navigator.
## Recipes in M
### Connect to a database
\`\`\`powerquery
let
 Source = SingleStoreODBC.Contents("127.0.0.1:3306", "mydatabase")
in
 Source
\`\`\`
Both arguments are required text; the port belongs in the server address.
### Drill to a table
\`\`\`powerquery
let
 Source = SingleStoreODBC.Contents("singlestore.contoso.com:3306", "retail"),
 Orders = Source{[Name = "orders"]}[Data]
in
 Orders
\`\`\`
The drill name matches what Navigator shows for that database.
### Select only the columns you need
\`\`\`powerquery
let
 Source = SingleStoreODBC.Contents("127.0.0.1:3306", "mydatabase"),
 Orders = Source{[Name = "orders"]}[Data],
 Keep = Table.SelectColumns(Orders, {"order_id", "customer_id", "total"})
in
 Keep
\`\`\`
Swap in your own column names; trimming wide tables early keeps both import and DirectQuery models lean.
## Limitations & Tips
Native database queries must be read-only — DDL isn't supported — and SQL supplied outside the connector dialog may prompt Power BI to approve it for your credentials. Windows authentication requires Kerberos on the server and a Power BI session running as the mapped user; cloud users should pick Basic. Server and database are required, options are optional, and the gateway needs network access to the configured port.`,
  },
  {
    slug: "snowflake",
    name: "Snowflake",
    group: "Databases",
    tagline:
      "Open a Snowflake warehouse from Power BI, browse down to individual tables, and choose import or DirectQuery.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft account", "Key pair", "Snowflake"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["Snowflake.Databases"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/snowflake",
    content: `## When to Use It
Snowflake is the analytical store when your tables are split across databases and warehouses that scale on their own. This connector is the right pick when those tables belong in a Power BI model — imported in bulk, or queried live through DirectQuery — and your access is defined by a server plus a warehouse.

\`Snowflake.Databases(server, warehouse, optional options)\` opens that pair and returns a navigation table: one row per database the session can see, each carrying a Data field you drill into to reach schemas and tables. Nothing moves until you descend.

## Before You Start
Get the account URL and the warehouse name from whoever administers Snowflake, plus an account allowed to read the objects you plan to use. Sign-in kinds are Microsoft account, key pair, and Snowflake credentials. Username/password is being phased out, so lean on Entra ID or key pair where your setup allows; key pair authentication doesn't work in Dataflows Gen1 or Power Apps dataflows.

Snowflake is cloud-hosted, so Power Query Online reaches it with no gateway — credentials live with the connection. Both Import and DirectQuery are supported, with DirectQuery applying to Power BI semantic models.

## Connect from the Desktop
In Power BI Desktop: Home → Get Data → Database → Snowflake → Connect. Fill in Server and Warehouse, expand advanced options for a role name, timeouts, or a specific database, pick Import or DirectQuery, then sign in. Navigator lists the databases — load them or open the editor first.

## Connect in Power Query Online
Choose Snowflake on the connector selection page, enter the server, warehouse, and any advanced options; anything the dialog doesn't expose can be added later in the Advanced Editor. Sign in with your chosen method, continue to Navigator, select the data you need, and transform.

## Recipes in M
### Start a session on a warehouse
\`\`\`powerquery
let
 Source = Snowflake.Databases("contoso.snowflakecomputing.com", "CONTOSO_WH")
in
 Source
\`\`\`
Both arguments are required: the server hostname and the warehouse that will execute your queries. What comes back is the database navigation table.

### Pin one database by name
\`\`\`powerquery
let
 Source = Snowflake.Databases("contoso.snowflakecomputing.com", "CONTOSO_WH"),
 Sales = Source{[Name = "SALESDB"]}[Data]
in
 Sales
\`\`\`
Indexing on Name survives Navigator sort order, and the next two levels — schemas, then tables — drill the same way.

### Keep the refresh payload small
\`\`\`powerquery
let
 Source = Snowflake.Databases("contoso.snowflakecomputing.com", "CONTOSO_WH"),
 Sales = Source{[Name = "SALESDB"]}[Data],
 Public = Sales{[Name = "PUBLIC"]}[Data],
 Orders = Public{[Name = "ORDERS"]}[Data],
 Recent = Table.SelectRows(Orders, each [ORDER_DATE] >= #date(2026, 1, 1)),
 Kept = Table.SelectColumns(Recent, {"ORDER_ID", "ORDER_DATE", "TOTAL_AMOUNT"})
in
 Kept
\`\`\`
Row and column filters written in Power Query fold into the SQL where the connector allows it, so the warehouse ships less.

## Limitations & Tips
- Known issues in the current implementation: count-distinct can return wrong results and memory use runs high — trim columns early if a refresh is canceled for memory.
- Advanced options cover role name, relationship columns, timeouts, a database (Desktop only), and a native SQL statement; set a role only if the signing-in user holds it.
- DirectQuery covers Power BI semantic models; dataflows refresh on Import. Reuse one connection per server and warehouse so stored credentials apply everywhere.`,
  },
  {
    slug: "starburst-presto",
    name: "Starburst",
    group: "Databases",
    tagline:
      "Query a Starburst cluster over its ODBC driver, signing in with Kerberos, password, JWT, or OAuth.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth", "Access Token (JWT) Kerberos Password"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["StarburstPresto.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/starburst-presto",
    content: `## When to Use It
Starburst federates catalogs sitting in different storage systems behind one SQL surface, which makes it useful when a report spans data you have no single database for. Pick this original connector for ordinary access: \`StarburstPresto.Contents(Host, Port, optional options)\` opens the cluster and hands back a navigation table of catalogs, each row carrying a Data field you drill into to reach tables.

## Before You Start
Use a reasonably recent Power BI Desktop — the connector landed in Desktop releases from October 2023 on. The Starburst ODBC driver must be installed on the machine that runs the queries: version 3 is recommended, and version 2 has to be 2.0.15.1021 or later. Power Query Online and service-side refresh ride through an on-premises data gateway with that driver installed on the gateway machine.

Sign-in kinds are Kerberos, Password, Access token (JWT), and OAuth 2.0. Kerberos needs a valid domain ticket (run \`kinit\` if you don't have one); the access token option takes a personal JWT issued by your Starburst administrator. Two Starburst connectors appear in Get Data — use this one unless you need Microsoft Entra ID single sign-on for DirectQuery, which is the other connector's job. Import and DirectQuery are both supported.

## Connect from the Desktop
Home → Get Data, search Starburst, select the connector documented for this guide, and Connect. Enter Host and Port (443 is typical), optionally expand advanced options for Role, Catalog, use of the system proxy, a connection string, or a native query, choose Import or DirectQuery, then pick an authentication type and sign in. Navigator shows catalogs and tables — load or transform.

## Connect in Power Query Online
Open Settings → Manage connections and gateways → + New, choose On-premises and the gateway cluster that has the Starburst ODBC driver, set the connection type to this connector, enter host, port, and credentials, then Create. Map your semantic model's data source to that connection in the dataset settings before the first refresh.

## Recipes in M
### Connect to a cluster
\`\`\`powerquery
let
 Source = StarburstPresto.Contents("starburst.mydomain.com", 443)
in
 Source
\`\`\`
Host and port are both required; the result lists the catalogs the session can see.

### Walk catalog to table
\`\`\`powerquery
let
 Source = StarburstPresto.Contents("starburst.mydomain.com", 443),
 Catalog = Source{[Name = "lakehouse"]}[Data],
 Orders = Catalog{[Name = "orders"]}[Data]
in
 Orders
\`\`\`
Each step indexes the navigation table by Name and pulls its Data field, so the query doesn't shift if Navigator order changes.

### Run under a specific role
\`\`\`powerquery
let
 Source = StarburstPresto.Contents("starburst.mydomain.com", 443, [Role = "analyst"])
in
 Source
\`\`\`
Role is one of the advanced options accepted through the optional options record; the role has to exist on the cluster for the user.

## Limitations & Tips
- The ODBC driver is a hard prerequisite — without it neither Desktop nor the gateway can open the connection.
- Kerberos and password both depend on how the cluster is configured; pick the type that matches it rather than trying them in turn.
- Native query and connection string options let you push cluster-specific settings the dialog doesn't surface.
- DirectQuery covers Power BI semantic models; keep the returned columns tight so live queries stay cheap.
- Existing reports on this connector keep working — migrate only if you later need Entra ID SSO.`,
  },
  {
    slug: "starburst",
    name: "Starburst secured by Entra ID",
    group: "Databases",
    tagline:
      "Use the Starburst connector that carries each viewer's Microsoft Entra ID identity into DirectQuery.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID", "Access Token (JWT) Password"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["StarburstAad.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/starburst",
    content: `## When to Use It
Same Starburst cluster, different identity story: when every report viewer's Microsoft Entra ID identity needs to flow end-to-end into Starburst, this is the connector that does it. \`StarburstAad.Contents(Host, Port, optional options)\` takes the same host and port as the original and returns the same navigation table of catalogs, one row each, ready to drill into for tables.

## Before You Start
Prerequisites match the original Starburst connector: a current Power BI Desktop (October 2023 or later), the Starburst ODBC driver on the machine running the queries (version 3 recommended), and — for Power Query Online or refresh in the service — an on-premises data gateway with the driver installed.

Sign-in kinds here are Microsoft Entra ID, Access token (JWT), and Password. Kerberos is deliberately absent: it lives in the original Starburst connector, not this one. Use this connector for new reports where viewer identity should reach Starburst; reports on the original connector don't need to migrate.

## Connect from the Desktop
Home → Get Data, search Starburst, and pick the connector documented here (not the plain Starburst entry). Enter Host and Port, expand advanced options for Role, Catalog, proxy, connection string, or native query if needed, and select DirectQuery when you want SSO to apply — sign in with Microsoft Entra ID or one of the other supported types, then choose the data in Navigator.

## Connect in Power Query Online
Create an on-premises connection under Settings → Manage connections and gateways → + New, targeting the gateway cluster that holds the Starburst ODBC driver, with this connector as the connection type. Enter the cluster details and credentials, Create the connection, and map the model's data source to it in dataset settings.

## Recipes in M
### Open the cluster
\`\`\`powerquery
let
 Source = StarburstAad.Contents("starburst.mydomain.com", 443)
in
 Source
\`\`\`
The first two arguments are mandatory: where the cluster listens, and on which port. Everything after that comes back as the catalog navigation table.

### Drill through two levels
\`\`\`powerquery
let
 Source = StarburstAad.Contents("starburst.mydomain.com", 443),
 Catalog = Source{[Name = "telemetry"]}[Data],
 Events = Catalog{[Name = "events"]}[Data]
in
 Events
\`\`\`
Two record lookups take you from cluster to catalog to table without depending on how the Navigator happens to sort.

### Set the role through options
\`\`\`powerquery
let
 Source = StarburstAad.Contents("starburst.mydomain.com", 443, [Role = "report_reader"])
in
 Source
\`\`\`
The optional options record accepts the same advanced fields as the original connector; Role must be granted to the identity authenticating the session.

## Limitations & Tips
- Entra ID single sign-on applies only to DirectQuery — import semantic models don't relay viewer identities to Starburst.
- Entra ID as a sign-in kind exists only on this connector; Kerberos exists only on the original.
- The ODBC driver and (for online use) a gateway with that driver are still required — the Entra wrapper doesn't remove them.
- Choose DirectQuery in the dialog when SSO is the reason you switched; Import plus this connector buys you nothing extra.
- Existing models on the original Starburst connector keep working untouched.`,
  },
  {
    slug: "tibco",
    name: "TIBCO(R) Data Virtualization",
    group: "Databases",
    tagline:
      "Query a TIBCO Data Virtualization server through a configured DSN, in import or live through DirectQuery.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Anonymous", "Windows", "Basic (username/password)"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["TibcoTdv.DataSource"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/tibco",
    content: `## When to Use It
TIBCO Data Virtualization publishes one virtual schema over sources your organization hasn't consolidated. When a report needs those federated tables and your access is already described by a DSN, this connector is the route. \`TibcoTdv.DataSource(dsn, optional advancedOptions, optional options)\` opens the named data source and returns a navigation table of what it exposes — pick an entry and drill into its Data to reach rows.

## Before You Start
Two setup pieces come from TIBCO, not Microsoft: the Power BI Connector for TIBCO Data Virtualization, downloaded from the TIBCO eDelivery site (the ZIP contains an installer that lays down the TDV client drivers plus the connector), and a DSN that points at your TDV server. The DSN's architecture — 32-bit or 64-bit — must match the product hosting the query. Sign-in kinds are Anonymous (uses whatever credentials are stored in the DSN), Basic (username/password submitted at connect), and Windows (the current user; requires the SSO connection property, and with Kerberos the Use Platform Kerberos API set to true).

This is an on-premises, driver-based source: Power Query Online needs a gateway with the connector and the DSN configured on it. Import and DirectQuery are both supported.

## Connect from the Desktop
With the connector installed and the DSN configured, open Get Data, select the TIBCO(R) Data Virtualization entry, and Connect. Provide the Data Source Name, choose Import or DirectQuery, pick your authentication type and enter credentials, then sign in. Navigator shows the database contents — load or transform.

## Connect in Power Query Online
Select the TIBCO(R) Data Virtualization connector on the data source page, enter the same DSN, and choose the gateway where the drivers and DSN live. Sign in with Anonymous, Basic, or Windows as your situation allows, continue to the data selection, pick what you need, and transform it in the editor.

## Recipes in M
### Open a DSN
\`\`\`powerquery
let
 Source = TibcoTdv.DataSource("Power BI TDV")
in
 Source
\`\`\`
The DSN string has to match a data source name defined on the machine executing the query — Desktop or gateway alike.

### Drill into a published view
\`\`\`powerquery
let
 Source = TibcoTdv.DataSource("Power BI TDV"),
 Sales = Source{[Name = "Sales"]}[Data]
in
 Sales
\`\`\`
The navigation table lists what the DSN exposes; indexing by Name keeps the query pinned to that entry regardless of sort order.

### Pass connection properties
\`\`\`powerquery
let
 Source = TibcoTdv.DataSource("Power BI TDV", "PropertyA=Value1;PropertyB=Value2;")
in
 Source
\`\`\`
The second argument is a semicolon-separated string of connection properties not already configured in the DSN; the third, an options record, is there when you need it.

## Limitations & Tips
- Install the TIBCO connector before anything else — without it the connector won't appear in Get Data at all.
- Match DSN bitness to the host product; a 64-bit DSN is invisible to a 32-bit host and vice versa.
- Anonymous authentication inherits whatever the DSN stores, so gateway deployments should avoid relying on a developer's saved credentials.
- DirectQuery covers Power BI semantic models; keep native SQL statements narrow so live queries stay predictable.
- A native SQL statement advanced option exists for pushing a specific query instead of browsing the navigation table.`,
  },
  {
    slug: "vertica-database",
    name: "Vertica database",
    group: "Databases",
    tagline:
      "Load Vertica tables with a username and password, over a Vertica ODBC driver you install yourself.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["Vertica.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/vertica-database",
    content: `## When to Use It
Vertica holds the wide, append-heavy tables — events, telemetry, clickstream — that other databases complain about. This connector reaches one server and one database at a time and returns a navigation table of what's inside, so you can drill to schemas and tables and fold filters into the Vertica SQL. \`Vertica.Database(server, database, optional options)\` is the entry point, and both leading arguments are required.

## Before You Start
The driver situation changed recently: since the April 2025 Power BI Desktop you must install the Vertica ODBC driver on your machine, and since the May 2025 gateway you must install it on the gateway too. Direct cloud connections stopped working in June 2025 — connections now go through the on-premises data gateway with the driver present. The built-in Simba driver is being deprecated from February 2026 in favor of the driver you install.

Authentication is Basic only: a Vertica username and password. Import and DirectQuery are supported.

## Connect from the Desktop
Home → Get Data → Database → Vertica → Connect. Paste the server name, choose Import or DirectQuery, and enter your Vertica credentials when prompted. Navigator opens on the server's contents — Load to pull it in, or Transform Data to shape it first.

## Connect in Power Query Online
Choose Vertica in the connector selection, provide the server name, and select the gateway that has the Vertica ODBC driver installed. Configure the username and password for Basic authentication if this is the first connection, then continue to Navigator and transform the data you selected.

## Recipes in M
### Connect to a database
\`\`\`powerquery
let
 Source = Vertica.Database("database.vertica.com", "verticadb01")
in
 Source
\`\`\`
Server and database are both mandatory — there is no "whole server" mode. The result is the navigation table for that database.

### Pick a schema, then trim rows
\`\`\`powerquery
let
 Source = Vertica.Database("database.vertica.com", "verticadb01"),
 Public = Source{[Name = "public"]}[Data],
 Events = Public{[Name = "events"]}[Data],
 Recent = Table.SelectRows(Events, each [event_time] >= #datetime(2026, 1, 1, 0, 0, 0))
in
 Recent
\`\`\`
Drill by Name to the schema and table, then filter in Power Query — predicates of this shape usually fold into the Vertica query.

### Give the connection room to breathe
\`\`\`powerquery
let
 Source = Vertica.Database("database.vertica.com", "verticadb01", [ConnectionTimeout = 0])
in
 Source
\`\`\`
The options record takes values like ConnectionTimeout; 0 means wait indefinitely instead of failing a slow connection setup.

## Limitations & Tips
- A driver problem shows up as a generic connection error — verify the Vertica ODBC driver version on the exact machine (or gateway) running the query.
- No gateway, no connection: since mid-2025 cloud-direct paths are unsupported, so plan the gateway before publishing.
- Authentication is username/password only; there is no Entra ID or key-based option here.
- DirectQuery covers Power BI semantic models — good for large fact tables you don't want copied into the model.
- Keep selected columns tight; every column you keep crosses the wire on each Import refresh.`,
  },
];

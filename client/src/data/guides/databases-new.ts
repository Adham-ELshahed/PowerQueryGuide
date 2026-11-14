import type { ConnectorGuide } from "../connector-guides";

/**
 * Practical guides for the Databases group — added by the Microsoft connectors
 * index expansion. Content is original (data-engineer voice), generated from
 * the connector audit facts under Temp/opencode/guides-src.
 */
export const databasesNewGuides: ConnectorGuide[] = [
  {
    slug: "actian",
    name: "Actian",
    group: "Databases",
    tagline:
      "Browse an Actian database from Power BI or Power Query Online, then load or live-query its tables.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Windows", "Basic (username/password)"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["Actian.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/actian",
    content: `## When to Use It
Actian is the route into an Actian database server — the system of record behind order processing, billing, or older line-of-business apps. Pick it when those tables belong in a Power BI semantic model, imported or queried live through DirectQuery.

\`Actian.Contents\` asks for two text values, the server and the database, and returns a table describing what that database holds. Treat it as a navigation table: each row is an object you drill into to reach the data.

## Before You Start
Get the server address and the exact database name from whoever administers the instance, plus an account allowed to read the tables you plan to use. Two sign-in kinds are offered: Windows and Basic (username/password). Windows presumes a domain identity the server already recognizes.

An Actian database normally sits inside your own network, so Power Query Online needs an on-premises data gateway that reaches the server — register a data source there and pick it when you build the connection. Power BI Desktop skips the gateway and connects from your workstation. Import and DirectQuery (Power BI semantic models) are supported.

## Connect from the Desktop
In Power BI Desktop, open Get Data, search for Actian, and select Connect. Fill Server and Database, choose Import or DirectQuery, then sign in with Windows or Basic credentials. Navigator shows the database's contents — load them or open the editor first.

## Connect in Power Query Online
Choose Actian on the "Connect to data source" page, enter Server and Database, and select the gateway that can reach the database. Pick your authentication kind, sign in, and continue to Choose data. Select the tables you want, then open Transform data to finish the shape in the editor.

## Recipes in M
### Open a database
\`\`\`powerquery
let
 Source = Actian.Contents("actian-prod", "salesdb")
in
 Source
\`\`\`
Both arguments are required: which server to open, and which database on it to enumerate.

### Drill into one table
\`\`\`powerquery
let
 Source = Actian.Contents("actian-prod", "salesdb"),
 Orders = Source{[Name = "orders"]}[Data]
in
 Orders
\`\`\`
The record lookup picks the row whose Name matches and returns its Data field. Pinning the name keeps the query stable regardless of how the navigation table is ordered.

### Filter before you load
\`\`\`powerquery
let
 Source = Actian.Contents("actian-prod", "salesdb"),
 Orders = Source{[Name = "orders"]}[Data],
 Recent = Table.SelectRows(Orders, each [order_date] >= #date(2026, 1, 1)),
 Kept = Table.SelectColumns(Recent, {"order_id", "customer_id", "order_date", "total"})
in
 Kept
\`\`\`
Trimming rows and columns keeps the refresh payload small — it matters when the query crosses a gateway.

## Limitations & Tips
- Preview status: expect behavior to shift between releases and retest published queries after updates.
- Server and database are both mandatory — there's no "browse the whole server" mode.
- DirectQuery covers Power BI semantic models; Power Query Online dataflows run on Import.
- Reuse one connection per server and database so gateway entries and stored credentials apply to every query that refreshes.`,
  },
  {
    slug: "amazon-athena",
    name: "Amazon Athena",
    group: "Databases",
    tagline:
      "Run SQL over your S3 data through Amazon Athena from Power BI, addressed by an ODBC DSN.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID", "Use Data Source Configuration"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["AmazonAthena.Databases"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/amazon-athena",
    content: `## When to Use It
Athena is where you query data that already sits in S3 — no cluster to size, no tables to move. This connector fits when your Athena access is defined through an ODBC DSN and you want the results inside a Power BI report.

\`AmazonAthena.Databases\` takes the DSN name and returns a table of the Athena databases behind it. You drill from there into the tables each database exposes, so one call sets up the whole path to your data.

## Before You Start
You need an AWS account with permission to use Athena, plus the Athena ODBC driver installed on the machine that will run the queries. A DSN — user or system — must already be configured. Sign-in kinds are Microsoft Entra ID and Use Data Source Configuration; when you connect through Entra ID you can also pass a role for the session.

Because the connector rides on an ODBC driver, Power Query Online requires an on-premises data gateway with the driver installed. Register the DSN as a system DSN: the gateway runs as a service and cannot see DSNs stored under an interactive user profile, which shows up as a "data source name not found" error. Supported capabilities are Import and DirectQuery (Power BI semantic models).

## Connect from the Desktop
Power BI Desktop: Home → Get Data, search for Athena, select Amazon Athena, then Connect. Enter your DSN, pick Import for smaller result sets or DirectQuery when you want Power BI to query Athena as you interact with visuals, and choose OK. At the credential prompt, select Use Data Source Configuration or AAD Authentication, sign in, and connect.

## Connect in Power Query Online
Pick Amazon Athena on the "Connect to data source" page, enter the DSN, and name your on-premises data gateway. Select the authentication kind and sign in, then continue to Choose data, select what you need, and Transform data to refine it in the editor.

## Recipes in M
### Connect through a DSN
\`\`\`powerquery
let
 Source = AmazonAthena.Databases("Simba Athena")
in
 Source
\`\`\`
The DSN string must match a data source name defined on the machine executing the query.

### Walk database to table
\`\`\`powerquery
let
 Source = AmazonAthena.Databases("Simba Athena"),
 Database = Source{[Name = "default"]}[Data],
 Events = Database{[Name = "clickstream_events"]}[Data]
in
 Events
\`\`\`
Each drill step indexes the navigation table by Name and pulls its Data field, so the query doesn't depend on Navigator ordering.

### Sign in under a specific role
\`\`\`powerquery
let
 Source = AmazonAthena.Databases("Simba Athena", "AnalyticsReader")
in
 Source
\`\`\`
The optional second argument is the role used when authenticating through Microsoft Entra ID; leave it out for ordinary connections.

## Limitations & Tips
- Only the DSN is required — role and options are optional, so simple connections stay one line.
- On the gateway, a user DSN behaves as missing; use a system DSN or you'll chase a Windows registry problem.
- DirectQuery keeps large Athena result sets out of the model; use Import when you prefer to shape and cache everything locally.
- Keep selected columns tight before loading; every column crosses the wire on each refresh.`,
  },
  {
    slug: "amazon-opensearch-service",
    name: "Amazon OpenSearch Service",
    group: "Databases",
    tagline:
      "Pull tables from an Amazon OpenSearch Service cluster into Power BI over the OpenSearch SQL ODBC driver.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)", "AWS_SIGV4 NONE"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["AmazonOpenSearchService.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/amazon-opensearch-service",
    content: `## When to Use It
OpenSearch clusters hold log streams, event indexes, and anything you search more than you aggregate. This connector brings that material into Power BI when you can reach the cluster by hostname, port, and an SSL switch.

\`AmazonOpenSearchService.Contents\` takes three required values and returns a table of what the server exposes. You pick an entry from that result and continue into its rows — the same navigation pattern you get from most database connectors.

## Before You Start
Install Power BI Desktop, have an OpenSearch deployment running, and install the OpenSearch SQL ODBC driver on the machine that runs the queries. The sign-in kinds listed are Basic (username/password) and AWS Signature Version 4 (\`AWS_SIGV4\`). Since the connector depends on that ODBC driver, Power Query Online needs an on-premises data gateway with the driver present; a cluster reachable from the cloud with no local dependency can be configured there. Both Import and DirectQuery (Power BI semantic models) are supported.

## Connect from the Desktop
Open Power BI Desktop, then Home → Get Data → More → Other, choose OpenSearch Project, and Connect. You'll see a warning about using a third-party service — continue. Enter host and port, toggle SSL, and confirm; then pick an authentication option and sign in. Select a table in Navigator to preview it, choose your columns, and Load.

## Connect in Power Query Online
Find the connector on the Power Query data source page, enter the server, port, and SSL setting, and attach your gateway if one is needed for the driver. Select the authentication kind, sign in, and continue to choose and transform data.

## Recipes in M
### Connect to a cluster
\`\`\`powerquery
let
 Source = AmazonOpenSearchService.Contents("localhost", 9200, true)
in
 Source
\`\`\`
Server, port, and the SSL flag are all required, so the same three values appear in every call.

### Open an index
\`\`\`powerquery
let
 Source = AmazonOpenSearchService.Contents("opensearch-prod", 9200, true),
 Logs = Source{[Name = "service_logs"]}[Data]
in
 Logs
\`\`\`
Index names in the navigation table become the Name keys you drill by.

### Trim to the fields you chart
\`\`\`powerquery
let
 Source = AmazonOpenSearchService.Contents("opensearch-prod", 9200, true),
 Logs = Source{[Name = "service_logs"]}[Data],
 Recent = Table.SelectRows(Logs, each [timestamp] >= #datetime(2026, 11, 1, 0, 0, 0)),
 Kept = Table.SelectColumns(Recent, {"timestamp", "level", "service"})
in
 Kept
\`\`\`
Log tables are wide and long; filtering time and dropping unused columns keeps imports and refreshes predictable.

## Limitations & Tips
- Preview status means the connector's surface can change — pin test coverage on your published queries.
- All three parameters are required; there are no defaults for port or SSL, so record them with the query.
- A connection failure usually traces to driver, host/port, credentials, or a stopped server — check in that order.
- Set UseSSL to false only against endpoints you trust; production clusters should stay on SSL.`,
  },
  {
    slug: "amazon-redshift",
    name: "Amazon Redshift",
    group: "Databases",
    tagline:
      "Load or live-query an Amazon Redshift cluster from Power BI using server, database, and optional tuning options.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft account", "Amazon Redshift"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["AmazonRedshift.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/amazon-redshift",
    content: `## When to Use It
Redshift is your cloud warehouse for aggregated, reportable history. Reach for it when the facts you model live in a Redshift cluster and you want either a full Import or DirectQuery against the cluster.

\`AmazonRedshift.Database\` returns a table listing the tables on the cluster in the database you name. Drill into any row to get the table's data, or keep the result as a catalog for parameter-driven queries.

## Before You Start
You need an AWS account and the cluster's endpoint — format it as ServerURL:Port, for example \`contoso.redshift.amazonaws.com:5439\` — along with the database name. Sign-in kinds are Amazon Redshift (database username and password) and Microsoft account for single sign-on. Advanced options let you supply a provider name (an ARN used with Microsoft authentication) and a batch size controlling how many rows arrive per call.

For Power Query Online, attach an on-premises data gateway when the service can't reach the cluster directly, such as one inside a private network; the dialog also offers an encrypted-connection toggle. Desktop connects from your machine with no gateway. Import and DirectQuery (Power BI semantic models) are both supported.

## Connect from the Desktop
Get Data → Amazon Redshift → Connect. Fill Server (URL plus port) and Database, optionally open Advanced Options, and select your connectivity mode. On first connection, enter your Redshift user name and password, then Connect. Navigator lists the cluster's contents for you to select and load.

## Connect in Power Query Online
Select Amazon Redshift from the data source list, enter Server and Database, and choose a gateway if required. Pick the authentication kind, sign in, decide on the encrypted connection, and continue to Navigator, where Transform data opens the editor.

## Recipes in M
### Connect to a cluster
\`\`\`powerquery
let
 Source = AmazonRedshift.Database("contoso.redshift.amazonaws.com:5439", "dev")
in
 Source
\`\`\`
The port rides along inside the server string, so the two required arguments stay the endpoint and the database.

### Drill into a table
\`\`\`powerquery
let
 Source = AmazonRedshift.Database("contoso.redshift.amazonaws.com:5439", "dev"),
 Customers = Source{[Name = "customers"]}[Data]
in
 Customers
\`\`\`
Indexing by Name gives you the table without depending on the order Navigator happens to display.

### Fetch rows in batches
\`\`\`powerquery
let
 Source = AmazonRedshift.Database("contoso.redshift.amazonaws.com:5439", "dev", [BatchSize = 500])
in
 Source
\`\`\`
The options record accepts a BatchSize: small values mean more round trips, larger values fewer calls but higher memory use on the client.

## Limitations & Tips
- Server and database are required; options is optional and only needed when you tune the connection.
- Batch size is a tradeoff — raise it for wide imports if memory allows, keep it modest for scheduled refreshes.
- DirectQuery avoids moving fact volumes, but every visual interaction issues a query, so design model measures accordingly.
- Single sign-on via Microsoft account works through the service and the gateway; store the data source accordingly.`,
  },
  {
    slug: "atscale-cubes",
    name: "AtScale cubes",
    group: "Databases",
    tagline:
      "Connect Power BI to an AtScale server URL and browse its modeled cubes as a navigation table.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["AtScale"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["AtScale.Cubes"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/atscale-cubes",
    content: `## When to Use It
AtScale publishes governed, business-facing models over your underlying storage, so reports read curated cubes instead of raw tables. Use this connector when consumers should work against AtScale's semantic layer rather than individual source tables.

\`AtScale.Cubes\` takes the AtScale server URL and returns a table of what that server publishes. Drill into the row for the cube you want and the cube's data lands in your query, ready to load.

## Before You Start
You need the AtScale server URL — the XMLA endpoint shown in your environment, shaped like \`https://contoso.atscale.com:10502/xmla/\` — and credentials of the AtScale kind. A second, optional record parameter carries connection options. Because the target is a URL, Power Query Online only needs a gateway if that endpoint isn't reachable from the cloud; when it is, register the connection without one. The connector runs in Power BI and Power Query Online and supports Import and DirectQuery (Power BI semantic models).

## Connect from the Desktop
Power BI Desktop: Get Data, search for AtScale, and connect. Enter the server URL in the Server box, sign in with your AtScale credentials, and continue. Navigator lists the available cubes — select one to preview, then Load or Transform Data.

## Connect in Power Query Online
Select the AtScale connector on the data source page, paste the server URL, and attach a gateway only when the endpoint requires one. Choose the authentication kind, sign in, and move on to pick cubes and open the editor.

## Recipes in M
### List the cubes
\`\`\`powerquery
let
 Source = AtScale.Cubes("https://contoso.atscale.com:10502/xmla/")
in
 Source
\`\`\`
One required argument — the server URL — and you get back the catalog to navigate.

### Open a cube by name
\`\`\`powerquery
let
 Source = AtScale.Cubes("https://contoso.atscale.com:10502/xmla/"),
 Sales = Source{[Name = "Sales"]}[Data]
in
 Sales
\`\`\`
Drilling on Name pins the cube, so reordering or re-publishing upstream doesn't silently repoint the query.

### Keep the columns the report uses
\`\`\`powerquery
let
 Source = AtScale.Cubes("https://contoso.atscale.com:10502/xmla/"),
 Sales = Source{[Name = "Sales"]}[Data],
 Kept = Table.SelectColumns(Sales, {"OrderDate", "Region", "Revenue"})
in
 Kept
\`\`\`
Select only what visuals need — cube queries often return many attributes you'll never display.

## Limitations & Tips
- The server argument is required; the options record is optional and can stay out of everyday queries.
- DirectQuery is available for Power BI semantic models, which keeps cube queries live instead of copying them into the model.
- The URL must match the endpoint your AtScale environment publishes, path included.
- Reuse one connection per endpoint so credentials are entered once across reports.`,
  },
  {
    slug: "azure-cosmos-db-for-mongodb-vcore",
    name: "Azure Cosmos DB for MongoDB vCore",
    group: "Databases",
    tagline:
      "Query an Azure Cosmos DB for MongoDB vCore cluster from Power BI, optionally scoping to one database and collection.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["AzureCosmosDBForMongoDBvCore.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/azure-cosmos-db-for-mongodb-vcore",
    content: `## When to Use It
The vCore-based Mongo API is where document data lands when you want Cosmos DB's Mongo interface without the account-level API. This connector lets Power BI read those documents, in Import or DirectQuery.

\`AzureCosmosDBForMongoDBvCore.Contents\` accepts the cluster endpoint plus an optional database and collection. Give neither and you see every database with its collections; give both and the connection narrows to that one collection; give a collection without a database and the connection fails — the pair has to make sense.

## Before You Start
Have the endpoint URL at hand and a username and password for the cluster — the only sign-in kind offered is Basic (username/password). For Power Query Online, attach a gateway when the service can't reach the endpoint directly; a publicly reachable endpoint needs none. The connector appears in Power BI and Power Query Online, and it's in Preview, so treat published behavior as provisional.

## Connect from the Desktop
Get Data, choose Azure Cosmos DB for MongoDB vCore, and enter the Cosmos DB endpoint. Database Name and Collection Name are optional — supplying both shortcuts Navigator to a single collection. Select Import or DirectQuery, confirm, sign in with your username and password, then pick collections in Navigator and load or transform them.

## Connect in Power Query Online
Open the get data experience, select the connector, and provide the endpoint plus optional database and collection. Use an existing connection or a gateway, sign in with basic credentials, then choose tables and Transform data.

## Recipes in M
### Connect to the whole cluster
\`\`\`powerquery
let
 Source = AzureCosmosDBForMongoDBvCore.Contents("https://cosmosEndpoint:5000")
in
 Source
\`\`\`
Only the endpoint is required; the rest of the signature is optional scoping.

### Drill database to collection
\`\`\`powerquery
let
 Source = AzureCosmosDBForMongoDBvCore.Contents("https://cosmosEndpoint:5000"),
 Database = Source{[Name = "appdb"]}[Data],
 Events = Database{[Name = "events"]}[Data]
in
 Events
\`\`\`
Navigator shows collections beneath each database, so the two drills reproduce exactly what you'd click.

### Scope at connect, then filter
\`\`\`powerquery
let
 Source = AzureCosmosDBForMongoDBvCore.Contents("https://cosmosEndpoint:5000", "appdb", "events"),
 Open = Table.SelectRows(Source, each [status] = "open"),
 Kept = Table.SelectColumns(Open, {"_id", "status", "openedOn"})
in
 Kept
\`\`\`
Passing database and collection up front means Navigator — and your query — never enumerates the rest of the cluster.

## Limitations & Tips
- Preview status: retest after updates, and keep an Import fallback for anything DirectQuery can't express.
- In DirectQuery, text predicates such as Begins With or Contains aren't supported; switch to Import or push the logic as a native Mongo query.
- Native Mongo queries return no schema and are available only in DirectQuery — project the fields you need, and remember only the first returned document shapes the columns.
- Never name a collection without naming its database; the connection errors out.`,
  },
  {
    slug: "azure-cosmos-db-v2",
    name: "Azure Cosmos DB v2",
    group: "Databases",
    tagline:
      "Connect Power BI to a Cosmos DB account and push filters and aggregates down to the container.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID", "API key"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["CosmosDB.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/azure-cosmos-db-v2",
    content: `## When to Use It
Cosmos DB's SQL API is the store for low-latency operational documents — carts, profiles, telemetry — and often the fastest way to report on them is to let Cosmos do the work. This connector is the fit when your data lives in a Cosmos DB account and you want Import for small slices or DirectQuery for live reads.

\`CosmosDB.Contents\` takes the account endpoint and an optional options record, returning a table you navigate to the container you want. From there, the drill gives you the container's documents as a table.

## Before You Start
You need a Cosmos DB account and its endpoint. Two sign-in kinds are offered: Microsoft Entra ID and API key. The options record covers connection behavior — number of retries, whether the AVERAGE aggregate passes down to Cosmos, and whether sorting on multiple columns passes down. Cosmos is a cloud endpoint, so Power Query Online needs a gateway only when the account isn't reachable from the service; otherwise connect directly. Import and DirectQuery (Power BI semantic models) are supported.

## Connect from the Desktop
Power BI Desktop: Get Data, search for "Cosmos DB v2", and select Azure Cosmos DB v2 → Connect. Enter the Cosmos Endpoint, choose Import for smaller sets or DirectQuery to let queries execute against the container, and confirm. Sign in with Entra ID or a key, then select containers in Navigator.

## Connect in Power Query Online
Pick Azure Cosmos DB v2 in the get data experience, supply the endpoint, and select an existing connection, a gateway, or none as your network requires. Choose the authentication kind, sign in, and continue to select data and transform it.

## Recipes in M
### Connect to an account
\`\`\`powerquery
let
 Source = CosmosDB.Contents("https://contoso.documents.azure.com:443/")
in
 Source
\`\`\`
The endpoint is the only required argument; everything else is tuning.

### Open a container
\`\`\`powerquery
let
 Source = CosmosDB.Contents("https://contoso.documents.azure.com:443/"),
 Products = Source{[Name = "products"]}[Data]
in
 Products
\`\`\`
The Name key matches the container as the Navigator presents it, keeping the drill explicit.

### Adjust retry and passdown behavior
\`\`\`powerquery
let
 Source = CosmosDB.Contents(
 "https://contoso.documents.azure.com:443/",
 [NUMBER_OF_RETRIES = "10", ENABLE_SORT_PASSDOWN_FOR_MULTIPLE_COLUMNS = "1"]
 )
in
 Source
\`\`\`
The options fields are text values: retries before a recoverable failure gives up, and a flag for multi-column sort pushdown.

## Limitations & Tips
- On partitioned containers, aggregates pass down only when the query also filters on the partition key; otherwise Power Query does the aggregation itself.
- Aggregates applied after TOP or LIMIT, or wrapped around DISTINCT, don't pass down — structure the query or accept client-side evaluation.
- AVERAGE passdown is on by default and can be switched off through the options record if Cosmos's undefined results on strings, booleans, or nulls would break your math.
- Retries default to 5; raise the value for flaky networks rather than failing a refresh outright.`,
  },
  {
    slug: "azure-database-mysql",
    name: "Azure Database for MySQL",
    group: "Databases",
    tagline:
      "Import tables from an Azure Database for MySQL server into Power BI using server, database, and MySQL credentials.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["AzureDatabaseForMySQL.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/azure-database-mysql",
    content: `## When to Use It
Azure Database for MySQL is a managed home for the MySQL schema behind apps and services. Use this connector when you need those tables inside Power BI and are happy with Import — this connector doesn't do DirectQuery.

\`AzureDatabaseForMySQL.Database\` takes the server and database names and hands back the database's contents as a table to navigate. Drill into a row for the table you want, then shape it before loading.

## Before You Start
Ask your database administrator for the server's fully qualified DNS name — its portal URL won't work — plus the database name and a MySQL account with read access. The server field accepts a port, for example \`contoso.mysql.database.azure.com:3306\`. The only sign-in kind is Basic (username/password), using a database account rather than your Azure portal login.

Networking must work from wherever the query runs: firewall rules for a public server, or private-endpoint resolution from your gateway. Power Query Online needs an on-premises data gateway in standard mode with the MySQL data provider (Oracle MySQL Connector/NET) installed on it. Encryption is enforced by Flexible Server by default. Supported capability: Import only.

## Connect from the Desktop
Power BI Desktop: Get Data, search for Azure Database for MySQL, and connect. Enter Server and Database, confirm, sign in with the MySQL username and password, and pick your tables in Navigator before loading or transforming.

## Connect in Power Query Online
Open the get data experience and select Azure Database for MySQL. Enter Server and Database, reuse an existing connection or pick a gateway that can reach the database and carries the MySQL provider, then sign in with username/password. Keep encryption enabled, continue to Navigator, and Transform data to refine the selection.

## Recipes in M
### Connect to a database
\`\`\`powerquery
let
 Source = AzureDatabaseForMySQL.Database("azuremysql.mysql.database.azure.com:3306", "appdb")
in
 Source
\`\`\`
Both arguments are required text values: the server DNS name (port optional but recommended) and one database on it.

### Drill and keep recent rows
\`\`\`powerquery
let
 Source = AzureDatabaseForMySQL.Database("azuremysql.mysql.database.azure.com:3306", "appdb"),
 Customers = Source{[Name = "customers"]}[Data],
 Recent = Table.SelectRows(Customers, each [created_on] >= #date(2026, 1, 1)),
 Kept = Table.SelectColumns(Recent, {"customer_id", "email", "created_on"})
in
 Kept
\`\`\`
Filter and trim in one pass: fewer rows and columns leave the server on every refresh.

## Limitations & Tips
- Import is the only capability — if you need live queries, this connector won't provide them.
- Server and database are both mandatory, and the connection remembers them: reuse identical values at refresh time or you'll create a second data source.
- Signing into Azure doesn't grant database access; the MySQL account must be granted rights on the named database.
- On a gateway, verify the MySQL provider installation before troubleshooting anything else — a missing provider looks like a failed connection.`,
  },
  {
    slug: "azure-database-postgresql",
    name: "Azure Database for PostgreSQL",
    group: "Databases",
    tagline:
      "Bring an Azure Database for PostgreSQL database into Power BI with Entra ID, a service principal, or database credentials.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID", "Service principal", "Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["AzurePostgreSQL.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/azure-database-postgresql",
    content: `## When to Use It
PostgreSQL on Azure carries everything from app state to warehoused facts. Pick this connector when the reporting source is a PostgreSQL database hosted in Azure and you want its tables available to Power BI through Import.

\`AzurePostgreSQL.Database\` asks for a server and a database, plus an optional options record, and returns the database's contents as a table. Navigate that table to the object you need and drill into its data.

## Before You Start
Collect the server address and database name — the samples read \`my-pg-sql-server.database.windows.net\` and \`my-database\` — and decide how you'll sign in: Microsoft Entra ID, a service principal, or Basic (username/password). The network path matters as much as the credentials: the machine running the query must resolve and reach the server, which usually means a gateway in Power Query Online when the database sits behind a private network. The connector is offered in Power BI and Power Query Online with Import supported; DirectQuery is not on the capability list.

## Connect from the Desktop
In Power BI Desktop, Get Data → search Azure Database for PostgreSQL → connect. Provide Server and Database, open Advanced Options if you need them, choose your credentials, and confirm. Navigator lists the database objects for you to load or transform.

## Connect in Power Query Online
Select the connector in the get data experience, enter Server and Database, and attach a gateway if the server isn't directly reachable. Choose one of the three authentication kinds, sign in, then continue to choose data and open Transform data.

## Recipes in M
### Connect to a database
\`\`\`powerquery
let
 Source = AzurePostgreSQL.Database("my-pg-sql-server.database.windows.net", "my-database")
in
 Source
\`\`\`
Server and database are the two required arguments; the options record can stay omitted.

### Drill into a table and trim columns
\`\`\`powerquery
let
 Source = AzurePostgreSQL.Database("my-pg-sql-server.database.windows.net", "my-database"),
 Orders = Source{[Name = "orders"]}[Data],
 Kept = Table.SelectColumns(Orders, {"order_id", "status", "order_ts"})
in
 Kept
\`\`\`
Drill by Name to pin the table, then keep only the columns the model uses.

### Filter rows while shaping
\`\`\`powerquery
let
 Source = AzurePostgreSQL.Database("my-pg-sql-server.database.windows.net", "my-database"),
 Orders = Source{[Name = "orders"]}[Data],
 Open = Table.SelectRows(Orders, each [status] = "open" and [order_ts] >= #datetime(2026, 10, 1, 0, 0, 0))
in
 Open
\`\`\`
Push the row filter as close to the top as you can — fewer rows leave the server on every refresh.

## Limitations & Tips
- Import only: plan scheduled refreshes rather than expecting live queries from visuals.
- Two parameters are required; if you reuse a connection elsewhere, keep the server and database strings byte-for-byte identical.
- Pick the authentication kind before you build — changing it later creates a new data source entry.
- DirectQuery seekers should check the Azure Synapse or database-generic connectors instead; this one imports.`,
  },
  {
    slug: "databricks-azure",
    name: "Azure Databricks",
    group: "Databases",
    tagline:
      "Query an Azure Databricks SQL Warehouse from Power BI with server hostname, HTTP path, and your pick of three sign-in kinds.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID", "Databricks Client Credentials Personal Access Token"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["Databricks.Catalogs"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/databricks-azure",
    content: `## When to Use It
Databricks SQL Warehouses serve curated tables to everything from notebooks to BI. Use the Azure Databricks connector for Databricks SQL Warehouse data unless your Databricks contact says otherwise — it's the default path for warehouse models in Azure.

\`Databricks.Catalogs\` takes the warehouse's server hostname and HTTP path, plus an optional options record, and returns the catalogs available through that warehouse. Drill from catalog to schema to table and load what the report needs.

## Before You Start
Grab the Server hostname and HTTP path from your workspace's connection details for the SQL Warehouse. Sign-in kinds: Microsoft Entra ID, Databricks client credentials, and personal access token; in Power Query Online a service principal is offered too. For private networks, allow the workspace's blob and store endpoints or use a virtual network / on-premises gateway so the service can reach workspace storage; a default catalog and database can be set under Advanced options. Import and DirectQuery (Power BI semantic models) are supported.

## Connect from the Desktop
Get Data, search Databricks, and choose Azure Databricks. Enter Server hostname and HTTP Path, then select OK. Authenticate with client credentials, a personal access token, or by signing in through the browser with Azure Active Directory, and browse Navigator.

## Connect in Power Query Online
Select Azure Databricks in the get data experience, enter hostname and HTTP path, and attach a gateway if the workspace is private. Choose from client credentials, a personal access token, Entra ID sign-in, or service principal, then continue to Navigator.

## Recipes in M
### Connect to a warehouse
\`\`\`powerquery
let
 Source = Databricks.Catalogs("example.azuredatabricks.net", "/sql/1.0/warehouses/abcdef1234567890")
in
 Source
\`\`\`
Both required values come from the warehouse's connection settings — hostname and HTTP path together identify one endpoint.

### Open a catalog
\`\`\`powerquery
let
 Source = Databricks.Catalogs("example.azuredatabricks.net", "/sql/1.0/warehouses/abcdef1234567890"),
 Catalog = Source{[Name = "analytics"]}[Data]
in
 Catalog
\`\`\`
The first drill lands you in the catalog; further indexers walk down to schemas and tables.

### Pin a default catalog
\`\`\`powerquery
let
 Source = Databricks.Catalogs(
 "example.azuredatabricks.net",
 "/sql/1.0/warehouses/abcdef1234567890",
 [Catalog = "analytics", Database = "reporting"]
 )
in
 Source
\`\`\`
Catalog and Database in the options record scope the connection so unqualified names resolve where you expect.

## Limitations & Tips
- \`Databricks.Query\` doesn't combine with DirectQuery in a Power BI semantic model — connect through catalogs when you go live.
- Web proxies work, but automatic proxy configuration from .pac files doesn't.
- Private workspaces need gateway or virtual network data gateway configuration for the service; test a refresh in the service before publishing.
- The connector now uses the ADBC driver instead of the embedded Spark ODBC driver; admin controls govern the transition, so confirm which path your tenant uses.`,
  },
  {
    slug: "spark",
    name: "Azure HDInsight Spark",
    group: "Databases",
    tagline:
      "Connect Power BI to a Spark or HDInsight cluster and model its tables in DirectQuery.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Windows", "Username / Password"],
    capabilities: ["DirectQuery"],
    functions: ["ApacheSpark.Tables"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/spark",
    content: `## When to Use It
A Spark cluster's SQL tables are where exploratory work settles into queryable facts. This connector targets Spark clusters — including Azure HDInsight — and returns a table listing the tables on the cluster, ready for you to drill into.

Because DirectQuery is the only supported capability, queries you build run against the cluster as report users interact with visuals. That suits large tables you don't want copied into a model.

## Before You Start
You need the cluster's server address — something like \`http://example.com:10000/cliservice\` — and the protocol number that tells the connector how to talk to that instance. Sign-in kinds are Windows and Username/Password. A cluster inside your network means Power Query Online queries must flow through an on-premises data gateway that can reach the server; Power BI Desktop connects from your machine. Only DirectQuery is listed as a capability, so there's no Import path to lean on.

## Connect from the Desktop
Power BI Desktop: Get Data, search for the Spark connector (shown as Azure HDInsight Spark), and connect. Enter the Server and Protocol values, sign in with Windows or username/password credentials, and pick the tables in Navigator. With DirectQuery as the mode, the model keeps references rather than copies.

## Connect in Power Query Online
Select the Spark connector on the data source page, enter server and protocol, and name the gateway that reaches the cluster. Choose the authentication kind, sign in, then choose tables and Transform data to shape them.

## Recipes in M
### List the cluster's tables
\`\`\`powerquery
let
 Source = ApacheSpark.Tables("http://example.com:10000/cliservice", 0)
in
 Source
\`\`\`
The protocol is a number the connector passes to the cluster; match it to how your endpoint is configured, and add options only when the default connection needs overriding.

### Drill into a table
\`\`\`powerquery
let
 Source = ApacheSpark.Tables("http://example.com:10000/cliservice", 0),
 FactSales = Source{[Name = "fact_sales"]}[Data]
in
 FactSales
\`\`\`
Drill by Name to bind the table explicitly rather than relying on the Navigator's order.

### Keep the reporting columns
\`\`\`powerquery
let
 Source = ApacheSpark.Tables("http://example.com:10000/cliservice", 0),
 FactSales = Source{[Name = "fact_sales"]}[Data],
 Kept = Table.SelectColumns(FactSales, {"sale_date", "store_id", "amount"})
in
 Kept
\`\`\`
In DirectQuery every visual drives SQL back to the cluster, so fewer columns means lighter queries.

## Limitations & Tips
- DirectQuery only: there's no Import option for this connector, so performance depends on the cluster being responsive at interaction time.
- Both server and protocol are required; a wrong protocol value shows up immediately as a connection failure.
- Gateway coverage is the usual blocker — confirm the gateway machine can open the cluster endpoint before debugging queries.
- Since nothing is cached locally, monitor cluster load and keep DAX or Power Query shaping lightweight.`,
  },
  {
    slug: "azure-horizondb",
    name: "Azure HorizonDB Database",
    group: "Databases",
    tagline:
      "Bring an Azure HorizonDB database into Power BI by naming the server, the database, and who signs in.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID", "Service principal", "Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["AzureHorizonDB.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/azure-horizondb",
    content: `## When to Use It
Azure HorizonDB is the managed database service you point reporting at when the operational data already lives in Azure. This connector is the right pick when you know the server and database names and want their tables inside a Power BI model through Import.

\`AzureHorizonDB.Database\` takes the server address and database name, plus an optional options record, and returns the database's contents as a table. Navigate that result to the object you need, then drill for its rows.

## Before You Start
Have the host name of your Azure HorizonDB server — samples look like \`my-pg-sql-server.database.windows.net\` or \`myserver.postgres.database.azure.com\` — plus the database name. Three sign-in kinds are offered: Microsoft Entra ID, service principal, and Basic (username/password). Reachability still matters: a private server means Power Query Online queries go through an on-premises data gateway that resolves the host, while Power BI Desktop connects from your machine when your network already reaches it. Supported capability: Import.

## Connect from the Desktop
In Power BI Desktop, Get Data, search for Azure HorizonDB Database, and connect. Enter Server and Database — both required — optionally adjust Advanced Options, and confirm. Sign in, then select tables in Navigator and load or transform them.

## Connect in Power Query Online
Pick the connector from the get data experience, provide Server and Database, and reuse an existing connection or select a gateway that can reach the server. Choose the authentication kind, sign in, continue to choose data, and open Transform data to refine it.

## Recipes in M
### Connect to a database
\`\`\`powerquery
let
 Source = AzureHorizonDB.Database("my-pg-sql-server.database.windows.net", "my-database")
in
 Source
\`\`\`
Server and database are the required pair; everything else is optional.

### Drill into one table
\`\`\`powerquery
let
 Source = AzureHorizonDB.Database("my-pg-sql-server.database.windows.net", "my-database"),
 Orders = Source{[Name = "orders"]}[Data]
in
 Orders
\`\`\`
Indexing by Name pins the table regardless of how the navigation table is sorted.

### Filter and trim for the report
\`\`\`powerquery
let
 Source = AzureHorizonDB.Database("my-pg-sql-server.database.windows.net", "my-database"),
 Orders = Source{[Name = "orders"]}[Data],
 Recent = Table.SelectRows(Orders, each [created_ts] >= #datetime(2026, 10, 1, 0, 0, 0)),
 Kept = Table.SelectColumns(Recent, {"order_id", "customer_id", "status", "created_ts"})
in
 Kept
\`\`\`
Filter first and keep a narrow column set so each refresh moves less data.

## Limitations & Tips
- Import only — build scheduled refresh into your design rather than expecting live queries.
- Both parameters are required; keep them identical wherever the connection is reused, or you'll end up with duplicate data sources.
- Authentication choice and gateway choice are coupled: a service principal used from the service must be accepted by whatever gateway path you configure.
- If a refresh times out, check network path and server load before changing query logic.`,
  },
  {
    slug: "synapse",
    name: "Azure Synapse Analytics workspace",
    group: "Databases",
    tagline:
      "Browse every workspace, database, and table you can reach in Azure Synapse Analytics with one Microsoft sign-in.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import"],
    functions: ["Synapse.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/synapse",
    content: `## When to Use It
This connector is for exploring a Synapse workspace — serverless SQL, on-demand data, and Spark tables all show up under it. It doesn't replace the Azure Synapse Analytics (SQL DW) connector; use it when you want to walk workspaces and databases interactively instead of writing against a SQL endpoint.

\`Synapse.Contents\` has no required arguments. Call it and you get a table of the workspaces your identity can see; drill into a workspace for its databases, then into a database for its tables.

## Before You Start
You need access to at least one Azure Synapse Analytics Workspace, and the only sign-in kind is Microsoft Entra ID. Visibility follows Azure role-based access control: if your rights are granted only inside Synapse itself, your workspace may not appear — assign access through Azure RBAC so the connector can list it. The workspace lives in the cloud, so no gateway is needed in Power Query Online. The connector is in Preview, and the supported capability is Import; native query and DirectQuery aren't offered here.

## Connect from the Desktop
Power BI Desktop: Home → Get Data, select Azure Synapse Analytics workspace (Beta), then Connect. Sign in with your Microsoft account, and once connected you'll see the workspaces you can access. Drill through workspaces, databases, and tables, then Load the selection or choose Transform Data to refine it in the editor.

## Connect in Power Query Online
Select the Azure Synapse Analytics workspace connector in the get data experience, sign in with Microsoft Entra ID, and browse the workspace list. Choose the tables you want and open Transform data to shape them before saving.

## Recipes in M
### List your workspaces
\`\`\`powerquery
let
 Source = Synapse.Contents()
in
 Source
\`\`\`
The function takes no required arguments — the sign-in you've already done decides what the list contains.

### Walk workspace to database to table
\`\`\`powerquery
let
 Source = Synapse.Contents(),
 Workspace = Source{[Name = "analytics-workspace"]}[Data],
 Database = Workspace{[Name = "warehouse_db"]}[Data],
 FactSales = Database{[Name = "fact_sales"]}[Data]
in
 FactSales
\`\`\`
Three indexers reproduce exactly the click path through the Navigator, and each step is pinned by name.

### Shape the drilled table
\`\`\`powerquery
let
 Source = Synapse.Contents(),
 Workspace = Source{[Name = "analytics-workspace"]}[Data],
 Database = Workspace{[Name = "warehouse_db"]}[Data],
 FactSales = Database{[Name = "fact_sales"]}[Data],
 Recent = Table.SelectRows(FactSales, each [sale_date] >= #date(2026, 1, 1))
in
 Recent
\`\`\`
Filter in the editor so the Import payload stays focused on the period reports actually use.

## Limitations & Tips
- Preview status plus Beta labeling in Get Data: validate behavior before you standardize on it.
- Import only — no DirectQuery and no native query support through this connector.
- Missing workspace? Check Azure RBAC assignments before anything else.
- For SQL DW workloads or live queries, use the Azure Synapse Analytics (SQL DW) connector instead; this one is the explorer.`,
  },
  {
    slug: "bi-connector",
    name: "BI Connector",
    group: "Databases",
    tagline:
      "Point Power Query at an ODBC DSN and read your BI layer's reports through the BI Connector driver.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["BIConnector.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/bi-connector",
    content: `## When to Use It
BI Connector exposes data from enterprise BI deployments — Oracle BI–style subject areas, for instance — through a driver that speaks ODBC. Use it when the governed numbers already exist as BI queries and you want them inside Power BI rather than rebuilt.

\`BIConnector.Contents\` takes one value: the ODBC data source name. It returns a table of what that DSN makes available; drill into a row to load the underlying result.

## Before You Start
Two things must exist before the first connection: the BI Connector Driver installed on the machine that runs the queries, and an ODBC DSN defined through the ODBC data source administrator. The only sign-in kind is Basic (username/password). Because the connector rides on ODBC, Power Query Online needs an on-premises data gateway with the driver installed and a DSN the gateway can resolve — a DSN defined only on your desktop won't exist there. Power BI Desktop connects locally. Import and DirectQuery are both supported.

## Connect from the Desktop
Power BI Desktop: Get Data, find BI Connector, and connect. The dialog asks for the ODBC Data Source Name — enter it exactly as registered, then sign in with the username and password the DSN expects. Navigator shows what the DSN exposes; select and load, or transform first.

## Connect in Power Query Online
Choose BI Connector on the data source page, enter the DSN, and select a gateway that carries the driver and the same DSN. Provide basic credentials, continue, then pick the data you need and Transform data.

## Recipes in M
### Connect through a DSN
\`\`\`powerquery
let
 Source = BIConnector.Contents("obiee-sales-reports")
in
 Source
\`\`\`
One required argument — the DSN name — must match a data source registered on the executing machine.

### Drill into a subject area
\`\`\`powerquery
let
 Source = BIConnector.Contents("obiee-sales-reports"),
 Sales = Source{[Name = "sales"]}[Data]
in
 Sales
\`\`\`
Drill by Name so the query targets the subject area explicitly, not whatever order the result happens to use.

### Keep only report columns
\`\`\`powerquery
let
 Source = BIConnector.Contents("obiee-sales-reports"),
 Sales = Source{[Name = "sales"]}[Data],
 Kept = Table.SelectColumns(Sales, {"period", "product", "revenue"})
in
 Kept
\`\`\`
BI result sets tend to carry many derived measures; keep the ones your visuals use.

## Limitations & Tips
- The DSN is the whole configuration surface — one required text parameter, no tuning knobs in the call.
- DirectQuery availability means you can avoid copying results, but each interaction sends a query back through the driver; watch report responsiveness.
- On the gateway, register the DSN as a system DSN so the service account can see it.
- If the driver isn't on the gateway, the connection fails before credentials are ever checked.`,
  },
  {
    slug: "clickhouse",
    name: "ClickHouse",
    group: "Databases",
    tagline:
      "Read ClickHouse databases from Power BI over ODBC, addressed by host, port, and an optional database.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["ClickHouse.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/clickhouse",
    content: `## When to Use It
ClickHouse is where event and metrics data lands when you need scans over billions of rows to come back fast. This connector brings those tables into Power BI, either imported for smaller loads or queried live with DirectQuery.

\`ClickHouse.Database\` takes a host and port, plus an optional database name and connection options, and returns the server's contents as a navigation table. Drill into a row for the table's data.

## Before You Start
You need a running ClickHouse setup and the ClickHouse ODBC driver installed on the machine executing the queries. The sign-in kind is Basic (username/password). Common ports are 443, 8123, and 8443; give the host with no prefix or suffix. Because the connector depends on that ODBC driver, Power Query Online requires an on-premises data gateway — install the driver there and configure the service to use the gateway. Import and DirectQuery (Power BI semantic models) are supported.

## Connect from the Desktop
Power BI Desktop start screen: Get Data, search ClickHouse, and select the connector. Fill Server (the bare instance address), Port, and optionally Database and Options — any ODBC option from the ClickHouse ODBC documentation, such as \`Timeout=600;UseUnicode=true\`. Choose DirectQuery to query the server directly or Import for a smaller load, sign in, then pick tables in Navigator and Load.

## Connect in Power Query Online
Follow the desktop configuration, then install and register an on-premises data gateway: ODBC drivers must live on the gateway machine for the cloud service to reach ClickHouse. Create the matching data source entry in the service, then select tables and transform them.

## Recipes in M
### Connect to a server
\`\`\`powerquery
let
 Source = ClickHouse.Database("play.clickhouse.com", 443)
in
 Source
\`\`\`
Host and port are required; the host takes no protocol prefix, and the port picks the transport you configured.

### Scope to a database and drill
\`\`\`powerquery
let
 Source = ClickHouse.Database("play.clickhouse.com", 443, "default"),
 Events = Source{[Name = "events"]}[Data]
in
 Events
\`\`\`
Supplying the optional database narrows the Navigator listing, and the drill then pins the table by name.

### Filter and trim before load
\`\`\`powerquery
let
 Source = ClickHouse.Database("play.clickhouse.com", 443, "default"),
 Events = Source{[Name = "events"]}[Data],
 Recent = Table.SelectRows(Events, each [event_date] >= #date(2026, 11, 1)),
 Kept = Table.SelectColumns(Recent, {"event_date", "user_id", "event_type"})
in
 Kept
\`\`\`
Event tables are wide by nature — prune early so imports and refreshes stay small.

## Limitations & Tips
- Host and port are required; database and options are optional, so a minimal connection stays two arguments.
- The gateway is mandatory for cloud scenarios — the ODBC driver can't be installed into the service itself.
- DirectQuery keeps fresh data in front of users; Import suits narrower extracts you shape heavily first.
- When a connection fails, verify the driver, then host, port, and credentials in that order.`,
  },
  {
    slug: "data-virtuality-ldw",
    name: "Data Virtuality LDW",
    group: "Databases",
    tagline:
      "Connect Power Query to a Data Virtuality LDW server and browse any virtual database it exposes.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["DataVirtuality.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/data-virtuality-ldw",
    content: `## When to Use It
Data Virtuality's logical data warehouse sits in front of many source systems and presents them as one virtual database. Use this connector when you want Power BI to read through that layer instead of connecting to each underlying system.

\`DataVirtuality.Database\` takes the server address and a virtual database (vdb), plus an optional options record, and returns a navigation table of what the vdb exposes. Drill into a row to reach the data itself.

## Before You Start
You need the server address — the port is optional, and the connector falls back to 35433 when you omit it — along with the vdb name, sample values like \`myServer.com:35433\` and \`myCustomVdb\`, and credentials for the Basic (username/password) sign-in kind. If the Data Virtuality server is hosted inside your network, Power Query Online queries need an on-premises data gateway that reaches it; Power BI Desktop connects from your machine. Import and DirectQuery are both supported capabilities.

## Connect from the Desktop
Power BI Desktop: Get Data, search for Data Virtuality LDW, and connect. Enter Server (with port if it isn't 35433) and Database, sign in with username and password, then choose the objects you want from Navigator and load or transform them.

## Connect in Power Query Online
Select Data Virtuality LDW on the data source page, provide Server and Database, and attach a gateway that can reach the server. Choose the authentication kind, sign in, then continue to pick data and Transform data.

## Recipes in M
### Connect with an explicit port
\`\`\`powerquery
let
 Source = DataVirtuality.Database("myServer.com:35433", "myCustomVdb")
in
 Source
\`\`\`
The port rides inside the server string; database names the vdb you're working in.

### Connect using the default port
\`\`\`powerquery
let
 Source = DataVirtuality.Database("myServer.com", "datavirtuality")
in
 Source
\`\`\`
Omit the port and 35433 is used, which keeps the connection string short when the instance runs defaults.

### Drill and keep what matters
\`\`\`powerquery
let
 Source = DataVirtuality.Database("myServer.com:35433", "myCustomVdb"),
 Revenue = Source{[Name = "revenue_view"]}[Data],
 Kept = Table.SelectColumns(Revenue, {"month", "region", "amount"})
in
 Kept
\`\`\`
Virtual views often project every column from every join — trim to the reporting shape immediately after drilling.

## Limitations & Tips
- Server and database are required; the options record is optional and rarely needed for routine connections.
- DirectQuery works for Power BI semantic models, letting the virtual layer handle query execution at interaction time.
- Port confusion is the most common failure: confirm whether your instance runs on 35433 or a custom port and be consistent.
- Keep server, port, and vdb identical across refreshes so the same gateway data source keeps matching.`,
  },
  {
    slug: "databricks",
    name: "Databricks",
    group: "Databases",
    tagline:
      "Connect Power BI to an AWS Databricks SQL Warehouse with OAuth and browse its catalogs.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth", "Databricks Client Credentials (OIDC) Personal Access Token"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["DatabricksMultiCloud.Catalogs"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/databricks",
    content: `## When to Use It
This is the multi-cloud Databricks connector, scoped deliberately: a Databricks SQL Warehouse running on AWS, authenticated with OAuth. If your workspace runs on Azure, or you're not using OAuth on AWS or GCP, use the Azure Databricks connector instead. Databricks Community Edition isn't supported either way.

\`DatabricksMultiCloud.Catalogs\` takes the warehouse's hostname and HTTP path plus an optional options record, returning the catalogs visible through that warehouse. Drill down through catalog, schema, and table to build your model.

## Before You Start
Collect the Server hostname and HTTP path of your SQL Warehouse from its connection settings. Sign-in kinds: OAuth, Databricks client credentials (OIDC), and personal access token. The options record can set a default catalog and database for the connection. Network-wise, private setups may need a gateway for the service to reach workspace storage. Power BI and Power Query Online host the connector, with Import and DirectQuery (Power BI semantic models) supported.

## Connect from the Desktop
Get Data, search Databricks, and select the Databricks connector — the one intended for AWS warehouses using OAuth. Enter Server hostname and HTTP Path, and select OK. Sign in with client credentials, a personal access token, or OAuth through the browser, then browse Navigator.

## Connect in Power Query Online
Pick the Databricks connector in the get data experience, enter hostname and HTTP path, and select a gateway if your network requires one. The sign-in choices are Basic (username/password, unavailable with 2FA), Account Key for a personal access token, or Organizational account for OAuth; continue to Navigator when connected.

## Recipes in M
### Connect to a warehouse
\`\`\`powerquery
let
 Source = DatabricksMultiCloud.Catalogs("example.azuredatabricks.net", "/sql/1.0/warehouses/abcdef1234567890")
in
 Source
\`\`\`
Hostname and HTTP path together identify one SQL Warehouse; both are required.

### Open a catalog
\`\`\`powerquery
let
 Source = DatabricksMultiCloud.Catalogs("example.azuredatabricks.net", "/sql/1.0/warehouses/abcdef1234567890"),
 Catalog = Source{[Name = "analytics"]}[Data]
in
 Catalog
\`\`\`
The first drill reaches the catalog; follow with more indexers to reach schemas and tables.

### Set connection defaults
\`\`\`powerquery
let
 Source = DatabricksMultiCloud.Catalogs(
 "example.azuredatabricks.net",
 "/sql/1.0/warehouses/abcdef1234567890",
 [Catalog = "analytics", Database = "reporting"]
 )
in
 Source
\`\`\`
The options record's Catalog and Database fields preselect the scope so unqualified object names resolve consistently.

## Limitations & Tips
- Scope check first: AWS plus OAuth, otherwise reach for the Azure Databricks connector.
- The ADBC driver is now generally available and replaces the embedded Spark ODBC driver; check which one your tenant runs.
- Credentials are cached per warehouse in Power BI Desktop — faster reconnection, but shared machines carry credentials.
- DirectQuery is available for Power BI semantic models; confirm report interactivity meets expectations before publishing.`,
  },
  {
    slug: "denodo",
    name: "Denodo",
    group: "Databases",
    tagline:
      "Open a Denodo VDP server from Power BI using an ODBC DSN or a hand-written connection string.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID", "Windows", "Basic (username/password)"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["Denodo.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/denodo",
    content: `## When to Use It
Denodo virtualizes scattered sources into governed views, so BI reads one semantic surface instead of ten databases. This connector is the route to those views when you're ready to report against them.

\`Denodo.Contents\` accepts a DSN or a connection string, with optional debug and options arguments, and returns a navigation table of what the server offers. Drill into a row for the view's data.

## Before You Start
Install and run the Denodo platform, and if you're using a DSN, configure it in the ODBC data source administrator. Sign-in kinds: Microsoft Entra ID, Windows, and Basic (username/password). Connection strings must carry SERVER, PORT, and DATABASE in that order with consistent parameter naming, optionally SSLmode, and must omit the Driver field — the connector sets it. Because of the ODBC driver, Power Query Online requires an on-premises data gateway with the driver installed. Import and DirectQuery (Power BI semantic models) are supported.

## Connect from the Desktop
Home ribbon → Get Data → Database section → Denodo. Provide either a DSN or a connection string in the dialog, leave authentication for the next step, and sign in with your chosen kind. Navigator presents the views and tables for loading or transformation.

## Connect in Power Query Online
Select Denodo on the connect-to-data page, enter the DSN or connection string, and toggle debug mode if you need it. Name your on-premises data gateway — it must carry the ODBC driver — then sign in with basic or organizational credentials and continue to Choose data and Transform data.

## Recipes in M
### Connect through a DSN
\`\`\`powerquery
let
 Source = Denodo.Contents("DSN: Power BI - Denodo")
in
 Source
\`\`\`
The DSN form names an ODBC data source already configured on the executing machine.

### Connect through a connection string
\`\`\`powerquery
let
 Source = Denodo.Contents("SERVER=localhost;DATABASE=sakila;PORT=9999;")
in
 Source
\`\`\`
SERVER, PORT, and DATABASE are mandatory and order-sensitive; drop the Driver field and let the connector fill it.

### Pin low-level options and drill
\`\`\`powerquery
let
 Source = Denodo.Contents("DSN: Power BI - Denodo", false, [DenodoDatabase = "mydb", DenodoView = "myview"]),
 View = Source{[Name = "myview"]}[Data]
in
 View
\`\`\`
The debug flag defaults off, and the options record targets configuration the connection dialog doesn't expose.

## Limitations & Tips
- One required parameter — DSN or connection string — plus optional debug and options; DSN or string must be chosen deliberately, not mixed.
- Keep connection string parameter names in one casing convention; inconsistent capitalization breaks the parse.
- Capabilities may differ between products, so test the feature you rely on in the host you're deploying to.
- DirectQuery is available for Power BI semantic models, which pushes view execution back to Denodo.`,
  },
  {
    slug: "dremio-cloud",
    name: "Dremio Cloud",
    group: "Databases",
    tagline:
      "Query Dremio Cloud datasets from Power BI in DirectQuery, choosing project and engine at connect time.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID", "Personal Access Token"],
    capabilities: ["DirectQuery"],
    functions: ["DremioCloud.DatabasesByServerV370"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/dremio-cloud",
    content: `## When to Use It
Dremio Cloud puts a SQL endpoint over your lakehouse and lets you name the project and engine that run each query. This connector is for reading those datasets from Power BI.

\`DremioCloud.DatabasesByServerV370\` returns a table listing the datasets on the specified server. Supply the server alone to enumerate everything you're allowed to see, then drill into the dataset you want.

## Before You Start
The server value depends on your region: \`sql.dremio.cloud\` for Dremio Cloud US, \`sql.eu.dremio.cloud\` for Europe, or a coordinator host with port 31010 for Dremio Software. For Dremio Cloud, the optional project parameter takes the project UUID found under Project Settings → General Information. Sign-in kinds: Microsoft Entra ID and personal access token. An optional engine name routes the query; without one, Dremio applies its Engine Routing rules. The routing tag and routing queue parameters apply to Dremio Software, not Cloud. Encryption accepts an alternate trusted-certificate location if your environment doesn't use the system trust store. Only DirectQuery is supported.

## Connect from the Desktop
Power BI Desktop: Get Data, search for Dremio Cloud, and connect. Enter the Server, optionally add the project UUID and engine name, choose DirectQuery as the connectivity mode, and sign in with Entra ID or a personal access token. Navigator then lists datasets to select.

## Connect in Power Query Online
Select Dremio Cloud in the get data experience, provide the server and project, and select your authentication kind. Sign in, continue to the data selection page, and pick the datasets to transform.

## Recipes in M
### List datasets
\`\`\`powerquery
let
 Source = DremioCloud.DatabasesByServerV370("sql.dremio.cloud")
in
 Source
\`\`\`
Server is the only required argument; region endpoints map to their own hostnames.

### Scope to a project and drill
\`\`\`powerquery
let
 Source = DremioCloud.DatabasesByServerV370("sql.dremio.cloud", "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"),
 Dataset = Source{[Name = "sales_dataset"]}[Data]
in
 Dataset
\`\`\`
The project UUID narrows enumeration, and the drill pins the dataset by name.

### Pin the engine
\`\`\`powerquery
let
 Source = DremioCloud.DatabasesByServerV370("sql.eu.dremio.cloud", null, "engine")
in
 Source
\`\`\`
Passing null for project and then an engine name keeps routing explicit while leaving project selection to your defaults.

## Limitations & Tips
- DirectQuery only — there's no Import mode here, so every visual interaction reaches Dremio; design measures to limit query fan-out.
- Only the server is required; everything else exists to pin project, engine, and certificates for repeatable behavior.
- Routing tag and queue are Dremio Software concerns — they won't change how Dremio Cloud runs your query.
- Pick the right regional endpoint up front; the wrong host fails before authentication is attempted.`,
  },
  {
    slug: "dremio-software",
    name: "Dremio Software",
    group: "Databases",
    tagline:
      "Reach a self-hosted Dremio Server from Power BI and load or live-query its datasets.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID", "Username/Password"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["Dremio.DatabasesV370"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/dremio-software",
    content: `## When to Use It
Dremio Software is the self-managed version: your own server, your own capacity planning. This connector reads the datasets it exposes, in Import or DirectQuery, for reports that should live alongside the cluster.

\`Dremio.DatabasesV370\` returns a table listing the datasets on the Dremio server. Navigate that list and drill into a row for the dataset's contents.

## Before You Start
You need the Dremio server address with its port, sample \`servername:31010\`, and the encryption setting — encryption is a required text argument and must be enabled when the Power BI service connects directly. Sign-in kinds: Microsoft Entra ID and Username/Password. Optional arguments let you name an engine, a routing tag, and a routing queue for workload management, plus an options record. Because the server is self-hosted, Power Query Online queries go through an on-premises data gateway that can reach it. Import and DirectQuery (Power BI semantic models) are supported.

## Connect from the Desktop
Power BI Desktop: Get Data, find the Dremio connector, and connect. Enter the Dremio Server value, set Encryption, and optionally supply engine and workload-management fields. Choose your connectivity mode, sign in with Entra ID or username/password, then select datasets in Navigator.

## Connect in Power Query Online
Select the Dremio Software connector, enter the server and encryption setting, and name a gateway that reaches the host. Pick the authentication kind, sign in, and continue to choose datasets and Transform data.

## Recipes in M
### Connect to a server
\`\`\`powerquery
let
 Source = Dremio.DatabasesV370("servername:31010", "on")
in
 Source
\`\`\`
Server and encryption are both required text values; encryption must be on for direct service connections.

### Drill into a dataset
\`\`\`powerquery
let
 Source = Dremio.DatabasesV370("servername:31010", "on"),
 Orders = Source{[Name = "orders"]}[Data]
in
 Orders
\`\`\`
Indexing by Name binds the dataset explicitly instead of trusting the listing order.

### Route the query through a named engine and queue
\`\`\`powerquery
let
 Source = Dremio.DatabasesV370("servername:31010", "on", "engine", null, "queue")
in
 Source
\`\`\`
The optional arguments — engine, routing tag, routing queue — steer workload management; null leaves a slot at its default.

## Limitations & Tips
- Both server and encryption are mandatory; without encryption enabled, service-side connections won't work.
- Routing tag and queue matter on self-managed deployments where queues are defined — set them when contention is expected.
- A gateway is the standard blocker for cloud refresh against an internal server; verify reachability before tuning queries.
- DirectQuery keeps reports current without copying datasets; Import suits stable extracts you reshape heavily.`,
  },
  {
    slug: "elasticsearch",
    name: "ElasticSearch",
    group: "Databases",
    tagline:
      "Reach an ElasticSearch cluster over HTTP, pull its indices into Power Query, and optionally keep a document-ID column for joins.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Anonymous", "Basic (username/password)"],
    capabilities: ["Import"],
    functions: ["ElasticSearch.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/elasticsearch",
    content: `## When to Use It
ElasticSearch keeps searchable JSON documents — log events, catalog rows, ticket text — behind a REST endpoint instead of tables. Pick this connector when the cluster is the source of truth and you need its content shaped next to the rest of your model. \`ElasticSearch.Database\` takes the instance URL, plus an optional name for the document-identifier column, and hands back a table you drill into to reach individual indices.
## Before You Start
Sign-in kinds are Anonymous for open clusters and Basic (username/password) for secured ones. The connector ships in Preview and supports Import only, so expect scheduled refresh rather than live queries. A cluster on a private network needs an on-premises data gateway when you refresh from Power Query Online; a publicly reachable endpoint needs none. It's available in Power BI and Power Query Online.
## Connect from the Desktop
Get Data → search for ElasticSearch → Connect. Paste the URL, such as "https://search.contoso.com:9200", and fill in a document-ID column name only if you want identifiers carried through. Choose Anonymous or Basic, then pick Load or Transform Data in Navigator.
## Connect in Power Query Online
Pick ElasticSearch from the get-data list, create a connection or reuse one, and enter the same URL. Set the authentication kind, choose a gateway only when the cluster isn't directly reachable from the cloud service, then continue to Navigator.
## Recipes in M
### Connect and keep document identifiers
\`\`\`powerquery
let
 Source = ElasticSearch.Database("https://search.contoso.com:9200", "ID")
in
 Source
\`\`\`
"ID" becomes the column carrying document identifiers. Omit the argument entirely and those identifiers simply don't come back.
### Open one index by name
\`\`\`powerquery
let
 Source = ElasticSearch.Database("https://search.contoso.com:9200", "ID"),
 Orders = Source{[Name = "orders"]}[Data]
in
 Orders
\`\`\`
Navigation rows are labeled by index name, so drilling by Name pins the index you want regardless of how Navigator sorted things.
### List only matching indices
\`\`\`powerquery
let
 Source = ElasticSearch.Database("https://search.contoso.com:9200", "ID"),
 Logs = Table.SelectRows(Source, each Text.StartsWith([Name], "logs-"))
in
 Logs
\`\`\`
Filtering the navigation table first keeps you from expanding indices you were never going to touch.
## Limitations & Tips
Preview behavior can change between releases, and there's no DirectQuery — plan refreshes around import volumes. \`keyColumnName\` is optional while the URL is required, and the URL should carry scheme and port. Filter the navigation table down to the indices you need before expanding rows, and use a gateway whenever the cluster sits behind a firewall the Power BI service can't cross.`,
  },
  {
    slug: "exact-online-premium",
    name: "Exact Online Premium",
    group: "Databases",
    tagline:
      "Connect Power BI to an Exact Online Premium subscription through ODBC for import and DirectQuery reporting.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Login"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["ExactOnlinePremium.Contents"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/exact-online-premium",
    content: `## When to Use It
Exact Online Premium is Exact's reporting-oriented edition, and this connector reaches it through its ODBC layer. \`ExactOnlinePremium.Contents\` takes no arguments at all — your sign-in identity decides what comes back — and yields a table whose rows you drill into to reach the datasets your account may read. Use it when finance and operations numbers need to sit next to the rest of the model rather than in a separate export.
## Before You Start
You need an Exact Online Premium subscription, the ODBC Connector version 18 installed on the machine that runs the queries, and your IP address added to Exact Online's Power BI access list (Master data screen → Microsoft Office 365 section). The sign-in kind is Login: a user name and password for your Exact account. Because the driver runs locally, refreshes from Power Query Online go through an on-premises data gateway — install it on a managed machine that stays on, and put the same ODBC driver there too. Both Power BI and Power Query Online are supported, and the connector is in Preview.
## Connect from the Desktop
Get Data → Database → Exact Online Premium → Connect. The first pass shows a preview-connector notice; dismiss it permanently if you like. Select Sign in, enter your Exact user name and password, then pick Load or Transform Data in Navigator.
## Connect in Power Query Online
Choose Exact Online Premium from the connector list, create or select a connection, and sign in with the same Login credentials. Select the gateway that hosts the ODBC driver — without it the service can't reach the source — then continue to Navigator.
## Recipes in M
### Connect with no arguments
\`\`\`powerquery
let
 Source = ExactOnlinePremium.Contents()
in
 Source
\`\`\`
There are no parameters to fill; the credentials attached to the data source determine the visible content.
### Open the dataset you need
\`\`\`powerquery
let
 Source = ExactOnlinePremium.Contents(),
 Sales = Source{[Name = "Sales"]}[Data]
in
 Sales
\`\`\`
Swap "Sales" for whatever name Navigator showed you — the drill key is that exact label.
### Audit what's available
\`\`\`powerquery
let
 Source = ExactOnlinePremium.Contents(),
 Names = Table.SelectColumns(Source, {"Name"})
in
 Names
\`\`\`
Keeping just the Name column gives you a quick inventory before you commit to loading rows.
## Limitations & Tips
This is a Preview connector, so treat behavior as subject to change. If the ODBC layer reports that your client IP isn't allowed to access the server, the IP allow list in Exact Online is the fix, not the credentials. Import and DirectQuery are both available. Refresh runs only where the ODBC driver and gateway are installed together, and a driver mismatch on that machine will block refresh until it's corrected.`,
  },
  {
    slug: "exasol",
    name: "Exasol",
    group: "Databases",
    tagline:
      "Run DirectQuery against an Exasol cluster with a connection string and an explicit encryption switch.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Anonymous", "Windows", "Basic (username/password)", "/ Kerberos"],
    capabilities: ["DirectQuery"],
    functions: ["Exasol.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/exasol",
    content: `## When to Use It
Exasol is an in-memory analytical database, and this connector is for keeping queries there instead of pulling copies into Power BI. \`Exasol.Database\` needs two text values: a connection string — either a host range like "192.168.80.11..15:8563" or a DSN such as "DSN=exa-one" — and an encryption flag of "Yes" or "No". It returns a table of the cluster's catalog that you drill into for schemas and tables.
## Before You Start
Authentication kinds are Anonymous, Windows, Basic (username/password), and Kerberos, so match whatever the DBA enabled on the cluster. The connector supports DirectQuery only: every visual fires SQL back at Exasol, which keeps data fresh but makes filter design part of your job. Clusters normally live on private networks, so Power Query Online refreshes need an on-premises data gateway. Both Power BI and Power Query Online are supported, and the connector is generally available.
## Connect from the Desktop
Get Data → Database → Exasol → Connect. Enter the connection string and the encryption value, then authenticate with the kind your cluster expects. Navigator shows the catalog; choose Load or Transform Data.
## Connect in Power Query Online
Select Exasol in the connector list, supply the same connection string and encryption flag, pick an authentication kind, and choose a gateway — in practice almost always, since Exasol clusters rarely face the public internet. Continue to Navigator.
## Recipes in M
### Connect over a DSN
\`\`\`powerquery
let
 Source = Exasol.Database("DSN=exa-one", "Yes")
in
 Source
\`\`\`
The second argument is plain text, not a logical — "Yes" enables an encrypted connection, anything else doesn't.
### Drill into a schema table
\`\`\`powerquery
let
 Source = Exasol.Database("192.168.80.11..15:8563", "Yes"),
 Sales = Source{[Name = "SALES"]}[Data]
in
 Sales
\`\`\`
Host-range form is handy when the cluster spans several nodes behind one listener.
### Sample before committing
\`\`\`powerquery
let
 Source = Exasol.Database("DSN=exa-one", "Yes"),
 Sales = Source{[Name = "SALES"]}[Data],
 Peek = Table.FirstN(Sales, 500)
in
 Peek
\`\`\`
A small first pass keeps DirectQuery iterations quick while you settle the shape.
## Limitations & Tips
DirectQuery-only means no Import mode: design measures so filters fold into the SQL sent to Exasol. Both parameters are required, including the Yes/No encryption text — omitting it isn't an option. Use a gateway for online refresh, and confirm the DSN referenced in the connection string exists on that gateway machine.`,
  },
  {
    slug: "google-bigquery",
    name: "Google BigQuery",
    group: "Databases",
    tagline:
      "List and query Google BigQuery projects from Power BI with OAuth or service-account sign-in.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["OAuth", "Service Account Login"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["GoogleBigQuery.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/google-bigquery",
    content: `## When to Use It
BigQuery is Google's serverless warehouse; this connector is the way into it from Power BI. \`GoogleBigQuery.Database\` takes no required arguments — an optional options record covers connection timeouts, command timeouts, the billing project, and Storage API usage — and returns a table of the projects your identity can see. Drill from there into datasets and tables as you would in Navigator.
## Before You Start
You need either a Google account for OAuth sign-in or a service account (email plus JSON key) for Service Account Login. BigQuery itself is cloud-hosted, so the Power BI service talks to it cloud-to-cloud and no gateway is involved. Import and DirectQuery are both supported and the connector is generally available. The options record keys you'll actually use are BillingProject, ConnectionTimeout, CommandTimeout, and UseStorageApi — the last defaults to true.
## Connect from the Desktop
Get Data → GoogleBigQuery. Open Advanced options only if you need to set a billing project or timeouts; otherwise continue. Sign In with an organizational account, or switch to Service Account Login and paste the service account email and JSON key. Approve the Google consent screen, then pick your data in Navigator.
## Connect in Power Query Online
Find Google BigQuery in the get-data list, create or select a connection, and choose organizational or service-account sign-in. A gateway only enters the picture if you're mixing in on-premises sources. Sign in, then continue to Navigator.
## Recipes in M
### Pin the billing project
\`\`\`powerquery
let
 Source = GoogleBigQuery.Database([BillingProject = "My Billing Project"])
in
 Source
\`\`\`
Naming the billing project up front avoids an Access Denied error when the default project lacks job permissions.
### Drill into a project
\`\`\`powerquery
let
 Source = GoogleBigQuery.Database(),
 Project = Source{[Name = "My Billing Project"]}[Data]
in
 Project
\`\`\`
The returned table lists projects, so Name matches the project identifier you see in the Google console.
### Tune timeouts and Storage API
\`\`\`powerquery
let
 Source = GoogleBigQuery.Database([
 CommandTimeout = #duration(0, 0, 30, 0),
 UseStorageApi = false
 ])
in
 Source
\`\`\`
Setting UseStorageApi to false forces the REST API path instead of the Storage API — useful when that path is blocked in your environment.
## Limitations & Tips
Only one cloud connection is supported at a time, so you can't configure several BigQuery sources side by side. If reports built in the service still throw Access Denied, add BillingProject directly to the M. The connector is moving from its embedded ODBC driver to an ADBC-based one, so driver behavior may shift between releases. Keep imports honest: project lists are cheap, wide tables are not.`,
  },
  {
    slug: "google-bigquery-aad",
    name: "Google BigQuery (Microsoft Entra ID)",
    group: "Databases",
    tagline:
      "Authenticate to BigQuery with Microsoft Entra ID tokens, with a billing project required on every call.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Microsoft Entra ID"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["GoogleBigQueryAad.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/google-bigquery-aad",
    content: `## When to Use It
Same warehouse, different identity path: this variant exchanges Microsoft Entra ID tokens with Google's Workforce Federation instead of a Google account. \`GoogleBigQueryAad.Database\` requires a billing project as its first argument, plus an optional options record, and returns the table of available projects. Choose it when your organization standardizes on Entra ID and won't hand out Google credentials or service-account keys.
## Before You Start
You need a Microsoft Entra ID account, and the Google side must be configured as an OIDC-based federation to line up with Entra ID tokens — that setup lives with your BigQuery administrator. The only sign-in kind is Microsoft Entra ID. BigQuery is cloud-hosted, so no gateway is needed for it alone; Import and DirectQuery are both available, and the connector is generally available. Options include ConnectionTimeout, CommandTimeout, UseStorageApi, and AudienceUri for the workforce-pool audience.
## Connect from the Desktop
Get Data → search for Google BigQuery (Microsoft Entra ID). Enter the required Billing Project ID, choose Import or DirectQuery, then OK. Select Sign In, approve the Entra ID prompt, and pick Connect. Navigator opens with your projects.
## Connect in Power Query Online
Search Google in the get-data list and select this connector. Create a connection and enter the Billing Project ID, select a gateway only if on-premises sources are in play, then sign in and continue to Navigator.
## Recipes in M
### Connect with the billing project
\`\`\`powerquery
let
 Source = GoogleBigQueryAad.Database("My Billing Project")
in
 Source
\`\`\`
The first parameter is mandatory here — the billing project both scopes permissions and identifies where costs land.
### Drill into a project
\`\`\`powerquery
let
 Source = GoogleBigQueryAad.Database("My Billing Project"),
 Project = Source{[Name = "My Billing Project"]}[Data]
in
 Project
\`\`\`
Rows are projects, so the drill name is the project identifier.
### Pass audience and timeout options
\`\`\`powerquery
let
 Source = GoogleBigQueryAad.Database(
 "My Billing Project",
 [
 AudienceUri = "https://iam.googleapis.com/locations/global/workforcePools/contoso-pool/providers/azuread",
 CommandTimeout = #duration(0, 1, 0, 0)
 ]
 )
in
 Source
\`\`\`
AudienceUri carries the workforce-pool audience the driver uses for token exchange; the hour-long command timeout covers heavy queries.
## Limitations & Tips
The billing project is required, unlike the standard connector where it's optional. The federation must be OIDC-based or sign-in fails before Power Query gets anywhere. Nested and repeated fields arrive as JSON text columns — parse them with the JSON transforms in the editor rather than in the model. Watch for Access Denied on job creation: the billing project needs permissions, and driver migration to ADBC may shift behavior between releases.`,
  },
  {
    slug: "ibm-netezza-database",
    name: "IBM Netezza database",
    group: "Databases",
    tagline:
      "Load or DirectQuery an IBM Netezza appliance by server and database, with navigation toggles you control per query.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["IBM Netezza"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["Netezza.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/ibm-netezza-database",
    content: `## When to Use It
Netezza is an MPP warehouse appliance, and \`Netezza.Database\` is the direct line to it: server, database, and an optional options record. It returns the server's catalog as a table, which you drill into for schemas, tables, and views. Reach for it when appliance data should feed a Power BI semantic model either in full or live.
## Before You Start
Authentication is the IBM Netezza kind — user name and password against the database. You'll also need an ODBC driver on the machine that runs queries: the embedded Simba driver is being retired in favor of the IBM Netezza ODBC driver that customers install themselves, and since July 2025 Desktop and the gateway can use that user-installed driver (currently preview). The appliance is on-premises, so Power Query Online refreshes go through a gateway. Import and DirectQuery are both supported.
## Connect from the Desktop
Get Data → Database → IBM Netezza → Connect. Enter the server ("netezza:5480") and database ("netezza_database"), choose Import or DirectQuery, and sign in with your user name and password. Navigator then shows what the server exposes.
## Connect in Power Query Online
Select IBM Netezza in the connector list, enter server and database, choose your on-premises data gateway — it must have the Netezza driver installed — then configure user name and password and continue to Navigator.
## Recipes in M
### Connect with defaults
\`\`\`powerquery
let
 Source = Netezza.Database("netezza:5480", "netezza_database")
in
 Source
\`\`\`
Both arguments are required text; the port rides along after the colon in the server value.
### Walk schema to table
\`\`\`powerquery
let
 Source = Netezza.Database("netezza:5480", "netezza_database"),
 Schema = Source{[Name = "RETAIL"]}[Data],
 Fact = Schema{[Name = "FACT_SALES"]}[Data]
in
 Fact
\`\`\`
A two-step drill mirrors how Navigator nests folders, and it's stable even when sort order changes.
### Filter early after the drill
\`\`\`powerquery
let
 Source = Netezza.Database("netezza:5480", "netezza_database"),
 Schema = Source{[Name = "RETAIL"]}[Data],
 Recent = Table.SelectRows(Schema, each [ORDER_DATE] >= #date(2026, 1, 1))
in
 Recent
\`\`\`
Substitute your own date column; the point is to cut rows before they land in the model.
## Limitations & Tips
The driver changeover is the main risk: the Simba driver starts deprecating in March 2026, so the IBM driver must be present wherever queries run. Server and database are required; the options record is optional and covers timeouts plus navigation toggles such as hierarchical views and relationship columns. Both Import and DirectQuery are available — DirectQuery keeps the appliance authoritative but pushes every visual to it. Gateway plus driver must coexist on the same machine, and expand only the tables you load rather than the whole catalog.`,
  },
  {
    slug: "impala-database",
    name: "Impala database",
    group: "Databases",
    tagline:
      "Query Impala over HTTP with anonymous, database, or Windows credentials, in Import or DirectQuery.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Anonymous", "Windows", "Database"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["Impala.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/impala-database",
    content: `## When to Use It
Impala brings SQL to Hadoop-hosted data, and \`Impala.Database\` opens a connection with a single server value ("hostname:port") plus an optional options record. The result is a catalog table you drill into for databases and tables. Use it when the cluster already holds curated tables and you'd rather query them live than copy them.
## Before You Start
Three sign-in kinds are offered: Anonymous, Database (user name and password), and Windows. An unencrypted connection triggers a confirmation prompt, so know whether the cluster speaks TLS before you start. Because the cluster typically sits inside a private network, Power Query Online needs an on-premises data gateway — supported with all three authentication kinds. Import and DirectQuery are both available, and the connector is generally available.
## Connect from the Desktop
Get Data → Database → Impala → Connect. Type the server, choose Import or DirectQuery, and confirm the encryption prompt if one appears. Sign in with credentials or connect anonymously, then work in Navigator.
## Connect in Power Query Online
Select Impala in the connector list, enter server and port, choose your gateway, set the Authentication kind and credentials, and check or clear Use Encrypted Connection to match the cluster. Continue to Navigator and transform.
## Recipes in M
### Connect to a coordinator
\`\`\`powerquery
let
 Source = Impala.Database("impala.contoso.internal:21050")
in
 Source
\`\`\`
Host and port belong in the one string argument; there's no separate port parameter.
### Drill database, then table
\`\`\`powerquery
let
 Source = Impala.Database("impala.contoso.internal:21050"),
 Db = Source{[Name = "retail"]}[Data],
 Orders = Db{[Name = "orders"]}[Data]
in
 Orders
\`\`\`
Two nested drills reproduce the Navigator path without depending on its expanded state.
### Narrow the catalog first
\`\`\`powerquery
let
 Source = Impala.Database("impala.contoso.internal:21050"),
 Dbs = Table.SelectRows(Source, each Text.StartsWith([Name], "app_"))
in
 Dbs
\`\`\`
Restricting the navigation table to your databases keeps previews from probing ones you don't own.
## Limitations & Tips
The driver caps string types at 32K by default, which matters for free-text columns. Kerberos Realm can't be overridden through this connector. Both Import and DirectQuery work; a newer ADBC-based implementation (2.0) is in preview, so keep Desktop and the gateway current to pick up fixes. The options record is optional, and folding-friendly filters will save you round trips on every visual.`,
  },
  {
    slug: "indexima",
    name: "Indexima",
    group: "Databases",
    tagline:
      "DirectQuery an Indexima data hub by address and JDBC port, optionally pinning which ODBC driver to use.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["DirectQuery"],
    functions: ["Indexima.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/indexima",
    content: `## When to Use It
Indexima is an in-memory analytics engine built for very large query volumes, and \`Indexima.Database\` connects with the Data Hub address, the JDBC port, and an optional driver name plus options record. What comes back is the cluster's catalog as a table — drill into it to reach the cubes and tables you want reported.
## Before You Start
The only sign-in kind is Basic (username/password). DirectQuery is the only capability, so every interaction queries the cluster live; there's no import mode to fall back on. The cluster runs on infrastructure you control, so Power Query Online needs an on-premises data gateway, and that gateway machine needs whatever ODBC driver you name. Power BI and Power Query Online are both supported, and the connector is generally available.
## Connect from the Desktop
Get Data → Database → Indexima → Connect. Supply the server ("master.indexima.com") and port (10000); add an ODBC driver name only if you need to pin one. Sign in with your user name and password, then select your data in Navigator.
## Connect in Power Query Online
Choose Indexima from the connector list, enter the same address and port, select a gateway that can reach the cluster, sign in with Basic credentials, and continue to Navigator for transformation.
## Recipes in M
### Connect with defaults
\`\`\`powerquery
let
 Source = Indexima.Database("master.indexima.com", 10000)
in
 Source
\`\`\`
The port is a number argument here — no quotes — while the address is text.
### Pin a driver explicitly
\`\`\`powerquery
let
 Source = Indexima.Database("master.indexima.com", 10000, "IndeximaODBC")
in
 Source
\`\`\`
The third, optional argument names the driver installed on the machine running the query; pass null when any installed driver will do.
### Drill to an object
\`\`\`powerquery
let
 Source = Indexima.Database("master.indexima.com", 10000),
 Cube = Source{[Name = "SalesCube"]}[Data]
in
 Cube
\`\`\`
"SalesCube" stands in for the label Navigator displays for your object.
## Limitations & Tips
DirectQuery-only means measure design has to keep filters pushable, and there's no scheduled import to smooth spikes. Server and port are required; driver and options are not. Confirm the cluster address is reachable from wherever queries execute — for online refresh that's the gateway — and keep the driver there aligned with what the administrator expects.`,
  },
  {
    slug: "intersystems-healthinsight",
    name: "Intersystems Health Insight",
    group: "Databases",
    tagline:
      "Query Health Insight tables and cubes on InterSystems IRIS with host, port, namespace, SSL, and system-table switches.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["Import", "DirectQuery"],
    functions: ["IntersystemsHealthInsight.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/intersystems-healthinsight",
    content: `## When to Use It
InterSystems Health Insight exposes the HSAA data model — tables plus analytical cubes — on an IRIS instance. \`IntersystemsHealthInsight.Database\` takes five required arguments: host, superserver port, namespace, an SSL switch, and a system-table visibility switch. It returns a navigation view with a Table folder and a Cube folder, which you drill to reach individual objects.
## Before You Start
You need an IRIS account (user name and password, sign-in kind Basic) whose user has privileges on the SQL tables, views, and cubes, plus the IRIS ODBC driver installed separately from the WRC distributions page. IRIS usually lives on-premises, so Power Query Online refreshes run through a gateway that also has the driver. Import and DirectQuery are both supported, and the connector is generally available.
## Connect from the Desktop
Get Data → More → Database → Intersystems Health Insight → Connect. Fill in Host (IP Address) ("localhost"), Port ("1921"), Namespace ("HSANALYTICS"), then answer Yes or No for SSL/TLS and for hiding system tables. Pick your connectivity mode; when the authentication dialog appears, choose Basic and enter your IRIS credentials. Navigator opens with Table and Cube folders.
## Connect in Power Query Online
Find the connector in the get-data list, enter the same five connection values, select your gateway, authenticate with Basic credentials, and continue to Navigator to pick what to transform.
## Recipes in M
### Connect with defaults
\`\`\`powerquery
let
 Source = IntersystemsHealthInsight.Database(
 "localhost",
 1921,
 "HSANALYTICS",
 "No",
 "Yes"
 )
in
 Source
\`\`\`
The last two arguments are "Yes"/"No" text, not logicals, and all five are required.
### Drill into a table
\`\`\`powerquery
let
 Source = IntersystemsHealthInsight.Database("localhost", 1921, "HSANALYTICS", "No", "Yes"),
 Tables = Source{[Name = "Table"]}[Data],
 Patient = Tables{[Name = "Patient"]}[Data]
in
 Patient
\`\`\`
Navigator's Table folder is the first drill; the second uses the table name shown inside it.
### Connect over SSL with system tables visible
\`\`\`powerquery
let
 Source = IntersystemsHealthInsight.Database("10.0.0.12", 1921, "HSANALYTICS", "Yes", "No"),
 Cubes = Source{[Name = "Cube"]}[Data]
in
 Cubes
\`\`\`
Flipping both switches in one call shows how the folder contents change when system objects aren't hidden.
## Limitations & Tips
In DirectQuery, Health Insight booleans surface as BIT and long strings can trigger folding errors on filters and slicers. The workaround is a source-side view that CASTs booleans to integers and long strings to bounded VARCHAR — do that at the source rather than in Power Query. All five parameters are mandatory, including the text Yes/No flags, and the IRIS ODBC driver must be installed wherever the query executes.`,
  },
  {
    slug: "jethro",
    name: "Jethro",
    group: "Databases",
    tagline:
      "DirectQuery a Jethro database by server and database name through a preview, Basic-auth connector.",
    products: ["Power BI", "Power Query Online"],
    authentication: ["Basic (username/password)"],
    capabilities: ["DirectQuery"],
    functions: ["JethroODBC.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/jethro",
    content: `## When to Use It
Jethro accelerates SQL over Hadoop-hosted data, and \`JethroODBC.Database\` opens it with two text values — server and database — plus an optional options record. The result is a catalog table you drill into for the tables underneath. It's the pick when query latency at the source is already handled and you want Power BI pointed straight at it.
## Before You Start
Sign-in is Basic (username/password) only. The connector is DirectQuery-only and still in Preview, so every visual query runs against Jethro live and behavior may change between releases. Jethro clusters are on-premises or VPC-hosted, which means Power Query Online refreshes need an on-premises data gateway. Both Power BI and Power Query Online are supported.
## Connect from the Desktop
Get Data → Database → Jethro → Connect. Enter server and database, sign in with your user name and password, then choose your data in Navigator and Load or Transform Data.
## Connect in Power Query Online
Select Jethro in the connector list, provide server and database, choose a gateway that reaches the cluster, enter Basic credentials, and continue to Navigator.
## Recipes in M
### Connect to a database
\`\`\`powerquery
let
 Source = JethroODBC.Database("jethro.contoso.internal", "analytics")
in
 Source
\`\`\`
Both arguments are required text; the options record after them can be omitted entirely.
### Open a table
\`\`\`powerquery
let
 Source = JethroODBC.Database("jethro.contoso.internal", "analytics"),
 Events = Source{[Name = "events"]}[Data]
in
 Events
\`\`\`
Drill by the exact name Navigator displays so the query survives reordering.
### Keep only base tables
\`\`\`powerquery
let
 Source = JethroODBC.Database("jethro.contoso.internal", "analytics"),
 Tables = Table.SelectRows(Source, each [ItemKind] = "Table")
in
 Tables
\`\`\`
Filtering the navigation table to tables avoids accidentally previewing views or other object kinds.
## Limitations & Tips
Preview plus DirectQuery is the combination to respect: shapes can change, and every cross-filter hits Jethro. Server and database are required; options are optional. Design measures so filters reach the source, keep the gateway driver current, and expect no Import mode — if you need a snapshot, stage the data yourself.`,
  },
];

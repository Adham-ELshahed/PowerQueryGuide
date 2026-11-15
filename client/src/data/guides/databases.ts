import type { ConnectorGuide } from "../connector-guides";

/**
 * Practical guides for the Databases group (matched against the Microsoft
 * connectors index: Access database, SQL Server, Oracle, PostgreSQL,
 * MySQL, IBM Db2, ODBC, OLE DB, Sybase, Teradata, SAP HANA, IBM Informix).
 */
export const databaseGuides: ConnectorGuide[] = [
  {
    slug: "access-database",
    name: "Access Database",
    group: "Databases",
    tagline:
      "Pull tables straight out of a local .accdb or .mdb file — no server, no driver dialog.",
    products: ["Excel", "Power BI", "Power Query Online"],
    capabilities: ["Import"],
    functions: ["Access.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/access-database",
    content: `## When to Use It

Access files still run plenty of small operational databases — a ticket log, a membership roster, a plant-floor register. The Access connector turns one of those files into a navigation table of every table and query it contains, so you can treat a desktop database like any other source in your pipeline.

## Before You Start

- The Access Database Engine (ACE) must be installed on the machine running the query. Power Query Desktop ships with it; on servers and build agents, install the ACE redistributable explicitly.
- A 32-bit Office host needs the 32-bit ACE driver and a 64-bit host needs the 64-bit one — mismatched bitness is the single most common failure with this connector.
- The file must not be locked exclusively by another user. Ask Access to open it in shared mode, or copy the file before querying it.

## Connect from the Desktop

1. Choose Get Data → From File → Access database.
2. Browse to the .accdb or .mdb file and confirm.
3. In the Navigator, pick the tables you need — queries in the file appear alongside tables.
4. Prefer Transform Data on anything larger than a reference table so you can drop unused columns before loading.

## Connect in Power Query Online

1. Upload the Access file to a location the dataflow can reach — a SharePoint document library, OneDrive, or Azure storage. The dataflow cannot see your local disk.
2. Add a dataflow and choose the file through the connector that owns that location, or stage the file where your gateway can reach it.
3. Select the tables, refine, and save — scheduled refresh follows the file wherever it lives.

## Recipes in M

### Open a file and drill into one table

\`\`\`powerquery
let
    Source = Access.Database("C:\\Data\\Northwind.accdb"),
    Orders = Source{[Name = "Orders"]}[Data]
in
    Orders
\`\`\`

The navigation table lists every table and query by name; drilling in by name is the stable way to pin a specific object.

### Keep the newest orders only

\`\`\`powerquery
let
    Source = Access.Database("C:\\Data\\Northwind.accdb"),
    Orders = Source{[Name = "Orders"]}[Data],
    Recent = Table.SelectRows(Orders, each [OrderDate] >= #date(2026, 1, 1))
in
    Recent
\`\`\`

Filtering inside Power Query keeps the Access file small on the wire and the refresh fast.

## Limitations & Tips

- The connector is read-only — Access writes belong in Access, not in your refresh pipeline.
- Memo (long text) columns and OLE object columns come through as binary or text; convert them explicitly rather than trusting inference.
- If the query folds, great — when it does not (common with expressions Access itself computed), filter early in M instead of after the full table lands.`,
  },
  {
    slug: "sql-database",
    name: "SQL Server",
    group: "Databases",
    tagline:
      "Query SQL Server, Azure SQL and Synapse with folding all the way down to the SELECT.",
    products: ["Excel", "Power BI", "Power Query Online"],
    capabilities: ["Import"],
    functions: ["Sql.Database", "Sql.Databases"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/sql-server",
    content: `## When to Use It

This is the workhorse connector for warehouse work: SQL Server on-premises, Azure SQL Database, and Synapse SQL endpoints all speak the same protocol, and Power Query pushes as much of your transformation as possible back into the engine. If your data already lives in a relational store, start here and let the server do the heavy lifting.

## Before You Start

- Have the server name, authentication method, and database name ready. Windows authentication works on-premises; Azure SQL is usually organized-account or SQL authentication.
- For Power BI dataflows and other Power Query Online hosts, an on-premises source needs an on-premises data gateway — Azure SQL does not.
- Ask your DBA for a read-only login. Every query you run is a query they have to watch.

## Connect from the Desktop

1. Get Data → From Database → SQL Server database.
2. Enter the server name — use server.database.windows.net for Azure SQL — and the database, or leave the database blank to browse every database the login can see.
3. Choose the import mode, sign in when prompted, and open the Navigator.
4. Transform Data rather than Load when you plan to filter — folding works best when the editor sees the filter early.

## Connect in Power Query Online

1. Start a dataflow, choose SQL Server, and enter server and database.
2. Sign in with an account your gateway or service connection recognizes.
3. Select the tables, apply the transformations you need, and save the dataflow with a refresh schedule.

## Recipes in M

### Connect and drill into a schema

\`\`\`powerquery
let
    Source = Sql.Database("sql-prod-01", "SalesDW"),
    dbo = Source{[Name = "dbo"]}[Data],
    Orders = dbo{[Name = "Orders"]}[Data]
in
    Orders
\`\`\`

The navigation table groups objects by schema when hierarchical navigation is on, so drilling is two steps instead of one.

### Push a native query down to the server

\`\`\`powerquery
let
    Source = Sql.Database(
        "sql-prod-01",
        "SalesDW",
        [Query = "select CustomerKey, OrderDate, Amount from dbo.Orders where OrderDate >= '2026-01-01'"]
    )
in
    Source
\`\`\`

When you know the exact rows you need, a Query option hands the filtering to the engine and skips transporting the whole table.

## Limitations & Tips

- Keep an eye on folding: the Query Editor's native query preview tells you whether your steps still translate to SQL. Anything the server can do is almost always faster than doing it locally.
- Temporal tables, calculated columns, and some functions block folding — filter and project first, then shape.
- Sql.Databases(server) lists the databases themselves; use it when you are building a metadata-driven pipeline instead of hard-coding one database name.`,
  },
  {
    slug: "oracle-database",
    name: "Oracle Database",
    group: "Databases",
    tagline:
      "Read Oracle schemas with the service name in the connection string and SQL doing the filtering.",
    products: ["Excel", "Power BI", "Power Query Online"],
    capabilities: ["Import"],
    functions: ["Oracle.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/oracle-database",
    content: `## When to Use It

Oracle still backs most large enterprises — ERP, finance, order management. The Oracle connector gives you a navigation table of schemas and tables with query folding to SQL, which matters enormously when the tables in question run to hundreds of millions of rows.

## Before You Start

- The connection string shape is host:port/service — confirm the service name with your DBA rather than guessing from the SID.
- On-premises Oracle needs the Oracle client components (or the Oracle OLE DB provider) installed alongside Power Query; cloud-hosted Oracle endpoints still need network reachability from the host running the query.
- For Power Query Online, plan a gateway for any database that is not publicly reachable.

## Connect from the Desktop

1. Get Data → From Database → Oracle database.
2. Enter the server as host:port/service and sign in with a database account.
3. Expand the Navigator to the schema you need and pick the tables.
4. Transform Data to push filters down before the load.

## Connect in Power Query Online

1. Add a dataflow, choose Oracle, and enter the same connection string your gateway can resolve.
2. Authenticate with the service's credential store.
3. Select the tables, shape them, and schedule the refresh.

## Recipes in M

### Connect to a service and open one schema

\`\`\`powerquery
let
    Source = Oracle.Database("oracle-prod.example.com:1521/RETAIL"),
    HR = Source{[Name = "HR"]}[Data]
in
    HR
\`\`\`

Schemas appear as rows in the navigation table; drill in by name to reach their tables.

### Hand the filtering to Oracle

\`\`\`powerquery
let
    Source = Oracle.Database(
        "oracle-prod.example.com:1521/RETAIL",
        [Query = "select order_id, order_ts, status from retail.orders where status = 'OPEN'"]
    )
in
    Source
\`\`\`

A native query is the most reliable way to guarantee folding — the database returns exactly the rows you asked for.

## Limitations & Tips

- Date and timestamp columns can arrive with NLS-dependent formatting; set explicit types with Table.TransformColumnTypes rather than trusting detection.
- Large LOB columns slow the transfer to a crawl — project only the columns you report on.
- If the Navigator shows an empty schema, the login likely lacks SELECT on those objects; the connector does not escalate permissions.`,
  },
  {
    slug: "postgresql-database",
    name: "PostgreSQL",
    group: "Databases",
    tagline:
      "Load Postgres and Azure Database for PostgreSQL with read-only queries that fold to SQL.",
    products: ["Excel", "Power BI", "Power Query Online"],
    capabilities: ["Import"],
    functions: ["PostgreSQL.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/postgresql",
    content: `## When to Use It

PostgreSQL powers a huge share of modern application data — plus Azure Database for PostgreSQL and Amazon Aurora under the same wire protocol. The connector speaks native Postgres SQL, so filters and projections fold straight back to the database.

## Before You Start

- You need host, port (default 5432), and database name; schema-qualified names matter because Postgres organizes objects by schema, not by flat list.
- Create a read-only role for analytics: the connector submits SELECT statements and has no business writing.
- Power Query Online reaches on-premises Postgres through a gateway; Azure Database for PostgreSQL is reachable directly.

## Connect from the Desktop

1. Get Data → From Database → PostgreSQL.
2. Enter the server, database, and credentials — a database account, not an OS account.
3. In the Navigator, open the schema (public or your application's schema) and select tables.
4. Transform Data, filter early, and let the query fold.

## Connect in Power Query Online

1. Add a dataflow and choose PostgreSQL.
2. Enter server and database; sign in through the gateway or the service connection.
3. Pick the tables, apply shapes, and save with a refresh schedule.

## Recipes in M

### Connect and open a schema

\`\`\`powerquery
let
    Source = PostgreSQL.Database("pg-prod.example.com", "appdb"),
    Public = Source{[Name = "public"]}[Data]
in
    Public
\`\`\`

Drilling by schema first keeps the navigation predictable when a database hosts several applications.

### Filter in SQL and read the result

\`\`\`powerquery
let
    Source = PostgreSQL.Database(
        "pg-prod.example.com",
        "appdb",
        [Query = "select id, created_at, total_cents from public.orders where created_at >= now() - interval '30 days'"]
    )
in
    Source
\`\`\`

Pushing the date window into SQL keeps months of history out of the transfer entirely.

## Limitations & Tips

- Boolean columns arrive as true/false logicals; arrays and JSONB columns arrive as text or lists — cast JSONB explicitly if you plan to expand it.
- Extensions such as PostGIS or citext may need matching support on the client side; if a column fails to type, convert it in SQL instead.
- The connector is read-only by design; use it for extraction, not for writes back into application tables.`,
  },
  {
    slug: "mysql-database",
    name: "MySQL",
    group: "Databases",
    tagline:
      "Extract from MySQL and Azure Database for MySQL with folding to SELECT.",
    products: ["Excel", "Power BI", "Power Query Online"],
    capabilities: ["Import"],
    functions: ["MySQL.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/mysql-database",
    content: `## When to Use It

MySQL — including Azure Database for MySQL and the managed offerings from the major clouds — is the default store for an enormous number of web and commerce applications. This connector reads it with native SQL folding, which is the difference between a two-second refresh and a coffee break.

## Before You Start

- Have host, port (default 3306), and database name ready, plus a database user with SELECT only.
- MySQL connectors are read-only: plan any writes as a separate process.
- Power Query Online needs a gateway for on-premises MySQL; Azure Database for MySQL is reachable from the service directly.

## Connect from the Desktop

1. Get Data → From Database → MySQL database.
2. Enter server and database, then sign in with the database account.
3. Select the tables in the Navigator — schemas map to the database's own structure.
4. Transform Data so row filters land before the load.

## Connect in Power Query Online

1. Start a dataflow, choose MySQL, and enter server plus database.
2. Sign in through the gateway or service connection.
3. Choose tables, shape, and save the refresh schedule.

## Recipes in M

### Connect and open a table

\`\`\`powerquery
let
    Source = MySQL.Database("mysql-prod.example.com", "shop"),
    Orders = Source{[Name = "orders"]}[Data]
in
    Orders
\`\`\`

MySQL databases usually sit behind one schema name, so a single drill reaches the table.

### Push a date window into MySQL

\`\`\`powerquery
let
    Source = MySQL.Database(
        "mysql-prod.example.com",
        "shop",
        [Query = "select id, placed_at, status, total from orders where placed_at >= date_sub(now(), interval 90 day)"]
    )
in
    Source
\`\`\`

The database returns ninety days of rows instead of the whole table — the cheapest possible refresh.

## Limitations & Tips

- Tinyint(1) columns often arrive as numbers; cast them to true/false logicals if they represent flags.
- Non-default character sets can mangle text on transfer — if accents look wrong, set the connection charset before blaming the data.
- MySQL's query folding covers SELECT, WHERE, and projections well; joins folded through the navigation table behave best when both sides come from the same database.`,
  },
  {
    slug: "db2-database",
    name: "IBM Db2",
    group: "Databases",
    tagline:
      "Connect to Db2 on LUW or z/OS with the host:port/database string and native SQL folding.",
    products: ["Excel", "Power BI", "Power Query Online"],
    capabilities: ["Import"],
    functions: ["DB2.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/ibm-db2-database",
    content: `## When to Use It

Db2 remains the system of record for many large organizations — mainframe finance, insurance, manufacturing. The connector reaches it with a single connection string and folds filters into Db2 SQL, which is essential when the tables are mainframe-sized.

## Before You Start

- The connection string shape is host:port/database — confirm the port and database name with the DBA team.
- IBM's Db2 drivers must be present on the machine running the query; for Power Query Online, that means a gateway with the driver installed.
- Request a read-only authority: the connector submits SELECTs and should never hold write privileges.

## Connect from the Desktop

1. Get Data → From Database → IBM Db2.
2. Enter the connection string and sign in with a Db2 account.
3. Browse the Navigator for the schema you need and select tables.
4. Transform Data to filter before loading.

## Connect in Power Query Online

1. Add a dataflow, choose IBM Db2, and enter the connection string.
2. Sign in through a gateway that has the IBM driver installed.
3. Select tables, shape, and save with a schedule.

## Recipes in M

### Connect and open a schema

\`\`\`powerquery
let
    Source = DB2.Database("db2-prod.example.com:50000/SALES"),
    Schema = Source{[Name = "DB2ADMIN"]}[Data]
in
    Schema
\`\`\`

Schemas appear as navigation rows; drill in by name to reach the tables underneath.

### Run a native query with folding guaranteed

\`\`\`powerquery
let
    Source = DB2.Database(
        "db2-prod.example.com:50000/SALES",
        [Query = "select policy_no, effective_date, premium from db2admin.policies where effective_date >= '2026-01-01'"]
    )
in
    Source
\`\`\`

A native query removes any doubt about what the database will send back.

## Limitations & Tips

- EBCDIC-sourced character columns occasionally need explicit trimming; wrap them with Text.Trim if trailing bytes appear.
- Db2 date and timestamp literals follow ISO formats — put date filters in the native query rather than comparing text in M.
- Mainframe tables are wide: project the columns you need in the query itself instead of dropping them after the transfer.`,
  },
  {
    slug: "odbc",
    name: "ODBC",
    group: "Databases",
    tagline:
      "The universal escape hatch — reach any data source that ships an ODBC driver, including legacy systems.",
    products: ["Excel", "Power BI", "Power Query Online"],
    capabilities: ["Import"],
    functions: ["Odbc.DataSource", "Odbc.Query"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/odbc",
    content: `## When to Use It

When a system has no first-class connector — a niche ERP, a scientific instrument store, a proprietary warehouse — ODBC is how you get in. If the vendor ships a driver, Power Query can speak to it. This is also the path for systems whose dedicated connector was retired but whose driver still ships.

## Before You Start

- Install the vendor's ODBC driver on the machine that runs the query, and create a DSN (data source name) if the driver expects one.
- Drivers are architecture-specific: a 64-bit host needs a 64-bit driver, full stop.
- For Power Query Online, the gateway must have the same driver and DSN configured — a DSN that exists only on your laptop will not exist for the service.

## Connect from the Desktop

1. Get Data → From Other Sources → ODBC.
2. Pick the DSN (or enter a connection string for drivers that support it).
3. Sign in with whatever credentials the driver expects — Windows, database, or vendor-specific.
4. Browse the Navigator, then Transform Data to filter early.

## Connect in Power Query Online

1. Add a dataflow and choose ODBC.
2. Sign in through the gateway where the DSN is configured.
3. Select the tables the driver exposes, shape, and save.

## Recipes in M

### Query a DSN with hierarchical navigation

\`\`\`powerquery
let
    Source = Odbc.DataSource("DSN=SalesDW", [HierarchicalNavigation = true])
in
    Source
\`\`\`

Hierarchical navigation groups tables by schema, which makes large driver catalogs navigable.

### Run raw SQL through the driver

\`\`\`powerquery
let
    Connection = Odbc.DataSource("DSN=SalesDW"),
    Result = Odbc.Query("DSN=SalesDW", "select region, sum(amount) as total from sales group by region")
in
    Result
\`\`\`

Odbc.Query is the direct route when you already know the SQL dialect the driver accepts.

## Limitations & Tips

- Folding depends entirely on the driver: some translate Power Query steps into SQL, others pull everything and filter locally. Check the native query preview before assuming.
- Generic drivers often expose weak type information — set column types explicitly after the first load.
- Keep the driver version pinned across refresh hosts; a driver upgrade is a common way to break an otherwise stable dataflow.`,
  },
  {
    slug: "ole-db",
    name: "OLE DB",
    group: "Databases",
    tagline:
      "Reach legacy data sources through their OLE DB providers when a native connector does not exist.",
    products: ["Excel", "Power BI"],
    capabilities: ["Import"],
    functions: ["OleDb.DataSource", "OleDb.Query"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/ole-db",
    content: `## When to Use It

OLE DB is the older sibling of ODBC — a provider-based interface that still fronts many long-lived systems: older SQL Server instances, Excel workbooks as databases, mainframe gateways, and vendor systems from the era when every application shipped a provider. Where ODBC has a driver, OLE DB has a provider.

## Before You Start

- Install the provider on the machine running the query; Power Query does not ship every provider.
- Have the provider's connection string ready — its syntax varies by vendor (Provider=…;Data Source=…;Initial Catalog=… is the classic shape).
- Power Query Online needs a gateway with the same provider installed and registered.

## Connect from the Desktop

1. Get Data → From Other Sources → OLE DB.
2. Choose a provider from the installed list.
3. Enter the connection string and sign in as the provider requires.
4. Browse the Navigator and Transform Data to filter before loading.

## Connect in Power Query Online

1. Start a dataflow and choose OLE DB.
2. Sign in through a gateway where the provider is installed.
3. Select the exposed tables, shape them, and save.

## Recipes in M

### Connect with a connection string

\`\`\`powerquery
let
    Source = OleDb.DataSource(
        "Provider=SQLOLEDB;Data Source=legacy-sql-01;Initial Catalog=Operations;Integrated Security=SSPI;"
    )
in
    Source
\`\`\`

The provider receives the string verbatim, so any option the vendor documents can be added directly.

### Run a command through the provider

\`\`\`powerquery
let
    Source = OleDb.DataSource(
        "Provider=SQLOLEDB;Data Source=legacy-sql-01;Initial Catalog=Operations",
        [Command = "select top 100 * from dbo.AuditLog order by EventTs desc"]
    )
in
    Source
\`\`\`

A provider-side command is the shortest path when the catalog is too large to browse.

## Limitations & Tips

- Providers are 32/64-bit specific — match the host architecture or the provider will not even appear in the list.
- Folding support varies more than with native connectors; treat the native query preview as the source of truth.
- Where a native connector exists for the same system, prefer it — native connectors fold more reliably and authenticate more cleanly.`,
  },
  {
    slug: "sybase-database",
    name: "Sybase",
    group: "Databases",
    tagline:
      "Extract from SAP Sybase ASE with the server and database name, filtering pushed into SQL.",
    products: ["Excel", "Power BI", "Power Query Online"],
    capabilities: ["Import"],
    functions: ["Sybase.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/sybase-database",
    content: `## When to Use It

Adaptive Server Enterprise still runs many trading, telco, and government systems. The Sybase connector reads tables and views with native query support, so date windows and row filters can stay on the server instead of crossing the network.

## Before You Start

- You need the server name — port included when it is not the default — and the database (dataserver) name.
- The Sybase client libraries must be installed on the host running the query; Power Query Online therefore needs a gateway with those libraries present.
- Ask for a read-only login: the connector submits SELECT statements only.

## Connect from the Desktop

1. Get Data → From Database → Sybase database.
2. Enter server and database, then sign in with the Sybase account.
3. Pick tables from the Navigator.
4. Transform Data so filters land before the load.

## Connect in Power Query Online

1. Add a dataflow, choose Sybase, and enter server plus database.
2. Sign in through the gateway.
3. Select tables, shape, and save the refresh schedule.

## Recipes in M

### Connect and open a table

\`\`\`powerquery
let
    Source = Sybase.Database("ase-prod:5000", "trading"),
    Fills = Source{[Name = "dbo"]}[Data],
    RecentFills = Table.SelectRows(Fills, each [TradeDate] >= #date(2026, 1, 1))
in
    RecentFills
\`\`\`

Filter immediately after drilling — ASE tables are usually partitioned by date for exactly this reason.

### Push the filter into Sybase

\`\`\`powerquery
let
    Source = Sybase.Database(
        "ase-prod:5000",
        "trading",
        [Query = "select trade_id, trade_date, symbol, quantity from dbo.Trades where trade_date >= '2026-01-01'"]
    )
in
    Source
\`\`\`

The native query is the most dependable way to keep the transfer small.

## Limitations & Tips

- Currency and decimal columns arrive as numbers; set scale explicitly with Table.TransformColumnTypes if money rounding matters.
- Text columns in legacy ASE databases may carry trailing spaces — Text.Trim after loading if joins on keys behave strangely.
- If the Navigator shows no objects, verify the login's default database: ASE logins are scoped to a database unless granted wider authority.`,
  },
  {
    slug: "teradata-database",
    name: "Teradata",
    group: "Databases",
    tagline:
      "Read Teradata warehouses with a single server argument and SQL doing the aggregation.",
    products: ["Excel", "Power BI", "Power Query Online"],
    capabilities: ["Import"],
    functions: ["Teradata.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/teradata",
    content: `## When to Use It

Teradata tables are famously enormous — that is the point of the architecture. The connector takes one server argument and folds aggressively, so the practical way to use it is to let Teradata aggregate and return summaries rather than raw rows.

## Before You Start

- You need the server name; the port can be appended with a colon when it is not the default.
- Teradata client components must be installed on the machine running the query; Power Query Online reaches it through a gateway.
- Request a profile that can read the target databases — Teradata authority is granted per database, not per server.

## Connect from the Desktop

1. Get Data → From Database → Teradata database.
2. Enter the server and sign in with a Teradata account.
3. Expand the Navigator to the database and select tables.
4. Transform Data and push aggregations down before loading.

## Connect in Power Query Online

1. Add a dataflow and choose Teradata.
2. Enter the server and sign in through the gateway.
3. Select tables, shape, and save with a schedule.

## Recipes in M

### Connect and open a database

\`\`\`powerquery
let
    Source = Teradata.Database("td-prod.example.com"),
    SalesDb = Source{[Name = "SALES_DB"]}[Data]
in
    SalesDb
\`\`\`

Databases appear as navigation rows; drill in to reach their tables.

### Aggregate on the warehouse instead of in Power Query

\`\`\`powerquery
let
    Source = Teradata.Database(
        "td-prod.example.com",
        [Query = "select sale_date, count(*) as orders, sum(amount) as revenue from SALES_DB.Orders group by sale_date"]
    )
in
    Source
\`\`\`

Millions of detail rows become a few thousand daily summaries before they ever leave Teradata.

## Limitations & Tips

- Large detail pulls are a trap: the connector will happily stream a whole fact table into memory. Aggregate first, always.
- Teradata date fields often arrive as INTEGER (YYYYMMDD) — convert with Date.FromText(Text.From([Field])) or normalize in the SQL itself.
- If refresh times creep upward, check whether your aggregation still folds; a step that silently stops folding moves the work back to your machine.`,
  },
  {
    slug: "sap-hana-database",
    name: "SAP HANA",
    group: "Databases",
    tagline:
      "Query SAP HANA in-memory tables with native SQL and column-level performance.",
    products: ["Excel", "Power BI", "Power Query Online"],
    capabilities: ["Import"],
    functions: ["SapHana.Database"],
    msdoc: "https://learn.microsoft.com/en-us/power-query/connectors/sap-hana/overview",
    content: `## When to Use It

SAP HANA holds the operational heart of many enterprises — S/ANA sidecars, BW on HANA, custom apps. Because HANA computes in memory, pushing filters into native SQL is not just an optimization here; it is the intended way to work with it.

## Before You Start

- The server string is host:port — the SQL port (30015 by default for system DB) differs from the classic client port, so confirm it with the Basis team.
- SAP HANA client components must be installed on the host running the query; Power Query Online uses a gateway with the same components.
- Use a dedicated read-only database user; HANA privileges are granular and easy to under-grant.

## Connect from the Desktop

1. Get Data → From Database → SAP HANA database.
2. Enter the server as host:port and sign in with the HANA user.
3. Choose the catalog and select the views or tables you need.
4. Transform Data so predicates reach HANA before the load.

## Connect in Power Query Online

1. Start a dataflow and choose SAP HANA.
2. Enter the server and sign in through the gateway.
3. Select the objects, shape, and save the schedule.

## Recipes in M

### Connect and open a catalog

\`\`\`powerquery
let
    Source = SapHana.Database("hana-prod.example.com:30015"),
    Retail = Source{[Name = "RETAIL"]}[Data]
in
    Retail
\`\`\`

Catalogs and schemas appear as navigation rows; drill in by name to reach the tables.

### Push a native SQL statement into HANA

\`\`\`powerquery
let
    Source = SapHana.Database(
        "hana-prod.example.com:30015",
        [Query = "select calendar_date, sum(net_amount) as revenue from ""RETAIL"".""SALES"" group by calendar_date"]
    )
in
    Source
\`\`\`

Aggregation inside HANA turns a wide fact table into a compact daily series in one round trip.

## Limitations & Tips

- HANA identifiers are case-sensitive when quoted — an unquoted name is folded to uppercase, which surprises people writing views in lowercase.
- Column-store performance rewards filtering on the partition key; put calendar or entity filters first in the native query.
- Calculation views and analytic privileges may restrict what a read-only user sees — an empty Navigator usually means a grants problem, not a connection problem.`,
  },
  {
    slug: "informix-database",
    name: "IBM Informix",
    group: "Databases",
    tagline:
      "Read Informix servers with server, database, and native SQL options in one call.",
    products: ["Excel", "Power BI"],
    capabilities: ["Import"],
    functions: ["Informix.Database"],
    msdoc: null,
    content: `## When to Use It

Informix quietly runs retail, manufacturing, and utility systems around the world. The connector takes server and database explicitly — the port rides along in the server string — and exposes tables and views with native query support for anything you want the database to compute.

## Before You Start

- The connection string shape is host:port/database — Informix defaults to port 9088, but appliances often differ.
- Informix client libraries must be installed on the machine running the query; Power Query Online therefore needs a gateway.
- Request a read-only user on the target database; Informix authority is granted per database.

## Connect from the Desktop

1. Get Data → From Database → IBM Informix.
2. Enter server (with port) and database, then sign in.
3. Select the tables in the Navigator.
4. Transform Data to filter before loading.

## Connect in Power Query Online

1. Add a dataflow and choose IBM Informix.
2. Enter server and database, signing in through the gateway.
3. Select tables, shape, and save the refresh schedule.

## Recipes in M

### Connect and open a table

\`\`\`powerquery
let
    Source = Informix.Database("informix-prod:9088", "stores"),
    Orders = Source{[Name = "orders"]}[Data]
in
    Orders
\`\`\`

The database argument scopes the navigation to one Informix database even when the server hosts several.

### Push a filter with the Query option

\`\`\`powerquery
let
    Source = Informix.Database(
        "informix-prod:9088",
        "stores",
        [Query = "select order_num, order_date, customer_num from orders where order_date >= '2026-01-01'"]
    )
in
    Source
\`\`\`

The database returns only the recent window — the cheapest way to keep a refresh honest.

## Limitations & Tips

- DATETIME and INTERVAL columns arrive with Informix-specific precision; cast them explicitly with DateTime.FromText or DateTimeZone conversions rather than trusting inference.
- The connector is read-only by design — route any writes back through the application layer.
- If the Navigator comes back empty, verify the port in the server string: a wrong port usually fails loudly, but a right port with the wrong database name simply shows nothing.`,
  },
];

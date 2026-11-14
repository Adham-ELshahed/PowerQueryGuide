/**
 * Connector registry — the catalog layer of the /connectors index.
 *
 * The guide layer (practical, example-driven documentation for each
 * connector, rendered at /connectors/<slug> by pages/connector-guide.tsx)
 * lives in connector-guides.ts with its content files under data/guides/.
 * This module keeps the catalog and re-exports the guide lookups so
 * existing consumers retain a single import path.
 *
 * Catalog: every connector entry function documented on the site, audited
 * from functions.json and grouped by the kind of source it reaches
 * (Databases, Cloud Storage, Azure & Fabric, Power Platform, SaaS &
 * Business Apps, Analytics & BI, Files & Web). Cards prefer a guide when
 * one exists and fall back to the auto-parsed /function/<name> reference
 * page, so links always resolve; names are alphabetical within each group.
 */

import { connectorHref, connectorGuideForFunction } from "./connector-guides";

export {
  connectorGuides,
  connectorHref,
  connectorGuideForFunction,
} from "./connector-guides";
export type { ConnectorGuide } from "./connector-guides";

/* ------------------------------------------------------------------ catalog
   Every connector entry function documented on the site, audited from
   functions.json (category access-datafunctions, entry points only —
   library helpers such as Cube.* or Identity.* are excluded). Each name
   has an auto-parsed /function/<name> reference page, so cards always
   resolve; names are alphabetical within each group. */

export interface ConnectorCatalogGroup {
  /** Group label shown on the index */
  label: string;
  /** One-line explanation of what the group covers */
  description: string;
  /** Entry functions in this group — each links to its documentation page */
  names: string[];
}

export const connectorCatalogGroups: ConnectorCatalogGroup[] = [
  {
    label: "Databases",
    description: "Relational databases, data warehouses and ODBC / OLE DB sources.",
    names: [
      "Access.Database",
      "Actian.Contents",
      "AmazonAthena.Databases",
      "AmazonOpenSearchService.Contents",
      "AmazonRedshift.Database",
      "ApacheSpark.Tables",
      "AtScale.Cubes",
      "AzureCosmosDBForMongoDBvCore.Contents",
      "AzureDatabaseForMySQL.Database",
      "AzureHorizonDB.Database",
      "AzurePostgreSQL.Database",
      "BIConnector.Contents",
      "ClickHouse.Database",
      "CosmosDB.Contents",
      "Databricks.Catalogs",
      "DatabricksMultiCloud.Catalogs",
      "DataVirtuality.Database",
      "DB2.Database",
      "Denodo.Contents",
      "Dremio.DatabasesV370",
      "DremioCloud.DatabasesByServerV370",
      "ElasticSearch.Database",
      "ExactOnlinePremium.Contents",
      "Exasol.Database",
      "GoogleBigQuery.Database",
      "GoogleBigQueryAad.Database",
      "Impala.Database",
      "Indexima.Database",
      "Informix.Database",
      "IntersystemsHealthInsight.Database",
      "JethroODBC.Database",
      "kxkdbinsightsenterprise.Contents",
      "Kyligence.Database",
      "KyvosODBC.Databases",
      "Linkar.Contents",
      "MariaDB.Contents",
      "MarkLogicODBC.Contents",
      "MongoDBAtlasODBC.Contents",
      "MySQL.Database",
      "Netezza.Database",
      "Odbc.DataSource",
      "Odbc.Query",
      "OleDb.DataSource",
      "OleDb.Query",
      "OpenSearchProject.Contents",
      "Oracle.Database",
      "PostgreSQL.Database",
      "QubolePresto.Contents",
      "SapHana.Database",
      "SingleStoreODBC.Contents",
      "Snowflake.Databases",
      "Sql.Database",
      "Sql.Databases",
      "StarburstAad.Contents",
      "StarburstPresto.Contents",
      "Sybase.Database",
      "Synapse.Contents",
      "Teradata.Database",
      "TibcoTdv.DataSource",
      "Vertica.Database",
    ],
  },
  {
    label: "Cloud Storage",
    description: "Object storage, data lakes and big-data clusters.",
    names: [
      "AzureStorage.BlobContents",
      "AzureStorage.Blobs",
      "AzureStorage.DataLake",
      "AzureStorage.DataLakeContents",
      "AzureStorage.Tables",
      "DataLake.Contents",
      "DeltaSharing.Contents",
      "Hdfs.Contents",
      "Hdfs.Files",
    ],
  },
  {
    label: "Azure & Fabric",
    description: "Microsoft Azure services and Fabric items — Kusto, resource graphs, cost management, lakehouses and warehouses.",
    names: [
      "AzureCostManagement.Tables",
      "AzureDataExplorer.Contents",
      "AzureDeviceRegistry.Query",
      "AzureResourceGraph.Query",
      "Fabric.Warehouse",
      "FabricSql.Contents",
      "Lakehouse.Contents",
      "MicrosoftAzureDataManagerForEnergy.Search",
      "MicrosoftSentinel.Contents",
      "OneLake.Contents",
      "OneLake.SqlAnalytics",
      "PowerBI.Datamarts",
    ],
  },
  {
    label: "Power Platform",
    description: "Dataverse, dataflows and the Power Platform's own data estate.",
    names: [
      "Cds.Entities",
      "CommonDataService.Database",
      "PowerBI.Dataflows",
      "PowerPlatform.Dataflows",
    ],
  },
  {
    label: "SaaS & Business Apps",
    description: "Mail, collaboration, CRM and business platforms.",
    names: [
      "Acterys.Contents",
      "ActiveDirectory.Domains",
      "ADPAnalytics.Contents",
      "Anaplan.Contents",
      "AptixInsights.Feed",
      "Asana.Tables",
      "AssembleViews.Feed",
      "AutodeskConstructionCloud.Feed",
      "AutomationAnywhere.Feed",
      "AutomyDataAnalytics.Contents",
      "BitSightSecurityRatings.Contents",
      "Bloomberg.Query",
      "BQECore.Contents",
      "BuildingConnected.Contents",
      "CCHTagetik.Contents4",
      "CDataConnectCloud.ContentsV2",
      "Cherwell.SavedSearches",
      "CloudBluePSA.Feed",
      "Cognite.Contents",
      "CogniteDataSource.Contents",
      "CustomerInsights.Contents",
      "DataWorld.Dataset",
      "DCWInsights.Feed",
      "Dynamics365BusinessCentral.ApiContentsWithOptions",
      "Dynamics365BusinessCentralOnPremises.Contents",
      "DynamicsNav.Contents",
      "DynatraceGrail.Contents",
      "EduFrame.Contents",
      "Emigo.Contents",
      "EntersoftBusinessSuite.Contents",
      "EQuIS.Contents",
      "eWayCRM.Contents2",
      "Exchange.Contents",
      "FactSetAnalytics.Contents",
      "Fhir.Contents",
      "Foundry.Contents",
      "Funnel.Contents",
      "Github.Tables",
      "HexagonSmartApi.Feed",
      "IndustrialAppStore.NavigationTable",
      "InformationGrid.Contents",
      "IntuneV2.Contents",
      "inwink.ScopeContents",
      "JamfPro.Contents",
      "Kognitwin.Contents",
      "LEAP.Contents",
      "LinkedIn.SalesNavigator",
      "LinkedInLearning.Contents",
      "Marketo.Tables",
      "OData.Feed",
      "OneStream.Navigation",
      "OracleERP.Contents",
      "PlanviewEnterprise.Feed",
      "PlanviewOKR.Contents",
      "PlanviewProjectplace.Contents",
      "Profisee.Tables",
      "QuickBase.Contents",
      "Roamler.Contents",
      "Salesforce.Data",
      "Salesforce.Reports",
      "Samsara.Records",
      "SAPERP.Functions",
      "SharePoint.Contents",
      "SharePoint.Files",
      "SharePoint.Tables",
      "ShortcutsBI.Contents",
      "Siteimprove.Contents",
      "SmartsheetGlobal.Contents",
      "SolarWindsServiceDesk.ContentsV113",
      "SparkPost.NavTable",
      "Spigit.Contents",
      "SumTotal.ODataFeed",
      "Supermetrics.Render",
      "SurveyMonkey.Contents",
      "SweetIQ.Tables",
      "TeamDesk.Database",
      "Tenforce.Contents",
      "Troux.Feed",
      "Usercube.Universes",
      "Vena.Contents",
      "VesselInsight.Contents",
      "VivaInsights.Data",
      "VSTS.AnalyticsViews",
      "Witivio.Contents",
      "Wrike.Contents",
      "ZendeskData.Contents",
      "ZohoCreator.Contents",
      "Zucchetti.Contents",
    ],
  },
  {
    label: "Analytics & BI",
    description: "Semantic models, OLAP cubes and usage analytics.",
    names: [
      "AdobeAnalytics.Cubes",
      "AnalysisServices.Database",
      "AnalysisServices.Databases",
      "appFigures.Tables",
      "BI360.Contents",
      "Celonis.Navigation",
      "Essbase.Cubes",
      "GoogleAnalytics.Accounts",
      "MicroStrategyDataset.Contents",
      "Mixpanel.Tables",
      "Paxata.Contents",
      "ProductInsights.Contents",
      "SapBusinessWarehouse.Cubes",
      "SoftOneBI.Contents",
      "WebtrendsAnalytics.Tables",
      "Windsor.Main",
    ],
  },
  {
    label: "Files & Web",
    description: "Local files, folders, documents and web sources.",
    names: [
      "Csv.Document",
      "Excel.CurrentWorkbook",
      "Excel.Workbook",
      "Folder.Contents",
      "Folder.Files",
      "GoogleSheets.Contents",
      "Json.Document",
      "Pdf.Tables",
      "SDMX.Contents",
      "Web.BrowserContents",
      "Web.Contents",
      "Web.Headers",
      "Web.Page",
      "Xml.Document",
      "Xml.Tables",
    ],
  },
];

/** Every entry function in the catalog, flattened (for quick lookups). */
export const allConnectorNames: string[] = connectorCatalogGroups.flatMap(
  (group) => group.names,
);

/** Documentation href for a catalog entry: its guide when one exists,
 *  otherwise the auto-parsed /function/<name> reference page. */
export function connectorEntryHref(functionName: string): string {
  const guide = connectorGuideForFunction(functionName);
  return guide
    ? connectorHref(guide.slug)
    : `/function/${encodeURIComponent(functionName)}`;
}

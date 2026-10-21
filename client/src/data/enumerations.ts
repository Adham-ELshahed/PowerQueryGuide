/**
 * Power Query M enumerations — complete reference data.
 *
 * Collected from https://powerquery.how/enumerations/ and each enumeration's
 * own page (name, description, option values, "Applies to" function links).
 * Group headings mirror the source index so the catalog stays recognizable.
 *
 * Every enumeration here has a dedicated page at /enumeration/<slug>.
 */

export interface EnumerationMember {
  /** Constant name, e.g. "Order.Ascending" */
  name: string;
  /** Literal value, e.g. "0" — string so quoted values render verbatim */
  value: string;
  description: string;
}

export interface Enumeration {
  /** Route slug — page lives at /enumeration/<slug> */
  slug: string;
  /** Enumeration type name, e.g. "Order.Type" */
  name: string;
  /** Catalog group from the source index */
  group: string;
  description: string;
  members: EnumerationMember[];
  /** Functions that accept this enumeration as an argument */
  functions: string[];
  /** Microsoft Learn documentation, when one exists */
  msdoc: string | null;
}

export const ENUMERATION_GROUPS = [
  "Data Manipulation",
  "Data Source and Integration",
  "Encoding and Compression",
  "Error Handling",
  "File and Text Processing",
  "Join and Grouping",
  "Miscellaneous",
] as const;

export type EnumerationGroup = (typeof ENUMERATION_GROUPS)[number];

const ms = (slug: string): string | null =>
  `https://learn.microsoft.com/en-us/powerquery-m/${slug}`;

export const enumerations: Enumeration[] = [
  /* ---------------------------------------------------------------- Data Manipulation */
  {
    slug: "binaryoccurrence-type",
    name: "BinaryOccurrence.Type",
    group: "Data Manipulation",
    description: "BinaryOccurrence.Type specifies how many times the item is expected to appear in the group.",
    members: [
      { name: "BinaryOccurrence.Optional", value: "0", description: "The item is expected to appear zero or one time in the input." },
      { name: "BinaryOccurrence.Required", value: "1", description: "The item is expected to appear once in the input." },
      { name: "BinaryOccurrence.Repeating", value: "2", description: "The item is expected to appear zero or more times in the input." },
    ],
    functions: ["BinaryFormat.Group"],
    msdoc: ms("binaryoccurrence-type"),
  },
  {
    slug: "occurrence-type",
    name: "Occurrence.Type",
    group: "Data Manipulation",
    description: "Occurrence.Type specifies the occurrence of an element in a sequence.",
    members: [
      { name: "Occurrence.First", value: "0", description: "The position of the first occurrence of the found value is returned." },
      { name: "Occurrence.Last", value: "1", description: "The position of the last occurrence of the found value is returned." },
      { name: "Occurrence.All", value: "2", description: "A list of positions of all occurrences of the found values is returned." },
      { name: "Occurrence.Optional", value: "0", description: "The item is expected to appear zero or one time in the input. Provided for backward compatibility in binary functions. Preferably, use BinaryOccurrence.Optional." },
      { name: "Occurrence.Required", value: "1", description: "The item is expected to appear once in the input. Provided for backward compatibility in binary functions. Preferably, use BinaryOccurrence.Required." },
      { name: "Occurrence.Repeating", value: "2", description: "The item is expected to appear zero or more times in the input. Provided for backward compatibility in binary functions. Preferably, use BinaryOccurrence.Repeating." },
    ],
    functions: [
      "List.PositionOf",
      "List.PositionOfAny",
      "Table.PositionOf",
      "Table.PositionOfAny",
      "Text.PositionOf",
      "Text.PositionOfAny",
    ],
    msdoc: ms("occurrence-type"),
  },
  {
    slug: "order-type",
    name: "Order.Type",
    group: "Data Manipulation",
    description: "Order.Type specifies the direction of sorting.",
    members: [
      { name: "Order.Ascending", value: "0", description: "Sorts the values in ascending order." },
      { name: "Order.Descending", value: "1", description: "Sorts the values in descending order." },
    ],
    functions: ["List.Sort", "Table.AddRankColumn", "Table.Sort"],
    msdoc: ms("order-type"),
  },
  {
    slug: "percentilemode-type",
    name: "PercentileMode.Type",
    group: "Data Manipulation",
    description: "PercentileMode.Type specifies the percentile mode type.",
    members: [
      { name: "PercentileMode.ExcelInc", value: "1", description: "When interpolating values for List.Percentile, use a method compatible with Excel's PERCENTILE.INC." },
      { name: "PercentileMode.ExcelExc", value: "2", description: "When interpolating values for List.Percentile, use a method compatible with Excel's PERCENTILE.EXC." },
      { name: "PercentileMode.SqlDisc", value: "3", description: "When interpolating values for List.Percentile, use a method compatible with SQL Server's PERCENTILE_DISC." },
      { name: "PercentileMode.SqlCont", value: "4", description: "When interpolating values for List.Percentile, use a method compatible with SQL Server's PERCENTILE_CONT." },
    ],
    functions: ["List.Percentile"],
    msdoc: ms("percentilemode-type"),
  },
  {
    slug: "precision-type",
    name: "Precision.Type",
    group: "Data Manipulation",
    description: "Precision.Type specifies the precision of comparison.",
    members: [
      { name: "Precision.Double", value: "0", description: "An optional parameter for the built-in arthimetic operators to specify double precision." },
      { name: "Precision.Decimal", value: "1", description: "An optional parameter for the built-in arthimetic operators to specify decimal precision." },
    ],
    functions: [
      "List.Average",
      "List.Product",
      "List.Sum",
      "Number.IntegerDivide",
      "Number.Mod",
      "Value.Add",
      "Value.Compare",
      "Value.Divide",
      "Value.Equals",
      "Value.Multiply",
      "Value.NullableEquals",
      "Value.Subtract",
    ],
    msdoc: ms("precision-type"),
  },
  {
    slug: "rankkind-type",
    name: "RankKind.Type",
    group: "Data Manipulation",
    description: "RankKind.Type specifies the type of ranking.",
    members: [
      { name: "RankKind.Competition", value: "0", description: "Identical items receive the same rank. In case of identical items there is a gap before the next rank. This approach may generate non-sequential rankings, with the possibility of repeated rank numbers." },
      { name: "RankKind.Dense", value: "1", description: "Identical items receive the same rank and the next ranking item is numbered consecutively without gap. Method guarantees a ranking with consecutive numbers where a rank can appear multiple times." },
      { name: "RankKind.Ordinal", value: "2", description: "Every item, even those that are identical, gets a unique rank. Duplicate values get consecutive rankings." },
    ],
    functions: ["Table.AddRankColumn"],
    msdoc: ms("rankkind-type"),
  },
  {
    slug: "roundingmode-type",
    name: "RoundingMode.Type",
    group: "Data Manipulation",
    description: "RoundingMode.Type specifies rounding direction when there is a tie between the possible numbers to round to.",
    members: [
      { name: "RoundingMode.Up", value: "0", description: "Round up when there is a tie between the possible numbers to round to." },
      { name: "RoundingMode.Down", value: "1", description: "Round down when there is a tie between the possible numbers to round to." },
      { name: "RoundingMode.AwayFromZero", value: "2", description: "Round away from zero when there is a tie between the possible numbers to round to." },
      { name: "RoundingMode.TowardZero", value: "3", description: "Round toward zero when there is a tie between the possible numbers to round to." },
      { name: "RoundingMode.ToEven", value: "4", description: "Round to the nearest even number when there is a tie between the possible numbers to round to." },
    ],
    functions: ["Byte.From", "Currency.From", "Int16.From", "Int32.From", "Int64.From", "Int8.From", "Number.Round"],
    msdoc: ms("roundingmode-type"),
  },

  /* ------------------------------------------------- Data Source and Integration */
  {
    slug: "accesscontrolkind-type",
    name: "AccessControlKind.Type",
    group: "Data Source and Integration",
    description: "AccessControlKind.Type specifies the kind of access control. It was added for a scenario which isn’t relevant any more. Therefore the function doesn’t currently have any practical use.",
    members: [
      { name: "AccessControlKind.Deny", value: "0", description: "Access is denied." },
      { name: "AccessControlKind.Allow", value: "1", description: "Access is allowed." },
    ],
    functions: [],
    msdoc: ms("accesscontrolkind-type"),
  },
  {
    slug: "hiveprotocol-type",
    name: "HiveProtocol.Type",
    group: "Data Source and Integration",
    description: "HiveProtocol.Type specifies the Thrift Transport Protocol to use when connecting to a Hive server.",
    members: [
      { name: "HiveProtocol.Standard", value: "1", description: "Specifies the Standard method for the Thrift Transport Protocol." },
      { name: "HiveProtocol.HTTP", value: "2", description: "Specifies the HTTP method for the Thrift Transport Protocol." },
    ],
    functions: ["ApacheHiveLLAP.Database"],
    msdoc: null,
  },
  {
    slug: "odataomitvalues-type",
    name: "ODataOmitValues.Type",
    group: "Data Source and Integration",
    description: "ODataOmitValues.Type specifies the kinds of values an OData service can omit.",
    members: [
      { name: "ODataOmitValues.Nulls", value: "nulls", description: "Allows the OData service to omit null values." },
    ],
    functions: ["Odata.Feed"],
    msdoc: ms("odataomitvalues-type"),
  },
  {
    slug: "sapbusinesswarehouseexecutionmode-type",
    name: "SapBusinessWarehouseExecutionMode.Type",
    group: "Data Source and Integration",
    description: "SapBusinessWarehouseExecutionMode.Type valid options for SAP Business Warehouse execution mode option.",
    members: [
      { name: "SapBusinessWarehouseExecutionMode.BasXml", value: "64", description: "'bXML flattening mode' option for MDX execution in SAP Business Warehouse." },
      { name: "SapBusinessWarehouseExecutionMode.BasXmlGzip", value: "65", description: "'Gzip compressed bXML flattening mode' option for MDX execution in SAP Business Warehouse. Recommended for low latency or high volume queries." },
      { name: "SapBusinessWarehouseExecutionMode.DataStream", value: "66", description: "'DataStream flattening mode' option for MDX execution in SAP Business Warehouse." },
    ],
    functions: ["SapBusinessWarehouse.Cubes"],
    msdoc: ms("sapbusinesswarehouseexecutionmode-type"),
  },
  {
    slug: "saphanadistribution-type",
    name: "SapHanaDistribution.Type",
    group: "Data Source and Integration",
    description: "SapHanaDistribution.Type valid options for SAP HANA distribution option.",
    members: [
      { name: "SapHanaDistribution.Off", value: "0", description: "'Off' distribution option for SAP HANA." },
      { name: "SapHanaDistribution.Connection", value: "1", description: "'Connection' distribution option for SAP HANA." },
      { name: "SapHanaDistribution.Statement", value: "2", description: "'Statement' distribution option for SAP HANA." },
      { name: "SapHanaDistribution.All", value: "3", description: "'All' distribution option for SAP HANA." },
    ],
    functions: ["SapHana.Database"],
    msdoc: ms("saphanadistribution-type"),
  },
  {
    slug: "saphanarangeoperator-type",
    name: "SapHanaRangeOperator.Type",
    group: "Data Source and Integration",
    description: "SapHanaRangeOperator.Type a range operator for SAP HANA range input parameters.",
    members: [
      { name: "SapHanaRangeOperator.GreaterThan", value: "0", description: "'Greater than' range operator for SAP HANA input parameters." },
      { name: "SapHanaRangeOperator.LessThan", value: "1", description: "'Less than' range operator for SAP HANA input parameters." },
      { name: "SapHanaRangeOperator.GreaterThanOrEquals", value: "2", description: "'Greater than or equals' range operator for SAP HANA input parameters." },
      { name: "SapHanaRangeOperator.LessThanOrEquals", value: "3", description: "'Less than or equals' range operator for SAP HANA input parameters." },
      { name: "SapHanaRangeOperator.Equals", value: "4", description: "'Equals' range operator for SAP HANA input parameters." },
      { name: "SapHanaRangeOperator.NotEquals", value: "5", description: "'Not equals' range operator for SAP HANA input parameters." },
    ],
    functions: ["Cube.Transform", "SapHana.Database"],
    msdoc: ms("saphanarangeoperator-type"),
  },
  {
    slug: "sparkprotocol-type",
    name: "SparkProtocol.Type",
    group: "Data Source and Integration",
    description: "SparkProtocol.Type specifies the protocol to use when connecting to an instance of Spark.",
    members: [
      { name: "SparkProtocol.Standard", value: "0", description: "Specifies the Standard protocol to connect to an instance of Spark." },
      { name: "SparkProtocol.Azure", value: "1", description: "Specifies the Azure protocol to connect to an instance of Spark." },
      { name: "SparkProtocol.HTTP", value: "2", description: "Specifies the Standard protocol to connect to an instance of Spark." },
    ],
    functions: ["ApacheSpark.Tables", "Spark.Tables"],
    msdoc: null,
  },

  /* ------------------------------------------------ Encoding and Compression */
  {
    slug: "binaryencoding-type",
    name: "BinaryEncoding.Type",
    group: "Encoding and Compression",
    description: "BinaryEncoding.Type specifies the type of binary encoding.",
    members: [
      { name: "BinaryEncoding.Base64", value: "0", description: "Constant to use as the encoding type when base-64 encoding is required." },
      { name: "BinaryEncoding.Hex", value: "1", description: "Constant to use as the encoding type when hexadecimal encoding is required." },
    ],
    functions: ["Binary.From", "Binary.FromText", "Binary.ToText"],
    msdoc: ms("binaryencoding-type"),
  },
  {
    slug: "compression-type",
    name: "Compression.Type",
    group: "Encoding and Compression",
    description: "Compression.Type specifies the type of compression.",
    members: [
      { name: "Compression.None", value: "-1", description: "The data is uncompressed." },
      { name: "Compression.GZip", value: "0", description: "The compressed data is in the 'GZip' format." },
      { name: "Compression.Deflate", value: "1", description: "The compressed data is in the 'Deflate' format." },
      { name: "Compression.Snappy", value: "2", description: "The compressed data is in the 'Snappy' format." },
      { name: "Compression.Brotli", value: "3", description: "The compressed data is in the 'Brotli' format." },
      { name: "Compression.LZ4", value: "4", description: "The compressed data is in the 'LZ4' format." },
      { name: "Compression.Zstandard", value: "5", description: "The compressed data is in the 'Zstandard' format." },
    ],
    functions: ["Binary.Compress", "Binary.Decompress"],
    msdoc: ms("compression-type"),
  },

  /* ------------------------------------------------------------- Error Handling */
  {
    slug: "extravalues-type",
    name: "ExtraValues.Type",
    group: "Error Handling",
    description: "ExtraValues.Type specifies the expected action for extra values in a row that contains columns more than expected.",
    members: [
      { name: "ExtraValues.List", value: "0", description: "If the splitter function returns more columns than the table expects, they should be collected into a list." },
      { name: "ExtraValues.Error", value: "1", description: "If the splitter function returns more columns than the table expects, an error should be raised." },
      { name: "ExtraValues.Ignore", value: "2", description: "If the splitter function returns more columns than the table expects, they should be ignored." },
    ],
    functions: ["Csv.Document", "Table.FromList", "Table.SplitColumn"],
    msdoc: ms("extravalues-type"),
  },
  {
    slug: "missingfield-type",
    name: "MissingField.Type",
    group: "Error Handling",
    description: "MissingField.Type specifies the expected action for missing values in a row that contains columns less than expected.",
    members: [
      { name: "MissingField.Error", value: "0", description: "An optional parameter in record and table functions indicating that missing fields should result in an error. (This is the default parameter value.)" },
      { name: "MissingField.Ignore", value: "1", description: "An optional parameter in record and table functions indicating that missing fields should be ignored." },
      { name: "MissingField.UseNull", value: "2", description: "An optional parameter in record and table functions indicating that missing fields should be included as null values." },
    ],
    functions: [
      "Record.RemoveFields",
      "Record.RenameFields",
      "Record.ReorderFields",
      "Record.SelectFields",
      "Record.TransformFields",
      "Table.FromRecords",
      "Table.RemoveColumns",
      "Table.RenameColumns",
      "Table.ReorderColumns",
      "Table.SelectColumns",
      "Table.TransformColumns",
    ],
    msdoc: ms("missingfield-type"),
  },

  /* --------------------------------------------- File and Text Processing */
  {
    slug: "buffermode-type",
    name: "BufferMode.Type",
    group: "File and Text Processing",
    description: "BufferMode.Type describes the type of buffering to be performed.",
    members: [
      { name: "BufferMode.Eager", value: "1", description: "The entire value is immediately buffered in memory before continuing." },
      { name: "BufferMode.Delayed", value: "2", description: "The type of the value is computed immediately but its contents aren't buffered until data is needed, at which point the entire value is immediately buffered." },
    ],
    functions: ["Table.Buffer"],
    msdoc: ms("buffermode-type"),
  },
  {
    slug: "byteorder-type",
    name: "ByteOrder.Type",
    group: "File and Text Processing",
    description: "ByteOrder.Type specifies the byte order.",
    members: [
      { name: "ByteOrder.LittleEndian", value: "0", description: "A possible value for the byteOrder parameter in BinaryFormat.ByteOrder. The least significant byte appears first in Little Endian byte order." },
      { name: "ByteOrder.BigEndian", value: "1", description: "A possible value for the byteOrder parameter in BinaryFormat.ByteOrder. The most significant byte appears first in Big Endian byte order." },
    ],
    functions: ["BinaryFormat.ByteOrder"],
    msdoc: ms("byteorder-type"),
  },
  {
    slug: "csvstyle-type",
    name: "CsvStyle.Type",
    group: "File and Text Processing",
    description: "CsvStyle.Type specifies the significance of quotes in Csv documents.",
    members: [
      { name: "CsvStyle.QuoteAfterDelimiter", value: "0", description: "Quotes in a field are only significant immediately following the delimiter." },
      { name: "CsvStyle.QuoteAlways", value: "1", description: "Quotes in a field are always significant regardless of where they appear." },
    ],
    functions: ["Csv.Document"],
    msdoc: ms("csvstyle-type"),
  },
  {
    slug: "limitclausekind-type",
    name: "LimitClauseKind.Type",
    group: "File and Text Processing",
    description: "LimitClauseKind.Type describes the type of limit clause supported by the SQL dialect used by this data source.",
    members: [
      { name: "LimitClauseKind.None", value: "0", description: "This SQL dialect does not support a limit clause." },
      { name: "LimitClauseKind.Top", value: "1", description: "This SQL dialect supports a TOP specifier to limit the number of rows returned." },
      { name: "LimitClauseKind.LimitOffset", value: "2", description: "This SQL dialect supports LIMIT and OFFSET specifiers to limit the number of rows returned." },
      { name: "LimitClauseKind.Limit", value: "3", description: "This SQL dialect supports a LIMIT specifier to limit the number of rows returned." },
      { name: "LimitClauseKind.AnsiSql2008", value: "4", description: "This SQL dialect supports an ANSI SQL-compatible LIMIT N ROWS specifier to limit the number of rows returned." },
    ],
    functions: ["Odbc.DataSource"],
    msdoc: ms("limitclausekind-type"),
  },
  {
    slug: "quotestyle-type",
    name: "QuoteStyle.Type",
    group: "File and Text Processing",
    description: "QuoteStyle.Type specifies the quote style.",
    members: [
      { name: "QuoteStyle.None", value: "0", description: "Quote characters have no significance." },
      { name: "QuoteStyle.Csv", value: "1", description: "Quote characters indicate the start of a quoted string. Nested quotes are indicated by two quote characters." },
    ],
    functions: [
      "Combiner.CombineTextByDelimiter",
      "Combiner.CombineTextByEachDelimiter",
      "Csv.Document",
      "Lines.FromBinary",
      "Lines.FromText",
      "Splitter.SplitTextByAnyDelimiter",
      "Splitter.SplitTextByDelimiter",
      "Splitter.SplitTextByEachDelimiter",
      "Splitter.SplitTextByWhitespace",
      "Table.CombineColumns",
    ],
    msdoc: ms("quotestyle-type"),
  },
  {
    slug: "relativeposition-type",
    name: "RelativePosition.Type",
    group: "File and Text Processing",
    description: "RelativePosition.Type indicates whether indexing should be done from the start or end of the input.",
    members: [
      { name: "RelativePosition.FromStart", value: "0", description: "Indicates indexing should be done from the start of the input." },
      { name: "RelativePosition.FromEnd", value: "1", description: "Indicates indexing should be done from the end of the input." },
    ],
    functions: ["Text.AfterDelimiter", "Text.BeforeDelimiter", "Text.BetweenDelimiters"],
    msdoc: ms("relativeposition-type"),
  },
  {
    slug: "textencoding-type",
    name: "TextEncoding.Type",
    group: "File and Text Processing",
    description: "TextEncoding.Type specifies the text encoding type.",
    members: [
      { name: "TextEncoding.Unicode", value: "1200", description: "Use to choose the UTF16 little endian binary form." },
      { name: "TextEncoding.Utf16", value: "1200", description: "Use to choose the UTF16 little endian binary form." },
      { name: "TextEncoding.BigEndianUnicode", value: "1201", description: "Use to choose the UTF16 big endian binary form." },
      { name: "TextEncoding.Windows", value: "1252", description: "Use to choose the Windows binary form." },
      { name: "TextEncoding.Ascii", value: "20127", description: "Use to choose the ASCII binary form." },
      { name: "TextEncoding.Utf8", value: "65001", description: "Use to choose the UTF8 binary form." },
    ],
    functions: [
      "BinaryFormat.Text",
      "Csv.Document",
      "Json.Document",
      "Json.FromValue",
      "Lines.FromBinary",
      "Lines.ToBinary",
      "Text.FromBinary",
      "Text.ToBinary",
      "Xml.Document",
      "Xml.Tables",
    ],
    msdoc: ms("textencoding-type"),
  },

  /* ---------------------------------------------------------- Join and Grouping */
  {
    slug: "groupkind-type",
    name: "GroupKind.Type",
    group: "Join and Grouping",
    description: "GroupKind.Type specifies the kind of grouping.",
    members: [
      { name: "GroupKind.Local", value: "0", description: "A local group is formed from a consecutive sequence of rows from an input table with the same key value. That means two rows with the same value will be placed in different groups if there’s a row with a different value between them." },
      { name: "GroupKind.Global", value: "1", description: "A global group is formed from all rows in an input table with the same key value." },
    ],
    functions: ["Table.Group"],
    msdoc: ms("groupkind-type"),
  },
  {
    slug: "joinalgorithm-type",
    name: "JoinAlgorithm.Type",
    group: "Join and Grouping",
    description: "JoinAlgorithm.Type specifies the join algorithm to be used in the join operation.",
    members: [
      { name: "JoinAlgorithm.Dynamic", value: "0", description: "Automatically chooses a join algorithm based on inspecting the initial rows and metadata of both tables." },
      { name: "JoinAlgorithm.PairwiseHash", value: "1", description: "Buffers the rows of both the left and right tables until one of the tables is completely buffered, and then performs a LeftHash or RightHash, depending on which table was buffered completely. This algorithm is recommended only for small tables." },
      { name: "JoinAlgorithm.SortMerge", value: "2", description: "Performs a streaming merge based on the assumption that both tables are sorted by their join keys. While efficient, it will return incorrect results if the tables aren't sorted as expected." },
      { name: "JoinAlgorithm.LeftHash", value: "3", description: "Buffers the left rows into a lookup table and streams the right rows. For each right row, the matching left rows are found via the buffered lookup table. This algorithm is recommended when the left table is small and most of the rows from the right table are expected to match a left row." },
      { name: "JoinAlgorithm.RightHash", value: "4", description: "Buffers the right rows into a lookup table and streams the left rows. For each left row, the matching right rows are found via the buffered lookup table. This algorithm is recommended when the right table is small and most of the rows from the left table are expected to match a right row." },
      { name: "JoinAlgorithm.LeftIndex", value: "5", description: "In batches, uses the keys from the left table to do predicate-based queries against the right table. This algorithm is recommended when the right table is large, supports folding of Table.SelectRows, and contains few rows that are expected to match a left row." },
      { name: "JoinAlgorithm.RightIndex", value: "6", description: "In batches, uses the keys from the right table to do predicate-based queries against the left table. This algorithm is recommended when the left table is large, supports folding of Table.SelectRows, and contains few rows that are expected to match a right row." },
    ],
    functions: ["Table.Join"],
    msdoc: ms("joinalgorithm-type"),
  },
  {
    slug: "joinkind-type",
    name: "JoinKind.Type",
    group: "Join and Grouping",
    description: "JoinKind.Type specifies the kind of join operation.",
    members: [
      { name: "JoinKind.Inner", value: "0", description: "A possible value for the optional JoinKind parameter in Table.Join. The table resulting from an inner join contains a row for each pair of rows from the specified tables that were determined to match based on the specified key columns." },
      { name: "JoinKind.LeftOuter", value: "1", description: "A possible value for the optional JoinKind parameter in Table.Join. A left outer join ensures that all rows of the first table appear in the result." },
      { name: "JoinKind.RightOuter", value: "2", description: "A possible value for the optional JoinKind parameter in Table.Join. A right outer join ensures that all rows of the second table appear in the result." },
      { name: "JoinKind.FullOuter", value: "3", description: "A possible value for the optional JoinKind parameter in Table.Join. A full outer join ensures that all rows of both tables appear in the result. Rows that did not have a match in the other table are joined with a default row containing null values for all of its columns." },
      { name: "JoinKind.LeftAnti", value: "4", description: "A possible value for the optional JoinKind parameter in Table.Join. A left anti join returns that all rows from the first table which do not have a match in the second table." },
      { name: "JoinKind.RightAnti", value: "5", description: "A possible value for the optional JoinKind parameter in Table.Join. A right anti join returns that all rows from the second table which do not have a match in the first table." },
      { name: "JoinKind.LeftSemi", value: "6", description: "A possible value for the optional JoinKind parameter in Table.Join. A left semi join returns all rows from the first table that have a match in the second table." },
      { name: "JoinKind.RightSemi", value: "7", description: "A possible value for the optional JoinKind parameter in Table.Join. A right semi join returns all rows from the second table that have a match in the first table." },
    ],
    functions: ["Table.FuzzyJoin", "Table.FuzzyNestedJoin", "Table.Join", "Table.NestedJoin"],
    msdoc: ms("joinkind-type"),
  },
  {
    slug: "joinside-type",
    name: "JoinSide.Type",
    group: "Join and Grouping",
    description: "JoinSide.Type specifies the left or right table of a join.",
    members: [
      { name: "JoinSide.Left", value: "0", description: "Specifies the left table of a join." },
      { name: "JoinSide.Right", value: "1", description: "Specifies the right table of a join." },
    ],
    functions: ["Table.FuzzyJoin", "Table.FuzzyNestedJoin", "Table.Join", "Table.NestedJoin"],
    msdoc: ms("joinside-type"),
  },

  /* ------------------------------------------------------------- Miscellaneous */
  {
    slug: "day-type",
    name: "Day.Type",
    group: "Miscellaneous",
    description: "Day.Type specifies a day of week.",
    members: [
      { name: "Day.Sunday", value: "0", description: "Represents Sunday." },
      { name: "Day.Monday", value: "1", description: "Represents Monday." },
      { name: "Day.Tuesday", value: "2", description: "Represents Tuesday." },
      { name: "Day.Wednesday", value: "3", description: "Represents Wednesday." },
      { name: "Day.Thursday", value: "4", description: "Represents Thursday." },
      { name: "Day.Friday", value: "5", description: "Represents Friday." },
      { name: "Day.Saturday", value: "6", description: "Represents Saturday." },
    ],
    functions: ["Date.DayOfWeek", "Date.EndOfWeek", "Date.StartOfWeek", "Date.WeekOfMonth", "Date.WeekOfYear"],
    msdoc: ms("day-type"),
  },
  {
    slug: "tracelevel-type",
    name: "TraceLevel.Type",
    group: "Miscellaneous",
    description: "TraceLevel.Type specifies the trace level.",
    members: [
      { name: "TraceLevel.Critical", value: "1", description: "Specifies Critical trace level." },
      { name: "TraceLevel.Error", value: "2", description: "Specifies Error trace level." },
      { name: "TraceLevel.Warning", value: "4", description: "Specifies Warning trace level." },
      { name: "TraceLevel.Information", value: "8", description: "Specifies Information trace level." },
      { name: "TraceLevel.Verbose", value: "16", description: "Specifies Verbose trace level." },
    ],
    functions: ["Diagnostics.Trace"],
    msdoc: ms("tracelevel-type"),
  },
  {
    slug: "webmethod-type",
    name: "WebMethod.Type",
    group: "Miscellaneous",
    description: "WebMethod.Type specifies an HTTP method.",
    members: [
      { name: "WebMethod.Delete", value: "\"DELETE\"", description: "Specifies the DELETE method for HTTP." },
      { name: "WebMethod.Get", value: "\"GET\"", description: "Specifies the GET method for HTTP." },
      { name: "WebMethod.Head", value: "\"HEAD\"", description: "Specifies the HEAD method for HTTP." },
      { name: "WebMethod.Patch", value: "\"PATCH\"", description: "Specifies the PATCH method for HTTP." },
      { name: "WebMethod.Post", value: "\"POST\"", description: "Specifies the POST method for HTTP." },
      { name: "WebMethod.Put", value: "\"PUT\"", description: "Specifies the PUT method for HTTP." },
    ],
    functions: ["WebAction.Request"],
    msdoc: ms("webmethod-type"),
  },
];

/* -------------------------------------------------------------------------- */
/* Lookup helpers                                                             */
/* -------------------------------------------------------------------------- */

const bySlug = new Map<string, Enumeration>(
  enumerations.map((e) => [e.slug, e]),
);

/** member name → owning enumeration (e.g. "JoinKind.Inner" → JoinKind.Type) */
const byMember = new Map<string, Enumeration>();
for (const e of enumerations) {
  for (const m of e.members) {
    if (!byMember.has(m.name)) byMember.set(m.name, e);
  }
}

export function getEnumeration(slug: string): Enumeration | undefined {
  return bySlug.get(slug);
}

/** The enumeration a constant such as "Day.Monday" belongs to. */
export function enumerationForMember(memberName: string): Enumeration | undefined {
  return byMember.get(memberName);
}

/** In-page anchor for a member row, e.g. "Order.Ascending" → "order-ascending". */
export function memberAnchor(memberName: string): string {
  return memberName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Canonical route for an enumeration slug. */
export function enumerationHref(slug: string): string {
  return `/enumeration/${slug}`;
}

/**
 * Route for a member constant, or null when the constant is unknown.
 * "Day.Monday" → "/enumeration/day-type#day-monday"
 */
export function memberHref(memberName: string): string | null {
  const e = byMember.get(memberName);
  return e ? `${enumerationHref(e.slug)}#${memberAnchor(memberName)}` : null;
}

/** All constants known to this dataset (used by the auto-linker). */
export const enumerationMemberNames: string[] = Array.from(byMember.keys()).sort(
  (a, b) => b.length - a.length,
);

const byName = new Map<string, Enumeration>(enumerations.map((e) => [e.name, e]));

/** The enumeration whose type name is given ("Order.Type" → Order.Type page). */
export function enumerationForName(name: string): Enumeration | undefined {
  return byName.get(name);
}

/** Enumerations grouped in catalog order. */
export function enumerationsByGroup(): Array<{
  group: EnumerationGroup;
  items: Enumeration[];
}> {
  return ENUMERATION_GROUPS.map((group) => ({
    group,
    items: enumerations.filter((e) => e.group === group),
  }));
}

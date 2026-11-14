/**
 * Human-readable label for a category slug, used consistently on the
 * functions table, the category page, the function detail breadcrumb and
 * the reference header chip.
 *
 *   access-datafunctions -> "Access Data Functions"  (the MS "Access data
 *                           functions" group — the slug already ends in
 *                           "functions", so it is spelled out instead of
 *                           the raw hyphenated name)
 *   date-and-time        -> "Date and time"
 *   table                -> "Table"
 */
export function formatCategoryLabel(name: string): string {
  if (name === "access-datafunctions") return "Access Data Functions";
  const spaced = name.replace(/[-_]/g, " ");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

/**
 * Label + " functions" for headings and breadcrumbs, skipping the redundant
 * suffix when the label already ends with "functions".
 */
export function formatCategoryLabelWithFunctions(name: string): string {
  const label = formatCategoryLabel(name);
  return label.toLowerCase().endsWith("functions") ? label : `${label} functions`;
}

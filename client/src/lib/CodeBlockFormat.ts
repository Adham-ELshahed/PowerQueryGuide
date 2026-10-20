/**
 * Power Query (M) source formatting.
 *
 * This used to POST every snippet to https://m-formatter.azurewebsites.net/api/v2,
 * whose contract changed over time (it now expects `{ code }` and answers with an
 * HTML document rather than a `formatted` string). The service also rejects most
 * signature-style M syntax found in functions.json with HTTP 400, which logged a
 * console/network error for a large share of code blocks on every article.
 *
 * The request has therefore been removed: snippets render exactly as they appear
 * in functions.json (which is what was happening in practice anyway, since a
 * usable response was never returned). CodeBlock still calls this for every
 * `powerquery` block, so re-introducing formatting only means returning a
 * transformed string here — no changes needed in the components.
 */
export async function formatPowerQuery(text: string): Promise<string> {
  return text;
}

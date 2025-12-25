// client/src/lib/formatters/powerquery.ts
export async function formatPowerQuery(text: string): Promise<string> {
  try {
    const res = await fetch("https://m-formatter.azurewebsites.net/api/v2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const json = await res.json();
    return json.formatted ?? text;
  } catch {
    return text;
  }
}

import DocsLayout from "@/components/layout/docs-layout";
import { CodeBlock } from "@/components/ui/code-block";
import { AutoLink } from "@/lib/auto-link";
import { Link } from "wouter";
import type { ReactNode } from "react";
import { ArrowLeft, ChevronRight, ExternalLink } from "lucide-react";
import { connectorGuides, connectorHref } from "@/data/connectors";

const guide = connectorGuides.find((c) => c.slug === "exchange-online")!;

/* ------------------------------------------------------------------ local
   Design-system primitives (same shapes as function-detail.tsx) */

function Section({
  title,
  children,
  className = "",
  tint = false,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  tint?: boolean;
}) {
  return (
    <section className={`panel mb-6 overflow-hidden ${className}`}>
      <div
        className={`flex items-center gap-2.5 border-b border-ms-gray-border px-5 py-3 sm:px-6 ${
          tint ? "bg-ms-blue-light/60" : "bg-canvas-inset"
        }`}
      >
        <span
          className={`h-1.5 w-1.5 rounded-full ${tint ? "bg-ms-blue" : "bg-ms-gray-border"}`}
          aria-hidden="true"
        />
        <h2 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ms-gray-secondary">
          {title}
        </h2>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function Chip({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "accent" | "warn";
}) {
  const tones = {
    neutral: "border-ms-gray-border bg-ms-gray-light text-ms-gray-secondary",
    accent: "border-ms-blue/30 bg-ms-blue-light text-ms-blue",
    warn: "border-amber-300/70 bg-amber-50 text-amber-700",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold capitalize tracking-wide ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-ms-gray-border bg-canvas p-4">
      <dt className="eyebrow-muted">{label}</dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-ms-gray">
        {children}
      </dd>
    </div>
  );
}

/** Emerald-numbered step, matching the data-types page treatment. */
function Step({
  n,
  children,
}: {
  n: number;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ms-blue/30 bg-ms-blue-light text-[11px] font-semibold text-ms-blue"
      >
        {n}
      </span>
      <span className="text-[15px] leading-7 text-ms-gray-secondary">
        <AutoLink>{children}</AutoLink>
      </span>
    </li>
  );
}

/** Small recipe heading inside the recipes section. */
function Recipe({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="first:pt-0 border-t border-ms-gray-border pt-6 mt-6 first:border-t-0 first:mt-0">
      <h3 className="font-mono text-[13px] font-semibold uppercase tracking-wider text-ms-gray-secondary">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default function ConnectorExchangeOnline() {
  return (
    <DocsLayout>
      <div className="flex">
        <main className="flex-1 min-w-0">
          <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
            {/* Breadcrumb */}
            <nav className="mb-7" aria-label="Breadcrumb">
              <Link
                href="/connectors"
                className="group inline-flex items-center gap-1.5 rounded-lg border border-ms-gray-border bg-white px-3 py-1.5 text-sm font-medium text-ms-gray-secondary shadow-xs transition-all hover:border-ms-blue/40 hover:text-ms-blue"
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Back to all connectors
              </Link>
            </nav>

            {/* Header */}
            <header className="panel mb-6 p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-bold tracking-tight text-ms-gray sm:text-4xl">
                  Exchange Online
                </h1>
                <span className="rounded-md border border-ms-blue/30 bg-ms-blue-light px-2 py-0.5 text-xs font-medium text-ms-blue">
                  Connector
                </span>
                <Chip tone="accent">Import</Chip>
                <Chip>General availability</Chip>
              </div>

              <div className="mt-5 max-w-3xl text-lg leading-8 text-ms-gray-secondary">
                <AutoLink>
                  The Microsoft Exchange Online connector turns a Microsoft 365
                  mailbox into tables you can shape with M. Its single entry
                  point, Exchange.Contents, returns a folder map of the mailbox
                  — mail, calendars, contacts and tasks — ready to drill into,
                  filter and load.
                </AutoLink>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  href="/function/Exchange.Contents"
                  className="group inline-flex items-center gap-1.5 rounded-lg border border-ms-gray-border bg-canvas px-3 py-1.5 font-mono text-[13px] text-ms-gray transition-colors hover:border-ms-blue/40 hover:bg-ms-blue-light/50 hover:text-ms-blue"
                >
                  Exchange.Contents reference
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <a
                  href={guide.msdoc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 rounded-lg border border-ms-gray-border bg-canvas px-3 py-1.5 text-[13px] text-ms-gray-secondary transition-colors hover:border-ms-blue/40 hover:bg-ms-blue-light/50 hover:text-ms-blue"
                >
                  Microsoft Learn documentation
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </header>

            {/* At a glance */}
            <Section title="At a Glance" tint>
              <dl className="grid gap-4 sm:grid-cols-2">
                <Fact label="Works in">
                  {guide.products.join(" · ")}
                </Fact>
                <Fact label="Sign-in">
                  {guide.authentication.join(" or ")}
                </Fact>
                <Fact label="Data access">
                  Import only — no DirectQuery
                </Fact>
                <Fact label="Entry function">
                  <Link
                    href="/function/Exchange.Contents"
                    className="auto-link font-mono font-semibold"
                  >
                    Exchange.Contents
                  </Link>{" "}
                  <span className="text-ms-gray-secondary">
                    (optional mailbox address, returns a table)
                  </span>
                </Fact>
              </dl>
            </Section>

            {/* What it returns */}
            <Section title="The Mailbox Navigation Table">
              <div className="space-y-4 text-[15px] leading-7 text-ms-gray-secondary">
                <AutoLink>
                  <p>
                    Calling Exchange.Contents with a mailbox address does not
                    return messages — it returns a navigation table: one row
                    per top-level area of the mailbox, each holding nested data
                    you drill into. Omit the argument and the connector uses the
                    default account behind your credential.
                  </p>
                </AutoLink>

                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    ["Mail", "Inbox, Sent Items, Drafts, Deleted Items …"],
                    ["Calendar", "The default calendar and any additional calendars"],
                    ["Contacts", "The mailbox contact list"],
                    ["Tasks", "Flagged to-dos and task folders"],
                  ].map(([area, detail]) => (
                    <div
                      key={area}
                      className="rounded-xl border border-ms-gray-border bg-canvas p-4"
                    >
                      <p className="font-mono text-[13px] font-semibold text-ms-gray">
                        {area}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ms-gray-secondary">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>

                <p>
                  Each row drills down the same way — by its display name, the
                  label you also see in the Navigator:
                </p>

                <CodeBlock code={`Source{[Name = "Inbox"]}[Data]`} />

                <p>
                  The exact column set depends on your mailbox, so let the data
                  introduce itself before you write filters against it:
                </p>

                <CodeBlock
                  code={`// Column names exposed by the drilled-in folder\nTable.ColumnNames(Inbox)`}
                />
              </div>
            </Section>

            {/* Prerequisites */}
            <Section title="Before You Start">
              <ul className="list-disc space-y-2.5 pl-5 marker:text-ms-blue">
                <li className="text-[15px] leading-7 text-ms-gray-secondary">
                  <AutoLink>
                    You need a mailbox hosted on Exchange Online — the service
                    behind Microsoft 365. On-premises Exchange Server is not
                    supported by this connector.
                  </AutoLink>
                </li>
                <li className="text-[15px] leading-7 text-ms-gray-secondary">
                  <AutoLink>
                    Sign in with an Exchange account or a Microsoft account. A
                    User Principal Name in the user@domain format works anywhere
                    an email address does.
                  </AutoLink>
                </li>
                <li className="text-[15px] leading-7 text-ms-gray-secondary">
                  <AutoLink>
                    Exchange Online is a cloud service, so no on-premises data
                    gateway is required — neither on the desktop nor when a
                    dataflow refreshes in the service.
                  </AutoLink>
                </li>
                <li className="text-[15px] leading-7 text-ms-gray-secondary">
                  <AutoLink>
                    The account only reaches mailboxes Exchange itself grants it
                    — its own mailbox by default, delegated mailboxes when
                    permissions exist.
                  </AutoLink>
                </li>
              </ul>

              <div className="mt-5 rounded-xl border-l-4 border-l-amber-400 bg-amber-50 p-4">
                <p className="text-sm font-semibold text-amber-800">
                  Planning ahead in Excel?
                </p>
                <p className="mt-1.5 text-sm leading-7 text-amber-800/90">
                  Microsoft is retiring this connector from Excel Power Query in
                  favor of the newer Exchange Mail and Calendar connectors by
                  April 2027. Workbook owners migrate connections manually, so
                  new Excel work is best built on the successor connectors
                  today. Power BI and Power Query Online flows are unaffected.
                </p>
              </div>
            </Section>

            {/* Desktop steps */}
            <Section title="Connect from Excel or Power BI Desktop">
              <ol className="space-y-3.5">
                <Step n={1}>
                  Open the Get Data experience and pick Microsoft Exchange Online.
                </Step>
                <Step n={2}>
                  Enter the mailbox address to access — for example,
                  ana@contoso.com — then confirm.
                </Step>
                <Step n={3}>
                  Sign in with an Exchange account or a Microsoft account when
                  prompted.
                </Step>
                <Step n={4}>
                  In the Navigator, pick the folders you need. Load straight
                  away, or choose Transform Data to filter in the editor first —
                  the better route for busy mailboxes.
                </Step>
              </ol>
            </Section>

            {/* Online steps */}
            <Section title="Connect from Power Query Online">
              <p className="mb-4 text-[15px] leading-7 text-ms-gray-secondary">
                <AutoLink>
                  Power Query Online covers Power BI dataflows and Customer
                  Insights dataflows. The flow mirrors the desktop one, with
                  credentials stored on the dataflow itself:
                </AutoLink>
              </p>
              <ol className="space-y-3.5">
                <Step n={1}>
                  Start a new dataflow and choose Microsoft Exchange Online from
                  Online services.
                </Step>
                <Step n={2}>
                  Enter the mailbox address and sign in when the credential
                  dialog appears.
                </Step>
                <Step n={3}>
                  Select the tables to import, refine them in the editor, then
                  save. Refresh scheduling works like any other cloud dataflow —
                  no gateway involved.
                </Step>
              </ol>
            </Section>

            {/* Recipes */}
            <Section title="Recipes in M">
              <Recipe title="Connect to a mailbox">
                <p className="mb-3 text-[15px] leading-7 text-ms-gray-secondary">
                  <AutoLink>
                    Start every query the same way. Pass the mailbox explicitly,
                    or call Exchange.Contents with no argument to use the
                    credential's default account.
                  </AutoLink>
                </p>
                <CodeBlock
                  code={`let\n    Source = Exchange.Contents("ana@contoso.com")\nin\n    Source`}
                />
              </Recipe>

              <Recipe title="Keep only last week's mail">
                <p className="mb-3 text-[15px] leading-7 text-ms-gray-secondary">
                  <AutoLink>
                    Drill into the Inbox, build a cut-off with Date.AddDays and
                    DateTime.LocalNow, and let Table.SelectRows do the rest.
                    Filtering early — before expanding message bodies — is the
                    single biggest performance lever on this connector.
                  </AutoLink>
                </p>
                <CodeBlock
                  code={`let\n    Source = Exchange.Contents("ana@contoso.com"),\n    Inbox = Source{[Name = "Inbox"]}[Data],\n    CutOff = Date.AddDays(DateTime.LocalNow(), -7),\n    Recent = Table.SelectRows(Inbox, each [Received] >= CutOff),\n    Columns = Table.SelectColumns(Recent, {"Sender", "Subject", "Received"})\nin\n    Columns`}
                />
              </Recipe>

              <Recipe title="Find messages by subject">
                <p className="mb-3 text-[15px] leading-7 text-ms-gray-secondary">
                  <AutoLink>
                    Text.Contains with Comparer.OrdinalIgnoreCase makes a
                    case-insensitive search across every subject line:
                  </AutoLink>
                </p>
                <CodeBlock
                  code={`let\n    Source = Exchange.Contents("ana@contoso.com"),\n    Inbox = Source{[Name = "Inbox"]}[Data],\n    Matches = Table.SelectRows(\n        Inbox,\n        each Text.Contains([Subject], "invoice", Comparer.OrdinalIgnoreCase)\n    )\nin\n    Matches`}
                />
              </Recipe>

              <Recipe title="List upcoming calendar events">
                <p className="mb-3 text-[15px] leading-7 text-ms-gray-secondary">
                  <AutoLink>
                    The Calendar drills down the same way as the Inbox. Compare
                    the Start column against the current moment to see what is
                    still ahead:
                  </AutoLink>
                </p>
                <CodeBlock
                  code={`let\n    Source = Exchange.Contents("ana@contoso.com"),\n    Calendar = Source{[Name = "Calendar"]}[Data],\n    Upcoming = Table.SelectRows(Calendar, each [Start] >= DateTime.LocalNow())\nin\n    Upcoming`}
                />
              </Recipe>

              <Recipe title="Take a sample of contacts">
                <p className="mb-3 text-[15px] leading-7 text-ms-gray-secondary">
                  <AutoLink>
                    Table.FirstN is ideal for previewing a folder during
                    development, so you are not pulling thousands of rows into
                    the editor on every edit:
                  </AutoLink>
                </p>
                <CodeBlock
                  code={`let\n    Source = Exchange.Contents("ana@contoso.com"),\n    Contacts = Source{[Name = "Contacts"]}[Data],\n    Sample = Table.FirstN(Contacts, 50)\nin\n    Sample`}
                />
              </Recipe>
            </Section>

            {/* Limitations */}
            <Section title="Limitations & Caveats">
              <ul className="list-disc space-y-2.5 pl-5 marker:text-ms-blue">
                <li className="text-[15px] leading-7 text-ms-gray-secondary">
                  <AutoLink>
                    Import only. There is no DirectQuery mode — every refresh
                    pulls rows from Exchange again.
                  </AutoLink>
                </li>
                <li className="text-[15px] leading-7 text-ms-gray-secondary">
                  <AutoLink>
                    Folder display names follow the mailbox language. The
                    drill-down that reads [Name = "Inbox"] works on an English
                    mailbox; a German one shows Posteingang instead. Discover
                    the names at runtime rather than hard-coding them when your
                    reports span multiple locales.
                  </AutoLink>
                </li>
                <li className="text-[15px] leading-7 text-ms-gray-secondary">
                  <AutoLink>
                    Exchange throttles heavy callers. Filter rows early, avoid
                    expanding body columns you do not report on, and prefer
                    scheduled dataflow refreshes over hand-triggered ones during
                    business hours.
                  </AutoLink>
                </li>
                <li className="text-[15px] leading-7 text-ms-gray-secondary">
                  <AutoLink>
                    Each credential reaches a single mailbox. Mailboxes your
                    account is delegated on appear only when Exchange grants the
                    permission — Power Query cannot escalate beyond it.
                  </AutoLink>
                </li>
              </ul>
            </Section>

            {/* Related reference */}
            <Section title="Related Reference">
              <Link
                href="/function/Exchange.Contents"
                className="group flex items-center justify-between gap-3 rounded-xl border border-ms-gray-border bg-canvas px-4 py-3 transition-colors hover:border-ms-blue/40 hover:bg-ms-blue-light/50"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-[13px] font-semibold text-ms-gray">
                    Exchange.Contents
                  </span>
                  <span className="block text-sm text-ms-gray-secondary">
                    Syntax, parameter and return type of the entry function
                  </span>
                </span>
                <ChevronRight className="h-4 w-4 shrink-0 text-ms-gray-border transition-transform group-hover:translate-x-0.5 group-hover:text-ms-blue" />
              </Link>

              <p className="mt-5 text-sm text-ms-gray-secondary">
                Functions used in these recipes:
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {[
                  "Exchange.Contents",
                  "Table.SelectRows",
                  "Table.SelectColumns",
                  "Table.ColumnNames",
                  "Table.FirstN",
                  "Date.AddDays",
                  "DateTime.LocalNow",
                  "Text.Contains",
                  "Comparer.OrdinalIgnoreCase",
                ].map((name) => (
                  <Link
                    key={name}
                    href={`/function/${encodeURIComponent(name)}`}
                    className="rounded border border-ms-gray-border bg-canvas-inset px-1.5 py-0.5 font-mono text-[11px] text-ms-gray-secondary transition-colors hover:border-ms-blue/40 hover:text-ms-blue"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </Section>
          </div>
        </main>
      </div>
    </DocsLayout>
  );
}

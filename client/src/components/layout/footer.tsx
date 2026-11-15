import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t border-ms-gray-border bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-ms-blue text-sm font-bold text-white">
                PQ
              </span>
              <span className="text-lg font-semibold tracking-tight text-ms-gray">
                Power Query Guide
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-ms-gray-secondary">
              The definitive reference for Power Query functions and expressions.
            </p>
            <p className="mt-2 text-xs text-ms-gray-secondary">
              Last site update: Dec 15, 2024
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-ms-gray-secondary">
              Resources
            </h2>
            <ul className="space-y-2.5">
              <li><Link href="/functions" className="text-sm text-ms-gray-secondary transition-colors hover:text-ms-blue">Functions</Link></li>
              <li><Link href="/datatypes" className="text-sm text-ms-gray-secondary transition-colors hover:text-ms-blue">Data Types</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-wider text-ms-gray-secondary">
              Community
            </h2>
            <ul className="space-y-2.5">
              <li><Link href="/blog" className="text-sm text-ms-gray-secondary transition-colors hover:text-ms-blue">Blog</Link></li>
              <li><Link href="/about" className="text-sm text-ms-gray-secondary transition-colors hover:text-ms-blue">About</Link></li>
              <li><a href="mailto:info@powerqueryguide.com" className="text-sm text-ms-gray-secondary transition-colors hover:text-ms-blue">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-6 border-t border-ms-gray-border pt-8 sm:flex-row sm:items-center">
          <p className="text-xs leading-relaxed text-ms-gray-secondary">
            2024 © Power Query Guide. All rights reserved. Information coming from Microsoft documentation is property of Microsoft Corp.
          </p>
          <div className="flex items-center gap-4">
            <span className="whitespace-nowrap text-xs text-ms-gray-secondary">Inspired by</span>
            <a
              href="https://www.sqlbi.com"
              target="_blank"
              rel="noopener noreferrer"
              className="whitespace-nowrap rounded border border-ms-gray-border bg-white px-2.5 py-1 text-[11px] font-medium text-ms-gray-secondary transition-colors hover:text-ms-gray"
            >
              SQLBI
            </a>
            <span className="whitespace-nowrap rounded border border-ms-gray-border bg-white px-2.5 py-1 text-[11px] font-medium text-ms-gray-secondary">
              Power BI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

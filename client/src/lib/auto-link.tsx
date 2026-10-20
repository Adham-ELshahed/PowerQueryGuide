import { Fragment, isValidElement, type ReactNode } from "react";
import { Link } from "wouter";
import { segmentText } from "./link-rules";

/** A plain string rendered as linked / plain segments (no-op when nothing matches). */
function renderString(
  text: string,
  linkClassName: string,
  keyPrefix: string,
): ReactNode {
  const segments = segmentText(text);
  if (!segments.some((s) => s.href)) return text;

  return segments.map((segment, index) =>
    segment.href ? (
      <Link
        key={`${keyPrefix}-${index}`}
        href={segment.href}
        className={linkClassName}
      >
        {segment.text}
      </Link>
    ) : (
      <Fragment key={`${keyPrefix}-${index}`}>{segment.text}</Fragment>
    ),
  );
}

/**
 * Renders text — or a mixed content array — with internal links wrapped around
 * the exact terms that already exist in the copy (functions, enumeration
 * constants, data types). Nothing is added, removed or reworded.
 *
 * - plain strings are linked in place;
 * - inline `<code>` children are kept and their contents linked too (code
 *   mentions like `<code>Text.PadStart</code>` are genuine function names);
 * - every other node is passed through untouched, so callers can hand it a
 *   whole subtree without guarding each use site.
 */
export function AutoLink({
  children,
  linkClassName = "auto-link",
}: {
  children: ReactNode;
  /** class applied to the generated anchors */
  linkClassName?: string;
}) {
  if (typeof children === "string") {
    return <>{children ? renderString(children, linkClassName, "s") : children}</>;
  }

  const items = Array.isArray(children) ? children : [children];

  return (
    <>
      {items.map((item, index) => {
        if (typeof item === "string") {
          return (
            <Fragment key={index}>
              {renderString(item, linkClassName, `t${index}`)}
            </Fragment>
          );
        }

        if (isValidElement(item) && item.type === "code") {
          const props = item.props as { className?: string; children?: ReactNode };
          if (typeof props.children === "string") {
            return (
              <code key={index} className={props.className}>
                {renderString(props.children, linkClassName, `c${index}`)}
              </code>
            );
          }
        }

        return <Fragment key={index}>{item}</Fragment>;
      })}
    </>
  );
}

export default AutoLink;

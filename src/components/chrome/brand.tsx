import Link from "next/link";
import { ORG_NAME } from "@/lib/site";

export function Wordmark({
  className = "",
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link href={href} className={`group inline-flex items-baseline gap-2 ${className}`}>
      <span className="font-heading text-xl tracking-tight text-foreground">
        Anannt
      </span>
      <span className="hidden text-[11px] font-medium tracking-wide text-muted-foreground uppercase sm:inline">
        AP World History: Modern
      </span>
      <span className="sr-only">
        {ORG_NAME} home
      </span>
    </Link>
  );
}

export function PilotBanner() {
  return (
    <p className="border-b border-border bg-muted/60 px-4 py-1.5 text-center text-xs text-muted-foreground">
      Limited Unit 2 pilot from Anannt Education for the May 2027 exam. Units 1
      and 3–9 are unpublished. Not a College Board product.
    </p>
  );
}

export function FormatYear({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-medium tracking-wide text-muted-foreground uppercase ${className}`}
    >
      2027 format
    </span>
  );
}

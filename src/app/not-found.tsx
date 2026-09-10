import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Page not in this pilot",
  description:
    "That address is not part of Anannt Education’s limited Unit 2 AP World History: Modern pilot. Return to the landing page, Help, or the study loop.",
  path: "/404",
  index: false,
});

export default function NotFound() {
  return (
    <div className="space-y-4 py-12">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
        Anannt Education
      </p>
      <h1 className="font-heading text-3xl tracking-tight">
        That page is not in this Unit 2 pilot
      </h1>
      <p className="max-w-xl text-muted-foreground">
        This release publishes one Networks of Exchange loop — not a nine-unit
        catalog. If you followed a bookmark, the honest next step is the
        landing page, Help, or Today if you already set a plan on this device.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button render={<Link href="/" />}>Return to the landing page</Button>
        <Button variant="outline" render={<Link href="/help" />}>
          Open Help
        </Button>
        <Button variant="outline" render={<Link href="/today" />}>
          Go to Today
        </Button>
      </div>
    </div>
  );
}

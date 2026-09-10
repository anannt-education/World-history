"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-4 py-12">
      <h1 className="font-heading text-2xl tracking-tight">
        This page failed to load
      </h1>
      <p className="max-w-xl text-muted-foreground">
        Your locally saved work should still be in this browser — a failed paint
        is not a lost record. Try this page again. If the lesson player is stuck,
        Help can reset the demo record on this device.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button onClick={reset}>Try this page again</Button>
        <Button variant="outline" render={<Link href="/help" />}>
          Open Help
        </Button>
      </div>
    </div>
  );
}

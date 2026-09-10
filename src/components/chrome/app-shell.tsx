"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { PilotBanner, Wordmark } from "@/components/chrome/brand";
import { RoleSwitcher } from "@/components/chrome/role-switcher";
import { SiteFooter } from "@/components/chrome/site-footer";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  isGatedPath,
  isOnboardingPath,
  isPublicPath,
  PUBLIC_NAV,
} from "@/lib/site";
import { useLearner } from "@/lib/store";
import { cn } from "@/lib/utils";

const STUDENT_NAV = [
  { href: "/today", label: "Today" },
  { href: "/course", label: "Course" },
  { href: "/practice", label: "Practice" },
  { href: "/writing", label: "Writing" },
  { href: "/review", label: "Review" },
  { href: "/mock-exams", label: "Mock Exams" },
  { href: "/progress", label: "Progress" },
  { href: "/help", label: "Help" },
];

function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
    >
      Skip to main content
    </a>
  );
}

function NavLinks({
  items,
  onClick,
}: {
  items: readonly { href: string; label: string }[];
  onClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-1 md:flex-row md:items-center md:gap-0">
      {items.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onClick}
              className={cn(
                "block rounded-md px-2.5 py-1.5 text-sm transition-colors",
                active
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function PublicHeader({
  onboarded,
}: {
  onboarded: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ctaHref = onboarded ? "/today" : "/onboarding";
  const ctaLabel = onboarded
    ? "Continue the Unit 2 loop"
    : "Set a Unit 2 study plan";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>Anannt Education</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 px-2 pt-2">
                <NavLinks items={PUBLIC_NAV} onClick={() => setOpen(false)} />
                <Button
                  className="w-full"
                  render={<Link href={ctaHref} onClick={() => setOpen(false)} />}
                >
                  {ctaLabel}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <Wordmark href="/" />
        </div>
        <nav className="hidden md:block" aria-label="Primary">
          <NavLinks items={PUBLIC_NAV} />
        </nav>
        <Button size="sm" render={<Link href={ctaHref} />}>
          {ctaLabel}
        </Button>
      </div>
    </header>
  );
}

function StudentHeader({ mentor }: { mentor: boolean }) {
  const [open, setOpen] = useState(false);
  const items = mentor
    ? [
        { href: "/mentor", label: "Mentor report" },
        { href: "/writing", label: "Writing queue" },
        { href: "/progress", label: "Learner evidence" },
        { href: "/help", label: "Help" },
      ]
    : STUDENT_NAV;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2.5">
        <div className="flex items-center gap-3">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetHeader>
                <SheetTitle>Navigate</SheetTitle>
              </SheetHeader>
              <div className="px-2 pt-2">
                <NavLinks items={items} onClick={() => setOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <Wordmark href="/today" />
        </div>
        <nav className="hidden md:block" aria-label="Primary">
          <NavLinks items={items} />
        </nav>
        <RoleSwitcher />
      </div>
    </header>
  );
}

function ShellFrame({
  header,
  children,
}: {
  header: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-svh">
      <SkipLink />
      <PilotBanner />
      {header}
      <main id="main" className="mx-auto w-full max-w-6xl px-4 py-8">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const { ready, state } = useLearner();
  const pathname = usePathname();
  const router = useRouter();
  const publicSurface = isPublicPath(pathname);
  const onboarding = isOnboardingPath(pathname);
  const gated = isGatedPath(pathname);
  const onboarded = state.onboarding.completed;

  useEffect(() => {
    if (!ready) return;
    if (onboarded || !gated) return;
    const id = window.setTimeout(() => {
      router.replace("/onboarding");
    }, 0);
    return () => window.clearTimeout(id);
  }, [ready, onboarded, gated, router]);

  if (publicSurface) {
    return (
      <ShellFrame header={<PublicHeader onboarded={ready && onboarded} />}>
        {children}
      </ShellFrame>
    );
  }

  if (onboarding) {
    return (
      <div className="min-h-svh">
        <SkipLink />
        <PilotBanner />
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5">
            <Wordmark href="/" />
            <Button variant="ghost" size="sm" render={<Link href="/help" />}>
              Help
            </Button>
          </div>
        </header>
        <main id="main">{children}</main>
        <SiteFooter />
      </div>
    );
  }

  if (!gated) {
    return (
      <ShellFrame header={<PublicHeader onboarded={ready && onboarded} />}>
        {children}
      </ShellFrame>
    );
  }

  if (!ready) {
    return (
      <div className="flex min-h-svh items-center justify-center px-4 text-sm text-muted-foreground">
        Restoring the study record saved in this browser…
      </div>
    );
  }

  if (!onboarded && gated) {
    return (
      <div className="flex min-h-svh items-center justify-center px-4 text-sm text-muted-foreground">
        Opening onboarding so we can set an honest Unit 2 plan…
      </div>
    );
  }

  return (
    <ShellFrame header={<StudentHeader mentor={state.role === "mentor"} />}>
      {children}
    </ShellFrame>
  );
}

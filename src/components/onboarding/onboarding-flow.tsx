"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { hoursWarning, routeCopy } from "@/lib/planner";
import { completeOnboarding, useLearner } from "@/lib/store";
import type { StudyRoute } from "@/lib/types";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function OnboardingFlow() {
  const { state, patch } = useLearner();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [hours, setHours] = useState(state.onboarding.weeklyHours);
  const [route, setRoute] = useState<StudyRoute>(state.onboarding.route);
  const [exposure, setExposure] = useState(state.onboarding.priorExposure);
  const [days, setDays] = useState<string[]>(state.onboarding.preferredDays);

  const warn = hoursWarning(hours, route);
  const copy = routeCopy(route);

  function save() {
    completeOnboarding(patch, {
      completed: true,
      examYear: 2027,
      weeklyHours: hours,
      preferredDays: days,
      route,
      priorExposure: exposure,
    });
    toast(
      "Plan saved on this device. Every Unit 2 objective starts unassessed until you work — that is honest, not a low score.",
    );
    router.push("/today");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col justify-center px-4 py-12">
      <p className="mb-2 text-xs tracking-wide text-muted-foreground uppercase">
        Limited Unit 2 pilot · May 2027 exam · Anannt Education
      </p>
      <h1 className="font-heading text-3xl tracking-tight">
        Set a plan you can keep, then enter the Unit 2 loop
      </h1>
      <p className="mt-2 text-muted-foreground">
        I will pin this course version to 2027 so we do not accidentally train
        last year’s task. Hours and a route are a planning hypothesis. This is
        not a diagnostic AP score — every objective stays unassessed until you
        produce independent work.
      </p>

      {step === 0 ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Exam year</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              This course version is pinned to <strong>2027</strong>: all three
              SAQs required and source-based; a single LEQ, not a menu of three.
              Older materials cannot silently become 2027 simulations. Official
              facts come from the College Board; Anannt is independent.
            </p>
            <Button onClick={() => setStep(1)}>Continue with the 2027 format</Button>
          </CardContent>
        </Card>
      ) : null}

      {step === 1 ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Weekly hours and days</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Label htmlFor="hours">Hours you can honestly give each week</Label>
            <input
              id="hours"
              type="number"
              min={2}
              max={20}
              value={hours}
              onChange={(e) => setHours(Number(e.target.value) || 2)}
              className="h-9 w-24 rounded-lg border border-input bg-background px-2"
            />
            <p className="text-sm text-muted-foreground">
              An ambitious number you abandon in week three helps no one. Name
              the hours you can protect.
            </p>
            <fieldset>
              <legend className="mb-2 text-sm">Preferred study days</legend>
              <div className="flex flex-wrap gap-2">
                {DAYS.map((d) => (
                  <Button
                    key={d}
                    size="sm"
                    variant={days.includes(d) ? "default" : "outline"}
                    onClick={() =>
                      setDays((prev) =>
                        prev.includes(d)
                          ? prev.filter((x) => x !== d)
                          : [...prev, d],
                      )
                    }
                  >
                    {d}
                  </Button>
                ))}
              </div>
            </fieldset>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(0)}>
                Back
              </Button>
              <Button onClick={() => setStep(2)}>Continue to route</Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {step === 2 ? (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Route — a planning hypothesis</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Prior coverage of AP World? This only changes the envelope, not
              whether Unit 2 still requires sourcing and a mechanism.
            </p>
            <RadioGroup
              value={exposure}
              onValueChange={(v) =>
                setExposure(v as typeof exposure)
              }
            >
              {(
                [
                  ["none", "Little or none — first-time independent learner"],
                  ["some", "Some school coverage or mixed notes"],
                  ["substantial", "Already taught most units; revising"],
                ] as const
              ).map(([id, label]) => (
                <Label key={id} className="flex items-start gap-2">
                  <RadioGroupItem value={id} />
                  {label}
                </Label>
              ))}
            </RadioGroup>
            <p className="text-sm text-muted-foreground">Proposed route</p>
            <RadioGroup
              value={route}
              onValueChange={(v) => setRoute(v as StudyRoute)}
            >
              {(
                [
                  ["foundation", "Foundation"],
                  ["standard", "Standard"],
                  ["revision", "Revision"],
                ] as const
              ).map(([id, label]) => (
                <Label key={id} className="flex items-start gap-2">
                  <RadioGroupItem value={id} />
                  {label}
                </Label>
              ))}
            </RadioGroup>
            <p className="text-sm leading-relaxed">
              <strong>{copy.label}.</strong> {copy.envelope} {copy.fit}
            </p>
            {warn ? (
              <p className="text-sm text-destructive">{warn}</p>
            ) : null}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={save}>Save plan and open Today</Button>
            </div>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

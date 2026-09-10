"use client";

import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLearner } from "@/lib/store";

export function RoleSwitcher() {
  const { state, patch } = useLearner();
  const router = useRouter();
  const mentor = state.role === "mentor";

  return (
    <div className="flex items-center gap-2">
      <Label htmlFor="role-switch" className="text-xs text-muted-foreground">
        Student
      </Label>
      <Switch
        id="role-switch"
        checked={mentor}
        onCheckedChange={(checked) => {
          patch((s) => ({ ...s, role: checked ? "mentor" : "student" }));
          router.push(checked ? "/mentor" : "/today");
        }}
        aria-label="Switch between student and mentor"
      />
      <Label htmlFor="role-switch" className="text-xs text-muted-foreground">
        Mentor
      </Label>
    </div>
  );
}

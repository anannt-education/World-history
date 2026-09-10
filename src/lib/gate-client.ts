"use client";

import { gateHref } from "@/lib/mount";

export function redirectToGate(unit = "u2") {
  window.location.assign(gateHref(unit));
}

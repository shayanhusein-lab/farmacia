"use server";

import { pitchSchema, type Pitch } from "@/lib/pitch-schema";

export type PitchResult = { ok: true } | { ok: false; error: string };

export async function submitPitch(input: Pitch): Promise<PitchResult> {
  const parsed = pitchSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid pitch" };
  }

  // TODO: persist the pitch (e.g. database insert, Google Sheet, or email to the
  // editorial team). `parsed.data` is validated and trimmed.
  console.info("[pitch] received", parsed.data);

  return { ok: true };
}

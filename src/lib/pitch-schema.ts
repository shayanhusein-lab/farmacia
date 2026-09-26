import { z } from "zod";
import { contribute } from "@/content/site";

export const pitchSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name").max(80),
  type: z.enum(contribute.form.types, {
    message: "Pick what you're sharing",
  }),
  idea: z.string().trim().min(8, "Give us a bit more than that").max(200, "Keep it to one line"),
});

export type Pitch = z.infer<typeof pitchSchema>;

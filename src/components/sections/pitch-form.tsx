"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { contribute } from "@/content/site";
import { pitchSchema, type Pitch } from "@/lib/pitch-schema";
import { submitPitch } from "@/app/actions/pitch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Magnetic } from "@/components/motion/magnetic";
import { gsap, MOTION_OK } from "@/lib/gsap";

const f = contribute.form;
const FIELD = "h-auto rounded-xl border-2 border-ink bg-white px-3.5 py-3 text-base text-ink placeholder:text-ink-soft/70 focus-visible:border-ink focus-visible:ring-0 aria-invalid:border-destructive";
const LABEL = "text-[13.5px] font-bold tracking-[0.04em] uppercase";
const ERROR = "text-sm font-medium text-destructive";

export function PitchForm() {
  const [sentCount, setSentCount] = useState(0);
  const [pending, startTransition] = useTransition();
  const okRef = useRef<HTMLParagraphElement>(null);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Pitch>({
    resolver: zodResolver(pitchSchema),
    defaultValues: { name: "", type: f.types[0], idea: "" },
  });

  const onSubmit = (data: Pitch) =>
    startTransition(async () => {
      const res = await submitPitch(data);
      if (!res.ok) {
        toast.error(res.error);
        return;
      }
      toast.success(f.toast);
      setSentCount((n) => n + 1);
      reset();
    });

  // Pop the handwritten confirmation in each time a pitch lands.
  useEffect(() => {
    if (!sentCount || !okRef.current || !window.matchMedia(MOTION_OK).matches) return;
    const tween = gsap.fromTo(
      okRef.current,
      { y: 10, rotate: -6, opacity: 0 },
      { y: 0, rotate: -2, opacity: 1, duration: 0.6, ease: "back.out(3)" }
    );
    return () => {
      tween.kill();
    };
  }, [sentCount]);

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="pitch-title"
      className="grid rotate-[1.5deg] gap-3.5 rounded-panel border-[2.5px] border-ink bg-lime p-[clamp(24px,3vw,34px)] shadow-hard-lg"
    >
      <h3 id="pitch-title" className="text-[28px] font-extrabold">
        {f.title}
      </h3>

      <div className="grid gap-1.5">
        <Label htmlFor="p-name" className={LABEL}>
          {f.nameLabel}
        </Label>
        <Input
          id="p-name"
          autoComplete="name"
          placeholder={f.namePlaceholder}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "p-name-err" : undefined}
          className={FIELD}
          {...register("name")}
        />
        {errors.name ? <p id="p-name-err" className={ERROR}>{errors.name.message}</p> : null}
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="p-type" className={LABEL}>
          {f.typeLabel}
        </Label>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Select value={field.value} onValueChange={(v) => field.onChange(v)}>
              <SelectTrigger id="p-type" className={`${FIELD} w-full data-[size=default]:h-auto`} onBlur={field.onBlur}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 border-ink bg-white shadow-hard-sm ring-0">
                {f.types.map((t) => (
                  <SelectItem key={t} value={t} className="py-2 text-[15px] focus:bg-sun">
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="p-idea" className={LABEL}>
          {f.ideaLabel}
        </Label>
        <Input
          id="p-idea"
          placeholder={f.ideaPlaceholder}
          aria-invalid={!!errors.idea}
          aria-describedby={errors.idea ? "p-idea-err" : undefined}
          className={FIELD}
          {...register("idea")}
        />
        {errors.idea ? <p id="p-idea-err" className={ERROR}>{errors.idea.message}</p> : null}
      </div>

      <Magnetic className="w-full">
        <Button type="submit" variant="brand" size="pill" disabled={pending} className="w-full">
          {pending ? "Sending…" : f.submit}
        </Button>
      </Magnetic>

      <p ref={okRef} role="status" className="hand text-2xl text-blue-deep" hidden={sentCount === 0}>
        {f.success}
      </p>
    </form>
  );
}

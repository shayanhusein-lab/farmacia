import { contribute } from "@/content/site";
import { Chip } from "@/components/brand/chip";
import { SplitHeading } from "@/components/motion/split-heading";
import { PitchForm } from "./pitch-form";
import { SectionTag } from "./section-head";

export function Contribute() {
  return (
    <section id="contribute" aria-labelledby="contribute-title" className="sec scroll-mt-20">
      <div className="wrap grid items-center gap-[clamp(30px,5vw,70px)] min-[901px]:grid-cols-[1.1fr_.9fr]">
        <div>
          <SectionTag>{contribute.tag}</SectionTag>
          <SplitHeading
            id="contribute-title"
            text={contribute.title}
            className="text-[clamp(40px,5.4vw,72px)] font-extrabold"
          />
          <p className="mt-[18px] max-w-[46ch] text-ink-soft">{contribute.body}</p>
          <div className="mt-[26px] flex flex-wrap gap-2.5">
            {contribute.chips.map((c) => (
              <Chip key={c.label} color={c.color}>
                {c.label}
              </Chip>
            ))}
          </div>
        </div>
        <PitchForm />
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MenuIcon } from "lucide-react";
import { nav } from "@/content/site";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

/** Scroll to the top without adding a `#top` hash; also clears any existing hash. */
function scrollToTop(e: React.MouseEvent<HTMLAnchorElement>) {
  // Let modified clicks (new tab/window) behave like a normal link to "/".
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
  e.preventDefault();
  const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  if (window.location.hash) {
    history.replaceState(history.state, "", window.location.pathname + window.location.search);
  }
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-50 py-3">
      <div className="wrap">
        <nav
          aria-label="Main"
          className="flex items-center justify-between gap-4 rounded-full border-2 border-ink bg-paper/85 py-2 pr-2 pl-4 shadow-hard-sm backdrop-blur-md"
        >
          <Link
            href="/"
            onClick={scrollToTop}
            className="flex shrink-0 items-center rounded-lg"
            aria-label="FARMACIA home"
          >
            <Image
              src="/brand/farmacia-wordmark.png"
              alt=""
              width={1200}
              height={399}
              priority
              className="h-8 w-auto sm:h-9"
            />
          </Link>

          <ul className="hidden gap-1 min-[901px]:flex">
            {nav.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="block rounded-full px-[13px] py-2 text-[14.5px] font-medium transition-colors hover:bg-sun"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:inline-flex">
              <a
                href={nav.cta.href}
                className={cn(
                  buttonVariants({ variant: "brand", size: "pill-sm" }),
                  "border-2 shadow-none hover:shadow-none"
                )}
              >
                {nav.cta.label}
              </a>
            </Magnetic>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="paper"
                    size="icon-lg"
                    className="size-10 border-2 shadow-none min-[901px]:hidden"
                    aria-label="Open menu"
                  />
                }
              >
                <MenuIcon className="size-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[82%] border-l-2 border-ink bg-paper p-6 pt-14">
                <SheetTitle className="eyebrow text-orange">Menu</SheetTitle>
                <ul className="mt-2 grid gap-2">
                  {nav.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-2xl border-2 border-ink bg-white px-4 py-3 font-display text-xl font-extrabold shadow-hard-sm transition-colors hover:bg-sun"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href={nav.cta.href}
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants({ variant: "brand", size: "pill" }), "mt-4 justify-center")}
                >
                  {nav.cta.label}
                </a>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}

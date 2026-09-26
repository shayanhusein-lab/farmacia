// usage: PORT=3000 [H=800] [SHOT=out.png] [FULL=1] node probe.mjs <width> "<js expression>"
import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const [w, expr] = process.argv.slice(2);
const DBG = 9400 + Math.floor(Math.random() * 500); // random port: a stale Chrome can never hijack the probe
// Isolated throwaway profile: without it Chrome may hand off to the user's running browser.
const profile = mkdtempSync(join(tmpdir(), "farmacia-probe-"));
const chrome = spawn("google-chrome", ["--headless=new", `--user-data-dir=${profile}`, "--no-first-run", "--disable-gpu", "--force-prefers-reduced-motion", `--window-size=${w},900`, `--remote-debugging-port=${DBG}`, "about:blank"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 1500));
const list = await (await fetch(`http://127.0.0.1:${DBG}/json`)).json();
const ws = new WebSocket(list.find((t) => t.type === "page").webSocketDebuggerUrl);
let id = 0; const pending = new Map();
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
await new Promise((r) => (ws.onopen = r));
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", { width: +w, height: +(process.env.H ?? 800), deviceScaleFactor: 1, mobile: +w < 800 });
await send("Page.navigate", { url: `http://localhost:${process.env.PORT ?? 3000}` });
await new Promise((r) => setTimeout(r, 3500));
const res = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
console.log(JSON.stringify(res.result.result.value ?? res.result, null, 1));
if (process.env.SHOT) { const s = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: !!process.env.FULL }); (await import("node:fs")).writeFileSync(process.env.SHOT, Buffer.from(s.result.data, "base64")); }
ws.close(); chrome.kill();
setTimeout(() => rmSync(profile, { recursive: true, force: true }), 500);

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Copy, Github, Menu, X } from "lucide-react";
import { IznikMark } from "@/components/iznik-mark";
import { Button } from "@/components/ui/button";
import {
  CLAIMS,
  COMMANDS,
  CRATES,
  DOWNLOADS,
  FIGURES,
  HOST_FILES,
  REFUSALS,
  SERVER_MODES,
  SNAPSHOT_RELEASE,
  SOURCE_URL,
  snapshotDownload,
  STEPS,
  type StepId,
} from "@/lib/product";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

const textLink = "text-fg underline decoration-fg/30 underline-offset-4";

const NAV = [
  { href: "#system", label: "Connection" },
  { href: "#host", label: "Install" },
  { href: "#run", label: "Commands" },
  { href: "#origin", label: "Origin" },
] as const;

function Home() {
  const [menu, setMenu] = useState(false);
  const [step, setStep] = useState<StepId>("ssh");
  const [mode, setMode] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const active = STEPS.find((item) => item.id === step) ?? STEPS[0];
  const server = SERVER_MODES[mode] ?? SERVER_MODES[0];

  const copy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    setCopied(id);
    window.setTimeout(() => setCopied((current) => (current === id ? null : current)), 1600);
  };

  return (
    <main className="min-h-dvh overflow-x-hidden bg-bg text-fg">
      <header className="sticky top-0 z-20 border-b border-fg/8 bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
          <a href="#top" className="flex min-h-11 items-center gap-3 text-fg">
            <span className="block size-8">
              <IznikMark detail="seal" className="size-full" />
            </span>
            <span className="font-display text-xl font-semibold tracking-[0.18em]">İZNİK</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-fg">
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href={SOURCE_URL} aria-label="GitHub">
                <Github className="size-5" />
              </a>
            </Button>
            <button
              type="button"
              className="grid size-11 place-items-center text-fg md:hidden"
              aria-expanded={menu}
              aria-label={menu ? "Close menu" : "Open menu"}
              onClick={() => setMenu((open) => !open)}
            >
              {menu ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {menu ? (
          <nav className="flex flex-col border-t border-fg/8 px-5 py-2 md:hidden">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex min-h-11 items-center text-sm text-muted"
                onClick={() => setMenu(false)}
              >
                {item.label}
              </a>
            ))}

          </nav>
        ) : null}
      </header>

      <section
        id="top"
        className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-14 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:py-24"
      >
        <div className="iznik-rise flex flex-col gap-6">
          <p className="text-xs font-medium tracking-[0.28em] text-muted uppercase">Remote terminal</p>
          <h1 className="font-display text-4xl leading-[1.1] font-semibold tracking-[-0.03em] sm:text-5xl">
            A remote terminal system with a cross-platform GPUI front end.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-muted">
            Your SSH. <span className="whitespace-nowrap text-fg">iznik-server</span> on the host
            if it isn’t there. Every pane is a real pseudoterminal, drawn from its raw bytes.
            Linux, macOS, Windows.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href="#run">How to run it</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="#system">How a connection works</a>
            </Button>
          </div>
        </div>
        <div className="iznik-rise-2 mx-auto w-full max-w-sm">
          <IznikMark rotating className="aspect-square w-full" />
        </div>
      </section>

      <section id="download" className="border-t border-fg/8 bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs font-medium tracking-[0.28em] text-muted uppercase">Download</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em]">
            Download a snapshot
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Rolling build off <span className="text-fg">develop</span>. Replaced in place after
            the gates. Not a stable release. The archive carries the app and the Linux and macOS
            servers. No Windows server.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {DOWNLOADS.map((item) => (
              <li key={item.id}>
                <a
                  href={snapshotDownload(item.file)}
                  className="flex min-h-14 flex-col justify-center gap-1 rounded-xl border border-fg/8 bg-bg px-4 py-3 hover:bg-fg/4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <span>
                    <span className="block text-sm text-fg">{item.platform}</span>
                    <span className="block text-sm text-muted">{item.detail}</span>
                  </span>
                  <code className="overflow-x-auto font-mono text-xs text-subtle sm:text-right">
                    {item.file}
                  </code>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Windows is an unsigned zip, and it opens one ssh per command. Win32-OpenSSH can’t
            multiplex. The{" "}
            <a href={SNAPSHOT_RELEASE} className={textLink}>
              release notes
            </a>{" "}
            name the commit.
          </p>
        </div>
      </section>

      <section id="origin" className="border-t border-fg/8">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-16 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium tracking-[0.28em] text-muted uppercase">Rust</p>
            <h2 className="font-display text-4xl font-semibold tracking-[-0.03em]">Written in Rust</h2>
            <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted">
              <p>Server, client, protocol, app, harness. Rust, for stability and speed.</p>
              <p>
                Same rules for people and agents. Change one in the open, or it’s a bug.{" "}
                <span className="font-mono text-fg">cargo xtask check</span> is the bar: format,
                lint, docs, tests, claims. Warnings fail it. No proof, no claim. The numbers in
                the docs are the numbers in the gate. Every run has a deadline.
              </p>
              <p>
                A snapshot ships only after that. A release is a list: six-hour soak, two hosts;
                measure again; the gate, on the clean tree; every claim; each server built twice,
                bytes compared; the generated C header, read by eye. Name the machine.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium tracking-[0.28em] text-muted uppercase">The name</p>
            <h2 className="font-display text-4xl font-semibold tracking-[-0.03em]">
              A fond jab at Zellij
            </h2>
            <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted">
              <p>
                tmux first. Tabs and panes that lived through a bad link and a restarted client.
                I couldn’t leave it.
              </p>
              <p>
                Then{" "}
                <a href="https://zellij.dev/" className={textLink}>
                  Zellij
                </a>
                , because it looked like now. I wanted a code editor with that stamina and that
                UI.
              </p>
              <p>
                <a href="https://rune.build/" className={textLink}>
                  rune.build
                </a>{" "}
                was almost love at first sight. Then I asked if I really need that much
                complexity, day to day.
              </p>
              <p>
                <a href="https://ghostty.org/" className={textLink}>
                  Ghostty
                </a>
                ’s speed mesmerized me. I kept seeing a love-child of{" "}
                <a href="https://zed.dev/" className={textLink}>
                  Zed
                </a>
                ’s UI and Ghostty.
              </p>
              <p>
                İznik isn’t an editor. It’s the terminal I built instead: one window, a session
                that outlives the client.
              </p>
              <p>
                The name pokes{" "}
                <a href="https://zellij.dev/" className={textLink}>
                  Zellij
                </a>
                , fondly. The same word is Morocco’s{" "}
                <a href="https://en.wikipedia.org/wiki/Zellij" className={textLink}>
                  mosaic tile
                </a>
                .{" "}
                <a href="https://en.wikipedia.org/wiki/Iznik_pottery" className={textLink}>
                  İznik ware
                </a>{" "}
                is the Ottoman answer:{" "}
                <a href="https://en.wikipedia.org/wiki/Saz_style" className={textLink}>
                  saz leaf
                </a>
                , tulip, carnation. Same craft, other shore.
              </p>
            </div>
            <p className="text-sm">
              <a href="https://koraytaylan.com" className={textLink}>
                Koray Taylan Davgana
              </a>
            </p>
          </div>
        </div>
      </section>

      <section id="system" className="border-t border-fg/8">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3">
          {CLAIMS.map((item) => (
            <article key={item.k} className="flex flex-col gap-3">
              <span className="font-display text-sm tracking-[0.2em] text-turquoise">{item.k}</span>
              <h2 className="font-display text-2xl font-semibold">{item.title}</h2>
              <p className="text-sm leading-relaxed text-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-fg/8 bg-bg-elevated">
        <div className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col gap-6">
            <p className="text-xs font-medium tracking-[0.28em] text-muted uppercase">A connection</p>
            <h2 className="font-display text-4xl font-semibold tracking-[-0.03em]">
              Four steps, one host
            </h2>
            <p className="text-sm leading-relaxed text-muted">{active.body}</p>
          </div>
          <ol className="flex flex-col">
            {STEPS.map((item, index) => {
              const on = item.id === step;
              return (
                <li key={item.id} className="border-t border-fg/8">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setStep(item.id)}
                    className={cn(
                      "flex min-h-14 w-full items-baseline gap-4 py-4 text-left",
                      on ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    <span className="font-display w-8 text-sm tracking-[0.16em] text-turquoise">
                      0{index + 1}
                    </span>
                    <span className="font-display text-2xl font-semibold">{item.label}</span>
                    <span className="ml-auto hidden text-sm sm:inline">{item.title}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section id="host" className="border-t border-fg/8 bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs font-medium tracking-[0.28em] text-muted uppercase">On a host</p>
          <h2 className="mt-3 max-w-xl font-display text-4xl font-semibold tracking-[-0.03em]">
            Exactly this, and nothing else
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            Prefix, first hit wins: $XDG_DATA_HOME/iznik, $HOME/.local/share/iznik, or a runtime
            directory you already own. Runtime dir: $XDG_RUNTIME_DIR/iznik, else
            $TMPDIR/iznik-&lt;user id&gt;. Nothing is created just to look.
          </p>
          <ul className="mt-10">
            {HOST_FILES.map((row) => (
              <li
                key={row.where}
                className="grid gap-2 border-t border-fg/8 py-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-baseline"
              >
                <code className="font-mono text-sm text-fg">{row.where}</code>
                <p className="text-sm leading-relaxed text-muted">{row.what}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
            A pane does not inherit SSH_CONNECTION, SSH_CLIENT, SSH_TTY, or XDG_SESSION_ID.
            Those die with the session. Uninstall removes the binary, the terminfo, the runtime
            dir, and a prefix iznik made itself.
          </p>
        </div>
      </section>

      <section className="border-t border-fg/8">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="flex flex-col gap-4">
            <p className="text-xs font-medium tracking-[0.28em] text-muted uppercase">Measured</p>
            <h2 className="font-display text-4xl font-semibold tracking-[-0.03em]">
              Numbers, not adjectives
            </h2>
            <p className="text-sm leading-relaxed text-muted">
              Real server, real unix socket. AMD Ryzen 7 PRO 8700GE, 62 GiB, Linux, regression
              profile, commit 6afd429. The ceilings are separate, and loose on purpose.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-fg/8">
            {FIGURES.map((figure) => (
              <div key={figure.label} className="flex flex-col gap-2 bg-bg-elevated p-5">
                <dt className="font-display text-3xl font-semibold tracking-[-0.03em]">{figure.value}</dt>
                <dd className="text-sm leading-relaxed text-muted">{figure.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>


      <section id="run" className="border-t border-fg/8 bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <p className="text-xs font-medium tracking-[0.28em] text-muted uppercase">Run</p>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em]">
            From the repository
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
            The app looks two directories up for one iznik-server per host triple.{" "}
            <span className="text-fg">cargo app</span> builds the x86_64 and aarch64 Linux
            servers, because a host is whatever it is. Wrong architecture: refused. The host
            keeps the build it had.
          </p>
          <ul className="mt-10 flex flex-col gap-3">
            {COMMANDS.map((item) => (
              <li
                key={item.id}
                className="grid items-center gap-3 rounded-xl border border-fg/8 bg-bg p-4 md:grid-cols-[9rem_minmax(0,1fr)_auto]"
              >
                <p className="text-sm text-muted">{item.label}</p>
                <div className="min-w-0">
                  <code className="block overflow-x-auto font-mono text-sm text-fg">{item.command}</code>
                  <p className="mt-1 text-sm leading-relaxed text-subtle">{item.note}</p>
                </div>
                <button
                  type="button"
                  className="grid size-11 place-items-center justify-self-end text-muted hover:text-fg"
                  aria-label={copied === item.id ? "Copied" : `Copy ${item.command}`}
                  onClick={() => copy(item.id, item.command)}
                >
                  {copied === item.id ? <Check className="size-4" /> : <Copy className="size-4" />}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-14 flex max-w-3xl flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-2xl font-semibold">The server, by itself</h3>
              <p className="text-sm leading-relaxed text-muted">
                Bootstrap runs exactly one of these. So can you.{" "}
                <span className="text-fg">--program</span> is what a pane runs.{" "}
                <span className="text-fg">--idle-shutdown-seconds</span> is how fast an empty
                daemon quits.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-2">
                {SERVER_MODES.map((item, index) => (
                  <button
                    key={item.flag}
                    type="button"
                    aria-pressed={mode === index}
                    onClick={() => setMode(index)}
                    className={cn(
                      "min-h-11 rounded-md px-3 font-mono text-sm",
                      mode === index ? "bg-fg text-bg" : "border border-fg/10 text-muted hover:text-fg",
                    )}
                  >
                    {item.flag}
                  </button>
                ))}
              </div>
              <div className="rounded-xl border border-fg/8 bg-bg p-5">
                <p className="font-mono text-sm text-fg">iznik-server {server.flag}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{server.body}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-fg/8 bg-bg-elevated">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-2">
          <div>
            <p className="text-xs font-medium tracking-[0.28em] text-muted uppercase">Pieces</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em]">
              What the repository holds
            </h2>
            <ul className="mt-8 flex flex-col">
              {CRATES.map((crate) => (
                <li key={crate.name} className="border-t border-fg/8 py-4">
                  <p className="font-mono text-sm text-fg">{crate.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{crate.role}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium tracking-[0.28em] text-muted uppercase">Left out</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-[-0.03em]">
              What it will not grow
            </h2>
            <ul className="mt-8 flex flex-col gap-4">
              {REFUSALS.map((line) => (
                <li key={line} className="border-t border-fg/8 pt-4 text-sm leading-relaxed text-muted">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-fg/8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="block size-10">
              <IznikMark detail="seal" className="size-full" />
            </span>
            <p className="font-display text-lg tracking-[0.18em]">İZNİK</p>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-subtle">
            A remote terminal with a cross-platform GPUI front end. Server, client, protocol,
            app, C ABI, and the harness that proves them.
          </p>
          <a href={SOURCE_URL} className="min-h-11 text-sm text-muted hover:text-fg">
            github.com/koraytaylan/iznik
          </a>
        </div>
      </footer>
    </main>
  );
}


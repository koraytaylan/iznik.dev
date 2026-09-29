/** Facts taken from the iznik repository: README, ARCHITECTURE, plans, and the app crate. */

export { SOURCE_URL } from "@/lib/seo";

export const CLAIMS = [
  {
    k: "01",
    title: "The session stays put",
    body: "Sessions, tabs and panes live on the host. Drop the link, close the laptop, restart the app. You pay a reconnect.",
  },
  {
    k: "02",
    title: "One channel, every pane",
    body: "One SSH channel per host. Every pane rides it. The daemon has never heard of SSH.",
  },
  {
    k: "03",
    title: "Bytes stay bytes",
    body: "Raw pseudoterminal bytes. libghostty-vt draws them. The wire never parses a cell.",
  },
] as const;

export const STEPS = [
  {
    id: "ssh",
    label: "Your SSH",
    title: "The host you already reach",
    body: "Your ssh, your config, your known_hosts. The name you pick is handed to ssh as-is. A new name is appended, never overwritten. Batch mode: a missing host key, a passphrase, or a password is yours to fix.",
  },
  {
    id: "bootstrap",
    label: "Bootstrap",
    title: "A server, if the host has none",
    body: "A new host gets one static binary. SHA-256, then it moves into place. Same digest already there, nothing uploads. Daemon already up, leave it.",
  },
  {
    id: "daemon",
    label: "Daemon",
    title: "It outlives the session that started it",
    body: "iznik-server --stdio relays the channel to a unix socket and starts the daemon if it must. One daemon. It outlives SSH, and quits after ten quiet minutes with nothing open.",
  },
  {
    id: "attach",
    label: "Attach",
    title: "Resume from the byte you hold",
    body: "The client keeps each host’s sessions, tabs and panes, and catches up by numbered deltas. Resume from a byte you hold, or from the screen a cold attach is handed.",
  },
] as const;

export type StepId = (typeof STEPS)[number]["id"];

export const HOST_FILES = [
  {
    where: "<prefix>/bin/iznik-server",
    what: "The server. One static binary. SHA-256, then it is renamed into place.",
  },
  {
    where: "<prefix>/terminfo",
    what: "xterm-ghostty, compiled by the host’s own tic. No tic, and panes are told xterm-256color.",
  },
  {
    where: "<runtime>/server.sock",
    what: "The daemon’s socket.",
  },
  {
    where: "<runtime>/server.lock",
    what: "One daemon per user. The lock holds its process id.",
  },
  {
    where: "<runtime>/server.log",
    what: "The daemon’s log.",
  },
  {
    where: "<runtime>/agent.sock",
    what: "The newest connection’s SSH agent, and only if one was forwarded. Otherwise a new pane has no SSH_AUTH_SOCK.",
  },
] as const;

export const SERVER_MODES = [
  {
    flag: "--stdio",
    title: "Relay",
    body: "What SSH runs. Relays stdio to the daemon, and starts it if it is down.",
  },
  {
    flag: "--daemon",
    title: "Background",
    body: "Start it in the background. Return when the socket answers.",
  },
  {
    flag: "--foreground",
    title: "Foreground",
    body: "Same process, in this terminal, so you can watch it.",
  },
  {
    flag: "--stop",
    title: "Stop",
    body: "Stop the daemon that holds the lock.",
  },
  {
    flag: "--version",
    title: "Version",
    body: "Crate version and protocol version, one line.",
  },
] as const;

const SNAPSHOT_BASE = "https://github.com/koraytaylan/iznik/releases/download/develop-snapshot";

export const SNAPSHOT_RELEASE = "https://github.com/koraytaylan/iznik/releases/tag/develop-snapshot";

/** Rolling archives on the develop-snapshot prerelease. Names stay fixed while the bytes move. */
export const DOWNLOADS = [
  { id: "linux", platform: "Linux", detail: "x86_64", file: "iznik-linux.tar.gz" },
  { id: "mac-arm", platform: "macOS", detail: "Apple silicon", file: "iznik-aarch64-apple-darwin.tar.gz" },
  { id: "mac-intel", platform: "macOS", detail: "Intel", file: "iznik-x86_64-apple-darwin.tar.gz" },
  { id: "windows", platform: "Windows", detail: "x86_64", file: "iznik-x86_64-pc-windows-msvc.zip" },
] as const;

export function snapshotDownload(file: string) {
  return `${SNAPSHOT_BASE}/${file}`;
}

export const COMMANDS = [
  {
    id: "doctor-local",
    label: "This machine",
    command: "cargo xtask doctor",
    note: "What is missing here, and how to install it.",
  },
  {
    id: "app",
    label: "The application",
    command: "./scripts/app/run.sh",
    note: "Toolchain, both Linux servers, then the app.",
  },
  {
    id: "check",
    label: "The gates",
    command: "cargo xtask check",
    note: "Format, lint, docs, tests, proofs.",
  },
  {
    id: "doctor-host",
    label: "A host",
    command: "iznik doctor <host>",
    note: "JSON. The layer that failed, and skipped below it.",
  },
  {
    id: "uninstall",
    label: "Take it off",
    command: "iznik uninstall <host>",
    note: "Binary, terminfo, runtime dir. A borrowed prefix keeps what was not ours.",
  },
] as const;

export const FIGURES = [
  { value: "0.055 ms", label: "Keystroke to echo, at rest, median" },
  { value: "89 MiB/s", label: "One pane’s throughput" },
  { value: "6 MiB", label: "Resident memory at rest" },
  { value: "6.4 ms", label: "Startup, until the socket answers" },
] as const;

export const CRATES = [
  { name: "iznik-app", role: "The GPUI application. One window, the pane grid, the bars, the palette." },
  { name: "iznik-client", role: "SSH, bootstrap, the client-side model, optimistic commands, several hosts." },
  { name: "iznik-server", role: "The daemon. Panes, mirrors, history, sessions, multiplexing, resume." },
  { name: "iznik-protocol", role: "The iznik/1 messages. No I/O, no clock, no dependencies." },
  { name: "iznik-ffi", role: "C ABI over the client engine, for a front end in another language." },
  { name: "iznik", role: "Plumbing: probe, state, tail, benchmark, doctor, uninstall. It never draws a screen." },
] as const;

export const REFUSALS = [
  "One interface: the app. The iznik command prints structured text.",
  "The server remembers a tab’s layout. It never computes a cell size.",
  "No second backend. The host gets iznik-server, or a reason it didn’t.",
] as const;

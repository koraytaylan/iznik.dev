# İznik

> A remote terminal with a cross-platform GPUI front end. Your SSH. iznik-server on the host if it isn’t there. Every pane is a real pseudoterminal, drawn from its raw bytes. Linux, macOS, Windows. Drop the link and you pay a reconnect.

Original URL: https://iznik.dev

Source: https://github.com/koraytaylan/iznik

## Rust

Server, client, protocol, app, harness. Rust, for stability and speed.

Same rules for people and agents. Change one in the open, or it’s a bug. `cargo xtask check` is the bar: format, lint, docs, tests, claims. Warnings fail it. No proof, no claim. The numbers in the docs are the numbers in the gate. Every run has a deadline.

A snapshot ships only after that. A release is a list: six-hour soak, two hosts; measure again; the gate, on the clean tree; every claim; each server built twice, bytes compared; the generated C header, read by eye. Name the machine.

## The name

tmux first. Tabs and panes that lived through a bad link and a restarted client. I couldn’t leave it.

Then [Zellij](https://zellij.dev/), because it looked like now. I wanted a code editor with that stamina and that UI.

[rune.build](https://rune.build/) was almost love at first sight. Then I asked if I really need that much complexity, day to day.

[Ghostty](https://ghostty.org/)’s speed mesmerized me. I kept seeing a love-child of [Zed](https://zed.dev/)’s UI and Ghostty.

İznik isn’t an editor. It’s the terminal I built instead: one window, a session that outlives the client.

The name pokes [Zellij](https://zellij.dev/), fondly. The same word is Morocco’s [mosaic tile](https://en.wikipedia.org/wiki/Zellij). [İznik ware](https://en.wikipedia.org/wiki/Iznik_pottery) is the Ottoman answer: [saz leaf](https://en.wikipedia.org/wiki/Saz_style), tulip, carnation. Same craft, other shore.

[Koray Taylan Davgana](https://koraytaylan.com)

## Connection

Sessions, tabs and panes live in the server on the host.

One SSH channel per host carries every pane on that host. The daemon does not know what SSH is. The relay on the far side is one more local client.

Pane output is the pseudoterminal’s raw bytes. The application renders them with libghostty-vt. Nothing on the wire parses those bytes into cells.

A connection is four steps:

1. Your SSH. The name you pick is handed to `ssh` as-is. A new name is appended, never overwritten. Batch mode: a missing host key, a passphrase, or a password is yours to fix.
2. Bootstrap. A host that has never seen iznik receives one static binary. The SHA-256 digest is checked before the file is renamed into place. The same digest already installed means nothing is uploaded. A daemon that is already running is left alone.
3. Daemon. `iznik-server --stdio` relays the SSH channel to a daemon on a unix socket, starting that daemon if it is absent. It refuses to run twice, survives the SSH session, and exits on its own after ten minutes with no panes and no clients.
4. Attach. The client keeps the model of each host and reconciles it against numbered deltas. A pane resumes from a sequence the client already has, or from the screen the server serializes for a cold attach.

## On a host

Connecting to a host that has never seen iznik puts exactly this on it:

- `<prefix>/bin/iznik-server` — one static binary, verified by its SHA-256 before it is renamed into place.
- `<prefix>/terminfo` — the `xterm-ghostty` entry, compiled by the host’s own `tic`. Skipped where the host has no `tic`; those panes are told `xterm-256color`.
- `<runtime>/server.sock` — the daemon’s socket.
- `<runtime>/server.lock` — one daemon per user.
- `<runtime>/server.log` — what the daemon has to say.
- `<runtime>/agent.sock` — a link to the SSH agent of the newest connection, and only when a connection forwards an agent.

The prefix is the first of `$XDG_DATA_HOME/iznik`, `$HOME/.local/share/iznik`, and a runtime directory this user owns and may write. The runtime directory is `$XDG_RUNTIME_DIR/iznik`, or `$TMPDIR/iznik-<user id>` where there is none.

A pane is not handed `SSH_CONNECTION`, `SSH_CLIENT`, `SSH_TTY`, or `XDG_SESSION_ID`. Taking iznik off removes the binary, the terminfo, the runtime directory, and a prefix iznik itself made.

## Measured

Taken through the real server binary over a unix socket, on an AMD Ryzen 7 PRO 8700GE with 62 GiB, Linux, the regression profile, at commit `6afd429`:

- Keystroke to echo, at rest, median: 0.055 ms
- One pane’s throughput: 89 MiB/s
- Resident memory at rest: 6 MiB
- Startup, until the socket answers: 6.4 ms

## Snapshot

A rolling build from `develop`, published after the gates pass and replaced in place. Not a stable release. Each archive carries the application and the Linux and macOS servers it installs on a host. There is no Windows server. The Windows client is an unsigned zip, and it opens one ssh per command because Win32-OpenSSH cannot multiplex.

Notes: https://github.com/koraytaylan/iznik/releases/tag/develop-snapshot

- Linux, x86_64: https://github.com/koraytaylan/iznik/releases/download/develop-snapshot/iznik-linux.tar.gz
- macOS, Apple silicon: https://github.com/koraytaylan/iznik/releases/download/develop-snapshot/iznik-aarch64-apple-darwin.tar.gz
- macOS, Intel: https://github.com/koraytaylan/iznik/releases/download/develop-snapshot/iznik-x86_64-apple-darwin.tar.gz
- Windows, x86_64: https://github.com/koraytaylan/iznik/releases/download/develop-snapshot/iznik-x86_64-pc-windows-msvc.zip

## Commands

```sh
cargo xtask doctor
./scripts/app/run.sh
cargo xtask check
iznik doctor <host>
iznik uninstall <host>
```

`cargo app` builds the x86_64 and aarch64 Linux servers, because a host is whatever it is. A server for the wrong architecture is refused.

The server, by itself:

```sh
iznik-server --stdio
iznik-server --daemon
iznik-server --foreground
iznik-server --stop
iznik-server --version
```

`--stdio` is what SSH runs. `--program` says what a pane runs. `--idle-shutdown-seconds` shortens the wait before an empty daemon exits.

## Pieces

- `iznik-app` — the GPUI application.
- `iznik-client` — SSH, bootstrap, the client-side model, several hosts.
- `iznik-server` — the daemon.
- `iznik-protocol` — the iznik/1 messages. No I/O, no clock, no dependencies.
- `iznik-ffi` — the C ABI, for a front end written in another language.
- `iznik` — plumbing only: probe, state, tail, benchmark, doctor, uninstall. It never draws a screen.

There is one user interface, and it is the application. The server records how a tab is arranged and never computes a cell size. There is no second backend.

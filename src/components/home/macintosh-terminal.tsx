"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import type { Terminal as XTerm } from "@xterm/xterm";
import { completeTerminalInput, parseTerminalCommand, type ThemeMode } from "@/lib/terminal";

type FileEntry =
  | { type: "file"; content: string }
  | { type: "directory"; children: Record<string, FileEntry> }
  | { type: "link"; href: string; external?: boolean };

type Props = {
  sound: boolean;
  theme: ThemeMode;
  onSoundChange: (enabled: boolean) => void;
  onThemeChange: (theme: ThemeMode) => void;
};

const homeDirectory = "/home/guest";

const filesystem: FileEntry = {
  type: "directory",
  children: {
    "README.md": {
      type: "file",
      content: "MENMA is the portfolio system of Jivesh Lakhani — an AI Product Engineer building production agents, commerce products, backend platforms, browser automation, and cloud infrastructure.",
    },
    "experience.log": {
      type: "file",
      content: "KandidAI (YouseAI Tech) | Founding Engineer | Aug 2023–Present\nOwned commerce agents, Shopify applications, sales automation, production infrastructure, hiring, and engineering mentorship.",
    },
    "skills.txt": {
      type: "file",
      content: "AI       OpenAI, Azure OpenAI, Agents SDK, RAG, Langfuse, Pinecone\nProduct  TypeScript, React, Next.js, Node.js, PostgreSQL\nSystems  Shopify, Meta, WhatsApp, Playwright, queues, webhooks\nInfra    Docker, GitHub Actions, AWS, Azure, Linux, Nginx",
    },
    projects: {
      type: "directory",
      children: {
        "kandid-commerce.link": { type: "link", href: "/work/kandid-ai-agents" },
        "dynamic-storefronts.link": { type: "link", href: "/work/dynamic-shopify-storefronts" },
        "agent-sdr.link": { type: "link", href: "/work/agent-sdr" },
        "linkbird.link": { type: "link", href: "/work/linkbird" },
        "vivo-video.link": { type: "link", href: "/work/vivo-video-platform" },
      },
    },
    network: {
      type: "directory",
      children: {
        "github.link": { type: "link", href: "https://github.com/ljivesh", external: true },
        "linkedin.link": { type: "link", href: "https://linkedin.com/in/jivesh-lakhani", external: true },
        "email.link": { type: "link", href: "mailto:ljivesh@gmail.com", external: true },
      },
    },
    "work.link": { type: "link", href: "/work" },
    "writing.link": { type: "link", href: "/writing" },
    "guestbook.link": { type: "link", href: "/guestbook" },
    "contact.link": { type: "link", href: "/contact" },
    "resume.link": { type: "link", href: "/resume" },
  },
};

const routes: Record<string, string> = {
  home: "/",
  work: "/work",
  projects: "/work",
  writing: "/writing",
  guestbook: "/guestbook",
  contact: "/contact",
  resume: "/resume",
};

const externalRoutes: Record<string, string> = {
  github: "https://github.com/ljivesh",
  linkedin: "https://linkedin.com/in/jivesh-lakhani",
  email: "mailto:ljivesh@gmail.com",
};

function terminalTheme(theme: ThemeMode) {
  const signal = theme === "green" ? "#8df0a5" : "#ffc36b";
  const dim = theme === "green" ? "#51785c" : "#8f6637";
  return {
    background: "#080b09",
    foreground: signal,
    cursor: "#fff4da",
    cursorAccent: "#080b09",
    selectionBackground: `${signal}45`,
    selectionForeground: "#fffaf0",
    black: "#0b0d0b",
    red: "#ff746c",
    green: "#8df0a5",
    yellow: "#ffc36b",
    blue: "#79b8ff",
    magenta: "#d79cff",
    cyan: "#7ee7df",
    white: "#f4f1e8",
    brightBlack: dim,
    brightRed: "#ff9a94",
    brightGreen: "#b5ffc4",
    brightYellow: "#ffe0a3",
    brightBlue: "#a8d1ff",
    brightMagenta: "#e8c4ff",
    brightCyan: "#b1fff8",
    brightWhite: "#ffffff",
  };
}

function nodeAt(path: string[]): FileEntry | undefined {
  let node: FileEntry = filesystem;
  for (const part of path) {
    if (node.type !== "directory") return undefined;
    node = node.children[part];
    if (!node) return undefined;
  }
  return node;
}

function displayPath(path: string[]) {
  return path.length ? `~/${path.join("/")}` : "~";
}

function writeBlock(terminal: XTerm, value: string) {
  value.split("\n").forEach((line) => terminal.writeln(line));
}

export function RetroComputerTerminal({ sound, theme, onSoundChange, onThemeChange }: Props) {
  const router = useRouter();
  const terminalHost = useRef<HTMLDivElement>(null);
  const rendererFrame = useRef<HTMLIFrameElement>(null);
  const transcript = useRef<HTMLPreElement>(null);
  const terminalRef = useRef<XTerm | null>(null);
  const syncScreenRef = useRef<() => void>(() => undefined);
  const ambientRef = useRef<HTMLAudioElement>(null);
  const bootRef = useRef<HTMLAudioElement>(null);
  const beepRef = useRef<HTMLAudioElement>(null);
  const keyboardRef = useRef<HTMLAudioElement>(null);
  const soundRef = useRef(sound);
  const themeRef = useRef(theme);
  const onSoundRef = useRef(onSoundChange);
  const onThemeRef = useRef(onThemeChange);

  useEffect(() => { soundRef.current = sound; }, [sound]);
  useEffect(() => { themeRef.current = theme; }, [theme]);
  useEffect(() => { onSoundRef.current = onSoundChange; }, [onSoundChange]);
  useEffect(() => { onThemeRef.current = onThemeChange; }, [onThemeChange]);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (terminal) {
      terminal.options.theme = terminalTheme(theme);
      syncScreenRef.current();
    }
  }, [theme]);

  useEffect(() => {
    const ambient = ambientRef.current;
    const boot = bootRef.current;
    const beep = beepRef.current;
    const keyboard = keyboardRef.current;
    if (!ambient || !boot || !beep || !keyboard) return;

    ambient.volume = 0.025;
    boot.volume = 0.38;
    beep.volume = 0.22;
    keyboard.volume = 0.16;
    for (const audio of [ambient, boot, beep, keyboard]) audio.muted = !sound;

    if (sound) ambient.play().catch(() => undefined);
    else ambient.pause();
  }, [sound]);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => undefined;

    Promise.all([
      import("@xterm/xterm"),
      import("@xterm/addon-web-links"),
    ]).then(([{ Terminal }, { WebLinksAddon }]) => {
      if (disposed || !terminalHost.current) return;

      const terminal = new Terminal({
        allowProposedApi: false,
        allowTransparency: true,
        cursorBlink: true,
        cursorStyle: "block",
        convertEol: true,
        fontFamily: '"Geist Mono", "SFMono-Regular", Consolas, monospace',
        fontSize: window.innerWidth < 600 ? 11 : 14,
        fontWeight: "500",
        lineHeight: 1.16,
        letterSpacing: 0,
        cols: 55,
        rows: 30,
        scrollback: 3000,
        smoothScrollDuration: 0,
        theme: terminalTheme(themeRef.current),
      });
      terminal.loadAddon(new WebLinksAddon((_event, uri) => window.open(uri, "_blank", "noopener,noreferrer")));
      terminal.open(terminalHost.current);
      terminalRef.current = terminal;

      const textarea = terminal.textarea;
      textarea?.setAttribute("aria-label", "MENMA.OS terminal input");
      textarea?.setAttribute("autocapitalize", "none");
      textarea?.setAttribute("autocomplete", "off");
      textarea?.setAttribute("spellcheck", "false");

      let line = "";
      let cursor = 0;
      let cwd: string[] = [];
      let booting = true;
      const history: string[] = [];
      let historyIndex = 0;
      let cursorVisible = true;
      let screenSyncFrame = 0;
      const timers = new Set<number>();
      const timingScale = navigator.webdriver ? 0.01 : 1;

      const screenText = () => {
        const buffer = terminal.buffer.active;
        const cursorLine = buffer.baseY + buffer.cursorY;
        const visibleCursorLine = cursorLine - buffer.viewportY;
        const lines = Array.from({ length: terminal.rows }, (_, row) => {
          let value = buffer.getLine(buffer.viewportY + row)?.translateToString(true) ?? "";
          if (!booting && cursorVisible && row === visibleCursorLine) {
            const cursorColumn = Math.min(buffer.cursorX, terminal.cols - 1);
            value = value.padEnd(cursorColumn + 1, " ");
            value = `${value.slice(0, cursorColumn)}█${value.slice(cursorColumn + 1)}`;
          }
          return value.slice(0, terminal.cols);
        });
        return lines.join("\n").replace(/\s+$/, "");
      };

      const syncScreen = () => {
        if (disposed || screenSyncFrame) return;
        screenSyncFrame = window.requestAnimationFrame(() => {
          screenSyncFrame = 0;
          const text = screenText();
          if (transcript.current) transcript.current.textContent = text;
          rendererFrame.current?.contentWindow?.postMessage({
            type: "menma-crt-text",
            text,
          }, window.location.origin);
        });
      };
      syncScreenRef.current = syncScreen;

      const keyToInput = (event: { key?: string; ctrlKey?: boolean; altKey?: boolean; metaKey?: boolean }) => {
        const key = event.key ?? "";
        if (event.metaKey) return "";
        if (event.ctrlKey && key.length === 1) {
          const code = key.toUpperCase().charCodeAt(0);
          if (code >= 64 && code <= 95) return String.fromCharCode(code - 64);
        }
        const keys: Record<string, string> = {
          Enter: "\r", Backspace: "\x7f", Delete: "\x1b[3~", Tab: "\t", Escape: "\x1b",
          ArrowUp: "\x1b[A", ArrowDown: "\x1b[B", ArrowRight: "\x1b[C", ArrowLeft: "\x1b[D",
          Home: "\x1b[H", End: "\x1b[F", PageUp: "\x1b[5~", PageDown: "\x1b[6~",
        };
        const input = keys[key] ?? (key.length === 1 ? key : "");
        return event.altKey && input ? `\x1b${input}` : input;
      };

      const handleRendererMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin || event.source !== rendererFrame.current?.contentWindow) return;
        if (event.data?.type === "menma-crt-ready") syncScreen();
        if (event.data?.type === "menma-crt-key") {
          const input = keyToInput(event.data);
          if (input) terminal.input(input, true);
        }
        if (event.data?.type === "menma-crt-scroll") {
          terminal.scrollLines(event.data.direction > 0 ? 3 : -3);
          syncScreen();
        }
      };
      window.addEventListener("message", handleRendererMessage);

      const wait = (milliseconds: number) => new Promise<void>((resolve) => {
        const timer = window.setTimeout(() => {
          timers.delete(timer);
          resolve();
        }, Math.max(1, milliseconds * timingScale));
        timers.add(timer);
      });

      const playEffect = (audio: HTMLAudioElement | null) => {
        if (!soundRef.current || !audio) return;
        audio.currentTime = 0;
        audio.play().catch(() => undefined);
      };

      const prompt = () => terminal.write(`\x1b[38;2;255;172;62mguest@menma\x1b[0m:\x1b[38;2;244;241;232m${displayPath(cwd)}\x1b[0m$ `);
      const redraw = () => {
        terminal.write(`\r\x1b[2K`);
        prompt();
        terminal.write(line);
        const trailing = line.length - cursor;
        if (trailing > 0) terminal.write(`\x1b[${trailing}D`);
      };
      const setLine = (value: string) => {
        line = value;
        cursor = value.length;
        redraw();
      };

      const navigate = (href: string, external = false) => {
        terminal.writeln(`\r\n\x1b[2mOpening ${href}\x1b[0m`);
        if (external) window.open(href, "_blank", "noopener,noreferrer");
        else router.push(href);
      };

      const execute = (input: string) => {
        const { command, args } = parseTerminalCommand(input);
        const current = nodeAt(cwd);
        const entries = current?.type === "directory" ? current.children : {};

        if (!command) return;
        if (routes[command]) return navigate(routes[command]);
        if (externalRoutes[command]) return navigate(externalRoutes[command], true);

        switch (command) {
          case "help":
            writeBlock(terminal, [
              "\x1b[1mMENMA.OS commands\x1b[0m",
              "  help clear history pwd ls tree cd cat open",
              "  whoami skills experience projects work writing",
              "  guestbook contact resume github linkedin email",
              "  date echo uname neofetch theme sound",
              "",
              "Keyboard: Tab complete · ↑/↓ history · Delete forward · Ctrl+L clear · Ctrl+C cancel",
            ].join("\n"));
            break;
          case "clear":
            terminal.clear();
            break;
          case "history":
            history.forEach((entry, index) => terminal.writeln(`${String(index + 1).padStart(3, " ")}  ${entry}`));
            break;
          case "pwd":
            terminal.writeln(`${homeDirectory}${cwd.length ? `/${cwd.join("/")}` : ""}`);
            break;
          case "ls":
            Object.entries(entries).forEach(([name, entry]) => {
              const color = entry.type === "directory" ? "34" : entry.type === "link" ? "36" : "0";
              terminal.write(`\x1b[${color}m${name}${entry.type === "directory" ? "/" : ""}\x1b[0m  `);
            });
            terminal.writeln("");
            break;
          case "tree": {
            const walk = (directory: Record<string, FileEntry>, prefix = "") => {
              const items = Object.entries(directory);
              items.forEach(([name, entry], index) => {
                const last = index === items.length - 1;
                terminal.writeln(`${prefix}${last ? "└──" : "├──"} ${name}${entry.type === "directory" ? "/" : ""}`);
                if (entry.type === "directory") walk(entry.children, `${prefix}${last ? "    " : "│   "}`);
              });
            };
            terminal.writeln(".");
            walk(entries);
            break;
          }
          case "cd": {
            const target = args[0] ?? "~";
            if (target === "~" || target === "/" || target === homeDirectory) cwd = [];
            else if (target === "..") cwd = cwd.slice(0, -1);
            else {
              const next = target.startsWith(`${homeDirectory}/`) ? target.slice(homeDirectory.length + 1).split("/").filter(Boolean) : [...cwd, ...target.split("/").filter(Boolean)];
              const node = nodeAt(next);
              if (!node || node.type !== "directory") terminal.writeln(`cd: no such directory: ${target}`);
              else cwd = next;
            }
            break;
          }
          case "cat": {
            const entry = entries[args[0]];
            if (!entry) terminal.writeln(`cat: ${args[0] ?? ""}: No such file`);
            else if (entry.type === "file") writeBlock(terminal, entry.content);
            else terminal.writeln(`cat: ${args[0]}: Is a ${entry.type}`);
            break;
          }
          case "open":
          case "start": {
            const entry = entries[args[0]];
            if (!entry) terminal.writeln(`open: ${args[0] ?? ""}: No such file`);
            else if (entry.type === "link") navigate(entry.href, entry.external);
            else if (entry.type === "file") writeBlock(terminal, entry.content);
            else terminal.writeln(`open: ${args[0]}: Is a directory`);
            break;
          }
          case "whoami":
            terminal.writeln("Jivesh Lakhani — AI Product Engineer and Founding Engineer");
            break;
          case "skills":
            writeBlock(terminal, filesystem.type === "directory" && filesystem.children["skills.txt"].type === "file" ? filesystem.children["skills.txt"].content : "");
            break;
          case "experience":
            writeBlock(terminal, filesystem.type === "directory" && filesystem.children["experience.log"].type === "file" ? filesystem.children["experience.log"].content : "");
            break;
          case "date":
            terminal.writeln(new Date().toString());
            break;
          case "echo":
            terminal.writeln(args.join(" "));
            break;
          case "uname":
            terminal.writeln(args.includes("-a") ? "MENMA-OS 4.0.0 x86_64 Retro CRT Portfolio Terminal" : "MENMA-OS");
            break;
          case "neofetch":
            writeBlock(terminal, [
              "\x1b[38;2;242;163;64m        .:'\x1b[0m       guest@menma",
              "\x1b[38;2;242;163;64m    __ :'__\x1b[0m       OS: MENMA-OS 4.0",
              "\x1b[38;2;242;163;64m .'`  `-'  ``.\x1b[0m    Host: Retro CRT Portfolio",
              "\x1b[38;2;242;163;64m:          .-'\x1b[0m    Shell: menma-sh",
              "\x1b[38;2;242;163;64m:         :\x1b[0m       Terminal: xterm.js",
              "\x1b[38;2;242;163;64m :         `-;\x1b[0m    Role: AI Product Engineer",
              "\x1b[38;2;242;163;64m  `.__.-.__.'\x1b[0m     Location: Jaipur, India",
            ].join("\n"));
            break;
          case "theme":
            if (args[0] === "amber" || args[0] === "green") {
              terminal.options.theme = terminalTheme(args[0]);
              onThemeRef.current(args[0]);
              terminal.writeln(`Theme changed to ${args[0]}.`);
            } else terminal.writeln("usage: theme amber|green");
            break;
          case "sound":
            if (args[0] === "on" || args[0] === "off") {
              onSoundRef.current(args[0] === "on");
              terminal.writeln(`Sound ${args[0]}.`);
            } else terminal.writeln("usage: sound on|off");
            break;
          default:
            terminal.writeln(`menma-sh: command not found: ${command}`);
        }
      };

      const runBootSequence = async () => {
        terminal.clear();
        terminal.write("\x1b[?25l");
        playEffect(bootRef.current);

        const logo = terminal.cols >= 58
          ? [
              "███╗   ███╗███████╗███╗   ██╗███╗   ███╗ █████╗ ",
              "████╗ ████║██╔════╝████╗  ██║████╗ ████║██╔══██╗",
              "██╔████╔██║█████╗  ██╔██╗ ██║██╔████╔██║███████║",
              "██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║╚██╔╝██║██╔══██║",
              "██║ ╚═╝ ██║███████╗██║ ╚████║██║ ╚═╝ ██║██║  ██║",
              "╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═╝  ╚═╝",
            ]
          : ["MENMA-OS", "RETRO CRT PORTFOLIO TERMINAL"];

        for (const logoLine of logo) terminal.writeln(`\x1b[1;38;2;242;163;64m${logoLine}\x1b[0m`);

        terminal.writeln("");
        await wait(180);
        terminal.writeln("MENMA BIOS 4.0.0 — x86_64");
        await wait(180);
        terminal.writeln("Power-on self test........................ \x1b[32mOK\x1b[0m");
        await wait(180);
        terminal.writeln("Memory check.............................. \x1b[32mOK\x1b[0m");
        await wait(180);
        terminal.writeln("Mounting /home/guest...................... \x1b[32mOK\x1b[0m");
        await wait(210);
        terminal.writeln("Starting xterm.js display driver.......... \x1b[32mOK\x1b[0m");
        await wait(220);

        const barWidth = 20;
        for (let progress = 0; progress <= 100; progress += 25) {
          if (disposed) return;
          const complete = Math.round((progress / 100) * barWidth);
          const bar = `${"#".repeat(complete)}${"-".repeat(barWidth - complete)}`;
          terminal.write(`\rLoading [${bar}] ${String(progress).padStart(3, " ")}%`);
          await wait(42);
        }

        terminal.writeln("\r\n.\r\n.\r\n.");
        await wait(170);
        terminal.writeln("\x1b[1;32mComplete!\x1b[0m\r\n");
        playEffect(beepRef.current);
        await wait(160);
        terminal.writeln("Welcome to \x1b[1;38;2;242;163;64mMENMA-OS 4.0 x86_64\x1b[0m");
        terminal.writeln("Jivesh Lakhani · AI Product Engineer");
        terminal.writeln("Type \x1b[1mhelp\x1b[0m for commands or \x1b[1mneofetch\x1b[0m for system information.\r\n");
        terminal.write("\x1b[?25h");
        booting = false;
        prompt();
        syncScreen();
      };

      const dataDisposable = terminal.onData((data) => {
        if (booting) return;

        if (data === "\r") {
          playEffect(beepRef.current);
          terminal.writeln("");
          const command = line.trim();
          if (command) {
            history.push(command);
            historyIndex = history.length;
            execute(command);
          }
          line = "";
          cursor = 0;
          prompt();
          return;
        }
        if (data === "\u007f") {
          playEffect(keyboardRef.current);
          if (cursor > 0) {
            line = `${line.slice(0, cursor - 1)}${line.slice(cursor)}`;
            cursor -= 1;
            redraw();
          }
          return;
        }
        if (data === "\x1b[3~") {
          playEffect(keyboardRef.current);
          if (cursor < line.length) {
            line = `${line.slice(0, cursor)}${line.slice(cursor + 1)}`;
            redraw();
          }
          return;
        }
        if (data === "\x03") {
          playEffect(keyboardRef.current);
          terminal.writeln("^C");
          line = "";
          cursor = 0;
          prompt();
          return;
        }
        if (data === "\x0c") {
          playEffect(keyboardRef.current);
          terminal.clear();
          redraw();
          return;
        }
        if (data === "\t") {
          playEffect(keyboardRef.current);
          const node = nodeAt(cwd);
          const names = node?.type === "directory" ? Object.keys(node.children) : [];
          setLine(completeTerminalInput(line, names));
          return;
        }
        if (data === "\x1b[A" || data === "\x1b[B") {
          playEffect(keyboardRef.current);
          if (!history.length) return;
          historyIndex = data === "\x1b[A" ? Math.max(0, historyIndex - 1) : Math.min(history.length, historyIndex + 1);
          setLine(historyIndex === history.length ? "" : history[historyIndex]);
          return;
        }
        if (data === "\x1b[D") {
          playEffect(keyboardRef.current);
          cursor = Math.max(0, cursor - 1);
          redraw();
          return;
        }
        if (data === "\x1b[C") {
          playEffect(keyboardRef.current);
          cursor = Math.min(line.length, cursor + 1);
          redraw();
          return;
        }
        if (data === "\x1b[H" || data === "\x1b[1~") {
          playEffect(keyboardRef.current);
          cursor = 0;
          redraw();
          return;
        }
        if (data === "\x1b[F" || data === "\x1b[4~") {
          playEffect(keyboardRef.current);
          cursor = line.length;
          redraw();
          return;
        }
        if (data.startsWith("\x1b")) return;

        const printable = data.replace(/[\x00-\x1f\x7f]/g, "");
        if (!printable) return;
        playEffect(keyboardRef.current);
        line = `${line.slice(0, cursor)}${printable}${line.slice(cursor)}`;
        cursor += printable.length;
        redraw();
      });
      const screenDisposables = [
        terminal.onWriteParsed(syncScreen),
        terminal.onCursorMove(syncScreen),
        terminal.onScroll(syncScreen),
      ];
      const cursorTimer = window.setInterval(() => {
        cursorVisible = !cursorVisible;
        syncScreen();
      }, 500);
      const startupTimer = window.setTimeout(() => {
        timers.delete(startupTimer);
        void runBootSequence();
      }, 0);
      timers.add(startupTimer);

      cleanup = () => {
        dataDisposable.dispose();
        screenDisposables.forEach((disposable) => disposable.dispose());
        window.removeEventListener("message", handleRendererMessage);
        window.clearInterval(cursorTimer);
        if (screenSyncFrame) window.cancelAnimationFrame(screenSyncFrame);
        timers.forEach((timer) => window.clearTimeout(timer));
        terminal.dispose();
        terminalRef.current = null;
        syncScreenRef.current = () => undefined;
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, [router]);

  return (
    <section className="retro-crt-shell" data-theme={theme} aria-label="Interactive three-dimensional MENMA.OS terminal">
      <iframe ref={rendererFrame} className="retro-crt-renderer" src="/retro/index.html" title="Original retro computer renderer" onLoad={() => syncScreenRef.current()} />
      <div ref={terminalHost} className="retro-terminal-backend" aria-hidden="true" />
      <pre ref={transcript} className="retro-terminal-transcript" data-testid="retro-terminal" aria-live="polite" />
      <audio ref={ambientRef} src="/retro/sounds/computer-ambient.mp3" loop preload="auto" />
      <audio ref={bootRef} src="/retro/sounds/computer-boot.mp3" preload="auto" />
      <audio ref={beepRef} src="/retro/sounds/computer-beep.mp3" preload="auto" />
      <audio ref={keyboardRef} src="/retro/sounds/keyboard-pressed.mp3" preload="auto" />
    </section>
  );
}

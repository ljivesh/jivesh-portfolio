"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { useRouter } from "next/navigation";
import type { Terminal as XTerm } from "@xterm/xterm";
import { menmaTerminalLogo } from "@/lib/menma-logo";
import { completeTerminalInput, parseTerminalCommand, type ThemeMode } from "@/lib/terminal";
import { TERMINAL_COLUMNS, TERMINAL_ROWS, type TerminalSnapshot } from "./terminal-texture";
import type { TerminalSound } from "./use-terminal-audio";

type FileEntry =
  | { type: "file"; content: string }
  | { type: "directory"; children: Record<string, FileEntry> }
  | { type: "link"; href: string; external?: boolean };

type Options = {
  theme: ThemeMode;
  onSoundChange: (enabled: boolean) => void;
  onThemeChange: (theme: ThemeMode) => void;
  onExit: () => void;
  playSound: (sound: Exclude<TerminalSound, "ambient">) => void;
};

type TerminalSession = {
  terminalHost: RefObject<HTMLDivElement | null>;
  snapshot: TerminalSnapshot;
  focusInput: () => void;
  sendKey: (event: Pick<KeyboardEvent, "key" | "ctrlKey" | "altKey" | "metaKey">) => void;
  scrollLines: (delta: number) => void;
};

const homeDirectory = "/home/guest";
const emptySnapshot: TerminalSnapshot = {
  text: "",
  lines: Array.from({ length: TERMINAL_ROWS }, () => ""),
  columns: TERMINAL_COLUMNS,
  rows: TERMINAL_ROWS,
};

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
  const signal = theme === "green" ? "rgb(125, 255, 50)" : "rgb(255, 150, 50)";
  const dim = theme === "green" ? "#426b30" : "#75461f";
  return {
    background: "#000000", foreground: signal, cursor: signal, cursorAccent: "#000000",
    selectionBackground: theme === "green" ? "#7dff3245" : "#ff963245", selectionForeground: signal,
    black: "#000000", red: signal, green: signal, yellow: signal, blue: signal,
    magenta: signal, cyan: signal, white: signal, brightBlack: dim,
    brightRed: signal, brightGreen: signal, brightYellow: signal,
    brightBlue: signal, brightMagenta: signal, brightCyan: signal, brightWhite: signal,
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

function formatDuration(milliseconds: number) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours ? `${hours}h ` : ""}${minutes ? `${minutes}m ` : ""}${seconds}s`;
}

function wrapNeofetchValue(label: string, value: string) {
  const left = "  ";
  const width = TERMINAL_COLUMNS - left.length;
  const firstPrefix = `${left}${label}: `;
  const continuation = " ".repeat(firstPrefix.length);
  const words = value.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = firstPrefix;

  for (const word of words) {
    if (`${line}${line === firstPrefix ? "" : " "}${word}`.length <= width) {
      line += `${line === firstPrefix ? "" : " "}${word}`;
    } else {
      lines.push(line);
      line = `${continuation}${word}`;
    }
  }
  lines.push(line);
  return lines;
}

export function useTerminalSession({ theme, onSoundChange, onThemeChange, onExit, playSound }: Options): TerminalSession {
  const router = useRouter();
  const terminalHost = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<XTerm | null>(null);
  const syncRef = useRef<() => void>(() => undefined);
  const themeRef = useRef(theme);
  const onSoundRef = useRef(onSoundChange);
  const onThemeRef = useRef(onThemeChange);
  const onExitRef = useRef(onExit);
  const playSoundRef = useRef(playSound);
  const [snapshot, setSnapshot] = useState(emptySnapshot);

  useEffect(() => { themeRef.current = theme; }, [theme]);
  useEffect(() => { onSoundRef.current = onSoundChange; }, [onSoundChange]);
  useEffect(() => { onThemeRef.current = onThemeChange; }, [onThemeChange]);
  useEffect(() => { onExitRef.current = onExit; }, [onExit]);
  useEffect(() => { playSoundRef.current = playSound; }, [playSound]);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal) return;
    terminal.options.theme = terminalTheme(theme);
    syncRef.current();
  }, [theme]);

  const focusInput = useCallback(() => terminalRef.current?.focus(), []);
  const sendKey = useCallback((event: Pick<KeyboardEvent, "key" | "ctrlKey" | "altKey" | "metaKey">) => {
    if (event.metaKey) return;
    let input = "";
    if (event.ctrlKey && event.key.length === 1) {
      const code = event.key.toUpperCase().charCodeAt(0);
      if (code >= 64 && code <= 95) input = String.fromCharCode(code - 64);
    } else {
      const keys: Record<string, string> = {
        Enter: "\r", Backspace: "\x7f", Delete: "\x1b[3~", Tab: "\t", Escape: "\x1b",
        ArrowUp: "\x1b[A", ArrowDown: "\x1b[B", ArrowRight: "\x1b[C", ArrowLeft: "\x1b[D",
        Home: "\x1b[H", End: "\x1b[F", PageUp: "\x1b[5~", PageDown: "\x1b[6~",
      };
      input = keys[event.key] ?? (event.key.length === 1 ? event.key : "");
    }
    if (event.altKey && input) input = `\x1b${input}`;
    if (input) terminalRef.current?.input(input, true);
  }, []);
  const scrollLines = useCallback((delta: number) => {
    terminalRef.current?.scrollLines(delta);
    syncRef.current();
  }, []);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => undefined;

    Promise.all([import("@xterm/xterm"), import("@xterm/addon-web-links")]).then(([{ Terminal }, { WebLinksAddon }]) => {
      if (disposed || !terminalHost.current) return;

      const terminal = new Terminal({
        allowProposedApi: false,
        allowTransparency: true,
        cursorBlink: true,
        cursorStyle: "block",
        convertEol: true,
        fontFamily: "monospace",
        fontSize: 14,
        fontWeight: "normal",
        lineHeight: 1,
        cols: TERMINAL_COLUMNS,
        rows: TERMINAL_ROWS,
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
      terminal.focus();

      let line = "";
      let cursor = 0;
      let cwd: string[] = [];
      let booting = true;
      let exiting = false;
      let cursorVisible = true;
      let syncFrame = 0;
      let previousText = "";
      const history: string[] = [];
      let historyIndex = 0;
      let historyDraft = "";
      const timers = new Set<number>();
      const timingScale = navigator.webdriver ? 0.01 : 1;
      const sessionStartedAt = Date.now();
      const system = {
        cpu: "MENMA M68K virtual core",
        gpu: "MENMA CRT phosphor adapter",
        memory: "128 KiB virtual memory",
        resolution: `${TERMINAL_COLUMNS}x${TERMINAL_ROWS} characters`,
      };

      const sync = () => {
        if (disposed || syncFrame) return;
        syncFrame = window.requestAnimationFrame(() => {
          syncFrame = 0;
          const buffer = terminal.buffer.active;
          const cursorLine = buffer.baseY + buffer.cursorY - buffer.viewportY;
          const lines = Array.from({ length: TERMINAL_ROWS }, (_, row) => {
            let value = buffer.getLine(buffer.viewportY + row)?.translateToString(true) ?? "";
            if (!booting && cursorVisible && row === cursorLine) {
              const column = Math.min(buffer.cursorX, TERMINAL_COLUMNS - 1);
              value = value.padEnd(column + 1, " ");
              value = `${value.slice(0, column)}█${value.slice(column + 1)}`;
            }
            return value.slice(0, TERMINAL_COLUMNS);
          });
          const text = lines.join("\n").replace(/\s+$/, "");
          if (text === previousText) return;
          previousText = text;
          setSnapshot({ text, lines, columns: TERMINAL_COLUMNS, rows: TERMINAL_ROWS });
        });
      };
      syncRef.current = sync;

      const wait = (milliseconds: number, scale = timingScale) => new Promise<void>((resolve) => {
        const timer = window.setTimeout(() => { timers.delete(timer); resolve(); }, Math.max(1, milliseconds * scale));
        timers.add(timer);
      });
      const play = (sound: Exclude<TerminalSound, "ambient">) => playSoundRef.current(sound);
      const prompt = () => terminal.write(`\x1b[38;2;255;172;62mguest@menma\x1b[0m:\x1b[38;2;244;241;232m${displayPath(cwd)}\x1b[0m$ `);
      const redraw = () => {
        terminal.write("\r\x1b[2K");
        prompt();
        terminal.write(line);
        const trailing = line.length - cursor;
        if (trailing > 0) terminal.write(`\x1b[${trailing}D`);
      };
      const setLine = (value: string) => { line = value; cursor = value.length; redraw(); };
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
              "MENMA.OS commands",
              "",
              "LS       Lists current directory contents",
              "CD       Change directory, '..' moves back",
              "CAT      Prints a file's contents",
              "OPEN     Opens a link or portfolio route",
              "CLEAR    Clears previous terminal output",
              "HISTORY  Lists previously entered commands",
              "NEOFETCH Displays system information",
              "THEME    Changes phosphor: amber or green",
              "SOUND    Turns terminal audio on or off",
              "EXIT     Closes the terminal session",
              "",
              "Tab completes · Up/Down recall · Page Up/Down scroll · Delete forward",
            ].join("\n"));
            break;
          case "clear":
            history.length = 0;
            terminal.clear();
            terminal.write("\x1b[2J\x1b[3J\x1b[H");
            break;
          case "history": history.forEach((entry, index) => terminal.writeln(`${String(index + 1).padStart(3, " ")}  ${entry}`)); break;
          case "pwd": terminal.writeln(`${homeDirectory}${cwd.length ? `/${cwd.join("/")}` : ""}`); break;
          case "ls":
            terminal.writeln(`\r\n${displayPath(cwd)}`);
            Object.entries(entries).forEach(([name, entry], index, items) => {
              const branch = index === items.length - 1 ? "┗" : "┣";
              const marker = entry.type === "directory" ? "━━━━" : "━▷";
              terminal.writeln(`${branch}${marker} ${name}`);
            });
            terminal.writeln("");
            break;
          case "tree": {
            const walk = (directory: Record<string, FileEntry>, prefix = "") => {
              Object.entries(directory).forEach(([name, entry], index, items) => {
                const last = index === items.length - 1;
                terminal.writeln(`${prefix}${last ? "└──" : "├──"} ${name}${entry.type === "directory" ? "/" : ""}`);
                if (entry.type === "directory") walk(entry.children, `${prefix}${last ? "    " : "│   "}`);
              });
            };
            terminal.writeln("."); walk(entries); break;
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
          case "whoami": terminal.writeln("Jivesh Lakhani — AI Product Engineer and Founding Engineer"); break;
          case "skills": writeBlock(terminal, filesystem.type === "directory" && filesystem.children["skills.txt"].type === "file" ? filesystem.children["skills.txt"].content : ""); break;
          case "experience": writeBlock(terminal, filesystem.type === "directory" && filesystem.children["experience.log"].type === "file" ? filesystem.children["experience.log"].content : ""); break;
          case "date": terminal.writeln(new Date().toString()); break;
          case "echo": terminal.writeln(args.join(" ")); break;
          case "uname": terminal.writeln(args.includes("-a") ? "MENMA-OS 4.0.0 x86_64 Macintosh Portfolio Terminal" : "MENMA-OS"); break;
          case "neofetch":
            writeBlock(terminal, [
              "",
              "  ███╗   ███╗    guest@menma",
              "  ████╗ ████║    -----------",
              "  ██╔████╔██║    OS: MENMA-OS 4.0",
              "  ██║╚██╔╝██║    Host: Macintosh 128K",
              "  ██║ ╚═╝ ██║    Shell: menma-sh",
              "  ╚═╝     ╚═╝    Terminal: xterm.js",
              ...wrapNeofetchValue("Uptime", formatDuration(Date.now() - sessionStartedAt)),
              ...wrapNeofetchValue("Resolution", system.resolution),
              ...wrapNeofetchValue("CPU", system.cpu),
              ...wrapNeofetchValue("GPU", system.gpu),
              ...wrapNeofetchValue("Memory", system.memory),
              "",
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
          case "exit":
            exiting = true;
            cursorVisible = false;
            terminal.write("\x1b[?25l");
            void (async () => {
              terminal.writeln("\x1b[2mSaving terminal session...\x1b[0m");
              await wait(180, 1);
              terminal.writeln("\x1b[2mClosing MENMA.OS terminal...\x1b[0m");
              await wait(220, 1);
              terminal.writeln("logout");
              await wait(700, 1);
              if (!disposed) onExitRef.current();
            })();
            break;
          default: terminal.writeln(`menma-sh: command not found: ${command}`);
        }
      };

      const runBootSequence = async () => {
        terminal.clear();
        terminal.write("\x1b[?25l");
        play("boot");
        for (const logoLine of menmaTerminalLogo) {
          terminal.writeln(logoLine);
          await wait(100);
        }
        await wait(500);
        terminal.writeln("\r\nWelcome to MENMA-OS 4.0 x86_64");
        await wait(100);
        terminal.writeln("Type 'help' to list available commands\r\n\r\n");
        await wait(500);
        const loadingChars = ["-", "\\", "|", "/"];
        for (let progress = 0; progress <= 100; progress += 5) {
          if (disposed) return;
          terminal.write(`\rLoading ${loadingChars[(progress / 5) % loadingChars.length]} ${progress}%`);
          await wait(100);
        }
        terminal.writeln("");
        for (let index = 0; index < 3; index += 1) {
          terminal.writeln(".");
          await wait(100);
        }
        terminal.writeln("Complete!\r\n");
        play("beep");
        terminal.write("\x1b[?25h");
        booting = false;
        prompt();
        sync();
      };

      const dataDisposable = terminal.onData((data) => {
        if (booting || exiting) return;
        if (data === "\r") {
          play("beep"); terminal.writeln("");
          const command = line.trim();
          if (command) { history.push(command); execute(command); }
          historyIndex = history.length;
          historyDraft = "";
          line = ""; cursor = 0;
          if (!exiting) prompt();
          return;
        }
        if (data === "\u007f") {
          play("keyboard");
          terminal.scrollToBottom();
          if (cursor > 0) { line = `${line.slice(0, cursor - 1)}${line.slice(cursor)}`; cursor -= 1; redraw(); }
          return;
        }
        if (data === "\x1b[3~") {
          play("keyboard");
          terminal.scrollToBottom();
          if (cursor < line.length) { line = `${line.slice(0, cursor)}${line.slice(cursor + 1)}`; redraw(); }
          return;
        }
        if (data === "\x03") {
          play("keyboard"); terminal.writeln("^C");
          historyIndex = history.length; historyDraft = "";
          line = ""; cursor = 0; prompt(); return;
        }
        if (data === "\x0c") { play("keyboard"); terminal.clear(); redraw(); return; }
        if (data === "\t") {
          play("keyboard");
          terminal.scrollToBottom();
          const node = nodeAt(cwd);
          setLine(completeTerminalInput(line, node?.type === "directory" ? Object.keys(node.children) : []));
          return;
        }
        if (data === "\x1b[A" || data === "\x1b[B") {
          play("keyboard");
          terminal.scrollToBottom();
          if (data === "\x1b[A") {
            if (!history.length) return;
            if (historyIndex === history.length) historyDraft = line;
            historyIndex = Math.max(0, historyIndex - 1);
            setLine(history[historyIndex]);
          } else {
            if (historyIndex >= history.length) return;
            historyIndex += 1;
            setLine(historyIndex === history.length ? historyDraft : history[historyIndex]);
          }
          return;
        }
        if (data === "\x1b[5~" || data === "\x1b[6~") {
          terminal.scrollPages(data === "\x1b[5~" ? -1 : 1);
          sync();
          return;
        }
        if (data === "\x1b[D") { play("keyboard"); cursor = Math.max(0, cursor - 1); redraw(); return; }
        if (data === "\x1b[C") { play("keyboard"); cursor = Math.min(line.length, cursor + 1); redraw(); return; }
        if (data === "\x1b[H" || data === "\x1b[1~") { play("keyboard"); cursor = 0; redraw(); return; }
        if (data === "\x1b[F" || data === "\x1b[4~") { play("keyboard"); cursor = line.length; redraw(); return; }
        if (data.startsWith("\x1b")) return;
        const printable = data.replace(/[\x00-\x1f\x7f]/g, "");
        if (!printable) return;
        const promptLength = `guest@menma:${displayPath(cwd)}$ `.length;
        const available = Math.max(0, TERMINAL_COLUMNS - promptLength - line.length);
        const accepted = printable.slice(0, available);
        if (!accepted) return;
        play("keyboard");
        terminal.scrollToBottom();
        line = `${line.slice(0, cursor)}${accepted}${line.slice(cursor)}`;
        cursor += accepted.length;
        redraw();
      });

      const screenDisposables = [terminal.onWriteParsed(sync), terminal.onCursorMove(sync), terminal.onScroll(sync)];
      const cursorTimer = window.setInterval(() => { cursorVisible = !cursorVisible; sync(); }, 500);
      const startupTimer = window.setTimeout(() => { timers.delete(startupTimer); void runBootSequence(); }, 0);
      timers.add(startupTimer);

      cleanup = () => {
        dataDisposable.dispose();
        screenDisposables.forEach((disposable) => disposable.dispose());
        window.clearInterval(cursorTimer);
        if (syncFrame) window.cancelAnimationFrame(syncFrame);
        timers.forEach((timer) => window.clearTimeout(timer));
        terminal.dispose();
        terminalRef.current = null;
        syncRef.current = () => undefined;
      };
    });

    return () => { disposed = true; cleanup(); };
  }, [router]);

  return { terminalHost, snapshot, focusInput, sendKey, scrollLines };
}

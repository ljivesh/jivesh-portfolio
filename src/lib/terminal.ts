export type ThemeMode = "amber" | "green";
export type TerminalFileType = "file" | "directory" | "link" | "external" | "executable";

export type TerminalFile = {
  type: TerminalFileType;
  content?: string;
  children?: Record<string, TerminalFile>;
};

export type TerminalCommand = {
  name: string;
  aliases?: string[];
  usage?: string;
};

export type TerminalResult = {
  command: string;
  args: string[];
};

export const terminalCommands: TerminalCommand[] = [
  { name: "help" }, { name: "clear" }, { name: "history" }, { name: "pwd" }, { name: "ls" }, { name: "tree" },
  { name: "cd", usage: "cd <directory>" }, { name: "cat", usage: "cat <file>" },
  { name: "open", aliases: ["start"], usage: "open <file>" }, { name: "whoami" }, { name: "skills" },
  { name: "experience" }, { name: "projects" }, { name: "home" }, { name: "work" }, { name: "writing" },
  { name: "guestbook" }, { name: "contact" }, { name: "resume" }, { name: "github" }, { name: "linkedin" },
  { name: "email" }, { name: "date" }, { name: "echo" }, { name: "uname" }, { name: "neofetch" },
  { name: "theme", usage: "theme amber|green" }, { name: "sound", usage: "sound on|off" }, { name: "exit" },
];

export function parseTerminalCommand(input: string): TerminalResult {
  const [rawCommand = "", ...args] = input.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const match = terminalCommands.find((entry) => entry.name === rawCommand || entry.aliases?.includes(rawCommand));
  return { command: match?.name ?? rawCommand, args };
}

export function completeTerminalInput(input: string, entries: string[] = []): string {
  const [command = "", partial = ""] = input.toLowerCase().split(/\s+/, 2);
  if (!input.includes(" ")) {
    const candidate = terminalCommands.flatMap((entry) => [entry.name, ...(entry.aliases ?? [])]).find((name) => name.startsWith(command));
    return candidate ?? input;
  }
  if (["cd", "cat", "start", "open"].includes(command)) {
    const candidate = entries.find((entry) => entry.startsWith(partial));
    return candidate ? `${command} ${candidate}` : input;
  }
  return input;
}

export function resolveTerminalPath(current: string[], target: string): string[] {
  if (!target || target === "/") return [];
  if (target === "..") return current.slice(0, -1);
  return [...current, target];
}

"use client";

import type { ThemeMode } from "@/lib/terminal";
import { MacintoshScene } from "./terminal/macintosh-scene";
import { useTerminalAudio } from "./terminal/use-terminal-audio";
import { useTerminalSession } from "./terminal/use-terminal-session";

type Props = {
  sound: boolean;
  theme: ThemeMode;
  onSoundChange: (enabled: boolean) => void;
  onThemeChange: (theme: ThemeMode) => void;
  onExit: () => void;
};

export function RetroComputerTerminal({ sound, theme, onSoundChange, onThemeChange, onExit }: Props) {
  const audio = useTerminalAudio(sound);
  const terminal = useTerminalSession({
    theme,
    onSoundChange,
    onThemeChange,
    onExit,
    playSound: audio.play,
  });
  const { ambientRef, bootRef, beepRef, keyboardRef } = audio;
  const { terminalHost, snapshot, focusInput, sendKey } = terminal;

  return (
    <section
      className="retro-crt-shell"
      data-theme={theme}
      aria-label="Interactive three-dimensional MENMA.OS terminal"
    >
      <MacintoshScene
        snapshot={snapshot}
        theme={theme}
        onFocus={() => {
          audio.unlock();
          focusInput();
        }}
        onKey={sendKey}
      />
      <div ref={terminalHost} className="retro-terminal-backend" aria-hidden="true" />
      <pre className="retro-terminal-transcript" data-testid="retro-terminal" aria-live="polite">
        {snapshot.text}
      </pre>
      <audio ref={ambientRef} src="/retro/sounds/computer-ambient.mp3" loop preload="auto" />
      <audio ref={bootRef} src="/retro/sounds/computer-boot.mp3" preload="auto" />
      <audio ref={beepRef} src="/retro/sounds/computer-beep.mp3" preload="auto" />
      <audio ref={keyboardRef} src="/retro/sounds/keyboard-pressed.mp3" preload="auto" />
    </section>
  );
}

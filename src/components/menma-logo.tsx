import { menmaTerminalLogo, menmaTerminalMonogram } from "@/lib/menma-logo";

type Props = {
  className?: string;
  monogram?: boolean;
};

export function MenmaLogo({ className, monogram = false }: Props) {
  const rows = monogram ? menmaTerminalMonogram : menmaTerminalLogo;
  const width = monogram ? 106 : 492;

  return (
    <svg
      aria-label="MENMA"
      className={`menma-logo ${className ?? ""}`}
      preserveAspectRatio="xMinYMid meet"
      role="img"
      viewBox={`0 0 ${width} 96`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor" fontFamily="monospace" fontSize="16" fontWeight="700">
        {rows.map((row, index) => <text key={row} x="0" y={16 + index * 16} xmlSpace="preserve">{row}</text>)}
      </g>
    </svg>
  );
}

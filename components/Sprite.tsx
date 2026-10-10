import type { Palette } from "@/lib/sprites";

type Props = {
  rows: string[];
  palette: Palette;
  /** css pixels per sprite pixel */
  size?: number;
  className?: string;
  build?: boolean;
  label?: string;
};

/** A pixel sprite as crisp SVG rects. Rendered on the server; minions can rebuild it rect by rect. */
export function Sprite({ rows, palette, size = 4, className, build = true, label }: Props) {
  const w = rows[0].length;
  const h = rows.length;
  const rects: React.ReactNode[] = [];
  rows.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch !== "." && palette[ch]) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={palette[ch]} />);
    }),
  );
  return (
    <svg
      className={className}
      width={w * size}
      height={h * size}
      viewBox={`0 0 ${w} ${h}`}
      shapeRendering="crispEdges"
      data-build={build ? "svg" : undefined}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {rects}
    </svg>
  );
}

import type { CSSProperties, ReactNode } from "react";
import {
  Carnation,
  Hyacinth,
  Palmette,
  SazLeaf,
  Tulip,
} from "@/components/iznik-mark";
import { IZNIK_WAYS } from "@/lib/iznik-palette";

const way = IZNIK_WAYS.classical;
const style = {
  "--iz-slip": way.slip,
  "--iz-cobalt": way.cobalt,
  "--iz-cobalt-deep": way.cobaltDeep,
  "--iz-turquoise": way.turquoise,
  "--iz-turquoise-light": way.turquoiseLight,
  "--iz-bole": way.bole,
  "--iz-bole-deep": way.boleDeep,
  "--iz-emerald": way.emerald,
  "--iz-ink": way.ink,
} as CSSProperties;

function Frame({
  children,
  viewBox,
}: {
  children: ReactNode;
  viewBox: string;
}) {
  return (
    <svg viewBox={viewBox} className="h-full w-full" style={style} aria-hidden="true">
      {children}
    </svg>
  );
}

export function MotifStudy({ id }: { id: string }) {
  switch (id) {
    case "tulip":
      return (
        <Frame viewBox="-28 -88 56 110">
          <Tulip fill="var(--iz-bole)" />
        </Frame>
      );
    case "carnation":
      return (
        <Frame viewBox="-28 -82 56 104">
          <Carnation fill="var(--iz-cobalt)" />
        </Frame>
      );
    case "saz":
      return (
        <Frame viewBox="-28 -150 56 168">
          <SazLeaf fill="var(--iz-turquoise)" />
        </Frame>
      );
    case "hyacinth":
      return (
        <Frame viewBox="-12 -88 40 110">
          <Hyacinth fill="var(--iz-cobalt)" />
        </Frame>
      );
    case "hatayi":
      return (
        <Frame viewBox="-40 -40 80 80">
          <g transform="translate(0 0)">
            {Array.from({ length: 8 }, (_, i) => (
              <g key={i} transform={`rotate(${i * 45})`}>
                <path
                  d="M 0,-6 C 6,-10 12,-22 8,-32 C 4,-38 1,-40 0,-40 C -1,-40 -4,-38 -8,-32 C -12,-22 -6,-10 0,-6 Z"
                  fill={i % 2 === 0 ? "var(--iz-cobalt)" : "var(--iz-turquoise)"}
                  stroke="var(--iz-ink)"
                  strokeWidth="0.7"
                />
              </g>
            ))}
            <circle r="8" fill="var(--iz-bole)" stroke="var(--iz-ink)" strokeWidth="0.6" />
            <circle r="3" fill="var(--iz-slip)" />
          </g>
        </Frame>
      );
    case "palmette":
      return (
        <Frame viewBox="-24 -64 48 84">
          <Palmette fill="var(--iz-cobalt)" />
        </Frame>
      );
    default:
      return null;
  }
}

import type { CSSProperties, ReactNode } from "react";
import { IZNIK_WAYS, type IznikLayerId, type IznikWayId } from "@/lib/iznik-palette";
import { cn } from "@/lib/utils";

const CX = 500;
const CY = 500;

function polar(r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return {
    x: Math.round((CX + r * Math.cos(a)) * 100) / 100,
    y: Math.round((CY + r * Math.sin(a)) * 100) / 100,
  };
}

function pts(list: { x: number; y: number }[], close = true) {
  return (
    list.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ") +
    (close ? " Z" : "")
  );
}

function star(rOuter: number, rInner: number, n: number, rot = 0) {
  const list = Array.from({ length: n * 2 }, (_, i) =>
    polar(i % 2 === 0 ? rOuter : rInner, (i * 180) / n + rot),
  );
  return pts(list);
}

function ringWave(r: number, n: number, amp: number, phase = 0) {
  const steps = n * 12;
  const list = Array.from({ length: steps }, (_, i) => {
    const t = i / steps;
    const wobble =
      Math.sin(t * n * Math.PI * 2 + phase) * amp +
      Math.sin(t * n * Math.PI * 4 + phase) * amp * 0.32;
    return polar(r + wobble, t * 360);
  });
  return pts(list);
}

function Repeat({
  count,
  start = 0,
  children,
}: {
  count: number;
  start?: number;
  children: (angle: number, i: number) => ReactNode;
}) {
  return Array.from({ length: count }, (_, i) => children(start + (360 / count) * i, i));
}

export function Tulip({ fill }: { fill: string }) {
  return (
    <g>
      <path
        d="M 0,6 C -1.2,-6 -1.6,-16 0,-26"
        fill="none"
        stroke="var(--iz-emerald)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M -7,2 C -12,-4 -9,-10 -3,-8 M 7,2 C 12,-4 9,-10 3,-8"
        fill="none"
        stroke="var(--iz-emerald)"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M 0,-24
           C -4,-26 -8,-30 -9,-36
           C -14,-34 -16,-44 -9,-50
           C -12,-58 -7,-68 -2,-66
           C -3,-74 0,-82 0,-82
           C 0,-82 3,-74 2,-66
           C 7,-68 12,-58 9,-50
           C 16,-44 14,-34 9,-36
           C 8,-30 4,-26 0,-24 Z"
        fill={fill}
        stroke="var(--iz-ink)"
        strokeWidth="1.15"
        strokeLinejoin="round"
      />
      <path
        d="M 0,-30 C -1.5,-42 0,-58 0,-70"
        fill="none"
        stroke="var(--iz-ink)"
        strokeWidth="0.7"
        opacity="0.45"
      />
    </g>
  );
}

export function Carnation({ fill }: { fill: string }) {
  return (
    <g>
      <path
        d="M 0,8 C -1,-4 -1,-12 0,-18"
        fill="none"
        stroke="var(--iz-emerald)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M -6,-16 C -10,-12 -8,-6 -3,-8 M 6,-16 C 10,-12 8,-6 3,-8"
        fill="var(--iz-emerald)"
        stroke="var(--iz-ink)"
        strokeWidth="0.6"
      />
      <path
        d="M 0,-18
           C -8,-20 -14,-28 -12,-38
           C -16,-36 -20,-44 -14,-50
           C -18,-54 -14,-64 -6,-60
           C -8,-70 -2,-76 0,-68
           C 2,-76 8,-70 6,-60
           C 14,-64 18,-54 14,-50
           C 20,-44 16,-36 12,-38
           C 14,-28 8,-20 0,-18 Z"
        fill={fill}
        stroke="var(--iz-ink)"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      {[
        "M -7.1,-48.1 l -2.57,-3.83",
        "M -3.8,-49.5 l -1.37,-4.70",
        "M 0.0,-50.0 l 0,-5",
        "M 3.8,-49.5 l 1.37,-4.70",
        "M 7.1,-48.1 l 2.57,-3.83",
      ].map((d) => (
        <path
          key={d}
          d={d}
          stroke="var(--iz-ink)"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.55"
        />
      ))}
    </g>
  );
}

export function SazLeaf({ flip = false, fill = "var(--iz-cobalt)" }: { flip?: boolean; fill?: string }) {
  return (
    <g transform={flip ? "scale(-1,1)" : undefined}>
      <path
        d="M 0,4
           C 6,-18 14,-44 10,-78
           C 8,-100 6,-122 1,-142
           C -2,-124 -2,-104 0,-86
           C -8,-64 -6,-36 0,4 Z"
        fill={fill}
        stroke="var(--iz-ink)"
        strokeWidth="1.05"
        strokeLinejoin="round"
      />
      <path
        d="M 3,-16
           C 14,-28 6,-34 4,-40
           C 16,-54 6,-60 4,-68
           C 15,-82 5,-90 3,-98
           C 12,-112 3,-120 1,-130"
        fill="none"
        stroke="var(--iz-ink)"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M 1,-20 C -2,-60 2,-100 1,-130"
        fill="none"
        stroke="var(--iz-ink)"
        strokeWidth="0.6"
        opacity="0.35"
      />
    </g>
  );
}

export function Hyacinth({ fill = "var(--iz-cobalt)" }: { fill?: string }) {
  return (
    <g>
      <path
        d="M 0,6 C 6,-22 10,-48 4,-78"
        fill="none"
        stroke="var(--iz-emerald)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {Array.from({ length: 8 }, (_, i) => {
        const t = i / 7;
        const y = -10 - t * 62;
        const x = 6 + Math.sin(t * 3) * 2;
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${12 + i * 4})`}>
            <ellipse
              cx="0"
              cy="0"
              rx="4.2"
              ry="6.4"
              fill={fill}
              stroke="var(--iz-ink)"
              strokeWidth="0.65"
            />
          </g>
        );
      })}
    </g>
  );
}

function HatayiBud({ fill = "var(--iz-bole)" }: { fill?: string }) {
  return (
    <g>
      <path
        d="M 0,6 C -8,-2 -10,-16 0,-28 C 10,-16 8,-2 0,6 Z"
        fill={fill}
        stroke="var(--iz-ink)"
        strokeWidth="0.9"
      />
      <path
        d="M 0,2 C -5,-4 -5,-14 0,-22 C 5,-14 5,-4 0,2 Z"
        fill="var(--iz-turquoise)"
        stroke="var(--iz-ink)"
        strokeWidth="0.6"
      />
      <circle cx="0" cy="-8" r="2.2" fill="var(--iz-slip)" />
    </g>
  );
}

export function Palmette({ fill = "var(--iz-cobalt)" }: { fill?: string }) {
  return (
    <path
      d="M 0,10
         C -7,6 -11,-2 -8,-12
         C -16,-10 -18,-24 -8,-32
         C -10,-42 -4,-52 0,-56
         C 4,-52 10,-42 8,-32
         C 18,-24 16,-10 8,-12
         C 11,-2 7,6 0,10 Z"
      fill={fill}
      stroke="var(--iz-ink)"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  );
}

function Rosette() {
  return (
    <g>
      <circle cx={CX} cy={CY} r="188" fill="var(--iz-slip)" />
      <circle
        cx={CX}
        cy={CY}
        r="184"
        fill="none"
        stroke="var(--iz-cobalt)"
        strokeWidth="3.5"
      />
      <Repeat count={16}>
        {(angle, i) => (
          <g key={angle} transform={`translate(${CX} ${CY}) rotate(${angle})`}>
            <path
              d="M 0,-42
                 C 10,-48 22,-78 16,-118
                 C 10,-148 4,-168 0,-176
                 C -4,-168 -10,-148 -16,-118
                 C -22,-78 -10,-48 0,-42 Z"
              fill={i % 2 === 0 ? "var(--iz-cobalt)" : "var(--iz-turquoise)"}
              stroke="var(--iz-ink)"
              strokeWidth="1.05"
              strokeLinejoin="round"
            />
          </g>
        )}
      </Repeat>
      <Repeat count={8}>
        {(angle) => (
          <g key={angle} transform={`translate(${CX} ${CY}) rotate(${angle + 22.5})`}>
            <path
              d="M 0,-28
                 C 8,-34 16,-58 12,-86
                 C 8,-108 3,-122 0,-128
                 C -3,-122 -8,-108 -12,-86
                 C -16,-58 -8,-34 0,-28 Z"
              fill="var(--iz-bole)"
              stroke="var(--iz-ink)"
              strokeWidth="0.95"
              strokeLinejoin="round"
            />
          </g>
        )}
      </Repeat>
      <circle cx={CX} cy={CY} r="46" fill="var(--iz-slip)" stroke="var(--iz-cobalt)" strokeWidth="2.4" />
      <circle cx={CX} cy={CY} r="36" fill="var(--iz-turquoise)" />
      <circle cx={CX} cy={CY} r="24" fill="var(--iz-bole)" stroke="var(--iz-ink)" strokeWidth="1" />
      <Repeat count={8}>
        {(angle) => {
          const p = polar(15, angle);
          return (
            <circle
              key={angle}
              cx={p.x}
              cy={p.y}
              r="3.2"
              fill="var(--iz-slip)"
            />
          );
        }}
      </Repeat>
      <circle cx={CX} cy={CY} r="8" fill="var(--iz-slip)" />
      <circle cx={CX} cy={CY} r="4.2" fill="var(--iz-cobalt-deep)" />
    </g>
  );
}

type MarkProps = {
  way?: IznikWayId;
  layers?: Record<IznikLayerId, boolean>;
  focus?: IznikLayerId | null;
  className?: string;
  detail?: "full" | "seal";
  rotating?: boolean;
  markId?: string;
};

const ALL_ON: Record<IznikLayerId, boolean> = {
  rim: true,
  band: true,
  wreath: true,
  star: true,
  rosette: true,
};

export function IznikMark({
  way = "classical",
  layers = ALL_ON,
  focus = null,
  className,
  detail = "full",
  rotating = false,
  markId,
}: MarkProps) {
  const palette = IZNIK_WAYS[way];
  const opacity = (id: IznikLayerId) => {
    if (!layers[id]) return 0;
    if (!focus) return 1;
    return focus === id ? 1 : 0.12;
  };

  const style = {
    "--iz-slip": palette.slip,
    "--iz-cobalt": palette.cobalt,
    "--iz-cobalt-deep": palette.cobaltDeep,
    "--iz-turquoise": palette.turquoise,
    "--iz-turquoise-light": palette.turquoiseLight,
    "--iz-bole": palette.bole,
    "--iz-bole-deep": palette.boleDeep,
    "--iz-emerald": palette.emerald,
    "--iz-ink": palette.ink,
  } as CSSProperties;

  if (detail === "seal") {
    return (
      <svg
        viewBox="250 250 500 500"
        className={cn("overflow-visible", className)}
        style={style}
        role="img"
        aria-label="İznik seal"
      >
        <circle cx={CX} cy={CY} r="248" fill="var(--iz-cobalt-deep)" />
        <circle cx={CX} cy={CY} r="236" fill="var(--iz-slip)" />
        <g transform="scale(1.22)" style={{ transformOrigin: "500px 500px" }}>
          <Rosette />
        </g>
      </svg>
    );
  }

  return (
    <svg
      id={markId}
      viewBox="0 0 1000 1000"
      className={cn("overflow-visible", rotating && "iznik-spin", className)}
      style={style}
      role="img"
      aria-labelledby="iznik-title iznik-desc"
    >
      <title id="iznik-title">İznik</title>
      <desc id="iznik-desc">
        Circular ceramic medallion in the manner of sixteenth-century İznik ware:
        hatayi rosette, floral wreath of tulip and carnation, saz leaves, cloud band
        and pearl rim on white slip.
      </desc>

      <circle cx={CX} cy={CY} r="498" fill="var(--iz-cobalt-deep)" />
      <circle cx={CX} cy={CY} r="488" fill="var(--iz-slip)" />

      <g data-layer="rim" style={{ opacity: opacity("rim") }} className="iznik-layer">
        <circle
          cx={CX}
          cy={CY}
          r="478"
          fill="none"
          stroke="var(--iz-cobalt)"
          strokeWidth="18"
        />
        <circle
          cx={CX}
          cy={CY}
          r="464"
          fill="none"
          stroke="var(--iz-turquoise)"
          strokeWidth="4"
        />
        <circle
          cx={CX}
          cy={CY}
          r="454"
          fill="none"
          stroke="var(--iz-cobalt-deep)"
          strokeWidth="3"
        />
        <Repeat count={48}>
          {(angle) => {
            const p = polar(478, angle);
            return (
              <circle
                key={angle}
                cx={p.x}
                cy={p.y}
                r="4.6"
                fill="var(--iz-slip)"
                stroke="var(--iz-ink)"
                strokeWidth="0.5"
              />
            );
          }}
        </Repeat>
        <Repeat count={24}>
          {(angle, i) => {
            const p = polar(478, angle + 7.5);
            return (
              <circle
                key={angle}
                cx={p.x}
                cy={p.y}
                r="2.4"
                fill={i % 2 === 0 ? "var(--iz-bole)" : "var(--iz-turquoise)"}
              />
            );
          }}
        </Repeat>
      </g>

      <g data-layer="band" style={{ opacity: opacity("band") }} className="iznik-layer">
        <circle cx={CX} cy={CY} r="448" fill="var(--iz-slip)" />
        <path
          d={ringWave(438, 16, 9, 0)}
          fill="none"
          stroke="var(--iz-cobalt)"
          strokeWidth="7"
          strokeLinejoin="round"
        />
        <path
          d={ringWave(426, 16, 6, 0.15)}
          fill="none"
          stroke="var(--iz-turquoise)"
          strokeWidth="2.2"
        />
        <Repeat count={16}>
          {(angle, i) => (
            <g
              key={angle}
              transform={`translate(${CX} ${CY}) rotate(${angle + 11.25}) translate(0 -434) scale(0.58)`}
            >
              <Palmette
                fill={i % 2 === 0 ? "var(--iz-cobalt)" : "var(--iz-bole)"}
              />
            </g>
          )}
        </Repeat>
        <circle
          cx={CX}
          cy={CY}
          r="402"
          fill="none"
          stroke="var(--iz-cobalt)"
          strokeWidth="4"
        />
        <circle
          cx={CX}
          cy={CY}
          r="394"
          fill="none"
          stroke="var(--iz-turquoise)"
          strokeWidth="2"
        />
      </g>

      <g data-layer="wreath" style={{ opacity: opacity("wreath") }} className="iznik-layer">
        <circle cx={CX} cy={CY} r="392" fill="var(--iz-slip)" />
        <path
          d={ringWave(310, 8, 10, 0.4)}
          fill="none"
          stroke="var(--iz-emerald)"
          strokeWidth="1.2"
          opacity="0.4"
        />
        <Repeat count={8}>
          {(angle, i) => (
            <g
              key={`saz-${angle}`}
              transform={`translate(${CX} ${CY}) rotate(${angle + 22.5}) translate(0 -262) scale(0.62)`}
            >
              <SazLeaf
                flip={i % 2 === 1}
                fill={i % 2 === 0 ? "var(--iz-turquoise)" : "var(--iz-cobalt)"}
              />
            </g>
          )}
        </Repeat>
        <Repeat count={8}>
          {(angle, i) => (
            <g
              key={`tulip-${angle}`}
              transform={`translate(${CX} ${CY}) rotate(${angle}) translate(0 -304) scale(1.22)`}
            >
              <Tulip fill={i % 2 === 0 ? "var(--iz-bole)" : "var(--iz-cobalt)"} />
            </g>
          )}
        </Repeat>
        <Repeat count={8}>
          {(angle, i) => (
            <g
              key={`carn-${angle}`}
              transform={`translate(${CX} ${CY}) rotate(${angle + 22.5}) translate(0 -318) scale(1.08)`}
            >
              <Carnation fill={i % 2 === 0 ? "var(--iz-cobalt)" : "var(--iz-turquoise)"} />
            </g>
          )}
        </Repeat>
        <Repeat count={8}>
          {(angle, i) => (
            <g
              key={`bud-${angle}`}
              transform={`translate(${CX} ${CY}) rotate(${angle + 22.5}) translate(0 -248) scale(0.78)`}
            >
              <HatayiBud fill={i % 2 === 0 ? "var(--iz-bole)" : "var(--iz-cobalt)"} />
            </g>
          )}
        </Repeat>
        <Repeat count={8}>
          {(angle) => {
            const a = angle + 11.25;
            const p = polar(360, a);
            const p2 = polar(348, a - 3.2);
            const p3 = polar(348, a + 3.2);
            return (
              <g key={`cin-${angle}`}>
                <circle cx={p.x} cy={p.y} r="4.4" fill="var(--iz-bole)" stroke="var(--iz-ink)" strokeWidth="0.55" />
                <circle cx={p2.x} cy={p2.y} r="2.8" fill="var(--iz-cobalt)" />
                <circle cx={p3.x} cy={p3.y} r="2.8" fill="var(--iz-cobalt)" />
              </g>
            );
          }}
        </Repeat>
      </g>

      <g data-layer="star" style={{ opacity: opacity("star") }} className="iznik-layer">
        <circle cx={CX} cy={CY} r="228" fill="var(--iz-slip)" />
        <circle
          cx={CX}
          cy={CY}
          r="222"
          fill="none"
          stroke="var(--iz-cobalt)"
          strokeWidth="6"
        />
        <circle
          cx={CX}
          cy={CY}
          r="212"
          fill="none"
          stroke="var(--iz-turquoise)"
          strokeWidth="2.2"
        />
        <path d={star(208, 168, 8, 0)} fill="var(--iz-cobalt)" stroke="var(--iz-ink)" strokeWidth="1.2" />
        <path d={star(196, 158, 8, 22.5)} fill="var(--iz-turquoise)" stroke="var(--iz-ink)" strokeWidth="1" />
        <path d={star(178, 148, 8, 0)} fill="var(--iz-slip)" stroke="var(--iz-cobalt)" strokeWidth="1.4" />
        <Repeat count={8}>
          {(angle, i) => (
            <g
              key={angle}
              transform={`translate(${CX} ${CY}) rotate(${angle}) translate(0 -196) scale(0.42)`}
            >
              <Palmette fill={i % 2 === 0 ? "var(--iz-bole)" : "var(--iz-cobalt-deep)"} />
            </g>
          )}
        </Repeat>
      </g>

      <g data-layer="rosette" style={{ opacity: opacity("rosette") }} className="iznik-layer">
        <Rosette />
      </g>
    </svg>
  );
}

export function serializeIznikSvg(svg: SVGSVGElement, way: IznikWayId) {
  const palette = IZNIK_WAYS[way];
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.removeAttribute("class");
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("viewBox", "0 0 1000 1000");
  const vars: Record<string, string> = {
    "--iz-slip": palette.slip,
    "--iz-cobalt": palette.cobalt,
    "--iz-cobalt-deep": palette.cobaltDeep,
    "--iz-turquoise": palette.turquoise,
    "--iz-turquoise-light": palette.turquoiseLight,
    "--iz-bole": palette.bole,
    "--iz-bole-deep": palette.boleDeep,
    "--iz-emerald": palette.emerald,
    "--iz-ink": palette.ink,
  };
  clone.setAttribute(
    "style",
    Object.entries(vars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
  let html = clone.outerHTML;
  for (const [k, v] of Object.entries(vars)) {
    html = html.replaceAll(`var(${k})`, v);
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n${html}`;
}

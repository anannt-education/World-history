export function NetworksMap() {
  return (
    <figure className="space-y-3">
      <svg
        viewBox="0 0 720 340"
        role="img"
        aria-labelledby="map-title map-desc"
        className="h-auto w-full rounded-xl bg-[#f3efe6] ring-1 ring-foreground/10"
      >
        <title id="map-title">Schematic networks of exchange, c. 1200–1450</title>
        <desc id="map-desc">
          A dated schematic, not a modern political map. Four corridors are
          labeled: Silk Roads across Inner Asia, Indian Ocean monsoon routes,
          trans-Saharan caravan routes, and Mongol-era relay zones. No present-day
          national borders are drawn. Locations are approximate.
        </desc>
        <rect width="720" height="340" fill="#f3efe6" />
        {/* water */}
        <ellipse cx="430" cy="230" rx="210" ry="70" fill="#d7e4ea" />
        <text x="400" y="238" fontSize="11" fill="#3f5b66">
          Indian Ocean
        </text>
        <ellipse cx="210" cy="70" rx="90" ry="28" fill="#d7e4ea" />
        <text x="175" y="74" fontSize="10" fill="#3f5b66">
          Mediterranean
        </text>
        <ellipse cx="70" cy="200" rx="36" ry="70" fill="#e6d9c6" />
        <text x="48" y="200" fontSize="10" fill="#6b5a45" transform="rotate(-90 58 200)">
          Sahara
        </text>
        {/* corridors */}
        <path
          d="M80 250 C 140 220, 160 180, 210 150"
          fill="none"
          stroke="#8a5a2b"
          strokeWidth="3"
          strokeDasharray="6 4"
        />
        <text x="88" y="268" fontSize="10" fill="#8a5a2b">
          Trans-Saharan
        </text>
        <path
          d="M250 120 C 340 90, 430 100, 560 130"
          fill="none"
          stroke="#5c3d2e"
          strokeWidth="3"
        />
        <text x="360" y="88" fontSize="10" fill="#5c3d2e">
          Silk Roads (overland)
        </text>
        <path
          d="M240 210 C 340 250, 470 255, 600 210"
          fill="none"
          stroke="#1f4d5c"
          strokeWidth="3"
        />
        <text x="390" y="278" fontSize="10" fill="#1f4d5c">
          Indian Ocean (monsoon)
        </text>
        <rect
          x="300"
          y="40"
          width="250"
          height="90"
          rx="8"
          fill="none"
          stroke="#6b3f3f"
          strokeDasharray="4 3"
        />
        <text x="330" y="58" fontSize="10" fill="#6b3f3f">
          Mongol-era relay zone (schematic)
        </text>
        {/* nodes */}
        {[
          [90, 255, "Mali corridor"],
          [210, 150, "N. Africa / Nile"],
          [250, 118, "Tana / Black Sea"],
          [400, 95, "Oasis towns"],
          [560, 128, "Cathay / Yuan China"],
          [260, 215, "Swahili coast"],
          [430, 248, "W. India"],
          [590, 205, "SE Asia / China seas"],
        ].map(([x, y, label]) => (
          <g key={String(label)}>
            <circle cx={Number(x)} cy={Number(y)} r="4.5" fill="#1c1917" />
            <text x={Number(x) + 8} y={Number(y) + 4} fontSize="9" fill="#1c1917">
              {label}
            </text>
          </g>
        ))}
        <text x="16" y="24" fontSize="12" fontWeight="600" fill="#1c1917">
          c. 1200–1450 · schematic corridors
        </text>
        <text x="16" y="326" fontSize="9" fill="#57534e">
          Uncertainty: routes shifted with seasons, war, and succession. This is not a border map.
        </text>
      </svg>
      <figcaption className="text-sm text-muted-foreground">
        Text alternative: four overlapping corridors in the period c. 1200–1450 —
        trans-Saharan caravans, Silk Roads overland, Indian Ocean monsoon sailing,
        and a schematic Mongol-era relay zone. Nodes are commercial regions, not
        modern capitals. The diagram does not tell you which corridor was “most
        important,” and it does not show today’s states.
      </figcaption>
    </figure>
  );
}

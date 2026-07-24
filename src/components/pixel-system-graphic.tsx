export function PixelSystemGraphic() {
  return (
    <div className="pixel-panel" aria-label="Pixel art of a developer working at a laptop">
      <svg
        className="h-auto w-full"
        viewBox="0 0 336 328"
        role="img"
        aria-labelledby="pixel-portrait-title pixel-portrait-description"
        shapeRendering="crispEdges"
      >
        <title id="pixel-portrait-title">Developer at work</title>
        <desc id="pixel-portrait-description">
          Pixel art of a developer wearing a blue hoodie and working on a laptop at night.
        </desc>

        <rect className="portrait-bg" width="336" height="328" />

        <g className="portrait-window">
          <rect x="24" y="24" width="288" height="130" />
          <rect x="32" y="32" width="272" height="114" />
          <rect className="portrait-moon" x="258" y="46" width="22" height="22" />
          <rect className="portrait-sky-light" x="52" y="48" width="5" height="5" />
          <rect className="portrait-sky-light" x="82" y="66" width="4" height="4" />
          <rect className="portrait-sky-light" x="232" y="82" width="5" height="5" />
          <rect className="portrait-sky-light" x="288" y="92" width="4" height="4" />
          <rect className="portrait-building" x="34" y="108" width="38" height="38" />
          <rect className="portrait-building" x="76" y="94" width="48" height="52" />
          <rect className="portrait-building" x="216" y="112" width="36" height="34" />
          <rect className="portrait-building" x="256" y="100" width="46" height="46" />
          <g className="portrait-window-lights">
            <rect x="44" y="118" width="6" height="6" />
            <rect x="58" y="130" width="6" height="6" />
            <rect x="86" y="104" width="7" height="7" />
            <rect x="102" y="118" width="7" height="7" />
            <rect x="226" y="122" width="6" height="6" />
            <rect x="266" y="110" width="7" height="7" />
            <rect x="284" y="126" width="7" height="7" />
          </g>
        </g>

        <g className="portrait-chair">
          <rect x="94" y="188" width="94" height="92" />
          <rect x="82" y="210" width="18" height="54" />
          <rect x="108" y="276" width="12" height="24" />
          <rect x="162" y="276" width="12" height="24" />
        </g>

        <g className="portrait-person">
          <rect className="portrait-ear" x="108" y="102" width="14" height="34" />
          <rect className="portrait-ear" x="206" y="102" width="14" height="34" />
          <rect className="portrait-face" x="120" y="76" width="88" height="90" />
          <rect className="portrait-face-shadow" x="120" y="136" width="88" height="30" />

          <rect className="portrait-hair" x="112" y="60" width="104" height="34" />
          <rect className="portrait-hair" x="104" y="76" width="24" height="52" />
          <rect className="portrait-hair" x="200" y="76" width="24" height="54" />
          <rect className="portrait-hair" x="120" y="68" width="24" height="18" />
          <rect className="portrait-hair" x="152" y="64" width="20" height="18" />
          <rect className="portrait-hair" x="182" y="68" width="26" height="18" />

          <rect className="portrait-brow" x="136" y="104" width="20" height="5" />
          <rect className="portrait-brow" x="174" y="104" width="20" height="5" />
          <rect className="portrait-eye" x="142" y="114" width="7" height="8" />
          <rect className="portrait-eye" x="180" y="114" width="7" height="8" />
          <rect className="portrait-nose" x="162" y="120" width="6" height="14" />
          <rect className="portrait-mouth" x="151" y="144" width="28" height="5" />

          <rect className="portrait-neck" x="146" y="158" width="38" height="28" />
          <rect className="portrait-hoodie" x="86" y="176" width="156" height="104" />
          <rect className="portrait-hoodie-dark" x="86" y="210" width="28" height="70" />
          <rect className="portrait-hoodie-dark" x="214" y="210" width="28" height="70" />
          <rect className="portrait-hood" x="132" y="176" width="64" height="30" />
          <rect className="portrait-shirt" x="150" y="190" width="28" height="76" />
          <rect className="portrait-string" x="140" y="194" width="5" height="34" />
          <rect className="portrait-string" x="186" y="194" width="5" height="34" />

          <rect className="portrait-hand" x="104" y="248" width="44" height="20" />
          <rect className="portrait-hand" x="190" y="248" width="44" height="20" />
        </g>

        <g className="portrait-desk">
          <rect x="28" y="274" width="280" height="14" />
          <rect x="42" y="288" width="12" height="40" />
          <rect x="282" y="288" width="12" height="40" />
        </g>

        <g className="portrait-laptop">
          <rect x="126" y="216" width="120" height="70" />
          <rect x="136" y="226" width="100" height="46" />
          <rect className="portrait-code" x="148" y="238" width="34" height="5" />
          <rect className="portrait-code" x="148" y="250" width="58" height="5" />
          <rect className="portrait-code" x="148" y="262" width="44" height="5" />
          <rect className="portrait-cursor" x="212" y="250" width="7" height="8" />
          <rect x="112" y="286" width="148" height="8" />
        </g>

        <g className="portrait-mug">
          <rect x="62" y="246" width="30" height="28" />
          <rect x="92" y="252" width="10" height="14" />
          <rect className="portrait-steam" x="68" y="226" width="5" height="12" />
          <rect className="portrait-steam" x="82" y="220" width="5" height="18" />
        </g>

        <g className="portrait-plant">
          <rect x="274" y="244" width="20" height="30" />
          <rect className="portrait-leaf" x="274" y="228" width="9" height="18" />
          <rect className="portrait-leaf" x="286" y="222" width="9" height="24" />
          <rect className="portrait-leaf" x="298" y="234" width="8" height="16" />
        </g>
      </svg>
    </div>
  );
}

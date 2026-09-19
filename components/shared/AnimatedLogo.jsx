import { useEffect, useRef, useState } from "react";

/**
 * Logo animé Tailrcv.
 * Séquence (boucle infinie, chaque étape jouée une seule fois par cycle) :
 * 1. Écriture du texte en wireframe (contour seul, non rempli)
 * 2. Chargement de la couleur (fade-in du remplissage + du fil/point teal)
 * 3. Pause (logo plein, coloré)
 * 4. Effacement de la couleur (fade-out du remplissage)
 * 5. Écriture inverse : le contour se "désécrit" dans le sens inverse du tracé
 * -> retour à l'étape 1
 */
export default function TailrcvLogo({
  darkColor = "#1A1A2E",
  accentColor = "#1D9E75",
  fontSize = 72,
  cycleDuration = 6, // secondes, durée totale d'un cycle complet
}) {
  const textRef = useRef(null);
  const [textLength, setTextLength] = useState(0);

  useEffect(() => {
    if (textRef.current) {
      // Longueur approximative du tracé, utilisée pour le dash-offset
      const len = textRef.current.getComputedTextLength();
      setTextLength(len);
    }
  }, [fontSize]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        padding: "2rem 0",
        "--len": textLength,
        "--cycle": `${cycleDuration}s`,
        "--dark": darkColor,
        "--accent": accentColor,
      }}
    >
      <style>{`
        @keyframes tailrcv-draw {
          0%   { stroke-dashoffset: var(--len); }
          32%  { stroke-dashoffset: 0; }
          78%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: var(--len); }
        }
        @keyframes tailrcv-stroke-opacity {
          0%   { stroke-opacity: 1; }
          30%  { stroke-opacity: 1; }
          42%  { stroke-opacity: 0; }
          68%  { stroke-opacity: 0; }
          80%  { stroke-opacity: 1; }
          100% { stroke-opacity: 1; }
        }
        @keyframes tailrcv-fill-opacity {
          0%   { opacity: 0; }
          32%  { opacity: 0; }
          46%  { opacity: 1; }
          64%  { opacity: 1; }
          78%  { opacity: 0; }
          100% { opacity: 0; }
        }
        @keyframes tailrcv-thread {
          0%   { opacity: 0; }
          34%  { opacity: 0; }
          46%  { opacity: 1; }
          64%  { opacity: 1; }
          76%  { opacity: 0; }
          100% { opacity: 0; }
        }
        .tailrcv-stroke-layer text {
          fill: none;
          stroke: var(--dark);
          stroke-width: 1.4;
          stroke-dasharray: var(--len);
          animation:
            tailrcv-draw var(--cycle) ease-in-out infinite,
            tailrcv-stroke-opacity var(--cycle) ease-in-out infinite;
        }
        .tailrcv-fill-layer {
          animation: tailrcv-fill-opacity var(--cycle) ease-in-out infinite;
        }
        .tailrcv-thread-layer {
          animation: tailrcv-thread var(--cycle) ease-in-out infinite;
        }
      `}</style>

      <svg
        viewBox="0 0 500 160"
        width="500"
        height="160"
        role="img"
        aria-label="Logo Tailrcv"
      >
        {/* Mesure de la longueur du texte (invisible, sert uniquement de référence) */}
        <text
          ref={textRef}
          x="250"
          y="95"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontSize={fontSize}
          fontWeight="600"
          letterSpacing="-1"
          style={{ visibility: "hidden" }}
        >
          tailrcv
        </text>

        {/* Couche 1 : wireframe (contour qui s'écrit / s'efface) */}
        <g className="tailrcv-stroke-layer">
          <text
            x="250"
            y="95"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={fontSize}
            fontWeight="600"
            letterSpacing="-1"
          >
            tailrcv
          </text>
        </g>

        {/* Couche 2 : remplissage coloré (fade in / fade out) */}
        <g className="tailrcv-fill-layer">
          <text
            x="250"
            y="95"
            textAnchor="middle"
            fontFamily="Arial, sans-serif"
            fontSize={fontSize}
            fontWeight="600"
            letterSpacing="-1"
          >
            <tspan fill="var(--dark)">tailr</tspan>
            <tspan fill="var(--accent)">cv</tspan>
          </text>
        </g>

        {/* Point + fil teal (apparaît avec la couleur) */}
        <g className="tailrcv-thread-layer">
          <circle cx="291" cy="42" r="5.5" fill="var(--accent)" />
          <path
            d="M 296 42 Q 320 32 341 42"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
        </g>
      </svg>
    </div>
  );
}

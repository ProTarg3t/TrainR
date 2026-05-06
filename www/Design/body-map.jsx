/* global React */
// BodyMap — abstracted heatmap body diagram
// Replaces the figure illustration. Two stylized humanoid silhouettes
// (front + back) composed of rounded muscle "regions" that take a
// heat level 0–4 driving their fill from neutral → signal yellow.

const HEAT = ['var(--heat-0)', 'var(--heat-1)', 'var(--heat-2)', 'var(--heat-3)', 'var(--heat-4)'];

// Region paths kept abstract — they read as muscle-zones, not anatomy.
// Coordinates are tuned for a 120×220 viewBox per silhouette.
function FrontBody({ heat = {}, size = 1 }) {
  const get = k => HEAT[heat[k] ?? 0];
  return (
    <svg viewBox="0 0 120 220" width={120 * size} height={220 * size} style={{ overflow: 'visible' }}>
      {/* outline */}
      <g fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1">
        <circle cx="60" cy="22" r="16" />
        <path d="M30 50 Q60 42 90 50 L96 110 Q92 150 88 200 L74 210 L70 165 L60 165 L50 165 L46 210 L32 200 Q28 150 24 110 Z" />
      </g>
      {/* muscles — front */}
      <g>
        {/* shoulders */}
        <path d="M28 50 Q22 56 26 72 L40 70 L42 56 Q36 50 28 50 Z" fill={get('shoulders')} />
        <path d="M92 50 Q98 56 94 72 L80 70 L78 56 Q84 50 92 50 Z" fill={get('shoulders')} />
        {/* chest */}
        <path d="M40 60 L58 60 L58 88 L42 92 Q38 80 40 60 Z" fill={get('chest')} />
        <path d="M80 60 L62 60 L62 88 L78 92 Q82 80 80 60 Z" fill={get('chest')} />
        {/* biceps */}
        <path d="M22 74 Q18 92 22 110 L32 108 L34 76 Z" fill={get('biceps')} />
        <path d="M98 74 Q102 92 98 110 L88 108 L86 76 Z" fill={get('biceps')} />
        {/* abs */}
        <path d="M48 92 L72 92 L70 108 L50 108 Z" fill={get('abs')} />
        <path d="M48 110 L72 110 L70 124 L50 124 Z" fill={get('abs')} />
        <path d="M48 126 L72 126 L68 142 L52 142 Z" fill={get('abs')} />
        {/* forearms */}
        <path d="M20 112 L32 110 L30 138 L20 140 Z" fill={get('forearms')} />
        <path d="M100 112 L88 110 L90 138 L100 140 Z" fill={get('forearms')} />
        {/* hip flexors */}
        <path d="M44 144 L58 144 L56 160 L44 158 Z" fill={get('hipflexors')} />
        <path d="M76 144 L62 144 L64 160 L76 158 Z" fill={get('hipflexors')} />
        {/* quads */}
        <path d="M36 165 L58 165 L56 200 L40 202 Z" fill={get('quads')} />
        <path d="M84 165 L62 165 L64 200 L80 202 Z" fill={get('quads')} />
      </g>
    </svg>
  );
}

function BackBody({ heat = {}, size = 1 }) {
  const get = k => HEAT[heat[k] ?? 0];
  return (
    <svg viewBox="0 0 120 220" width={120 * size} height={220 * size} style={{ overflow: 'visible' }}>
      <g fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1">
        <circle cx="60" cy="22" r="16" />
        <path d="M30 50 Q60 42 90 50 L96 110 Q92 150 88 200 L74 210 L70 165 L60 165 L50 165 L46 210 L32 200 Q28 150 24 110 Z" />
      </g>
      <g>
        {/* traps */}
        <path d="M44 44 L76 44 L72 60 L48 60 Z" fill={get('traps')} />
        {/* rear delts */}
        <path d="M28 50 Q22 56 26 72 L40 70 L42 56 Q36 50 28 50 Z" fill={get('shoulders')} />
        <path d="M92 50 Q98 56 94 72 L80 70 L78 56 Q84 50 92 50 Z" fill={get('shoulders')} />
        {/* upper back / lats */}
        <path d="M42 64 L58 64 L58 96 L40 96 Q38 80 42 64 Z" fill={get('back')} />
        <path d="M78 64 L62 64 L62 96 L80 96 Q82 80 78 64 Z" fill={get('back')} />
        {/* lower back */}
        <path d="M44 100 L76 100 L72 130 L48 130 Z" fill={get('lowback')} />
        {/* triceps */}
        <path d="M22 74 Q18 92 22 110 L32 108 L34 76 Z" fill={get('triceps')} />
        <path d="M98 74 Q102 92 98 110 L88 108 L86 76 Z" fill={get('triceps')} />
        {/* glutes */}
        <path d="M40 142 L58 142 L58 168 L42 168 Z" fill={get('glutes')} />
        <path d="M80 142 L62 142 L62 168 L78 168 Z" fill={get('glutes')} />
        {/* hamstrings */}
        <path d="M40 172 L58 172 L56 200 L42 202 Z" fill={get('hamstrings')} />
        <path d="M80 172 L62 172 L64 200 L78 202 Z" fill={get('hamstrings')} />
        {/* calves */}
        <path d="M22 112 L32 110 L30 138 L22 140 Z" fill={get('calves')} />
        <path d="M98 112 L88 110 L90 138 L98 140 Z" fill={get('calves')} />
      </g>
    </svg>
  );
}

function BodyMap({ heat = {}, size = 1, showLabels = true }) {
  return (
    <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        {showLabels && <div className="label-mono">VOOR</div>}
        <FrontBody heat={heat} size={size} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        {showLabels && <div className="label-mono">ACHTER</div>}
        <BackBody heat={heat} size={size} />
      </div>
    </div>
  );
}

Object.assign(window, { BodyMap, FrontBody, BackBody, HEAT });

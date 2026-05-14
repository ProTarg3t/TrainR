/* global React, BodyMap */
const { useState } = React;

// ─── EXERCISE DETAIL ─────────────────────────────────────────
function ExerciseDetail({ density = 'compact', onBack }) {
  return (
    <div className="ed" data-density={density}>
      <header className="ed-top">
        <button className="ico-btn" onClick={onBack} aria-label="Terug">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
        </button>
        <span className="label-mono">OEFENING DETAIL</span>
        <div style={{ width: 36 }} />
      </header>

      {/* placeholder illustration */}
      <div className="ed-illo">
        <div className="ed-illo-inner">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--signal)' }}>
            <circle cx="12" cy="6" r="2"/>
            <path d="M12 8v6M8 11l4 3 4-3M9 19l3-5 3 5M7 22l5-3 5 3"/>
          </svg>
          <div className="label-mono" style={{ marginTop: 10 }}>VIDEO PLACEHOLDER</div>
        </div>
      </div>

      <div className="ed-body">
        <span className="cat-tag cat-cardio">CARDIO</span>
        <h1 className="ed-name">BURPEES</h1>

        {/* meta row */}
        <div className="ed-meta">
          <div className="ed-m"><div className="ed-m-num numeric">40s</div><div className="label-mono">DUUR</div></div>
          <div className="ed-m"><div className="ed-m-num numeric">8.0</div><div className="label-mono">MET</div></div>
          <div className="ed-m"><div className="ed-m-num numeric">~6</div><div className="label-mono">KCAL</div></div>
        </div>

        {/* instruction */}
        <section className="ed-section">
          <div className="label-mono ed-h">UITVOERING</div>
          <ol className="ed-steps">
            <li>Start staand. Voeten op heupbreedte.</li>
            <li>Zak naar plank. Handen op de grond.</li>
            <li>Push-up. Borst raakt bijna de grond.</li>
            <li>Spring met benen omhoog richting handen.</li>
            <li>Spring rechtop. Armen boven hoofd.</li>
          </ol>
        </section>

        <section className="ed-section">
          <div className="label-mono ed-h">COACH-TIP</div>
          <p className="ed-tip">Vloeiende beweging. Land zacht — knieën licht gebogen — om de impact op te vangen.</p>
        </section>

        {/* heatmap */}
        <section className="ed-section">
          <div className="label-mono ed-h">SPIERGROEPEN</div>
          <div className="ed-body-map">
            <BodyMap heat={{ chest: 4, shoulders: 3, quads: 3, abs: 3, calves: 3, triceps: 2 }} size={0.6} showLabels={false} />
          </div>
          <div className="ed-muscle-list">
            <span className="m-pill primary">Borst</span>
            <span className="m-pill secondary">Schouders</span>
            <span className="m-pill secondary">Quads</span>
            <span className="m-pill secondary">Core</span>
            <span className="m-pill tertiary">Triceps</span>
            <span className="m-pill tertiary">Kuiten</span>
          </div>
        </section>
      </div>

      <style>{`
        .ed { position: relative; height: 100%; background: var(--bg-base); color: var(--fg-primary); overflow-y: auto; padding-bottom: 24px; }
        .ed[data-density="compact"]    { --pad: 16px; --gap: 18px; }
        .ed[data-density="cozy"]       { --pad: 20px; --gap: 22px; }
        .ed[data-density="comfortable"]{ --pad: 24px; --gap: 28px; }

        .ed-top { display: flex; justify-content: space-between; align-items: center; padding: 16px var(--pad) 12px; }
        .ico-btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; color: var(--fg-secondary); }

        .ed-illo { margin: 0 var(--pad); height: 200px; border-radius: var(--radius-lg); background: linear-gradient(180deg, var(--bg-elev-2), var(--bg-elev-1)); border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; }
        .ed-illo-inner { display: flex; flex-direction: column; align-items: center; }

        .ed-body { padding: var(--gap) var(--pad) 0; display: flex; flex-direction: column; gap: 14px; }
        .ed-name { font-size: 36px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; margin: 4px 0 0; }
        .cat-tag { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.10em; padding: 4px 8px; border-radius: 4px; font-weight: 500; align-self: flex-start; }
        .cat-cardio { background: rgba(105,166,255,0.10); color: var(--status-rest); }

        .ed-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
        .ed-m { padding: 12px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 4px; }
        .ed-m-num { font-size: 22px; font-weight: 600; letter-spacing: -0.02em; line-height: 1; }

        .ed-section { display: flex; flex-direction: column; gap: 10px; margin-top: 6px; }
        .ed-h { color: var(--signal); }

        .ed-steps { padding-left: 0; list-style: none; counter-reset: step; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .ed-steps li { counter-increment: step; padding-left: 36px; position: relative; font-size: 15px; line-height: 1.5; color: var(--fg-primary); }
        .ed-steps li::before {
          content: counter(step, decimal-leading-zero);
          position: absolute; left: 0; top: 0;
          font-family: var(--font-mono); font-size: 12px; font-weight: 600;
          color: var(--signal); letter-spacing: 0.06em;
          width: 28px; text-align: right;
        }

        .ed-tip { font-size: 15px; line-height: 1.5; color: var(--fg-primary); margin: 0; padding: 14px 16px; background: var(--bg-elev-1); border-left: 2px solid var(--signal); border-radius: 0 var(--radius-md) var(--radius-md) 0; }

        .ed-body-map { display: flex; justify-content: center; padding: 8px 0; }
        .ed-muscle-list { display: flex; flex-wrap: wrap; gap: 6px; }
        .m-pill { padding: 6px 12px; border-radius: 999px; font-size: 13px; font-weight: 500; }
        .m-pill.primary { background: var(--signal); color: var(--signal-fg); }
        .m-pill.secondary { background: var(--signal-08); color: var(--signal); border: 1px solid rgba(232,254,60,0.3); }
        .m-pill.tertiary { background: var(--bg-elev-2); color: var(--fg-secondary); border: 1px solid var(--border-subtle); }
      `}</style>
    </div>
  );
}

Object.assign(window, { ExerciseDetail });

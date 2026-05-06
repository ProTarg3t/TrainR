/* global React, BodyMap */
const { useState } = React;

// ─── FINISH / SUMMARY ────────────────────────────────────────
function FinishScreen({ density = 'compact', onClose }) {
  const [rpe, setRpe] = useState(7);

  const session = {
    routine: 'CARDIO BURN',
    duration_s: 4 * 60 + 35,
    calories: 142,
    exercises_done: 6,
    exercises_total: 6,
    skipped: 0,
    streak_after: 8,
    heat: { quads: 4, calves: 4, hamstrings: 3, glutes: 3, chest: 2, shoulders: 2, abs: 3 },
  };

  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="fin" data-density={density}>
      <header className="fin-top">
        <button className="fin-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </header>

      <div className="fin-hero">
        <div className="eyebrow" style={{ color: 'var(--signal)', marginBottom: 12 }}>SESSIE VOLTOOID</div>
        <h1 className="fin-h1">{session.routine}</h1>
        <div className="fin-streak">
          <span className="streak-flame">●</span>
          <span className="numeric">DAG {session.streak_after}</span>
          <span style={{ color: 'var(--fg-tertiary)', marginLeft: 8 }}>· streak verlengd</span>
        </div>
      </div>

      <div className="fin-kpis">
        <div className="fin-kpi">
          <div className="fin-kpi-num numeric">{fmt(session.duration_s)}</div>
          <div className="label-mono">DUUR</div>
        </div>
        <div className="fin-kpi primary">
          <div className="fin-kpi-num numeric">{session.calories}</div>
          <div className="label-mono">CALORIEËN</div>
        </div>
        <div className="fin-kpi">
          <div className="fin-kpi-num numeric">{session.exercises_done}<span className="fin-kpi-sub">/{session.exercises_total}</span></div>
          <div className="label-mono">VOLTOOID</div>
        </div>
      </div>

      {/* heatmap section — alleen achteraf */}
      <section className="fin-section">
        <div className="row-head">
          <span className="label-mono">SPIERGROEPEN GETARGET</span>
          <span className="label-mono" style={{ color: 'var(--fg-tertiary)' }}>INTENSITEIT 0–4</span>
        </div>
        <div className="fin-body">
          <BodyMap heat={session.heat} size={0.8} showLabels={true} />
        </div>
        <div className="fin-heat-legend">
          {[
            { i: 0, l: 'NIET' },
            { i: 1, l: 'LICHT' },
            { i: 2, l: 'MEDIUM' },
            { i: 3, l: 'HOOG' },
            { i: 4, l: 'MAX' },
          ].map(s => (
            <div key={s.i} className="legend-step">
              <div className="legend-chip" style={{ background: `var(--heat-${s.i})` }} />
              <span className="legend-label">{s.l}</span>
            </div>
          ))}
        </div>
      </section>

      {/* RPE slider */}
      <section className="fin-section">
        <div className="row-head">
          <span className="label-mono">HOE VOELDE HET?</span>
          <span className="label-mono" style={{ color: 'var(--signal)' }}>{rpe} / 10</span>
        </div>
        <div className="rpe-card">
          <div className="rpe-labels">
            <span style={{ color: 'var(--status-go)' }}>EASY</span>
            <span style={{ color: 'var(--signal)' }}>STERK</span>
            <span style={{ color: 'var(--status-crit)' }}>MAX</span>
          </div>
          <div className="rpe-track">
            <div className="rpe-fill" style={{ width: `${(rpe / 10) * 100}%` }} />
            <input
              type="range" min="1" max="10" value={rpe}
              onChange={e => setRpe(parseInt(e.target.value))}
              className="rpe-slider"
            />
            <div className="rpe-thumb" style={{ left: `${((rpe - 1) / 9) * 100}%` }} />
          </div>
          <div className="rpe-scale">
            {[1,2,3,4,5,6,7,8,9,10].map(n => (
              <div key={n} className={`rpe-tick ${n <= rpe ? 'on' : ''}`} />
            ))}
          </div>
          <div className="rpe-desc">
            {rpe <= 3 ? 'Lichte inspanning. Kun je nog 30+ minuten doorgaan.' :
             rpe <= 6 ? 'Stevige inspanning. Praten gaat moeilijker.' :
             rpe <= 8 ? 'Hard. Je voelt de spieren nu echt werken.' :
             'Maximaal. Niets meer over in de tank.'}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="fin-cta">
        <button className="cta-secondary">DETAILS</button>
        <button className="cta-primary" onClick={onClose}>KLAAR →</button>
      </div>

      <style>{`
        .fin { position: relative; height: 100%; background: var(--bg-base); color: var(--fg-primary); overflow-y: auto; padding-bottom: 16px; }
        .fin[data-density="compact"]    { --pad: 16px; --gap: 16px; }
        .fin[data-density="cozy"]       { --pad: 20px; --gap: 22px; }
        .fin[data-density="comfortable"]{ --pad: 24px; --gap: 28px; }

        .fin-top { padding: 12px var(--pad); display: flex; justify-content: flex-end; }
        .fin-close { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; color: var(--fg-secondary); }

        .fin-hero { padding: 8px var(--pad) 0; }
        .fin-h1 { font-size: 36px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; margin: 0 0 12px; }
        .fin-streak { display: flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.14em; color: var(--fg-primary); }
        .streak-flame { color: var(--signal); font-size: 14px; }

        .fin-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding: var(--gap) var(--pad) 0; }
        .fin-kpi { padding: 16px 12px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
        .fin-kpi.primary { background: var(--signal-08); border-color: var(--signal); }
        .fin-kpi.primary .fin-kpi-num { color: var(--signal); }
        .fin-kpi-num { font-size: 26px; font-weight: 600; letter-spacing: -0.03em; line-height: 1; }
        .fin-kpi-sub { font-size: 14px; color: var(--fg-tertiary); }

        .fin-section { padding: var(--gap) 0 0; }
        .row-head { display: flex; justify-content: space-between; padding: 0 var(--pad) 12px; }

        .fin-body { padding: 8px var(--pad) 12px; display: flex; justify-content: center; }
        .fin-heat-legend { display: flex; gap: 14px; padding: 8px var(--pad) 0; justify-content: center; flex-wrap: wrap; }
        .legend-step { display: flex; align-items: center; gap: 6px; }
        .legend-chip { width: 22px; height: 8px; border-radius: 2px; }
        .legend-label { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.10em; color: var(--fg-secondary); font-weight: 500; }

        .rpe-card { margin: 0 var(--pad); padding: 16px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); }
        .rpe-labels { display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.10em; margin-bottom: 14px; font-weight: 500; }
        .rpe-track { position: relative; height: 4px; background: var(--bg-elev-3); border-radius: 2px; margin: 8px 0; }
        .rpe-fill { position: absolute; left: 0; top: 0; height: 100%; background: linear-gradient(90deg, var(--status-go), var(--signal), var(--status-crit)); border-radius: 2px; }
        .rpe-slider { position: absolute; inset: -10px 0; width: 100%; opacity: 0; cursor: pointer; -webkit-appearance: none; }
        .rpe-thumb { position: absolute; top: -8px; width: 20px; height: 20px; border-radius: 50%; background: #fff; transform: translateX(-10px); box-shadow: 0 0 0 3px var(--bg-base); pointer-events: none; }
        .rpe-scale { display: flex; justify-content: space-between; margin-top: 12px; }
        .rpe-tick { width: 2px; height: 8px; background: var(--border-default); border-radius: 1px; }
        .rpe-tick.on { background: var(--signal); }
        .rpe-desc { font-size: 14px; color: var(--fg-primary); margin-top: 14px; line-height: 1.5; }

        .fin-cta { display: grid; grid-template-columns: 1fr 1.5fr; gap: 8px; padding: var(--gap) var(--pad) 24px; }
        .cta-primary { padding: 16px 0; background: var(--signal); color: var(--signal-fg); border: none; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.16em; font-weight: 600; }
        .cta-secondary { padding: 16px 0; background: var(--bg-elev-1); color: var(--fg-primary); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.14em; }
      `}</style>
    </div>
  );
}

Object.assign(window, { FinishScreen });

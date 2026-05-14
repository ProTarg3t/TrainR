/* global React, BodyMap */
const { useState } = React;

// ─── ROUTINE DETAIL ──────────────────────────────────────────
const DETAIL_EXERCISES = [
  { name: 'BURPEES',          secs: 40, rest: 10 },
  { name: 'JUMPING JACKS',    secs: 45, rest: 10 },
  { name: 'HIGH KNEES',       secs: 40, rest: 10 },
  { name: 'BUTT KICKS',       secs: 40, rest: 10 },
  { name: 'MOUNTAIN CLIMBERS',secs: 40, rest: 10 },
  { name: 'JUMP SQUATS',      secs: 40, rest: 0  },
];

function RoutineDetail({ density = 'compact', onStart, onBack }) {
  const total = DETAIL_EXERCISES.reduce((s, e) => s + e.secs + e.rest, 0);
  const fmt = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  return (
    <div className="rd" data-density={density}>
      <header className="rd-top">
        <button className="ico-btn" onClick={onBack} aria-label="Terug">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
        </button>
        <button className="ico-btn" aria-label="Bewerken">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
        </button>
      </header>

      <section className="rd-hero">
        <span className="cat-tag cat-cardio">CARDIO</span>
        <h1 className="rd-name">CARDIO BURN</h1>
        <p className="rd-desc">Snelle high-intensity sessie. 6 oefeningen, geen materiaal nodig.</p>
      </section>

      {/* KPIs */}
      <section className="rd-kpis">
        <div className="rd-kpi">
          <div className="rd-kpi-num numeric">{fmt(total)}</div>
          <div className="label-mono">DUUR</div>
        </div>
        <div className="rd-kpi">
          <div className="rd-kpi-num numeric">{DETAIL_EXERCISES.length}</div>
          <div className="label-mono">OEFENINGEN</div>
        </div>
        <div className="rd-kpi">
          <div className="rd-kpi-num numeric">~140</div>
          <div className="label-mono">CAL EST.</div>
        </div>
      </section>

      {/* heatmap preview — alleen voor uitvoer, niet tijdens */}
      <section className="rd-section">
        <div className="row-head">
          <span className="label-mono">PRIMAIRE SPIEREN</span>
        </div>
        <div className="rd-body">
          <BodyMap heat={{ quads: 4, calves: 4, hamstrings: 3, glutes: 3, abs: 3, shoulders: 2, chest: 2 }} size={0.6} showLabels={false} />
        </div>
      </section>

      {/* exercises list */}
      <section className="rd-section">
        <div className="row-head">
          <span className="label-mono">PROGRAMMA</span>
          <span className="label-mono" style={{ color: 'var(--fg-tertiary)' }}>{DETAIL_EXERCISES.length} OEFENINGEN</span>
        </div>
        <div className="rd-list">
          {DETAIL_EXERCISES.map((e, i) => (
            <div key={i} className="rd-row">
              <span className="rd-idx numeric">{String(i + 1).padStart(2, '0')}</span>
              <div style={{ flex: 1 }}>
                <div className="rd-row-name">{e.name}</div>
                {e.rest > 0 && <div className="rd-row-rest">+ {e.rest}s rust</div>}
              </div>
              <span className="rd-row-time numeric">{e.secs}s</span>
            </div>
          ))}
        </div>
      </section>

      {/* Start CTA — pinned */}
      <div className="rd-cta-pin">
        <button className="cta-primary big" onClick={onStart}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5l12 7-12 7V5z"/></svg>
          EXECUTE PROTOCOL
        </button>
      </div>

      <style>{`
        .rd { position: relative; height: 100%; background: var(--bg-base); color: var(--fg-primary); overflow-y: auto; padding-bottom: 96px; }
        .rd[data-density="compact"]    { --pad: 16px; --gap: 18px; }
        .rd[data-density="cozy"]       { --pad: 20px; --gap: 22px; }
        .rd[data-density="comfortable"]{ --pad: 24px; --gap: 28px; }

        .rd-top { display: flex; justify-content: space-between; padding: 16px var(--pad) 0; }
        .ico-btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; color: var(--fg-secondary); }

        .rd-hero { padding: 12px var(--pad) 0; display: flex; flex-direction: column; gap: 10px; align-items: flex-start; }
        .rd-name { font-size: 36px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; margin: 0; }
        .rd-desc { font-size: 15px; color: var(--fg-secondary); line-height: 1.5; margin: 0; }
        .cat-tag { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.10em; padding: 4px 8px; border-radius: 4px; font-weight: 500; }
        .cat-cardio { background: rgba(105,166,255,0.10); color: var(--status-rest); }

        .rd-kpis { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding: var(--gap) var(--pad) 0; }
        .rd-kpi { padding: 14px 12px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
        .rd-kpi-num { font-size: 24px; font-weight: 600; letter-spacing: -0.03em; line-height: 1; }

        .rd-section { padding: var(--gap) 0 0; }
        .row-head { display: flex; justify-content: space-between; padding: 0 var(--pad) 12px; }

        .rd-body { display: flex; justify-content: center; padding: 4px 0; }

        .rd-list { padding: 0 var(--pad); display: flex; flex-direction: column; gap: 4px; }
        .rd-row {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 14px;
          background: var(--bg-elev-1);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .rd-idx { font-size: 12px; color: var(--fg-tertiary); width: 24px; }
        .rd-row-name { font-size: 15px; font-weight: 500; letter-spacing: 0.01em; }
        .rd-row-rest { font-size: 12px; color: var(--fg-tertiary); margin-top: 2px; }
        .rd-row-time { font-size: 14px; color: var(--signal); font-weight: 500; }

        .rd-cta-pin { position: absolute; bottom: 0; left: 0; right: 0; padding: 12px var(--pad) 16px; background: linear-gradient(180deg, transparent, var(--bg-base) 30%); }
        .cta-primary.big {
          width: 100%; padding: 18px 0;
          background: var(--signal); color: var(--signal-fg);
          border: none; border-radius: var(--radius-md);
          font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.14em; font-weight: 700;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { RoutineDetail });

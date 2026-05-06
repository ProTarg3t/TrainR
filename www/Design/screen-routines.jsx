/* global React */
const { useState } = React;

// ─── ROUTINES LIST (tab 2) ───────────────────────────────────
const ALL_ROUTINES = [
  { id: 'core',    name: 'Core Protocol',    cat: 'CORE',   ex: 10, dur: '12:30', last: '2 dagen geleden' },
  { id: 'cardio',  name: 'Cardio Burn',      cat: 'CARDIO', ex: 6,  dur: '04:35', last: 'Gisteren' },
  { id: 'push',    name: 'Push Day',         cat: 'PUSH',   ex: 8,  dur: '28:00', last: '5 dagen geleden' },
  { id: 'pull',    name: 'Pull & Back',      cat: 'PULL',   ex: 7,  dur: '24:00', last: '1 week geleden' },
  { id: 'legs',    name: 'Leg Crusher',      cat: 'LEGS',   ex: 9,  dur: '32:00', last: 'Nooit gedaan' },
  { id: 'mob',     name: 'Mobility Reset',   cat: 'CORE',   ex: 12, dur: '15:00', last: '3 dagen geleden' },
  { id: 'hiit',    name: 'HIIT Express',     cat: 'CARDIO', ex: 5,  dur: '08:00', last: '4 dagen geleden' },
  { id: 'full',    name: 'Full Body Power',  cat: 'FULL',   ex: 11, dur: '40:00', last: 'Nooit gedaan' },
];

const CATS = ['ALLE', 'CORE', 'CARDIO', 'PUSH', 'PULL', 'LEGS', 'FULL'];

function RoutinesList({ density = 'compact', onOpen }) {
  const [active, setActive] = useState('ALLE');
  const filtered = active === 'ALLE' ? ALL_ROUTINES : ALL_ROUTINES.filter(r => r.cat === active);

  return (
    <div className="rl" data-density={density}>
      <header className="rl-head">
        <div>
          <div className="eyebrow">PROTOCOLLEN</div>
          <h1 className="rl-title">ROUTINES</h1>
        </div>
        <button className="rl-add" aria-label="Nieuwe routine">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </header>

      {/* category filter */}
      <div className="rl-filter">
        {CATS.map(c => (
          <button
            key={c}
            className={`fchip ${active === c ? 'on' : ''}`}
            onClick={() => setActive(c)}
          >{c}</button>
        ))}
      </div>

      <div className="rl-meta">
        <span className="label-mono">{filtered.length} {filtered.length === 1 ? 'ROUTINE' : 'ROUTINES'}</span>
        <span className="label-mono" style={{ color: 'var(--fg-tertiary)' }}>↓ RECENT</span>
      </div>

      {/* list */}
      <div className="rl-list">
        {filtered.map(r => (
          <button key={r.id} className="rl-card" onClick={() => onOpen?.(r)}>
            <div className="rl-row1">
              <span className={`cat-tag cat-${r.cat.toLowerCase()}`}>{r.cat}</span>
              <span className="rl-meta-r numeric">{r.ex} OEF · {r.dur}</span>
            </div>
            <div className="rl-name">{r.name}</div>
            <div className="rl-row2">
              <span className="rl-last">{r.last}</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--fg-secondary)' }}><path d="M9 6l6 6-6 6"/></svg>
            </div>
          </button>
        ))}
      </div>

      {/* nav */}
      <nav className="nav">
        {['HOME','ROUTINES','STATS','PROFILE'].map((l, i) => (
          <button key={l} className={`nav-item ${i === 1 ? 'on' : ''}`}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', fontWeight: 500 }}>{l}</span>
          </button>
        ))}
      </nav>

      <style>{`
        .rl { position: relative; height: 100%; background: var(--bg-base); color: var(--fg-primary); overflow-y: auto; padding-bottom: calc(var(--tab-h) + 24px); }
        .rl[data-density="compact"]    { --pad: 16px; --gap: 14px; }
        .rl[data-density="cozy"]       { --pad: 20px; --gap: 18px; }
        .rl[data-density="comfortable"]{ --pad: 24px; --gap: 24px; }

        .rl-head { display: flex; justify-content: space-between; align-items: flex-end; padding: 28px var(--pad) 16px; }
        .rl-title { font-size: 36px; font-weight: 700; letter-spacing: -0.04em; line-height: 1; margin: 6px 0 0; }
        .rl-add { width: 44px; height: 44px; border-radius: 50%; background: var(--signal); color: var(--signal-fg); display: flex; align-items: center; justify-content: center; }

        .rl-filter { display: flex; gap: 6px; padding: 0 var(--pad) 12px; overflow-x: auto; }
        .rl-filter::-webkit-scrollbar { display: none; }
        .fchip {
          flex-shrink: 0;
          padding: 8px 14px; border-radius: 999px;
          border: 1px solid var(--border-default);
          background: transparent;
          font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.10em; font-weight: 600;
          color: var(--fg-secondary);
        }
        .fchip.on { background: var(--signal); color: var(--signal-fg); border-color: var(--signal); }

        .rl-meta { display: flex; justify-content: space-between; padding: 6px var(--pad) 10px; }

        .rl-list { display: flex; flex-direction: column; gap: 8px; padding: 0 var(--pad); }
        .rl-card {
          display: flex; flex-direction: column; gap: 6px;
          padding: 14px 16px; text-align: left;
          background: var(--bg-elev-1); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
        }
        .rl-row1 { display: flex; align-items: center; gap: 10px; }
        .rl-meta-r { font-size: 12px; color: var(--fg-secondary); letter-spacing: 0.04em; font-weight: 500; }
        .rl-name { font-size: 18px; font-weight: 600; letter-spacing: -0.01em; }
        .rl-row2 { display: flex; justify-content: space-between; align-items: center; margin-top: 2px; }
        .rl-last { font-size: 13px; color: var(--fg-tertiary); }
        .cat-tag { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.10em; padding: 4px 8px; border-radius: 4px; background: var(--bg-elev-3); color: var(--fg-secondary); font-weight: 500; }
        .cat-core { background: rgba(232,254,60,0.10); color: var(--signal); }
        .cat-cardio { background: rgba(105,166,255,0.10); color: var(--status-rest); }
        .cat-push { background: rgba(255,180,84,0.10); color: var(--status-warn); }
        .cat-pull { background: rgba(107,232,155,0.10); color: var(--status-go); }
        .cat-legs { background: rgba(255,90,90,0.10); color: var(--status-crit); }
        .cat-full { background: rgba(255,255,255,0.06); color: var(--fg-primary); }

        .nav { position: absolute; bottom: 0; left: 0; right: 0; height: var(--tab-h); display: grid; grid-template-columns: repeat(4, 1fr); background: rgba(10,10,11,0.85); backdrop-filter: blur(12px); border-top: 1px solid var(--border-subtle); }
        .nav-item { display: flex; align-items: center; justify-content: center; color: var(--fg-secondary); }
        .nav-item.on { color: var(--signal); }
      `}</style>
    </div>
  );
}

Object.assign(window, { RoutinesList });

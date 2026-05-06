/* global React */
const { useState, useEffect, useRef } = React;

// ─── ICONS (line, 1.5 stroke) ────────────────────────────────
const Icon = {
  home: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2v-9z"/></svg>
  ),
  list: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
  ),
  stats: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18M6 17V9M11 17V5M16 17v-6M21 17v-9"/></svg>
  ),
  user: (s = 22) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>
  ),
  play: (s = 18, fill = false) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><path d="M7 5l12 7-12 7V5z"/></svg>
  ),
  arrow: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
  ),
  flame: (s = 16) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 4-3 6-3 10a3 3 0 0 0 6 0c0-1 .5-2 1-2 .8 2 2 3 2 6a6 6 0 0 1-12 0c0-5 5-7 6-14z"/></svg>
  ),
};

// ─── HOME SCREEN ────────────────────────────────────────────
function HomeScreen({ onStart, density = 'cozy' }) {
  const [tab, setTab] = useState('home');
  const today = new Date();
  const dayNames = ['Zo','Ma','Di','Wo','Do','Vr','Za'];
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return { name: dayNames[d.getDay()], date: d.getDate(), today: i === 6, completed: [1,3,5].includes(i) };
  });

  const routines = [
    { id: 'core', name: 'Core Protocol',  cat: 'CORE',   ex: 10, dur: '12:30', heat: { abs: 4, lowback: 3, hipflexors: 3, glutes: 2 } },
    { id: 'cardio', name: 'Cardio Burn',    cat: 'CARDIO', ex: 6,  dur: '04:35', heat: { quads: 4, calves: 4, hamstrings: 3, glutes: 3, chest: 2, shoulders: 2 } },
    { id: 'push',   name: 'Push Day',       cat: 'PUSH',   ex: 8,  dur: '28:00', heat: { chest: 4, shoulders: 4, triceps: 3 } },
  ];

  return (
    <div className="screen" data-density={density}>
      {/* hero */}
      <header className="hero">
        <div className="eyebrow" style={{ marginBottom: 8 }}>21:14 · DI 05.05.26</div>
        <h1 className="hero-title">PROTOCOL<br/><span className="hero-accent">READY</span></h1>
        <div className="hero-sub">Goedenavond. 2 sessies deze week.</div>
      </header>

      {/* week strip */}
      <section className="week">
        <div className="row-head">
          <span className="label-mono">DEZE WEEK</span>
          <span className="label-mono" style={{ color: 'var(--signal)' }}>3 / 7</span>
        </div>
        <div className="week-grid">
          {week.map((d, i) => (
            <div key={i} className={`week-cell ${d.today ? 'today' : ''} ${d.completed ? 'done' : ''}`}>
              <div className="week-day">{d.name}</div>
              <div className="week-date numeric">{String(d.date).padStart(2,'0')}</div>
              {d.completed && <div className="week-dot" />}
            </div>
          ))}
        </div>
      </section>

      {/* streak */}
      <section className="streak-card">
        <div>
          <div className="label-mono">ACTIEVE STREAK</div>
          <div className="streak-num numeric">07<span className="streak-unit">d</span></div>
        </div>
        <div className="streak-meta">
          <div className="streak-row"><span className="label-mono">RECORD</span><span className="numeric">14d</span></div>
          <div className="streak-row"><span className="label-mono">VOLUME</span><span className="numeric">2:14h</span></div>
          <div className="streak-row"><span className="label-mono">SESSIES</span><span className="numeric">12</span></div>
        </div>
      </section>

      {/* quick start */}
      <section className="quick">
        <div className="row-head">
          <span className="label-mono">SNEL STARTEN</span>
          <span className="label-mono" style={{ color: 'var(--fg-tertiary)' }}>3 ROUTINES</span>
        </div>
        <div className="quick-list">
          {routines.map(r => (
            <button key={r.id} className="quick-card" onClick={() => onStart(r)}>
              <div className="quick-cat">
                <span className={`cat-tag cat-${r.cat.toLowerCase()}`}>{r.cat}</span>
                <span className="quick-meta numeric">{r.ex} OEF · {r.dur}</span>
              </div>
              <div className="quick-name">{r.name}</div>
              <div className="quick-cta">
                <span>EXECUTE</span>
                {Icon.play(14, true)}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* nav */}
      <nav className="nav">
        {[
          { id: 'home', l: 'HOME', i: Icon.home },
          { id: 'rout', l: 'ROUTINES', i: Icon.list },
          { id: 'stat', l: 'STATS', i: Icon.stats },
          { id: 'me',   l: 'PROFILE', i: Icon.user },
        ].map(n => (
          <button key={n.id} className={`nav-item ${tab === n.id ? 'on' : ''}`} onClick={() => setTab(n.id)}>
            {n.i(20)}
            <span>{n.l}</span>
          </button>
        ))}
      </nav>

      <style>{`
        .screen {
          position: relative;
          height: 100%;
          background: var(--bg-base);
          color: var(--fg-primary);
          overflow-y: auto;
          padding-bottom: calc(var(--tab-h) + 24px);
        }
        .screen[data-density="compact"] { --pad: 16px; --gap: 14px; }
        .screen[data-density="cozy"]    { --pad: 20px; --gap: 20px; }
        .screen[data-density="comfortable"] { --pad: 24px; --gap: 28px; }

        .hero { padding: 28px var(--pad) 12px; }
        .hero-title {
          font-family: var(--font-sans);
          font-size: 44px;
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.04em;
          margin: 0 0 12px;
          text-transform: none;
        }
        .hero-accent { color: var(--signal); }
        .hero-sub { color: var(--fg-secondary); font-size: 14px; }

        .row-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 var(--pad) 10px;
        }

        /* week strip */
        .week { padding-top: var(--gap); }
        .week-grid {
          display: grid; grid-template-columns: repeat(7, 1fr);
          gap: 6px; padding: 0 var(--pad);
        }
        .week-cell {
          aspect-ratio: 1 / 1.15;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          display: flex; flex-direction: column; align-items: center; justify-content: space-between;
          padding: 8px 4px;
          position: relative;
        }
        .week-day { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; color: var(--fg-secondary); text-transform: uppercase; font-weight: 500; }
        .week-date { font-size: 16px; font-weight: 500; color: var(--fg-secondary); }
        .week-cell.today { border-color: var(--signal); }
        .week-cell.today .week-date { color: var(--signal); }
        .week-cell.done { background: var(--bg-elev-1); }
        .week-cell.done .week-date { color: var(--fg-primary); }
        .week-dot {
          position: absolute; bottom: 6px;
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--signal);
        }

        /* streak */
        .streak-card {
          margin: var(--gap) var(--pad) 0;
          padding: var(--pad);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex; justify-content: space-between; align-items: stretch;
          gap: 24px;
        }
        .streak-num {
          font-size: 64px; font-weight: 600; line-height: 1;
          color: var(--fg-primary); margin-top: 6px;
          letter-spacing: -0.04em;
        }
        .streak-unit { color: var(--fg-tertiary); font-size: 28px; margin-left: 4px; }
        .streak-meta { display: flex; flex-direction: column; gap: 6px; min-width: 140px; justify-content: center; }
        .streak-row { display: flex; justify-content: space-between; align-items: center; gap: 16px; font-size: 13px; color: var(--fg-secondary); }
        .streak-row .numeric { color: var(--fg-primary); font-size: 14px; }

        /* quick start */
        .quick { margin-top: var(--gap); }
        .quick-list { display: flex; flex-direction: column; gap: 10px; padding: 0 var(--pad); }
        .quick-card {
          text-align: left;
          background: var(--bg-elev-1);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 16px;
          display: grid;
          grid-template-columns: 1fr auto;
          grid-template-rows: auto auto;
          gap: 6px 16px;
          align-items: center;
          transition: border-color var(--dur-fast) var(--ease-out), background var(--dur-fast);
        }
        .quick-card:hover { border-color: var(--border-strong); background: var(--bg-elev-2); }
        .quick-cat { grid-column: 1; display: flex; align-items: center; gap: 10px; }
        .cat-tag {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.10em;
          padding: 4px 8px;
          border-radius: var(--radius-xs);
          background: var(--bg-elev-3);
          color: var(--fg-secondary);
          font-weight: 500;
        }
        .cat-core { background: rgba(232,254,60,0.10); color: var(--signal); }
        .cat-cardio { background: rgba(105,166,255,0.10); color: var(--status-rest); }
        .cat-push { background: rgba(255,180,84,0.10); color: var(--status-warn); }
        .quick-meta { font-size: 12px; color: var(--fg-secondary); letter-spacing: 0.04em; font-weight: 500; }
        .quick-name { grid-column: 1; font-size: 18px; font-weight: 600; letter-spacing: -0.01em; }
        .quick-cta {
          grid-column: 2; grid-row: 1 / span 2;
          display: flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.10em; font-weight: 500;
          color: var(--signal);
          background: var(--signal-08);
          border: 1px solid var(--signal);
          border-radius: var(--radius-pill);
          padding: 10px 14px;
          align-self: center;
        }

        /* bottom nav */
        .nav {
          position: absolute; bottom: 0; left: 0; right: 0;
          height: var(--tab-h);
          display: grid; grid-template-columns: repeat(4, 1fr);
          background: rgba(10,10,11,0.85);
          backdrop-filter: blur(12px);
          border-top: 1px solid var(--border-subtle);
        }
        .nav-item {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 4px;
          color: var(--fg-secondary);
          font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.10em; font-weight: 500;
        }
        .nav-item.on { color: var(--signal); }
      `}</style>
    </div>
  );
}

Object.assign(window, { HomeScreen });

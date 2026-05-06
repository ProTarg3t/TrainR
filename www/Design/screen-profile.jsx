/* global React */
const { useState } = React;

// ─── PROFILE ─────────────────────────────────────────────────
function ProfileScreen({ density = 'compact' }) {
  const [d] = useState({
    name: 'JESHUA', age: 28, sex: 'm', units: 'metric',
    height: 178, weight: 76, target_weight: 72, start_weight: 80,
    goal: 'lose', level: 'inter',
    streak: 7, total_sessions: 42, total_calories: 8420,
  });

  const bmi = d.weight / Math.pow(d.height / 100, 2);
  const bmiCat = bmi < 18.5 ? 'ONDERGEWICHT' : bmi < 25 ? 'GEZOND' : bmi < 30 ? 'OVERGEWICHT' : 'OBESITAS';
  const bmiColor = bmi < 18.5 || bmi >= 30 ? 'var(--status-warn)' : bmi < 25 ? 'var(--signal)' : 'var(--status-warn)';

  const totalLost = d.start_weight - d.weight;
  const totalToLose = d.start_weight - d.target_weight;
  const goalProgress = Math.max(0, Math.min(1, totalLost / totalToLose));

  return (
    <div className="prof" data-density={density}>
      <header className="prof-head">
        <div>
          <div className="eyebrow">PROFIEL</div>
          <h1 className="prof-name">{d.name}</h1>
        </div>
        <button className="prof-edit">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
          BEWERK
        </button>
      </header>

      {/* lifetime stats */}
      <section className="prof-section">
        <div className="lifetime-grid">
          <div className="lt"><div className="lt-num numeric">{d.streak}</div><div className="label-mono">DAG STREAK</div></div>
          <div className="lt"><div className="lt-num numeric">{d.total_sessions}</div><div className="label-mono">SESSIES</div></div>
          <div className="lt"><div className="lt-num numeric">{(d.total_calories/1000).toFixed(1)}<span className="lt-suffix">k</span></div><div className="label-mono">CAL TOTAAL</div></div>
        </div>
      </section>

      {/* BMI */}
      <section className="prof-section">
        <div className="row-head"><span className="label-mono">BMI</span><span className="label-mono" style={{ color: bmiColor }}>{bmiCat}</span></div>
        <div className="bmi-card">
          <div className="bmi-num numeric">{bmi.toFixed(1)}</div>
          <div className="bmi-track">
            <div className="bmi-segs">
              <div className="bmi-seg" style={{ background: 'var(--status-rest)', flex: 18.5 }}></div>
              <div className="bmi-seg" style={{ background: 'var(--signal)', flex: 6.5 }}></div>
              <div className="bmi-seg" style={{ background: 'var(--status-warn)', flex: 5 }}></div>
              <div className="bmi-seg" style={{ background: 'var(--status-crit)', flex: 10 }}></div>
            </div>
            <div className="bmi-marker" style={{ left: `${Math.min(100, (bmi / 40) * 100)}%` }} />
            <div className="bmi-labels">
              <span>0</span><span>18.5</span><span>25</span><span>30</span><span>40</span>
            </div>
          </div>
        </div>
      </section>

      {/* Goal progress */}
      <section className="prof-section">
        <div className="row-head"><span className="label-mono">GEWICHTSDOEL</span><span className="label-mono" style={{ color: 'var(--signal)' }}>{Math.round(goalProgress * 100)}%</span></div>
        <div className="goal-card">
          <div className="goal-row">
            <div>
              <div className="label-mono">START</div>
              <div className="goal-w numeric">{d.start_weight}<span className="goal-unit">kg</span></div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div className="label-mono">NU</div>
              <div className="goal-w now numeric">{d.weight}<span className="goal-unit">kg</span></div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="label-mono">DOEL</div>
              <div className="goal-w numeric">{d.target_weight}<span className="goal-unit">kg</span></div>
            </div>
          </div>
          <div className="goal-bar">
            <div className="goal-bar-fill" style={{ width: `${goalProgress * 100}%` }} />
            <div className="goal-bar-marker" style={{ left: `${goalProgress * 100}%` }} />
          </div>
          <div className="goal-meta">
            <span className="numeric">−{totalLost.toFixed(1)} kg afgevallen</span>
            <span className="numeric" style={{ color: 'var(--fg-tertiary)' }}>{(d.weight - d.target_weight).toFixed(1)} kg te gaan</span>
          </div>
        </div>
      </section>

      {/* Personal data */}
      <section className="prof-section">
        <div className="row-head"><span className="label-mono">PERSOONLIJK</span></div>
        <div className="data-list">
          <DataRow l="LEEFTIJD" v={`${d.age} jaar`} />
          <DataRow l="GESLACHT" v={d.sex === 'm' ? 'MAN' : d.sex === 'f' ? 'VROUW' : '—'} />
          <DataRow l="LENGTE"   v={`${d.height} cm`} />
          <DataRow l="GEWICHT"  v={`${d.weight} kg`} />
          <DataRow l="DOEL"     v="AFVALLEN" />
          <DataRow l="NIVEAU"   v="GEVORDERD" />
          <DataRow l="EENHEDEN" v="METRIC" />
        </div>
      </section>

      {/* Settings */}
      <section className="prof-section">
        <div className="row-head"><span className="label-mono">INSTELLINGEN</span></div>
        <div className="data-list">
          <DataRow l="NOTIFICATIES" v="AAN" arrow />
          <DataRow l="GELUID & HAPTICS" v="AAN" arrow />
          <DataRow l="OVER" v="v0.1.0" arrow />
        </div>
      </section>

      {/* nav */}
      <nav className="nav">
        {['HOME','ROUTINES','STATS','PROFILE'].map((l, i) => (
          <button key={l} className={`nav-item ${i === 3 ? 'on' : ''}`}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.10em', fontWeight: 500 }}>{l}</span>
          </button>
        ))}
      </nav>

      <style>{`
        .prof { position: relative; height: 100%; background: var(--bg-base); color: var(--fg-primary); overflow-y: auto; padding-bottom: calc(var(--tab-h) + 24px); }
        .prof[data-density="compact"]    { --pad: 16px; --gap: 14px; }
        .prof[data-density="cozy"]       { --pad: 20px; --gap: 20px; }
        .prof[data-density="comfortable"]{ --pad: 24px; --gap: 28px; }

        .prof-head { display: flex; justify-content: space-between; align-items: flex-end; padding: 28px var(--pad) 8px; }
        .prof-name { font-size: 36px; font-weight: 700; letter-spacing: -0.04em; margin: 6px 0 0; line-height: 1; }
        .prof-edit { display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.10em; color: var(--fg-primary); padding: 9px 14px; border: 1px solid var(--border-default); border-radius: 999px; font-weight: 600; }

        .prof-section { padding: var(--gap) 0 0; }
        .row-head { display: flex; justify-content: space-between; padding: 0 var(--pad) 10px; }

        .lifetime-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding: 0 var(--pad); }
        .lt { padding: 14px 12px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); display: flex; flex-direction: column; gap: 4px; align-items: flex-start; }
        .lt-num { font-size: 28px; font-weight: 600; letter-spacing: -0.03em; color: var(--fg-primary); line-height: 1; }
        .lt-suffix { font-size: 16px; color: var(--fg-tertiary); }

        .bmi-card { margin: 0 var(--pad); padding: 16px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); }
        .bmi-num { font-size: 40px; font-weight: 600; letter-spacing: -0.03em; line-height: 1; margin-bottom: 16px; }
        .bmi-track { position: relative; }
        .bmi-segs { display: flex; gap: 2px; height: 6px; border-radius: 3px; overflow: hidden; }
        .bmi-marker { position: absolute; top: -4px; width: 2px; height: 14px; background: #fff; transform: translateX(-1px); }
        .bmi-labels { display: flex; justify-content: space-between; margin-top: 10px; font-family: var(--font-mono); font-size: 11px; color: var(--fg-secondary); letter-spacing: 0.06em; font-weight: 500; }

        .goal-card { margin: 0 var(--pad); padding: 16px; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); }
        .goal-row { display: flex; justify-content: space-between; margin-bottom: 16px; }
        .goal-w { font-size: 22px; font-weight: 600; letter-spacing: -0.02em; margin-top: 4px; color: var(--fg-secondary); }
        .goal-w.now { color: var(--signal); font-size: 28px; }
        .goal-unit { font-size: 13px; color: var(--fg-secondary); margin-left: 2px; font-weight: 500; }
        .goal-bar { position: relative; height: 4px; background: var(--bg-elev-3); border-radius: 2px; overflow: visible; margin: 4px 0 12px; }
        .goal-bar-fill { position: absolute; top: 0; left: 0; height: 100%; background: var(--signal); border-radius: 2px; }
        .goal-bar-marker { position: absolute; top: -3px; width: 10px; height: 10px; border-radius: 50%; background: var(--signal); transform: translateX(-5px); box-shadow: 0 0 0 3px var(--bg-base); }
        .goal-meta { display: flex; justify-content: space-between; font-size: 13px; color: var(--fg-secondary); font-weight: 500; }

        .data-list { padding: 0 var(--pad); }

        .nav { position: absolute; bottom: 0; left: 0; right: 0; height: var(--tab-h); display: grid; grid-template-columns: repeat(4, 1fr); background: rgba(10,10,11,0.85); backdrop-filter: blur(12px); border-top: 1px solid var(--border-subtle); }
        .nav-item { display: flex; align-items: center; justify-content: center; color: var(--fg-secondary); }
        .nav-item.on { color: var(--signal); }
      `}</style>
    </div>
  );
}

function DataRow({ l, v, arrow }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <span className="label-mono">{l}</span>
      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-primary)', letterSpacing: '0.06em', fontWeight: 500 }}>
        {v}
        {arrow && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--fg-tertiary)' }}><path d="M9 6l6 6-6 6"/></svg>}
      </span>
    </div>
  );
}

Object.assign(window, { ProfileScreen });

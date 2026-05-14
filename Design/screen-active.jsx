/* global React */
const { useState, useEffect, useRef } = React;

// ─── ACTIVE WORKOUT (Coach mode) ─────────────────────────────
// Big timer ring, oefening-illustratie, next-up preview, controls.

const EXERCISES = [
  { name: 'BURPEES',         secs: 40, instr: 'Vanuit staand naar plank, push-up, terug omhoog springen.', tip: 'Vloeiende beweging — armen boven hoofd bij sprong.', heat: { chest: 4, shoulders: 3, quads: 3, abs: 3, calves: 3 } },
  { name: 'JUMPING JACKS',   secs: 45, instr: 'Spring met benen wijd, armen boven het hoofd.',         tip: 'Land zachtjes, knieën licht gebogen.',                 heat: { shoulders: 3, calves: 3, quads: 2 } },
  { name: 'HIGH KNEES',      secs: 40, instr: 'Ren ter plaatse, knieën tot heuphoogte.',               tip: 'Houd je core aangespannen, blijf op tenen.',          heat: { quads: 4, abs: 3, calves: 4, hipflexors: 3 } },
  { name: 'BUTT KICKS',      secs: 40, instr: 'Ren ter plaatse, hielen naar billen.',                  tip: 'Snelle frequentie, romp recht.',                      heat: { hamstrings: 4, glutes: 3, calves: 3 } },
  { name: 'MOUNTAIN CLIMBERS',secs: 40,instr: 'Plank-positie, knieën om beurt naar borst.',             tip: 'Heupen laag, snel tempo.',                            heat: { abs: 4, shoulders: 3, hipflexors: 3 } },
  { name: 'JUMP SQUATS HIIT',secs: 40, instr: 'Squat tot 90°, explosief omhoog springen.',              tip: 'Land zacht, heupen laag op weg naar beneden.',        heat: { quads: 4, glutes: 4, calves: 3 } },
];

function ActiveWorkout({ onExit, density = 'cozy' }) {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('work');   // 'work' | 'rest'
  const [paused, setPaused] = useState(false);
  const [t, setT] = useState(EXERCISES[0].secs);

  const ex = EXERCISES[idx];
  const next = EXERCISES[idx + 1];
  const total = phase === 'work' ? ex.secs : 5;
  const totalDuration = EXERCISES.reduce((s, e) => s + e.secs + 5, 0) - 5;
  const elapsedDuration = EXERCISES.slice(0, idx).reduce((s, e) => s + e.secs + 5, 0)
    + (phase === 'rest' ? ex.secs + (5 - t) : (ex.secs - t));

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setT(prev => {
        if (prev > 1) return prev - 1;
        // tick to next phase / exercise
        if (phase === 'work') { setPhase('rest'); return 5; }
        if (idx < EXERCISES.length - 1) { setIdx(i => i + 1); setPhase('work'); return EXERCISES[idx + 1].secs; }
        return 0;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [paused, phase, idx]);

  const progress = 1 - t / total;
  const totalProgress = elapsedDuration / totalDuration;

  const skip = () => {
    if (phase === 'work') { setPhase('rest'); setT(5); }
    else if (idx < EXERCISES.length - 1) { setIdx(idx + 1); setPhase('work'); setT(EXERCISES[idx + 1].secs); }
  };

  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div className="aw" data-density={density} data-phase={phase}>
      {/* topbar */}
      <header className="aw-top">
        <button className="aw-back" onClick={onExit} aria-label="Exit">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
        </button>
        <div className="aw-top-c">
          <div className="label-mono">CARDIO BURN</div>
          <div className="aw-top-pos numeric">{String(idx + 1).padStart(2, '0')} / {String(EXERCISES.length).padStart(2, '0')}</div>
        </div>
        <button className="aw-mute" aria-label="Mute">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5zM15 9a4 4 0 0 1 0 6"/></svg>
        </button>
      </header>

      {/* segmented progress */}
      <div className="aw-segs">
        {EXERCISES.map((_, i) => (
          <div key={i} className={`seg ${i < idx ? 'done' : ''} ${i === idx ? 'on' : ''}`} />
        ))}
      </div>

      {/* phase chip */}
      <div className="aw-chip-row">
        <span className={`phase-chip ${phase}`}>
          <span className="dot" />
          {phase === 'work' ? 'EXECUTE' : 'RUST'}
        </span>
      </div>

      {/* timer ring */}
      <div className="aw-timer">
        <svg viewBox="0 0 240 240" width="260" height="260" className="ring">
          <circle cx="120" cy="120" r="108" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
          <circle
            cx="120" cy="120" r="108"
            fill="none"
            stroke={phase === 'work' ? 'var(--signal)' : 'var(--status-rest)'}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 108}`}
            strokeDashoffset={`${2 * Math.PI * 108 * (1 - progress)}`}
            transform="rotate(-90 120 120)"
            style={{ transition: 'stroke-dashoffset 1s linear' }}
          />
        </svg>
        <div className="aw-timer-text">
          <div className="aw-secs numeric">{String(t).padStart(2, '0')}</div>
          <div className="label-mono" style={{ marginTop: 4 }}>SECONDEN</div>
        </div>
      </div>

      {/* minimal: name + 1 line instruction. No heatmap during exercise. */}
      <div className="aw-illo">
        <div className="aw-name">{phase === 'work' ? ex.name : 'RECOVERY'}</div>
        {phase === 'work' ? (
          <p className="aw-instr">{ex.instr}</p>
        ) : (
          <p className="aw-instr">Adem diep. Volgende oefening start automatisch.</p>
        )}
      </div>

      {/* next up */}
      {next && (
        <div className="aw-next">
          <div>
            <div className="label-mono">VOLGENDE</div>
            <div className="aw-next-name">{next.name}</div>
          </div>
          <div className="aw-next-meta numeric">{next.secs}s</div>
        </div>
      )}

      {/* footer */}
      <footer className="aw-foot">
        <div className="aw-bar">
          <div className="aw-bar-fill" style={{ width: `${totalProgress * 100}%` }} />
        </div>
        <div className="aw-bar-times">
          <span className="numeric">{fmt(elapsedDuration)}</span>
          <span className="numeric" style={{ color: 'var(--fg-tertiary)' }}>{fmt(totalDuration)}</span>
        </div>
        <div className="aw-controls">
          <button className="aw-ctl" onClick={() => setPaused(p => !p)}>
            {paused ? '▶  HERVAT' : '❚❚  PAUZE'}
          </button>
          <button className="aw-ctl primary" onClick={skip}>
            SLA OVER →
          </button>
        </div>
      </footer>

      <style>{`
        .aw {
          position: relative; height: 100%;
          background: var(--bg-base); color: var(--fg-primary);
          display: flex; flex-direction: column;
          padding: 16px var(--pad, 20px) 0;
          overflow-y: auto;
        }
        .aw[data-density="compact"]    { --pad: 16px; }
        .aw[data-density="cozy"]       { --pad: 20px; }
        .aw[data-density="comfortable"]{ --pad: 24px; }

        .aw-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
        .aw-back, .aw-mute {
          width: 36px; height: 36px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: var(--fg-secondary);
          border: 1px solid var(--border-subtle);
        }
        .aw-top-c { text-align: center; }
        .aw-top-pos { font-size: 13px; color: var(--fg-primary); margin-top: 2px; }

        .aw-segs { display: flex; gap: 4px; margin: 14px 0 12px; }
        .seg { flex: 1; height: 3px; border-radius: 2px; background: var(--border-subtle); }
        .seg.done { background: var(--signal); }
        .seg.on   { background: var(--signal); opacity: 0.55; }

        .aw-chip-row { display: flex; justify-content: center; margin-bottom: 4px; }
        .phase-chip {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.12em; font-weight: 600;
          padding: 7px 14px; border-radius: var(--radius-pill);
        }
        .phase-chip.work { background: var(--signal-08); color: var(--signal); border: 1px solid rgba(232,254,60,0.4); }
        .phase-chip.rest { background: rgba(105,166,255,0.10); color: var(--status-rest); border: 1px solid rgba(105,166,255,0.4); }
        .phase-chip .dot { width: 6px; height: 6px; border-radius: 50%; background: currentColor; animation: pulse 1.4s var(--ease-in-out) infinite; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }

        .aw-timer { position: relative; align-self: center; margin: 8px 0 12px; }
        .aw-timer-text {
          position: absolute; inset: 0; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .aw-secs {
          font-size: 96px; font-weight: 600; line-height: 1;
          letter-spacing: -0.06em;
          color: var(--fg-primary);
        }
        [data-phase="rest"] .aw-secs { color: var(--status-rest); }

        .aw-illo { text-align: center; padding: 0 8px; }
        .aw-name {
          font-family: var(--font-sans); font-size: 28px; font-weight: 700;
          letter-spacing: -0.02em; margin-bottom: 12px;
        }
        .aw-instr { font-size: 16px; color: var(--fg-primary); line-height: 1.5; margin: 0 auto 6px; max-width: 320px; }
        .aw-tip { font-size: 14px; color: var(--fg-secondary); line-height: 1.5; margin: 0 auto 16px; max-width: 320px; }
        .aw-body { display: flex; justify-content: center; opacity: 0.95; }

        .aw-next {
          margin: 16px 0 12px;
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 14px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          background: var(--bg-elev-1);
        }
        .aw-next-name { font-size: 16px; font-weight: 500; margin-top: 2px; letter-spacing: 0.01em; }
        .aw-next-meta { color: var(--signal); font-size: 16px; font-weight: 500; }

        .aw-foot { padding-bottom: 20px; }
        .aw-bar { height: 2px; background: var(--border-subtle); border-radius: 2px; overflow: hidden; }
        .aw-bar-fill { height: 100%; background: var(--signal); transition: width 0.5s linear; }
        .aw-bar-times { display: flex; justify-content: space-between; font-size: 12px; margin: 6px 0 14px; color: var(--fg-secondary); font-weight: 500; }
        .aw-controls { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .aw-ctl {
          padding: 14px 0;
          border: 1px solid var(--border-default);
          border-radius: var(--radius-md);
          font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.10em; font-weight: 600;
          color: var(--fg-primary);
          background: var(--bg-elev-1);
        }
        .aw-ctl.primary {
          background: var(--signal); color: var(--signal-fg); border-color: var(--signal);
        }
      `}</style>
    </div>
  );
}

Object.assign(window, { ActiveWorkout });

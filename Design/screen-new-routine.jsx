/* global React */
const { useState } = React;

// ─── NEW ROUTINE BUILDER (3 steps) ───────────────────────────
const STEP_LABELS = ['DETAILS', 'OEFENINGEN', 'INSTELLEN'];

const EXERCISE_LIBRARY = [
  { id: 'burpees',     name: 'Burpees',          cat: 'CARDIO' },
  { id: 'jumping',     name: 'Jumping Jacks',    cat: 'CARDIO' },
  { id: 'highknees',   name: 'High Knees',       cat: 'CARDIO' },
  { id: 'mountain',    name: 'Mountain Climbers',cat: 'CARDIO' },
  { id: 'pushups',     name: 'Push-ups',         cat: 'PUSH' },
  { id: 'pikepush',    name: 'Pike Push-ups',    cat: 'PUSH' },
  { id: 'dips',        name: 'Tricep Dips',      cat: 'PUSH' },
  { id: 'pullups',     name: 'Pull-ups',         cat: 'PULL' },
  { id: 'rows',        name: 'Inverted Rows',    cat: 'PULL' },
  { id: 'squats',      name: 'Air Squats',       cat: 'LEGS' },
  { id: 'lunges',      name: 'Lunges',           cat: 'LEGS' },
  { id: 'jumpsquats',  name: 'Jump Squats',      cat: 'LEGS' },
  { id: 'plank',       name: 'Plank',            cat: 'CORE' },
  { id: 'situps',      name: 'Sit-ups',          cat: 'CORE' },
  { id: 'leg-raises',  name: 'Leg Raises',       cat: 'CORE' },
  { id: 'russian',     name: 'Russian Twists',   cat: 'CORE' },
];

function NewRoutine({ density = 'compact', onCancel, onDone }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [cat, setCat] = useState('CORE');
  const [picked, setPicked] = useState(['burpees', 'pushups', 'plank']);
  const [secs, setSecs] = useState(40);
  const [rest, setRest] = useState(10);

  const next = () => setStep(s => Math.min(2, s + 1));
  const prev = () => step === 0 ? onCancel?.() : setStep(s => s - 1);

  const togglePick = id => setPicked(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const totalSecs = picked.length * (secs + rest);
  const fmt = s => `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  return (
    <div className="nr" data-density={density}>
      {/* top bar */}
      <header className="nr-top">
        <button className="ico-btn" onClick={prev} aria-label={step === 0 ? 'Annuleren' : 'Terug'}>
          {step === 0
            ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
          }
        </button>
        <span className="label-mono">NIEUWE ROUTINE</span>
        <span className="label-mono numeric" style={{ color: 'var(--signal)' }}>{step + 1} / 3</span>
      </header>

      {/* progress */}
      <div className="nr-prog">
        {STEP_LABELS.map((l, i) => (
          <div key={l} className={`nr-step ${i <= step ? 'on' : ''}`}>
            <div className="nr-bar" />
            <span className="label-mono">{l}</span>
          </div>
        ))}
      </div>

      <div className="nr-content">
        {step === 0 && (
          <>
            <h1 className="nr-h">Geef je routine een naam</h1>
            <p className="nr-sub">Kies iets korts en herkenbaar.</p>

            <div className="nr-field">
              <label className="label-mono">NAAM</label>
              <input
                className="nr-input"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="bv. Ochtend Cardio"
                autoFocus
              />
            </div>

            <div className="nr-field">
              <label className="label-mono">CATEGORIE</label>
              <div className="nr-cats">
                {['CORE','CARDIO','PUSH','PULL','LEGS','FULL'].map(c => (
                  <button key={c} className={`nr-cat-chip ${cat === c ? 'on' : ''}`} onClick={() => setCat(c)}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="nr-h">Kies je oefeningen</h1>
            <p className="nr-sub">{picked.length} geselecteerd · tik om toe te voegen</p>

            <div className="nr-lib">
              {EXERCISE_LIBRARY.map(ex => {
                const on = picked.includes(ex.id);
                return (
                  <button key={ex.id} className={`nr-ex ${on ? 'on' : ''}`} onClick={() => togglePick(ex.id)}>
                    <div className="nr-ex-cat-row">
                      <span className={`cat-tag cat-${ex.cat.toLowerCase()}`}>{ex.cat}</span>
                      <div className="nr-check">
                        {on
                          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7"/></svg>
                          : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
                        }
                      </div>
                    </div>
                    <div className="nr-ex-name">{ex.name}</div>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="nr-h">Stel sets in</h1>
            <p className="nr-sub">Globaal voor alle oefeningen — later individueel aanpasbaar.</p>

            <div className="nr-stepper">
              <label className="label-mono">DUUR PER OEFENING</label>
              <div className="nr-step-row">
                <button className="step-btn" onClick={() => setSecs(Math.max(10, secs - 5))}>−</button>
                <div className="step-val numeric">{secs}<span className="step-unit">s</span></div>
                <button className="step-btn" onClick={() => setSecs(Math.min(120, secs + 5))}>+</button>
              </div>
            </div>

            <div className="nr-stepper">
              <label className="label-mono">RUST TUSSEN</label>
              <div className="nr-step-row">
                <button className="step-btn" onClick={() => setRest(Math.max(0, rest - 5))}>−</button>
                <div className="step-val numeric">{rest}<span className="step-unit">s</span></div>
                <button className="step-btn" onClick={() => setRest(Math.min(60, rest + 5))}>+</button>
              </div>
            </div>

            {/* summary */}
            <div className="nr-summary">
              <div className="label-mono" style={{ marginBottom: 12, color: 'var(--signal)' }}>SAMENVATTING</div>
              <div className="nr-sum-row"><span>Naam</span><span>{name || 'Naamloos'}</span></div>
              <div className="nr-sum-row"><span>Categorie</span><span>{cat}</span></div>
              <div className="nr-sum-row"><span>Oefeningen</span><span className="numeric">{picked.length}</span></div>
              <div className="nr-sum-row"><span>Totale duur</span><span className="numeric" style={{ color: 'var(--signal)' }}>{fmt(totalSecs)}</span></div>
            </div>
          </>
        )}
      </div>

      {/* CTA */}
      <div className="nr-cta-pin">
        <button
          className="cta-primary big"
          onClick={() => step === 2 ? onDone?.() : next()}
          disabled={step === 0 && !name.trim()}
        >
          {step === 2 ? 'OPSLAAN' : 'VOLGENDE'}
          {step !== 2 && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>}
        </button>
      </div>

      <style>{`
        .nr { position: relative; height: 100%; background: var(--bg-base); color: var(--fg-primary); overflow-y: auto; padding-bottom: 96px; }
        .nr[data-density="compact"]    { --pad: 16px; --gap: 16px; }
        .nr[data-density="cozy"]       { --pad: 20px; --gap: 20px; }
        .nr[data-density="comfortable"]{ --pad: 24px; --gap: 24px; }

        .nr-top { display: flex; justify-content: space-between; align-items: center; padding: 16px var(--pad) 16px; }
        .ico-btn { width: 36px; height: 36px; border-radius: 50%; border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; color: var(--fg-secondary); }

        .nr-prog { display: flex; gap: 6px; padding: 0 var(--pad) 24px; }
        .nr-step { flex: 1; display: flex; flex-direction: column; gap: 8px; opacity: 0.4; }
        .nr-step.on { opacity: 1; }
        .nr-bar { height: 3px; border-radius: 2px; background: var(--bg-elev-3); }
        .nr-step.on .nr-bar { background: var(--signal); }

        .nr-content { padding: 0 var(--pad); }
        .nr-h { font-size: 26px; font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; margin: 0 0 8px; }
        .nr-sub { color: var(--fg-secondary); font-size: 14px; margin: 0 0 24px; }

        .nr-field { display: flex; flex-direction: column; gap: 10px; margin-bottom: var(--gap); }
        .nr-input {
          background: var(--bg-elev-1); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);
          padding: 16px 14px; color: var(--fg-primary); font-size: 17px; font-weight: 500;
          font-family: var(--font-sans);
        }
        .nr-input::placeholder { color: var(--fg-quaternary); }
        .nr-input:focus { outline: none; border-color: var(--signal); }

        .nr-cats { display: flex; flex-wrap: wrap; gap: 6px; }
        .nr-cat-chip {
          padding: 10px 14px; border-radius: 999px;
          background: transparent; border: 1px solid var(--border-default);
          font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.10em; font-weight: 600;
          color: var(--fg-secondary);
        }
        .nr-cat-chip.on { background: var(--signal); color: var(--signal-fg); border-color: var(--signal); }

        .nr-lib { display: flex; flex-direction: column; gap: 6px; }
        .nr-ex {
          display: flex; flex-direction: column; gap: 6px;
          padding: 12px 14px;
          background: var(--bg-elev-1); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md); text-align: left;
        }
        .nr-ex.on { border-color: var(--signal); background: var(--signal-08); }
        .nr-ex-cat-row { display: flex; justify-content: space-between; align-items: center; }
        .nr-check { width: 26px; height: 26px; border-radius: 50%; background: var(--bg-elev-3); color: var(--fg-secondary); display: flex; align-items: center; justify-content: center; }
        .nr-ex.on .nr-check { background: var(--signal); color: var(--signal-fg); }
        .nr-ex-name { font-size: 16px; font-weight: 500; }
        .cat-tag { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.10em; padding: 3px 7px; border-radius: 4px; font-weight: 500; }
        .cat-core { background: rgba(232,254,60,0.10); color: var(--signal); }
        .cat-cardio { background: rgba(105,166,255,0.10); color: var(--status-rest); }
        .cat-push { background: rgba(255,180,84,0.10); color: var(--status-warn); }
        .cat-pull { background: rgba(107,232,155,0.10); color: var(--status-go); }
        .cat-legs { background: rgba(255,90,90,0.10); color: var(--status-crit); }
        .cat-full { background: rgba(255,255,255,0.06); color: var(--fg-primary); }

        .nr-stepper { margin-bottom: 18px; display: flex; flex-direction: column; gap: 10px; }
        .nr-step-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 8px 8px; background: var(--bg-elev-1); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); }
        .step-btn { width: 44px; height: 44px; border-radius: 50%; background: var(--bg-elev-3); color: var(--fg-primary); font-size: 22px; font-weight: 600; }
        .step-val { font-size: 32px; font-weight: 600; letter-spacing: -0.02em; line-height: 1; }
        .step-unit { font-size: 16px; color: var(--fg-tertiary); margin-left: 2px; }

        .nr-summary { margin-top: 24px; padding: 18px; background: var(--bg-elev-1); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); }
        .nr-sum-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; color: var(--fg-secondary); border-bottom: 1px solid var(--border-subtle); }
        .nr-sum-row:last-child { border-bottom: none; }
        .nr-sum-row > span:last-child { color: var(--fg-primary); font-weight: 500; }

        .nr-cta-pin { position: absolute; bottom: 0; left: 0; right: 0; padding: 12px var(--pad) 16px; background: linear-gradient(180deg, transparent, var(--bg-base) 30%); }
        .cta-primary.big {
          width: 100%; padding: 18px 0;
          background: var(--signal); color: var(--signal-fg);
          border: none; border-radius: var(--radius-md);
          font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.14em; font-weight: 700;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .cta-primary.big:disabled { opacity: 0.35; }
      `}</style>
    </div>
  );
}

Object.assign(window, { NewRoutine });

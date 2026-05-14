/* global React */
const { useState } = React;

// ─── ONBOARDING (Typeform-stijl, één vraag per scherm) ───────
// Steps: 0 welcome · 1 name · 2 age · 3 sex · 4 units · 5 height · 6 weight · 7 goal · 8 level · 9 notifs · 10 done

const STEPS = [
  { id: 'welcome' },
  { id: 'name'    },
  { id: 'age'     },
  { id: 'sex'     },
  { id: 'units'   },
  { id: 'height'  },
  { id: 'weight'  },
  { id: 'goal'    },
  { id: 'level'   },
  { id: 'notifs'  },
  { id: 'done'    },
];

function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: '', age: 28, sex: '', units: 'metric',
    height: 178, weight: 76, target_weight: 72,
    goal: '', level: '', notifs: null,
  });
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));
  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep(s => Math.max(s - 1, 0));
  const cur = STEPS[step];
  const progress = (step) / (STEPS.length - 1);

  const canAdvance = () => {
    switch (cur.id) {
      case 'name':   return data.name.trim().length > 0;
      case 'sex':    return !!data.sex;
      case 'goal':   return !!data.goal;
      case 'level':  return !!data.level;
      case 'notifs': return data.notifs !== null;
      default:       return true;
    }
  };

  return (
    <div className="onb">
      {/* progress */}
      <div className="onb-top">
        {step > 0 && step < STEPS.length - 1 && (
          <button className="onb-back" onClick={prev} aria-label="Back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
          </button>
        )}
        <div className="onb-bar"><div className="onb-bar-fill" style={{ width: `${progress * 100}%` }} /></div>
        <div className="label-mono onb-step">{String(Math.min(step, STEPS.length - 2)).padStart(2,'0')} / {String(STEPS.length - 2).padStart(2,'0')}</div>
      </div>

      <div className="onb-body">
        {cur.id === 'welcome' && (
          <div className="onb-center">
            <div className="onb-mark" />
            <div className="eyebrow">TRAINR · v0.1</div>
            <h1 className="onb-h1">PROTOCOL<br/><span>INITIATED</span></h1>
            <p className="onb-lede">Een trainings-app zonder ruis. Strak, direct, op jouw maat.</p>
          </div>
        )}

        {cur.id === 'name' && (
          <Field label="01" question="Hoe heet je?" hint="Voor de begroeting op je home-scherm.">
            <input className="onb-input" autoFocus value={data.name} onChange={e => update('name', e.target.value)} placeholder="Voornaam" />
          </Field>
        )}

        {cur.id === 'age' && (
          <Field label="02" question="Hoe oud ben je?" hint="Voor accurate calorie- en hartslagschattingen.">
            <NumberStepper value={data.age} onChange={v => update('age', v)} min={13} max={99} unit="JAAR" />
          </Field>
        )}

        {cur.id === 'sex' && (
          <Field label="03" question="Geslacht?" hint="Beïnvloedt BMR-berekening (Mifflin-St Jeor).">
            <Choice value={data.sex} onChange={v => update('sex', v)} options={[
              { v: 'm', l: 'MAN' }, { v: 'f', l: 'VROUW' }, { v: 'x', l: 'ANDERS' }, { v: '-', l: 'GEEN OPGAVE' },
            ]}/>
          </Field>
        )}

        {cur.id === 'units' && (
          <Field label="04" question="Welke eenheden?" hint="Kun je later wijzigen in profiel.">
            <Choice value={data.units} onChange={v => update('units', v)} options={[
              { v: 'metric',   l: 'METRIC',   sub: 'kg · cm' },
              { v: 'imperial', l: 'IMPERIAL', sub: 'lbs · ft' },
            ]}/>
          </Field>
        )}

        {cur.id === 'height' && (
          <Field label="05" question="Hoe lang ben je?">
            <NumberStepper value={data.height} onChange={v => update('height', v)} min={120} max={230} unit={data.units === 'metric' ? 'CM' : 'IN'} step={1} />
          </Field>
        )}

        {cur.id === 'weight' && (
          <Field label="06" question="En je gewicht?" hint="Voor calorieberekening per oefening.">
            <NumberStepper value={data.weight} onChange={v => update('weight', v)} min={30} max={250} unit={data.units === 'metric' ? 'KG' : 'LBS'} step={0.5} decimal />
          </Field>
        )}

        {cur.id === 'goal' && (
          <Field label="07" question="Wat is je doel?">
            <Choice value={data.goal} onChange={v => update('goal', v)} options={[
              { v: 'lose',     l: 'AFVALLEN',     sub: 'gewicht omlaag' },
              { v: 'maintain', l: 'FIT BLIJVEN',  sub: 'algemene gezondheid' },
              { v: 'muscle',   l: 'SPIERMASSA',   sub: 'volume opbouwen' },
              { v: 'strength', l: 'KRACHT',       sub: 'sterker worden' },
            ]}/>
          </Field>
        )}

        {cur.id === 'level' && (
          <Field label="08" question="Wat is je niveau?" hint="Bepaalt intensiteit van suggesties.">
            <Choice value={data.level} onChange={v => update('level', v)} options={[
              { v: 'beginner', l: 'BEGINNER',  sub: 'minder dan 3 maanden' },
              { v: 'inter',    l: 'GEVORDERD', sub: '3-12 maanden' },
              { v: 'pro',      l: 'PRO',       sub: '1+ jaar consistent' },
            ]}/>
          </Field>
        )}

        {cur.id === 'notifs' && (
          <Field label="09" question="Notificaties aan?" hint="Reminders voor je geplande sessies.">
            <Choice value={data.notifs} onChange={v => update('notifs', v)} options={[
              { v: true,  l: 'JA, REMIND ME', sub: 'aanbevolen' },
              { v: false, l: 'LIEVER NIET',   sub: 'kan later aan' },
            ]}/>
          </Field>
        )}

        {cur.id === 'done' && (
          <div className="onb-center">
            <div className="onb-checkmark">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 24l8 8 16-16"/></svg>
            </div>
            <h1 className="onb-h1">PROFIEL<br/><span>READY</span></h1>
            <p className="onb-lede">Welkom, {data.name || 'soldier'}. Tijd om te trainen.</p>
            <div className="onb-summary">
              <SummaryRow label="LEEFTIJD" val={`${data.age}j`} />
              <SummaryRow label="LENGTE"   val={`${data.height} ${data.units === 'metric' ? 'cm' : 'in'}`} />
              <SummaryRow label="GEWICHT"  val={`${data.weight} ${data.units === 'metric' ? 'kg' : 'lbs'}`} />
              <SummaryRow label="DOEL"     val={({lose:'AFVALLEN',maintain:'FIT BLIJVEN',muscle:'SPIERMASSA',strength:'KRACHT'})[data.goal] || '—'} />
              <SummaryRow label="NIVEAU"   val={({beginner:'BEGINNER',inter:'GEVORDERD',pro:'PRO'})[data.level] || '—'} />
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="onb-cta">
        {cur.id === 'welcome' && (
          <button className="cta-primary" onClick={next}>BEGIN PROTOCOL →</button>
        )}
        {cur.id !== 'welcome' && cur.id !== 'done' && (
          <button className="cta-primary" onClick={next} disabled={!canAdvance()}>VOLGENDE →</button>
        )}
        {cur.id === 'done' && (
          <button className="cta-primary" onClick={() => onComplete?.(data)}>NAAR HOME →</button>
        )}
      </div>

      <style>{`
        .onb { position: relative; height: 100%; background: var(--bg-base); color: var(--fg-primary); display: flex; flex-direction: column; }
        .onb-top { display: flex; align-items: center; gap: 12px; padding: 16px 20px 0; }
        .onb-back { width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border-subtle); display: flex; align-items: center; justify-content: center; color: var(--fg-secondary); flex-shrink: 0; }
        .onb-bar { flex: 1; height: 2px; background: var(--border-subtle); border-radius: 2px; overflow: hidden; }
        .onb-bar-fill { height: 100%; background: var(--signal); transition: width 320ms var(--ease-out); }
        .onb-step { font-size: 12px; color: var(--fg-secondary); font-weight: 500; }
        .onb-body { flex: 1; padding: 32px 24px; display: flex; flex-direction: column; }

        .onb-center { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 18px; }
        .onb-mark { width: 64px; height: 64px; border-radius: 16px; background: var(--signal); position: relative; }
        .onb-mark::after { content:''; position:absolute; inset: 14px; background: var(--bg-base); border-radius: 6px; }
        .onb-checkmark { width: 80px; height: 80px; border-radius: 50%; background: var(--signal-08); border: 2px solid var(--signal); color: var(--signal); display: flex; align-items: center; justify-content: center; }
        .onb-h1 { font-size: 44px; font-weight: 700; letter-spacing: -0.04em; line-height: 0.95; margin: 0; }
        .onb-h1 span { color: var(--signal); }
        .onb-lede { font-size: 16px; color: var(--fg-secondary); max-width: 280px; line-height: 1.5; margin: 0; }

        .onb-summary { width: 100%; max-width: 280px; margin-top: 16px; display: flex; flex-direction: column; gap: 6px; }

        .onb-cta { padding: 16px 20px 24px; }
        .cta-primary {
          width: 100%; padding: 16px 0;
          background: var(--signal); color: var(--signal-fg);
          border: none; border-radius: var(--radius-md);
          font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.16em; font-weight: 600;
        }
        .cta-primary:disabled { background: var(--bg-elev-2); color: var(--fg-tertiary); }

        .field-label { font-family: var(--font-mono); font-size: 13px; letter-spacing: 0.14em; color: var(--signal); margin-bottom: 12px; font-weight: 600; }
        .field-q { font-size: 28px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.15; margin: 0 0 8px; }
        .field-hint { font-size: 14px; color: var(--fg-secondary); margin: 0 0 28px; line-height: 1.5; }
        .field-control { margin-top: 8px; }

        .onb-input {
          width: 100%; padding: 16px 0;
          background: transparent; border: none; border-bottom: 1px solid var(--border-default);
          color: var(--fg-primary); font-family: var(--font-sans); font-size: 24px; font-weight: 500;
          outline: none; letter-spacing: -0.01em;
        }
        .onb-input::placeholder { color: var(--fg-quaternary); }
        .onb-input:focus { border-bottom-color: var(--signal); }
      `}</style>
    </div>
  );
}

function Field({ label, question, hint, children }) {
  return (
    <div>
      <div className="field-label">{label}</div>
      <h2 className="field-q">{question}</h2>
      {hint && <p className="field-hint">{hint}</p>}
      <div className="field-control">{children}</div>
    </div>
  );
}

function NumberStepper({ value, onChange, min, max, step = 1, unit, decimal = false }) {
  const fmt = (v) => decimal ? v.toFixed(1) : String(v);
  return (
    <div className="ns">
      <div className="ns-display">
        <span className="numeric ns-val">{fmt(value)}</span>
        <span className="ns-unit">{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        className="ns-slider"
      />
      <div className="ns-row">
        <button onClick={() => onChange(Math.max(min, value - step))}>−</button>
        <button onClick={() => onChange(Math.min(max, value + step))}>+</button>
      </div>
      <style>{`
        .ns-display { display: flex; align-items: baseline; gap: 12px; padding: 16px 0 12px; border-bottom: 1px solid var(--border-subtle); }
        .ns-val { font-size: 64px; font-weight: 600; letter-spacing: -0.04em; color: var(--signal); }
        .ns-unit { font-family: var(--font-mono); font-size: 16px; letter-spacing: 0.10em; color: var(--fg-secondary); font-weight: 500; }
        .ns-slider { width: 100%; margin: 24px 0 16px; -webkit-appearance: none; height: 2px; background: var(--border-default); border-radius: 2px; outline: none; }
        .ns-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 24px; height: 24px; border-radius: 50%; background: var(--signal); cursor: pointer; }
        .ns-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .ns-row button { padding: 14px 0; background: var(--bg-elev-1); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); color: var(--fg-primary); font-size: 24px; font-weight: 400; }
      `}</style>
    </div>
  );
}

function Choice({ value, onChange, options }) {
  return (
    <div className="ch">
      {options.map(opt => (
        <button key={String(opt.v)} className={`ch-opt ${value === opt.v ? 'on' : ''}`} onClick={() => onChange(opt.v)}>
          <div className="ch-l">{opt.l}</div>
          {opt.sub && <div className="ch-sub">{opt.sub}</div>}
          <div className="ch-tick">
            {value === opt.v && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>}
          </div>
        </button>
      ))}
      <style>{`
        .ch { display: flex; flex-direction: column; gap: 8px; }
        .ch-opt {
          display: grid; grid-template-columns: 1fr auto; align-items: center; gap: 6px 16px;
          padding: 16px 18px; text-align: left;
          background: var(--bg-elev-1); border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: all var(--dur-fast) var(--ease-out);
        }
        .ch-opt.on { border-color: var(--signal); background: var(--signal-08); }
        .ch-opt.on .ch-tick { color: var(--signal); }
        .ch-l { font-family: var(--font-mono); font-size: 14px; letter-spacing: 0.10em; font-weight: 600; }
        .ch-opt.on .ch-l { color: var(--signal); }
        .ch-sub { grid-column: 1; font-size: 13px; color: var(--fg-secondary); }
        .ch-tick { grid-column: 2; grid-row: 1 / span 2; width: 20px; height: 20px; }
      `}</style>
    </div>
  );
}

function SummaryRow({ label, val }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-subtle)' }}>
      <span className="label-mono">{label}</span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-primary)', letterSpacing: '0.06em', fontWeight: 500 }}>{val}</span>
    </div>
  );
}

Object.assign(window, { Onboarding });

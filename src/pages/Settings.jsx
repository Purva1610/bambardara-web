import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, ACCENT_OPTIONS } from '../context/ThemeContext';

const THEME_OPTIONS = [
  { id: 'light', label: 'Light', icon: Sun, desc: 'Bright, ivory surfaces' },
  { id: 'dark', label: 'Dark', icon: Moon, desc: 'Deep forest, low glare' },
  { id: 'system', label: 'System', icon: Monitor, desc: 'Match device setting' },
];

export default function Settings() {
  const { mode, setMode, accent, setAccent } = useTheme();

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-serif text-2xl text-text">Settings</h1>
        <p className="mt-1 text-sm text-muted">Manage your executive account and how the dashboard looks.</p>
      </div>

      <section className="eq-card p-6">
        <h2 className="font-serif text-lg text-text">Appearance</h2>
        <p className="text-sm text-muted">Choose a theme for the dashboard workspace.</p>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {THEME_OPTIONS.map(({ id, label, icon: Icon, desc }) => (
            <button
              key={id}
              onClick={() => setMode(id)}
              className={[
                'rounded-lg border px-4 py-4 text-left transition-colors',
                mode === id ? 'border-accent bg-accent/10' : 'border-line hover:bg-primary/[0.03]',
              ].join(' ')}
            >fa
              <Icon size={18} strokeWidth={1.75} className="text-primary" />
              <p className="mt-2 text-sm font-medium text-text">{label}</p>
              <p className="text-xs text-muted">{desc}</p>
            </button>
          ))}
        </div>

        <div className="mt-6 border-t border-line pt-6">
          <p className="text-sm font-medium text-text">Accent color</p>
          <p className="text-sm text-muted">Used for highlights, active states, and charts.</p>
          <div className="mt-3 flex gap-3">
            {ACCENT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setAccent(opt.value)}
                className="flex flex-col items-center gap-1.5"
              >
                <span
                  style={{ backgroundColor: opt.value }}
                  className={[
                    'h-8 w-8 rounded-full border-2 transition-transform',
                    accent === opt.value ? 'scale-110 border-text' : 'border-transparent',
                  ].join(' ')}
                />
                <span className="text-[0.7rem] text-muted">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

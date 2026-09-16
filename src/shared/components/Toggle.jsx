/**
 * Accessible on/off switch. Generalizes the Toggle previously defined
 * privately inside features/ceo/pages/SettingsPage.jsx (aria-pressed +
 * aria-label pattern kept) onto the shared Tailwind token system instead of
 * that page's bespoke settings.css, so it can be reused for the Super Admin
 * role/module toggles without depending on CEO-only CSS.
 */
export default function Toggle({ checked, onChange, label, disabled = false }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={[
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-150',
        checked ? 'bg-secondary' : 'bg-line',
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
      ].join(' ')}
    >
      <span
        className={[
          'inline-block h-[1.125rem] w-[1.125rem] transform rounded-full bg-white shadow-soft transition-transform duration-150',
          checked ? 'translate-x-[22px]' : 'translate-x-[3px]',
        ].join(' ')}
      />
    </button>
  );
}

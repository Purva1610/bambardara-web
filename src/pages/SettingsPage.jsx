import { useMemo, useState } from "react";
import {
  User,
  Settings as Gear,
  Bell,
  ShieldCheck,
  Pencil,
} from "lucide-react";
import "../style/settings.css";

const NAV = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "account",
    label: "Account",
    icon: Gear,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldCheck,
  },
];

const INITIAL = {
  name: "Alex Rivera",
  title: "Product designer",
  bio: "Building calmer tools for people who make things by hand.",
  email: "alex.rivera@fieldnote.app",
  emailVerified: true,
  username: "alexrivera",
  timezone: "Pacific Time (US & Canada)",
  language: "English (US)",
  notifProduct: true,
  notifMentions: true,
  notifWeekly: false,
  notifDesktop: true,
  twoFactor: false,
};

const PAGE_STORAGE_KEY = "fieldnote-settings-page";

function getStoredPageState() {
  try {
    const stored = window.localStorage.getItem(
      PAGE_STORAGE_KEY
    );

    const pageState = stored
      ? JSON.parse(stored)
      : {};

    return {
      settings: {
        ...INITIAL,
        ...(pageState.settings || {}),
      },

      avatarUrl: pageState.avatarUrl || "",

      signedOutSessions: Array.isArray(
        pageState.signedOutSessions
      )
        ? pageState.signedOutSessions
        : [],

      passwordUpdatedAt:
        pageState.passwordUpdatedAt || null,
    };
  } catch {
    return {
      settings: { ...INITIAL },
      avatarUrl: "",
      signedOutSessions: [],
      passwordUpdatedAt: null,
    };
  }
}

/* =========================================================
   FIELD
   ========================================================= */

function Field({
  label,
  hint,
  error,
  children,
}) {
  return (
    <label className="field">
      <span className="field__label">
        {label}
      </span>

      {children}

      {hint && !error && (
        <span className="field__hint">
          {hint}
        </span>
      )}

      {error && (
        <span className="field__error">
          {error}
        </span>
      )}
    </label>
  );
}

/* =========================================================
   TOGGLE
   ========================================================= */

function Toggle({
  checked,
  onChange,
  label,
  description,
}) {
  return (
    <div className="toggle-row">
      <div className="toggle-row__content">
        <div className="toggle-row__label">
          {label}
        </div>

        {description && (
          <div className="toggle-row__description">
            {description}
          </div>
        )}
      </div>

      <button
        type="button"
        className={`toggle ${
          checked ? "toggle--on" : ""
        }`}
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
        aria-label={label}
      >
        <span className="toggle__thumb" />
      </button>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
   ========================================================= */

function SectionHeading({
  title,
  description,
}) {
  return (
    <div className="settings-section__heading">
      <h2 className="settings-section__title">
        {title}
      </h2>

      {description && (
        <p className="settings-section__description">
          {description}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   SETTINGS PAGE
   ========================================================= */

export default function SettingsPage() {
  const storedPageState = getStoredPageState();

  const [active, setActive] =
    useState("profile");

  const [saved, setSaved] = useState(
    storedPageState.settings
  );

  const [draft, setDraft] = useState(
    storedPageState.settings
  );

  const [toast, setToast] = useState("");

  const [isProfileEditing, setIsProfileEditing] =
    useState(false);

  const [photoLabel, setPhotoLabel] =
    useState("Photo");

  const [avatarUrl, setAvatarUrl] =
    useState(storedPageState.avatarUrl);

  const [deleteConfirm, setDeleteConfirm] =
    useState(false);

  const [deactivateConfirm, setDeactivateConfirm] =
    useState(false);

  const [signedOutSessions, setSignedOutSessions] =
    useState(
      storedPageState.signedOutSessions
    );

  const [signOutConfirm, setSignOutConfirm] =
    useState(null);

  const [passwordUpdatedAt, setPasswordUpdatedAt] =
    useState(
      storedPageState.passwordUpdatedAt
    );

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const isDirty = useMemo(
    () =>
      JSON.stringify(saved) !==
      JSON.stringify(draft),
    [saved, draft]
  );

  function set(key, value) {
    setDraft((currentDraft) => ({
      ...currentDraft,
      [key]: value,
    }));
  }

  function persistPageState(
    nextSettings = draft,
    nextAvatarUrl = avatarUrl,
    nextSessions = signedOutSessions,
    nextPasswordUpdatedAt = passwordUpdatedAt
  ) {
    window.localStorage.setItem(
      PAGE_STORAGE_KEY,
      JSON.stringify({
        settings: nextSettings,
        avatarUrl: nextAvatarUrl,
        signedOutSessions: nextSessions,
        passwordUpdatedAt:
          nextPasswordUpdatedAt,
      })
    );
  }

  function showToast(message) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2200);
  }

  /* =========================================================
     SAVE / CANCEL
     ========================================================= */

  function handleSave() {
    setSaved(draft);

    persistPageState(
      draft,
      avatarUrl,
      signedOutSessions,
      passwordUpdatedAt
    );

    showToast("Changes saved.");
  }

  function handleCancel() {
    setDraft(saved);
    setIsProfileEditing(false);
  }

  /* =========================================================
     PHOTO
     ========================================================= */

  function handlePhotoClick() {
    if (!isProfileEditing) {
      setIsProfileEditing(true);
    }

    document
      .getElementById("profile-photo-input")
      ?.click();
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setAvatarUrl(reader.result);
      setPhotoLabel("Photo updated");

      persistPageState(
        draft,
        reader.result,
        signedOutSessions,
        passwordUpdatedAt
      );

      window.setTimeout(() => {
        setPhotoLabel("Photo");
      }, 1200);
    };

    reader.readAsDataURL(file);
  }

  /* =========================================================
     ACCOUNT
     ========================================================= */

  function handleDeleteAccount() {
    if (!deleteConfirm) {
      setDeleteConfirm(true);

      showToast(
        "Are you sure? This action cannot be undone."
      );

      return;
    }

    setDeleteConfirm(false);
    showToast("Account deleted.");
  }

  function handleDeactivateAccount() {
    if (!deactivateConfirm) {
      setDeactivateConfirm(true);

      showToast(
        "Your account will be deactivated."
      );

      return;
    }

    setDeactivateConfirm(false);
    showToast("Account deactivated.");
  }

  /* =========================================================
     SESSIONS
     ========================================================= */

  function handleSignOut(sessionIndex) {
    if (signOutConfirm !== sessionIndex) {
      setSignOutConfirm(sessionIndex);

      showToast("Sign out this session?");

      return;
    }

    const nextSessions = [
      ...signedOutSessions,
      sessionIndex,
    ];

    setSignedOutSessions(nextSessions);
    setSignOutConfirm(null);

    persistPageState(
      draft,
      avatarUrl,
      nextSessions,
      passwordUpdatedAt
    );

    showToast("Session signed out.");
  }

  /* =========================================================
     TWO FACTOR
     ========================================================= */

  function handleTwoFactorChange(enabled) {
    set("twoFactor", enabled);

    showToast(
      enabled
        ? "Two-factor authentication enabled."
        : "Two-factor authentication disabled."
    );
  }

  /* =========================================================
     PASSWORD
     ========================================================= */

  function handlePasswordUpdate() {
    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      showToast(
        "Complete all password fields."
      );

      return;
    }

    if (newPassword.length < 8) {
      showToast(
        "New password must be at least 8 characters."
      );

      return;
    }

    if (newPassword !== confirmPassword) {
      showToast(
        "New passwords do not match."
      );

      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    const updatedAt =
      new Date().toISOString();

    setPasswordUpdatedAt(updatedAt);

    persistPageState(
      draft,
      avatarUrl,
      signedOutSessions,
      updatedAt
    );

    showToast("Password updated.");
  }

  /* =========================================================
     AVATAR INITIALS
     ========================================================= */

  const initials = draft.name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const activeNav =
    NAV.find((item) => item.id === active);

  return (
    <div className=""> {/* # settings-page class */}

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <header className="settings-page__header">

        <div>
          {/* <div className="settings-page__eyebrow">
            Fieldnote
          </div> */}

          <h1 className="font-serif text-2xl text-text sm:text-[1.75rem]">
            Settings
          </h1>

          <p className="mt-1 text-sm text-muted">
            Manage your profile, account preferences,
            notifications, and security.
          </p>
        </div>

      </header>

      {/* =====================================================
          SETTINGS NAVIGATION
          ===================================================== */}

      <nav className="settings-navigation">

        <div className="settings-navigation__inner">

          {NAV.map((item) => {
            const Icon = item.icon;
            const isActive =
              active === item.id;

            return (
              <button
                type="button"
                key={item.id}
                className={`settings-nav-item ${
                  isActive
                    ? "settings-nav-item--active"
                    : ""
                }`}
                onClick={() => {
                  setActive(item.id);
                  setDeleteConfirm(false);
                  setDeactivateConfirm(false);
                  setSignOutConfirm(null);
                }}
              >
                <span className="settings-nav-item__icon">
                  <Icon
                    size={17}
                    strokeWidth={1.8}
                  />
                </span>

                <span>
                  {item.label}
                </span>
              </button>
            );
          })}

        </div>

      </nav>

      {/* =====================================================
          MAIN SETTINGS AREA
          ===================================================== */}

      <main className="settings-panel">

        {/* CONTENT HEADER */}

        {/* <div className="settings-content__topbar">

          <div>
            <span className="settings-content__label">
              SETTINGS
            </span>

            <div className="settings-content__current">
              {activeNav?.label}
            </div>
          </div>

          {isDirty && (
            <span className="unsaved-indicator">
              Unsaved changes
            </span>
          )}

        </div> */}

        {/* ===================================================
            PROFILE
            =================================================== */}

        {active === "profile" && (
          <section className="settings-section">

            <div className="profile-header-row">

              <SectionHeading
                title="Profile"
                description="This is how you appear to people you work with."
              />
  
              <button
                type="button"
                className="btn-outline"
                onClick={() =>
                  setIsProfileEditing(
                    (value) => !value
                  )
                }
              >
                <Pencil size={14} />

                {isProfileEditing
                  ? "Done"
                  : "Edit profile"}
              </button>

            </div>

            <div className="settings-divider" />

            {/* Avatar */}

            <div className="avatar-row">

              <div
                className="settings-avatar"
                style={
                  avatarUrl
                    ? {
                        backgroundImage: `url(${avatarUrl})`,
                        backgroundSize:
                          "cover",
                        backgroundPosition:
                          "center",
                      }
                    : undefined
                }
              >
                {!avatarUrl && initials}

                <button
                  type="button"
                  className="avatar__edit"
                  aria-label="Edit profile photo"
                  onClick={
                    handlePhotoClick
                  }
                >
                  <Pencil size={12} />
                </button>

                <input
                  id="profile-photo-input"
                  type="file"
                  accept="image/png, image/jpeg"
                  className="avatar__input"
                  onChange={
                    handlePhotoChange
                  }
                />
              </div>

              <div>
                <div className="avatar-row__meta-title">
                  {photoLabel}
                </div>

                <div className="avatar-row__meta-hint">
                  JPG or PNG, up to 4MB.
                </div>
              </div>

            </div>

            <div className="settings-form">

              <div className="settings-row">

                <Field label="Name">
                  <input
                    className="field__input"
                    value={draft.name}
                    onChange={(event) =>
                      set(
                        "name",
                        event.target.value
                      )
                    }
                    disabled={
                      !isProfileEditing
                    }
                  />
                </Field>

                <Field label="Title">
                  <input
                    className="field__input"
                    value={draft.title}
                    onChange={(event) =>
                      set(
                        "title",
                        event.target.value
                      )
                    }
                    disabled={
                      !isProfileEditing
                    }
                  />
                </Field>

              </div>

              <Field
                label="Bio"
                hint="A sentence or two. This shows on your public profile."
              >
                <textarea
                  className="field__input field__textarea"
                  value={draft.bio}
                  onChange={(event) =>
                    set(
                      "bio",
                      event.target.value
                    )
                  }
                  disabled={
                    !isProfileEditing
                  }
                />
              </Field>

              <div className="settings-row">

                <Field label="Username">
                  <input
                    className="field__input"
                    value={draft.username}
                    onChange={(event) =>
                      set(
                        "username",
                        event.target.value
                      )
                    }
                    disabled={
                      !isProfileEditing
                    }
                  />
                </Field>

                <Field label="Email">

                  <div className="inline-row">

                    <input
                      type="email"
                      className="field__input"
                      value={draft.email}
                      onChange={(event) =>
                        set(
                          "email",
                          event.target.value
                        )
                      }
                      disabled={
                        !isProfileEditing
                      }
                    />

                    <button
                      type="button"
                      className={`verified-badge ${
                        draft.emailVerified
                          ? "verified-badge--active"
                          : "verified-badge--muted"
                      }`}
                      onClick={() =>
                        set(
                          "emailVerified",
                          !draft.emailVerified
                        )
                      }
                      aria-pressed={
                        draft.emailVerified
                      }
                    >
                      {draft.emailVerified
                        ? "Verified"
                        : "Verify"}
                    </button>

                  </div>

                </Field>

              </div>

            </div>

          </section>
        )}

        {/* ===================================================
            ACCOUNT
            =================================================== */}

        {active === "account" && (
          <section className="settings-section ">

            <SectionHeading
              title="Account"
              description="Your sign-in details and regional preferences."
            />

            <div className="settings-divider" />

            <div className="settings-form">

              <Field label="Username">
                <input
                  className="field__input"
                  value={draft.username}
                  onChange={(event) =>
                    set(
                      "username",
                      event.target.value
                    )
                  }
                />
              </Field>

              <Field label="Email">

                <div className="inline-row">

                  <input
                    type="email"
                    className="field__input"
                    value={draft.email}
                    onChange={(event) =>
                      set(
                        "email",
                        event.target.value
                      )
                    }
                  />

                  <button
                    type="button"
                    className={`verified-badge ${
                      draft.emailVerified
                        ? "verified-badge--active"
                        : "verified-badge--muted"
                    }`}
                    onClick={() =>
                      set(
                        "emailVerified",
                        !draft.emailVerified
                      )
                    }
                  >
                    {draft.emailVerified
                      ? "Verified"
                      : "Verify"}
                  </button>

                </div>

              </Field>

              <div className="settings-row">

                <Field label="Language">

                  <select
                    className="field__input"
                    value={draft.language}
                    onChange={(event) =>
                      set(
                        "language",
                        event.target.value
                      )
                    }
                  >
                    <option>
                      English (US)
                    </option>

                    <option>
                      English (UK)
                    </option>

                    <option>
                      Spanish
                    </option>

                    <option>
                      Portuguese
                    </option>
                  </select>

                </Field>

                <Field label="Timezone">

                  <select
                    className="field__input"
                    value={draft.timezone}
                    onChange={(event) =>
                      set(
                        "timezone",
                        event.target.value
                      )
                    }
                  >
                    <option>
                      Pacific Time (US & Canada)
                    </option>

                    <option>
                      Eastern Time (US & Canada)
                    </option>

                    <option>
                      Greenwich Mean Time
                    </option>

                    <option>
                      India Standard Time
                    </option>
                  </select>

                </Field>

              </div>

              <div className="danger-zone">

                <div className="danger-zone__title">
                  Deactivate account
                </div>

                <p className="danger-zone__description">
                  Your profile and content are
                  hidden until you sign back in.
                  You can reactivate any time.
                </p>

                <button
                  type="button"
                  className="btn-ghost btn-ghost--danger"
                  onClick={
                    handleDeactivateAccount
                  }
                >
                  {deactivateConfirm
                    ? "Confirm deactivate"
                    : "Deactivate account"}
                </button>

              </div>

            </div>

          </section>
        )}

        {/* ===================================================
            NOTIFICATIONS
            =================================================== */}

        {active === "notifications" && (
          <section className="settings-section">

            <SectionHeading
              title="Notifications"
              description="Choose what you hear about, and where."
            />

            <div className="settings-divider" />

            <div className="settings-form settings-form--compact">

              <Toggle
                checked={
                  draft.notifProduct
                }
                onChange={(value) =>
                  set(
                    "notifProduct",
                    value
                  )
                }
                label="Product updates"
                description="Occasional notes about new features and changes."
              />

              <Toggle
                checked={
                  draft.notifMentions
                }
                onChange={(value) =>
                  set(
                    "notifMentions",
                    value
                  )
                }
                label="Comments and mentions"
                description="When someone replies to you or brings you into a thread."
              />

              <Toggle
                checked={
                  draft.notifWeekly
                }
                onChange={(value) =>
                  set(
                    "notifWeekly",
                    value
                  )
                }
                label="Weekly summary email"
                description="A digest of activity from the past week, sent Monday mornings."
              />

              <Toggle
                checked={
                  draft.notifDesktop
                }
                onChange={(value) =>
                  set(
                    "notifDesktop",
                    value
                  )
                }
                label="Desktop notifications"
                description="Show alerts on this device while the app is open."
              />

            </div>

          </section>
        )}

        {/* ===================================================
            SECURITY
            =================================================== */}

        {active === "security" && (
          <section className="settings-section">

            <SectionHeading
              title="Security"
              description="Keep your account locked down."
            />

            <div className="settings-divider" />

            <div className="settings-form">

              <Field label="Current password">

                <input
                  type="password"
                  className="field__input"
                  placeholder="Password"
                  value={currentPassword}
                  onChange={(event) =>
                    setCurrentPassword(
                      event.target.value
                    )
                  }
                />

              </Field>

              <div className="settings-row">

                <Field label="New password">

                  <input
                    type="password"
                    className="field__input"
                    placeholder="Password"
                    value={newPassword}
                    onChange={(event) =>
                      setNewPassword(
                        event.target.value
                      )
                    }
                  />

                </Field>

                <Field label="Confirm new password">

                  <input
                    type="password"
                    className="field__input"
                    placeholder="Password"
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                  />

                </Field>

              </div>

              <button
                type="button"
                className="btn-primary"
                onClick={
                  handlePasswordUpdate
                }
                disabled={
                  !currentPassword ||
                  !newPassword ||
                  !confirmPassword
                }
              >
                Update password
              </button>

              {passwordUpdatedAt && (
                <div className="field__hint">
                  Password updated on this
                  device.
                </div>
              )}

              <Toggle
                checked={draft.twoFactor}
                onChange={
                  handleTwoFactorChange
                }
                label="Two-factor authentication"
                description="Require a code from your phone in addition to your password."
              />

              {/* Active sessions */}

              <div className="settings-sessions">

                <div className="settings-sessions__title">
                  Active sessions
                </div>

                {[
                  {
                    device:
                      "MacBook Pro - Chrome",
                    place: "Pune, India",
                    active: "Active now",
                  },
                  {
                    device:
                      "iPhone 15 - App",
                    place: "Pune, India",
                    active: "3 hours ago",
                  },
                ].map(
                  (session, index) => (
                    <div
                      key={session.device}
                      className="session-row"
                    >

                      <div>
                        <div className="session-row__device">
                          {session.device}
                        </div>

                        <div className="session-row__meta">
                          {session.place} ·{" "}
                          {session.active}
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn-link-danger"
                        onClick={() =>
                          handleSignOut(
                            index
                          )
                        }
                        disabled={signedOutSessions.includes(
                          index
                        )}
                      >
                        {signedOutSessions.includes(
                          index
                        )
                          ? "Signed out"
                          : signOutConfirm ===
                            index
                          ? "Confirm sign out"
                          : "Sign out"}
                      </button>

                    </div>
                  )
                )}

              </div>

              {/* Delete */}

              <div className="danger-zone">

                <div className="danger-zone__title">
                  Delete account
                </div>

                <p className="danger-zone__description">
                  This permanently removes your
                  profile, files, and history.
                  This cannot be undone.
                </p>

                <button
                  type="button"
                  className="btn-ghost btn-ghost--danger"
                  onClick={
                    handleDeleteAccount
                  }
                >
                  {deleteConfirm
                    ? "Confirm delete"
                    : "Delete account"}
                </button>

              </div>

            </div>

          </section>
        )}

        {/* ===================================================
            FOOTER
            =================================================== */}

        <div className="settings-content__footer">

          <div className="settings-content__footer-status">

            <span className="status-dot" />

            {toast ||
              "Your settings are private"}

          </div>

          <div className="settings-content__footer-actions">

            <button
              type="button"
              className="btn-discard"
              onClick={handleCancel}
              disabled={!isDirty}
            >
              Discard
            </button>

            <button
              type="button"
              className="btn-save"
              onClick={handleSave}
              disabled={!isDirty}
            >
              Save changes
            </button>

          </div>

        </div>

      </main>

      {/* Toast */}

      {toast && !isDirty && (
        <div
          className="toast-message"
          role="status"
          aria-live="polite"
        >
          {toast}
        </div>
      )}

    </div>
  );
}
import { useEffect, useMemo, useState } from "react";
import {
  User,
  Lock,
  Globe,
  Bell,
  ShieldCheck,
  Mail,
  Phone,
  Camera,
  KeyRound,
  Smartphone,
  CheckCircle2,
  Eye,
  EyeOff,
  LogOut,
  RotateCcw,
  Save,
  AlertTriangle,
  Monitor,
  Trash2,
  MessageSquare,
  Check,
} from "lucide-react";

import { Card, SectionHead } from "../components/Ui.jsx";

/* =========================================================
   STORAGE
========================================================= */

const STORAGE_KEY = "bambardara_settings";

const DEFAULT_SETTINGS = {
  profile: {
    name: "Shubhankar",
    email: "shubhankar@example.com",
    phone: "+91 98765 43210",
    photo: "",
  },

  security: {
    twoFactorEnabled: false,
    password: "Demo@12345",
  },

  preferences: {
    timezone: "Asia/Kolkata",
    language: "English",
    dateFormat: "DD/MM/YYYY",
    currency: "INR (₹)",
  },

  notifications: {
    email: true,
    inApp: true,
    sms: false,
  },

  sessions: [
    {
      id: 1,
      device: "Windows PC",
      browser: "Chrome",
      location: "Pune, India",
      current: true,
      lastActive: "Active now",
    },
    {
      id: 2,
      device: "Android Phone",
      browser: "Chrome Mobile",
      location: "Pune, India",
      current: false,
      lastActive: "2 hours ago",
    },
  ],
};

/* =========================================================
   HELPERS
========================================================= */

function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return DEFAULT_SETTINGS;
    }

    const parsed = JSON.parse(saved);

    return {
      ...DEFAULT_SETTINGS,
      ...parsed,
      profile: {
        ...DEFAULT_SETTINGS.profile,
        ...(parsed.profile || {}),
      },
      security: {
        ...DEFAULT_SETTINGS.security,
        ...(parsed.security || {}),
      },
      preferences: {
        ...DEFAULT_SETTINGS.preferences,
        ...(parsed.preferences || {}),
      },
      notifications: {
        ...DEFAULT_SETTINGS.notifications,
        ...(parsed.notifications || {}),
      },
      sessions: parsed.sessions || DEFAULT_SETTINGS.sessions,
    };
  } catch (error) {
    console.error("Unable to load settings:", error);
    return DEFAULT_SETTINGS;
  }
}

function saveSettingsToStorage(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

/* =========================================================
   NAVIGATION
========================================================= */

const settingsTabs = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "security",
    label: "Security",
    icon: ShieldCheck,
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: Globe,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
];

/* =========================================================
   MAIN PAGE
========================================================= */

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const [settings, setSettings] = useState(() => loadSettings());

  const [savedSettings, setSavedSettings] = useState(() =>
    deepClone(loadSettings())
  );

  const [message, setMessage] = useState(null);

  const [passwordData, setPasswordData] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");

  const [show2FASetup, setShow2FASetup] = useState(false);

  const [twoFactorCode, setTwoFactorCode] = useState("");

  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const hasUnsavedChanges = useMemo(() => {
    return (
      JSON.stringify(settings) !== JSON.stringify(savedSettings)
    );
  }, [settings, savedSettings]);

  /* =========================================================
     SUCCESS MESSAGE
  ========================================================= */

  const showMessage = (text, type = "success") => {
    setMessage({
      text,
      type,
    });

    setTimeout(() => {
      setMessage(null);
    }, 3500);
  };

  /* =========================================================
     SAVE SETTINGS
  ========================================================= */

  const saveAllSettings = () => {
    saveSettingsToStorage(settings);

    setSavedSettings(deepClone(settings));

    showMessage("Settings saved successfully.");
  };

  /* =========================================================
     RESET CURRENT SECTION
  ========================================================= */

  const resetCurrentSection = () => {
    const confirmed = window.confirm(
      "Are you sure you want to discard changes in this section?"
    );

    if (!confirmed) return;

    setSettings((prev) => ({
      ...prev,
      [activeTab]: deepClone(savedSettings[activeTab]),
    }));

    setPasswordError("");

    showMessage("Changes discarded.", "info");
  };

  /* =========================================================
     PROFILE
  ========================================================= */

  const updateProfile = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showMessage("Please select a valid image file.", "error");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showMessage("Image size must be less than 2 MB.", "error");
      return;
    }

    setUploadingPhoto(true);

    const reader = new FileReader();

    reader.onload = () => {
      updateProfile("photo", reader.result);
      setUploadingPhoto(false);

      showMessage(
        "Profile photo uploaded. Click Save Changes to keep it."
      );
    };

    reader.onerror = () => {
      setUploadingPhoto(false);
      showMessage("Unable to upload image.", "error");
    };

    reader.readAsDataURL(file);
  };

  /* =========================================================
     PASSWORD
  ========================================================= */

  const updatePasswordField = (field, value) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setPasswordError("");
  };

  const changePassword = () => {
    const { current, newPassword, confirm } = passwordData;

    if (!current || !newPassword || !confirm) {
      setPasswordError("Please fill all password fields.");
      return;
    }

    if (current !== settings.security.password) {
      setPasswordError("Current password is incorrect.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError(
        "New password must contain at least 8 characters."
      );
      return;
    }

    if (newPassword === current) {
      setPasswordError(
        "New password must be different from your current password."
      );
      return;
    }

    if (newPassword !== confirm) {
      setPasswordError("New passwords do not match.");
      return;
    }

    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        password: newPassword,
      },
    }));

    setPasswordData({
      current: "",
      newPassword: "",
      confirm: "",
    });

    showMessage(
      "Password changed successfully. Click Save Changes to persist it."
    );
  };

  /* =========================================================
     2FA
  ========================================================= */

  const start2FASetup = () => {
    if (settings.security.twoFactorEnabled) {
      const confirmed = window.confirm(
        "Disable two-factor authentication?"
      );

      if (!confirmed) return;

      setSettings((prev) => ({
        ...prev,
        security: {
          ...prev.security,
          twoFactorEnabled: false,
        },
      }));

      showMessage("Two-factor authentication disabled.", "info");

      return;
    }

    setShow2FASetup(true);
    setTwoFactorCode("");
  };

  const verify2FA = () => {
    if (twoFactorCode !== "123456") {
      showMessage(
        "Invalid verification code. Use 123456 for this demo.",
        "error"
      );
      return;
    }

    setSettings((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        twoFactorEnabled: true,
      },
    }));

    setShow2FASetup(false);

    showMessage(
      "Two-factor authentication enabled successfully."
    );
  };

  /* =========================================================
     SESSION MANAGEMENT
  ========================================================= */

  const logoutSession = (sessionId) => {
    const confirmed = window.confirm(
      "Sign out this device/session?"
    );

    if (!confirmed) return;

    setSettings((prev) => ({
      ...prev,
      sessions: prev.sessions.filter(
        (session) => session.id !== sessionId
      ),
    }));

    showMessage("Session removed successfully.", "info");
  };

  const logoutOtherSessions = () => {
    const confirmed = window.confirm(
      "This will sign out all other devices. Continue?"
    );

    if (!confirmed) return;

    setSettings((prev) => ({
      ...prev,
      sessions: prev.sessions.filter(
        (session) => session.current
      ),
    }));

    showMessage("All other sessions have been signed out.");
  };

  /* =========================================================
     PREFERENCES
  ========================================================= */

  const updatePreference = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value,
      },
    }));
  };

  /* =========================================================
     NOTIFICATIONS
  ========================================================= */

  const toggleNotification = (field) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field],
      },
    }));
  };

  const testNotification = (type) => {
    if (type === "email") {
      showMessage(
        "Test email notification sent successfully."
      );
    }

    if (type === "inApp") {
      showMessage(
        "This is a test in-app notification."
      );
    }

    if (type === "sms") {
      showMessage(
        "Test SMS notification sent successfully."
      );
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#F6F8F6] text-[#173B2B]">

      {/* PAGE HEADER */}

      <div className="mb-6">

        <SectionHead
          title="Settings"
          tag="Account & Preferences"
        />

        <p className="text-[13px] text-[#6B7B72] mt-1">
          Manage your profile, security, preferences and
          notification settings.
        </p>

      </div>

      {/* GLOBAL MESSAGE */}

      {message && (
        <div
          className={`
            mb-5
            px-4 py-3
            rounded-lg
            border
            flex items-center gap-3
            text-[12.5px]
            ${
              message.type === "error"
                ? "bg-[#FFF5F5] border-[#F1CCCC] text-[#A33A3A]"
                : message.type === "info"
                ? "bg-[#F3F7F5] border-[#D6E2DB] text-[#416454]"
                : "bg-[#F0F7F2] border-[#C8DED0] text-[#2F7651]"
            }
          `}
        >

          {message.type === "error" ? (
            <AlertTriangle size={16} />
          ) : (
            <CheckCircle2 size={16} />
          )}

          {message.text}

        </div>
      )}

      {/* HORIZONTAL NAVIGATION */}

      <Card className="p-2 mb-6">

        <div className="flex items-center gap-1 overflow-x-auto">

          {settingsTabs.map((tab) => {
            const Icon = tab.icon;

            const isActive =
              activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-2
                  px-5 py-3
                  rounded-lg
                  text-[13px]
                  font-medium
                  whitespace-nowrap
                  transition-all
                  ${
                    isActive
                      ? "bg-[#173B2B] text-white"
                      : "text-[#5F7067] hover:bg-[#EEF3EF]"
                  }
                `}
              >
                <Icon size={16} />

                {tab.label}

              </button>
            );
          })}

        </div>

      </Card>

      {/* UNSAVED CHANGES */}

      {hasUnsavedChanges && (
        <div className="mb-5 flex items-center justify-between gap-4 bg-[#FFF9EC] border border-[#EAD9A8] rounded-lg px-4 py-3">

          <div className="flex items-center gap-2 text-[12px] text-[#806B32]">

            <AlertTriangle size={16} />

            You have unsaved changes.

          </div>

          <div className="flex gap-2">

            <button
              onClick={resetCurrentSection}
              className="
                px-3 py-1.5
                rounded-md
                border border-[#D8D1BD]
                text-[11.5px]
                flex items-center gap-1.5
              "
            >
              <RotateCcw size={13} />

              Discard
            </button>

            <button
              onClick={saveAllSettings}
              className="
                px-3 py-1.5
                rounded-md
                bg-[#173B2B]
                text-white
                text-[11.5px]
                flex items-center gap-1.5
              "
            >
              <Save size={13} />

              Save
            </button>

          </div>

        </div>
      )}

      {/* =====================================================
          PROFILE
      ===================================================== */}

      {activeTab === "profile" && (
        <Card className="p-6">

          <SettingsHeader
            title="Personal Information"
            description="Update your basic account and contact information."
          />

          <div className="flex flex-col md:flex-row gap-8">

            {/* PHOTO */}

            <div className="flex flex-col items-center md:w-[180px]">

              <div className="relative">

                <div className="w-28 h-28 rounded-full bg-[#DCE8E0] flex items-center justify-center overflow-hidden border-4 border-white shadow-sm">

                  {settings.profile.photo ? (
                    <img
                      src={settings.profile.photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User
                      size={48}
                      className="text-[#416454]"
                    />
                  )}

                </div>

                <label
                  className="
                    absolute bottom-0 right-0
                    w-9 h-9
                    rounded-full
                    bg-[#173B2B]
                    text-white
                    flex items-center justify-center
                    cursor-pointer
                    shadow-md
                  "
                >

                  <Camera size={16} />

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />

                </label>

              </div>

              <p className="text-[12px] text-[#7A8981] mt-3 text-center">
                {uploadingPhoto
                  ? "Uploading..."
                  : "JPG, PNG or WEBP\nMaximum size 2 MB"}
              </p>

              {settings.profile.photo && (
                <button
                  onClick={() =>
                    updateProfile("photo", "")
                  }
                  className="mt-2 text-[11px] text-[#A33A3A] hover:underline"
                >
                  Remove photo
                </button>
              )}

            </div>

            {/* FORM */}

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">

              <InputField
                label="Full Name"
                value={settings.profile.name}
                onChange={(e) =>
                  updateProfile(
                    "name",
                    e.target.value
                  )
                }
              />

              <InputField
                label="Email Address"
                icon={<Mail size={15} />}
                value={settings.profile.email}
                onChange={(e) =>
                  updateProfile(
                    "email",
                    e.target.value
                  )
                }
              />

              <InputField
                label="Phone Number"
                icon={<Phone size={15} />}
                value={settings.profile.phone}
                onChange={(e) =>
                  updateProfile(
                    "phone",
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          <ActionButtons
            onReset={resetCurrentSection}
            onSave={saveAllSettings}
          />

        </Card>
      )}

      {/* =====================================================
          SECURITY
      ===================================================== */}

      {activeTab === "security" && (
        <div className="space-y-5">

          {/* PASSWORD */}

          <Card className="p-6">

            <SettingsHeader
              title="Change Password"
              description="Update your account password."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <PasswordField
                label="Current Password"
                value={passwordData.current}
                visible={showCurrentPassword}
                onToggle={() =>
                  setShowCurrentPassword(
                    !showCurrentPassword
                  )
                }
                onChange={(e) =>
                  updatePasswordField(
                    "current",
                    e.target.value
                  )
                }
              />

              <div />

              <PasswordField
                label="New Password"
                value={passwordData.newPassword}
                visible={showNewPassword}
                onToggle={() =>
                  setShowNewPassword(
                    !showNewPassword
                  )
                }
                onChange={(e) =>
                  updatePasswordField(
                    "newPassword",
                    e.target.value
                  )
                }
              />

              <PasswordField
                label="Confirm New Password"
                value={passwordData.confirm}
                visible={showConfirmPassword}
                onToggle={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                onChange={(e) =>
                  updatePasswordField(
                    "confirm",
                    e.target.value
                  )
                }
              />

            </div>

            {passwordError && (
              <div className="mt-4 text-[12px] text-[#A33A3A] flex items-center gap-2">

                <AlertTriangle size={14} />

                {passwordError}

              </div>
            )}

            <div className="flex justify-end mt-6">

              <button
                onClick={changePassword}
                className="
                  px-5 py-2.5
                  rounded-lg
                  bg-[#173B2B]
                  text-white
                  text-[12.5px]
                  font-medium
                "
              >
                Change Password
              </button>

            </div>

          </Card>

          {/* 2FA */}

          <Card className="p-6">

            <div className="flex items-center justify-between">

              <div className="flex gap-4">

                <SecurityIcon icon={<Smartphone size={18} />} />

                <div>

                  <h2 className="text-[15px] font-semibold">
                    Two-Factor Authentication
                  </h2>

                  <p className="text-[12px] text-[#7A8981] mt-1">
                    Protect your account with an additional
                    verification step.
                  </p>

                </div>

              </div>

              <Toggle
                enabled={
                  settings.security.twoFactorEnabled
                }
                onClick={start2FASetup}
              />

            </div>

            {show2FASetup && (
              <div className="mt-5 p-5 rounded-lg bg-[#F7F9F7] border border-[#E1E8E2]">

                <h3 className="text-[13px] font-semibold">
                  Verify Two-Factor Authentication
                </h3>

                <p className="text-[12px] text-[#7A8981] mt-1">
                  Enter the 6-digit verification code.
                  For this demo use <b>123456</b>.
                </p>

                <div className="flex gap-3 mt-4">

                  <input
                    value={twoFactorCode}
                    onChange={(e) =>
                      setTwoFactorCode(
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6)
                      )
                    }
                    placeholder="123456"
                    className="
                      h-10
                      w-36
                      px-3
                      rounded-lg
                      border border-[#DDE5DF]
                      text-[13px]
                      outline-none
                    "
                  />

                  <button
                    onClick={verify2FA}
                    className="
                      px-4
                      rounded-lg
                      bg-[#173B2B]
                      text-white
                      text-[12px]
                    "
                  >
                    Verify & Enable
                  </button>

                  <button
                    onClick={() =>
                      setShow2FASetup(false)
                    }
                    className="
                      px-4
                      rounded-lg
                      border border-[#DDE5DF]
                      text-[12px]
                    "
                  >
                    Cancel
                  </button>

                </div>

              </div>
            )}

          </Card>

          {/* SESSIONS */}

          <Card className="p-6">

            <div className="flex items-center justify-between mb-5">

              <div>

                <h2 className="text-[15px] font-semibold">
                  Active Sessions
                </h2>

                <p className="text-[12px] text-[#7A8981] mt-1">
                  Devices currently signed into your account.
                </p>

              </div>

              <button
                onClick={logoutOtherSessions}
                className="
                  px-3 py-2
                  rounded-lg
                  border border-[#E0C7C7]
                  text-[#A33A3A]
                  text-[11.5px]
                  flex items-center gap-2
                "
              >
                <LogOut size={14} />

                Sign out other devices
              </button>

            </div>

            <div className="space-y-3">

              {settings.sessions.map((session) => (
                <div
                  key={session.id}
                  className="
                    flex items-center justify-between
                    p-4
                    rounded-lg
                    bg-[#F7F9F7]
                    border border-[#E4EAE5]
                  "
                >

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                      <Monitor size={18} />
                    </div>

                    <div>

                      <div className="flex items-center gap-2">

                        <span className="text-[13px] font-medium">
                          {session.device}
                        </span>

                        {session.current && (
                          <span className="px-2 py-0.5 rounded-full bg-[#E3F1E7] text-[#2F7651] text-[9px]">
                            Current
                          </span>
                        )}

                      </div>

                      <p className="text-[11px] text-[#7A8981] mt-1">
                        {session.browser} · {session.location}
                      </p>

                    </div>

                  </div>

                  {!session.current && (
                    <button
                      onClick={() =>
                        logoutSession(session.id)
                      }
                      className="text-[#A33A3A]"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}

                </div>
              ))}

            </div>

          </Card>

        </div>
      )}

      {/* =====================================================
          PREFERENCES
      ===================================================== */}

      {activeTab === "preferences" && (
        <div className="space-y-5">

          <Card className="p-6">

            <SettingsHeader
              title="Regional Preferences"
              description="Configure timezone, language, date and currency formats."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <SelectField
                label="Timezone"
                value={
                  settings.preferences.timezone
                }
                onChange={(e) =>
                  updatePreference(
                    "timezone",
                    e.target.value
                  )
                }
                options={[
                  "Asia/Kolkata",
                  "Asia/Dubai",
                  "Asia/Singapore",
                  "Europe/London",
                  "America/New_York",
                ]}
              />

              <SelectField
                label="Language"
                value={
                  settings.preferences.language
                }
                onChange={(e) =>
                  updatePreference(
                    "language",
                    e.target.value
                  )
                }
                options={[
                  "English",
                  "Hindi",
                  "Marathi",
                ]}
              />

              <SelectField
                label="Date Format"
                value={
                  settings.preferences.dateFormat
                }
                onChange={(e) =>
                  updatePreference(
                    "dateFormat",
                    e.target.value
                  )
                }
                options={[
                  "DD/MM/YYYY",
                  "MM/DD/YYYY",
                  "YYYY-MM-DD",
                ]}
              />

              <SelectField
                label="Currency Format"
                value={
                  settings.preferences.currency
                }
                onChange={(e) =>
                  updatePreference(
                    "currency",
                    e.target.value
                  )
                }
                options={[
                  "INR (₹)",
                  "USD ($)",
                  "EUR (€)",
                  "GBP (£)",
                ]}
              />

            </div>

            <ActionButtons
              onReset={resetCurrentSection}
              onSave={saveAllSettings}
            />

          </Card>

          {/* LIVE PREVIEW */}

          <Card className="p-6">

            <h3 className="text-[14px] font-semibold mb-4">
              Format Preview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <PreviewBox
                label="Date"
                value={formatDate(
                  settings.preferences.dateFormat
                )}
              />

              <PreviewBox
                label="Currency"
                value={formatCurrency(
                  settings.preferences.currency
                )}
              />

              <PreviewBox
                label="Timezone"
                value={
                  settings.preferences.timezone
                }
              />

            </div>

          </Card>

        </div>
      )}

      {/* =====================================================
          NOTIFICATIONS
      ===================================================== */}

      {activeTab === "notifications" && (
        <div className="space-y-5">

          <Card className="p-6">

            <SettingsHeader
              title="Notification Preferences"
              description="Choose how you want to receive dashboard updates and alerts."
            />

            <NotificationRow
              icon={<Mail size={18} />}
              title="Email Notifications"
              description="Receive account updates, reports and important alerts through email."
              enabled={
                settings.notifications.email
              }
              onClick={() =>
                toggleNotification("email")
              }
              onTest={() =>
                testNotification("email")
              }
            />

            <NotificationRow
              icon={<Bell size={18} />}
              title="In-App Notifications"
              description="Show notifications directly inside the dashboard."
              enabled={
                settings.notifications.inApp
              }
              onClick={() =>
                toggleNotification("inApp")
              }
              onTest={() =>
                testNotification("inApp")
              }
            />

            <NotificationRow
              icon={<MessageSquare size={18} />}
              title="SMS Notifications"
              description="Receive critical alerts and important updates through SMS."
              enabled={
                settings.notifications.sms
              }
              onClick={() =>
                toggleNotification("sms")
              }
              onTest={() =>
                testNotification("sms")
              }
            />

            <ActionButtons
              onReset={resetCurrentSection}
              onSave={saveAllSettings}
            />

          </Card>

          {/* CATEGORIES */}

          <Card className="p-6">

            <h3 className="text-[14px] font-semibold mb-4">
              Notification Categories
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              {[
                "Financial Alerts",
                "Investment Updates",
                "Pending Approvals",
                "Project Milestones",
                "Security Alerts",
                "Management Decisions",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex items-center gap-3
                    p-3
                    rounded-lg
                    bg-[#F7F9F7]
                    border border-[#E4EAE5]
                  "
                >

                  <CheckCircle2
                    size={15}
                    className="text-[#416454]"
                  />

                  <span className="text-[12.5px]">
                    {item}
                  </span>

                </div>
              ))}

            </div>

          </Card>

        </div>
      )}

    </div>
  );
}

/* =========================================================
   REUSABLE COMPONENTS
========================================================= */

function SettingsHeader({
  title,
  description,
}) {
  return (
    <div className="mb-6">

      <h2 className="text-[16px] font-semibold">
        {title}
      </h2>

      <p className="text-[12px] text-[#7A8981] mt-1">
        {description}
      </p>

    </div>
  );
}

function SecurityIcon({ icon }) {
  return (
    <div className="w-10 h-10 rounded-lg bg-[#EEF3EF] flex items-center justify-center text-[#173B2B]">
      {icon}
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  type = "text",
  icon,
}) {
  return (
    <div>

      <label className="block text-[12px] font-medium text-[#52635A] mb-2">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#839188]">
            {icon}
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`
            w-full
            h-10
            rounded-lg
            border border-[#DDE5DF]
            bg-white
            text-[13px]
            text-[#173B2B]
            outline-none
            focus:border-[#416454]
            focus:ring-2
            focus:ring-[#416454]/10
            ${icon ? "pl-9" : "px-3"}
          `}
        />

      </div>

    </div>
  );
}

function PasswordField({
  label,
  value,
  visible,
  onToggle,
  onChange,
}) {
  return (
    <div>

      <label className="block text-[12px] font-medium text-[#52635A] mb-2">
        {label}
      </label>

      <div className="relative">

        <KeyRound
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#839188]"
        />

        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="
            w-full
            h-10
            pl-9
            pr-10
            rounded-lg
            border border-[#DDE5DF]
            bg-white
            text-[13px]
            outline-none
            focus:border-[#416454]
          "
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8981]"
        >
          {visible ? (
            <EyeOff size={16} />
          ) : (
            <Eye size={16} />
          )}
        </button>

      </div>

    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>

      <label className="block text-[12px] font-medium text-[#52635A] mb-2">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="
          w-full
          h-10
          px-3
          rounded-lg
          border border-[#DDE5DF]
          bg-white
          text-[13px]
          text-[#173B2B]
          outline-none
          focus:border-[#416454]
        "
      >

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}

      </select>

    </div>
  );
}

function Toggle({
  enabled,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative
        w-11
        h-6
        rounded-full
        flex-shrink-0
        transition-colors
        ${
          enabled
            ? "bg-[#173B2B]"
            : "bg-[#CBD5CE]"
        }
      `}
    >

      <span
        className={`
          absolute
          top-1
          w-4
          h-4
          bg-white
          rounded-full
          shadow-sm
          transition-transform
          ${
            enabled
              ? "translate-x-6"
              : "translate-x-1"
          }
        `}
      />

    </button>
  );
}

function NotificationRow({
  icon,
  title,
  description,
  enabled,
  onClick,
  onTest,
}) {
  return (
    <div className="flex items-center justify-between gap-5 py-5 border-b border-[#E8EDE9]">

      <div className="flex items-start gap-4">

        <div className="w-10 h-10 rounded-lg bg-[#EEF3EF] flex items-center justify-center text-[#416454]">
          {icon}
        </div>

        <div>

          <h3 className="text-[13.5px] font-medium">
            {title}
          </h3>

          <p className="text-[12px] text-[#7A8981] mt-1 max-w-[600px]">
            {description}
          </p>

          <button
            onClick={onTest}
            className="
              mt-2
              text-[10.5px]
              text-[#416454]
              hover:underline
            "
          >
            Send test notification
          </button>

        </div>

      </div>

      <Toggle
        enabled={enabled}
        onClick={onClick}
      />

    </div>
  );
}

function ActionButtons({
  onReset,
  onSave,
}) {
  return (
    <div className="flex justify-end gap-2 mt-6">

      <button
        onClick={onReset}
        className="
          px-4 py-2.5
          rounded-lg
          border border-[#DDE5DF]
          text-[#52635A]
          text-[12px]
          flex items-center gap-2
          hover:bg-[#F5F7F5]
        "
      >

        <RotateCcw size={14} />

        Reset

      </button>

      <button
        onClick={onSave}
        className="
          px-5 py-2.5
          rounded-lg
          bg-[#173B2B]
          text-white
          text-[12.5px]
          font-medium
          flex items-center gap-2
          hover:bg-[#28533F]
        "
      >

        <Save size={14} />

        Save Changes

      </button>

    </div>
  );
}

function PreviewBox({
  label,
  value,
}) {
  return (
    <div className="p-4 rounded-lg bg-[#F7F9F7] border border-[#E4EAE5]">

      <p className="text-[11px] text-[#7A8981] mb-1">
        {label}
      </p>

      <p className="text-[13px] font-medium">
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   FORMATTERS
========================================================= */

function formatDate(format) {
  const day = "15";
  const month = "09";
  const year = "2026";

  if (format === "MM/DD/YYYY") {
    return `${month}/${day}/${year}`;
  }

  if (format === "YYYY-MM-DD") {
    return `${year}-${month}-${day}`;
  }

  return `${day}/${month}/${year}`;
}

function formatCurrency(currency) {
  if (currency.startsWith("USD")) {
    return "$12,50,000";
  }

  if (currency.startsWith("EUR")) {
    return "€12,50,000";
  }

  if (currency.startsWith("GBP")) {
    return "£12,50,000";
  }

  return "₹12,50,000";
}
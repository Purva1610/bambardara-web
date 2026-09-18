import { useEffect, useRef, useState } from 'react'
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
  Check,
  LayoutDashboard,
  FolderKanban,
  HardHat,
  Wallet,
  ShoppingCart,
  Megaphone,
  TrendingUp,
  Users,
  ClipboardCheck,
  BarChart3,
  FileText,
  AlertTriangle,
  MessageSquare,
  CalendarDays,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  Monitor,
  CheckCheck,
  ShieldCheck,
} from 'lucide-react'

const RANGES = [
  'Last 7 Days',
  'Last 30 Days',
  'This Quarter',
  'Year to Date',
]

const NAVIGATION = [
  {
    group: 'Management',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, page: 'dashboard' },
      { name: 'Projects', icon: FolderKanban, page: 'projects' },
      { name: 'Construction', icon: HardHat, page: 'construction' },
      { name: 'Finance', icon: Wallet, page: 'finance' },
      { name: 'Procurement', icon: ShoppingCart, page: 'procurement' },
      { name: 'Sales & Marketing', icon: Megaphone, page: 'sales-marketing' },
      { name: 'Investments', icon: TrendingUp, page: 'investments' },
      { name: 'Human Resources', icon: Users, page: 'hr' },
      { name: 'Teams & Roles', icon: ShieldCheck, page: 'teams-roles' },
    ],
  },
  {
    group: 'Management Actions',
    items: [
      { name: 'Approvals', icon: ClipboardCheck, page: 'approvals' },
      { name: 'Reports', icon: BarChart3, page: 'reports' },
      { name: 'Documents', icon: FileText, page: 'documents' },
      { name: 'Risks & Issues', icon: AlertTriangle, page: 'risks-issues' },
      { name: 'Communications', icon: MessageSquare, page: 'communications' },
      { name: 'Calendar', icon: CalendarDays, page: 'calendar' },
      { name: 'Settings', icon: Settings, page: 'settings' },
    ],
  },
]

/* =========================
   DATE RANGE
========================= */

function DateRangeSelector({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSelect = (range) => {
    onChange?.(range)
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 items-center gap-2 rounded-md border border-white/10 bg-navy px-3 text-xs font-medium text-white transition-colors hover:bg-white/10 sm:text-sm"
      >
        {value || 'Last 7 Days'}

        <ChevronDown
          size={14}
          className={`transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-[100] w-48 overflow-hidden rounded-lg border border-white/10 bg-navy p-1 shadow-xl">
          {RANGES.map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => handleSelect(range)}
              className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm text-white transition-colors hover:bg-white/10"
            >
              <span>{range}</span>

              {range === value && (
                <Check size={14} className="text-accent" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* =========================
   GLOBAL SEARCH
========================= */

function GlobalSearch({ onNavigate }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const results = NAVIGATION
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((group) => group.items.length > 0)

  const handleResultClick = (page) => {
    if (onNavigate) {
      onNavigate(page)
    }

    setQuery('')
    setOpen(false)
  }

  return (
    <div className="relative" ref={ref}>

      {/* Desktop Search */}
      <div className="relative hidden sm:block">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9FB3AE]"
        />

        <input
          type="text"
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          placeholder="Search anything..."
          className="h-9 w-40 rounded-md border border-white/10 bg-navy px-9 text-xs text-white outline-none placeholder:text-[#9FB3AE] focus:border-accent sm:w-48 lg:w-56"
        />
      </div>

      {/* Mobile Search */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-[#9FB3AE] hover:bg-white/10 hover:text-white sm:hidden"
      >
        <Search size={18} />
      </button>

      {/* Search Dropdown */}
      {open && (
        <div className="absolute right-0 top-11 z-[100] w-80 overflow-hidden rounded-xl border border-white/10 bg-navy shadow-xl">

          <div className="border-b border-white/10 p-2 sm:hidden">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 px-3">
              <Search
                size={15}
                className="text-[#9FB3AE]"
              />

              <input
                autoFocus
                type="text"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setOpen(true)
                }}
                placeholder="Search anything..."
                className="h-10 w-full bg-transparent text-sm text-white outline-none placeholder:text-[#9FB3AE]"
              />
            </div>
          </div>

          <SearchResults
            results={results}
            query={query}
            onNavigate={handleResultClick}
          />
        </div>
      )}
    </div>
  )
}

/* =========================
   SEARCH RESULTS
========================= */

function SearchResults({ results, query, onNavigate }) {
  if (!query.trim()) {
    return (
      <div className="px-4 py-6 text-center text-xs text-[#9FB3AE]">
        Search Dashboard, Projects, Finance, HR, Reports and more...
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="px-4 py-6 text-center text-sm text-[#9FB3AE]">
        No results found for "{query}"
      </div>
    )
  }

  return (
    <div className="max-h-80 overflow-y-auto p-2">
      {results.map((group) => (
        <div key={group.group} className="mb-3 last:mb-0">

          <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#9FB3AE]">
            {group.group}
          </p>

          {group.items.map((item) => {
            const Icon = item.icon

            return (
              <button
                key={item.name}
                type="button"
                onClick={() => onNavigate(item.page)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-white transition-colors hover:bg-white/10"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent">
                  <Icon size={16} />
                </span>

                <span>{item.name}</span>
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

/* =========================
   NOTIFICATION PANEL
========================= */

function NotificationPanel({ open, onClose }) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Management updates',
      text: 'No new management notifications.',
      unread: true,
    },
  ])

  if (!open) return null

  const markAllRead = () => {
    setNotifications((items) =>
      items.map((item) => ({
        ...item,
        unread: false,
      }))
    )
  }

  const unreadCount = notifications.filter(
    (item) => item.unread
  ).length

  return (
    <div className="absolute right-16 top-12 z-[100] w-80 overflow-hidden rounded-xl border border-white/10 bg-navy shadow-xl">

      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">

        <div>
          <p className="text-sm font-semibold text-white">
            Notifications
          </p>

          <p className="mt-1 text-xs text-[#9FB3AE]">
            Management updates
          </p>
        </div>

        <div className="flex items-center gap-1">

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllRead}
              title="Mark all as read"
              className="rounded-md p-2 text-[#9FB3AE] hover:bg-white/10 hover:text-white"
            >
              <CheckCheck size={15} />
            </button>
          )}

          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-xs text-[#9FB3AE] hover:bg-white/10 hover:text-white"
          >
            Close
          </button>

        </div>
      </div>

      <div className="p-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-lg p-3 ${
                notification.unread
                  ? 'bg-white/10'
                  : 'bg-white/5'
              }`}
            >
              <div className="flex items-start gap-2">

                {notification.unread && (
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" />
                )}

                <div>
                  <p className="text-sm font-medium text-white">
                    {notification.title}
                  </p>

                  <p className="mt-1 text-xs text-[#9FB3AE]">
                    {notification.text}
                  </p>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg bg-white/5 p-4 text-center">
            <p className="text-sm font-medium text-white">
              No new notifications
            </p>

            <p className="mt-1 text-xs text-[#9FB3AE]">
              You're all caught up.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

/* =========================
   PROFILE MENU
========================= */

function ProfileMenu({
  open,
  onClose,
  onNavigate,
  onNotificationClick,
}) {
  const [showProfile, setShowProfile] = useState(false)
  const [showAppearance, setShowAppearance] = useState(false)
  const [appearance, setAppearance] = useState('System')

  useEffect(() => {
    if (!open) {
      setShowProfile(false)
      setShowAppearance(false)
    }
  }, [open])

  if (!open) return null

  const handleNavigation = (page) => {
    onNavigate?.(page)
    onClose()
  }

  const handleAppearance = (value) => {
    setAppearance(value)
  }

  return (
    <div className="absolute right-0 top-12 z-[100] w-64 overflow-hidden rounded-xl border border-white/10 bg-navy shadow-xl">

      {/* Profile Header */}
      <div className="border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-accent">
            MD
          </div>

          <div className="leading-tight">
            <p className="text-sm font-semibold text-white">
              Managing Director
            </p>

            <p className="mt-1 text-xs text-[#9FB3AE]">
              MD Profile
            </p>
          </div>

        </div>
      </div>

      <div className="p-2">

        {/* My Profile */}
        <button
          type="button"
          onClick={() => setShowProfile((prev) => !prev)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
        >
          <User
            size={16}
            strokeWidth={1.75}
            className="text-accent"
          />

          My Profile

          <ChevronDown
            size={14}
            className={`ml-auto text-[#9FB3AE] transition-transform ${
              showProfile ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Profile Details */}
        {showProfile && (
          <div className="mx-2 mb-1 rounded-lg bg-white/5 px-3 py-3">

            <div className="space-y-2 text-xs">

              <div className="flex justify-between gap-3">
                <span className="text-[#9FB3AE]">
                  Role
                </span>

                <span className="text-white">
                  Managing Director
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-[#9FB3AE]">
                  Department
                </span>

                <span className="text-white">
                  Management
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-[#9FB3AE]">
                  Access
                </span>

                <span className="text-accent">
                  Executive
                </span>
              </div>

            </div>

          </div>
        )}

        {/* Account Settings */}
        <button
          type="button"
          onClick={() => handleNavigation('settings')}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
        >
          <Settings
            size={16}
            strokeWidth={1.75}
            className="text-accent"
          />

          Account Settings
        </button>

        {/* Notifications */}
        <button
          type="button"
          onClick={() => {
            onNotificationClick?.()
            onClose()
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
        >
          <Bell
            size={16}
            strokeWidth={1.75}
            className="text-accent"
          />

          Notifications
        </button>

        {/* Appearance */}
        <button
          type="button"
          onClick={() => setShowAppearance((prev) => !prev)}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
        >
          <Sun
            size={16}
            strokeWidth={1.75}
            className="text-accent"
          />

          Appearance

          <ChevronDown
            size={14}
            className={`ml-auto text-[#9FB3AE] transition-transform ${
              showAppearance ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Appearance Options */}
        {showAppearance && (
          <div className="mt-1 rounded-lg bg-white/5 p-2">

            <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-[#9FB3AE]">
              Theme
            </p>

            <div className="grid grid-cols-3 gap-1.5">

              <button
                type="button"
                onClick={() => handleAppearance('Light')}
                className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-2 text-[10px] ${
                  appearance === 'Light'
                    ? 'border-accent bg-accent/10 text-white'
                    : 'border-white/10 text-[#9FB3AE] hover:bg-white/10'
                }`}
              >
                <Sun size={14} />
                Light
              </button>

              <button
                type="button"
                onClick={() => handleAppearance('Dark')}
                className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-2 text-[10px] ${
                  appearance === 'Dark'
                    ? 'border-accent bg-accent/10 text-white'
                    : 'border-white/10 text-[#9FB3AE] hover:bg-white/10'
                }`}
              >
                <Moon size={14} />
                Dark
              </button>

              <button
                type="button"
                onClick={() => handleAppearance('System')}
                className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-2 text-[10px] ${
                  appearance === 'System'
                    ? 'border-accent bg-accent/10 text-white'
                    : 'border-white/10 text-[#9FB3AE] hover:bg-white/10'
                }`}
              >
                <Monitor size={14} />
                System
              </button>

            </div>

            <p className="px-2 pt-2 text-[10px] text-[#9FB3AE]">
              Selected: {appearance}
            </p>

          </div>
        )}

      </div>

      {/* Logout */}
      <div className="border-t border-white/10 p-2">

        <button
          type="button"
          onClick={() => {
            onNavigate?.('dashboard')
            onClose()
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-300 transition-colors hover:bg-white/10"
        >
          <LogOut
            size={16}
            strokeWidth={1.75}
          />

          Logout
        </button>

      </div>

    </div>
  )
}

/* =========================
   TOPBAR
========================= */

export default function Topbar({
  title,
  subtitle,
  onMenuClick,
  dateRange,
  onDateRangeChange,
  onNavigate,
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const handleNotificationToggle = () => {
    setNotificationsOpen((prev) => !prev)
    setProfileOpen(false)
  }

  const handleProfileToggle = () => {
    setProfileOpen((prev) => !prev)
    setNotificationsOpen(false)
  }

  return (
    <header className="fixed left-[240px] right-0 top-0 z-40 h-16 border-b border-white/10 bg-navy text-white">

      {/* NAVBAR CONTENT */}
      <div className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between gap-3 px-5 sm:px-7 lg:px-9">

        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-3">

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-[#9FB3AE] hover:bg-white/10 hover:text-white lg:hidden"
          >
            <Menu size={18} />
          </button>

          <div className="min-w-0">

            <p className="truncate font-serif text-lg text-white sm:text-xl">
              {title || 'Managing Director Dashboard'}
            </p>

            {subtitle && (
              <p className="hidden text-xs text-[#9FB3AE] sm:block">
                {subtitle}
              </p>
            )}

          </div>

        </div>

        {/* RIGHT */}
        <div className="relative flex shrink-0 items-center gap-1.5 sm:gap-3">

          {/* SEARCH */}
          <GlobalSearch onNavigate={onNavigate} />

          {/* DATE RANGE */}
          <div className="hidden sm:block">
            <DateRangeSelector
              value={dateRange || 'Last 7 Days'}
              onChange={onDateRangeChange}
            />
          </div>

          {/* NOTIFICATION */}
          <button
            type="button"
            aria-label="Notifications"
            onClick={handleNotificationToggle}
            className={`relative flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              notificationsOpen
                ? 'bg-white/10 text-white'
                : 'text-[#9FB3AE] hover:bg-white/10 hover:text-white'
            }`}
          >
            <Bell size={18} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
          </button>

          <NotificationPanel
            open={notificationsOpen}
            onClose={() => setNotificationsOpen(false)}
          />

          {/* DIVIDER */}
          <div className="mx-1 hidden h-6 w-px bg-white/10 sm:block" />

          {/* PROFILE */}
          <div className="relative">

            <button
              type="button"
              aria-label="Managing Director Profile"
              onClick={handleProfileToggle}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-accent text-sm font-semibold text-navy transition-transform hover:scale-105"
            >
              MD
            </button>

            <ProfileMenu
              open={profileOpen}
              onClose={() => setProfileOpen(false)}
              onNavigate={onNavigate}
              onNotificationClick={() => {
                setNotificationsOpen(true)
                setProfileOpen(false)
              }}
            />

          </div>

        </div>

      </div>

      {/* MOBILE DATE RANGE */}
      <div className="mx-auto w-full max-w-[1600px] border-t border-white/10 px-5 py-2 sm:hidden">
        <DateRangeSelector
          value={dateRange || 'Last 7 Days'}
          onChange={onDateRangeChange}
        />
      </div>

    </header>
  )
}


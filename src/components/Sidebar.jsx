import { useEffect, useState } from 'react'

import {
  LogOut,
  LayoutDashboard,
  FolderKanban,
  HardHat,
  Wallet,
  ShoppingCart,
  Megaphone,
  Users,
  ClipboardCheck,
  BarChart3,
  FileText,
  AlertTriangle,
  MessageSquare,
  CalendarDays,
  Settings,
  ChevronDown,
  Building2,
  TrendingUp,
  UserCog,
  ShieldCheck,
} from 'lucide-react'

import { navItems } from '../data.js'


const icons = {
  dashboard: LayoutDashboard,

  infrastructure: Building2,
  construction: HardHat,
  projects: FolderKanban,
  procurement: ShoppingCart,

  finance: Wallet,
  financeanalytics: BarChart3,
  financeinvestments: TrendingUp,
  financememberships: Wallet,

  hr: Users,
  hranalytics: BarChart3,
  hremployees: Users,
  TeamsAndRoles: UserCog,

  'sales-marketing': Megaphone,

  approvals: ClipboardCheck,

  'reports-documentation': FileText,
  reports: BarChart3,
  documents: FileText,

  'risks-issues': AlertTriangle,
  communications: MessageSquare,
  calendar: CalendarDays,
  settings: Settings,

  users : ShieldCheck,
  companyprofile : Building2,
}


export default function Sidebar({ active, onNavigate }) {

  const [openMenus, setOpenMenus] = useState({
    infrastructure: true,
    finance: true,
    hr: true,
    'reports-documentation': true,
  })


  useEffect(() => {

    navItems.forEach(item => {

      if (item.type === 'dropdown' && item.children) {

        const hasActiveChild = item.children.some(
          child => child.key === active
        )

        if (hasActiveChild) {
          setOpenMenus(prev => ({
            ...prev,
            [item.key]: true,
          }))
        }

      }

    })

  }, [active])


  const toggleMenu = (key) => {

    setOpenMenus(prev => ({
      ...prev,
      [key]: !prev[key],
    }))

  }


  const hasActiveChild = (item) => {

    if (!item.children) return false

    return item.children.some(
      child => child.key === active
    )

  }


  return (
    <aside
      className="
        bg-navy
        text-white
        flex
        flex-col
        h-screen
        sticky
        top-0
        font-sans
        shadow-[4px_0_24px_rgba(11,46,42,.08)]
      "
    >

      {/* Logo */}

      <div
        className="
          flex
          items-center
          gap-3
          px-5
          pb-6
          pt-6
          border-b
          border-white/10
        "
      >

        <span
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/15
          "
        >
          <span className="font-serif text-accent text-lg">
            B
          </span>
        </span>

        <div className="leading-tight">

          <div className="font-serif text-[1rem] tracking-wide">
            Bambardara
          </div>

          <div
            className="
              text-[0.62rem]
              uppercase
              tracking-[0.14em]
              text-[#9FB3AE]
            "
          >
            Nature. Luxury. Forever.
          </div>

        </div>

      </div>


      {/* Navigation */}

      <nav
        className="
          scroll-thin
          flex-1
          overflow-y-auto
          px-3
          py-4
        "
      >

        {navItems.map(item => {

          const Icon = icons[item.key] || FileText

          const isActive = active === item.key

          const childIsActive = hasActiveChild(item)

          const isOpen = openMenus[item.key]


          {/* Single menu */}

          if (item.type === 'single') {

            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`
                  group
                  w-full
                  flex
                  items-center
                  gap-3
                  rounded-md
                  px-3
                  py-2.5
                  text-[.85rem]
                  mb-0.5
                  text-left
                  transition-colors

                  ${
                    isActive
                      ? 'bg-[rgba(184,167,122,.16)] text-white'
                      : 'text-[#9FB3AE] hover:bg-[rgba(244,243,238,.06)] hover:text-[#F4F3EE]'
                  }
                `}
              >

                <Icon
                  size={16}
                  strokeWidth={1.6}
                  className={
                    isActive
                      ? 'text-accent'
                      : 'text-[#9FB3AE] group-hover:text-[#F4F3EE]'
                  }
                />

                <span>
                  {item.label}
                </span>

              </button>
            )
          }


          {/* Dropdown menu */}

          return (
            <div
              key={item.key}
              className="mb-0.5"
            >

              {/* Parent */}

              <button
                onClick={() => toggleMenu(item.key)}
                className={`
                  group
                  w-full
                  flex
                  items-center
                  gap-3
                  rounded-md
                  px-3
                  py-2.5
                  text-[.85rem]
                  text-left
                  transition-colors

                  ${
                    childIsActive
                      ? 'bg-[rgba(184,167,122,.10)] text-white'
                      : 'text-[#9FB3AE] hover:bg-[rgba(244,243,238,.06)] hover:text-[#F4F3EE]'
                  }
                `}
              >

                <Icon
                  size={16}
                  strokeWidth={1.6}
                  className={
                    childIsActive
                      ? 'text-accent'
                      : 'text-[#9FB3AE] group-hover:text-[#F4F3EE]'
                  }
                />

                <span className="flex-1">
                  {item.label}
                </span>

                <ChevronDown
                  size={15}
                  strokeWidth={1.8}
                  className={`
                    transition-transform
                    duration-200
                    ${isOpen ? 'rotate-180' : ''}
                  `}
                />

              </button>


              {/* Children */}

              {isOpen && (

                <div
                  className="
                    ml-4
                    pl-3
                    border-l
                    border-white/10
                    mt-1
                    mb-1
                  "
                >

                  {item.children.map(child => {

                    const ChildIcon =
                      icons[child.key] || FileText

                    const childActive =
                      active === child.key


                    return (
                      <button
                        key={child.key}
                        onClick={() =>
                          onNavigate(child.key)
                        }
                        className={`
                          group
                          w-full
                          flex
                          items-center
                          gap-3
                          rounded-md
                          px-3
                          py-2
                          text-[.8rem]
                          text-left
                          mb-0.5
                          transition-colors

                          ${
                            childActive
                              ? 'bg-[rgba(184,167,122,.16)] text-white'
                              : 'text-[#8FA6A0] hover:bg-[rgba(244,243,238,.06)] hover:text-[#F4F3EE]'
                          }
                        `}
                      >

                        <ChildIcon
                          size={14}
                          strokeWidth={1.5}
                          className={
                            childActive
                              ? 'text-accent'
                              : 'text-[#8FA6A0] group-hover:text-[#F4F3EE]'
                          }
                        />

                        <span>
                          {child.label}
                        </span>

                      </button>
                    )

                  })}

                </div>

              )}

            </div>
          )

        })}

      </nav>


      {/* User */}

      <div
        className="
          mx-3
          mb-5
          border-t
          border-white/10
          pt-4
          flex
          items-center
          gap-3
        "
      >

        <div
          className="
            w-9
            h-9
            rounded-full
            border
            border-white/15
            bg-white/5
            flex
            items-center
            justify-center
            text-xs
          "
        >
          MD
        </div>

        <div className="min-w-0 flex-1">

          <div
            className="
              text-[13px]
              text-white
              truncate
            "
          >
            Managing Director
          </div>

          <button
            onClick={() => onNavigate('dashboard')}
            className="
              mt-1
              flex
              items-center
              gap-1
              text-[11px]
              text-[#9FB3AE]
              hover:text-white
            "
          >

            <LogOut size={11} />

            Logout

          </button>

        </div>

      </div>

    </aside>
  )
}
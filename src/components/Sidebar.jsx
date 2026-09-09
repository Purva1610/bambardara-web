import { navItems } from '../data.js'

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="bg-forest text-[#e9e6d8] px-5 py-7 sticky top-0 h-screen font-serif">
      <div className="flex items-center gap-2.5 mb-1.5">
        <div className="w-8.5 h-8.5 w-[34px] h-[34px] rounded-full border-[1.5px] border-gold-light flex items-center justify-center text-[15px] text-gold-light">
          B
        </div>
        <div className="text-[15px] leading-tight tracking-wide">
          <b className="block text-base text-white">Bambardara</b>
          Agrotourism Pvt. Ltd.
        </div>
      </div>
      <div className="font-sans text-[10.5px] text-[#a7ae9c] ml-11 mb-6 tracking-wide">
        MD DASHBOARD
      </div>

      <nav className="font-sans">
        {navItems.map((item) => (
          <a
            key={item.key}
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onNavigate(item.key)
            }}
            className={`flex justify-between items-center text-[13.5px] py-2.5 px-1 border-b border-white/[.06] no-underline transition-colors ${
              active === item.key ? 'text-gold-light' : 'text-[#c8cdba] hover:text-white'
            }`}
          >
            {item.label}
            {item.count !== null && (
              <span className="text-[#7f866f] text-[11px]">{item.count}</span>
            )}
          </a>
        ))}
      </nav>

      <div className="mt-9 pt-4.5 pt-[18px] border-t border-white/10 font-sans text-[11px] text-[#8f9481] leading-relaxed">
        Parale Ninai, Shahuwadi
        <br />
        Kolhapur, Maharashtra – 415101
        <br />
        <br />
        Registered Office: House No. 676,
        <br />
        Parale Ninai
      </div>
    </aside>
  )
}

import { LogOut, LayoutDashboard, FolderKanban, HardHat, Wallet, ShoppingCart, Megaphone, TrendingUp, Users, ShieldCheck, ClipboardCheck, BarChart3, FileText, AlertTriangle, MessageSquare, CalendarDays, Settings } from 'lucide-react'
import { navItems } from '../data.js'

const icons={dashboard:LayoutDashboard,projects:FolderKanban,construction:HardHat,finance:Wallet,procurement:ShoppingCart,'sales-marketing':Megaphone,investments:TrendingUp,hr:Users,'teams-roles':ShieldCheck,approvals:ClipboardCheck,reports:BarChart3,documents:FileText,'risks-issues':AlertTriangle,communications:MessageSquare,calendar:CalendarDays,settings:Settings}

export default function Sidebar({active,onNavigate}){
 return <aside className="bg-navy text-white flex flex-col h-screen sticky top-0 font-sans shadow-[4px_0_24px_rgba(11,46,42,.08)]">
   <div className="flex items-center gap-3 px-5 pb-6 pt-6 border-b border-white/10">
     <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15"><span className="font-serif text-accent text-lg">B</span></span>
     <div className="leading-tight"><div className="font-serif text-[1rem] tracking-wide">Bambardara</div><div className="text-[0.62rem] uppercase tracking-[0.14em] text-[#9FB3AE]">Nature. Luxury. Forever.</div></div>
   </div>
   <nav className="scroll-thin flex-1 overflow-y-auto px-3 py-4">
    {navItems.map(item=>{const Icon=icons[item.key]||FileText; return <a key={item.key} href={`#${item.key}`} onClick={e=>{e.preventDefault();onNavigate(item.key)}} className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-[.85rem] mb-0.5 transition-colors ${active===item.key?'bg-[rgba(184,167,122,.16)] text-white':'text-[#9FB3AE] hover:bg-[rgba(244,243,238,.06)] hover:text-[#F4F3EE]'}`}><Icon size={16} strokeWidth={1.6} className={active===item.key?'text-accent':'text-[#9FB3AE] group-hover:text-[#F4F3EE]'}/><span>{item.label}</span></a>})}
   </nav>
   <div className="mx-3 mb-5 border-t border-white/10 pt-4 flex items-center gap-3">
     <div className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-xs">MD</div>
     <div className="min-w-0 flex-1"><div className="text-[13px] text-white truncate">Managing Director</div><button onClick={()=>onNavigate('logout')} className="mt-1 flex items-center gap-1 text-[11px] text-[#9FB3AE] hover:text-white cursor-pointer"><LogOut size={11}/>Logout</button></div>
   </div>
 </aside>
}

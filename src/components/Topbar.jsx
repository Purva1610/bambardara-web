import { lastUpdated } from '../data.js'

export default function Topbar({ title, subtitle }) {
  return (
    <div className="flex justify-between items-end border-b border-line pb-4.5 pb-[18px] mb-6.5 mb-[26px]">
      <div>
        <h1 className="m-0 text-[26px] font-medium tracking-wide font-serif">{title}</h1>
        <div className="font-sans text-xs text-muted mt-1">{subtitle}</div>
      </div>
      <div className="text-right font-sans text-xs text-muted">
        <b className="block text-ink text-sm font-serif not-italic mb-0.5">Prakash Patil, Director</b>
        Data last updated {lastUpdated}
      </div>
    </div>
  )
}

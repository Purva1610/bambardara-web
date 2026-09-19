import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export function Card({title,sub,children,className='',action}){return <div className={`eq-card px-6 py-5 ${className}`}>{(title||action)&&<div className="flex items-start justify-between mb-1 gap-4">{title&&<h3 className="m-0 text-[15px] font-semibold text-ink">{title}</h3>}{action}</div>}{sub&&<div className="text-[12px] text-muted mb-4">{sub}</div>}{children}</div>}
export function SectionHead({title,tag,right}){return <div className="flex items-baseline justify-between mb-3.5 gap-4"><div><h2 className="text-[17px] font-semibold m-0 text-ink">{title}</h2>{tag&&<div className="text-[12px] text-muted mt-0.5">{tag}</div>}</div>{right&&<div className="flex items-center gap-2 shrink-0">{right}</div>}</div>}
const badgeTone={good:'bg-good-bg text-good',warn:'bg-warn-bg text-warn',critical:'bg-critical-bg text-critical',neutral:'bg-[#EEF0EC] text-muted'}
export function StatusBadge({tone='neutral',children}){return <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-medium tracking-wide ${badgeTone[tone]}`}>{children}</span>}
const priorityTone={CRITICAL:'critical',HIGH:'critical',MEDIUM:'warn',LOW:'neutral'}
export function PriorityBadge({priority}){return <StatusBadge tone={priorityTone[priority]||'neutral'}>{priority}</StatusBadge>}
export function ProgressBar({value,tone='good'}){const c={good:'bg-good',warn:'bg-warn',critical:'bg-critical'};return <div className="w-full h-2 rounded-full bg-[#E8ECE7] overflow-hidden"><div className={`h-full rounded-full ${c[tone]}`} style={{width:`${value}%`}}/></div>}
export function PlaceholderPage({title,tag,note}){return <section><SectionHead title={title} tag={tag}/><Card><p className="text-[13px] text-muted leading-relaxed m-0">{note}</p></Card></section>}

export function Modal({
	title,
	subtitle,
	onClose,
	children,
	width,
	maxWidth,
	bodyClassName = 'p-6',
	hideHeader = false,
	className = '',
}) {
	const dialogRef = useRef(null)

	useEffect(() => {
		const previousActiveElement = document.activeElement
		const focusableSelector =
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

		dialogRef.current?.querySelector(focusableSelector)?.focus()

		function handleKeyDown(event) {
			if (event.key === 'Escape') {
				onClose()
				return
			}

			if (event.key !== 'Tab' || !dialogRef.current) return

			const focusableElements = dialogRef.current.querySelectorAll(focusableSelector)
			if (!focusableElements.length) return

			const firstElement = focusableElements[0]
			const lastElement = focusableElements[focusableElements.length - 1]

			if (event.shiftKey && document.activeElement === firstElement) {
				event.preventDefault()
				lastElement.focus()
			} else if (!event.shiftKey && document.activeElement === lastElement) {
				event.preventDefault()
				firstElement.focus()
			}
		}

		document.addEventListener('keydown', handleKeyDown)
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
			previousActiveElement?.focus?.()
		}
	}, [onClose])

	const widthClass = width || maxWidth || 'max-w-xl'

	return (
		<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
			<div
				className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
				onClick={onClose}
				aria-hidden="true"
			/>

			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby={title ? 'modal-title' : undefined}
				className={`relative w-full ${widthClass} max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl ${className}`}
			>
				{!hideHeader && (
					<div className="px-6 py-5 border-b border-[#E7EBE6] flex items-start justify-between">
						<div>
							<h2 id="modal-title" className="text-[15px] font-semibold text-[#173B2B]">
								{title}
							</h2>
							{subtitle && <p className="text-[10px] text-muted mt-1">{subtitle}</p>}
						</div>

						<button
							type="button"
							onClick={onClose}
							aria-label="Close dialog"
							className="w-8 h-8 rounded-lg bg-[#F1F3F0] flex items-center justify-center text-[#173B2B] hover:bg-[#E7EBE6]"
						>
							<X size={15} />
						</button>
					</div>
				)}

				<div className={`${bodyClassName} overflow-y-auto max-h-[calc(90vh-90px)]`}>
					{children}
				</div>
			</div>
		</div>
	)
}

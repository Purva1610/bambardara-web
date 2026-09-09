export default function Modal({ title, sub, onClose, children }) {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6"
      onClick={onClose}
    >
      <div
        className="bg-paper border border-line max-w-lg w-full max-h-[80vh] overflow-y-auto px-6 py-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="m-0 text-[16px] font-medium font-serif">{title}</h3>
            {sub && <div className="font-sans text-[11.5px] text-muted mt-1">{sub}</div>}
          </div>
          <button
            onClick={onClose}
            className="font-sans text-muted hover:text-ink text-sm leading-none border-none bg-transparent cursor-pointer px-1"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default function SectionHeading({ children, action }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="font-serif text-lg text-text">{children}</h2>
      {action}
    </div>
  );
}

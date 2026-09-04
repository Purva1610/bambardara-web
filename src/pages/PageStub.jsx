import { useParams } from 'react-router-dom';

export default function PageStub({ title, description, icon: Icon }) {
  const params = useParams();
  const isDetail = Object.keys(params).length > 0;

  return (
    <div className="flex min-h-[55vh] flex-col items-center justify-center rounded-xl2 border border-dashed border-line bg-card/60 px-6 py-16 text-center">
      {Icon && (
        <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/8 text-primary">
          <Icon size={22} strokeWidth={1.6} />
        </span>
      )}
      <h2 className="font-serif text-xl text-text">
        {title}
        {isDetail && <span className="text-muted"> · {Object.values(params).join(' / ')}</span>}
      </h2>
      <p className="mt-2 max-w-md text-sm text-muted">{description}</p>
    </div>
  );
}

'use client';

function StarRating({ count = 5 }) {
  return (
    <div className="gap-1 text-amber-400 flex">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialCard({ item }) {
  return (
    <div
      className={`max-w-sm rounded-2xl bg-slate-50 shadow-md p-6 min-w-[320px] snap-center opacity-70 transition-all duration-300`}
    >
      <StarRating />
      <p className="mt-4 text-slate-600 leading-relaxed">“{item.text}”</p>

      <div className="mt-6 gap-4 flex items-center">
        <div className="h-12 w-12 from-brand-blue to-blue-400 text-white font-bold relative flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br">
          {item.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-brand-dark">{item.name}</p>
          <p className="text-xs text-slate-500">{item.position}</p>
          <p className="text-xs text-brand-blue font-medium">{item.company}</p>
        </div>
      </div>
    </div>
  );
}

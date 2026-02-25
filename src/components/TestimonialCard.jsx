"use client";

import { useRef, useState } from "react";
import Image from "next/image";

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-1 text-amber-400">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i}>★</span>
      ))}
    </div>
  );
}


export default function TestimonialCard({ item }) {
  return (
    <div
      className={`min-w-[320px] max-w-sm snap-center rounded-2xl bg-slate-50 shadow-md opacity-70 p-6 transition-all duration-300 
      `}
    >
      <StarRating />
      <p className="mt-4 text-slate-600 leading-relaxed">
        “{item.text}”
      </p>

      <div className="mt-6 flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br from-brand-blue to-blue-400 text-white flex items-center justify-center font-bold">
          {item.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-brand-dark">{item.name}</p>
          <p className="text-xs text-slate-500">
            {item.position}
          </p>
          <p className="text-xs text-brand-blue font-medium">
            {item.company}
          </p>
        </div>
      </div>
    </div>
  );
}

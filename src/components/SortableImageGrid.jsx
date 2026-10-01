'use client';

import Image from 'next/image';
import { useState } from 'react';

function moveItem(items, from, to) {
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

/**
 * Thumbnail grid whose items can be reordered by dragging. `onReorder` receives
 * the full list in its new order; `onRemove` receives a single item.
 */
export default function SortableImageGrid({ items = [], onReorder, onRemove, disabled = false, emptyLabel = '' }) {
  const [dragIndex, setDragIndex] = useState(null);
  const [overIndex, setOverIndex] = useState(null);

  if (!items.length) {
    return <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-slate-500">{emptyLabel}</p>;
  }

  const resetDragState = () => {
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleDrop = (targetIndex) => {
    if (dragIndex === null || dragIndex === targetIndex) {
      resetDragState();
      return;
    }
    onReorder?.(moveItem(items, dragIndex, targetIndex));
    resetDragState();
  };

  const moveByKeyboard = (index, offset) => {
    const target = index + offset;
    if (target < 0 || target >= items.length) return;
    onReorder?.(moveItem(items, index, target));
  };

  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item, index) => (
        <li
          key={item.id}
          draggable={!disabled}
          onDragStart={(event) => {
            setDragIndex(index);
            event.dataTransfer.effectAllowed = 'move';
            // Firefox only starts a drag when some data is set.
            event.dataTransfer.setData('text/plain', String(index));
          }}
          onDragOver={(event) => {
            event.preventDefault();
            event.dataTransfer.dropEffect = 'move';
            setOverIndex(index);
          }}
          onDragLeave={() => setOverIndex((current) => (current === index ? null : current))}
          onDrop={(event) => {
            event.preventDefault();
            handleDrop(index);
          }}
          onDragEnd={resetDragState}
          className={`group relative rounded-xl border bg-white p-3 transition ${
            dragIndex === index ? 'opacity-40' : ''
          } ${overIndex === index && dragIndex !== index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200'} ${
            disabled ? '' : 'cursor-grab active:cursor-grabbing'
          }`}
        >
          <div className="relative h-24 w-full">
            <Image src={item.imageUrl} alt={item.alt || ''} fill sizes="200px" className="object-contain" />
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-400">#{index + 1}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={disabled || index === 0}
                onClick={() => moveByKeyboard(index, -1)}
                className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600 disabled:opacity-30"
                aria-label="Տեղափոխել ձախ"
              >
                ←
              </button>
              <button
                type="button"
                disabled={disabled || index === items.length - 1}
                onClick={() => moveByKeyboard(index, 1)}
                className="rounded-md bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600 disabled:opacity-30"
                aria-label="Տեղափոխել աջ"
              >
                →
              </button>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onRemove?.(item)}
                className="rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-600 disabled:opacity-30"
              >
                Ջնջել
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

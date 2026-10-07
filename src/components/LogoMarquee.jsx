import Image from 'next/image';

// Keep in sync with the tile sizes in globals.css (.marquee-item).
const MIN_TILE_WIDTH = 136; // smallest tile (mobile) incl. gap, used to size one "set"
const MIN_SET_WIDTH = 2800; // one set must be wider than any viewport so the loop never shows a gap

/**
 * Infinite logo strip driven purely by a CSS animation.
 *
 * - No JavaScript runs after load: the animation lives on the compositor, so it
 *   can't stall, drift or block clicks when the main thread is busy.
 * - Tile size is fixed in CSS, so the loop distance is known up front
 *   (item count x tile width) and nothing needs to be measured.
 * - Logos go through next/image (resized + cached) instead of loading the
 *   original, possibly multi-megabyte, upload from storage.
 * - Server component: ships zero client JS for this section.
 */
export default function LogoMarquee({ items: rawItems = [], direction = 'left', className = '' }) {
  const items = rawItems.filter((item) => String(item?.imageUrl || '').trim());
  if (!items.length) return null;

  // Repeat items inside one set until it is wider than the screen.
  const repeats = Math.max(1, Math.ceil(MIN_SET_WIDTH / (items.length * MIN_TILE_WIDTH)));
  const setItems = Array.from({ length: repeats }, (_, repeat) =>
    items.map((item) => ({ item, key: `${repeat}-${item.id}` })),
  ).flat();

  return (
    <div className={['marquee-shell', className].join(' ').trim()}>
      <div
        className={`marquee-track ${direction === 'right' ? 'marquee-right' : 'marquee-left'}`}
        style={{ '--marquee-count': setItems.length }}
      >
        {[0, 1].map((copyIndex) => (
          <div key={copyIndex} className="marquee-set" aria-hidden={copyIndex > 0 ? 'true' : undefined}>
            {setItems.map(({ item, key }, index) => (
              <div key={key} className="marquee-item">
                <Image
                  src={item.imageUrl}
                  alt={copyIndex === 0 ? item.alt || '' : ''}
                  width={160}
                  height={80}
                  quality={70}
                  // Only https/local sources are allowed by the image optimizer config.
                  unoptimized={!/^(https:\/\/|\/)/.test(item.imageUrl)}
                  // The first copy loads right away so logos are painted before they scroll in;
                  // the second copy reuses the same (cached) URLs.
                  loading={copyIndex === 0 ? 'eager' : 'lazy'}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

import { Suspense } from 'react';
import Image from 'next/image';
import HomePageClient from '../components/HomePageClient';
import LogoMarquee from '../components/LogoMarquee';
import { createSupabaseServerClient } from '../lib/supabase/server';
import { fetchSliderImages } from '../lib/supabase/sliders';

// Slider images are read per request so admin changes show up immediately.
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

function PartnersFallbackImage() {
  return (
    <Image
      src="/img/logos.avif"
      alt="Partners"
      width={1100}
      height={700}
      sizes="(min-width: 1280px) 1100px, calc(100vw - 5rem)"
      quality={70}
      className="h-auto w-full object-contain"
    />
  );
}

// Same height as the two marquee rows (64px <=640px, 80px above, see globals.css) and the same
// space-y-10 gap, so swapping in the real strips causes no layout shift.
function PartnersSkeleton() {
  return (
    <div className="space-y-10" aria-hidden="true">
      <div className="h-16 animate-pulse rounded-xl bg-slate-100 min-[641px]:h-20" />
      <div className="h-16 animate-pulse rounded-xl bg-slate-100 min-[641px]:h-20" />
    </div>
  );
}

async function PartnersSliders() {
  let sliders = { top: [], bottom: [] };
  let loaded = false;

  try {
    sliders = await fetchSliderImages(createSupabaseServerClient());
    loaded = true;
  } catch {
    // Fall back to the static partners image if the sliders cannot be loaded.
  }

  if (!loaded) return <PartnersFallbackImage />;
  // Sliders loaded fine but are empty (e.g. the admin removed every image): show nothing
  // instead of the static fallback, which would look like the removed images are still there.
  if (!sliders.top.length && !sliders.bottom.length) return null;

  return (
    <div className="space-y-10">
      <LogoMarquee items={sliders.top} direction="right" />
      <LogoMarquee items={sliders.bottom} direction="left" />
    </div>
  );
}

export default function HomePage() {
  // The page shell renders and streams immediately; the slider data (a Supabase
  // round trip) streams in afterwards instead of blocking the whole page.
  return (
    <HomePageClient
      partners={
        <Suspense fallback={<PartnersSkeleton />}>
          <PartnersSliders />
        </Suspense>
      }
    />
  );
}

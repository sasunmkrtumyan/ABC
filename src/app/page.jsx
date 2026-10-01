import HomePageClient from '../components/HomePageClient';
import { createSupabaseServerClient } from '../lib/supabase/server';
import { fetchSliderImages } from '../lib/supabase/sliders';

// Slider images are read per request so admin changes show up immediately.
export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let sliders = { top: [], bottom: [] };

  try {
    sliders = await fetchSliderImages(createSupabaseServerClient());
  } catch {
    // Fall back to the static partners image if the sliders cannot be loaded.
  }

  return <HomePageClient sliders={sliders} />;
}

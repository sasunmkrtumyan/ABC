-- Enables drag & drop ordering of tags in the admin panel.
alter table public.tags
add column if not exists position integer;

-- Keep the current (alphabetical) order as the starting order.
with ordered as (
  select id, row_number() over (order by slug) - 1 as pos
  from public.tags
)
update public.tags t
set position = ordered.pos
from ordered
where t.id = ordered.id and t.position is null;

notify pgrst, 'reload schema';

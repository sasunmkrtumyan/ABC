-- Seed the 24 Digital Businessbook categories (tags) in English, Armenian and Russian.
-- Run in Supabase Dashboard -> SQL Editor. Safe to re-run: existing tags are skipped.
--
-- `tags.name` holds JSON text ({"en": ..., "am": ..., "ru": ...}), the same format the
-- admin panel writes. `slug` matches src/lib/slugify.js applied to the English name.

insert into public.tags (name, slug)
select
  jsonb_build_object('en', v.en, 'am', v.am, 'ru', v.ru)::text,
  v.slug
from (
  values
    ('food-beverages', 'Food & Beverages', 'Սնունդ և ըմպելիքներ', 'Продукты питания и напитки'),
    ('agriculture-agricultural-products', 'Agriculture & Agricultural Products', 'Գյուղատնտեսություն և գյուղմթերք', 'Сельское хозяйство и сельскохозяйственная продукция'),
    ('clothing-textiles-fashion', 'Clothing, Textiles & Fashion', 'Հագուստ, տեքստիլ և նորաձևություն', 'Одежда, текстиль и мода'),
    ('household-products', 'Household Products', 'Տնտեսական և կենցաղային ապրանքներ', 'Товары для дома и быта'),
    ('building-materials', 'Building Materials', 'Շինանյութեր', 'Строительные материалы'),
    ('furniture-home-furnishings', 'Furniture & Home Furnishings', 'Կահույք և տան կահավորում', 'Мебель и предметы интерьера'),
    ('cosmetics-personal-care', 'Cosmetics & Personal Care', 'Կոսմետիկա և անձնական խնամք', 'Косметика и средства личной гигиены'),
    ('jewelry-precious-jewelry', 'Jewelry & Precious Jewelry', 'Ոսկերչական իրեր և թանկարժեք զարդեր', 'Ювелирные изделия и драгоценности'),
    ('property-development', 'Property Development', 'Կառուցապատում', 'Девелопмент недвижимости'),
    ('construction', 'Construction', 'Շինարարություն', 'Строительство'),
    ('real-estate-services', 'Real Estate Services', 'Անշարժ գույքի ծառայություններ', 'Услуги в сфере недвижимости'),
    ('supermarkets-retail-chains', 'Supermarkets & Retail Chains', 'Սուպերմարկետներ և առևտրային ցանցեր', 'Супермаркеты и торговые сети'),
    ('pharmaceuticals-pharmacies', 'Pharmaceuticals & Pharmacies', 'Դեղագործություն և դեղատներ', 'Фармацевтика и аптеки'),
    ('equipment-electronics', 'Equipment & Electronics', 'Տեխնիկա և էլեկտրոնիկա', 'Оборудование и электроника'),
    ('information-technology-it', 'Information Technology (IT)', 'Տեղեկատվական տեխնոլոգիաներ (IT)', 'Информационные технологии (IT)'),
    ('telecommunications-digital-services', 'Telecommunications & Digital Services', 'Հեռահաղորդակցություն և թվային ծառայություններ', 'Телекоммуникации и цифровые услуги'),
    ('banking-finance', 'Banking & Finance', 'Բանկային համակարգ և ֆինանսներ', 'Банковское дело и финансы'),
    ('trade-import-export', 'Trade, Import & Export', 'Առևտուր, ներմուծում և արտահանում', 'Торговля, импорт и экспорт'),
    ('transport-logistics', 'Transport & Logistics', 'Տրանսպորտ և լոգիստիկա', 'Транспорт и логистика'),
    ('automobiles-auto-parts', 'Automobiles & Auto Parts', 'Ավտոմեքենաներ և ավտոպահեստամասեր', 'Автомобили и автозапчасти'),
    ('tourism-hospitality', 'Tourism & Hospitality', 'Զբոսաշրջություն և հյուրընկալություն', 'Туризм и гостеприимство'),
    ('professional-business-services', 'Professional & Business Services', 'Մասնագիտական և բիզնես ծառայություններ', 'Профессиональные и бизнес-услуги'),
    ('education-professional-development', 'Education & Professional Development', 'Կրթություն և մասնագիտական զարգացում', 'Образование и профессиональное развитие'),
    ('media-advertising-marketing', 'Media, Advertising & Marketing', 'Մեդիա, գովազդ և մարքեթինգ', 'Медиа, реклама и маркетинг')
) as v(slug, en, am, ru)
on conflict do nothing;

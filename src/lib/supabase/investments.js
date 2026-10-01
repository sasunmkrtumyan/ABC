import { supabase } from './client';

function isMissingInvestmentsTable(error) {
  const code = String(error?.code || '').toUpperCase();
  const message = String(error?.message || '').toLowerCase();
  return code === 'PGRST205' && message.includes('investments');
}

function fromRow(row) {
  if (!row) return null;
  return {
    id: row.id,
    partnerId: row.partner_id || '',
    slug: row.slug || '',
    companyName: row.company_name || '',
    companyImageUrl: row.company_image_url || '',
    title: row.title || {},
    summary: row.summary || {},
    details: row.details || {},
    amount: row.amount == null ? null : Number(row.amount),
    currency: row.currency || 'USD',
    investmentType: row.investment_type || 'other',
    sector: row.sector || '',
    location: row.location || '',
    deadline: row.deadline || '',
    website: row.website || '',
    emails: row.emails || [],
    phones: row.phones || [],
    status: row.status || 'draft',
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toRow(payload = {}) {
  return {
    partner_id: payload.partnerId || null,
    slug: payload.slug,
    company_name: payload.companyName || '',
    company_image_url: payload.companyImageUrl || '',
    title: payload.title || {},
    summary: payload.summary || {},
    details: payload.details || {},
    amount: payload.amount === '' || payload.amount == null ? null : Number(payload.amount),
    currency: payload.currency || 'USD',
    investment_type: payload.investmentType || 'other',
    sector: payload.sector || '',
    location: payload.location || '',
    deadline: payload.deadline || null,
    website: payload.website || '',
    emails: payload.emails || [],
    phones: payload.phones || [],
    status: payload.status || 'draft',
  };
}

function handleTableError(error) {
  if (isMissingInvestmentsTable(error)) {
    throw new Error(
      "Investments table is missing in Supabase. Run supabase/schema.sql and then execute: notify pgrst, 'reload schema';",
    );
  }
  throw error;
}

export async function fetchInvestments({ includeDrafts = false } = {}) {
  let query = supabase.from('investments').select('*').order('created_at', { ascending: false });
  if (!includeDrafts) query = query.in('status', ['open', 'closed']);
  const { data, error } = await query;
  if (error) handleTableError(error);
  return (data || []).map(fromRow);
}

export async function fetchInvestmentBySlug(slug) {
  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .eq('slug', String(slug || '').trim())
    .maybeSingle();
  if (error) handleTableError(error);
  return fromRow(data);
}

export async function createInvestment(payload) {
  const { data, error } = await supabase.from('investments').insert(toRow(payload)).select('*').single();
  if (error) handleTableError(error);
  return fromRow(data);
}

export async function updateInvestment(id, payload) {
  const { data, error } = await supabase.from('investments').update(toRow(payload)).eq('id', id).select('*').single();
  if (error) handleTableError(error);
  return fromRow(data);
}

export async function deleteInvestment(id) {
  const { error } = await supabase.from('investments').delete().eq('id', id);
  if (error) handleTableError(error);
  return true;
}

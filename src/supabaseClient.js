import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://cvtxbjhstxtkgtwrfhcu.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2dHhiamhzdHh0a2d0d3JmaGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2NzMwMzcsImV4cCI6MjA3NzI0OTAzN30.14as_IvmLt-cqdW_u0WXgnk3YQrOt3GrrD6ji2GarAQ'       // ta clé publique

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://wmeybrlgphrbsfpaegpz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtZXlicmxncGhyYnNmcGFlZ3B6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE2MDQ1NTgsImV4cCI6MjA3NzE4MDU1OH0.fXQT-FrjCBQAroV8vXjOVGqdM1EcUb9JftsZ64MAO8w";

export const supabase = createClient(supabaseUrl, supabaseKey);

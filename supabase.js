import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://snabhsbqrkgfrsqzipvl.supabase.co";

const supabaseKey = "PEGA_AQUI_TU_KEY_REAL_COMPLETA";

export const supabase = createClient(supabaseUrl, supabaseKey);
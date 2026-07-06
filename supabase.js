import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://snabhsbqrkgfrsqzipvl.supabase.co";

const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuYWJoc2JxcmtnZnJzcXppcHZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI4NDA0MjksImV4cCI6MjA5ODQxNjQyOX0.p_RVzg5aLQvf0it4j2Bsb7OVy1BoIh6g1X93nb6ZgEQ";

export const supabase = createClient(supabaseUrl, supabaseKey);
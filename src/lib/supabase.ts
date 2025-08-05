// filepath: src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gyboosequbkbtgsifqmg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5Ym9vc2VxdWJrYnRnc2lmcW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMjgzNTksImV4cCI6MjA2OTgwNDM1OX0.a94f0Lsgn-FKqDVKPEQYthusloH7YxXM7eSwPj6pfyk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
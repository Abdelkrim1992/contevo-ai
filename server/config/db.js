import { createClient } from '@supabase/supabase-js'
import { ENV } from './env.js'

const supabaseUrl = ENV.SUPABASE_URL;
const supabaseKey = ENV.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey)

console.log('connected to Supabase client')

export default supabase;

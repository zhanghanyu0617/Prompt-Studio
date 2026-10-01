import { supabaseAdmin } from '@/lib/supabase'

// 服务端 API Route 使用 service role key 客户端（绕过 RLS）
export const createClient = () => supabaseAdmin

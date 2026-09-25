import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

// 使用占位符避免构建阶段（collect page data）因缺少环境变量而失败
// 运行时环境变量必须正确设置，否则 Supabase 操作会失败
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey) as any

// 服务端客户端（用于 API Routes）
// 注意：使用 as any 绕过 supabase-js 类型推断问题，避免 insert/update 的 never 类型错误
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
) as any

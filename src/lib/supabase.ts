import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// 注意：不在模块加载时抛出错误，避免构建阶段（collect page data）因缺少环境变量而失败
// 环境变量在运行时必须存在，否则 Supabase 操作会自然失败

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

import { supabase } from '@/lib/supabase'

// 客户端组件使用 anon key 客户端
export const createClient = () => supabase

-- ============================================
-- Prompt Studio 数据库 Schema
-- 适用于 Supabase PostgreSQL
-- ============================================

-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. 用户表（扩展 auth.users）
-- ============================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  nickname TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
  invite_code TEXT,
  referred_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. 用户额度表
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_quotas (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE PRIMARY KEY,
  text_remaining INTEGER DEFAULT 100,
  image_remaining INTEGER DEFAULT 50,
  video_remaining INTEGER DEFAULT 10,
  total_text_used INTEGER DEFAULT 0,
  total_image_used INTEGER DEFAULT 0,
  total_video_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. 邀请码表
-- ============================================
CREATE TABLE IF NOT EXISTS public.invite_codes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  max_uses INTEGER DEFAULT 1,
  used_count INTEGER DEFAULT 0,
  reward_quota INTEGER DEFAULT 50,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES public.users(id),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 4. 模型配置表
-- ============================================
CREATE TABLE IF NOT EXISTS public.models (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  model_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('text', 'image', 'video')),
  cost_per_use INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  is_default BOOLEAN DEFAULT FALSE,
  config JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. 生成记录表
-- ============================================
CREATE TABLE IF NOT EXISTS public.generation_records (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('text', 'image', 'video')),
  model_id UUID REFERENCES public.models(id),
  prompt TEXT,
  negative_prompt TEXT,
  params JSONB DEFAULT '{}',
  result_url TEXT,
  result_data JSONB,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  error_message TEXT,
  credits_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- ============================================
-- 6. 额度流水表
-- ============================================
CREATE TABLE IF NOT EXISTS public.credit_ledger (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('consume', 'purchase', 'reward', 'refund', 'adjustment')),
  source_type TEXT CHECK (source_type IN ('generation', 'order', 'invite', 'admin')),
  source_id UUID,
  description TEXT,
  balance_after INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 7. 订单表
-- ============================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  plan_id TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  credits INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'failed', 'cancelled', 'refunded')),
  payment_method TEXT,
  payment_id TEXT,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 8. 支付交易表
-- ============================================
CREATE TABLE IF NOT EXISTS public.payment_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'CNY',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'cancelled')),
  payment_gateway TEXT DEFAULT 'mx88',
  gateway_txn_id TEXT,
  notify_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 9. 管理员表
-- ============================================
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 10. 审计日志表
-- ============================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  admin_id UUID REFERENCES public.admin_users(user_id),
  action TEXT NOT NULL,
  target_type TEXT,
  target_id UUID,
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 11. 错误日志表
-- ============================================
CREATE TABLE IF NOT EXISTS public.error_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  error_type TEXT NOT NULL,
  error_message TEXT NOT NULL,
  stack_trace TEXT,
  context JSONB DEFAULT '{}',
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 12. 用户媒体锁定表（防止重复提交）
-- ============================================
CREATE TABLE IF NOT EXISTS public.user_media_locks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  lock_key TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 13. 系统设置表
-- ============================================
CREATE TABLE IF NOT EXISTS public.system_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 14. 公告表
-- ============================================
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'error')),
  is_active BOOLEAN DEFAULT TRUE,
  priority INTEGER DEFAULT 0,
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 触发器函数：新用户注册时自动创建额度记录
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- 插入用户记录
  INSERT INTO public.users (id, email, nickname, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nickname', split_part(NEW.email, '@', 1)),
    'user'
  );
  
  -- 插入默认额度
  INSERT INTO public.user_quotas (user_id, text_remaining, image_remaining, video_remaining)
  VALUES (NEW.id, 100, 50, 10);
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- 记录错误但不阻止用户创建
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 创建触发器
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- RLS 策略
-- ============================================

-- 启用 RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_quotas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invite_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generation_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.credit_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_media_locks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- users 表策略
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Allow trigger to insert users" ON public.users
  FOR INSERT WITH CHECK (true);

-- user_quotas 表策略
CREATE POLICY "Users can view own quotas" ON public.user_quotas
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow trigger to insert quotas" ON public.user_quotas
  FOR INSERT WITH CHECK (true);

-- invite_codes 表策略
CREATE POLICY "Anyone can view active invite codes" ON public.invite_codes
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage invite codes" ON public.invite_codes
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
  );

-- models 表策略
CREATE POLICY "Anyone can view active models" ON public.models
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage models" ON public.models
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
  );

-- generation_records 表策略
CREATE POLICY "Users can view own records" ON public.generation_records
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create records" ON public.generation_records
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own records" ON public.generation_records
  FOR UPDATE USING (auth.uid() = user_id);

-- credit_ledger 表策略
CREATE POLICY "Users can view own ledger" ON public.credit_ledger
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert ledger" ON public.credit_ledger
  FOR INSERT WITH CHECK (true);

-- orders 表策略
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- payment_transactions 表策略
CREATE POLICY "Users can view own transactions" ON public.payment_transactions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "System can insert transactions" ON public.payment_transactions
  FOR INSERT WITH CHECK (true);

-- admin_users 表策略
CREATE POLICY "Admins can view admin users" ON public.admin_users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
  );

-- audit_logs 表策略
CREATE POLICY "Admins can view audit logs" ON public.audit_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
  );
CREATE POLICY "System can insert audit logs" ON public.audit_logs
  FOR INSERT WITH CHECK (true);

-- error_logs 表策略
CREATE POLICY "Users can view own errors" ON public.error_logs
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all errors" ON public.error_logs
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
  );
CREATE POLICY "System can insert errors" ON public.error_logs
  FOR INSERT WITH CHECK (true);

-- user_media_locks 表策略
CREATE POLICY "Users can manage own locks" ON public.user_media_locks
  FOR ALL USING (auth.uid() = user_id);

-- system_settings 表策略
CREATE POLICY "Anyone can view system settings" ON public.system_settings
  FOR SELECT USING (true);
CREATE POLICY "Admins can manage settings" ON public.system_settings
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
  );

-- announcements 表策略
CREATE POLICY "Anyone can view active announcements" ON public.announcements
  FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage announcements" ON public.announcements
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.admin_users WHERE user_id = auth.uid())
  );

-- ============================================
-- 种子数据
-- ============================================

-- 插入默认模型
INSERT INTO public.models (name, provider, model_id, type, cost_per_use, is_active, is_default, config) VALUES
('GPT-4o', 'OpenAI', 'gpt-4o', 'text', 5, true, true, '{"max_tokens": 4096, "temperature": 0.7}'),
('Claude 3.5 Sonnet', 'Anthropic', 'claude-3-5-sonnet-20240620', 'text', 5, true, false, '{"max_tokens": 4096, "temperature": 0.7}'),
('DALL-E 3', 'OpenAI', 'dall-e-3', 'image', 20, true, true, '{"size": "1024x1024", "quality": "standard"}'),
('Midjourney', 'Midjourney', 'midjourney-v6', 'image', 30, true, false, '{"size": "1024x1024"}'),
('Runway Gen-3', 'Runway', 'runway-gen-3', 'video', 100, true, true, '{"duration": 4, "fps": 24}'),
('Pika Labs', 'Pika', 'pika-1.0', 'video', 80, true, false, '{"duration": 4, "fps": 24}')
ON CONFLICT DO NOTHING;

-- 插入系统设置
INSERT INTO public.system_settings (key, value, description) VALUES
('site_name', '"Prompt Studio"', '网站名称'),
('site_description', '"AI创作工作台"', '网站描述'),
('registration_enabled', 'true', '是否开放注册'),
('invite_required', 'false', '是否需要邀请码'),
('default_quota_text', '100', '默认文字额度'),
('default_quota_image', '50', '默认图片额度'),
('default_quota_video', '10', '默认视频额度'),
('maintenance_mode', 'false', '维护模式')
ON CONFLICT (key) DO NOTHING;

-- 插入测试邀请码
INSERT INTO public.invite_codes (code, max_uses, reward_quota, is_active) VALUES
('PROMPT2024', 100, 50, true),
('WELCOME100', 50, 100, true),
('TEST2024', 10, 20, true)
ON CONFLICT DO NOTHING;

-- 插入测试公告
INSERT INTO public.announcements (title, content, type, is_active, priority) VALUES
('欢迎使用 Prompt Studio', 'Prompt Studio 是一个功能强大的AI创作工作台，支持AI对话、图片生成、视频生成等功能。', 'info', true, 10),
('新功能上线', '图片生成功能已上线，快来体验吧！', 'success', true, 5)
ON CONFLICT DO NOTHING;

-- ============================================
-- 数据库函数
-- ============================================

-- 扣减文本额度
CREATE OR REPLACE FUNCTION public.consume_text_quota(
  p_user_id UUID,
  p_amount INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.user_quotas
  SET 
    text_remaining = text_remaining - p_amount,
    updated_at = NOW()
  WHERE user_id = p_user_id AND text_remaining >= p_amount;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION '额度不足';
  END IF;
END;
$$;

-- 扣减图片额度
CREATE OR REPLACE FUNCTION public.consume_image_quota(
  p_user_id UUID,
  p_amount INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.user_quotas
  SET 
    image_remaining = image_remaining - p_amount,
    updated_at = NOW()
  WHERE user_id = p_user_id AND image_remaining >= p_amount;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION '额度不足';
  END IF;
END;
$$;

-- 扣减视频额度
CREATE OR REPLACE FUNCTION public.consume_video_quota(
  p_user_id UUID,
  p_amount INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.user_quotas
  SET 
    video_remaining = video_remaining - p_amount,
    updated_at = NOW()
  WHERE user_id = p_user_id AND video_remaining >= p_amount;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION '额度不足';
  END IF;
END;
$$;

-- 添加额度（用于购买套餐）
CREATE OR REPLACE FUNCTION public.add_quota(
  p_user_id UUID,
  p_text_amount INTEGER DEFAULT 0,
  p_image_amount INTEGER DEFAULT 0,
  p_video_amount INTEGER DEFAULT 0
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.user_quotas
  SET 
    text_remaining = text_remaining + p_text_amount,
    image_remaining = image_remaining + p_image_amount,
    video_remaining = video_remaining + p_video_amount,
    updated_at = NOW()
  WHERE user_id = p_user_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION '用户额度记录不存在';
  END IF;
END;
$$;

-- 添加额度（简化版，按比例分配）
CREATE OR REPLACE FUNCTION public.add_credits(
  p_user_id UUID,
  p_credits INTEGER
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- 按比例分配：文字60%，图片30%，视频10%
  UPDATE public.user_quotas
  SET 
    text_remaining = text_remaining + FLOOR(p_credits * 0.6),
    image_remaining = image_remaining + FLOOR(p_credits * 0.3),
    video_remaining = video_remaining + CEIL(p_credits * 0.1),
    updated_at = NOW()
  WHERE user_id = p_user_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION '用户额度记录不存在';
  END IF;
END;
$$;

-- 授权函数执行权限
GRANT EXECUTE ON FUNCTION public.consume_text_quota(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.consume_image_quota(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.consume_video_quota(UUID, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION public.add_quota(UUID, INTEGER, INTEGER, INTEGER) TO service_role;
GRANT EXECUTE ON FUNCTION public.add_credits(UUID, INTEGER) TO service_role;

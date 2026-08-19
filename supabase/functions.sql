-- 额度扣减函数

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

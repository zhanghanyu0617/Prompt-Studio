export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          nickname: string | null
          avatar_url: string | null
          role: 'user' | 'admin' | 'super_admin'
          invite_code: string | null
          referred_by: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          nickname?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'super_admin'
          invite_code?: string | null
          referred_by?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          nickname?: string | null
          avatar_url?: string | null
          role?: 'user' | 'admin' | 'super_admin'
          invite_code?: string | null
          referred_by?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_quotas: {
        Row: {
          user_id: string
          text_remaining: number
          image_remaining: number
          video_remaining: number
          total_text_used: number
          total_image_used: number
          total_video_used: number
          created_at: string
          updated_at: string
        }
        Insert: {
          user_id: string
          text_remaining?: number
          image_remaining?: number
          video_remaining?: number
          total_text_used?: number
          total_image_used?: number
          total_video_used?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          text_remaining?: number
          image_remaining?: number
          video_remaining?: number
          total_text_used?: number
          total_image_used?: number
          total_video_used?: number
          created_at?: string
          updated_at?: string
        }
      }
      invite_codes: {
        Row: {
          id: string
          code: string
          max_uses: number
          used_count: number
          reward_quota: number
          is_active: boolean
          created_by: string | null
          expires_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          max_uses?: number
          used_count?: number
          reward_quota?: number
          is_active?: boolean
          created_by?: string | null
          expires_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          max_uses?: number
          used_count?: number
          reward_quota?: number
          is_active?: boolean
          created_by?: string | null
          expires_at?: string | null
          created_at?: string
        }
      }
      models: {
        Row: {
          id: string
          name: string
          provider: string
          model_id: string
          type: 'text' | 'image' | 'video'
          cost_per_use: number
          is_active: boolean
          is_default: boolean
          config: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          provider: string
          model_id: string
          type: 'text' | 'image' | 'video'
          cost_per_use?: number
          is_active?: boolean
          is_default?: boolean
          config?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          provider?: string
          model_id?: string
          type?: 'text' | 'image' | 'video'
          cost_per_use?: number
          is_active?: boolean
          is_default?: boolean
          config?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
      }
      generation_records: {
        Row: {
          id: string
          user_id: string
          type: 'text' | 'image' | 'video'
          model_id: string | null
          prompt: string | null
          negative_prompt: string | null
          params: Record<string, any>
          result_url: string | null
          result_data: Record<string, any> | null
          status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
          error_message: string | null
          credits_used: number
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          type: 'text' | 'image' | 'video'
          model_id?: string | null
          prompt?: string | null
          negative_prompt?: string | null
          params?: Record<string, any>
          result_url?: string | null
          result_data?: Record<string, any> | null
          status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
          error_message?: string | null
          credits_used?: number
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          type?: 'text' | 'image' | 'video'
          model_id?: string | null
          prompt?: string | null
          negative_prompt?: string | null
          params?: Record<string, any>
          result_url?: string | null
          result_data?: Record<string, any> | null
          status?: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
          error_message?: string | null
          credits_used?: number
          created_at?: string
          completed_at?: string | null
        }
      }
      credit_ledger: {
        Row: {
          id: string
          user_id: string
          amount: number
          type: 'consume' | 'purchase' | 'reward' | 'refund' | 'adjustment'
          source_type: 'generation' | 'order' | 'invite' | 'admin' | null
          source_id: string | null
          description: string | null
          balance_after: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          amount: number
          type: 'consume' | 'purchase' | 'reward' | 'refund' | 'adjustment'
          source_type?: 'generation' | 'order' | 'invite' | 'admin' | null
          source_id?: string | null
          description?: string | null
          balance_after: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          amount?: number
          type?: 'consume' | 'purchase' | 'reward' | 'refund' | 'adjustment'
          source_type?: 'generation' | 'order' | 'invite' | 'admin' | null
          source_id?: string | null
          description?: string | null
          balance_after?: number
          created_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          plan_id: string
          plan_name: string
          amount: number
          credits: number
          status: 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded'
          payment_method: string | null
          payment_id: string | null
          paid_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_id: string
          plan_name: string
          amount: number
          credits: number
          status?: 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded'
          payment_method?: string | null
          payment_id?: string | null
          paid_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_id?: string
          plan_name?: string
          amount?: number
          credits?: number
          status?: 'pending' | 'paid' | 'failed' | 'cancelled' | 'refunded'
          payment_method?: string | null
          payment_id?: string | null
          paid_at?: string | null
          created_at?: string
        }
      }
      payment_transactions: {
        Row: {
          id: string
          order_id: string
          user_id: string
          amount: number
          currency: string
          status: 'pending' | 'success' | 'failed' | 'cancelled'
          payment_gateway: string
          gateway_txn_id: string | null
          notify_data: Record<string, any> | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          user_id: string
          amount: number
          currency?: string
          status?: 'pending' | 'success' | 'failed' | 'cancelled'
          payment_gateway?: string
          gateway_txn_id?: string | null
          notify_data?: Record<string, any> | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          user_id?: string
          amount?: number
          currency?: string
          status?: 'pending' | 'success' | 'failed' | 'cancelled'
          payment_gateway?: string
          gateway_txn_id?: string | null
          notify_data?: Record<string, any> | null
          created_at?: string
          updated_at?: string
        }
      }
      admin_users: {
        Row: {
          user_id: string
          role: 'admin' | 'super_admin'
          permissions: Record<string, any>
          created_at: string
        }
        Insert: {
          user_id: string
          role?: 'admin' | 'super_admin'
          permissions?: Record<string, any>
          created_at?: string
        }
        Update: {
          user_id?: string
          role?: 'admin' | 'super_admin'
          permissions?: Record<string, any>
          created_at?: string
        }
      }
      audit_logs: {
        Row: {
          id: string
          admin_id: string | null
          action: string
          target_type: string | null
          target_id: string | null
          details: Record<string, any>
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          admin_id?: string | null
          action: string
          target_type?: string | null
          target_id?: string | null
          details?: Record<string, any>
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          admin_id?: string | null
          action?: string
          target_type?: string | null
          target_id?: string | null
          details?: Record<string, any>
          ip_address?: string | null
          created_at?: string
        }
      }
      error_logs: {
        Row: {
          id: string
          user_id: string | null
          error_type: string
          error_message: string
          stack_trace: string | null
          context: Record<string, any>
          resolved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          error_type: string
          error_message: string
          stack_trace?: string | null
          context?: Record<string, any>
          resolved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          error_type?: string
          error_message?: string
          stack_trace?: string | null
          context?: Record<string, any>
          resolved?: boolean
          created_at?: string
        }
      }
      user_media_locks: {
        Row: {
          id: string
          user_id: string
          lock_key: string
          expires_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          lock_key: string
          expires_at: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          lock_key?: string
          expires_at?: string
          created_at?: string
        }
      }
      system_settings: {
        Row: {
          key: string
          value: Record<string, any>
          description: string | null
          updated_at: string
        }
        Insert: {
          key: string
          value: Record<string, any>
          description?: string | null
          updated_at?: string
        }
        Update: {
          key?: string
          value?: Record<string, any>
          description?: string | null
          updated_at?: string
        }
      }
      announcements: {
        Row: {
          id: string
          title: string
          content: string
          type: 'info' | 'warning' | 'success' | 'error'
          is_active: boolean
          priority: number
          start_at: string | null
          end_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          type?: 'info' | 'warning' | 'success' | 'error'
          is_active?: boolean
          priority?: number
          start_at?: string | null
          end_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          type?: 'info' | 'warning' | 'success' | 'error'
          is_active?: boolean
          priority?: number
          start_at?: string | null
          end_at?: string | null
          created_at?: string
        }
      }
    }
  }
}

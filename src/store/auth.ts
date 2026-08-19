import { create } from 'zustand'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

interface AuthState {
  user: User | null
  profile: any | null
  quotas: any | null
  isAdmin: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setProfile: (profile: any | null) => void
  setQuotas: (quotas: any | null) => void
  setIsAdmin: (isAdmin: boolean) => void
  setLoading: (loading: boolean) => void
  fetchProfile: () => Promise<void>
  fetchQuotas: () => Promise<void>
  checkAdmin: () => Promise<boolean>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  quotas: null,
  isAdmin: false,
  isLoading: true,

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  setQuotas: (quotas) => set({ quotas }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setLoading: (isLoading) => set({ isLoading }),

  fetchProfile: async () => {
    const { user } = get()
    if (!user) return

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
    } else {
      set({ profile: data })
    }
  },

  fetchQuotas: async () => {
    const { user } = get()
    if (!user) return

    const { data, error } = await supabase
      .from('user_quotas')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error) {
      console.error('Error fetching quotas:', error)
    } else {
      set({ quotas: data })
    }
  },

  checkAdmin: async () => {
    const { user } = get()
    if (!user) return false

    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error) {
      return false
    }

    set({ isAdmin: true })
    return true
  },

  signOut: async () => {
    await supabase.auth.signOut()
    set({
      user: null,
      profile: null,
      quotas: null,
      isAdmin: false,
      isLoading: false,
    })
  },
}))

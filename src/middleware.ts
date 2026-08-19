import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ cookies: () => request.cookies })

  const { data: { session } } = await supabase.auth.getSession()

  // 保护需要认证的路由
  const protectedRoutes = ['/dashboard', '/chat', '/image', '/video', '/gallery', '/quota', '/pricing', '/profile']
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + '/')
  )

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 保护管理后台路由
  const adminRoutes = ['/admin']
  const isAdminRoute = adminRoutes.some(route => 
    request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + '/')
  )

  if (isAdminRoute && session) {
    // 检查是否是管理员
    const { data: admin } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', session.user.id)
      .single()

    if (!admin) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // 如果已登录，重定向到工作台
  const publicRoutes = ['/login', '/register']
  const isPublicRoute = publicRoutes.some(route => 
    request.nextUrl.pathname === route
  )

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

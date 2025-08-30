
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'
import { checkAuth, checkUserRole } from '@/lib/auth/register'

export default function AdminDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const user = await checkAuth()
      if (!user) {
        router.push('/login')
      } else {
        const role = await checkUserRole()
        if (role !== 'admin') {
          router.push('/dashboard')
        }
      }
    }
    checkUser()
  }, [router])

  const navigateToLogin = () => {
    router.push('/login')
  }

  return (
    <AdminDashboard
      onNavigateToLogin={navigateToLogin}
    />
  )
}

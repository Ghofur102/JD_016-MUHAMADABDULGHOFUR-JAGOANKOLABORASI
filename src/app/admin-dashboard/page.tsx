
'use client'

import { useRouter } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'

export default function AdminDashboardPage() {
  const router = useRouter()

  const navigateToLogin = () => {
    router.push('/login')
  }

  return (
    <AdminDashboard
      onNavigateToLogin={navigateToLogin}
    />
  )
}

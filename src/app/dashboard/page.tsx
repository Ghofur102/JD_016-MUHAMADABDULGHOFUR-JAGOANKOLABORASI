
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Dashboard from '@/components/Dashboard'
import { checkAuth } from '@/lib/auth/register'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const user = await checkAuth()
      if (!user) {
        router.push('/login')
      }
    }
    checkUser()
  }, [router])

  const navigateToLogin = () => {
    router.push('/login')
  }

  const navigateToCariKolaborator = () => {
    router.push('/cari-kolaborator')
  }

  const navigateToProfileEdit = () => {
    router.push('/profile-edit')
  }

  const navigateToAjukanPertanyaan = () => {
    router.push('/ajukan-pertanyaan')
  }

  const navigateToDaftarNotifikasi = () => {
    router.push('/daftar-notifikasi')
  }

  const navigateToBuatKolaborasi = () => {
    router.push('/buat-kolaborasi')
  }

  return (
    <Dashboard
      onNavigateToLogin={navigateToLogin}
      onNavigateToCariKolaborator={navigateToCariKolaborator}
      onNavigateToProfileEdit={navigateToProfileEdit}
      onNavigateToAjukanPertanyaan={navigateToAjukanPertanyaan}
      onNavigateToDaftarNotifikasi={navigateToDaftarNotifikasi}
      onNavigateToBuatKolaborasi={navigateToBuatKolaborasi}
    />
  )
}

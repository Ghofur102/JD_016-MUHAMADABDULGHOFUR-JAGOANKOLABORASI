
'use client'

import { useRouter } from 'next/navigation'
import Dashboard from '@/components/Dashboard'

export default function DashboardPage() {
  const router = useRouter()

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

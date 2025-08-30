
'use client'

import { useRouter } from 'next/navigation'
import DaftarNotifikasi from '@/components/DaftarNotifikasi'
import { useAuth } from '@/hooks/useAuth'

export default function DaftarNotifikasiPage() {
  useAuth()
  const router = useRouter()

  const navigateToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <DaftarNotifikasi onNavigateToDashboard={navigateToDashboard} />
  )
}

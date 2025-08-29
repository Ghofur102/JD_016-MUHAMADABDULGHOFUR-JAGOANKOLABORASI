
'use client'

import { useRouter } from 'next/navigation'
import DaftarNotifikasi from '@/components/DaftarNotifikasi'

export default function DaftarNotifikasiPage() {
  const router = useRouter()

  const navigateToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <DaftarNotifikasi onNavigateToDashboard={navigateToDashboard} />
  )
}

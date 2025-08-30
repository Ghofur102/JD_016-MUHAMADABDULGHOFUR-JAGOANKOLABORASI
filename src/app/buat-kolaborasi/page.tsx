
'use client'

import { useRouter } from 'next/navigation'
import BuatKolaborasi from '@/components/BuatKolaborasi'
import { useAuth } from '@/hooks/useAuth'

export default function BuatKolaborasiPage() {
  useAuth()
  const router = useRouter()

  const navigateToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <BuatKolaborasi onNavigateToDashboard={navigateToDashboard} />
  )
}

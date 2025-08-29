
'use client'

import { useRouter } from 'next/navigation'
import BuatKolaborasi from '@/components/BuatKolaborasi'

export default function BuatKolaborasiPage() {
  const router = useRouter()

  const navigateToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <BuatKolaborasi onNavigateToDashboard={navigateToDashboard} />
  )
}


'use client'

import { useRouter } from 'next/navigation'
import AjukanPertanyaan from '@/components/AjukanPertanyaan'
import { useAuth } from '@/hooks/useAuth'

export default function AjukanPertanyaanPage() {
  useAuth()
  const router = useRouter()

  const navigateToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <AjukanPertanyaan onNavigateToDashboard={navigateToDashboard} />
  )
}

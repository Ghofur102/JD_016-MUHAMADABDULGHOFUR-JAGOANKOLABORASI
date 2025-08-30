
'use client'

import { useRouter } from 'next/navigation'
import CariKolaborator from '@/components/CariKolaborator'
import { useAuth } from '@/hooks/useAuth'

export default function CariKolaboratorPage() {
  useAuth()
  const router = useRouter()

  const navigateToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <CariKolaborator onNavigateToDashboard={navigateToDashboard} />
  )
}


'use client'

import { useRouter } from 'next/navigation'
import CariKolaborator from '@/components/CariKolaborator'

export default function CariKolaboratorPage() {
  const router = useRouter()

  const navigateToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <CariKolaborator onNavigateToDashboard={navigateToDashboard} />
  )
}


'use client'

import { useRouter } from 'next/navigation'
import AjukanPertanyaan from '@/components/AjukanPertanyaan'

export default function AjukanPertanyaanPage() {
  const router = useRouter()

  const navigateToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <AjukanPertanyaan onNavigateToDashboard={navigateToDashboard} />
  )
}

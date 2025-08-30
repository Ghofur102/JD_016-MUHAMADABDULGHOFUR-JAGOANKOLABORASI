
'use client'

import { useRouter } from 'next/navigation'
import ProfileEdit from '@/components/ProfileEdit'
import { useAuth } from '@/hooks/useAuth'

export default function ProfileEditPage() {
  useAuth()
  const router = useRouter()

  const navigateToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <ProfileEdit onNavigateToDashboard={navigateToDashboard} />
  )
}

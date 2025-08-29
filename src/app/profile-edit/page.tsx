
'use client'

import { useRouter } from 'next/navigation'
import ProfileEdit from '@/components/ProfileEdit'

export default function ProfileEditPage() {
  const router = useRouter()

  const navigateToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <ProfileEdit onNavigateToDashboard={navigateToDashboard} />
  )
}

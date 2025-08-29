
'use client'

import { useRouter } from 'next/navigation'
import RegisterPage from '@/components/RegisterPage'

export default function Register() {
  const router = useRouter()

  const navigateToLanding = () => {
    router.push('/')
  }

  const navigateToLogin = () => {
    router.push('/login')
  }

  const handleRegisterSuccess = () => {
    router.push('/dashboard')
  }

  return (
    <RegisterPage
      onNavigateToLanding={navigateToLanding}
      onNavigateToLogin={navigateToLogin}
      onRegisterSuccess={handleRegisterSuccess}
    />
  )
}

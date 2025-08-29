
'use client'

import { useRouter } from 'next/navigation'
import LoginPage from '@/components/LoginPage'

type UserType = "user" | "admin" | null;

export default function Login() {
  const router = useRouter()

  const navigateToLanding = () => {
    router.push('/')
  }

  const navigateToRegister = () => {
    router.push('/register')
  }

  const handleLoginSuccess = (loginUserType: UserType) => {
    if (loginUserType === "admin") {
      router.push('/admin-dashboard')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <LoginPage
      onNavigateToLanding={navigateToLanding}
      onNavigateToRegister={navigateToRegister}
      onLoginSuccess={handleLoginSuccess}
    />
  )
}

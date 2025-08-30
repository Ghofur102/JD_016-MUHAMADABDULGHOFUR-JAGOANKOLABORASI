
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoginPage from '@/components/LoginPage'
import { checkAuth } from '@/lib/auth/register'

type UserType = "user" | "admin" | null;

export default function Login() {
  const router = useRouter()

  useEffect(() => {
    const checkUser = async () => {
      const user = await checkAuth()
      if (user) {
        router.push('/dashboard')
      }
    }
    checkUser()
  }, [router])

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

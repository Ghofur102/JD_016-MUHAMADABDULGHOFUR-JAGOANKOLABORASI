
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import RegisterPage from '@/components/RegisterPage'
import { checkAuth } from '@/lib/auth/register'

export default function Register() {
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

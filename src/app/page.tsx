'use client'

import { useRouter } from 'next/navigation'
import LandingPage from '@/components/LandingPage'

export default function Home() {
  const router = useRouter()

  const navigateToLogin = () => {
    router.push('/login')
  }

  const navigateToRegister = () => {
    router.push('/register')
  }

  const navigateToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <LandingPage 
      onNavigateToLogin={navigateToLogin}
      onNavigateToRegister={navigateToRegister}
      onNavigateToDashboard={navigateToDashboard}
    />
  )
}
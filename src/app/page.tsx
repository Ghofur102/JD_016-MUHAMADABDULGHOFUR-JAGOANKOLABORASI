
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

  return (
    <LandingPage 
      onNavigateToLogin={navigateToLogin}
      onNavigateToRegister={navigateToRegister}
    />
  )
}

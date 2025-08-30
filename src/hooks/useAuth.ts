import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { checkAuth } from '@/lib/auth/register';

export const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const user = await checkAuth();
      if (!user) {
        router.push('/login');
      }
    };
    checkUser();
  }, [router]);
};

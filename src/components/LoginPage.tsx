import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ArrowLeft, Menu, X } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { handleGoogleSignIn, supabase } from "@/lib/auth/register";
import { useRouter } from "next/navigation";

interface LoginPageProps {
  onNavigateToLanding: () => void;
  onNavigateToRegister: () => void;
  onLoginSuccess: (userType: "user" | "admin") => void;
}

export default function LoginPage({
  onNavigateToLanding,
  onNavigateToRegister,
  onLoginSuccess,
}: LoginPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAdminLogin = () => {
    // Quick admin access for demo
    onLoginSuccess("admin");
  };
  
  const router = useRouter();

  useEffect(() => {
      const checkUser = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
  
        if (user) {
          // Jika tidak ada user, redirect ke halaman login
          router.push("/dashboard");
        } else {
         
        }
      };
  
      checkUser();
    }, [router]); // Tambahkan router sebagai dependency

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg lg:text-xl">
                  J
                </span>
              </div>
              <span className="font-bold text-lg lg:text-xl">
                Jagoan Banyuwangi
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:block">
              <Button
                variant="ghost"
                className="flex items-center gap-2 text-sm lg:text-base"
                onClick={onNavigateToLanding}
              >
                <ArrowLeft className="size-4" />
                Kembali ke Beranda
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="sm:hidden pb-4">
              <Button
                variant="ghost"
                onClick={onNavigateToLanding}
                className="w-full justify-start"
              >
                <ArrowLeft className="size-4 mr-2" />
                Kembali ke Beranda
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center px-4 py-8 sm:py-12 lg:py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900">
              Selamat Datang Kembali!
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Masuk ke akun Jagoan Banyuwangi kamu
            </p>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader className="space-y-1 pb-4 lg:pb-6">
              <CardTitle className="text-xl lg:text-2xl text-center">
                Masuk
              </CardTitle>
              <CardDescription className="text-center text-sm lg:text-base">
                Gunakan akun Google untuk masuk dengan mudah
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 lg:space-y-6">
              {/* Primary Google Login */}
              <Button
                onClick={async () => {
                  setIsLoading(true);
                  try {
                    const { error } = await handleGoogleSignIn();
                    if (!error) {
                      onLoginSuccess("user");
                    }
                  } finally {
                    setIsLoading(false);
                  }
                }}
                disabled={isLoading}
                className="w-full h-11 lg:h-12 text-sm lg:text-base"
              >
                {isLoading ? (
                  "Menghubungkan..."
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Masuk dengan Google
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Atau khusus admin
                  </span>
                </div>
              </div>

              {/* Admin Quick Access */}
              <Button
                onClick={handleAdminLogin}
                variant="outline"
                className="w-full h-11 lg:h-12 text-sm lg:text-base border-red-200 text-red-600 hover:bg-red-50"
              >
                Masuk sebagai Admin
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Belum punya akun?
                  <button
                    onClick={onNavigateToRegister}
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    Daftar di sini
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-64 h-64 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-64 h-64 lg:w-96 lg:h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-64 h-64 lg:w-96 lg:h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
}

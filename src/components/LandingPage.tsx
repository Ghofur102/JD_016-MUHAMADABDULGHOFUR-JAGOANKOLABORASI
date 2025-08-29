import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Star, 
  ArrowRight, 
  Facebook, 
  Instagram, 
  Twitter,
  Youtube,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

interface LandingPageProps {
  onNavigateToLogin: () => void;
  onNavigateToRegister: () => void;
}

const valuePropositions = [
  {
    icon: MessageSquare,
    title: "Konsultasi Program",
    description: "Dapatkan bimbingan dan konsultasi untuk program kewirausahaan, PKM, dan pengembangan bisnis dari para ahli.",
    color: "text-blue-600"
  },
  {
    icon: Users,
    title: "Temu Mitra Kolaborasi",
    description: "Temukan partner kolaborasi yang tepat untuk mengembangkan ide dan mewujudkan proyek impianmu.",
    color: "text-green-600"
  },
  {
    icon: TrendingUp,
    title: "Dukung Usaha Kamu",
    description: "Dapatkan dukungan, networking, dan resources yang dibutuhkan untuk mengembangkan usaha dan kariermu.",
    color: "text-purple-600"
  }
];

const testimonials = [
  {
    name: "Rina Kartika",
    role: "Founder StartupTech Banyuwangi",
    content: "Platform ini sangat membantu saya menemukan co-founder untuk startup teknologi. Dalam 2 bulan, kami berhasil mendapat pendanaan pertama!",
    avatar: "RK",
    rating: 5
  },
  {
    name: "Ahmad Syahrul",
    role: "Mahasiswa PKM Winner",
    content: "Konsultasi dengan mentor di platform ini membuat proposal PKM saya lolos hingga tingkat nasional. Sangat recommended!",
    avatar: "AS",
    rating: 5
  },
  {
    name: "Sari Dewi",
    role: "UKM Owner",
    content: "Networking yang saya dapat dari platform ini luar biasa. Usaha kuliner saya sekarang sudah berkembang ke 3 kota!",
    avatar: "SD",
    rating: 5
  }
];

export default function LandingPage({ onNavigateToLogin, onNavigateToRegister }: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg lg:text-xl">J</span>
              </div>
              <span className="font-bold text-lg lg:text-xl">Jagoan Banyuwangi</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
              <Button variant="ghost" onClick={onNavigateToLogin} className="text-sm lg:text-base">
                Masuk
              </Button>
              <Button onClick={onNavigateToRegister} className="text-sm lg:text-base" variant="dark">
                Daftar Sekarang
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <Button 
                variant="ghost" 
                onClick={onNavigateToLogin}
                className="w-full justify-start"
              >
                Masuk
              </Button>
              <Button 
                onClick={onNavigateToRegister}
                className="w-full" variant="dark"
              >
                Daftar Sekarang
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit mx-auto lg:mx-0">
                  Platform Kolaborasi #1 di Banyuwangi
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  Wadah Kolaborasi Para
                  <span className="text-primary">Jagoan Banyuwangi</span>
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                  Bergabunglah dengan komunitas entrepreneur, mahasiswa, dan profesional 
                  untuk berkolaborasi, berbagi ilmu, dan mewujudkan ide-ide hebat.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button onClick={onNavigateToRegister} size="lg" className="text-base px-6 lg:px-8" variant="dark">
                  Daftar Sekarang
                  <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button variant="outline" onClick={onNavigateToLogin} size="lg" className="text-base px-6 lg:px-8">
                  Masuk
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-sm text-muted-foreground">
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <Users className="size-4" />
                  <span>500+ Member Aktif</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <MessageSquare className="size-4" />
                  <span>200+ Konsultasi</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start space-x-2">
                  <TrendingUp className="size-4" />
                  <span>150+ Kolaborasi</span>
                </div>
              </div>
            </div>
            <div className="relative order-first lg:order-last">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1637743408313-c9d5e869d9db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsYWJvcmF0aW9uJTIwdGVhbXdvcmslMjBpbmRvbmVzaWF8ZW58MXx8fHwxNzU2MDAyMTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Kolaborasi Tim"
                  className="w-full h-[250px] sm:h-[300px] lg:h-[400px] xl:h-[500px] object-cover"
                />
              </div>
              {/* Floating Cards */}
              <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 bg-white rounded-lg shadow-lg p-3 sm:p-4 max-w-[180px] sm:max-w-[200px]">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="size-3 sm:size-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-xs sm:text-sm">Kolaborasi Sukses</p>
                    <p className="text-xs text-muted-foreground">+25% minggu ini</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-white rounded-lg shadow-lg p-3 sm:p-4 max-w-[180px] sm:max-w-[200px]">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="size-3 sm:size-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-xs sm:text-sm">Member Bergabung</p>
                    <p className="text-xs text-muted-foreground">50+ hari ini</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Mengapa Memilih Jagoan Banyuwangi?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Platform terintegrasi yang mendukung pengembangan diri dan bisnis 
              para jagoan muda Banyuwangi
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {valuePropositions.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 lg:p-8 text-center space-y-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto rounded-2xl bg-gradient-to-br ${
                      index === 0 ? 'from-blue-100 to-blue-200' :
                      index === 1 ? 'from-green-100 to-green-200' :
                      'from-purple-100 to-purple-200'
                    } flex items-center justify-center`}>
                      <IconComponent className={`size-6 sm:size-7 lg:size-8 ${item.color}`} />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Kata Para Jagoan
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Dengarkan cerita sukses dari para member yang telah merasakan manfaat 
              bergabung dengan komunitas kami
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg h-full">
                <CardContent className="p-6 space-y-4 h-full flex flex-col">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground italic leading-relaxed flex-1">
                    `{testimonial.content}`
                  </p>
                  <div className="flex items-center space-x-3 pt-4 border-t">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-primary-foreground font-medium text-sm">
                        {testimonial.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-sm sm:text-base">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 lg:space-y-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
            Siap Menjadi Jagoan Berikutnya?
          </h2>
          <p className="text-base sm:text-lg opacity-90 max-w-2xl mx-auto">
            Bergabunglah dengan komunitas para jagoan Banyuwangi dan mulai 
            wujudkan ide-ide hebatmu bersama-sama!
          </p>
          <div className="flex justify-center">
            <Button variant="dark" onClick={onNavigateToRegister} size="lg" className="text-base px-6 lg:px-8">
              Daftar Gratis Sekarang
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="space-y-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-gray-900 font-bold">J</span>
                </div>
                <span className="font-bold text-lg">Jagoan Banyuwangi</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Platform kolaborasi terdepan untuk para entrepreneur dan profesional muda Banyuwangi.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Konsultasi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kolaborasi</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Networking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentoring</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Bantuan</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Panduan</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kontak</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Kebijakan</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Ikuti Kami</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Facebook className="size-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Instagram className="size-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Twitter className="size-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Youtube className="size-4" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 lg:mt-8 pt-6 lg:pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Jagoan Banyuwangi. Website demo ide aplikasi oleh peserta jagoan digital.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
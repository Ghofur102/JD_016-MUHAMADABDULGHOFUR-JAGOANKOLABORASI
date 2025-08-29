import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  ArrowLeft, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Star,
  ExternalLink,
  Search,
  Filter,
  Eye,
  Phone,
  Mail,
  Calendar,
  Award,
  Lightbulb,
  TrendingUp
} from "lucide-react";
import { Input } from "./ui/input";

interface CariKolaboratorProps {
  onNavigateToDashboard: () => void;
}

// Mock data for different categories
const mockJagoanDigital = [
  {
    id: 1,
    name: "Ahmad Rizki Pratama",
    avatar: "AR",
    location: "Banyuwangi Kota",
    specialty: "Full Stack Developer",
    description: "Berpengalaman 3+ tahun dalam pengembangan web dan mobile app. Spesialisasi React, Node.js, dan React Native.",
    skills: ["React", "Node.js", "React Native", "MongoDB"],
    portfolio: [
      {
        title: "E-commerce App",
        image: "https://images.unsplash.com/photo-1601387913800-b48217dc5fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMHN0YXJ0dXB8ZW58MXx8fHwxNzU2MDQ5MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Platform e-commerce untuk UMKM lokal"
      },
      {
        title: "Mobile Banking App",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NTU5NzQ3ODN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Aplikasi mobile banking untuk koperasi"
      }
    ],
    rating: 4.8,
    reviewCount: 12,
    responseTime: "< 2 jam",
    phone: "6281234567890",
    lastActive: "2 menit yang lalu"
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    avatar: "SN",
    location: "Banyuwangi Selatan",
    specialty: "UI/UX Designer",
    description: "Passionate UI/UX designer dengan fokus pada user-centered design. Berpengalaman mendesain untuk startup dan UMKM.",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    portfolio: [
      {
        title: "Tourism App Design",
        image: "https://images.unsplash.com/photo-1601387913800-b48217dc5fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMHN0YXJ0dXB8ZW58MXx8fHwxNzU2MDQ5MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Design aplikasi wisata Banyuwangi"
      }
    ],
    rating: 4.9,
    reviewCount: 8,
    responseTime: "< 1 jam",
    phone: "6281234567891",
    lastActive: "5 menit yang lalu"
  },
  {
    id: 3,
    name: "Budi Santoso",
    avatar: "BS",
    location: "Banyuwangi Utara",
    specialty: "Data Scientist",
    description: "Data scientist dengan passion untuk AI dan machine learning. Membantu bisnis membuat keputusan berbasis data.",
    skills: ["Python", "Machine Learning", "Data Analysis", "TensorFlow"],
    portfolio: [
      {
        title: "Sales Prediction Model",
        image: "https://images.unsplash.com/photo-1601387913800-b48217dc5fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMHN0YXJ0dXB8ZW58MXx8fHwxNzU2MDQ5MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Model prediksi penjualan untuk retail"
      }
    ],
    rating: 4.7,
    reviewCount: 6,
    responseTime: "< 3 jam",
    phone: "6281234567892",
    lastActive: "1 jam yang lalu"
  }
];

const mockJagoanTani = [
  {
    id: 4,
    name: "Pak Surya Wijaya",
    avatar: "SW",
    location: "Desa Kemiren",
    specialty: "Organic Farming Expert",
    description: "Petani organik berpengalaman 15+ tahun. Spesialis budidaya padi organik dan sayuran hidroponik.",
    skills: ["Organic Farming", "Hydroponics", "Pest Management", "Soil Analysis"],
    portfolio: [
      {
        title: "Organic Rice Field",
        image: "https://images.unsplash.com/photo-1688677825986-4ffb926bafc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGZhcm1pbmclMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NjAyMzA0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Sawah padi organik seluas 2 hektar"
      },
      {
        title: "Hydroponic Vegetables",
        image: "https://images.unsplash.com/photo-1738598667319-fbee044cd8cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwZmFybWluZyUyMHByb2R1Y2V8ZW58MXx8fHwxNzU2MDQ5MTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Greenhouse hidroponik sayuran"
      }
    ],
    rating: 4.9,
    reviewCount: 15,
    responseTime: "< 4 jam",
    phone: "6281234567893",
    lastActive: "30 menit yang lalu"
  },
  {
    id: 5,
    name: "Ibu Ratna Sari",
    avatar: "RS",
    location: "Desa Sukamade",
    specialty: "Agribusiness Consultant",
    description: "Konsultan agribisnis dengan fokus pada sustainable farming dan marketing produk pertanian.",
    skills: ["Sustainable Farming", "Agricultural Marketing", "Business Planning", "Organic Certification"],
    portfolio: [
      {
        title: "Community Farm Project",
        image: "https://images.unsplash.com/photo-1688677825986-4ffb926bafc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZ3JpY3VsdHVyZSUyMGZhcm1pbmclMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NjAyMzA0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Proyek pertanian komunitas berkelanjutan"
      }
    ],
    rating: 4.8,
    reviewCount: 10,
    responseTime: "< 2 jam",
    phone: "6281234567894",
    lastActive: "15 menit yang lalu"
  }
];

const mockJagoanBisnis = [
  {
    id: 6,
    name: "Diana Putri Maharani",
    avatar: "DP",
    location: "Banyuwangi Kota",
    specialty: "Digital Marketing Strategist",
    description: "Digital marketing expert dengan track record meningkatkan penjualan UMKM hingga 300%. Spesialis social media dan content marketing.",
    skills: ["Social Media Marketing", "Content Strategy", "Google Ads", "SEO"],
    portfolio: [
      {
        title: "UMKM Growth Campaign",
        image: "https://images.unsplash.com/photo-1644635681984-0f526ca05af0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGVudHJlcHJlbmV1ciUyMG9mZmljZXxlbnwxfHx8fDE3NTYwNDkwOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Kampanye digital untuk UMKM kuliner"
      },
      {
        title: "Brand Strategy Workshop",
        image: "https://images.unsplash.com/photo-1723987251277-18fc0a1effd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN0cmF0ZWd5JTIwcGxhbm5pbmd8ZW58MXx8fHwxNzU1OTQ4MDg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Workshop strategi branding untuk startup"
      }
    ],
    rating: 4.9,
    reviewCount: 18,
    responseTime: "< 1 jam",
    phone: "6281234567895",
    lastActive: "Online sekarang"
  },
  {
    id: 7,
    name: "Eko Prasetyo",
    avatar: "EP",
    location: "Banyuwangi Timur",
    specialty: "Business Development",
    description: "Business development specialist dengan pengalaman membantu startup dan UMKM scale up. Expert dalam business model innovation.",
    skills: ["Business Strategy", "Financial Planning", "Partnership Development", "Market Research"],
    portfolio: [
      {
        title: "Startup Acceleration Program",
        image: "https://images.unsplash.com/photo-1644635681984-0f526ca05af0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGVudHJlcHJlbmV1ciUyMG9mZmljZXxlbnwxfHx8fDE3NTYwNDkwOTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        description: "Program akselerasi untuk 10 startup lokal"
      }
    ],
    rating: 4.7,
    reviewCount: 12,
    responseTime: "< 2 jam",
    phone: "6281234567896",
    lastActive: "10 menit yang lalu"
  }
];

const ProfileCard = ({ profile }: { profile: any }) => {
  const handleContactWhatsApp = () => {
    const message = `Halo ${profile.name}, saya tertarik untuk berkolaborasi dengan Anda melalui platform Jagoan Banyuwangi.`;
    const whatsappUrl = `https://wa.me/${profile.phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarFallback className="bg-primary text-primary-foreground">
                {profile.avatar}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{profile.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{profile.specialty}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{profile.location}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{profile.rating}</span>
              <span className="text-xs text-muted-foreground">({profile.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Clock className="size-3 text-green-600" />
              <span className="text-xs text-green-600">{profile.responseTime}</span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {profile.description}
        </p>

        {/* Skills */}
        <div>
          <h4 className="text-sm font-medium mb-2">Keahlian</h4>
          <div className="flex flex-wrap gap-1">
            {profile.skills.slice(0, 3).map((skill: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {profile.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{profile.skills.length - 3} lainnya
              </Badge>
            )}
          </div>
        </div>

        {/* Portfolio Preview */}
        <div>
          <h4 className="text-sm font-medium mb-2">Portfolio ({profile.portfolio.length})</h4>
          <div className="flex gap-2">
            {profile.portfolio.slice(0, 2).map((item: any, index: number) => (
              <div key={index} className="flex-1">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-16 object-cover rounded-md"
                />
              </div>
            ))}
            {profile.portfolio.length > 2 && (
              <div className="flex-1 bg-gray-100 rounded-md h-16 flex items-center justify-center">
                <span className="text-xs text-gray-600">+{profile.portfolio.length - 2}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button 
            onClick={handleContactWhatsApp}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <MessageCircle className="size-4 mr-2" />
            WhatsApp
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1">
                <Eye className="size-4 mr-2" />
                Detail
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {profile.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    {profile.name}
                    <p className="text-lg text-muted-foreground font-normal">{profile.specialty}</p>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  Detail lengkap profil dan portfolio kolaborator
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Phone className="size-5 text-blue-600" />
                      Informasi Kontak
                    </h4>
                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <MapPin className="size-4 text-gray-600" />
                        <span className="text-sm">{profile.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="size-4 text-gray-600" />
                        <span className="text-sm">{profile.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="size-4 text-gray-600" />
                        <span className="text-sm">Terakhir aktif: {profile.lastActive}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <Award className="size-5 text-purple-600" />
                      Rating & Performa
                    </h4>
                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{profile.rating} dari 5.0 ({profile.reviewCount} review)</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="size-4 text-green-600" />
                        <span className="text-sm">Response time: {profile.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <TrendingUp className="size-4 text-blue-600" />
                        <span className="text-sm">95% completion rate</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Tentang {profile.name}</h4>
                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {profile.description}
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Keahlian & Kompetensi</h4>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Portfolio */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Portfolio & Karya</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.portfolio.map((item: any, index: number) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="relative">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h5 className="font-medium">{item.title}</h5>
                            <p className="text-sm opacity-90">{item.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Contact Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button 
                    onClick={handleContactWhatsApp}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <MessageCircle className="size-4 mr-2" />
                    Hubungi via WhatsApp
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Mail className="size-4 mr-2" />
                    Kirim Email
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Last Active */}
        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          Terakhir aktif: {profile.lastActive}
        </div>
      </CardContent>
    </Card>
  );
};

export default function CariKolaborator({ onNavigateToDashboard }: CariKolaboratorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showRecommendations, setShowRecommendations] = useState(false);

  const getRecommendedProfiles = () => {
    // Simulasi algoritma rekomendasi berdasarkan skill matching dan rating
    const allProfiles = [...mockJagoanDigital, ...mockJagoanTani, ...mockJagoanBisnis];
    return allProfiles
      .filter(profile => profile.rating >= 4.7) // High-rated only
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 6); // Top 6 recommendations
  };

  const handleGetRecommendations = () => {
    setShowRecommendations(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">J</span>
              </div>
              <span className="font-bold text-lg">Jagoan Banyuwangi</span>
            </div>
            <Button variant="ghost" className="flex items-center gap-2" onClick={onNavigateToDashboard}>
              <ArrowLeft className="size-4" />
              Kembali ke Dashboard
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Cari Kolaborator</h1>
          <p className="text-muted-foreground">
            Temukan partner yang tepat untuk mewujudkan proyek impianmu
          </p>
        </div>

        {/* Search and Actions */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan nama, keahlian, atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="size-4 mr-2" />
            Filter
          </Button>
          <Button 
            onClick={handleGetRecommendations}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Lightbulb className="size-4 mr-2" />
            Rekomendasi
          </Button>
        </div>

        {/* Recommendations Section */}
        {showRecommendations && (
          <div className="mb-8">
            <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-700">
                  <Lightbulb className="size-6" />
                  Rekomendasi Kolaborator Terbaik untuk Anda
                </CardTitle>
                <p className="text-sm text-purple-600">
                  Berdasarkan rating tinggi dan keahlian yang relevan dengan kebutuhan umum proyek
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getRecommendedProfiles().map((profile) => (
                    <Card key={profile.id} className="border border-purple-200 bg-white relative">
                      <div className="absolute top-2 right-2 z-10">
                        <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                          <Star className="size-3 mr-1" />
                          Rekomendasi
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="size-10">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              {profile.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{profile.name}</h4>
                            <p className="text-xs text-muted-foreground">{profile.specialty}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Star className="size-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">{profile.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              const message = `Halo ${profile.name}, saya mendapat rekomendasi Anda dari platform Jagoan Banyuwangi dan tertarik untuk berkolaborasi.`;
                              const whatsappUrl = `https://wa.me/${profile.phone}?text=${encodeURIComponent(message)}`;
                              window.open(whatsappUrl, '_blank');
                            }}
                          >
                            <MessageCircle className="size-3 mr-1" />
                            Kontak
                          </Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="flex-1">
                                <Eye className="size-3 mr-1" />
                                Detail
                              </Button>                            
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-2xl flex items-center gap-3">
                                  <Avatar className="size-12">
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                      {profile.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    {profile.name}
                                    <p className="text-lg text-muted-foreground font-normal">{profile.specialty}</p>
                                  </div>
                                </DialogTitle>
                                <DialogDescription>
                                  Profil kolaborator yang direkomendasikan khusus untuk Anda
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-6 py-4">
                                {/* Contact Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                      <Phone className="size-5 text-blue-600" />
                                      Informasi Kontak
                                    </h4>
                                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                                      <div className="flex items-center gap-3">
                                        <MapPin className="size-4 text-gray-600" />
                                        <span className="text-sm">{profile.location}</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Phone className="size-4 text-gray-600" />
                                        <span className="text-sm">{profile.phone}</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Clock className="size-4 text-gray-600" />
                                        <span className="text-sm">Terakhir aktif: {profile.lastActive}</span>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                      <Award className="size-5 text-purple-600" />
                                      Rating & Performa
                                    </h4>
                                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                                      <div className="flex items-center gap-3">
                                        <Star className="size-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium">{profile.rating} dari 5.0 ({profile.reviewCount} review)</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <Clock className="size-4 text-green-600" />
                                        <span className="text-sm">Response time: {profile.responseTime}</span>
                                      </div>
                                      <div className="flex items-center gap-3">
                                        <TrendingUp className="size-4 text-blue-600" />
                                        <span className="text-sm">95% completion rate</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Description */}
                                <div>
                                  <h4 className="font-bold text-gray-900 mb-2">Tentang {profile.name}</h4>
                                  <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">
                                    {profile.description}
                                  </p>
                                </div>

                                {/* Skills */}
                                <div>
                                  <h4 className="font-bold text-gray-900 mb-2">Keahlian & Kompetensi</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {profile.skills.map((skill: string, index: number) => (
                                      <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                {/* Portfolio */}
                                <div>
                                  <h4 className="font-bold text-gray-900 mb-3">Portfolio & Karya</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {profile.portfolio.map((item: any, index: number) => (
                                      <Card key={index} className="overflow-hidden">
                                        <div className="relative">
                                          <ImageWithFallback
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-48 object-cover"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                          <div className="absolute bottom-4 left-4 text-white">
                                            <h5 className="font-medium">{item.title}</h5>
                                            <p className="text-sm opacity-90">{item.description}</p>
                                          </div>
                                        </div>
                                      </Card>
                                    ))}
                                  </div>
                                </div>

                                {/* Contact Actions */}
                                <div className="flex gap-3 pt-4 border-t">
                                  <Button 
                                    onClick={() => {
                                      const message = `Halo ${profile.name}, saya mendapat rekomendasi Anda dari platform Jagoan Banyuwangi dan tertarik untuk berkolaborasi.`;
                                      const whatsappUrl = `https://wa.me/${profile.phone}?text=${encodeURIComponent(message)}`;
                                      window.open(whatsappUrl, '_blank');
                                    }}
                                    className="flex-1 bg-green-600 hover:bg-green-700"
                                  >
                                    <MessageCircle className="size-4 mr-2" />
                                    Hubungi via WhatsApp
                                  </Button>
                                  <Button variant="outline" className="flex-1">
                                    <Mail className="size-4 mr-2" />
                                    Kirim Email
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowRecommendations(false)}
                    className="text-purple-600 hover:text-purple-700"
                  >
                    Sembunyikan Rekomendasi
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="digital" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="digital" className="flex items-center gap-2">
              💻 Jagoan Digital
            </TabsTrigger>
            <TabsTrigger value="tani" className="flex items-center gap-2">
              🌱 Jagoan Tani
            </TabsTrigger>
            <TabsTrigger value="bisnis" className="flex items-center gap-2">
              💼 Jagoan Bisnis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="digital" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockJagoanDigital.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tani" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockJagoanTani.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bisnis" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockJagoanBisnis.map((profile) => (
                <ProfileCard key={profile.id} profile={profile} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
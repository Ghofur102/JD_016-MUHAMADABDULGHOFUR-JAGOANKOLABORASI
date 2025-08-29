import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  LogOut, 
  MessageSquare, 
  Users, 
  BarChart3, 
  Send, 
  UserCheck,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Filter,
  Eye,
  MapPin,
  DollarSign,
  Target,
  Briefcase,
  Menu,
  X
} from "lucide-react";

// Mock data untuk pertanyaan yang masuk
const mockQuestions = [
  {
    id: 1,
    user: "Ahmad Rizki",
    avatar: "AR",
    question: "Bagaimana cara mengoptimalkan performa aplikasi React yang sudah besar?",
    category: "Jagoan Digital",
    time: "2 jam yang lalu",
    status: "pending",
    urgency: "high"
  },
  {
    id: 2,
    user: "Siti Nurhaliza",
    avatar: "SN",
    question: "Teknik terbaik untuk meningkatkan hasil panen padi di musim kemarau?",
    category: "Jagoan Tani",
    time: "4 jam yang lalu",
    status: "pending",
    urgency: "medium"
  },
  {
    id: 3,
    user: "Budi Santoso",
    avatar: "BS",
    question: "Strategi marketing digital untuk UMKM pemula dengan budget terbatas?",
    category: "Jagoan Bisnis",
    time: "6 jam yang lalu",
    status: "answered",
    urgency: "low"
  },
  {
    id: 4,
    user: "Maria Putri",
    avatar: "MP",
    question: "Cara membuat UI yang user-friendly untuk aplikasi e-commerce?",
    category: "Jagoan Digital",
    time: "1 hari yang lalu",
    status: "pending",
    urgency: "medium"
  }
];

// Mock data untuk kolaborasi dengan detail lengkap sesuai form BuatKolaborasi
const mockCollaborations = [
  {
    id: 1,
    projectName: "Aplikasi Marketplace Produk Lokal Banyuwangi",
    category: "digital",
    description: "Membuat platform e-commerce khusus untuk mempromosikan dan menjual produk-produk lokal Banyuwangi. Platform ini akan memudahkan UMKM untuk memasarkan produk mereka secara online dan membantu wisatawan serta masyarakat lokal menemukan produk khas Banyuwangi.",
    goals: "Meningkatkan ekonomi lokal dengan memberikan wadah digital bagi UMKM, meningkatkan awareness produk lokal, dan memudahkan akses konsumen terhadap produk-produk khas Banyuwangi.",
    duration: "6bulan-1tahun",
    location: "Banyuwangi & Remote",
    budget: "Rp 15.000.000",
    teamSize: "4-5",
    skillsNeeded: "Frontend Developer (React/Vue), Backend Developer (Node.js/PHP), UI/UX Designer, Digital Marketing Specialist",
    timeline: "Bulan 1-2: Research dan Design, Bulan 3-4: Development MVP, Bulan 5-6: Testing dan Launch",
    benefits: "Pengalaman membangun aplikasi real-world, portfolio project, networking dengan UMKM lokal, sertifikat completion",
    members: [
      { name: "Ahmad Rizki", role: "Project Leader & Frontend Developer", avatar: "AR", email: "ahmad.rizki@email.com", phone: "081234567890" },
      { name: "Siti Nurhaliza", role: "UI/UX Designer", avatar: "SN", email: "siti.nurhaliza@email.com", phone: "081234567891" }
    ],
    status: "active",
    startDate: "15 Des 2024",
    createdBy: "Ahmad Rizki"
  },
  {
    id: 2,
    projectName: "Program Pelatihan Hidroponik untuk Petani Muda",
    category: "tani",
    description: "Mengembangkan program pelatihan komprehensif tentang teknik hidroponik modern untuk petani muda di Banyuwangi. Program ini akan mencakup pelatihan hands-on, penyediaan starter kit, dan mentoring berkelanjutan.",
    goals: "Meningkatkan produktivitas pertanian dengan teknologi hidroponik, menciptakan lapangan kerja baru untuk pemuda, dan mendukung ketahanan pangan daerah.",
    duration: "3-6bulan",
    location: "Banyuwangi",
    budget: "Rp 25.000.000",
    teamSize: "6-8",
    skillsNeeded: "Ahli Pertanian Hidroponik, Instruktur/Pelatih, Content Creator, Social Media Manager, Koordinator Lapangan",
    timeline: "Bulan 1: Persiapan materi dan lokasi, Bulan 2-3: Pelaksanaan pelatihan batch 1-2, Bulan 4: Evaluasi dan mentoring",
    benefits: "Kontribusi langsung untuk pembangunan pertanian daerah, networking dengan petani dan stakeholder pertanian, sertifikat dari Dinas Pertanian",
    members: [
      { name: "Budi Santoso", role: "Lead Instructor & Ahli Hidroponik", avatar: "BS", email: "budi.santoso@email.com", phone: "081234567892" },
      { name: "Maria Putri", role: "Content Creator & Dokumentasi", avatar: "MP", email: "maria.putri@email.com", phone: "081234567893" }
    ],
    status: "active",
    startDate: "10 Des 2024",
    createdBy: "Budi Santoso"
  },
  {
    id: 3,
    projectName: "Konsultasi Strategi Bisnis UMKM Digital",
    category: "bisnis",
    description: "Menyediakan layanan konsultasi bisnis gratis untuk UMKM di Banyuwangi yang ingin berkembang ke platform digital. Meliputi analisis bisnis, strategi pemasaran digital, dan implementasi tools bisnis modern.",
    goals: "Membantu transformasi digital UMKM lokal, meningkatkan omzet UMKM melalui strategi digital, dan menciptakan ekosistem bisnis yang lebih modern di Banyuwangi.",
    duration: "6bulan-1tahun",
    location: "Banyuwangi",
    budget: "Swadaya + Sponsor",
    teamSize: "4-5",
    skillsNeeded: "Business Consultant/Analyst, Digital Marketing Expert, Financial Advisor, Mentor Bisnis",
    timeline: "Ongoing: Konsultasi per batch (10 UMKM per batch), setiap batch 2 bulan intensif mentoring",
    benefits: "Pengalaman konsultasi real-world, networking dengan pelaku UMKM, potensi menjadi partner bisnis, testimoni untuk portfolio",
    members: [
      { name: "Yoga Pratama", role: "Lead Business Consultant", avatar: "YP", email: "yoga.pratama@email.com", phone: "081234567894" },
      { name: "Lisa Wati", role: "Digital Marketing Strategist", avatar: "LW", email: "lisa.wati@email.com", phone: "081234567895" }
    ],
    status: "completed",
    startDate: "1 Des 2024",
    createdBy: "Yoga Pratama"
  },
  {
    id: 4,
    projectName: "Aplikasi Monitoring Tanaman Berbasis IoT",
    category: "gabungan",
    description: "Mengembangkan sistem monitoring tanaman otomatis menggunakan sensor IoT yang dapat memantau kelembaban tanah, suhu, dan kondisi tanaman secara real-time. Data akan ditampilkan melalui aplikasi mobile yang user-friendly.",
    goals: "Modernisasi pertanian dengan teknologi IoT, efisiensi penggunaan air dan pupuk, peningkatan hasil panen melalui monitoring yang optimal.",
    duration: "6bulan-1tahun",
    location: "Banyuwangi & Remote",
    budget: "Rp 30.000.000",
    teamSize: "6-8",
    skillsNeeded: "IoT Developer, Mobile App Developer, Hardware Engineer, Agronomist, Data Analyst, Project Manager",
    timeline: "Bulan 1-2: Research dan prototype hardware, Bulan 3-4: Development aplikasi, Bulan 5-6: Testing di lapangan, Bulan 7-8: Implementasi dan training",
    benefits: "Pengalaman project cutting-edge technology, kolaborasi lintas bidang, potensi patent/intellectual property, networking industri tech dan agri",
    members: [
      { name: "Rudi Hermawan", role: "IoT Lead Developer", avatar: "RH", email: "rudi.hermawan@email.com", phone: "081234567896" },
      { name: "Dewi Sartika", role: "Mobile App Developer", avatar: "DS", email: "dewi.sartika@email.com", phone: "081234567897" },
      { name: "Agus Wijaya", role: "Agricultural Consultant", avatar: "AW", email: "agus.wijaya@email.com", phone: "081234567898" }
    ],
    status: "active",
    startDate: "5 Des 2024",
    createdBy: "Rudi Hermawan"
  }
];

interface AdminDashboardProps {
  onNavigateToLogin: () => void;
}

export default function AdminDashboard({ onNavigateToLogin }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [replyText, setReplyText] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    console.log("Admin logged out");
    onNavigateToLogin();
  };

  const handleReplySubmit = (questionId: number) => {
    if (!replyText.trim()) return;
    
    console.log("Reply sent to question", questionId, ":", replyText);
    // Here you would typically send the reply to your backend
    
    // Reset form
    setReplyText("");
    setSelectedQuestion(null);
    
    // Show success message (you could use a toast here)
    alert("Balasan berhasil dikirim!");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "text-orange-600 bg-orange-50";
      case "answered": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "border-red-500 bg-red-50";
      case "medium": return "border-yellow-500 bg-yellow-50";
      case "low": return "border-green-500 bg-green-50";
      default: return "border-gray-200 bg-white";
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "digital": return "Jagoan Digital";
      case "tani": return "Jagoan Tani";
      case "bisnis": return "Jagoan Bisnis";
      case "gabungan": return "Multi-bidang";
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "digital": return "bg-blue-50 text-blue-700 border-blue-200";
      case "tani": return "bg-green-50 text-green-700 border-green-200";
      case "bisnis": return "bg-purple-50 text-purple-700 border-purple-200";
      case "gabungan": return "bg-orange-50 text-orange-700 border-orange-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatDuration = (duration: string) => {
    switch (duration) {
      case "1-2bulan": return "1-2 Bulan";
      case "3-6bulan": return "3-6 Bulan";
      case "6bulan-1tahun": return "6 Bulan - 1 Tahun";
      case "lebih-1tahun": return "Lebih dari 1 Tahun";
      default: return duration;
    }
  };

  const formatTeamSize = (teamSize: string) => {
    switch (teamSize) {
      case "2-3": return "2-3 Orang";
      case "4-5": return "4-5 Orang";
      case "6-8": return "6-8 Orang";
      case "lebih-8": return "Lebih dari 8 Orang";
      default: return teamSize;
    }
  };

  const pendingQuestions = mockQuestions.filter(q => q.status === "pending");
  const answeredQuestions = mockQuestions.filter(q => q.status === "answered");
  const activeCollaborations = mockCollaborations.filter(c => c.status === "active");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-xl">A</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-xs lg:text-sm text-gray-500">Jagoan Banyuwangi</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 lg:space-x-4">
              <Badge variant="secondary" className="hidden sm:flex bg-red-50 text-red-700 border-red-200 text-xs lg:text-sm">
                Administrator
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs lg:text-base px-3 lg:px-6 py-2 lg:py-3"
                onClick={handleLogout}
              >
                <LogOut className="size-4 lg:size-5 lg:mr-2" />
                <span className="hidden lg:inline">Keluar</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        {/* Welcome */}
        <div className="text-center mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-2">
            Selamat Datang, Administrator! 👨‍💼
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-4xl mx-auto">
            Kelola pertanyaan dan pantau kolaborasi komunitas Jagoan Banyuwangi
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Pertanyaan Pending</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-600">{pendingQuestions.length}</p>
                </div>
                <MessageSquare className="size-8 sm:size-10 lg:size-12 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Pertanyaan Dijawab</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-600">{answeredQuestions.length}</p>
                </div>
                <CheckCircle className="size-8 sm:size-10 lg:size-12 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Kolaborasi Aktif</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-600">{activeCollaborations.length}</p>
                </div>
                <Users className="size-8 sm:size-10 lg:size-12 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-3 sm:p-4 lg:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Total Anggota</p>
                  <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-600">127</p>
                </div>
                <UserCheck className="size-8 sm:size-10 lg:size-12 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 lg:space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white p-1 h-12 lg:h-14 border-2">
            <TabsTrigger 
              value="overview" 
              className={`text-xs sm:text-sm lg:text-base py-2 lg:py-3 transition-colors ${
                activeTab === "overview" 
                ? "bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 border-orange-300" 
                : "hover:bg-orange-50 hover:text-orange-600"
              }`}
            >
              <BarChart3 className="size-4 lg:size-5 lg:mr-2" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="questions" 
              className={`text-xs sm:text-sm lg:text-base py-2 lg:py-3 transition-colors ${
                activeTab === "questions" 
                ? "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 border-blue-300" 
                : "hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <MessageSquare className="size-4 lg:size-5 lg:mr-2" />
              <span className="hidden sm:inline">Balas Pertanyaan</span>
              <span className="sm:hidden">Pertanyaan</span>
            </TabsTrigger>
            <TabsTrigger 
              value="collaborations" 
              className={`text-xs sm:text-sm lg:text-base py-2 lg:py-3 transition-colors ${
                activeTab === "collaborations" 
                ? "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 border-purple-300" 
                : "hover:bg-purple-50 hover:text-purple-600"
              }`}
            >
              <Users className="size-4 lg:size-5 lg:mr-2" />
              <span className="hidden sm:inline">Data Kolaborasi</span>
              <span className="sm:hidden">Kolaborasi</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 lg:space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
              {/* Recent Questions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                    <AlertCircle className="size-5 lg:size-6 text-orange-500" />
                    Pertanyaan Terbaru
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 lg:space-y-4">
                  {pendingQuestions.slice(0, 3).map((question) => (
                    <div key={question.id} className="flex gap-3 lg:gap-4 p-3 lg:p-4 bg-gray-50 rounded-lg">
                      <Avatar className="h-8 w-8 lg:h-10 lg:w-10">
                        <AvatarFallback className="bg-blue-600 text-white text-sm lg:text-base">
                          {question.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900 text-sm lg:text-base truncate">{question.user}</h4>
                          <Badge variant="secondary" className="text-xs flex-shrink-0">
                            {question.category}
                          </Badge>
                        </div>
                        <p className="text-xs lg:text-sm text-gray-600 mb-2 line-clamp-2">{question.question}</p>
                        <p className="text-xs text-gray-500">{question.time}</p>
                      </div>
                    </div>
                  ))}
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setActiveTab("questions")}
                  >
                    Lihat Semua Pertanyaan
                  </Button>
                </CardContent>
              </Card>

              {/* Active Collaborations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                    <Users className="size-5 lg:size-6 text-purple-500" />
                    Kolaborasi Aktif
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 lg:space-y-4">
                  {activeCollaborations.map((collab) => (
                    <div key={collab.id} className="p-3 lg:p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm lg:text-base line-clamp-1">{collab.projectName}</h4>
                        <Badge variant="secondary" className="bg-green-50 text-green-700 text-xs flex-shrink-0">
                          Aktif
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {collab.members.map((member, index) => (
                          <Avatar key={index} className="h-5 w-5 lg:h-6 lg:w-6">
                            <AvatarFallback className="bg-blue-600 text-white text-xs">
                              {member.avatar}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        <span className="text-xs lg:text-sm text-gray-600">
                          {collab.members.length} anggota
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">Dimulai: {collab.startDate}</p>
                    </div>
                  ))}
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setActiveTab("collaborations")}
                  >
                    Lihat Semua Kolaborasi
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-4 lg:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-lg lg:text-xl">
                    <MessageSquare className="size-5 lg:size-6 text-blue-500" />
                    Pertanyaan yang Perlu Dijawab
                  </span>
                  <Badge className="bg-blue-50 text-blue-700 text-xs lg:text-sm">
                    {pendingQuestions.length} pending
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6">
                {pendingQuestions.map((question) => (
                  <div 
                    key={question.id} 
                    className={`border-2 rounded-lg p-4 lg:p-6 ${getUrgencyColor(question.urgency)}`}
                  >
                    <div className="flex items-start gap-3 lg:gap-4">
                      <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
                        <AvatarFallback className="bg-blue-600 text-white text-sm lg:text-lg">
                          {question.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <h3 className="font-bold text-gray-900 text-sm lg:text-base">{question.user}</h3>
                          <Badge variant="secondary" className="text-xs">{question.category}</Badge>
                          <Badge 
                            className={`${getStatusColor(question.status)} border-0 text-xs`}
                          >
                            {question.status === "pending" ? "Menunggu" : "Dijawab"}
                          </Badge>
                          <Badge variant="outline" className={`text-xs ${
                            question.urgency === "high" ? "border-red-500 text-red-600" :
                            question.urgency === "medium" ? "border-yellow-500 text-yellow-600" :
                            "border-green-500 text-green-600"
                          }`}>
                            {question.urgency === "high" ? "Urgent" : 
                             question.urgency === "medium" ? "Medium" : "Low"}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-700 mb-3 leading-relaxed text-sm lg:text-base">
                          {question.question}
                        </p>
                        
                        <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-500 mb-4">
                          <Clock className="size-3 lg:size-4" />
                          {question.time}
                        </div>

                        {/* Reply Section */}
                        {selectedQuestion === question.id ? (
                          <div className="space-y-3">
                            <Textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Tulis balasan untuk pertanyaan ini..."
                              className="min-h-[80px] lg:min-h-[100px] text-sm lg:text-base"
                            />
                            <div className="flex flex-col sm:flex-row gap-2">
                              <Button
                                onClick={() => handleReplySubmit(question.id)}
                                disabled={!replyText.trim()}
                                className="flex items-center gap-2 text-sm lg:text-base"
                                size="sm"
                              >
                                <Send className="size-3 lg:size-4" />
                                Kirim Balasan
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setSelectedQuestion(null);
                                  setReplyText("");
                                }}
                                size="sm"
                                className="text-sm lg:text-base"
                              >
                                Batal
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            onClick={() => setSelectedQuestion(question.id)}
                            className="flex items-center gap-2 text-sm lg:text-base"
                            size="sm"
                          >
                            <MessageSquare className="size-3 lg:size-4" />
                            Balas Pertanyaan
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="collaborations" className="space-y-4 lg:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-lg lg:text-xl">
                    <Users className="size-5 lg:size-6 text-purple-500" />
                    Data Kolaborasi
                  </span>
                  <Badge className="bg-purple-50 text-purple-700 text-xs lg:text-sm">
                    {mockCollaborations.length} total
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6">
                {mockCollaborations.map((collab) => (
                  <div key={collab.id} className="border rounded-lg p-4 lg:p-6 bg-white">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4 gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                          {collab.projectName}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant="secondary" className={`${getCategoryColor(collab.category)} text-xs`}>
                            {getCategoryName(collab.category)}
                          </Badge>
                          <Badge className={`text-xs ${
                            collab.status === "active" ? "bg-green-50 text-green-700 border-green-200" :
                            "bg-gray-50 text-gray-700 border-gray-200"
                          }`}>
                            {collab.status === "active" ? "Aktif" : "Selesai"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-500 mb-3">
                          <Calendar className="size-3 lg:size-4" />
                          Dimulai: {collab.startDate}
                        </div>
                        <p className="text-gray-600 text-sm lg:text-base line-clamp-2 mb-3">
                          {collab.description}
                        </p>
                      </div>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="w-full lg:w-auto">
                            <Eye className="size-3 lg:size-4 mr-2" />
                            Detail
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-xl lg:text-2xl pr-8">
                              {collab.projectName}
                            </DialogTitle>
                            <DialogDescription className="text-sm lg:text-base">
                              Detail lengkap proyek kolaborasi yang dibuat oleh {collab.createdBy}
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4 lg:space-y-6 mt-4">
                            {/* Project Info Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <Target className="size-4 text-blue-500" />
                                    Kategori
                                  </h4>
                                  <Badge className={getCategoryColor(collab.category)}>
                                    {getCategoryName(collab.category)}
                                  </Badge>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <Clock className="size-4 text-green-500" />
                                    Durasi
                                  </h4>
                                  <p className="text-sm lg:text-base text-gray-600">{formatDuration(collab.duration)}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <MapPin className="size-4 text-purple-500" />
                                    Lokasi
                                  </h4>
                                  <p className="text-sm lg:text-base text-gray-600">{collab.location}</p>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <DollarSign className="size-4 text-orange-500" />
                                    Budget
                                  </h4>
                                  <p className="text-sm lg:text-base text-gray-600">{collab.budget}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <Users className="size-4 text-indigo-500" />
                                    Ukuran Tim
                                  </h4>
                                  <p className="text-sm lg:text-base text-gray-600">{formatTeamSize(collab.teamSize)}</p>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                                    <Calendar className="size-4 text-pink-500" />
                                    Status
                                  </h4>
                                  <Badge className={
                                    collab.status === "active" ? "bg-green-50 text-green-700 border-green-200" :
                                    "bg-gray-50 text-gray-700 border-gray-200"
                                  }>
                                    {collab.status === "active" ? "Aktif" : "Selesai"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            
                            {/* Description */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Deskripsi Proyek</h4>
                              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{collab.description}</p>
                            </div>
                            
                            {/* Goals */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Tujuan</h4>
                              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{collab.goals}</p>
                            </div>
                            
                            {/* Skills Needed */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Keahlian yang Dibutuhkan</h4>
                              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{collab.skillsNeeded}</p>
                            </div>
                            
                            {/* Timeline */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Timeline</h4>
                              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{collab.timeline}</p>
                            </div>
                            
                            {/* Benefits */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-2">Manfaat</h4>
                              <p className="text-sm lg:text-base text-gray-600 leading-relaxed">{collab.benefits}</p>
                            </div>
                            
                            {/* Team Members */}
                            <div>
                              <h4 className="font-medium text-gray-900 mb-3">Anggota Tim ({collab.members.length})</h4>
                              <div className="space-y-3">
                                {collab.members.map((member, index) => (
                                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <Avatar className="h-10 w-10">
                                      <AvatarFallback className="bg-blue-600 text-white">
                                        {member.avatar}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 min-w-0">
                                      <h5 className="font-medium text-gray-900 text-sm lg:text-base">{member.name}</h5>
                                      <p className="text-xs lg:text-sm text-gray-600 mb-1">{member.role}</p>
                                      <div className="space-y-1">
                                        <p className="text-xs text-gray-500">📧 {member.email}</p>
                                        <p className="text-xs text-gray-500">📱 {member.phone}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
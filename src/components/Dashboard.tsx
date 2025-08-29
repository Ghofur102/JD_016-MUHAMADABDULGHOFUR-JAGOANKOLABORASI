import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Bell, MessageSquare, Users, Plus, Search, LogOut, Settings, User, Home, Menu, X, Edit } from "lucide-react";
import { useState } from "react";

// Mock data
const mockStats = {
  unreadRequests: 3,
  answeredQuestions: 12
};

const mockActivities = [
  {
    id: 1,
    message: "Ahmad Rizki menjawab pertanyaan 'Bagaimana cara integrase API di React?'",
    time: "2 menit yang lalu",
    type: "question_answered"
  },
  {
    id: 2,
    message: "Siti Nurhaliza ingin berkolaborasi dalam proyek UI/UX Design",
    time: "15 menit yang lalu",
    type: "collaboration"
  },
  {
    id: 3,
    message: "Budi Santoso menjawab pertanyaan 'Tips optimasi database MySQL'",
    time: "1 jam yang lalu",
    type: "question_answered"
  }
];

const mockProfiles = [
  {
    id: 1,
    name: "Ahmad Rizki",
    skills: ["React", "Node.js"],
    avatar: "AR",
    joinedAgo: "2 hari"
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    skills: ["UI/UX", "Figma"],
    avatar: "SN",
    joinedAgo: "3 hari"
  },
  {
    id: 3,
    name: "Budi Santoso",
    skills: ["Python", "ML"],
    avatar: "BS",
    joinedAgo: "4 hari"
  }
];

// Mock user team data - simulate user already has a team
const mockUserTeam = {
  id: 1,
  projectName: "Aplikasi Marketplace Produk Lokal Banyuwangi",
  category: "digital",
  status: "active",
  memberCount: 3,
  maxMembers: 5,
  role: "leader" // user's role in the team
};

interface DashboardProps {
  onNavigateToLogin: () => void;
  onNavigateToCariKolaborator: () => void;
  onNavigateToProfileEdit: () => void;
  onNavigateToAjukanPertanyaan: () => void;
  onNavigateToDaftarNotifikasi: () => void;
  onNavigateToBuatKolaborasi: () => void;
}

export default function Dashboard({ onNavigateToLogin, onNavigateToCariKolaborator, onNavigateToProfileEdit, onNavigateToAjukanPertanyaan, onNavigateToDaftarNotifikasi, onNavigateToBuatKolaborasi }: DashboardProps) {
  const userName = "Muhammad Faris";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Mock state - dalam implementasi nyata, ini akan diambil dari API/context
  const [userTeam, setUserTeam] = useState(mockUserTeam); // Set to null if user doesn't have team
  const hasTeam = userTeam !== null;
  const isTeamLeader = userTeam?.role === "leader";

  const handleLogout = () => {
    // Handle logout logic here (clear session, etc.)
    console.log("User logged out");
    // Navigate to login page
    onNavigateToLogin();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg lg:text-xl">J</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold text-gray-900">Jagoan Banyuwangi</h1>
                <p className="text-xs lg:text-sm text-gray-500">Platform Kolaborasi</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onNavigateToDaftarNotifikasi}
                className="text-sm lg:text-base"
              >
                <Bell className="size-4 lg:mr-2" />
                <span className="hidden lg:inline">Notifikasi</span>
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onNavigateToProfileEdit}
                className="text-sm lg:text-base"
              >
                <User className="size-4 lg:mr-2" />
                <span className="hidden lg:inline">Profil Saya</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="text-sm lg:text-base"
              >
                <LogOut className="size-4 lg:mr-2" />
                <span className="hidden lg:inline">Keluar</span>
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
                onClick={onNavigateToDaftarNotifikasi}
                className="w-full justify-start"
              >
                <Bell className="size-4 mr-2" />
                Notifikasi
              </Button>
              <Button 
                variant="ghost" 
                onClick={onNavigateToProfileEdit}
                className="w-full justify-start"
              >
                <User className="size-4 mr-2" />
                Profil Saya
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLogout}
                className="w-full justify-start"
              >
                <LogOut className="size-4 mr-2" />
                Keluar
              </Button>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-6 lg:space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-3">
          <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900">
            Selamat Datang, {userName}! 👋
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Mari berkolaborasi dan wujudkan ide-ide hebat bersama teman-teman lainnya di Banyuwangi
          </p>
        </div>

        {/* Team Status Card - Show if user has a team */}
        {hasTeam && (
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="size-6 text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                    Tim Aktif: {userTeam.projectName}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                      {userTeam.category === "digital" ? "Jagoan Digital" : 
                       userTeam.category === "tani" ? "Jagoan Tani" : 
                       userTeam.category === "bisnis" ? "Jagoan Bisnis" : "Multi-bidang"}
                    </Badge>
                    <Badge className="bg-green-50 text-green-700 border-green-200">
                      {userTeam.status === "active" ? "Aktif" : "Selesai"}
                    </Badge>
                    <Badge variant="outline">
                      {userTeam.memberCount}/{userTeam.maxMembers} Anggota
                    </Badge>
                    {isTeamLeader && (
                      <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                        Leader
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {isTeamLeader ? 
                      "Anda adalah leader tim ini. Kelola anggota dan undang kolaborator baru." :
                      "Anda adalah anggota tim ini. Kontribusi terbaik Anda sangat dibutuhkan."
                    }
                  </p>
                </div>
                {isTeamLeader && (
                  <Button 
                    onClick={onNavigateToBuatKolaborasi}
                    className="w-full sm:w-auto text-sm lg:text-base"
                  >
                    <Edit className="mr-2 size-4" />
                    Kelola Tim
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions - Most Important */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
            Apa yang ingin Anda lakukan hari ini?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-6xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-blue-100 hover:border-blue-300">
              <CardContent className="p-6 lg:p-8 text-center" onClick={onNavigateToAjukanPertanyaan}>
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="size-6 lg:size-8 text-blue-600" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Tanya Sesuatu</h3>
                <p className="text-sm lg:text-base text-gray-600 mb-4">
                  Ada pertanyaan? Tanya kepada komunitas jagoan lainnya
                </p>
                <Button className="w-full text-sm lg:text-base">
                  <Plus className="mr-2 size-4" />
                  Ajukan Pertanyaan
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-purple-100 hover:border-purple-300">
              <CardContent className="p-6 lg:p-8 text-center" onClick={onNavigateToBuatKolaborasi}>
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {hasTeam ? <Edit className="size-6 lg:size-8 text-purple-600" /> : <Users className="size-6 lg:size-8 text-purple-600" />}
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                  {hasTeam ? (isTeamLeader ? "Edit Tim Kolaborasi" : "Lihat Tim Saya") : "Buat Tim Kolaborasi"}
                </h3>
                <p className="text-sm lg:text-base text-gray-600 mb-4">
                  {hasTeam ? 
                    (isTeamLeader ? "Kelola tim dan undang anggota baru" : "Lihat detail tim dan anggota") :
                    "Bentuk tim untuk mengerjakan proyek impian Anda"
                  }
                </p>
                <Button variant="outline" className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 text-sm lg:text-base">
                  {hasTeam ? (
                    <>
                      <Edit className="mr-2 size-4" />
                      {isTeamLeader ? "Kelola Tim" : "Lihat Tim"}
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 size-4" />
                      Buat Tim Baru
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-green-100 hover:border-green-300 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 lg:p-8 text-center" onClick={onNavigateToCariKolaborator}>
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="size-6 lg:size-8 text-green-600" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Cari Teman Kerja</h3>
                <p className="text-sm lg:text-base text-gray-600 mb-4">
                  Temukan partner untuk mengerjakan proyek bersama
                </p>
                <Button variant="outline" className="w-full text-sm lg:text-base">
                  <Search className="mr-2 size-4" />
                  Cari Kolaborator
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Simple Statistics */}
        <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border">
          <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-4 lg:mb-6 text-center">
            Aktivitas Anda
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            <div className="text-center p-3 lg:p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl lg:text-3xl font-bold text-blue-600">{mockStats.unreadRequests}</div>
              <div className="text-xs lg:text-sm text-gray-600 mt-1">Permintaan Kolaborasi</div>
            </div>
            <div className="text-center p-3 lg:p-4 bg-green-50 rounded-lg">
              <div className="text-2xl lg:text-3xl font-bold text-green-600">{mockStats.answeredQuestions}</div>
              <div className="text-xs lg:text-sm text-gray-600 mt-1">Pertanyaan Dijawab</div>
            </div>
            <div className="text-center p-3 lg:p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl lg:text-3xl font-bold text-orange-600">5</div>
              <div className="text-xs lg:text-sm text-gray-600 mt-1">Proyek Aktif</div>
            </div>
            <div className="text-center p-3 lg:p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl lg:text-3xl font-bold text-purple-600">28</div>
              <div className="text-xs lg:text-sm text-gray-600 mt-1">Teman Kolaborasi</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Recent Activities */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg lg:text-xl font-bold text-gray-900 flex items-center gap-2">
                <Bell className="size-5 lg:size-6 text-blue-600" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 lg:space-y-4">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex gap-3 lg:gap-4 p-3 lg:p-4 bg-gray-50 rounded-lg">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <div className="space-y-2 min-w-0">
                    <p className="text-sm lg:text-base text-gray-900 leading-relaxed">{activity.message}</p>
                    <p className="text-xs lg:text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
              <Button 
                variant="ghost" 
                className="w-full text-sm lg:text-base py-3 lg:py-4 mt-4"
                onClick={onNavigateToDaftarNotifikasi}
              >
                Lihat Semua Aktivitas
              </Button>
            </CardContent>
          </Card>

          {/* New Members */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg lg:text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="size-5 lg:size-6 text-green-600" />
                Jagoan Baru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 lg:space-y-4">
                {mockProfiles.map((profile) => (
                  <div key={profile.id} className="flex items-center gap-3 lg:gap-4 p-3 lg:p-4 bg-gray-50 rounded-lg">
                    <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
                      <AvatarFallback className="bg-blue-600 text-white text-sm lg:text-lg">
                        {profile.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm lg:text-base">{profile.name}</h4>
                      <p className="text-xs lg:text-sm text-gray-500">Bergabung {profile.joinedAgo}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {profile.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs lg:text-sm px-3 lg:px-4 py-2 flex-shrink-0">
                      Lihat Profil
                    </Button>
                  </div>
                ))}
              </div>
              <Button 
                variant="ghost" 
                className="w-full text-sm lg:text-base py-3 lg:py-4 mt-4"
                onClick={onNavigateToCariKolaborator}
              >
                Lihat Semua Member Baru
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
        <Card className="shadow-sm bg-blue-50 border-blue-200">
          <CardContent className="p-6 lg:p-8 text-center">
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">
              Butuh Bantuan?
            </h3>
            <p className="text-sm lg:text-base text-gray-600 mb-6 max-w-2xl mx-auto">
              Jika Anda memiliki pertanyaan atau kesulitan menggunakan platform ini, 
              jangan ragu untuk menghubungi tim support kami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="text-sm lg:text-base">
                <MessageSquare className="mr-2 size-4" />
                Panduan Penggunaan
              </Button>
              <Button variant="outline" className="text-sm lg:text-base">
                <Users className="mr-2 size-4" />
                Hubungi Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
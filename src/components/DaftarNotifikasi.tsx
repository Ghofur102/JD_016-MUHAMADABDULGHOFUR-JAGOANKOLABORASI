import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  ArrowLeft, 
  Bell, 
  MessageSquare, 
  Users, 
  Heart,
  CheckCircle,
  Clock,
  Filter,
  MoreVertical,
  Trash2,
  Check,
  X,
  Eye,
  UserPlus,
  Target,
  Calendar,
  MapPin,
  DollarSign,
  Menu
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface DaftarNotifikasiProps {
  onNavigateToDashboard: () => void;
}

// Mock collaboration invitations data
const mockCollaborationInvites = [
  {
    id: 101,
    type: "collaboration_invite",
    title: "Undangan Kolaborasi Tim",
    message: "Ahmad Rizki mengundang Anda bergabung dalam proyek 'Aplikasi Marketplace Produk Lokal Banyuwangi'",
    inviterName: "Ahmad Rizki",
    inviterAvatar: "AR",
    projectName: "Aplikasi Marketplace Produk Lokal Banyuwangi",
    category: "digital",
    description: "Membuat platform e-commerce khusus untuk mempromosikan dan menjual produk-produk lokal Banyuwangi.",
    skillsNeeded: "Frontend Developer (React), Backend Developer (Node.js), UI/UX Designer",
    duration: "6bulan-1tahun",
    location: "Banyuwangi & Remote",
    budget: "Rp 15.000.000",
    teamSize: "4-5",
    benefits: "Pengalaman membangun aplikasi real-world, portfolio project, networking dengan UMKM lokal",
    time: "30 menit yang lalu",
    isRead: false,
    status: "pending", // pending, accepted, rejected
    personalMessage: "Halo! Saya lihat skill Frontend React Anda sangat impressive. Tim kami sedang membutuhkan developer seperti Anda untuk proyek marketplace ini. Apakah Anda tertarik bergabung?"
  },
  {
    id: 102,
    type: "collaboration_invite",
    title: "Undangan Kolaborasi Tim",
    message: "Siti Nurhaliza mengundang Anda bergabung dalam proyek 'Program Pelatihan Hidroponik untuk Petani Muda'",
    inviterName: "Siti Nurhaliza",
    inviterAvatar: "SN",
    projectName: "Program Pelatihan Hidroponik untuk Petani Muda",
    category: "tani",
    description: "Mengembangkan program pelatihan komprehensif tentang teknik hidroponik modern untuk petani muda di Banyuwangi.",
    skillsNeeded: "Content Creator, Social Media Manager, Video Editor, Marketing Specialist",
    duration: "3-6bulan",
    location: "Banyuwangi",
    budget: "Rp 25.000.000",
    teamSize: "6-8",
    benefits: "Kontribusi langsung untuk pembangunan pertanian daerah, networking dengan petani dan stakeholder",
    time: "2 jam yang lalu",
    isRead: false,
    status: "pending",
    personalMessage: "Saya tertarik dengan pengalaman content creation Anda. Proyek ini sangat membutuhkan seseorang yang bisa membuat materi pelatihan yang menarik dan mudah dipahami."
  }
];

// Mock notification data organized by date
const notificationsByDate = [
  {
    date: "Hari Ini",
    notifications: [
      ...mockCollaborationInvites,
      {
        id: 1,
        type: "question_answered",
        title: "Pertanyaan Anda telah dijawab",
        message: "Ahmad Rizki menjawab pertanyaan 'Bagaimana cara integrase API di React?'",
        avatar: "AR",
        time: "2 menit yang lalu",
        isRead: false,
        actionUrl: "#"
      },
      {
        id: 2,
        type: "collaboration_request",
        title: "Permintaan kolaborasi baru",
        message: "Budi Santoso ingin berkolaborasi dalam proyek UI/UX Design",
        avatar: "BS",
        time: "15 menit yang lalu",
        isRead: false,
        actionUrl: "#"
      },
      {
        id: 3,
        type: "team_member_joined",
        title: "Anggota baru bergabung",
        message: "Diana Putri telah menerima undangan dan bergabung dengan tim 'E-commerce Platform'",
        avatar: "DP",
        time: "1 jam yang lalu",
        isRead: true,
        actionUrl: "#"
      },
      {
        id: 4,
        type: "question_liked",
        title: "Pertanyaan Anda disukai",
        message: "Eko Wijaya dan 2 orang lain menyukai pertanyaan Anda tentang Machine Learning",
        avatar: "EW",
        time: "1 jam yang lalu",
        isRead: true,
        actionUrl: "#"
      }
    ]
  },
  {
    date: "Kemarin",
    notifications: [
      {
        id: 5,
        type: "question_answered",
        title: "Jawaban terbaik dipilih",
        message: "Jawaban Anda tentang 'Optimasi database MySQL' dipilih sebagai jawaban terbaik",
        avatar: "EP",
        time: "1 hari yang lalu",
        isRead: true,
        actionUrl: "#"
      },
      {
        id: 6,
        type: "new_follower",
        title: "Pengikut baru",
        message: "Fitri Handayani mulai mengikuti Anda",
        avatar: "FH",
        time: "1 hari yang lalu",
        isRead: true,
        actionUrl: "#"
      },
      {
        id: 7,
        type: "project_invite",
        title: "Undangan proyek",
        message: "Anda diundang bergabung dalam proyek 'E-commerce Platform untuk UMKM'",
        avatar: "JD",
        time: "1 hari yang lalu",
        isRead: true,
        actionUrl: "#"
      }
    ]
  },
  {
    date: "2 Hari yang Lalu",
    notifications: [
      {
        id: 8,
        type: "question_answered",
        title: "Pertanyaan Anda telah dijawab",
        message: "Pak Surya menjawab pertanyaan 'Tips budidaya padi organik untuk pemula'",
        avatar: "SW",
        time: "2 hari yang lalu",
        isRead: true,
        actionUrl: "#"
      },
      {
        id: 9,
        type: "achievement",
        title: "Pencapaian baru",
        message: "Selamat! Anda mendapat badge 'Helper' karena telah menjawab 10 pertanyaan",
        avatar: "🏆",
        time: "2 hari yang lalu",
        isRead: true,
        actionUrl: "#"
      }
    ]
  }
];

const getNotificationIcon = (type: string) => {
  switch (type) {
    case "question_answered":
      return <MessageSquare className="size-4 text-blue-600" />;
    case "collaboration_request":
    case "collaboration_invite":
      return <Users className="size-4 text-green-600" />;
    case "team_member_joined":
      return <UserPlus className="size-4 text-purple-600" />;
    case "question_liked":
    case "new_follower":
      return <Heart className="size-4 text-red-600" />;
    case "achievement":
      return <CheckCircle className="size-4 text-yellow-600" />;
    case "profile_viewed":
      return <Users className="size-4 text-purple-600" />;
    case "project_invite":
      return <Bell className="size-4 text-indigo-600" />;
    case "system":
      return <Bell className="size-4 text-gray-600" />;
    default:
      return <Bell className="size-4 text-gray-600" />;
  }
};

const getNotificationBgColor = (type: string) => {
  switch (type) {
    case "question_answered":
      return "bg-blue-50 border-blue-200";
    case "collaboration_request":
    case "collaboration_invite":
      return "bg-green-50 border-green-200";
    case "team_member_joined":
      return "bg-purple-50 border-purple-200";
    case "question_liked":
    case "new_follower":
      return "bg-red-50 border-red-200";
    case "achievement":
      return "bg-yellow-50 border-yellow-200";
    case "profile_viewed":
      return "bg-purple-50 border-purple-200";
    case "project_invite":
      return "bg-indigo-50 border-indigo-200";
    case "system":
      return "bg-gray-50 border-gray-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
};

export default function DaftarNotifikasi({ onNavigateToDashboard }: DaftarNotifikasiProps) {
  const [filter, setFilter] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedInvite, setSelectedInvite] = useState<any>(null);
  const [showInviteDetail, setShowInviteDetail] = useState(false);
  
  // Calculate notification counts
  const allNotifications = notificationsByDate.flatMap(group => group.notifications);
  const unreadCount = allNotifications.filter(notif => !notif.isRead).length;
  const readCount = allNotifications.filter(notif => notif.isRead).length;

  const markAsRead = (notificationId: number) => {
    // Handle mark as read logic
    console.log("Mark as read:", notificationId);
  };

  const deleteNotification = (notificationId: number) => {
    // Handle delete logic
    console.log("Delete notification:", notificationId);
  };

  const markAllAsRead = () => {
    // Handle mark all as read logic
    console.log("Mark all as read");
  };

  const handleCollaborationResponse = (inviteId: number, response: 'accept' | 'reject') => {
    console.log(`${response} collaboration invite:`, inviteId);
    
    if (response === 'accept') {
      alert("Anda telah menerima undangan kolaborasi! Tim leader akan mendapat notifikasi.");
    } else {
      alert("Undangan kolaborasi telah ditolak.");
    }
    
    // Update invite status (in real app, this would be API call)
    setSelectedInvite(null);
    setShowInviteDetail(false);
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

  const filterNotifications = (notifications: any[]) => {
    if (filter === "unread") {
      return notifications.filter(notif => !notif.isRead);
    }
    if (filter === "read") {
      return notifications.filter(notif => notif.isRead);
    }
    return notifications;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg lg:text-xl">J</span>
              </div>
              <span className="font-bold text-lg lg:text-xl">Jagoan Banyuwangi</span>
            </div>
            
            <div className="hidden sm:block">
              <Button variant="ghost" className="flex items-center gap-2 text-sm lg:text-base" onClick={onNavigateToDashboard}>
                <ArrowLeft className="size-4" />
                Kembali ke Dashboard
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden">
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
            <div className="sm:hidden pb-4">
              <Button 
                variant="ghost" 
                onClick={onNavigateToDashboard}
                className="w-full justify-start"
              >
                <ArrowLeft className="size-4 mr-2" />
                Kembali ke Dashboard
              </Button>
            </div>
          )}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 lg:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Notifikasi</h1>
            <p className="text-muted-foreground text-sm lg:text-base">
              Pantau semua aktivitas dan update terbaru
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" onClick={markAllAsRead} size="sm" className="w-full sm:w-auto">
              <Check className="size-4 mr-2" />
              Tandai Semua Dibaca
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Filter className="size-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilter("all")}>
                  Semua ({allNotifications.length})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("unread")}>
                  Belum Dibaca ({unreadCount})
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("read")}>
                  Sudah Dibaca ({readCount})
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 lg:mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Bell className="size-4 lg:size-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-bold">{allNotifications.length}</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">Total Notifikasi</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="size-4 lg:size-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-bold">{unreadCount}</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">Belum Dibaca</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="size-4 lg:size-5 text-green-600" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-bold">{readCount}</p>
                  <p className="text-xs lg:text-sm text-muted-foreground">Sudah Dibaca</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Timeline */}
        <div className="space-y-6 lg:space-y-8">
          {notificationsByDate.map((dateGroup, index) => {
            const filteredNotifications = filterNotifications(dateGroup.notifications);
            
            if (filteredNotifications.length === 0) return null;
            
            return (
              <div key={index}>
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-base lg:text-lg font-semibold">{dateGroup.date}</h2>
                  <div className="flex-1 h-px bg-border"></div>
                  <Badge variant="secondary" className="text-xs">
                    {filteredNotifications.length} notifikasi
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  {filteredNotifications.map((notification) => (
                    <Card 
                      key={notification.id} 
                      className={`transition-all hover:shadow-md ${
                        !notification.isRead ? "border-l-4 border-l-primary" : ""
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3 lg:gap-4">
                          {/* Avatar */}
                          <div className="relative flex-shrink-0">
                            <Avatar className="size-8 lg:size-10">
                              <AvatarFallback className="bg-primary text-primary-foreground text-sm lg:text-base">
                                {notification.avatar || notification.inviterAvatar}
                              </AvatarFallback>
                            </Avatar>
                            <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full border">
                              {getNotificationIcon(notification.type)}
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                              <div className="flex-1 min-w-0">
                                <h4 className={`font-medium text-sm lg:text-base ${!notification.isRead ? "text-foreground" : "text-muted-foreground"}`}>
                                  {notification.title}
                                </h4>
                                <p className="text-xs lg:text-sm text-muted-foreground mt-1 leading-relaxed">
                                  {notification.message}
                                </p>
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                                  {!notification.isRead && (
                                    <Badge variant="secondary" className="text-xs">Baru</Badge>
                                  )}
                                </div>
                              </div>
                              
                              {/* Actions */}
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {notification.type === "collaboration_invite" && notification.status === "pending" && (
                                  <div className="flex flex-col sm:flex-row gap-2">
                                    <Button 
                                      size="sm" 
                                      onClick={() => {
                                        setSelectedInvite(notification);
                                        setShowInviteDetail(true);
                                      }}
                                      className="text-xs px-3 py-1"
                                    >
                                      <Eye className="size-3 mr-1" />
                                      Detail
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      onClick={() => handleCollaborationResponse(notification.id, 'accept')}
                                      className="text-xs px-3 py-1 bg-green-600 hover:bg-green-700"
                                    >
                                      <Check className="size-3 mr-1" />
                                      Terima
                                    </Button>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => handleCollaborationResponse(notification.id, 'reject')}
                                      className="text-xs px-3 py-1 border-red-200 text-red-600 hover:bg-red-50"
                                    >
                                      <X className="size-3 mr-1" />
                                      Tolak
                                    </Button>
                                  </div>
                                )}
                                
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="size-6 p-0">
                                      <MoreVertical className="size-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {!notification.isRead && (
                                      <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                                        <CheckCircle className="size-4 mr-2" />
                                        Tandai Dibaca
                                      </DropdownMenuItem>
                                    )}
                                    <DropdownMenuItem 
                                      onClick={() => deleteNotification(notification.id)}
                                      className="text-destructive"
                                    >
                                      <Trash2 className="size-4 mr-2" />
                                      Hapus
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {notificationsByDate.every(group => filterNotifications(group.notifications).length === 0) && (
          <div className="text-center py-12">
            <Bell className="size-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Tidak ada notifikasi</h3>
            <p className="text-muted-foreground">
              {filter === "unread" 
                ? "Semua notifikasi sudah dibaca" 
                : filter === "read"
                ? "Belum ada notifikasi yang dibaca"
                : "Belum ada notifikasi untuk ditampilkan"
              }
            </p>
          </div>
        )}

        {/* Collaboration Invite Detail Dialog */}
        <Dialog open={showInviteDetail} onOpenChange={setShowInviteDetail}>
          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg lg:text-xl pr-8">
                Detail Undangan Kolaborasi
              </DialogTitle>
              <DialogDescription className="text-sm lg:text-base">
                {selectedInvite?.inviterName} mengundang Anda bergabung dalam tim kolaborasi
              </DialogDescription>
            </DialogHeader>
            
            {selectedInvite && (
              <div className="space-y-4 lg:space-y-6 mt-4">
                {/* Inviter Info */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-600 text-white">
                      {selectedInvite.inviterAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-bold text-gray-900">{selectedInvite.inviterName}</h4>
                    <p className="text-sm text-gray-600">Team Leader</p>
                  </div>
                </div>

                {/* Personal Message */}
                {selectedInvite.personalMessage && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Pesan Personal:</h4>
                    <p className="text-sm text-blue-800 italic">"{selectedInvite.personalMessage}"</p>
                  </div>
                )}

                {/* Project Details */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                      {selectedInvite.projectName}
                    </h3>
                    <Badge className={getCategoryColor(selectedInvite.category)}>
                      {getCategoryName(selectedInvite.category)}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Deskripsi Proyek</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{selectedInvite.description}</p>
                  </div>

                  {/* Project Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                        <Clock className="size-4 text-green-500" />
                        Durasi
                      </h5>
                      <p className="text-sm text-gray-600">{formatDuration(selectedInvite.duration)}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                        <MapPin className="size-4 text-purple-500" />
                        Lokasi
                      </h5>
                      <p className="text-sm text-gray-600">{selectedInvite.location}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                        <DollarSign className="size-4 text-orange-500" />
                        Budget
                      </h5>
                      <p className="text-sm text-gray-600">{selectedInvite.budget}</p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                        <Users className="size-4 text-indigo-500" />
                        Ukuran Tim
                      </h5>
                      <p className="text-sm text-gray-600">{formatTeamSize(selectedInvite.teamSize)}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Keahlian yang Dibutuhkan</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{selectedInvite.skillsNeeded}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Manfaat untuk Anggota Tim</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{selectedInvite.benefits}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                  <Button 
                    onClick={() => handleCollaborationResponse(selectedInvite.id, 'accept')}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Check className="mr-2 size-4" />
                    Terima Undangan
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleCollaborationResponse(selectedInvite.id, 'reject')}
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <X className="mr-2 size-4" />
                    Tolak Undangan
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowInviteDetail(false)}
                    className="flex-1"
                  >
                    Tutup
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
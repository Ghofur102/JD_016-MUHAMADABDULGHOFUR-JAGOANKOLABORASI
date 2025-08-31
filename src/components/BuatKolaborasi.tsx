import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  ArrowLeft, 
  Users, 
  Target, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  Info, 
  Plus, 
  X, 
  Search,
  Send,
  UserPlus,
  Menu
} from "lucide-react";
import { supabase } from "@/lib/auth/register";

interface BuatKolaborasiProps {
  onNavigateToDashboard: () => void;
}

const mockAvailableUsers = [
  { id: 4, name: "Budi Santoso", skills: ["Python", "Machine Learning"], avatar: "BS", category: "digital", email: "budi.santoso@email.com" },
  { id: 5, name: "Diana Putri", skills: ["Digital Marketing", "Content Writing"], avatar: "DP", category: "bisnis", email: "diana.putri@email.com" },
  { id: 6, name: "Eko Wijaya", skills: ["UI/UX Design", "Figma"], avatar: "EW", category: "digital", email: "eko.wijaya@email.com" },
  { id: 7, name: "Fitri Handayani", skills: ["Backend Development", "Database"], avatar: "FH", category: "digital", email: "fitri.handayani@email.com" },
  { id: 8, name: "Gilang Ramadhan", skills: ["Project Management", "Business Analysis"], avatar: "GR", category: "bisnis", email: "gilang.ramadhan@email.com" },
];

export default function BuatKolaborasi({ onNavigateToDashboard }: BuatKolaborasiProps) {
  const [existingTeam, setExistingTeam] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hasExistingTeam = existingTeam !== null;
  const [userId, setUserId] = useState(null);
  const isTeamLeader = existingTeam && existingTeam.members && existingTeam.members.find(m => m.status === "leader")?.id === userId;

  const [formData, setFormData] = useState({
    projectName: "",
    category: "",
    description: "",
    goals: "",
    duration: "",
    location: "",
    budget: "",
    skillsNeeded: "",
    teamSize: "",
    timeline: "",
    benefits: ""
  });

  useEffect(() => {
    const teamData = localStorage.getItem("teamData");
    if (teamData) {
      const parsedData = JSON.parse(teamData);
      setExistingTeam(parsedData);
      setFormData(parsedData);
    }

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };

    getUser();
  }, []);

  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [inviteMessage, setInviteMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const teamData = {
        ...formData,
        members: [{
          id: user.id,
          name: user.user_metadata?.full_name || user.user_metadata?.name || "Jagoan!",
          role: "Project Leader",
          avatar: user.user_metadata?.picture || null,
          email: user.email,
          phone: "",
          status: "leader"
        }],
        maxMembers: formData.teamSize,
        status: "active",
        createdAt: new Date().toISOString()
      };
      localStorage.setItem("teamData", JSON.stringify(teamData));
      console.log(hasExistingTeam ? "Team updated:" : "New team created:", teamData);
      
      // Simulate API call
      setTimeout(() => {
        setSubmittedSuccessfully(true);
        
        // Auto redirect after 3 seconds
        setTimeout(() => {
          onNavigateToDashboard();
        }, 3000);
      }, 1000);
    }
  };

  const filteredUsers = mockAvailableUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
    user.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUserSelect = (userId: number) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSendInvitations = () => {
    if (selectedUsers.length === 0) return;
    
    console.log("Sending invitations to:", selectedUsers);
    console.log("Invite message:", inviteMessage);
    
    // Simulate sending invitations
    alert(`Undangan berhasil dikirim ke ${selectedUsers.length} orang!`);
    
    // Reset state
    setShowInviteDialog(false);
    setSelectedUsers([]);
    setInviteMessage("");
    setSearchQuery("");
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

  if (submittedSuccessfully) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-lg">
          <CardContent className="p-6 lg:p-8 text-center">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="size-6 lg:size-8 text-green-600" />
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
              {hasExistingTeam ? "Tim Berhasil Diperbarui! 🎉" : "Tim Kolaborasi Berhasil Dibuat! 🎉"}
            </h2>
            <p className="text-sm lg:text-base text-gray-600 mb-6">
              {hasExistingTeam ? 
                "Perubahan tim Anda telah disimpan. Anggota tim akan mendapat notifikasi tentang update ini." :
                "Data tim kolaborasi Anda telah dikirim ke admin untuk diverifikasi. Anda akan mendapat notifikasi setelah tim Anda disetujui."
              }
            </p>
            <Button onClick={onNavigateToDashboard} className="w-full">
              Kembali ke Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Users className="size-5 lg:size-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold text-gray-900">
                  {hasExistingTeam ? "Kelola Tim Kolaborasi" : "Buat Tim Kolaborasi"}
                </h1>
                <p className="text-xs lg:text-sm text-gray-500">
                  {hasExistingTeam ? "Edit dan undang anggota baru" : "Wujudkan proyek impian bersama"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="hidden sm:flex items-center gap-2 text-sm lg:text-base" onClick={onNavigateToDashboard}>
                <ArrowLeft className="size-4" />
                Kembali ke Dashboard
              </Button>

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
        {/* Existing Team Info - Show if editing */}
        {hasExistingTeam && (
          <Card className="mb-6 lg:mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                    Tim Aktif Anda
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className={getCategoryColor(existingTeam.category)}>
                      {getCategoryName(existingTeam.category)}
                    </Badge>
                    <Badge className="bg-green-50 text-green-700 border-green-200">
                      {existingTeam.status === "active" ? "Aktif" : "Selesai"}
                    </Badge>
                    <Badge variant="outline">
                      {existingTeam && existingTeam.members ? `${existingTeam.members.length}/${existingTeam.maxMembers} Anggota` : ''}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {existingTeam && existingTeam.members && existingTeam.members.slice(0, 4).map((member) => (
                      <Avatar key={member.id} className="h-8 w-8">
                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {existingTeam && existingTeam.members && existingTeam.members.length > 4 && (
                      <div className="h-8 w-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{existingTeam.members.length - 4}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    Dibuat pada {existingTeam.createdAt}
                  </p>
                </div>
                
                {isTeamLeader && existingTeam.members.length < existingTeam.maxMembers && (
                  <Button 
                    onClick={() => setShowInviteDialog(true)}
                    className="w-full lg:w-auto text-sm lg:text-base"
                  >
                    <UserPlus className="mr-2 size-4" />
                    Undang Anggota
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Introduction Section - Only show for new teams */}
        {!hasExistingTeam && (
          <Card className="mb-6 lg:mb-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Info className="size-5 lg:size-6 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                    Apa itu Kolaborasi di Jagoan Banyuwangi? 🤝
                  </h2>
                  <div className="space-y-4 text-gray-700">
                    <p className="text-sm lg:text-base">
                      <strong>Kolaborasi</strong> adalah kesempatan untuk bekerja sama dengan jagoan-jagoan lain 
                      dari berbagai bidang untuk mewujudkan ide atau proyek yang bermanfaat bagi Banyuwangi.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-6">
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <Target className="size-6 lg:size-8 text-blue-600 mx-auto mb-2" />
                        <h3 className="font-bold mb-2 text-sm lg:text-base">Tujuan Jelas</h3>
                        <p className="text-xs lg:text-sm">Setiap kolaborasi memiliki tujuan dan target yang spesifik</p>
                      </div>
                      
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <Users className="size-6 lg:size-8 text-green-600 mx-auto mb-2" />
                        <h3 className="font-bold mb-2 text-sm lg:text-base">Tim Solid</h3>
                        <p className="text-xs lg:text-sm">Kerjasama antar jagoan dengan keahlian yang saling melengkapi</p>
                      </div>
                      
                      <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                        <CheckCircle className="size-6 lg:size-8 text-purple-600 mx-auto mb-2" />
                        <h3 className="font-bold mb-2 text-sm lg:text-base">Dampak Positif</h3>
                        <p className="text-xs lg:text-sm">Menghasilkan solusi yang bermanfaat untuk masyarakat Banyuwangi</p>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg mt-6">
                      <h4 className="font-bold text-gray-900 mb-2 text-sm lg:text-base">Contoh Kolaborasi Sukses:</h4>
                      <ul className="list-disc list-inside space-y-1 text-xs lg:text-sm">
                        <li><strong>Jagoan Digital + Jagoan Bisnis:</strong> Membuat aplikasi marketplace produk lokal</li>
                        <li><strong>Jagoan Tani + Jagoan Digital:</strong> Sistem monitoring tanaman berbasis IoT</li>
                        <li><strong>Jagoan Bisnis + Jagoan Tani:</strong> Program pemasaran produk organik</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Current Team Members - Show if editing team */}
        {hasExistingTeam && (
          <Card className="mb-6 lg:mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl text-center text-gray-900">
                Anggota Tim Saat Ini
              </CardTitle>
              <p className="text-center text-gray-600 text-sm lg:text-base">
                {existingTeam && existingTeam.members ? `${existingTeam.members.length} dari ${existingTeam.maxMembers} anggota` : ''}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {existingTeam && existingTeam.members && existingTeam.members.map((member) => (
                <div key={member.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-600 text-white">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-gray-900 text-sm lg:text-base">{member.name}</h4>
                      {member.status === "leader" && (
                        <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                          Leader
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs lg:text-sm text-gray-600 mb-1">{member.role}</p>
                    <div className="flex flex-col sm:flex-row gap-1 text-xs text-gray-500">
                      <span>📧 {member.email}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>📱 {member.phone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Form Section */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl text-center text-gray-900">
              {hasExistingTeam ? "Edit Informasi Tim" : "Form Pembuatan Tim Kolaborasi"}
            </CardTitle>
            <p className="text-center text-gray-600 text-sm lg:text-base">
              {hasExistingTeam ? 
                "Perbarui informasi tim dan undang anggota baru" :
                "Isi form berikut dengan detail lengkap untuk menarik anggota tim yang tepat"
              }
            </p>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 lg:space-y-8 p-4 lg:p-8">
              {/* Basic Information */}
              <div className="space-y-4 lg:space-y-6">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Target className="size-5 lg:size-6 text-blue-600" />
                  Informasi Dasar Proyek
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Nama Proyek *</Label>
                    <Input
                      id="projectName"
                      name="projectName"
                      placeholder="Contoh: Aplikasi Marketplace Produk Lokal Banyuwangi"
                      value={formData.projectName}
                      onChange={handleInputChange}
                      required
                      className="h-10 lg:h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori Utama *</Label>
                    <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                      <SelectTrigger className="h-10 lg:h-12">
                        <SelectValue placeholder="Pilih kategori proyek" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="digital">Jagoan Digital</SelectItem>
                        <SelectItem value="tani">Jagoan Tani</SelectItem>
                        <SelectItem value="bisnis">Jagoan Bisnis</SelectItem>
                        <SelectItem value="gabungan">Gabungan (Multi-bidang)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Deskripsi Proyek *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Jelaskan secara detail tentang proyek yang ingin Anda kerjakan, masalah yang ingin diselesaikan, dan solusi yang ditawarkan..."
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="min-h-[100px] lg:min-h-[120px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="goals">Tujuan dan Target *</Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    placeholder="Apa yang ingin dicapai dari proyek ini? Target spesifik apa yang ingin diraih? Manfaat apa untuk masyarakat Banyuwangi?"
                    value={formData.goals}
                    onChange={handleInputChange}
                    required
                    className="min-h-[80px] lg:min-h-[100px]"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-4 lg:space-y-6">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Calendar className="size-5 lg:size-6 text-green-600" />
                  Detail Pelaksanaan
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Durasi Proyek *</Label>
                    <Select value={formData.duration} onValueChange={(value) => handleSelectChange("duration", value)}>
                      <SelectTrigger className="h-10 lg:h-12">
                        <SelectValue placeholder="Pilih durasi" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2bulan">1-2 Bulan</SelectItem>
                        <SelectItem value="3-6bulan">3-6 Bulan</SelectItem>
                        <SelectItem value="6bulan-1tahun">6 Bulan - 1 Tahun</SelectItem>
                        <SelectItem value="lebih-1tahun">Lebih dari 1 Tahun</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Lokasi Kerja</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Remote / Banyuwangi / Lokasi spesifik"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="h-10 lg:h-12"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Estimasi Budget</Label>
                    <Input
                      id="budget"
                      name="budget"
                      placeholder="Contoh: Rp 5.000.000 atau Swadaya"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="h-10 lg:h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teamSize">Jumlah Anggota Tim *</Label>
                    <Select value={formData.teamSize} onValueChange={(value) => handleSelectChange("teamSize", value)}>
                      <SelectTrigger className="h-10 lg:h-12">
                        <SelectValue placeholder="Pilih ukuran tim" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2-3">2-3 Orang</SelectItem>
                        <SelectItem value="4-5">4-5 Orang</SelectItem>
                        <SelectItem value="6-8">6-8 Orang</SelectItem>
                        <SelectItem value="lebih-8">Lebih dari 8 Orang</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Team Requirements */}
              <div className="space-y-4 lg:space-y-6">
                <h3 className="text-lg lg:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Users className="size-5 lg:size-6 text-purple-600" />
                  Kebutuhan Tim
                </h3>
                
                <div className="space-y-2">
                  <Label htmlFor="skillsNeeded">Keahlian yang Dibutuhkan *</Label>
                  <Textarea
                    id="skillsNeeded"
                    name="skillsNeeded"
                    placeholder="Sebutkan keahlian spesifik yang Anda butuhkan. Contoh: Frontend Developer (React), UI/UX Designer, Content Writer, Marketing Specialist, Ahli Pertanian, dll..."
                    value={formData.skillsNeeded}
                    onChange={handleInputChange}
                    required
                    className="min-h-[80px] lg:min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline Pekerjaan</Label>
                  <Textarea
                    id="timeline"
                    name="timeline"
                    placeholder="Jelaskan tahapan kerja dan timeline yang diinginkan. Contoh: Minggu 1-2: Research dan Planning, Minggu 3-4: Development, dll..."
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="min-h-[80px] lg:min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="benefits">Manfaat untuk Anggota Tim</Label>
                  <Textarea
                    id="benefits"
                    name="benefits"
                    placeholder="Apa yang bisa didapat anggota tim? Contoh: Pengalaman kerja, sertifikat, networking, portofolio, pembagian keuntungan, dll..."
                    value={formData.benefits}
                    onChange={handleInputChange}
                    className="min-h-[80px] lg:min-h-[100px]"
                  />
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-blue-50 p-4 lg:p-6 rounded-lg border border-blue-200">
                <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2 text-sm lg:text-base">
                  <Info className="size-4 lg:size-5" />
                  Catatan Penting:
                </h4>
                <ul className="list-disc list-inside space-y-2 text-blue-800 text-xs lg:text-sm">
                  <li>{hasExistingTeam ? "Perubahan akan direview oleh admin sebelum dipublikasikan" : "Tim kolaborasi akan direview oleh admin sebelum dipublikasikan"}</li>
                  <li>Pastikan deskripsi proyek jelas dan realistis</li>
                  <li>Proyek harus memberikan manfaat positif untuk masyarakat Banyuwangi</li>
                  <li>Anda akan mendapat notifikasi setelah {hasExistingTeam ? "perubahan" : "tim"} disetujui dan dipublikasikan</li>
                  <li>{hasExistingTeam ? "Anggota tim akan mendapat notifikasi tentang perubahan" : "Anggota tim yang tertarik akan menghubungi Anda melalui platform"}</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
                {hasExistingTeam && isTeamLeader && existingTeam.members.length < existingTeam.maxMembers && (
                  <Button 
                    type="button"
                    onClick={() => setShowInviteDialog(true)}
                    variant="outline"
                    size="lg" 
                    className="px-8 lg:px-12 py-3 lg:py-4 text-base lg:text-lg"
                  >
                    <UserPlus className="mr-2 size-4" />
                    Undang Anggota
                  </Button>
                )}
                <Button 
                  type="submit" 
                  size="lg" 
                  className="px-8 lg:px-12 py-3 lg:py-4 text-base lg:text-lg"
                  disabled={!formData.projectName || !formData.category || !formData.description || !formData.goals || !formData.skillsNeeded}
                >
                  <Users className="mr-2 size-4 lg:size-5" />
                  {hasExistingTeam ? "Simpan Perubahan" : "Buat Tim Kolaborasi"}
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>

        {/* Invite Members Dialog */}
        <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
          <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg lg:text-xl">Undang Anggota Baru</DialogTitle>
              <DialogDescription className="text-sm lg:text-base">
                Pilih jagoan lain yang ingin Anda ajak berkolaborasi dalam proyek ini
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                <Input
                  placeholder="Cari berdasarkan nama, keahlian, atau kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 lg:h-12"
                />
              </div>

              {/* Selected Users Counter */}
              {selectedUsers.length > 0 && (
                <div className="bg-blue-50 p-3 rounded-lg border">
                  <p className="text-sm text-blue-700">
                    {selectedUsers.length} orang dipilih untuk diundang
                  </p>
                </div>
              )}

              {/* User List */}
              <div className="space-y-3 max-h-[300px] lg:max-h-[400px] overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className={`flex items-center gap-3 p-3 lg:p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedUsers.includes(user.id) 
                        ? "bg-blue-50 border-blue-200" 
                        : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => handleUserSelect(user.id)}
                  >
                    <Avatar className="h-10 w-10 lg:h-12 lg:w-12">
                      <AvatarFallback className="bg-blue-600 text-white text-sm lg:text-base">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm lg:text-base">{user.name}</h4>
                      <p className="text-xs lg:text-sm text-gray-600">{user.email}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {user.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="outline" className={getCategoryColor(user.category)}>
                        {getCategoryName(user.category)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              {filteredUsers.length === 0 && (
                <div className="text-center py-8">
                  <Users className="size-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Tidak ada jagoan yang ditemukan</p>
                </div>
              )}

              {/* Invite Message */}
              <div className="space-y-2">
                <Label htmlFor="inviteMessage">Pesan Undangan (Opsional)</Label>
                <Textarea
                  id="inviteMessage"
                  placeholder="Tulis pesan personal untuk mengundang mereka bergabung..."
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  className="min-h-[80px] lg:min-h-[100px]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  onClick={handleSendInvitations}
                  disabled={selectedUsers.length === 0}
                  className="flex-1 text-sm lg:text-base"
                >
                  <Send className="mr-2 size-4" />
                  Kirim Undangan ({selectedUsers.length})
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowInviteDialog(false)}
                  className="flex-1 text-sm lg:text-base"
                >
                  Batal
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  X, 
  Save,
  Eye,
  Camera,
  MapPin,
  Briefcase,
  Phone,
  Mail,
  Globe
} from "lucide-react";

interface ProfileEditProps {
  onNavigateToDashboard: () => void;
}

export default function ProfileEdit({ onNavigateToDashboard }: ProfileEditProps) {
  const [profileData, setProfileData] = useState({
    name: "Muhammad Faris",
    avatar: "MF",
    email: "faris@example.com",
    phone: "081234567890",
    location: "Banyuwangi Kota",
    category: "digital",
    specialty: "Full Stack Developer",
    description: "Saya adalah full stack developer dengan pengalaman 2+ tahun dalam pengembangan web dan mobile application. Passionate dalam menciptakan solusi teknologi untuk masalah nyata.",
    skills: ["React", "Node.js", "MongoDB", "React Native"],
    website: "https://farisdev.com",
    portfolioItems: [
      {
        id: 1,
        title: "E-commerce Platform",
        description: "Platform e-commerce untuk UMKM lokal dengan fitur lengkap",
        image: "https://images.unsplash.com/photo-1601387913800-b48217dc5fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMHN0YXJ0dXB8ZW58MXx8fHwxNzU2MDQ5MDkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        url: "https://github.com/faris/ecommerce"
      }
    ]
  });

  const [newSkill, setNewSkill] = useState("");
  const [newPortfolio, setNewPortfolio] = useState({
    title: "",
    description: "",
    image: "",
    url: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addPortfolioItem = () => {
    if (newPortfolio.title.trim() && newPortfolio.description.trim()) {
      setProfileData(prev => ({
        ...prev,
        portfolioItems: [...prev.portfolioItems, {
          id: Date.now(),
          ...newPortfolio
        }]
      }));
      setNewPortfolio({
        title: "",
        description: "",
        image: "",
        url: ""
      });
    }
  };

  const removePortfolioItem = (idToRemove: number) => {
    setProfileData(prev => ({
      ...prev,
      portfolioItems: prev.portfolioItems.filter(item => item.id !== idToRemove)
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Profile saved:", profileData);
    // Show success message or navigate back
    onNavigateToDashboard();
  };

  const categoryOptions = [
    { value: "digital", label: "Jagoan Digital" },
    { value: "tani", label: "Jagoan Tani" },
    { value: "bisnis", label: "Jagoan Bisnis" }
  ];

  const locationOptions = [
    "Banyuwangi Kota",
    "Banyuwangi Utara",
    "Banyuwangi Selatan",
    "Banyuwangi Timur",
    "Banyuwangi Barat",
    "Desa Kemiren",
    "Desa Sukamade",
    "Desa Osing"
  ];

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
            <div className="flex items-center gap-2">
              <Button variant="outline" className="flex items-center gap-2">
                <Eye className="size-4" />
                Preview
              </Button>
              <Button variant="ghost" className="flex items-center gap-2" onClick={onNavigateToDashboard}>
                <ArrowLeft className="size-4" />
                Kembali
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Profil</h1>
          <p className="text-muted-foreground">
            Lengkapi profil Anda agar mudah ditemukan oleh calon kolaborator
          </p>
        </div>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="basic">Informasi Dasar</TabsTrigger>
            <TabsTrigger value="skills">Keahlian & Portfolio</TabsTrigger>
            <TabsTrigger value="contact">Kontak & Sosial</TabsTrigger>
          </TabsList>

          {/* Basic Information Tab */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Dasar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-4">
                  <Avatar className="size-20">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {profileData.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="mb-2">
                      <Camera className="size-4 mr-2" />
                      Upload Foto
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      JPG, PNG atau GIF. Maksimal 2MB.
                    </p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category">Kategori Jagoan *</Label>
                  <Select value={profileData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Specialty */}
                <div>
                  <Label htmlFor="specialty">Spesialisasi *</Label>
                  <Input
                    id="specialty"
                    value={profileData.specialty}
                    onChange={(e) => handleInputChange("specialty", e.target.value)}
                    placeholder="e.g. Full Stack Developer, Digital Marketing Expert"
                  />
                </div>

                {/* Location */}
                <div>
                  <Label htmlFor="location">Lokasi *</Label>
                  <Select value={profileData.location} onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih lokasi" />
                    </SelectTrigger>
                    <SelectContent>
                      {locationOptions.map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Deskripsi Diri *</Label>
                  <Textarea
                    id="description"
                    value={profileData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Ceritakan tentang pengalaman, passion, dan apa yang bisa Anda tawarkan..."
                    rows={4}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {profileData.description.length}/500 karakter
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills & Portfolio Tab */}
          <TabsContent value="skills">
            <div className="space-y-6">
              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Keahlian</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X 
                          className="size-3 cursor-pointer hover:text-destructive" 
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Tambah keahlian..."
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill} size="sm">
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Existing Portfolio Items */}
                  <div className="grid gap-4">
                    {profileData.portfolioItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            {item.url && (
                              <p className="text-xs text-blue-600">{item.url}</p>
                            )}
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removePortfolioItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                        {item.image && (
                          <ImageWithFallback
                            src={item.image}
                            alt={item.title}
                            className="w-full h-32 object-cover rounded-md"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add New Portfolio Item */}
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 space-y-4">
                    <h4 className="font-medium">Tambah Portfolio Baru</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        value={newPortfolio.title}
                        onChange={(e) => setNewPortfolio(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Judul project"
                      />
                      <Input
                        value={newPortfolio.url}
                        onChange={(e) => setNewPortfolio(prev => ({ ...prev, url: e.target.value }))}
                        placeholder="URL project (opsional)"
                      />
                    </div>
                    <Textarea
                      value={newPortfolio.description}
                      onChange={(e) => setNewPortfolio(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Deskripsi project"
                      rows={2}
                    />
                    <div className="flex gap-2">
                      <Input
                        value={newPortfolio.image}
                        onChange={(e) => setNewPortfolio(prev => ({ ...prev, image: e.target.value }))}
                        placeholder="URL gambar"
                      />
                      <Button variant="outline">
                        <Upload className="size-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                    <Button onClick={addPortfolioItem} className="w-full">
                      <Plus className="size-4 mr-2" />
                      Tambah Portfolio
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact & Social Tab */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email */}
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="email@example.com"
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone">Nomor WhatsApp *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="081234567890"
                      className="pl-10"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Nomor ini akan digunakan untuk kontak via WhatsApp
                  </p>
                </div>

                {/* Website */}
                <div>
                  <Label htmlFor="website">Website/Portfolio (Opsional)</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input
                      id="website"
                      value={profileData.website}
                      onChange={(e) => handleInputChange("website", e.target.value)}
                      placeholder="https://yourwebsite.com"
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-center pt-8">
          <Button onClick={handleSave} size="lg" className="px-8">
            <Save className="size-4 mr-2" />
            Simpan Profil
          </Button>
        </div>
      </div>
    </div>
  );
}
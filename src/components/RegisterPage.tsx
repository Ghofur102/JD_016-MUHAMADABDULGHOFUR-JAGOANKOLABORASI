import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ArrowLeft,
  Upload,
  FileText,
  Camera,
  Briefcase,
  Sprout,
  Monitor,
  CheckCircle,
  Menu,
  X,
} from "lucide-react";
import { handleGoogleSignIn } from "@/lib/auth/register";

interface RegisterPageProps {
  onNavigateToLanding: () => void;
  onNavigateToLogin: () => void;
  onRegisterSuccess: () => void;
}

type JagoanType = "digital" | "tani" | "bisnis" | null;

export default function RegisterPage({
  onNavigateToLanding,
  onNavigateToLogin,
  onRegisterSuccess,
}: RegisterPageProps) {
  const [currentStep, setCurrentStep] = useState<
    | "category"
    | "google-auth"
    | "details"
    | "upload"
    | "success"
  >("category");
  const [selectedCategory, setSelectedCategory] =
    useState<JagoanType>(null);
  const [googleUser, setGoogleUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    // Common fields
    fullName: "",
    phone: "",
    address: "",

    // Digital specific
    skills: "",
    experience: "",
    portfolio: "",

    // Tani specific
    farmingExperience: "",
    cropTypes: "",
    farmSize: "",
    farmLocation: "",

    // Bisnis specific
    businessName: "",
    businessType: "",
    businessDescription: "",
    businessLocation: "",
    targetMarket: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState({
    ktp: null as File | null,
    cv: null as File | null,
    portfolio: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (
    fileType: keyof typeof uploadedFiles,
    file: File,
  ) => {
    setUploadedFiles((prev) => ({
      ...prev,
      [fileType]: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Registration data:", {
      category: selectedCategory,
      googleUser,
      formData,
      uploadedFiles,
    });

    setCurrentStep("success");

    // Auto redirect after 3 seconds
    setTimeout(() => {
      onRegisterSuccess();
    }, 3000);
  };

  const getCategoryInfo = (category: JagoanType) => {
    switch (category) {
      case "digital":
        return {
          title: "Jagoan Digital",
          description:
            "Untuk developer, designer, dan teknolog",
          icon: Monitor,
          color: "blue",
        };
      case "tani":
        return {
          title: "Jagoan Tani",
          description:
            "Untuk petani, peternak, dan pelaku agribisnis",
          icon: Sprout,
          color: "green",
        };
      case "bisnis":
        return {
          title: "Jagoan Bisnis",
          description: "Untuk entrepreneur dan pelaku UMKM",
          icon: Briefcase,
          color: "purple",
        };
      default:
        return null;
    }
  };

  // Category Selection Step
  if (currentStep === "category") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
                  onClick={() =>
                    setMobileMenuOpen(!mobileMenuOpen)
                  }
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

        <div className="flex items-center justify-center px-4 py-8 sm:py-12">
          <div className="w-full max-w-5xl">
            <div className="text-center mb-6 lg:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-900 mb-2">
                Bergabung dengan Jagoan Banyuwangi! 🚀
              </h1>
              <p className="text-base sm:text-lg text-gray-600">
                Pilih kategori yang sesuai dengan bidang
                keahlian Anda
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {(
                ["digital", "tani", "bisnis"] as JagoanType[]
              ).map((category) => {
                const info = getCategoryInfo(category);
                if (!info) return null;

                const IconComponent = info.icon;

                return (
                  <Card
                    key={category}
                    className={`cursor-pointer border-2 transition-all hover:shadow-lg ${
                      selectedCategory === category
                        ? `border-${info.color}-500 bg-${info.color}-50`
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      setSelectedCategory(category)
                    }
                  >
                    <CardContent className="p-6 lg:p-8 text-center">
                      <div
                        className={`w-12 h-12 lg:w-16 lg:h-16 bg-${info.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <IconComponent
                          className={`size-6 lg:size-8 text-${info.color}-600`}
                        />
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      <p className="text-sm lg:text-base text-gray-600 mb-4">
                        {info.description}
                      </p>
                      <Badge
                        variant={
                          selectedCategory === category
                            ? "default"
                            : "secondary"
                        }
                        className={
                          selectedCategory === category
                            ? `bg-${info.color}-600 text-white`
                            : ""
                        }
                      >
                        {selectedCategory === category
                          ? "Dipilih"
                          : "Pilih"}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {selectedCategory && (
              <div className="text-center mt-6 lg:mt-8">
                <Button
                  size="lg" variant="dark"
                  className="px-8 lg:px-12 py-3 lg:py-4 text-base lg:text-lg"
                  onClick={() => setCurrentStep("success")}
                >
                  Lanjutkan Pendaftaran
                </Button>
              </div>
            )}

            <div className="text-center mt-4 lg:mt-6">
              <p className="text-sm text-gray-600">
                Sudah punya akun?
                <button
                  onClick={onNavigateToLogin}
                  className="text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Masuk di sini
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  // Google Auth Step
  if (currentStep === "google-auth") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-xl">
          <CardHeader className="text-center pb-4 lg:pb-6">
            <CardTitle className="text-xl lg:text-2xl">
              Masuk dengan Google
            </CardTitle>
            <CardDescription className="text-sm lg:text-base">
              Gunakan akun Google Anda untuk mendaftar dengan
              mudah
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 lg:space-y-6">
            <Button
              onClick={() => handleGoogleSignIn(selectedCategory!)}
              variant="outline"
              className="w-full h-11 lg:h-12 text-sm lg:text-base"
            >
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5 mr-2 lg:mr-3"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Lanjutkan dengan Google (jagoan {selectedCategory})
            </Button>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setCurrentStep("category")}
                className="text-sm"
              >
                <ArrowLeft className="size-4 mr-2" />
                Kembali ke pemilihan kategori
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  
  // Details Form Step
  const categoryInfo = getCategoryInfo(selectedCategory);

  // Success Step
  if (currentStep === "success") {
   return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 lg:w-12 lg:h-12 bg-${categoryInfo?.color}-600 rounded-lg flex items-center justify-center`}
              >
                {categoryInfo && (
                  <categoryInfo.icon className="size-5 lg:size-6 text-white" />
                )}
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-bold text-gray-900">
                  Pendaftaran {categoryInfo?.title}
                </h1>
                <p className="text-xs lg:text-sm text-gray-500">
                  Lengkapi data diri Anda
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              className="flex items-center gap-2 text-sm lg:text-base"
              onClick={() => setCurrentStep("category")}
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Kembali</span>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 lg:space-y-8"
        >
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">
                Informasi Dasar
              </CardTitle>
              <CardDescription className="text-sm lg:text-base">
                Data pribadi dan kontak
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 lg:space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Nama Lengkap 
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    onChange={handleInputChange}
                    required
                    className="h-10 lg:h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Nomor WhatsApp *
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="08123456789"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="h-10 lg:h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">
                  Alamat Lengkap *
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  placeholder="Alamat lengkap Anda di Banyuwangi"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="min-h-[60px] lg:min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Category Specific Fields */}
          {selectedCategory === "digital" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <Monitor className="size-5 lg:size-6 text-blue-600" />
                  Informasi Keahlian Digital
                </CardTitle>
                <CardDescription className="text-sm lg:text-base">
                  Detail pengalaman dan skill teknologi Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="skills">
                    Keahlian Teknis *
                  </Label>
                  <Textarea
                    id="skills"
                    name="skills"
                    placeholder="Contoh: React, Node.js, UI/UX Design, Mobile Development, Python, Data Analysis, dll."
                    value={formData.skills}
                    onChange={handleInputChange}
                    required
                    className="min-h-[80px] lg:min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">
                    Pengalaman Kerja
                  </Label>
                  <Textarea
                    id="experience"
                    name="experience"
                    placeholder="Ceritakan pengalaman kerja atau proyek yang pernah Anda kerjakan"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="min-h-[80px] lg:min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="portfolio">
                    Link Portfolio/GitHub
                  </Label>
                  <Input
                    id="portfolio"
                    name="portfolio"
                    placeholder="https://github.com/username atau https://portfolio.com"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    className="h-10 lg:h-12"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {selectedCategory === "tani" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <Sprout className="size-5 lg:size-6 text-green-600" />
                  Informasi Pertanian
                </CardTitle>
                <CardDescription className="text-sm lg:text-base">
                  Detail pengalaman dan usaha pertanian Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="farmingExperience">
                    Pengalaman Bertani *
                  </Label>
                  <Textarea
                    id="farmingExperience"
                    name="farmingExperience"
                    placeholder="Berapa lama pengalaman bertani, jenis tanaman yang dikuasai, teknik yang digunakan, dll."
                    value={formData.farmingExperience}
                    onChange={handleInputChange}
                    required
                    className="min-h-[80px] lg:min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="cropTypes">
                      Jenis Tanaman/Ternak
                    </Label>
                    <Input
                      id="cropTypes"
                      name="cropTypes"
                      placeholder="Padi, Jagung, Sayuran, Sapi, Ayam, dll."
                      value={formData.cropTypes}
                      onChange={handleInputChange}
                      className="h-10 lg:h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="farmSize">Luas Lahan</Label>
                    <Input
                      id="farmSize"
                      name="farmSize"
                      placeholder="Contoh: 1 hektar, 5000 m2"
                      value={formData.farmSize}
                      onChange={handleInputChange}
                      className="h-10 lg:h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmLocation">
                    Lokasi Lahan/Usaha
                  </Label>
                  <Input
                    id="farmLocation"
                    name="farmLocation"
                    placeholder="Desa/Kecamatan di Banyuwangi"
                    value={formData.farmLocation}
                    onChange={handleInputChange}
                    className="h-10 lg:h-12"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {selectedCategory === "bisnis" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                  <Briefcase className="size-5 lg:size-6 text-purple-600" />
                  Informasi Bisnis
                </CardTitle>
                <CardDescription className="text-sm lg:text-base">
                  Detail usaha dan pengalaman bisnis Anda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 lg:space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">
                      Nama Usaha
                    </Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      placeholder="Nama usaha/brand Anda"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="h-10 lg:h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">
                      Jenis Usaha *
                    </Label>
                    <Input
                      id="businessType"
                      name="businessType"
                      placeholder="UMKM, Startup, Jasa, Dagang, dll."
                      value={formData.businessType}
                      onChange={handleInputChange}
                      required
                      className="h-10 lg:h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="businessDescription">
                    Deskripsi Usaha *
                  </Label>
                  <Textarea
                    id="businessDescription"
                    name="businessDescription"
                    placeholder="Jelaskan produk/jasa yang Anda tawarkan, target pasar, dan keunggulan usaha Anda"
                    value={formData.businessDescription}
                    onChange={handleInputChange}
                    required
                    className="min-h-[80px] lg:min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessLocation">
                      Lokasi Usaha
                    </Label>
                    <Input
                      id="businessLocation"
                      name="businessLocation"
                      placeholder="Alamat toko/kantor/online"
                      value={formData.businessLocation}
                      onChange={handleInputChange}
                      className="h-10 lg:h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetMarket">
                      Target Pasar
                    </Label>
                    <Input
                      id="targetMarket"
                      name="targetMarket"
                      placeholder="Lokal Banyuwangi, Regional, Nasional"
                      value={formData.targetMarket}
                      onChange={handleInputChange}
                      className="h-10 lg:h-12"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* File Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                <Upload className="size-5 lg:size-6 text-orange-600" />
                Upload Dokumen
              </CardTitle>
              <CardDescription className="text-sm lg:text-base">
                Upload dokumen yang diperlukan untuk verifikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 lg:space-y-6">
              {/* KTP Upload */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Camera className="size-4" />
                  Foto KTP * (Wajib)
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload("ktp", file);
                    }}
                    className="hidden"
                    id="ktp-upload"
                  />
                  <label
                    htmlFor="ktp-upload"
                    className="cursor-pointer"
                  >
                    <Camera className="size-6 lg:size-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {uploadedFiles.ktp
                        ? uploadedFiles.ktp.name
                        : "Klik untuk upload foto KTP"}
                    </p>
                  </label>
                </div>
              </div>

              {selectedCategory === "digital" && (
                <>
                  {/* CV Upload */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <FileText className="size-4" />
                      CV/Resume (Opsional)
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 text-center">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file)
                            handleFileUpload("cv", file);
                        }}
                        className="hidden"
                        id="cv-upload"
                      />
                      <label
                        htmlFor="cv-upload"
                        className="cursor-pointer"
                      >
                        <FileText className="size-6 lg:size-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {uploadedFiles.cv
                            ? uploadedFiles.cv.name
                            : "Klik untuk upload CV (PDF/DOC)"}
                        </p>
                      </label>
                    </div>
                  </div>

                  {/* Portfolio Upload */}
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Upload className="size-4" />
                      Portfolio File (Opsional)
                    </Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 text-center">
                      <input
                        type="file"
                        accept=".pdf,.zip,.rar"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file)
                            handleFileUpload("portfolio", file);
                        }}
                        className="hidden"
                        id="portfolio-upload"
                      />
                      <label
                        htmlFor="portfolio-upload"
                        className="cursor-pointer"
                      >
                        <Upload className="size-6 lg:size-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {uploadedFiles.portfolio
                            ? uploadedFiles.portfolio.name
                            : "Klik untuk upload portfolio (PDF/ZIP)"}
                        </p>
                      </label>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() => setCurrentStep("google-auth")}
              size="lg"
              className="px-8 lg:px-12 py-3 lg:py-4 text-base lg:text-lg"
              disabled={
                !formData.fullName ||
                !formData.phone ||
                !formData.address ||
                !uploadedFiles.ktp
              }
            >
              <CheckCircle className="mr-2 size-4 lg:size-5" />
              Daftar Sekarang
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
  }

   return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <Card className="max-w-md w-full shadow-lg">
          <CardContent className="p-6 lg:p-8 text-center">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="size-6 lg:size-8 text-green-600" />
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
              Pendaftaran Berhasil! 🎉
            </h2>
            <p className="text-sm lg:text-base text-gray-600 mb-6">
              Selamat bergabung dengan komunitas Jagoan
              Banyuwangi! Akun Anda sedang diverifikasi dan akan
              segera aktif.
            </p>
            <Button
              onClick={onRegisterSuccess}
              className="w-full"
            >
              Masuk ke Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  
}
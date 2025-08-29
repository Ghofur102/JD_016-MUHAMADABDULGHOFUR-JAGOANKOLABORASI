import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { 
  ArrowLeft, 
  Send, 
  HelpCircle, 
  Tag, 
  Clock,
  MessageSquare,
  ThumbsUp,
  User
} from "lucide-react";

interface AjukanPertanyaanProps {
  onNavigateToDashboard: () => void;
}

// Mock FAQ data
const faqData = [
  {
    id: 1,
    question: "Bagaimana cara memulai kolaborasi dengan jagoan lain?",
    answer: "Anda bisa mencari kolaborator melalui halaman 'Cari Kolaborator', lalu klik tombol 'Hubungi via WhatsApp' pada profil yang menarik. Pastikan untuk memperkenalkan diri dan menjelaskan proyek yang ingin dikerjakan bersama.",
    category: "Kolaborasi",
    likes: 15,
    replies: 3
  },
  {
    id: 2,
    question: "Apakah ada biaya untuk menggunakan platform Jagoan Banyuwangi?",
    answer: "Platform Jagoan Banyuwangi gratis untuk digunakan. Kami percaya bahwa kolaborasi dan berbagi pengetahuan harus dapat diakses oleh semua orang di Banyuwangi.",
    category: "Platform",
    likes: 23,
    replies: 1
  },
  {
    id: 3,
    question: "Bagaimana cara meningkatkan visibilitas profil saya?",
    answer: "Lengkapi profil Anda dengan foto, deskripsi yang menarik, portfolio terbaik, dan skills yang relevan. Aktif menjawab pertanyaan dan berkolaborasi juga akan meningkatkan reputasi Anda di platform.",
    category: "Profil",
    likes: 12,
    replies: 5
  },
  {
    id: 4,
    question: "Apa yang harus dilakukan jika mengalami kendala teknis?",
    answer: "Jika mengalami kendala teknis, Anda bisa menghubungi tim support melalui WhatsApp atau email yang tersedia di halaman kontak. Tim kami siap membantu 24/7.",
    category: "Support",
    likes: 8,
    replies: 2
  },
  {
    id: 5,
    question: "Bagaimana cara bergabung dengan program PKM atau hibah lainnya?",
    answer: "Informasi tentang PKM dan hibah akan diumumkan melalui platform dan grup WhatsApp. Pastikan Anda mengaktifkan notifikasi dan bergabung dengan komunitas untuk mendapat update terbaru.",
    category: "Program",
    likes: 31,
    replies: 7
  },
  {
    id: 6,
    question: "Apakah saya bisa mengganti kategori jagoan setelah mendaftar?",
    answer: "Ya, Anda bisa mengganti kategori jagoan melalui halaman edit profil. Namun pastikan perubahan tersebut sesuai dengan keahlian dan fokus Anda saat ini.",
    category: "Profil",
    likes: 6,
    replies: 1
  }
];

const categories = [
  "Umum",
  "Kolaborasi", 
  "Profil",
  "Platform",
  "Support",
  "Program",
  "Teknis"
];

export default function AjukanPertanyaan({ onNavigateToDashboard }: AjukanPertanyaanProps) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    tags: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Question submitted:", formData);
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      title: "",
      category: "",
      description: "",
      tags: ""
    });
    
    // Show success message (you could add a toast here)
    alert("Pertanyaan berhasil diajukan! Tim kami akan merespons dalam 24 jam.");
  };

  const isFormValid = formData.title.trim() && formData.category && formData.description.trim();

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Ajukan Pertanyaan Baru</h1>
          <p className="text-muted-foreground">
            Dapatkan jawaban dari komunitas Jagoan Banyuwangi yang berpengalaman
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="size-5" />
                  Form Pertanyaan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div>
                    <Label htmlFor="title">Judul Pertanyaan *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Tulis judul pertanyaan yang jelas dan spesifik..."
                      maxLength={100}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.title.length}/100 karakter
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <Label htmlFor="description">Detail Pertanyaan *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Jelaskan pertanyaan Anda secara detail. Semakin spesifik, semakin baik jawaban yang akan Anda dapatkan..."
                      rows={6}
                      maxLength={1000}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {formData.description.length}/1000 karakter
                    </p>
                  </div>
                
                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={!isFormValid || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="size-4 mr-2 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      <>
                        <Send className="size-4 mr-2" />
                        Ajukan Pertanyaan
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Tips Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="size-5" />
                  Tips Bertanya
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <h4 className="font-medium">✅ Lakukan:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Tulis judul yang jelas dan spesifik</li>
                    <li>• Jelaskan konteks dan detail masalah</li>
                    <li>• Gunakan tags yang relevan</li>
                    <li>• Periksa FAQ terlebih dahulu</li>
                  </ul>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">❌ Hindari:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Pertanyaan terlalu umum</li>
                    <li>• Menggunakan bahasa yang tidak sopan</li>
                    <li>• Duplikasi pertanyaan</li>
                    <li>• Meminta jawaban instan</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Pertanyaan yang Sering Diajukan</h2>
            <p className="text-muted-foreground">
              Mungkin jawaban yang Anda cari sudah tersedia di sini
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id.toString()}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-start gap-3 w-full">
                        <div className="flex-1">
                          <h4 className="font-medium">{faq.question}</h4>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-6 pt-4">
                        <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
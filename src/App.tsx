import { useState } from "react";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import CariKolaborator from "./components/CariKolaborator";
import ProfileEdit from "./components/ProfileEdit";
import AjukanPertanyaan from "./components/AjukanPertanyaan";
import DaftarNotifikasi from "./components/DaftarNotifikasi";
import BuatKolaborasi from "./components/BuatKolaborasi";

type PageType =
  | "landing"
  | "login"
  | "register"
  | "dashboard"
  | "admin-dashboard"
  | "cari-kolaborator"
  | "profile-edit"
  | "ajukan-pertanyaan"
  | "daftar-notifikasi"
  | "buat-kolaborasi";

type UserType = "user" | "admin" | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("landing");
  const [userType, setUserType] = useState<UserType>(null);

  const navigateToLogin = () => {
    setCurrentPage("login");
    setUserType(null);
  };
  const navigateToRegister = () => setCurrentPage("register");
  const navigateToDashboard = () => setCurrentPage("dashboard");
  const navigateToAdminDashboard = () => setCurrentPage("admin-dashboard");
  const navigateToLanding = () => setCurrentPage("landing");
  const navigateToCariKolaborator = () => setCurrentPage("cari-kolaborator");
  const navigateToProfileEdit = () => setCurrentPage("profile-edit");
  const navigateToAjukanPertanyaan = () => setCurrentPage("ajukan-pertanyaan");
  const navigateToDaftarNotifikasi = () => setCurrentPage("daftar-notifikasi");
  const navigateToBuatKolaborasi = () => setCurrentPage("buat-kolaborasi");

  const handleLoginSuccess = (loginUserType: UserType) => {
    setUserType(loginUserType);
    if (loginUserType === "admin") {
      setCurrentPage("admin-dashboard");
    } else {
      setCurrentPage("dashboard");
    }
  };

  const handleRegisterSuccess = () => {
    setUserType("user");
    setCurrentPage("dashboard");
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "landing":
        return <LandingPage onNavigateToLogin={navigateToLogin} onNavigateToRegister={navigateToRegister} />;
      case "login":
        return (
          <LoginPage
            onNavigateToLanding={navigateToLanding}
            onNavigateToRegister={navigateToRegister}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case "register":
        return (
          <RegisterPage
            onNavigateToLanding={navigateToLanding}
            onNavigateToLogin={navigateToLogin}
            onRegisterSuccess={handleRegisterSuccess}
          />
        );
      case "dashboard":
        return (
          <Dashboard
            onNavigateToLogin={navigateToLogin}
            onNavigateToCariKolaborator={navigateToCariKolaborator}
            onNavigateToProfileEdit={navigateToProfileEdit}
            onNavigateToAjukanPertanyaan={navigateToAjukanPertanyaan}
            onNavigateToDaftarNotifikasi={navigateToDaftarNotifikasi}
            onNavigateToBuatKolaborasi={navigateToBuatKolaborasi}
          />
        );
      case "admin-dashboard":
        return (
          <AdminDashboard
            onNavigateToLogin={navigateToLogin}
          />
        );
      case "cari-kolaborator":
        return <CariKolaborator onNavigateToDashboard={navigateToDashboard} />;
      case "profile-edit":
        return <ProfileEdit onNavigateToDashboard={navigateToDashboard} />;
      case "ajukan-pertanyaan":
        return <AjukanPertanyaan onNavigateToDashboard={navigateToDashboard} />;
      case "daftar-notifikasi":
        return <DaftarNotifikasi onNavigateToDashboard={navigateToDashboard} />;
      case "buat-kolaborasi":
        return <BuatKolaborasi onNavigateToDashboard={navigateToDashboard} />;
      default:
        return <LandingPage onNavigateToLogin={navigateToLogin} onNavigateToRegister={navigateToRegister} />;
    }
  };

  return renderCurrentPage();
}
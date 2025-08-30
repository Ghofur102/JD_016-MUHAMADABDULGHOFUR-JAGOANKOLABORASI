"use client";

import { registerSchema, RegisterFormValues } from "@/schemas/auth.schema";
import registerUser from "@/services/register";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { DigitalProfile } from "@/types/database/digital_profiles";
import { TaniProfile } from "@/types/database/tani_profiles";
import { BusinessProfile } from "@/types/database/business_profiles";

interface IRegisterResponse {
  success: boolean;
  profileData: DigitalProfile | TaniProfile | BusinessProfile;
  error?: string;
}

export function useRegisterForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const result: IRegisterResponse = await registerUser(values);

      if (!result.success) {
        toast.error(result.error || "Registration failed");
        setErrorMessage(result.error || "Registration failed");
        setLoading(false);
        return;
      }

      toast.success("Registration successful! Redirecting to Dashboard...");
      window.location.href = "/dashboard";
      router.refresh();
    } catch (error) {
      console.error("Registration API errror:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Registeration failed";
      toast.error(errorMessage);
      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    handleSubmit,
    loading,
    errorMessage,
  };
}

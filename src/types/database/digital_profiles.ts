import { User } from "./users";

/**
 * @file DigitalProfile.ts
 * @description Tipe data untuk entitas DigitalProfile, sesuai dengan skema tabel `digital_profiles`.
 */
export type DigitalProfile = {
  id: number;
  created_at: string;
  technical_skills: string | null;
  work_experience: string | null;
  link_portofolio: string | null;
  url_cv: string | null;
  url_portofolio: string | null;
  id_user: User;
};

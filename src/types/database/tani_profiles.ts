import { User } from "./users";

/**
 * @file TaniProfile.ts
 * @description Tipe data untuk entitas TaniProfile, sesuai dengan skema tabel `tani_profiles`.
 */
export type TaniProfile = {
  id: number;
  created_at: string;
  farming_skills: string | null;
  type_plants: string | null;
  land_area: string | null;
  farming_location: string | null;
  id_user: User;
};

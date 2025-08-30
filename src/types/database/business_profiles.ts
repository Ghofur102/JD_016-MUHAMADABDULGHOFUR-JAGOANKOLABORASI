import { User } from "./users";

/**
 * @file BusinessProfile.ts
 * @description Tipe data untuk entitas BusinessProfile, sesuai dengan skema tabel `business_profiles`.
 */
export type BusinessProfile = {
  id: number;
  created_at: string;
  business_name: string | null;
  type_business: string | null;
  business_description: string | null;
  business_location: string | null;
  target_marker: string | null;
  id_user: User;
};

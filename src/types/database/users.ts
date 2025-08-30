/**
 * @file User.ts
 * @description Tipe data untuk entitas User, sesuai dengan skema tabel `users`.
 */
export type User = {
  id: string;
  created_at: string;
  full_name: string | null;
  number_phone: string | null;
  address: string | null;
  url_ktp: string | null;
  role: string | null;
  email: string | null;
  url_photo_product: string | null;
  password: string | null;
};

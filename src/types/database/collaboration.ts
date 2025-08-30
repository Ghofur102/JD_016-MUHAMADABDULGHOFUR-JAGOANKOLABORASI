import { User } from "./users";

/**
 * @file Collaboration.ts
 * @description Tipe data untuk entitas Collaboration, sesuai dengan skema tabel `collaboration`.
 */
export type Collaboration = {
  id: number;
  created_at: string;
  project_name: string | null;
  team_type: string | null;
  project_description: string | null;
  project_duration: string | null;
  project_location: string | null;
  project_budget: number | null;
  requirement_skill: string | null;
  timeline_project: string | null;
  member_benefit: string | null;
  id_user: User;
  status_check: string | null;
  status: string | null;
};

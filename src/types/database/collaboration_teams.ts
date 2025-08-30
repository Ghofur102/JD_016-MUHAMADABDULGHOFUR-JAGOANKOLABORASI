import { Collaboration } from "./collaboration";
import { User } from "./users";

/**
 * @file CollaborationTeam.ts
 * @description Tipe data untuk entitas CollaborationTeam, sesuai dengan skema tabel `collaboration_teams`.
 */
export type CollaborationTeam = {
  id: number;
  created_at: string;
  id_collaboration: Collaboration;
  id_user: User;
};

import { User } from "./users";

/**
 * @file Question.ts
 * @description Tipe data untuk entitas Question, sesuai dengan skema tabel `questions`.
 */
export type Question = {
  id: number;
  created_at: string;
  question: string | null;
  answer: string | null;
  id_user: User;
};

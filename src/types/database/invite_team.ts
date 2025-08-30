import { Collaboration } from "./collaboration";
import { User } from "./users";

export type InviteTeams = {
    id: number;
    created_at: string;
    id_member: User,
    id_collaboration: Collaboration,
    status: string
}
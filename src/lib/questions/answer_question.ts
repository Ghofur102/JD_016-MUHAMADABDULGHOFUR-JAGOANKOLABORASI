import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Variabel lingkungan Supabase belum diatur!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadQuestion({ question }: { question: string }) {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data: dataQuestion, error: errorDataQuestion } = await supabase.from("questions").insert({
                created_at: new Date().toISOString(),
                question: question,
                answer: null,
                id_user: user.id,
            });

            if (errorDataQuestion) {
                return(errorDataQuestion);
            }
            console.log("data question", dataQuestion);
            return(dataQuestion);
        } else {
            return("anda tidak diizinkan mengupload pertanyaan.");
        }
    } catch (error) {
        console.log("error", error);
        return(error);
    }
}

export async function uploadAnswer(answer: string, id_question: number) {
    try {
        const { data: { user } } = await supabase.auth.getUser();
        if(user) {
            const { data: dataAnswer, error: errorDataAnswer } = await supabase.from("question").update({
                answer: answer
            }).eq("id", id_question).single();

            if(errorDataAnswer) {
                console.log(errorDataAnswer);
            }
        }
        
    } catch (error) {
        console.log(error);
    }
}
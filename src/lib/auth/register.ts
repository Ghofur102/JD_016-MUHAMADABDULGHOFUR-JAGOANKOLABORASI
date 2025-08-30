/* eslint-disable react-hooks/rules-of-hooks */
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variabel lingkungan Supabase belum diatur!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function handleGoogleSignIn(role?: string) {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error('Error saat login dengan Google:', error.message);
    return;
  } else {
    createUserProfile(data, "pengguna");
    //window.location.href = "/dashboard";
  }

  console.log(data);

  return data;
}

export async function createUserProfile(user: any, role: string) {
  const { data: existingUser, error: fetchError } = await supabase
    .from('users')
    .select('id')
    .eq('id', user.id)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error('Error saat memeriksa user:', fetchError.message);
    return;
  }

  if (!existingUser) {
    const { error: userError } = await supabase.from('users').insert({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
      url_photo_product: user.user_metadata?.picture || null,
      created_at: new Date().toISOString(),
      role: role,
    });

    if (userError) {
      console.error('Error saat menyimpan user profile:', userError.message);
      return;
    }

    // Insert ke tabel profil yang spesifik berdasarkan peran.
    switch (role) {
      case "digital":
        await supabase.from("digital_profiles").insert({ id_user: user.id });
        break;
      case "tani":
        await supabase.from("tani_profiles").insert({ id_user: user.id });
        break;
      case "bisnis":
        await supabase.from("business_profiles").insert({ id_user: user.id });
        break;
      default:
        console.warn("Role tidak dikenali, tidak ada profil khusus yang dibuat.");
        break;
    }

    console.log('Profil pengguna berhasil dibuat!');
  } else {
    console.log('Profil pengguna sudah ada.');
  }
}

export async function handleSignOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error saat keluar:' + error);
  } else {
      window.location.href = "/";
  }
}

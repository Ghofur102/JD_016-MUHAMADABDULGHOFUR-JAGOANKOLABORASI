import { createClient } from "@supabase/supabase-js";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variabel lingkungan Supabase belum diatur!');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function handleGoogleSignIn(role: string = "pengguna") {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });

  if (error) {
    console.error('Error saat login dengan Google:', error.message);
    return;
  } else {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      createUserProfile(user, role);
    }
  }

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

    const profileData = { id_user: user.id };
    let profileTable = '';

    switch (role) {
      case "digital":
        profileTable = "digital_profiles";
        break;
      case "tani":
        profileTable = "tani_profiles";
        break;
      case "bisnis":
        profileTable = "business_profiles";
        break;
      default:
        console.warn("Role tidak dikenali, tidak ada profil khusus yang dibuat.");
        return;
    }

    if (profileTable) {
      const { error: profileError } = await supabase.from(profileTable).insert(profileData);
      if (profileError) {
        console.error(`Error saat membuat profil di ${profileTable}:`, profileError.message);
        return;
      }
    }

    console.log('Profil pengguna berhasil dibuat!');
  } else {
    console.log('Profil pengguna sudah ada.');
  }
}

export async function handleSignOut(router: AppRouterInstance) {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error saat keluar:', error.message);
  } else {
    router.push('/');
  }
}

export async function checkUserRole() {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data, error } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error saat mengambil peran pengguna:', error.message);
      return null;
    }

    return data ? data.role : null;
  }
  return null;
}

export async function checkAuth() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

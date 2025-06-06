import { User } from "@supabase/supabase-js";

export type AuthUser = User | null;

export interface AuthState {
  user: AuthUser;
  loading: boolean;
}

export interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: any | null;
  session: any | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, displayName: string, district: string) => Promise<{ error: any }>;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithFacebook: () => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  cleanupAuthState: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  const cleanupAuthState = () => {
    // No database cleanup needed
  };

  const signIn = async (email: string, password: string) => {
    toast({
      variant: "destructive",
      title: "Sign in disabled",
      description: "Database connection has been removed.",
    });
    return { error: new Error("Database disconnected") };
  };

  const signUp = async (email: string, password: string, displayName: string, district: string) => {
    toast({
      variant: "destructive",
      title: "Sign up disabled",
      description: "Database connection has been removed.",
    });
    return { error: new Error("Database disconnected") };
  };

  const signInWithGoogle = async () => {
    toast({
      variant: "destructive",
      title: "Google sign in disabled",
      description: "Database connection has been removed.",
    });
    return { error: new Error("Database disconnected") };
  };

  const signInWithFacebook = async () => {
    toast({
      variant: "destructive",
      title: "Facebook sign in disabled",
      description: "Database connection has been removed.",
    });
    return { error: new Error("Database disconnected") };
  };

  const signOut = async () => {
    toast({
      variant: "destructive",
      title: "Sign out disabled",
      description: "Database connection has been removed.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAdmin,
        signIn,
        signUp,
        signInWithGoogle,
        signInWithFacebook,
        signOut,
        cleanupAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
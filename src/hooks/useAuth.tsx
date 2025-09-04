import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  email: string;
  displayName: string;
  district: string;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
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
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored auth data on mount
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('userData');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setIsAdmin(userData.isAdmin || false);
    }
  }, []);

  const cleanupAuthState = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setToken(null);
    setIsAdmin(false);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token: authToken, user: userData } = data;
        
        // Store auth data
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        setToken(authToken);
        setUser(userData);
        setIsAdmin(userData.isAdmin || false);
        
        toast({
          title: "Sign in successful",
          description: "Welcome back!",
        });
        
        return { error: null };
      } else {
        const errorData = await response.json();
        return { error: new Error(errorData.message || 'Sign in failed') };
      }
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, displayName: string, district: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, displayName, district }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token: authToken, user: userData } = data;
        
        // Store auth data
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        setToken(authToken);
        setUser(userData);
        setIsAdmin(userData.isAdmin || false);
        
        toast({
          title: "Account created successfully",
          description: "Welcome to Naa Ooru Naa Sarvam!",
        });
        
        return { error: null };
      } else {
        const errorData = await response.json();
        return { error: new Error(errorData.message || 'Sign up failed') };
      }
    } catch (error) {
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    toast({
      variant: "destructive",
      title: "Google sign in",
      description: "Google OAuth not configured yet.",
    });
    return { error: new Error("Google OAuth not implemented") };
  };

  const signInWithFacebook = async () => {
    toast({
      variant: "destructive",
      title: "Facebook sign in",
      description: "Facebook OAuth not configured yet.",
    });
    return { error: new Error("Facebook OAuth not implemented") };
  };

  const signOut = async () => {
    cleanupAuthState();
    toast({
      title: "Signed out successfully",
      description: "See you next time!",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
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
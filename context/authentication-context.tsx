import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../stores/interfaces';
import { retrieveUserData, storeUserData } from '../stores/async-login';

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  storeUserData: (userData: User) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const savedUser = await retrieveUserData();
      if (savedUser) {
        setUser(savedUser);
      }
    };
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, storeUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
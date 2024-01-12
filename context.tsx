import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from './types';

type UserContextType = {
  userData: User | null;
  setUserData: (userData: User | null) => void;
};


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

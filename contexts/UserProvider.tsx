"use client";

import { Database } from "@/lib/database.types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  isLoading: true,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.log("Get user from database failed");
      } else {
        setUser(user);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

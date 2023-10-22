"use client";

import { useUser } from "@/contexts/UserProvider";
import { createContext, useContext, useEffect, useState } from "react";

type UserCredentials = {
  email: string;
  password: string;
};

interface UserCredentialsContextType {
  userCredentials: UserCredentials;
}

const UserCredentialsContext = createContext<UserCredentialsContextType>({
  userCredentials: {
    email: "",
    password: "",
  },
});

export const useUserCredentials = () => useContext(UserCredentialsContext);

type UserCredentialsProviderProps = {
  children: React.ReactNode;
};

export const UserCredentialsProvider = ({
  children,
}: UserCredentialsProviderProps) => {
  const { user, isLoading } = useUser();
  const [userCredentials, setUserCredentials] = useState<UserCredentials>({
    email: "",
    password: "",
  });

  // It is safe to use example.com for anonymous sign-in implementation. The domain example.com, as well as example.net, example.org, and others, are reserved by the Internet Engineering Task Force (IETF) in RFC 2606 for documentation purposes and are not associated with any real email service providers.
  useEffect(() => {
    if (isLoading) return;

    // If user is signed in, do not generate new credentials. Use what is saved in local storage.
    if (user) {
      const userCredentials = JSON.parse(
        localStorage.getItem("userCredentials") as string,
      );

      // Verify that the user email matches the email saved in local storage.
      if (user.email !== userCredentials.email)
        throw new Error("User email does not match local storage email");

      setUserCredentials({
        ...userCredentials,
      });
      return;
    }

    const { email, password } = handleGenerateUserCredentials();
    setUserCredentials({ email, password });
    localStorage.removeItem("userCredentials");
    localStorage.setItem(
      "userCredentials",
      JSON.stringify({ email, password }),
    );
  }, [user, isLoading]);

  const handleGenerateUserCredentials = () => {
    const randomEmail =
      Math.random().toString(36).substring(7) + "@example.com";
    const randomPassword =
      Math.random().toString(36).substring(7) +
      Math.random().toString(36).substring(7);
    return { email: randomEmail, password: randomPassword };
  };

  return (
    <UserCredentialsContext.Provider value={{ userCredentials }}>
      {children}
    </UserCredentialsContext.Provider>
  );
};

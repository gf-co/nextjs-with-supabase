"use client";

import { useNotification } from "@/contexts/NotificationProvider";
import { useUserCredentials } from "@/contexts/UserCredentialsProvider";
import { useUser } from "@/contexts/UserProvider";
import type { Database } from "@/lib/database.types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import AuthenticationSkeleton from "./AuthenticationSkeleton";

export default function Authentication() {
  const supabase = createClientComponentClient<Database>();
  const { user, setUser, isLoading } = useUser();
  const { userCredentials } = useUserCredentials();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { showNotification } = useNotification();

  const handleSignInAnonymously = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsSigningIn(true);

    try {
      const data = new FormData(event.currentTarget);
      const email = data.get("email") as string;
      const password = data.get("password") as string;

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setUser(user);

      showNotification("Sign in success");
    } catch {
      showNotification("Sign in error");
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await supabase.auth.signOut();
      setUser(null);
      showNotification("Sign out success");
    } catch {
      showNotification("Sign out error");
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isLoading) return <AuthenticationSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <small className="text-sm opacity-50">
        Sign in using the example account
      </small>
      <form onSubmit={handleSignInAnonymously} className="flex flex-col gap-4">
        <Input
          type="email"
          name="email"
          label="Email"
          value={userCredentials.email}
          // disabled={!!user || isSigningIn || isSigningOut}
          // readOnly={!!user || isSigningIn || isSigningOut}
          // isReadOnly={!!user || isSigningIn || isSigningOut}
          // isDisabled={!!user || isSigningIn || isSigningOut}
          disabled={true}
          readOnly={true}
          isReadOnly={true}
          isDisabled={true}
          required={true}
          isRequired={true}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value={userCredentials.password}
          // disabled={!!user || isSigningIn || isSigningOut}
          // readOnly={!!user || isSigningIn || isSigningOut}
          // isReadOnly={!!user || isSigningIn || isSigningOut}
          // isDisabled={!!user || isSigningIn || isSigningOut}
          disabled={true}
          readOnly={true}
          isReadOnly={true}
          isDisabled={true}
          required={true}
          isRequired={true}
        />
        <Button
          isLoading={isSigningIn}
          disabled={!!user || isSigningIn || isSigningOut}
          isDisabled={!!user || isSigningIn || isSigningOut}
          type="submit"
        >
          Sign in
        </Button>
      </form>
      <Divider />
      <div className="flex flex-nowrap items-center gap-4">
        <Avatar
          isBordered
          color={!!user ? "secondary" : "default"}
          name={!!user ? user.email : "None"}
        />
        {!!user && (
          <small className="text-sm opacity-50">
            You are signed as {user.email}
          </small>
        )}
        {!user && (
          <small className="text-sm opacity-50">You are not signed in</small>
        )}
        <Button
          isLoading={isSigningOut}
          disabled={!user || isSigningIn || isSigningOut}
          isDisabled={!user || isSigningIn || isSigningOut}
          className="ml-auto"
          onClick={handleSignOut}
        >
          Log out
        </Button>
      </div>
    </div>
  );
}

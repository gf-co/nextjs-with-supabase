"use client";

import type { Database } from "@/lib/database.types";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Authentication() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<User | null>(null);

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);

      const {
        data: { user },
      } = await supabase.auth.signInWithPassword({
        email: data.get("email") as string,
        password: data.get("password") as string,
      });

      setUser(user);

      router.refresh();
    } catch {
      alert("Sign in error");
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      router.refresh();
    } catch {
      alert("Sign in error");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <small className="text-sm opacity-50">
        Sign in using the example account
      </small>
      <form onSubmit={handleSignIn} className="flex flex-col gap-4">
        <Input
          type="email"
          name="email"
          label="Email"
          value="example@email.com"
          disabled={!!user}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          value="example@email.com"
          disabled={!!user}
        />

        <Button disabled={!!user} type="submit">
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
        <Button disabled={!user} className="ml-auto" onClick={handleSignOut}>
          Log out
        </Button>
      </div>
    </div>
  );
}

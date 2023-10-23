// @note - Not being used at the moment because UserProvider is available.

import { Database } from "@/lib/database.types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const supabase = createClientComponentClient<Database>();

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Get user from database failed");
      } else {
        setUser(user);
      }
    };
    fetchUser();
  }, []);

  return user;
};

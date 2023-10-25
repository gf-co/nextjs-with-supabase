// @ts-nocheck
"use client";

import { useNotification } from "@/contexts/NotificationProvider";
import { useUser } from "@/contexts/UserProvider";
import { Database } from "@/lib/database.types";
import { Input } from "@nextui-org/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import RealtimeSkeleton from "./RealtimeSkeleton";

type Item = Database["public"]["Tables"]["tasks"]["Row"];

export default function Realtime() {
  const [isFetching, setIsFetching] = useState(true);
  const supabase = createClientComponentClient<Database>();
  const { user, isLoading } = useUser();
  const [items, setItems] = useState<Item[]>([]);
  const { showNotification } = useNotification();

  useEffect(() => {
    const getData = async () => {
      if (isLoading) {
        return;
      }

      if (!user) {
        setItems([]);
        setIsFetching(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("items")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;

        return setItems(data);
      } catch {
        showNotification("Get items from database failed");
      } finally {
        setIsFetching(false);
      }
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);

  // Realtime listener for database changes. Automatically updates the items state.
  useEffect(() => {
    // References: https://supabase.com/docs/guides/realtime/postgres-changes#table-changes
    const channel = supabase
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "items" },
        (payload: {
          eventType: string;
          new: {
            created_at: string;
            id: string;
            name: string;
            user_id: string | null;
          };
          old: {
            created_at: string;
            id: string;
            name: string;
            user_id: string | null;
          };
        }) =>
          setItems((prevItems) => {
            if (payload.eventType === "INSERT") {
              const newPayload =
                payload.new as Database["public"]["Tables"]["tasks"]["Row"];
              return [...prevItems, newPayload];
            } else if (payload.eventType === "UPDATE") {
              const updatedPayload =
                payload.new as Database["public"]["Tables"]["tasks"]["Row"];
              return prevItems.map((item) =>
                item.id === updatedPayload.id ? updatedPayload : item,
              );
            } else if (payload.eventType === "DELETE") {
              const deletedPayload =
                payload.old as Database["public"]["Tables"]["tasks"]["Row"];
              return prevItems.filter((item) => item.id !== deletedPayload.id);
            }
            return prevItems;
          }),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) return <RealtimeSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <small className="text-sm opacity-50">
        Uses Supabase Realtime to listen for database updates from above.
      </small>
      {!items.length && (
        <p className="text-sm opacity-50">No items in the database yet</p>
      )}
      {items.map((item) => (
        <form key={item.id} className="flex flex-nowrap gap-1">
          <input type="hidden" name="itemId" value={item.id} />
          <Input
            name="itemName"
            type="text"
            size="md"
            value={item.name}
            readOnly={true}
            isReadOnly={true}
            disabled={true}
            isDisabled={true}
          />
        </form>
      ))}
    </div>
  );
}

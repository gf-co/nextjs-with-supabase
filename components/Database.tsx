"use client";

import { useNotification } from "@/contexts/NotificationProvider";
import { useUser } from "@/contexts/UserProvider";
import { Database } from "@/lib/database.types";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useRef, useState } from "react";
import DatabaseSkeleton from "./DatabaseSkeleton";

type Item = Database["public"]["Tables"]["tasks"]["Row"];

export default function Database() {
  const [isFetching, setIsFetching] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState("");
  const [isDeleting, setIsDeleting] = useState("");
  const supabase = createClientComponentClient<Database>();
  const { user, isLoading } = useUser();
  const [items, setItems] = useState<Item[]>([]);
  const { showNotification } = useNotification();
  const addItemFormRef = useRef<HTMLFormElement>(null);

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

  const handleAddItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      showNotification("User not signed in");
      return;
    }

    setIsCreating(true);

    const formData = new FormData(event.currentTarget);
    const itemName = formData.get("itemName") as string;

    try {
      const { data, error } = await supabase
        .from("items")
        .insert({ name: itemName, user_id: user.id })
        .select()
        .single();

      if (error) throw error;

      setItems((prevItems) => [...prevItems, data]);

      showNotification("Item added");

      // Reset the form
      if (addItemFormRef.current) {
        addItemFormRef.current.reset();
      }
    } catch (error) {
      showNotification("Add item to database failed");
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateItem = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      showNotification("User not signed in");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const itemId = formData.get("itemId") as string;
    const itemName = formData.get("itemName") as string;

    setIsUpdating(itemId);

    try {
      const { error } = await supabase
        .from("items")
        .update({ name: itemName })
        .eq("id", itemId);

      if (error) throw error;

      setItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === itemId) {
            return {
              ...item,
              name: itemName,
            };
          }

          return item;
        }),
      );
      showNotification("Item updated");
    } catch (error) {
      showNotification("Update item in database failed");
    } finally {
      setIsUpdating("");
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!user) {
      showNotification("User not signed in");
      return;
    }

    setIsDeleting(itemId);

    try {
      const { error } = await supabase.from("items").delete().eq("id", itemId);

      if (error) throw error;

      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      showNotification("Item deleted");
    } catch (error) {
      showNotification("Delete item from database failed");
    } finally {
      setIsDeleting("");
    }
  };

  if (isFetching) return <DatabaseSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <small className="text-sm opacity-50">
        Uses Supabase&apos;s JS Client Library to interact with our Postgres
        database
      </small>
      {!items.length && (
        <p className="text-sm opacity-50">No items in the database yet</p>
      )}
      {items.map((item) => (
        <form
          key={item.id}
          onSubmit={handleUpdateItem}
          className="flex flex-nowrap gap-1"
        >
          <input type="hidden" name="itemId" value={item.id} />
          <Input
            name="itemName"
            type="text"
            size="md"
            defaultValue={item.name}
            required={true}
            isRequired={true}
          />
          <Button isLoading={isUpdating === item.id} type="submit">
            Update
          </Button>
          <Button
            isLoading={isDeleting === item.id}
            type="button"
            onClick={() => handleDeleteItem(item.id)}
          >
            Delete
          </Button>
        </form>
      ))}
      <Divider />
      <form
        ref={addItemFormRef}
        onSubmit={handleAddItem}
        className="flex flex-nowrap items-center gap-4"
      >
        <Input
          name="itemName"
          type="text"
          placeholder="Add something"
          size="md"
          required={true}
          isRequired={true}
          readOnly={isCreating}
          isReadOnly={isCreating}
          disabled={isCreating}
          isDisabled={isCreating}
        />
        <Button
          isLoading={isCreating}
          disabled={isCreating}
          isDisabled={isCreating}
          type="submit"
          className="ml-auto"
        >
          Create
        </Button>
      </form>
    </div>
  );
}

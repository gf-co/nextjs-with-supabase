"use client";

import { Database } from "@/lib/database.types";
import { Button } from "@nextui-org/button";
import { Code } from "@nextui-org/code";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

// type Item = {
//   name: string;
//   id: string;
// };
type Item = Database["public"]["Tables"]["items"]["Row"];

export default function Database() {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  
  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      name: "Something 1",
    },
    {
      id: "2",
      name: "Something 2",
    },
  ]);

  const handleAddItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const itemName = data.get("itemName") as string;
    const newItem = {
      id: (items.length + 1).toString(),
      name: itemName,
    };
    setItems([...items, newItem]);
  };

  const handleUpdateItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const itemName = data.get("itemName") as string;
    const newItem = {
      id: (items.length + 1).toString(),
      name: itemName,
    };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  return (
    <div className="flex flex-col gap-4">
      <small className="text-sm opacity-50">
        Uses Next.js's <Code size="sm">router.refresh()</Code> to update the
        list in real time
      </small>

      {items.map((item) => (
        <form onSubmit={handleUpdateItem} className="flex flex-nowrap gap-1">
          <Input name="itemName" type="text" size="md" value={item.name} />
          <Button type="submit">Update</Button>
          <Button type="button" onClick={() => handleDeleteItem(item.id)}>
            Delete
          </Button>
        </form>
      ))}
      <Divider />
      <form
        onSubmit={handleAddItem}
        className="flex flex-nowrap items-center gap-4"
      >
        <Input
          name="itemName"
          type="text"
          placeholder="Add something"
          size="md"
        />
        <Button type="submit" className="ml-auto">
          Create
        </Button>
      </form>
    </div>
  );
}

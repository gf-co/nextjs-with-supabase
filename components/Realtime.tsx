"use client";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { useState } from "react";

type Item = {
  name: string;
  id: string;
};

export default function Realtime() {
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
        Uses Supabase Realtime to update the list in real time
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
        className="flex flex-nowrap gap-4 items-center"
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

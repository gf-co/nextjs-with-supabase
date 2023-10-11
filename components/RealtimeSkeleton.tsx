"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Skeleton } from "@nextui-org/skeleton";

export default function RealtimeSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <small className="text-sm opacity-50">
        Uses Supabase Realtime to listen for database updates from above.
      </small>
      <form className="flex flex-nowrap gap-1">
        <input type="hidden" name="itemId" />
        <Skeleton isLoaded={false} className="flex-1 rounded-xl">
          <Input
            name="itemName"
            type="text"
            size="md"
            defaultValue="None"
            value="None"
            required={true}
            isRequired={true}
            className="invisible"
          />
        </Skeleton>
        <Skeleton isLoaded={false} className="rounded-xl">
          <Button type="submit" className="invisible">
            Update
          </Button>
        </Skeleton>
        <Skeleton isLoaded={false} className="rounded-xl">
          <Button type="button" className="invisible">
            Delete
          </Button>
        </Skeleton>
      </form>
    </div>
  );
}

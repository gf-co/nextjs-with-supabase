"use client";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Skeleton } from "@nextui-org/skeleton";

export default function DatabaseSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <small className="text-sm opacity-50">
        Uses Supabase's JS Client Library to interact with our Postgres database
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
      <Divider />
      <form className="flex flex-nowrap items-center gap-4">
        <Skeleton isLoaded={false} className="flex-1 rounded-xl">
          <Input
            name="itemName"
            type="text"
            placeholder="Add something"
            size="md"
            required={true}
            isRequired={true}
            className="invisible"
          />
        </Skeleton>
        <Skeleton isLoaded={false} className="ml-auto rounded-xl">
          <Button type="submit" className="invisible">
            Create
          </Button>
        </Skeleton>
      </form>
    </div>
  );
}

"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Skeleton } from "@nextui-org/skeleton";

export default function AuthenticationSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <small className="text-sm opacity-50">
        Sign in using the example account
      </small>
      <form className="flex flex-col gap-4">
        <Skeleton isLoaded={false} className="rounded-xl">
          <Input
            type="email"
            name="email"
            label="Email"
            value="example@email.com"
            required={true}
            isRequired={true}
            className="invisible"
          />
        </Skeleton>
        <Skeleton isLoaded={false} className="rounded-xl">
          <Input
            type="password"
            name="password"
            label="Password"
            value="example@email.com"
            required={true}
            isRequired={true}
            className="invisible"
          />
        </Skeleton>
        <Skeleton isLoaded={false} className="rounded-xl">
          <Button type="submit" className="invisible">
            Sign in
          </Button>
        </Skeleton>
      </form>
      <Divider />
      <div className="flex flex-nowrap items-center gap-4">
        <Skeleton isLoaded={false} className="rounded-full">
          <Avatar isBordered className="invisible" name="None" />
        </Skeleton>
        <Skeleton isLoaded={false} className="rounded-lg">
          <small className="invisible text-sm opacity-50">
            You are not signed in
          </small>
        </Skeleton>
        <Skeleton isLoaded={false} className="ml-auto rounded-xl">
          <Button className="invisible">Log out</Button>
        </Skeleton>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Skeleton } from "@nextui-org/skeleton";

export type ImageProps = {
  bucket: string;
  filepath: string;
  filename: string;
  src: string;
};

export default function StorageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <small className="text-sm opacity-50">
        Supabase provides storage capabilities as well. Try uploading an image.
      </small>
      <div className="grid grid-cols-2 justify-center gap-3">
        <Skeleton isLoaded={false} className="rounded-xl">
          <Card radius="lg" className="invisible  aspect-square" />
        </Skeleton>
        <Skeleton isLoaded={false} className="rounded-xl">
          <Card radius="lg" className="invisible aspect-square" />
        </Skeleton>
      </div>
      <Divider />
      <form className="flex flex-nowrap items-center gap-4">
        <Skeleton isLoaded={false} className=" flex-1 rounded-xl">
          <Input
            name="imageFile"
            type="file"
            accept="image/*"
            placeholder="Upload image"
            size="md"
            required={true}
            isRequired={true}
            className="invisible"
          />
        </Skeleton>
        <Skeleton isLoaded={false} className="ml-auto rounded-xl">
          <Button type="submit" className="invisible">
            Upload
          </Button>
        </Skeleton>
      </form>
    </div>
  );
}

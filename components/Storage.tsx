"use client";

import { useNotification } from "@/contexts/NotificationProvider";
import { useUser } from "@/contexts/UserProvider";
import { Database } from "@/lib/database.types";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useRef, useState } from "react";
import ImageCard from "./ImageCard";
import StorageSkeleton from "./StorageSkeleton";

export type ImageProps = {
  bucket: string;
  filepath: string;
  filename: string;
  src: string;
};

export default function Storage() {
  const [isFetching, setIsFetching] = useState(true);
  const [images, setImages] = useState<ImageProps[]>([]);
  const { showNotification } = useNotification();
  const { user, isLoading } = useUser();
  const supabase = createClientComponentClient<Database>();
  const [isUploading, setIsUploading] = useState(false);
  const uploadImageFormRef = useRef<HTMLFormElement>(null);

  const handleAddImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoading) {
      return;
    }

    if (!user) {
      setIsUploading(false);
      return;
    }

    const formData = new FormData(event.currentTarget);
    const imageFile = formData.get("imageFile") as File;

    const prefix = new Date().getTime();
    const filename = imageFile.name;
    const filenameWithPrefix = `${prefix}_${filename}`;
    const filepath = `images/${filenameWithPrefix}`;
    const bucketId = user.id;
    const src = URL.createObjectURL(imageFile);

    try {
      const { error } = await supabase.storage
        .from(bucketId)
        .upload(filepath, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // @note - we don't need this table for now as we did not add a dedicated table to store an image's details
      // const { data, error: insertError } = await supabase
      //   .from("images")
      //   .insert([
      //     {
      //       filepath,
      //       filename,
      //       bucket_id,
      //     },
      //   ])
      //   .select()
      //   .single();

      // if (insertError) throw insertError;

      setImages((prevImages) => [
        ...prevImages,
        {
          bucket: bucketId,
          filepath,
          filename: filenameWithPrefix,
          src,
        },
      ]);

      showNotification("Upload image success");

      // Reset the form
      if (uploadImageFormRef.current) {
        uploadImageFormRef.current.reset();
      }
    } catch (error) {
      showNotification("Upload image failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteImage = async (filename: string) => {
    if (!user) {
      showNotification("User not signed in");
      return;
    }

    try {
      const { error } = await supabase.storage
        .from(user.id)
        .remove([`images/${filename}`]);

      if (error) throw error;

      const newImages = images.filter((image) => image.filename !== filename);
      setImages(newImages);
      showNotification("Delete image success");
    } catch {
      showNotification("Delete image failed");
    }
  };

  useEffect(() => {
    const getImages = async () => {
      if (!isLoading) {
        return;
      }

      if (!user) {
        setIsFetching(false);
        return;
      }

      try {
        const { data, error } = await supabase.storage
          .from(user.id)
          .list("images", {
            limit: 100,
            offset: 0,
            sortBy: { column: "created_at", order: "asc" },
          });

        if (error) throw error;

        if (!data.length) {
          setImages([]);
          return;
        }

        const { data: signedUrls, error: signedUrlsError } =
          await supabase.storage.from(user.id).createSignedUrls(
            data.map((fileObject) => `images/${fileObject.name}`),
            60,
          );

        if (signedUrlsError) throw signedUrlsError;

        // @note - approach below assumes createSignedUrls returns the same order as the list
        const images = data.map((fileObject, index) => ({
          bucket: user.id,
          filepath: `images/${fileObject.name}`,
          filename: fileObject.name,
          src: signedUrls[index].signedUrl,
        }));

        setImages(images);
      } catch (error) {
        console.error(error);
        showNotification("Get images failed");
      } finally {
        setIsFetching(false);
      }
    };

    getImages();
  }, [user, isLoading, showNotification, supabase.storage]);

  if (isFetching) return <StorageSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <small className="text-sm opacity-50">
        Supabase provides storage capabilities as well. Try uploading an image.
      </small>
      {!images.length && (
        <p className="text-sm opacity-50">No images uploaded in storage yet</p>
      )}
      <div className="grid grid-cols-2 justify-center gap-3">
        {images.map((image) => (
          <ImageCard
            key={image.filename}
            image={image}
            onDelete={() => handleDeleteImage(image.filename)}
          />
        ))}
      </div>
      <Divider />
      <form
        ref={uploadImageFormRef}
        onSubmit={handleAddImage}
        className="flex flex-nowrap items-center gap-4"
      >
        <Input
          name="imageFile"
          type="file"
          accept="image/*"
          placeholder="Upload image"
          size="md"
          required={true}
          isRequired={true}
          readOnly={isUploading}
          isReadOnly={isUploading}
          disabled={isUploading}
          isDisabled={isUploading}
        />
        <Button
          isLoading={isUploading}
          disabled={isUploading}
          isDisabled={isUploading}
          type="submit"
          className="ml-auto"
        >
          Upload
        </Button>
      </form>
    </div>
  );
}

"use client";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import ImageCard from "./ImageCard";

export type ImageProps = {
  bucket: string;
  filepath: string;
  filename: string;
  id: string;
  src: string;
};

export default function Storage() {
  const [images, setImages] = useState<ImageProps[]>([
    {
      id: "1",
      filepath: "/images/image.jpg",
      filename: "image.jpg",
      bucket: "images",
      src: "/images/image.jpg",
    },
    {
      id: "2",
      filepath: "/images/image.jpg",
      filename: "image-image-imageimageimage.jpg",
      bucket: "images",
      src: "/images/image.jpg",
    },
    {
      id: "3",
      filepath: "/images/image.jpg",
      filename: "image.jpg",
      bucket: "images",
      src: "/images/image.jpg",
    },
  ]);

  const handleAddImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const imageFile = formData.get("imageFile") as File;

    const filename = imageFile.name;
    const filepath = `/images/${filename}`;
    const bucket = "images";
    const id = Math.random().toString(36).substring(2);
    const src = URL.createObjectURL(imageFile);

    try {
      // Add the image to the images array
      setImages((images) => [
        ...images,
        {
          id,
          filename,
          filepath,
          bucket,
          src,
        },
      ]);
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  };

  const handleDeleteImage = (id: string) => {
    const newImages = images.filter((image) => image.id !== id);
    setImages(newImages);
  };

  return (
    <div className="flex flex-col gap-4">
      <small className="text-sm opacity-50">Upload images</small>
      <div className="grid grid-cols-2 justify-center gap-3">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onDelete={() => handleDeleteImage(image.id)}
          />
        ))}
      </div>
      <Divider />
      <form
        onSubmit={handleAddImage}
        className="flex flex-nowrap gap-4 items-center"
      >
        <Input
          name="imageFile"
          type="file"
          accept="image/*"
          placeholder="Upload image"
          size="md"
        />
        <Button type="submit" className="ml-auto">
          Upload
        </Button>
      </form>
    </div>
  );
}

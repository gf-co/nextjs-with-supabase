import { Button } from "@nextui-org/button";
import { Card, CardFooter } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { ImageProps } from "./Storage";

type ImageCardProps = {
  image: ImageProps;
  onDelete: () => void;
};

export default function ImageCard({ image, onDelete }: ImageCardProps) {
  return (
    <Card isFooterBlurred radius="lg" className="border-none max-w-[200px]">
      <Image
        alt={image.filename}
        className="object-cover"
        src={image.src}
        height={200}
        width={200}
      />
      <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <p className="line-clamp-1 text-tiny text-white/80">{image.filename}</p>
        <Button
          className="text-tiny text-white bg-black/20"
          variant="flat"
          color="default"
          radius="lg"
          size="sm"
          onClick={onDelete}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}

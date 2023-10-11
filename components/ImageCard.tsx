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
    <Card isFooterBlurred radius="lg" className="max-w-[200px] border-none">
      <Image
        alt={image.filename}
        className="object-cover"
        src={image.src}
        height={200}
        width={200}
      />
      <CardFooter className="absolute bottom-1 z-10 ml-1 w-[calc(100%_-_8px)] justify-between overflow-hidden rounded-large border-1 border-white/20 py-1 shadow-small before:rounded-xl before:bg-white/10">
        <p className="line-clamp-1 text-tiny text-white/80">
          {image.filename.split("_")[1]}
        </p>
        <Button
          className="bg-black/20 text-tiny text-white"
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

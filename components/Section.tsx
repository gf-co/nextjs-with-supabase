import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import React from "react";

type SectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function Section({
  title,
  description,
  children,
}: SectionProps) {
  return (
    <Card className="max-w-full">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">{description}</p>
        </div>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
}

import { Card, CardBody, CardHeader } from "@nextui-org/card";
import React from "react";

type SectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  icon: JSX.Element;
};

export default function Section({
  title,
  description,
  children,
  icon,
}: SectionProps) {
  return (
    <Card className="max-w-full">
      <CardHeader className="flex gap-3">
        {/* <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        /> */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-black">
          {icon}
        </div>
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">{description}</p>
        </div>
      </CardHeader>
      <CardBody>{children}</CardBody>
    </Card>
  );
}

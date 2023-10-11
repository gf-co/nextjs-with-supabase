import { Card, CardBody } from "@nextui-org/react";

interface NotificationProps {
  message: string;
}

export default function Notification({ message }: NotificationProps) {
  return (
    <Card className="fixed bottom-4 right-4 z-50 h-fit w-fit">
      <CardBody>
        <p>{message}</p>
      </CardBody>
    </Card>
  );
}

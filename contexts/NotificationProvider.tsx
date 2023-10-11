"use client";

import Notification from "@/components/Notification";
import { createContext, useContext, useState } from "react";

interface NotificationContextType {
  showNotification: (message: string) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  showNotification: () => {},
});

export const useNotification = () => useContext(NotificationContext);

type NotificationProviderProps = {
  children: React.ReactNode;
};

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && <Notification message={notification} />}
    </NotificationContext.Provider>
  );
};

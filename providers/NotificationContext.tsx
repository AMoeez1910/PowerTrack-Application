"use client";
import { NotificationType } from "@/lib/data";
import React, { createContext, ReactNode, useState } from "react";

interface NotificationContextType {
  notification: NotificationType | null;
  setNotification: (notification: NotificationType | null) => void;
}

export const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  setNotification: () => {},
});

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

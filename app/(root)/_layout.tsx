import React from "react";
import { Stack } from "expo-router";
import { NotificationProvider } from "@/providers/NotificationContext";

const Layout = () => {
  return (
    <NotificationProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </Stack>
    </NotificationProvider>
  );
};

export default Layout;

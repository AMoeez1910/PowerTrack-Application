import React from "react";
import { Stack } from "expo-router";
import ProfileHeader from "@/components/ProfileHeader";

const Layout = () => {
  return (
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen name="profile" options={{ headerShown: false }} />
      </Stack>
  );
};

export default Layout;

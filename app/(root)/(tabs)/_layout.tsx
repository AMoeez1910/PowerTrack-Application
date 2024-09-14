import { View, Text, ImageSourcePropType, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants";
import ProfileHeader from "@/components/ProfileHeader";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View
    className={`flex flex-row justify-center items-center rounded-full ${focused ? " bg-secondary-1000" : ""}`}
  >
    <View
      className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-secondary-700" : ""}`}
    >
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        className="w-7 h-7"
      />
    </View>
  </View>
);

const Layout = () => {
  return (
    <>
      <ProfileHeader />
      <Tabs
        initialRouteName="index"
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "white",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#282828",
            borderRadius: 50,
            paddingBottom: 0,
            overflow: "hidden",
            marginHorizontal: 20,
            marginBottom: 20,
            height: 78,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            position: "absolute",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon source={icons.home} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="information"
          options={{
            title: "Details",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon source={icons.list} focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon source={icons.settings} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default Layout;

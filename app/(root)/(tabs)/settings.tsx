import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  StatusBar,
  StyleSheet,
} from "react-native";
import React, { useState, useContext } from "react";
import { NotificationContext } from "@/providers/NotificationContext";

const Settings = () => {
  const { setNotification } = useContext(NotificationContext);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [batteryOptimization, setBatteryOptimization] = useState(true);

  const toggleSetting = (
    setting: {
      (value: React.SetStateAction<boolean>): void;
      (value: React.SetStateAction<boolean>): void;
      (value: React.SetStateAction<boolean>): void;
      (value: React.SetStateAction<boolean>): void;
      (value: React.SetStateAction<boolean>): void;
      (value: React.SetStateAction<boolean>): void;
      (value: React.SetStateAction<boolean>): void;
      (value: React.SetStateAction<boolean>): void;
      (arg0: any): void;
    },
    value: any,
    name: string
  ) => {
    setting(value);
    setNotification({
      title: "Settings Updated",
      type: "update",
    });
  };

  const renderSetting = (
    title:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | null
      | undefined,
    description:
      | string
      | number
      | boolean
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | Iterable<React.ReactNode>
      | null
      | undefined,
    value: boolean | undefined,
    onToggle: {
      (value: any): void;
      (value: any): void;
      (value: any): void;
      (value: any): void;
      (value: any): void;
      (value: any): void;
      (value: any): void;
      (value: any): void;
      (arg0: boolean): void | Promise<void>;
    }
  ) => {
    return (
      <View className="flex-row justify-between items-center py-4 border-b border-gray-200">
        <View className="flex-1 pr-4">
          <Text className="text-lg font-JakartaSemiBold">{title}</Text>
          <Text className="text-sm text-gray-600 font-JakartaRegular mt-1">
            {description}
          </Text>
        </View>
        <Switch
          value={value}
          onValueChange={(newValue) => onToggle(newValue)}
          trackColor={{ false: "#D1D5DB", true: "#3B82F6" }}
          thumbColor={value ? "#FFFFFF" : "#F3F4F6"}
        />
      </View>
    );
  };

  return (
    <View className="flex-1 bg-primary-100">
      <StatusBar backgroundColor="transparent" translucent />
      <ScrollView className="h-[100vh]">
        <View className="flex flex-1 mt-5 px-5 pb-[100px] h-full">
          <Text className="text-3xl font-JakartaSemiBold mb-5">Settings</Text>

          <View className="bg-white rounded-xl p-4 mb-5 shadow-sm">
            <Text className="text-xl font-JakartaBold mb-2">Notifications</Text>
            {renderSetting(
              "Push Notifications",
              "Receive alerts about your vehicle status and updates",
              pushNotifications,
              (value: any) =>
                toggleSetting(setPushNotifications, value, "Push Notifications")
            )}

            {renderSetting(
              "Battery Alerts",
              "Get notified when battery level is low or fully charged",
              batteryOptimization,
              (value: any) =>
                toggleSetting(setBatteryOptimization, value, "Battery Alerts")
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;

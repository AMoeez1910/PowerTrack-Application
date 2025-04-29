import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { NotificationContext } from "@/providers/NotificationContext";
import { Feather } from "@expo/vector-icons";
import { NotificationType } from "@/lib/data";
import { useRouter } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationItem = ({
  notification,
}: {
  notification: NotificationType;
}) => {
  const renderIcon = () => {
    switch (notification.type) {
      case "warning":
        return (
          <View className="w-8 h-8 bg-yellow-400 rounded-full items-center justify-center">
            <Text className="text-black font-bold">!</Text>
          </View>
        );
      case "info":
        return (
          <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center opacity-0">
            <Text className="text-white font-bold">i</Text>
          </View>
        );
      case "update":
        return (
          <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center opacity-0">
            <Feather name="download" size={16} color="white" />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View className="bg-white rounded-xl p-4 mb-4 shadow-sm flex-row items-center">
      {notification.type === "warning" && renderIcon()}
      <Text className="text-black text-base font-JakartaMedium ml-2">
        {notification.title}
      </Text>
    </View>
  );
};

const Notifications = () => {
  const router = useRouter();
  const { notification, setNotification } = useContext(NotificationContext);
  return (
    <SafeAreaView className="flex-1 bg-primary-100">
      <ScrollView className="flex-1 bg-primary-100">
        <View className="px-5 pb-[100px]">
          <View className="flex-row items-center mb-5 gap-2">
            <TouchableOpacity
              onPress={() => {
                setNotification(null);
                router.canGoBack()
                  ? router.back()
                  : router.replace("/(root)/(tabs)/home");
              }}
            >
              <ChevronLeft color="black" size={28} />
            </TouchableOpacity>
            <Text className="text-3xl font-JakartaSemiBold">Notifications</Text>
          </View>
          {notification ? (
            <View className="mt-2">
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            </View>
          ) : (
            <View className="flex items-center justify-center mt-10">
              <Text className="text-gray-500 text-lg font-JakartaMedium">
                No notifications yet
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notifications;

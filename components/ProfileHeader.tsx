import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { NotificationContext } from "@/providers/NotificationContext";

const ProfileHeader = () => {
  const { user } = useUser();
  const { notification } = useContext(NotificationContext);

  return (
    <SafeAreaView className="bg-secondary-1000 h-20 py-2">
      <View className="flex flex-row justify-between w-full px-5 relative ">
        <TouchableOpacity
          onPress={() => {
            router.replace("/(root)/notifications");
          }}
        >
          <Image
            source={icons.email}
            className="w-7 h-7"
            resizeMode="contain"
          />
          {notification && (
            <View className="bg-danger-500 w-3 h-3 rounded-full absolute top-0 right-0" />
          )}
        </TouchableOpacity>
        <Image
          source={images.logoSmall}
          className="w-8 h-8"
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={() => {
            router.replace("/(root)/profile");
          }}
        >
          <Image
            source={user?.imageUrl ? { uri: user?.imageUrl } : icons.profile}
            className="w-7 h-7 rounded-full"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileHeader;

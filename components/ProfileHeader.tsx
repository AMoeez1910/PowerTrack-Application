import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import { router } from "expo-router";

const ProfileHeader = () => {
  return (
    <SafeAreaView className="bg-secondary-1000 h-20 py-2">
      <View className="flex flex-row justify-between w-full px-5 ">
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
            source={icons.profile}
            className="w-7 h-7"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileHeader;

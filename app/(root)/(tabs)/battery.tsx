import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React from "react";

const Battery = () => {
  return (
    <ScrollView className="flex-1 bg-primary-100 h-[100vh] ">
      <View className="flex flex-1 mt-5 px-5 pb-[100px] h-full">
        <Text className="text-3xl font-JakartaSemiBold mb-5 ">
          Battery Analysis
        </Text>
        <View className=" pb-3">
          <Text className="text-lg font-JakartaSemiBold mb-2">
            Battery Analysis can only happen if car is powered off.
          </Text>
        </View>
        <View className="flex h-full justify-center items-center gap-2">
          <ActivityIndicator size="large" color="#000" />
          <Text className="text-md font-JakartaSemiBold ">
            We are testing your batteries, please wait.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Battery;

import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import * as Progress from "react-native-progress";

const Battery = () => {
  const [getEis, setGetEis] = useState(false);
  const [getEisProgress, setGetEisProgress] = useState(0);
  const [refresh, setRefresh] = useState(false);
  if (getEis) {
    setTimeout(() => {
      setGetEisProgress((prev) => prev + 0.1);
    }, 1000);
  }
  if (!refresh) {
    setTimeout(() => {
      setRefresh(true);
    }, 5000);
  }
  useEffect(() => {
    if (getEisProgress >= 1) {
      setGetEis(false);
      setGetEisProgress(0);
    }
  }, [getEisProgress]);
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
        <View className="w-full mt-6 pr-2">
          {!getEis ? (
            <TouchableOpacity
              onPress={() => {
                setGetEis(true);
              }}
              className={` bg-secondary-700 rounded-xl p-4 `}
            >
              <Text className="text-center font-JakartaBold text-white text-md">
                Get Eis Progress
              </Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Progress.Bar
                progress={getEisProgress}
                width={1000}
                className="max-w-full"
                color="#666666"
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Battery;

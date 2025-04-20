import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import * as Progress from "react-native-progress";
import { NotificationContext } from "@/providers/NotificationContext";
import { notificationData } from "@/lib/data";

const Battery = () => {
  const [getEis, setGetEis] = useState(false);
  const { setNotification } = useContext(NotificationContext);
  const [getEisProgress, setGetEisProgress] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const notificationOpacity = useRef(new Animated.Value(0)).current;
  const notificationTranslateY = useRef(new Animated.Value(-50)).current;

  const showTopNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);

    notificationTranslateY.setValue(-50);
    notificationOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(notificationOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(notificationTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(notificationOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(notificationTranslateY, {
          toValue: -50,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowNotification(false);
      });
    }, 3000);
  };

  useEffect(() => {
    let progressInterval: NodeJS.Timeout | undefined;

    if (getEis) {
      progressInterval = setInterval(() => {
        setGetEisProgress((prev) => {
          const newProgress = prev + 0.1;
          return newProgress;
        });
      }, 1000);
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
    };
  }, [getEis]);

  useEffect(() => {
    if (getEisProgress >= 1) {
      const randomNotification =
        notificationData[Math.floor(Math.random() * notificationData.length)];
      setNotification(randomNotification);

      showTopNotification("Battery analysis complete!");

      setGetEis(false);
      setGetEisProgress(0);
    }
  }, [getEisProgress, setNotification]);

  return (
    <View className="flex-1 bg-primary-100">
      <StatusBar backgroundColor="transparent" translucent />

      {showNotification && (
        <Animated.View
          style={{
            opacity: notificationOpacity,
            transform: [{ translateY: notificationTranslateY }],
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
          }}
          className="bg-green-600 px-4 pb-6 shadow-lg"
        >
          <View className="flex-row items-center justify-between pt-6">
            <View className="flex-row items-center">
              <View className="w-6 h-6 bg-white rounded-full items-center justify-center mr-2">
                <Text className="text-green-600 font-bold">✓</Text>
              </View>
              <Text className="text-white font-JakartaSemiBold">
                {notificationMessage}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setShowNotification(false)}>
              <Text className="text-white font-bold text-lg">×</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}

      <ScrollView className="h-[100vh]">
        <View className="flex flex-1 mt-5 px-5 pb-[100px] h-full">
          <Text className="text-3xl font-JakartaSemiBold mb-5">
            Battery Analysis
          </Text>
          <View className="pb-3">
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
                className="bg-secondary-700 rounded-xl p-4"
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
    </View>
  );
};

export default Battery;

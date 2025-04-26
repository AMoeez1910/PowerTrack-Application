import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
  Platform,
} from "react-native";
import React, { useContext, useEffect, useState, useRef } from "react";
import * as Progress from "react-native-progress";
import { NotificationContext } from "@/providers/NotificationContext";
import { notificationData } from "@/lib/data";
import DateTimePicker from "@react-native-community/datetimepicker";

const Battery = () => {
  const [getEis, setGetEis] = useState(false);
  const { setNotification } = useContext(NotificationContext);
  const [getEisProgress, setGetEisProgress] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const notificationOpacity = useRef(new Animated.Value(0)).current;
  const notificationTranslateY = useRef(new Animated.Value(-50)).current;

  // Date time picker states
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [scheduledTime, setScheduledTime] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState<string | null>(null);
  const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  // Explicitly show date picker
  const showDatePickerOnly = () => {
    setShowDatePicker(true);
    setShowTimePicker(false);
  };

  // Explicitly show time picker
  const showTimePickerOnly = () => {
    setShowTimePicker(true);
    setShowDatePicker(false);
  };

  // Handle date selection
  const handleDateChange = (event: any, date?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (event.type === "dismissed") {
      setShowDatePicker(false);
      return;
    }

    if (date) {
      const newDate = new Date(selectedDate);
      newDate.setFullYear(date.getFullYear());
      newDate.setMonth(date.getMonth());
      newDate.setDate(date.getDate());
      setSelectedDate(newDate);
    }

    setShowDatePicker(false);
  };

  // Handle time selection
  const handleTimeChange = (event: any, time?: Date) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }

    if (event.type === "dismissed") {
      setShowTimePicker(false);
      return;
    }

    if (time) {
      const newDate = new Date(selectedDate);
      newDate.setHours(time.getHours());
      newDate.setMinutes(time.getMinutes());
      setSelectedDate(newDate);
    }

    setShowTimePicker(false);
  };

  const scheduleEisAnalysis = () => {
    // Validate that date and time are in the future
    const now = new Date();
    if (selectedDate.getTime() <= now.getTime()) {
      showTopNotification("Please select a future date and time");
      return;
    }

    // Clear any existing countdown
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
    }

    setScheduledTime(selectedDate);
    showTopNotification(
      `Battery analysis scheduled for ${selectedDate.toLocaleTimeString()}`
    );

    // Set up countdown timer
    countdownTimerRef.current = setInterval(() => {
      const now = new Date();
      const diff = selectedDate.getTime() - now.getTime();

      if (diff <= 0) {
        // Time has arrived, start EIS
        clearInterval(countdownTimerRef.current!);
        setCountdown(null);
        setGetEis(true);
      } else {
        // Update countdown
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown(
          `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      }
    }, 1000);
  };

  useEffect(() => {
    let progressInterval: NodeJS.Timeout | undefined;

    if (getEis) {
      progressInterval = setInterval(() => {
        setGetEisProgress((prev) => {
          const newProgress = prev + 0.1;
          return newProgress >= 1 ? 1 : newProgress;
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
      setScheduledTime(null);
    }
  }, [getEisProgress, setNotification]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, []);

  // Format date and time for display
  const formattedDate = selectedDate.toLocaleDateString();
  const formattedTime = selectedDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

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

          {/* Date Time Picker Section */}
          <View className="mt-4 mb-6">
            <Text className="text-lg font-JakartaSemiBold mb-2">
              Schedule Battery Analysis
            </Text>

            <View className="flex-row justify-between mb-3">
              <TouchableOpacity
                onPress={showDatePickerOnly}
                className="bg-gray-200 p-4 rounded-xl flex-1 mr-2"
              >
                <Text className="font-JakartaMedium text-center">
                  Date: {formattedDate}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={showTimePickerOnly}
                className="bg-gray-200 p-4 rounded-xl flex-1"
              >
                <Text className="font-JakartaMedium text-center">
                  Time: {formattedTime}
                </Text>
              </TouchableOpacity>
            </View>

            {showDatePicker && (
              <DateTimePicker
                testID="datePicker"
                value={selectedDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={handleDateChange}
              />
            )}

            {showTimePicker && (
              <DateTimePicker
                testID="timePicker"
                value={selectedDate}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={handleTimeChange}
              />
            )}

            <TouchableOpacity
              onPress={scheduleEisAnalysis}
              className="bg-primary-700 rounded-xl p-4 mb-4"
              disabled={getEis}
            >
              <Text className="text-center font-JakartaBold text-white text-md">
                Schedule Analysis
              </Text>
            </TouchableOpacity>

            {countdown && (
              <View className="items-center bg-blue-100 p-4 rounded-xl">
                <Text className="text-lg font-JakartaSemiBold text-blue-800">
                  Analysis starts in:
                </Text>
                <Text className="text-2xl font-JakartaBold text-blue-800">
                  {countdown}
                </Text>
              </View>
            )}
          </View>

          <View className="w-full mt-2 pr-2">
            {!getEis ? (
              <TouchableOpacity
                onPress={() => {
                  setGetEis(true);
                }}
                className="bg-secondary-700 rounded-xl p-4"
                disabled={!!scheduledTime}
              >
                <Text className="text-center font-JakartaBold text-white text-md">
                  {scheduledTime ? "Analysis Scheduled" : "Start Analysis Now"}
                </Text>
              </TouchableOpacity>
            ) : (
              <View>
                <Text className="text-center font-JakartaSemiBold mb-2">
                  Battery Analysis in Progress
                </Text>
                <Progress.Bar
                  progress={getEisProgress}
                  width={1000}
                  className="max-w-full"
                  color="#666666"
                />
                <Text className="text-right font-JakartaMedium mt-1">
                  {Math.round(getEisProgress * 100)}%
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Battery;

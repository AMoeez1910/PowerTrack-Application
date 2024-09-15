import {
  View,
  Text,
  ScrollView,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Battery } from "@brightlayer-ui/react-native-progress-icons";
import { carData } from "@/lib/data";
import { images } from "@/constants";
import CustomBatterySVG from "@/components/BatteryIcon";
import { batteryProps } from "@/types/type";
import BatteryInfoCard from "@/components/BatteryInfoCard";

const Home = () => {
  const [showInfo, setShowInfo] = useState<batteryProps>(carData.battery[0]);
  return (
    <ScrollView className="bg-primary-100">
      <View className="flex flex-1 mt-16 justify-center items-center">
        <Image source={images.car} resizeMode="contain" className="mb-24" />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row justify-center items-center space-x-1 px-2">
            {carData.battery.map((battery, index) => (
              <View key={index} className="items-center">
                <TouchableOpacity
                  onPress={() => {
                    setShowInfo(battery);
                  }}
                >
                  <CustomBatterySVG charge={battery.charge} />
                </TouchableOpacity>
                <Text className="text-center font-JakartaBold">
                  {battery.charge}%
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <View className="flex flex-row flex-1 justify-center items-center mt-14 px-4">
          <BatteryInfoCard
            img={images.fan}
            heading="Temperature"
            cardStyles="mr-8 flex-1"
            description={`${showInfo.temp}°C`}
          />
          <BatteryInfoCard
            img={images.range}
            heading="Range"
            cardStyles="flex-1"
            description={`${showInfo.range} mi`}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { carData } from "@/lib/data";
import { images } from "@/constants";
import CustomBatterySVG from "@/components/BatteryIcon";
import { batteryProps } from "@/types/type";
import BatteryInfoCard from "@/components/BatteryInfoCard";
import * as Animatable from "react-native-animatable";

Animatable.initializeRegistryWithDefinitions({
  translateY: {
    from: { translateY: 0 },
    to: { translateY: -20 },
  },
  translateBack : {
    from: { translateY: -20 },
    to: { translateY: 0 },
  }
});

const Home = () => {
  const [showInfo, setShowInfo] = useState<batteryProps>();
  return (
    <ScrollView className="bg-primary-100">
      <View className="flex flex-1 mt-16 justify-center items-center">
        <Image source={images.car} resizeMode="contain" />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row justify-center items-center space-x-1 px-2 pt-24">
            {carData.battery.map((battery, index) => (
              <Animatable.View
                key={index}
                className="items-center"
                animation={
                  showInfo?.id === battery.id ? "translateY" : "translateBack"
                }
              >
                <TouchableOpacity
                  onPress={() => {
                    setShowInfo(battery);
                  }}
                >
                  <CustomBatterySVG charge={battery.charge} width={60} height={100} />
                </TouchableOpacity>
                <Text className="text-center font-JakartaBold">
                  {battery.charge}%
                </Text>
              </Animatable.View>
            ))}
          </View>
        </ScrollView>
        <View className="flex flex-row flex-1 justify-center items-center mt-14 px-4">
          <BatteryInfoCard
            img={images.fan}
            heading="Temperature"
            cardStyles="mr-8 flex-1"
            description={`${carData.info.temperature}°C`}
          />
          <BatteryInfoCard
            img={images.range}
            heading="Range"
            cardStyles="flex-1"
            description={`${carData.info.range} mi`}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

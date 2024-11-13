import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import CustomBatterySVG from "@/components/BatteryIcon";
import { batteryListI, batteryProps } from "@/types/type";
import BatteryInfoCard from "@/components/BatteryInfoCard";
import * as Animatable from "react-native-animatable";
import { fetchAPI, useFetch } from "@/lib/fetch";
import { RotateCcw } from "lucide-react-native";
Animatable.initializeRegistryWithDefinitions({
  translateY: {
    from: { translateY: 0 },
    to: { translateY: -20 },
  },
  translateBack: {
    from: { translateY: -20 },
    to: { translateY: 0 },
  },
});

const Home = () => {
  const [showInfo, setShowInfo] = useState<batteryProps>();
  const [refresh, setRefresh] = useState(false);
  const { data, loading, refetch } = useFetch(
    "https://united-whippet-openly.ngrok-free.app/get_dict/0"
  );
  const carData: batteryListI = (data || {}) as batteryListI;
  if (loading) {
    return (
      <View className="flex h-full justify-center items-center">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }
  if (!refresh && !loading) {
    setTimeout(() => {
      setRefresh(true);
    }, 5000);
  }
  return (
    <ScrollView
      className="bg-primary-100"
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
      }
    >
      {refresh && (
        <Animatable.View animation="translateBack">
          <TouchableOpacity
            onPress={() => {
              setRefresh(false);
              refetch();
            }}
            className="flex flex-row bg-secondary-700 p-3 absolute left-[47%] rounded-full width-[150px] mt-1"
          >
            <RotateCcw className="text-white" size={20} />
          </TouchableOpacity>
        </Animatable.View>
      )}
      <View className="flex flex-1 mt-16 justify-center items-center">
        <Image source={images.car} resizeMode="contain" />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row justify-center items-center space-x-1 px-2 pt-24">
            {Object?.entries(carData)
              ?.filter(([key]) => key.startsWith("b"))
              ?.map(([key, charge], index) => (
                <Animatable.View
                  key={index}
                  className="items-center"
                  animation={
                    showInfo?.id === key ? "translateY" : "translateBack"
                  }
                >
                  <TouchableOpacity
                    onPress={() => {
                      setShowInfo({
                        id: key,
                        health: charge,
                        name: "",
                        cdl: 0,
                        rct: 0,
                        re: 0,
                        warns: [],
                      });
                    }}
                  >
                    <CustomBatterySVG
                      charge={charge as number}
                      width={60}
                      height={100}
                    />
                  </TouchableOpacity>
                  <Text className="text-center font-JakartaBold">
                    {charge}%
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
            description={`${carData.temp}°C`}
          />
          <BatteryInfoCard
            img={images.range}
            heading="Range"
            cardStyles="flex-1"
            description={`${carData.range} mi`}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default Home;

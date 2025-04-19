import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants";
import CustomBatterySVG from "@/components/BatteryIcon";
import { batteryListI, batteryProps } from "@/types/type";
import BatteryInfoCard from "@/components/BatteryInfoCard";
import * as Animatable from "react-native-animatable";
import { fetchAPI, useFetch } from "@/lib/fetch";
import { RotateCcw } from "lucide-react-native";
import * as Progress from "react-native-progress";
import { router } from "expo-router";

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
  const [getEis, setGetEis] = useState(false);
  const [getEisProgress, setGetEisProgress] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const { data, loading, refetch } = useFetch(
    "https://serv-5dla.onrender.com/get_dict/0"
  );
  const carData: batteryListI = (data || {}) as batteryListI;
  if (getEis) {
    setTimeout(() => {
      setGetEisProgress((prev) => prev + 0.1);
    }, 1000);
  }
  if (!refresh && !loading) {
    setTimeout(() => {
      setRefresh(true);
    }, 5000);
  }
  useEffect(() => {
    if (getEisProgress >= 1) {
      setGetEis(false);
      setGetEisProgress(0);
      router.push("/information");
    }
  }, [getEisProgress]);
  return (
    <ScrollView
      className="bg-primary-100"
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
      }
    >
      {refresh && !loading && (
        <View>
          <Animatable.View animation="translateBack" useNativeDriver>
            <TouchableOpacity
              onPress={() => {
                setRefresh(false);
                refetch();
              }}
              className="flex flex-row bg-secondary-700 p-3 absolute left-[44%] rounded-full width-[150px] mt-1"
            >
              <RotateCcw className="text-white" size={20} />
            </TouchableOpacity>
          </Animatable.View>
        </View>
      )}
      <View className="flex flex-1 mt-16 justify-center items-center h-full">
        <Image
          source={images.car}
          resizeMode="contain"
          className={`${loading ? "mt-32" : ""}`}
        />
        {loading ? (
          <View className="flex h-full justify-center items-center">
            <ActivityIndicator size="small" color="#000" />
          </View>
        ) : (
          <>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
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
          </>
        )}
        {/* <View className="w-full px-4 mt-6 relative">
          <TouchableOpacity
            onPress={() => {
              setGetEis(true);
            }}
            className={` bg-secondary-700 rounded-xl p-4 ${getEis ? "hidden" : "visible"}`}
          >
            <Text className="text-center font-JakartaBold text-white text-md">
              Get Eis Progress
            </Text>
          </TouchableOpacity>
          <View
            className={`absolute top-4 left-4 ${getEis ? "visible" : " hidden"}`}
          >
            <Progress.Bar
              progress={getEisProgress}
              width={500}
              className="mx-auto max-w-full"
              color="#666666"
            />
          </View>
        </View> */}
      </View>
    </ScrollView>
  );
};
export default Home;

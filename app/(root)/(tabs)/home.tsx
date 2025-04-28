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
import { batteryProps, mileageI } from "@/types/type";
import BatteryInfoCard from "@/components/BatteryInfoCard";
import * as Animatable from "react-native-animatable";
import { fetchAPI } from "@/lib/fetch";
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
  const [loading, setLoading] = useState(true);
  const [mileageData, setMileageData] = useState<mileageI>();
  const fetchData = async () => {
    try {
      setLoading(true);
      const mileageData = await fetchAPI(
        "https://serv-5dla.onrender.com/get_rng"
      );
      setMileageData(mileageData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ScrollView
      className="bg-primary-100"
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchData} />
      }
    >
      {refresh && !loading && (
        <View>
          <Animatable.View animation="translateBack" useNativeDriver>
            <TouchableOpacity
              onPress={() => {
                setRefresh(false);
                fetchData();
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
                {mileageData &&
                  Object.entries(mileageData.rng ?? {})
                    ?.filter(([key]) => key.startsWith("b"))
                    .map(([key, charge], index) => (
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
                              health: (
                                mileageData?.rng as Record<string, any>
                              )?.[key]?.health,
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
                img={images.range}
                heading="Range"
                cardStyles="flex-1"
                description={`${mileageData?.rng.rng || 0} mi`}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};
export default Home;

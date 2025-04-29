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
  batteryHover: {
    0: {
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
    },
    0.5: {
      translateY: -10,
      scaleX: 1.05,
      scaleY: 1.05,
    },
    1: {
      translateY: -15,
      scaleX: 1.1,
      scaleY: 1.1,
    },
  },
  batteryReset: {
    0: {
      translateY: -15,
      scaleX: 1.1,
      scaleY: 1.1,
    },
    0.5: {
      translateY: -5,
      scaleX: 1.05,
      scaleY: 1.05,
    },
    1: {
      translateY: 0,
      scaleX: 1,
      scaleY: 1,
    },
  },
  refreshButtonSlideIn: {
    from: {
      translateY: -40,
      opacity: 0,
    },
    to: {
      translateY: 0,
      opacity: 1,
    },
  },
  refreshButtonSlideOut: {
    from: {
      translateY: 0,
      opacity: 1,
    },
    to: {
      translateY: -40,
      opacity: 0,
    },
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
      {!loading && (
        <Animatable.View
          animation={refresh ? "refreshButtonSlideIn" : "refreshButtonSlideOut"}
          duration={500}
          useNativeDriver
          className="absolute z-10 left-0 right-0 flex items-center mt-1"
        >
          <TouchableOpacity
            onPress={() => {
              setRefresh(false);
              fetchData();
            }}
            className="flex flex-row bg-secondary-700 p-3 rounded-full px-5"
          >
            <RotateCcw className="text-white" size={20} />
          </TouchableOpacity>
        </Animatable.View>
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
            <Text className="text-2xl font-JakartaSemiBold mb-5 mt-5">
              State of Charge
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View className="flex flex-row justify-center items-center space-x-1 px-2 pt-8">
                {mileageData &&
                  Object.entries(mileageData.rng ?? {})
                    ?.filter(([key]) => key.startsWith("b"))
                    .map(([key, charge], index) => {
                      const isSelected = showInfo?.id === key;
                      return (
                        <Animatable.View
                          key={index}
                          className="items-center"
                          animation={
                            isSelected ? "batteryHover" : "batteryReset"
                          }
                          duration={500}
                          easing="ease-out"
                          useNativeDriver
                        >
                          <TouchableOpacity
                            onPress={() => {
                              // Deselect if already selected, otherwise select
                              if (isSelected) {
                                setShowInfo(undefined);
                              } else {
                                setShowInfo({
                                  id: key,
                                  health: (
                                    mileageData?.rng as Record<string, any>
                                  )?.[key]?.health,
                                });
                              }
                            }}
                          >
                            <CustomBatterySVG
                              charge={charge as number}
                              width={60}
                              height={100}
                            />
                          </TouchableOpacity>
                          <Text className="text-center font-JakartaBold mt-1">
                            {charge}%
                          </Text>
                        </Animatable.View>
                      );
                    })}
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

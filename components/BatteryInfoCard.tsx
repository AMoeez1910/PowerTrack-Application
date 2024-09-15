import { View, Text, Image } from "react-native";
import React from "react";

const BatteryInfoCard = ({
  img,
  heading,
  description,
  cardStyles,
  imgStyles,
}: {
  img: any;
  heading: string;
  description: string;
  cardStyles?: string;
  imgStyles?: string;
}) => {
  return (
    <View
      className={` ${cardStyles} bg-white border-2 rounded-2xl border-[#E0E0E0] flex p-4 justify-center items-center h-full`}
    >
      <Image source={img} className={imgStyles} resizeMode="contain" />
      <View className="flex justify-center items-center">
        <Text className="text-lg text-gray-500 font-Jakarta">{heading}</Text>
        <Text className="text-3xl text-center font-JakartaBold">
          {description}
        </Text>
      </View>
    </View>
  );
};

export default BatteryInfoCard;

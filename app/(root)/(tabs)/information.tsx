import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomBatterySVG from "@/components/BatteryIcon";
import { batteryProps } from "@/types/type";
import { carData, warningFix } from "@/lib/data";
import { Dropdown } from "react-native-element-dropdown";
import { Circle, Svg } from "react-native-svg";
import CustomButton from "@/components/CustomButton";
import ReactNativeModal from "react-native-modal";
import { images } from "@/constants";
import { useFetch } from "@/lib/fetch";

const Information = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const batteryText = (charge: number) => {
    if (charge < 20) {
      return "Battery health is low";
    } else if (charge < 50) {
      return "Battery health is moderate";
    } else if (charge < 80) {
      return "Battery health is good";
    } else {
      return "Battery health is excellent";
    }
  };
  const [selectedBattery, setSelectedBattery] = useState<batteryProps>(carData.battery[0]);
  const { data, loading } = useFetch(
    `https://united-whippet-openly.ngrok-free.app/get_dict/${selectedBattery?.id}`
  );
  const batteryData : batteryProps = (data || {}) as batteryProps;
  useEffect(()=>{
    selectedBattery && setSelectedBattery(
      {
        ...selectedBattery,
        cdl: batteryData.cdl,
        health: batteryData.health,
        rct: batteryData.rct,
        re: batteryData.re,
        warns: batteryData.warns
      }
    )
  },[data])
  if (loading) {
    return (
      <View className="flex h-full justify-center items-center">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }
  return (
    <ScrollView className="flex-1 bg-primary-100 ">
      <View className="flex flex-1 mt-5 px-5 pb-[100px]">
        <Text className="text-3xl font-JakartaSemiBold mb-5 ">
          Technical Details
        </Text>
        <View className="flex flex-row justify-between border-b border-[#E0E0E0] pb-3">
          <View>
            <Text className="text-lg font-JakartaSemiBold mb-2">
              Battery Health
            </Text>
            <Dropdown
              containerStyle={{
                borderRadius: 10,
                borderColor: "#E0E0E0",
                padding: 5,
              }}
              style={{
                width: 200,
                padding: 10,
                borderRadius: 5,
                borderColor: "#E0E0E0",
                borderWidth: 2,
                marginBottom: 30,
              }}
              data={carData.battery}
              maxHeight={300}
              placeholder="Select item"
              value={selectedBattery}
              onChange={(item) => {
                setSelectedBattery(item);
              }}
              labelField="name"
              valueField="id"
            />
            {selectedBattery.health && (
              <View>
                <Text className="text-xl font-JakartaBold absolute">
                  {batteryText(selectedBattery.health)}!
                </Text>
              </View>
            )}
          </View>
          <View className="flex">
            <CustomBatterySVG
              charge={selectedBattery.health || 0}
              width={100}
              height={150}
            />
            <Text className="text-center font-JakartaBold">
              {selectedBattery.health}%
            </Text>
          </View>
        </View>
        <View className="mt-3 pb-3 border-b border-[#E0E0E0]">
          <Text className="text-xl font-JakartaSemiBold mb-2">
            Battery Equivalent Values
          </Text>
          <View className="flex flex-row items-center ml-2 mb-2">
            <Svg height="7" width="7" viewBox="0 0 10 10">
              <Circle cx="5" cy="5" r="5" fill="#1F1F1F" />
            </Svg>
            <Text className="text-lg ml-2 font-Jakarta">
              Double-Layer Capacitance (Cdl):{" "}
              <Text className="text-lg font-JakartaBold">
                {selectedBattery.cdl}
                μF
              </Text>
            </Text>
          </View>
          <View className="flex flex-row items-center ml-2">
            <Svg height="7 " width="7" viewBox="0 0 10 10">
              <Circle cx="5" cy="5" r="5" fill="#1F1F1F" />
            </Svg>
            <Text className="text-lg ml-2 font-Jakarta mb-2">
              Charge Transfer Resistance (Rct):{" "}
              <Text className="text-lg font-JakartaBold">
                {selectedBattery.rct}Ω
              </Text>
            </Text>
          </View>
          <View className="flex flex-row items-center ml-2">
            <Svg height="7" width="7" viewBox="0 0 10 10">
              <Circle cx="5" cy="5" r="5" fill="#1F1F1F" />
            </Svg>
            <Text className="text-lg ml-2 font-Jakarta">
              Internal Resistance (R0):{" "}
              <Text className="text-lg font-JakartaBold">
                {selectedBattery.re}
                mΩ
              </Text>
            </Text>
          </View>
        </View>
        <View className="mt-3">
          <Text className="text-xl font-JakartaSemiBold text-red-600 ">
            Battery Warnings
          </Text>
          {selectedBattery?.warns?.length === 0 || !selectedBattery.warns ? (
            <Text className="text-xl text-center font-JakartaBold py-4">
              No warnings to show
            </Text>
          ) : (
            selectedBattery.warns?.map((warning, index) => (
              <View
                key={index}
                className="flex flex-row items-center py-1 ml-2"
              >
                <Svg height="7" width="7" viewBox="0 0 10 10">
                  <Circle cx="5" cy="5" r="5" fill="#1F1F1F" />
                </Svg>
                <Text className="text-lg ml-2 font-Jakarta">{warning}</Text>
              </View>
            ))
          )}
        </View>
        {selectedBattery?.warns?.length > 0 && (
          <CustomButton
            title="Fix Battery Warning Issues"
            className="mt-5"
            bgVariant="danger"
            onPress={() => {
              setModalVisible(true);
            }}
          />
        )}
      </View>
      <ReactNativeModal
        isVisible={modalVisible}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
      >
        <ScrollView className="bg-white px-7 py-4 rounded-2xl max-h-[600px]">
          <View className="flex justify-center items-center">
            <Image source={images.circuit} />
            <Text>Circuit Diagram {selectedBattery.name}</Text>
            <View className="mt-4">
              {selectedBattery?.warns?.map((warning, index) => (
                <View key={index}>
                  <Text className="text-2xl font-JakartaExtraBold mb-2">
                    {warning}:
                  </Text>
                  <Text className="text-sm font-Jakarta mb-5">
                    {warningFix(warning)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </ReactNativeModal>
    </ScrollView>
  );
};

export default Information;

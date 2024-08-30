import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Image,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { InputFieldProps } from "@/types/type";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  clearText,
  ...props
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex flex-col gap-2 mb-2 w-full">
          <Text className={`text-lg font-JakartaSemiBold ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row w-full justify-start items-center bg-neutral-100 rounded-full border border-neutral-100 focus:border-black ${containerStyle} `}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle} `} />
            )}
            <TextInput
              className={`flex-1 rounded-full p-4 text-black font-JakartaSemiBold text-[15px] text-left ${inputStyle}`}
              {...props}
              placeholderTextColor="gray"
              secureTextEntry={secureTextEntry && !showPassword}
            />
            {secureTextEntry && (
              <TouchableWithoutFeedback
                onPress={() => setShowPassword(!showPassword)}
              >
                <Image source={icons.eyecross} className="w-6 h-6 mr-4" />
              </TouchableWithoutFeedback>
            )}
            {clearText && (
              <TouchableOpacity onPress={clearText}>
                <Image
                  source={icons.close}
                  className={`w-6 h-6 mr-4 ${iconStyle} `}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;

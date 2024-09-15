import { View, Text, ScrollView, Image } from "react-native";
import React, { useCallback, useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      setIsLoading(true);
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
    //eslint-disable-next-line
  }, [isLoaded, form.email, form.password]);

  return (
    <SafeAreaView className="bg-primary-100 h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-4">
          <Image
            source={images.logoBlack}
            className="w-32 h-32"
            resizeMode="contain"
          />
          <Text className="text-2xl font-JakartaBold">Welcome 👋</Text>
          <View className="py-5">
            <InputField
              label="Email"
              placeholder="Enter your email"
              icon={icons.email}
              value={form.email}
              onChangeText={(text) => setForm({ ...form, email: text })}
            />
            <InputField
              label="Password"
              placeholder="Enter your password"
              icon={icons.lock}
              value={form.password}
              secureTextEntry={true}
              onChangeText={(text) => setForm({ ...form, password: text })}
            />
            <CustomButton
              className="mt-4"
              bgVariant="secondary"
              title="Sign In"
              onPress={onSignInPress}
              isLoading={isLoading}
            />
            <View className="flex flex-row justify-center items-center mt-4">
              <Text className="text-black">Dont have an account already? </Text>
              <Link href={"/sign-up"} className="text-[#0286ff]">
                Sign Up
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

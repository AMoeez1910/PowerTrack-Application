import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
// import { fetchAPI } from "@/lib/fetch";
const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationLoading, setIsVerificationLoading] = useState(false);
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      setIsLoading(true);
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
        firstName: form.name,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({ ...verification, state: "pending" });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      setIsVerificationLoading(true);
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        // await fetchAPI("/(api)/user", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     name: form.name,
        //     email: form.email,
        //     clerkId: completeSignUp.createdUserId,
        //   }),
        // });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({ ...verification, state: "success" });
        setForm({ name: "", email: "", password: "" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err.errors[0].longMessage,
      });
    } finally {
      setIsVerificationLoading(false);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="h-full w-full" />
          <Text className="text-2xl font-JakartaBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter your name"
            icon={icons.person}
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
          />
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
            title="Sign Up"
            onPress={onSignUpPress}
            isLoading={isLoading}
          />
          <View className="flex flex-row justify-center items-center mt-4">
            <Text className="text-black">Already have an account? </Text>
            <Link href={"/sign-in"} className="text-[#0286ff]">
              Sign In
            </Link>
          </View>
        </View>

        <ReactNativeModal
          isVisible={
            verification.state === "pending" || verification.state === "failed"
          }
          onModalHide={() => {
            setVerification({ ...verification, state: "success" });
            setShowSuccessModal(true);
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaExtraBold mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-5">
              We have sent a verification code to {form.email}
            </Text>
            <InputField
              label="Code"
              placeholder="1234"
              icon={icons.lock}
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(text) =>
                setVerification({ ...verification, code: text })
              }
            />
            {verification.error && (
              <Text className="text-center font-JakartaSemiBold text-red-500 mt-3 mx-2">
                {verification.error}
              </Text>
            )}
            <CustomButton
              className="mt-4"
              bgVariant="success"
              title="Verify Email"
              onPress={onPressVerify}
              isLoading={verificationLoading || verification.code.length !== 6}
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image source={images.check} className="w-24 h-24 mx-auto my-5" />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-center font-JakartaSemiBold text-secondary-500 mt-3 mx-2">
              Your account has been verified successfully.
            </Text>
            <CustomButton
              className="mt-4"
              title="Browse Home"
              onPress={() => {
                setShowSuccessModal(false);
                // router.push("/(root)/(tabs)/home");
              }}
            />
          </View>
        </ReactNativeModal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

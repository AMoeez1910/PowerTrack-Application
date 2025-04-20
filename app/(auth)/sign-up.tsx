import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
// import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationLoading, setIsVerificationLoading] = useState(false);
  const [verification, setVerification] = useState({
    state: "default", // default, pending, failed, success
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

    // Basic validation
    if (!form.name || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields");
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

      setVerification({ ...verification, state: "pending", error: "" });
    } catch (err: any) {
      const errorMessage =
        err?.errors?.[0]?.longMessage || "Something went wrong during signup";
      Alert.alert("Error", errorMessage);
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
        setVerification({ ...verification, state: "success", error: "" });
        setShowSuccessModal(true);
        setForm({ name: "", email: "", password: "" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed",
        });
      }
    } catch (err: any) {
      const errorMessage =
        err?.errors?.[0]?.longMessage || "Verification failed";
      setVerification({
        ...verification,
        state: "failed",
        error: errorMessage,
      });
    } finally {
      setIsVerificationLoading(false);
    }
  };

  const handleNavigateAfterSuccess = () => {
    setShowSuccessModal(false);
    router.push("/(root)/(tabs)/home");
  };

  const isFormValid = form.name && form.email && form.password;
  const isVerificationCodeValid =
    verification.code && verification.code.length === 6;

  return (
    <SafeAreaView className="bg-primary-100 h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-4">
          <Image
            source={images.logoBlack}
            className="w-32 h-32"
            resizeMode="contain"
          />
          <Text className="text-2xl font-JakartaBold">Create Your Account</Text>
          <View className="py-5">
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
              disabled={!isFormValid}
            />
            <View className="flex flex-row justify-center items-center mt-4">
              <Text className="text-black">Already have an account? </Text>
              <Link href={"/sign-in"} className="text-[#0286ff]">
                Sign In
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Verification Modal */}
      <ReactNativeModal
        isVisible={
          verification.state === "pending" || verification.state === "failed"
        }
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
            placeholder="123456"
            icon={icons.lock}
            value={verification.code}
            keyboardType="numeric"
            onChangeText={(text) =>
              setVerification({ ...verification, code: text })
            }
            maxLength={6}
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
            isLoading={verificationLoading}
            disabled={!isVerificationCodeValid}
          />
        </View>
      </ReactNativeModal>

      {/* Success Modal */}
      <ReactNativeModal
        isVisible={showSuccessModal}
        onBackdropPress={() => handleNavigateAfterSuccess()}
      >
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
            bgVariant="secondary"
            title="Browse Home"
            onPress={handleNavigateAfterSuccess}
          />
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

export default SignUp;

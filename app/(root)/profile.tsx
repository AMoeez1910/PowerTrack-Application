import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { LinearGradient } from "expo-linear-gradient";
import { icons } from "@/constants";
import { ChevronLeft, Camera } from "lucide-react-native";
import { useRouter } from "expo-router";
import InputField from "@/components/InputField";
import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      if (
        form.firstName !== user?.firstName ||
        form.lastName !== user?.lastName
      ) {
        await user?.update({
          firstName: form.firstName,
          lastName: form.lastName,
        });
      }

      if (form.password) {
        if (form.password !== form.confirmPassword) {
          Alert.alert("Error", "Passwords do not match");
          setLoading(false);
          return;
        }

        try {
          if (user?.updatePassword) {
            await user.updatePassword({
              currentPassword: form.currentPassword,
              newPassword: form.password,
            });
            setForm({
              ...form,
              password: "",
              confirmPassword: "",
              currentPassword: "",
            });
            Alert.alert("Success", "Profile updated successfully");
          } else {
            Alert.alert(
              "Info",
              "Password update functionality requires a different flow with Clerk"
            );
          }
        } catch (error) {
          Alert.alert("Error", "Failed to update password. Please try again.");
          console.error(error);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleImagePick = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission needed",
          "Please grant permission to access your photos"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        setLoading(true);

        try {
          if (user?.setProfileImage) {
            await user.setProfileImage({
              file: result.assets[0].uri,
            });

            if (user?.reload) {
              await user.reload();
            }
            Alert.alert("Success", "Profile picture updated");
          } else {
            Alert.alert(
              "Info",
              "Profile image update requires a different flow with Clerk"
            );
          }
        } catch (error) {
          Alert.alert("Error", "Failed to update profile picture");
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while picking image");
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1 }} className="h-full">
      <LinearGradient
        colors={["#00701F", "#6E6EC9", "#936EFB", "#7B59DC", "#1C006C"]}
        style={{ flex: 1 }}
        className="h-full"
      >
        <View className="flex-row items-center justify-between w-full mt-10 px-6">
          <TouchableOpacity
            onPress={() => router.replace("/(root)/(tabs)/home")}
          >
            <ChevronLeft color="white" size={28} />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-red-600 px-4 py-2 rounded-xl"
            onPress={() => {
              signOut()
                .then(() => {
                  router.replace("/(auth)/sign-in");
                })
                .catch((error) => {
                  Alert.alert("Error", "Failed to log out. Please try again.");
                  console.error(error);
                });
            }}
          >
            <Text className="text-white text-center font-bold text-base">
              Log Out
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex items-center mt-6">
            <TouchableOpacity className="relative" onPress={handleImagePick}>
              <Image
                source={user?.imageUrl ? { uri: user.imageUrl } : icons.profile}
                className="w-24 h-24 rounded-full"
                resizeMode="cover"
              />
              <View className="absolute bottom-0 right-0 bg-green-700 p-2 rounded-full">
                <Camera size={14} color="white" />
              </View>
            </TouchableOpacity>
            <Text className="text-white text-2xl font-bold mt-4">
              {user?.fullName || "User Name"}
            </Text>
          </View>

          <View className="mt-8 mb-8">
            <InputField
              label="First Name"
              labelStyle="text-white"
              placeholder="Enter your first name"
              icon={icons.profile}
              value={form.firstName}
              onChangeText={(text) => setForm({ ...form, firstName: text })}
            />

            <InputField
              label="Email"
              labelStyle="text-white"
              placeholder="Enter your email"
              icon={icons.email}
              value={form.email}
              editable={false}
            />

            <InputField
              label="Current Password"
              labelStyle="text-white"
              placeholder="Enter current password"
              icon={icons.lock}
              value={form.currentPassword}
              secureTextEntry={true}
              onChangeText={(text) =>
                setForm({ ...form, currentPassword: text })
              }
            />

            <InputField
              label="New Password"
              labelStyle="text-white"
              placeholder="Enter new password"
              icon={icons.lock}
              value={form.password}
              editable={form.currentPassword !== ""}
              secureTextEntry={true}
              onChangeText={(text) => setForm({ ...form, password: text })}
            />

            <InputField
              label="Confirm Password"
              labelStyle="text-white"
              placeholder="Confirm new password"
              icon={icons.lock}
              value={form.confirmPassword}
              secureTextEntry={true}
              editable={form.currentPassword !== ""}
              onChangeText={(text) =>
                setForm({ ...form, confirmPassword: text })
              }
            />

            <TouchableOpacity
              className="bg-green-600 py-4 rounded-xl mt-6"
              onPress={handleUpdateProfile}
              disabled={loading}
            >
              <Text className="text-white text-center font-bold text-base">
                {loading ? "Updating..." : "Update Profile"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

export default Profile;

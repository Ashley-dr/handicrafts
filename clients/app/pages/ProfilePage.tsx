import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../screens/Login";
import Updates from "expo-updates";
import { Link } from "expo-router";

// import { Button, Header, XGroup, XStack, YStack } from 'tamagui'
const ProfilePage = ({ navigation }: { navigation: any }) => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Token:", token);

      if (token) {
        const response = await axios.post(
          "http://192.168.1.3:8000/api/user-data",
          { token }
        );
        console.log("User Data:", response.data);
        setUserData(response.data.data);
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.getParent().setParams({ token: null });
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    } catch (error) {
      console.log("Cannot Sign out");
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }
  return (
    <View className="max-w-full max-h-full mx-5">
      {userData ? (
        <>
          <Text>Email: {userData.email}</Text>
          <Text>name: {userData.fullname}</Text>
          <Text>Phone Number: {userData.phoneNumber}</Text>

          <Button title="Sign out" onPress={logout} />
        </>
      ) : (
        <Text>No user data found</Text>
      )}
    </View>
  );
};

export default ProfilePage;

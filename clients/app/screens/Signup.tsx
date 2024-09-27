import { View, Text, Alert, ImageBackground } from "react-native";
import React, { useState } from "react";
import * as Updates from "expo-updates";

import { Button, IconButton, TextInput } from "react-native-paper";
import axios from "axios";
import Login from "./Login";
import tw from "twrnc";
import { Link } from "expo-router";
const Signup = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNum] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputs = () => {
    if (!email || !password || !confirmPassword || !fullname || !phoneNumber) {
      Alert.alert("All fields required");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!inputs()) return;
    setLoading(true);
    try {
      const result = await axios.post(`http://192.168.1.3:8000/api/signup`, {
        email,
        password,
        fullname,
        phoneNumber,
      });

      Alert.alert("Successfully created: ", email);
      console.log("Successfully sign up", result.data);
      // await Updates.reloadAsync();
      navigation.navigate("Login");
      // navigation.goBack();
    } catch (error: any) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Email Already Exist"
      ) {
        Alert.alert(
          "Sign up failed",
          "Account already exists. Please use another email."
        );
      } else {
        Alert.alert("Sign up failed", "An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    // <ImageBackground source={require('../images/sg.jpg')} className='flex-1 justify-center bg-cover bg-center'  resizeMode="cover">
    <View className="flex-1 justify-center items-center bg-[#FFFCEF] ">
      <View style={tw`bg-[#FFFCEF] p-5 rounded-lg w-[90%]`}>
        <Text style={tw`text-[28px] font-bold text-center m-[6px]`}>
          Create Account
        </Text>
        <Text style={tw`text-[15px] font-light px-2 my-2`}>
          Explore handicraft by creating account.
        </Text>
        <TextInput
          value={fullname}
          style={tw`bg-[#efdbbb4f] text-[#AD9C8E] text-[12px] rounded-t-lg mb-4 w-full`}
          label="Fullname"
          autoCapitalize="none"
          onChangeText={(text) => setFullname(text)}
        ></TextInput>
        <TextInput
          value={phoneNumber}
          style={tw`bg-[#efdbbb4f] text-[#AD9C8E] text-[12px] rounded-t-lg mb-4 w-full`}
          keyboardType="phone-pad"
          label="Phone Number"
          onChangeText={(text) => setPhoneNum(text)}
        ></TextInput>

        <TextInput
          value={email}
          style={tw`bg-[#efdbbb4f] text-[#AD9C8E] text-[12px] rounded-t-lg mb-4 w-full`}
          label="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>

        <View className="flex-row justify-between mb-4">
          <TextInput
            secureTextEntry={!showPassword}
            value={password}
            className="bg-[#efdbbb4f] text-[#AD9C8E] text-[12px] rounded-t-lg w-[85%]"
            label="Password"
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          />

          <IconButton
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        <View className="flex-row justify-between mb-4">
          <TextInput
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            className="bg-[#efdbbb4f] text-[#AD9C8E] text-[12px] w-[85%] rounded-t-lg mb-4 "
            label="Confirm Password"
            autoCapitalize="none"
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <IconButton
            icon={showConfirmPassword ? "eye-off" : "eye"}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </View>
        <Button
          onPress={handleSignup}
          style={tw`bg-[#DFC4A4] rounded-md mb-3`}
          labelStyle={tw`text-[#4f3a3a] text-[13px]`}
        >
          Sign up
        </Button>
        {/* <Text style={tw`text-[#4f3a3a] pt-1 text-center`}>
          Already have an account?{" "}
          <Link href={"/screens/Login"} style={tw`text-gray-600 underline`}>
            Sign in{" "}
          </Link>
       
        </Text> */}
      </View>
    </View>
    // </ImageBackground>
  );
};

export default Signup;

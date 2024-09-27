import { View, Text, Alert, ImageBackground } from "react-native";
import React, { useState } from "react";

import { Button, TextInput } from "react-native-paper";
import { AlertDialog } from "tamagui";
import Products from "../pages/Products";
import axios from "axios";
import ForgotPassword from "./ForgotPassword";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "twrnc";

const Login = ({ navigation }: { navigation: any }) => {
  const API_URL = process.env.API_URL;
  // const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  function handleLogin() {
    try {
      const userData = { email: email, password };
      axios
        .post(`http://192.168.1.3:8000/api/signin`, userData)
        .then((result) => {
          if (result.data.status == "ok") {
            // Alert.alert("Logged in successful");
            AsyncStorage.setItem("token", result.data.data);
            navigation.getParent().setParams({ token: result.data.token });
            navigation.reset({
              index: 0,
              routes: [{ name: "Tabs" }],
            });
          } else if (result.data.message === "Account not exists") {
            // Account not found
            Alert.alert("Error", "Account does not exist");
          } else if (result.data.message === "Invalid password") {
            // Invalid password
            Alert.alert("Error", "Invalid password");
          }
        });
    } catch (error) {
      console.log("Error sign in", error);
      Alert.alert("Authentication error" + error);
    }
  }

  return (
    <View className="flex-1 justify-center items-center bg-[#FFFCEF] ">
      <View style={tw`bg-[#FFFCEF] p-5 rounded-lg w-[90%]`}>
        <Text style={tw`text-[28px] font-bold text-center m-[6px]`}>
          Welcome to Handicraft
        </Text>
        <Text style={tw`text-[15px] font-light px-2 my-2`}>
          Login now to avail exclusive promos and vouchers
        </Text>
        <TextInput
          value={email}
          style={tw`bg-[#efdbbb4f] text-[#AD9C8E] text-[12px] rounded-t-lg mb-4 w-full`}
          label="Email"
          placeholder="Ex. user@gmail.com"
          placeholderTextColor="#4f3a3a94"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          secureTextEntry={true}
          value={password}
          style={tw`bg-[#efdbbb4f] text-[#AD9C8E] text-[12px] rounded-t-lg  w-full  focus:outline-none active:bg-violet-700`}
          label="Password"
          placeholder="Enter Password"
          placeholderTextColor="#4f3a3a94"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        />

        <Button
          onPress={handleLogin}
          style={tw`bg-[#DFC4A4] rounded-md mt-5 mb-3`}
          labelStyle={tw`text-[#4f3a3a] text-[13px]`}
        >
          Sign in
        </Button>
        <Text style={tw`text-[#4f3a3a] mt-3 pb-3 `}>
          <Link
            href="/screens/ForgotPassword"
            // style={tw`text-[#efdbbb] underline`}
            className="text-gray-900 underline"
          >
            Forgot password?
          </Link>
        </Text>
        {/* <Text style={tw`text-[#4f3a3a] pt-1 text-center`}>
          Dont have account yet?{" "}
          <Link href="/screens/Signup" style={tw`text-gray-600 underline`}>
            Signup Here{" "}
          </Link>
        </Text> */}
      </View>
    </View>
  );
};

export default Login;

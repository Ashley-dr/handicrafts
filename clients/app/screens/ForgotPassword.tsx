import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Button, IconButton, TextInput } from "react-native-paper";
import axios from "axios";
import tw from "twrnc";
const ForgotPassword = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [token, setToken] = useState("");

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://192.168.1.3:8000/api/forgot-password`,
        { email: email },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        console.log(token);
        Alert.alert(
          "Success",
          `Password reset code sent to ${email}. Check your inbox.`
        );
        // navigation.navigate(ResetPassword);
        console.log("Email sent");
        setDone(true);
      }
    } catch (error: any) {
      console.error(
        "Error in forgot password:",
        error.response?.data?.message || error.message
      );
      if (error.response?.status === 404) {
        Alert.alert(
          "Error",
          "Email not found. Please check the email address and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async () => {
    if (password !== newConfirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }

    if (!token || !password) {
      Alert.alert(
        "Error",
        "Please enter both the reset token and new password."
      );
      return;
    }
    try {
      const response = await axios.post(
        `http://192.168.1.3:8000/api/reset-password`,
        { token, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Password reset:", response.data);
      Alert.alert("Success", "Your password reset successfully.");
    } catch (error) {
      console.error("Password reset error:", error);
      Alert.alert("Error", "Failed to reset password. Please try again.");
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#FFFCEF] ">
      <View className="bg-[#FFFCEF] p-5 rounded-lg w-[90%]">
        <Text className="text-[28px] font-bold text-center m-[6px]">
          Reset Account
        </Text>
        <Text className="text-[15px] font-light px-2 my-2">
          Forgot password? input your email and check reset code from your
          email.
        </Text>
        {done == true ? (
          <View>
            <Text className="justify-center text-center bg-transparent justify-items-center mt-5 mb-2 border-none rounded-xl w-full">
              {email}
            </Text>
            <Text className="text-[15px] text-center font-light px-2 my-2">
              Reset code is valid for (1hour).
            </Text>
          </View>
        ) : (
          <View>
            <TextInput
              style={tw`bg-[#efdbbb4f] text-[#AD9C8E] text-[12px] rounded-t-lg mb-4 w-full`}
              autoCorrect={false}
              keyboardType="email-address"
              label="Email"
              value={email}
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            />
            <Button
              className="grid"
              onPress={handleForgotPassword}
              disabled={loading}
              style={tw`bg-[#DFC4A4] rounded-md mb-3`}
              labelStyle={tw`text-[#4f3a3a] text-[13px]`}
            >
              {loading ? "Processing..." : "Change Password"}
            </Button>
          </View>
        )}
        {done && (
          <View>
            <TextInput
              style={tw`bg-[#efdbbb4f] text-[#AD9C8E] text-[12px] rounded-t-lg mb-4 w-full`}
              placeholder="Reset Code"
              value={token}
              onChangeText={setToken}
            />
            <View className="flex-row justify-between mb-4">
              <TextInput
                className="bg-[#efdbbb4f] text-[#AD9C8E] text-[12px] rounded-t-lg w-[85%]"
                placeholder="New Password"
                value={password}
                onChangeText={setNewPassword}
                secureTextEntry={!showPassword}
              />
              <IconButton
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            </View>
            <View className="flex-row justify-between mb-4">
              <TextInput
                className="bg-[#efdbbb4f] text-[#AD9C8E] text-[12px] w-[85%] rounded-t-lg mb-4 "
                secureTextEntry={!showConfirmPassword}
                value={newConfirmPassword}
                placeholder="Confirm Password"
                autoCapitalize="none"
                onChangeText={(text) => setNewConfirmPassword(text)}
              />
              <IconButton
                icon={showConfirmPassword ? "eye-off" : "eye"}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            </View>
            <Button
              style={tw`bg-[#DFC4A4] rounded-md mb-3`}
              labelStyle={tw`text-[#4f3a3a] text-[13px]`}
              onPress={changePassword}
            >
              Submit
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default ForgotPassword;

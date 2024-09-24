import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Button, TextInput } from "react-native-paper";
import axios from "axios";

const ForgotPassword = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const [password, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");
  const [token, setToken] = useState("");

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://192.168.1.2:8000/api/forgot-password`,
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
    <View className="">
      <TextInput
        autoCorrect={false}
        keyboardType="email-address"
        label="Email"
        value={email}
        className="mx-5 justify-center justify-items-center"
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
      />
      <Button
        className="grid"
        onPress={handleForgotPassword}
        disabled={loading}
      >
        {loading ? "Processing..." : "Change Password"}
      </Button>
      {done && (
        <View>
          <TextInput
            placeholder="Reset Code"
            value={token}
            onChangeText={setToken}
          />
          <TextInput
            placeholder="New Password"
            value={password}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TextInput
            secureTextEntry={true}
            value={newConfirmPassword}
            placeholder="Confirm Password"
            autoCapitalize="none"
            onChangeText={(text) => setNewConfirmPassword(text)}
          />
          <Button onPress={changePassword}>Submit</Button>
        </View>
      )}
    </View>
  );
};

export default ForgotPassword;

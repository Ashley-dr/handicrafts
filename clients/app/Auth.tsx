import React from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import { createStackNavigator } from "@react-navigation/stack";
import tw from "twrnc";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Auth = () => {
  return (
    <Tab.Navigator
      activeColor="#00130e"
      inactiveColor="#16190a"
      barStyle={tw`bg-[#DFC4A4] mx-5 rounded-full pl-10 pr-10 mb-5`}
    >
      <Tab.Screen
        name="Login"
        component={Login}
        options={{
          title: "Sign in",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-arrow-left"
              color={color}
              size={32}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Signup"
        component={Signup}
        options={{
          title: "Sign up",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="text-box-plus"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Auth;

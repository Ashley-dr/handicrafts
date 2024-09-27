import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import Products from "./pages/Products";
import ProfilePage from "./pages/ProfilePage";
import { createStackNavigator } from "@react-navigation/stack";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import tw from "twrnc";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
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

  return (
    <Tab.Navigator
      activeColor="#00130e"
      inactiveColor="#16190a"
      barStyle={tw`bg-[#DFC4A4] mx-2 rounded-3xl pr-5 pl-5 mb-2`}
    >
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          title: "Home",

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Add",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus-circle-outline"
              color={color}
              size={30}
            />
          ),
        }}
      />
      {userData?.isAdmin == "true" && (
        <Tab.Screen
          name="AdminPanel"
          component={AdminPanel}
          options={{
            title: "",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="arch" color={color} size={30} />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{
          title: "Page",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

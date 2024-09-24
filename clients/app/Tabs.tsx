import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation' 
import Products from './pages/Products'
import ProfilePage from './pages/ProfilePage';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import tw from "twrnc";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Tab = createMaterialBottomTabNavigator ();

const Tabs = () => {
   const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("Token:", token);

      if (token) {
        const response = await axios.post('http://192.168.1.3:8000/api/user-data', { token });
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
    <Tab.Navigator  barStyle={tw`bg-[#DFC4A4] `}>
 
    <Tab.Screen name="Products" component={Products} 
     options={{
        title: "Home",
        
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="nuxt" color={color}  size={30} />
        ),
      }}/>
    <Tab.Screen name="Dashboard" component={Dashboard} options={{title: "Dashboard"}}/>
    {userData?.isAdmin == "true" && (<Tab.Screen name="AdminPanel" component={AdminPanel} options={{title: "AdminPanel"}}/>)}
    <Tab.Screen name="ProfilePage" component={ProfilePage} options={{title: "Profile Page"}}/>
    </Tab.Navigator>
  )
}

export default Tabs
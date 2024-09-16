import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation' 
import { Link } from 'expo-router'

import Products from './pages/Products'
import Login from './screens/Login'
import Signup from './screens/Signup'
import ProfilePage from './pages/ProfilePage';
import { getToken, verifyToken } from './AuthContext';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
// const Tab = createMaterialBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator ();
const Stack = createStackNavigator();


const AuthStack: React.FC = () => (
  <Tab.Navigator>
 
    <Tab.Screen name="Products" component={Products} options={{title: "Products"}}/>
    <Tab.Screen name="ProfilePage" component={ProfilePage} options={{title: "Profile Page"}}/>
    </Tab.Navigator>
  
)

const LoginNav: React.FC = () => ( 
  
  <Tab.Navigator>
      <Tab.Screen name="Login" component={Login} options={{title: "Log in"}}/>
      <Tab.Screen name="Signup" component={Signup} options={{title: "Sign up"}}/>
    </Tab.Navigator>
)

const Home = () => {
 const [isAuth, setIsAuth] = useState<boolean | null>(null);
   async function getData() {
    try {
      const token = await getToken();
      console.log("Token:", token);

      if (token) {
        const response = await verifyToken(token);
        console.log("User Data:", response);
        setIsAuth(response? true : false); 
      } else {
        console.log("No token found");
        setIsAuth(false);
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
       setIsAuth(false);
    }
  }
    useEffect(() => {
    getData();
  }, []);

  if(isAuth === null){
    return null;
  }
 return isAuth ? <AuthStack/> : <LoginNav/>;
 
 
}

export default Home
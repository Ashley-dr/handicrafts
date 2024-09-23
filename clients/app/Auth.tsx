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

const Tab = createMaterialBottomTabNavigator ();
const Stack = createStackNavigator();
const Auth = () => {
  return (
 
  <Tab.Navigator>
      <Tab.Screen name="Login" component={Login} options={{title: "Log in"}}/>
      <Tab.Screen name="Signup" component={Signup} options={{title: "Sign up"}}/>

    </Tab.Navigator>
  )
}

export default Auth
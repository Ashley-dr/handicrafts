import { View, Text, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'




import { FIREBASE_AUTH } from './firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';




import { Button, Header, XGroup, XStack, YStack } from 'tamagui'
import { AppRegistry } from 'react-native'
import { PaperProvider } from "react-native-paper"
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation' 

import { Link } from 'expo-router'
import Navigation from './pages/Navigation'
import Products from './Products'
import Login from './screens/Login'
import Signup from './screens/Signup'
import ProfilePage from './pages/ProfilePage';
const Tab = createMaterialBottomTabNavigator();
const Home = () => {
  const [ isSignedIn, setIsSignedIn ] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribed = onAuthStateChanged(FIREBASE_AUTH,(user) => {
      if(user) {
        setIsSignedIn(true)
      } else {
        setIsSignedIn(false)
      } 
        setLoading(false);
      
    });
    return () => unsubscribed();
  }, [])



  return (


  <Tab.Navigator  initialRouteName="Home"
  activeColor="#f0edf6"
  inactiveColor="#3e2465"
  barStyle={{ backgroundColor: '#694fad' }}>



    {isSignedIn ? (<> 
    <Tab.Screen name="Products" component={Products} options={{title: "Products"}}/>
    <Tab.Screen name="Profile Page" component={ProfilePage} options={{title: "Profile Page"}}/>
      </>) : (
      <>
     <Tab.Screen name="Products" component={Products} options={{title: "Products"}}/>
      <Tab.Screen name="Login" component={Login} options={{title: "Log in"}}/>
      <Tab.Screen name="Signup" component={Signup} options={{title: "Sign up"}}/>
      </>)}
     



    </Tab.Navigator>
  )
}

export default Home
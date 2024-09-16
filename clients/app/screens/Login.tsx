import { View, Text, Alert } from 'react-native'
import React, {useState} from 'react'
import { FIREBASE_AUTH } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Button, TextInput } from 'react-native-paper';
import { AlertDialog} from 'tamagui';
import Products from '../pages/Products';
import axios from 'axios';
import ForgotPassword from './ForgotPassword';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from "expo-updates"
import { useNavigation } from '@react-navigation/native';

import ProfilePage from '../pages/ProfilePage';
const Login = ({navigation}:{navigation: any}) => {
    // const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    // const handleLogin = async () => {
    //     setLoading(true);
    //     try {
    //         await signInWithEmailAndPassword(auth, email, password);
    //         alert("Welcome" + email);
    //         console.log("Successfully sign in");
    //         navigation.navigate(Products)
    //     } catch (error) {
    //         console.log("Error sign in");
    //         alert("Wrong email or password");
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    // const handleLogin = async () => {
    //     setLoading(true);
        
    //     try {
          
    //         const response = await axios.post(`http://192.168.1.19:8000/api/signin`, {email: email, password})
    //         alert("Welcome" + email);
    //         console.log("Successfully sign in", response.data);
    //         navigation.navigate(Products)
    //     } catch (error) {
    //         console.log("Error sign in");
    //         alert("Wrong email or password");
    //     } finally {
    //         setLoading(false);
    //     }
    // }
       function handleLogin() {
        try {
               const userData = {email: email, password}
        axios.post(`http://192.168.1.19:8000/api/signin`, userData).then((result) => {
          if(result.data.status == 'ok'){
            Alert.alert('Logged in successful');
            AsyncStorage.setItem("token", result.data.data);
            navigation.getParent().setParams({ token: result.data.token });
              navigation.reset({
        index: 0,
        routes: [{ name: 'Tabs' }],
      });
          } else {
            Alert.alert('Wrong Email or Password,' + 'Try again');
          } 
        });
        } catch (error) {
          console.log("Error sign in", error);
          Alert.alert("Authentication error" + error);
        }
   
    }
  
  return (
    <View className='grid justify-items-center'>
      <TextInput value={email} className='mx-5 justify-center justify-items-center' placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
      <TextInput secureTextEntry={true} value={password} className='mx-5 justify-center justify-items-center' placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>
      <Button onPress={handleLogin}>Sign in</Button>
      <Text className='text-center px-5'>forgot password? <Link href={"/screens/ForgotPassword"} className='underline'>Click Here</Link></Text>
    </View>
  )
}

export default Login
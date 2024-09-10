import { View, Text, Alert } from 'react-native'
import React, {useState} from 'react'
import { FIREBASE_AUTH } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Button, TextInput } from 'react-native-paper';
import { AlertDialog} from 'tamagui';
import Products from '../Products';

import ForgotPassword from './ForgotPassword';
import { Link } from 'expo-router';


const Login = ({navigation} : {navigation: any}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const handleLogin = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Welcome" + email);
            console.log("Successfully sign in");
            navigation.navigate(Products)
        } catch (error) {
            console.log("Error sign in");
            alert("Wrong email or password");
        } finally {
            setLoading(false);
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
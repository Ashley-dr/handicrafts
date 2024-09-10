import { View, Text, Alert } from 'react-native'
import React, {useState} from 'react'
import { FIREBASE_AUTH } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Button, TextInput } from 'react-native-paper';
import { AlertDialog} from 'tamagui';
import Login from './Login';
const ForgotPassword = () => {
        const [email, setEmail] = useState('');
   
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

      const handleForgotPassword = async () => {
        setLoading(true);
   
        try {
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent to  " + "\n" + email + "\n" + "Check your inbox.");
            console.log("Email sent");
     
       
        } catch (error) {
            console.log("Error sent email");
            alert("Email not exist");
        } finally {
            setLoading(false);
        }
    }

  return (
      <View className=''>
      <TextInput value={email} className='mx-5 justify-center justify-items-center' placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
      {/* <TextInput secureTextEntry={true} value={password} className='mx-5 justify-center justify-items-center' placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput> */}
      <Button className="" onPress={handleForgotPassword} disabled={loading}>Change Password</Button>
    </View>
  )
}

export default ForgotPassword
import { View, Text, Alert } from 'react-native'
import React, {useState} from 'react'
import { FIREBASE_AUTH } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Button, TextInput } from 'react-native-paper';
import { AlertDialog} from 'tamagui';
import Login from './Login';

const Signup = ({navigation}:{navigation: any}) => {
      const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

  const handleSignup = async () => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Successfully sign up " + email);
            console.log("Successfully sign up");
            navigation.navigate(Login);
        } catch (error) {
        
            console.log("Error sign in");
            alert("Please try again");
        } finally {
            setLoading(false);
            
        }
    }

  return (
  <View>
      <TextInput value={email} className='mx-5 justify-center justify-items-center' placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
      <TextInput secureTextEntry={true} value={password} className='mx-5 justify-center justify-items-center' placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>
      <Button onPress={handleSignup}>Sign up</Button>
    </View>
  )
}

export default Signup
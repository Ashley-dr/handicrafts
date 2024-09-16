import { View, Text, Alert } from 'react-native'
import React, {useState} from 'react'
import { FIREBASE_AUTH } from '../firebase/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';
import Login from './Login';

const Signup = ({navigation}:{navigation: any}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [phoneNumber, setPhoneNum] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

  const inputs = () => {
    if(!email || !password || !confirmPassword || !fullname || !phoneNumber) {
      Alert.alert("All fields required");
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return false;
    }
    return true;
  }

  const handleSignup = async () => {
    if(!inputs()) return;
        setLoading(true);
        try {
            await axios.post(`http://192.168.1.19:8000/api/signup`, {email, password, fullname, phoneNumber}).then((result) => {
                Alert.alert("Successfully created: ", email);
            console.log("Successfully sign up" + result.data);
            navigation.navigate(Login);
            }).catch((err) => {
              if(err.result && err.result.data && err.result.data.error == "Email Already Exist"){
                Alert.alert("Sign up failed Account already exist", "Please use Another email");
              }
            });
          
        } catch (error) {
            console.error("Sign up Error", error);
      
        } finally {
            setLoading(false);
            
        }
    }
  return (
  <View>
    
     <TextInput value={fullname} className='mx-5 justify-center justify-items-center' placeholder='Fullname' autoCapitalize='none' onChangeText={(text) => setFullname(text)}></TextInput>


      <TextInput value={phoneNumber} className='mx-5 justify-center justify-items-center' keyboardType="phone-pad" placeholder='Phone Number'  onChangeText={(text) => setPhoneNum(text)}></TextInput>


      <TextInput value={email} className='mx-5 justify-center justify-items-center' placeholder='Email' autoCapitalize='none' onChangeText={(text) => setEmail(text)}></TextInput>
         
      <TextInput secureTextEntry={true} value={password} className='mx-5 justify-center justify-items-center' placeholder='Password' autoCapitalize='none' onChangeText={(text) => setPassword(text)}></TextInput>

      <TextInput secureTextEntry={true} value={confirmPassword} className='mx-5 justify-center justify-items-center' placeholder='Confirm Password' autoCapitalize='none' onChangeText={(text) => setConfirmPassword(text)}></TextInput>

      <Button onPress={handleSignup}>Sign up</Button>
    </View>
  )
}

export default Signup
import { View, Text, Alert } from 'react-native'
import React, {useState} from 'react'
import axios from 'axios'
import Login from './Login'
import { Button, TextInput } from 'react-native-paper'
const ResetPassword = ({navigation}:{navigation: any}) => {
    const [newPassword, setNewPassword] = useState('');
    const [token, setToken ] = useState('');

    const changePassword = async () => {
     if(!token || !newPassword){
         Alert.alert('Error', 'Please enter both the reset token and new password.');
            return;
       }
        try {
            const response = await axios.post(`http://192.168.1.19:8000/api/reset-password`, {token, newPassword}); 
             console.log('Password reset:', response.data);
      Alert.alert('Success', 'Your password has been reset successfully.', [
        { text: 'OK', onPress: () => navigation.navigate(Login) }
      ]);
        } catch (error) {
               console.error('Password reset error:', error);
      Alert.alert('Error', 'Failed to reset password. Please try again.');
   
        }
    }
  return (
    <View>
      <TextInput
   
        placeholder="Reset Token"
        value={token}
        onChangeText={setToken}
      />
      <TextInput
       
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <Button onPress={changePassword} >Submit</Button>
   
    </View>
  )
}

export default ResetPassword
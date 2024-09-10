import { View, Text, Alert } from 'react-native'
import React, {useState, useEffect} from 'react'




import { FIREBASE_AUTH } from '../firebase/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { Button } from 'react-native-paper';




// import { Button, Header, XGroup, XStack, YStack } from 'tamagui'
const ProfilePage = () => {

     const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH)
      Alert.alert("Log out", "You are now logged out");
      window.location.reload();
    } catch (error) {
      console.log("Error to log out");
    //   Alert.alert("Error to sign out please try again")
    }
  }
  return (
    <View>
      <Button onPress={handleLogout}>Log out</Button>
    </View>
  )
}

export default ProfilePage
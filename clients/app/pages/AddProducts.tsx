import { View, Text, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AddProducts = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log("Token:", token);

      if (token) {
        const response = await axios.post('http://192.168.1.3:8000/api/user-data', { token });
        console.log("User Data:", response.data);
        setUserData(response.data.data); 
      } else {
        console.log("No token found");
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      <Text>AddProducts</Text>
    </View>
  )
}

export default AddProducts
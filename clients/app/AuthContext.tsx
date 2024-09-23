import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export async function getToken() {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.log("Error getting token:", error);
    return null;
  }
}

export async function verifyToken(token: any) {
  try {
    const response = await axios.post('http://192.168.1.3:8000/api/user-data', { token });
    return response.data.data ? true : false;
  } catch (error) {
    console.log("Error verifying token:", error);
    return false;
  }
}
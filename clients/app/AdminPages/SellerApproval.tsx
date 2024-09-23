import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select } from 'tamagui';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
const API_URL = "http://192.168.1.19:8000";
const SellerApproval = () => {
  const [ users, setUsers ] = useState([]); 
  const [ isUpdate, setIsUpdate ] = useState(null);
  const [ isNewSeller, setIsNewSeller ] = useState("");
const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/all-users`);
      setUsers(res.data);
    } catch (error) {
      console.error(error);
    }
  }
    useEffect(() => {
    fetchUsers();
  }, []);
 
  const handleUpdate = async (id : any) => {
    try {
        await axios.put(`${API_URL}/api/user-update/${id}`, { isSeller: isNewSeller})
        fetchUsers();
        setIsNewSeller("");  
        setIsUpdate(null);
    } catch (error) {
        console.error(error);
    }
  }

 
  return (
   <View >
     {users && users.map((users : any, index) => (
      <View key={index}>
        
        {users.isSeller === "false" && (
          <View className='mx-5'>
      
        <Text>{users.email}</Text>
        <Text>{users.fullname}</Text>
        <View className=''>
       <Pressable className="bg-blue-500 p-2 rounded my-2" onPress={() => setIsUpdate(users._id)}>
                <Text className="text-white text-center">View Info</Text>
              </Pressable>
     
        </View>
        {isUpdate == users._id && (
            <View className='mx-2 mt-5 border pt-5 '>
              <View className='grid grid-cols-2'>
              <Text>{users.phoneNumber}</Text>
              <Text className=''>{isNewSeller == "true" ? (<Text>Approved</Text>) : (<Text>Declined</Text>)}</Text>
                 <Pressable className="bg-green-700 p-2 w-32" onPress={() => setIsNewSeller("true")}>
                    <Text className="text-white text-center">Approve</Text>
                  </Pressable>

                  <Pressable className="bg-red-700 p-2 w-32" onPress={() => setIsNewSeller("null")}>
                    <Text className="text-white text-center">Decline</Text>
                  </Pressable>
              </View>
               <View className='grid grid-cols-2'>
               

                  <Pressable className="bg-gray-900 p-2 " onPress={() => setIsUpdate(null)}>
                    <Text className="text-white text-center">Cancel</Text>
                  </Pressable>

                  <Pressable className="bg-blue-900 p-2 " onPress={() => handleUpdate(users._id)}>
                    <Text className="text-white text-center">Save</Text>
                  </Pressable>
                  </View>
            </View>
        )}
        </View>
        )}





      {users.isSeller === "true" && (
          <View>
         
        <Text>{users.email}</Text>
        <Text>{users.fullname}</Text>
        <Text>{users.isSeller === "true" && (<Text>Verified seller</Text>)}</Text>
          <Pressable className="bg-blue-500 p-2 rounded my-2" onPress={() => setIsUpdate(users._id)}>
                <Text className="text-white text-center">Update</Text>
              </Pressable>
     

        {isUpdate == users._id && (
            <View>
                <TextInput value={isNewSeller}></TextInput>
                    <Pressable className="bg-blue-500 p-2 rounded my-2" onPress={() => handleUpdate(users._id)}>
                    <Text className="text-white text-center">Update</Text>
                  </Pressable>
            </View>
        )}
        </View>
        )}
      </View>
     ))}
    </View>
  )
  
}

export default SellerApproval
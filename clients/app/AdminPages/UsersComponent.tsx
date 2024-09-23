import { View, Text, Button, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown'

const API_URL = "http://192.168.1.3:8000";

const UsersComponent = () => {
  const [ users, setUsers ] = useState([]); 

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

 const handleDelete = async (id: any) => { 
    try {
    await axios.delete(`${API_URL}/api/user-delete/${id}`);
    fetchUsers();
    } catch (error) {
    console.log("Connot remove", id);
    console.error(error);
    }
  }
  return (
    <View >
     {users && users.map((users : any, index) => (
      <View key={index}>
        <Text>{users.email}</Text>
        <Button title='Delete' onPress={() => handleDelete(users._id)}/>
        
      </View>
     ))}
    </View>
  )
}

export default UsersComponent
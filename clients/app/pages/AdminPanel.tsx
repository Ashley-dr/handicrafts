import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import axios from "axios";
import UsersComponent from "../AdminPages/UsersComponent";
import { Link } from "expo-router";
import { Button } from "react-native-paper";

const AdminPanel = () => {
  return (
    <View className="">
      <View className="mt-5 space-y-2">
        <Link
          className="p-5 bg-gray-200 mx-5"
          href={"/AdminPages/UsersComponent"}
        >
          <Button className="px-5 bg-gray-200 mt-5 p-2  rounded-sm">
            Users
          </Button>
        </Link>

        <Link
          className="p-5 bg-gray-200 mx-5"
          href={"/AdminPages/SellerApproval"}
        >
          <Button className="px-5 bg-gray-200 mt-5 p-2  rounded-sm">
            Seller's approval
          </Button>
        </Link>

        <Link
          className="p-5 bg-gray-200 mx-5"
          href={"/AdminPages/ProductsApproval"}
        >
          <Button className="px-5 bg-gray-200 mt-5 p-2  rounded-sm">
            Products Approval
          </Button>
        </Link>
      </View>
    </View>
  );
};

export default AdminPanel;

import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import { Button, Searchbar, TextInput } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomizeCarouselSquare from "../components/CustomizeCarouselSquare";
import Items from "../components/Items";
import { AnimatedScrollView } from "react-native-reanimated/lib/typescript/reanimated2/component/ScrollView";
const Products = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const data = [
    { id: 1, title: "Item 1", img: require("../images/handicraft1.jpg") },
    { id: 2, title: "Item 2", img: require("../images/handicraft2.jpg") },
    { id: 3, title: "Item 3", img: require("../images/handicraft3.jpg") },
  ];
  return (
    <ScrollView>
      <View className="">
        <Button
          icon={() => (
            <MaterialCommunityIcons name="text" size={40} color={"black"} />
          )}
          className=" w-15  absolute ml-2 mt-5"
          children={undefined}
        />
        <Text className="font-thin text-center text-3xl mt-5">
          Explore <Text className="font-bold">Handicraft</Text>
        </Text>
        <View>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            className="mx-6 border-2 mt-5 bg-transparent"
          />
        </View>
      </View>
      <SafeAreaView className=" bg-white">
        <CustomizeCarouselSquare data={data} />
      </SafeAreaView>
      <View className=" bg-white">
        <Items />
      </View>
    </ScrollView>
  );
};

export default Products;

import {
  View,
  Text,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { Button, Card } from "react-native-paper";

const Items = () => {
  const { width } = useWindowDimensions();
  const SIZE = width * 0.45;
  const data = [
    {
      id: 1,
      title: "Item 1",
      article: "Item 1",
      img: require("../images/handicraft1.jpg"),
    },
    {
      id: 2,
      title: "Item 2",
      article: "Item 1",
      img: require("../images/handicraft2.jpg"),
    },
    {
      id: 3,
      title: "Item 3",
      article: "Item 1",
      img: require("../images/handicraft3.jpg"),
    },
    {
      id: 4,
      title: "Item 4",
      article: "Item 1",
      img: require("../images/handicraft3.jpg"),
    },
    {
      id: 5,
      title: "Item 5",
      article: "Item 1",
      img: require("../images/handicraft3.jpg"),
    },
    {
      id: 6,
      title: "Item 6",
      article: "Item 1",
      img: require("../images/handicraft3.jpg"),
    },
  ];

  return (
    <ScrollView className="bg-gray-100 mt-2 pt-2">
      <View style={styles.gridContainer}>
        {data.map((item, index) => (
          <View style={[styles.gridItem, { width: SIZE }]} key={index}>
            <Card className="mb-2">
              <Card.Cover className="p-3" source={item.img} />
              <Card.Content className="">
                <Text>{item.title}</Text>
                <Text>{item.article}</Text>
                <Button className="bg-gray-200">View</Button>
              </Card.Content>
            </Card>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  gridItem: {
    marginBottom: 10,
  },
});

export default Items;

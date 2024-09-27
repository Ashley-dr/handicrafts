import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
  StyleSheet,
  Animated,
} from "react-native";
import React from "react";

const CustomizeCarouselSquare = ({ data }: { data: any }) => {
  const { width } = useWindowDimensions();
  const SIZE = width * 0.7;
  return (
    <Animated.ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate={"fast"}
      snapToInterval={SIZE}
      scrollEventThrottle={16}
    >
      {data.map((item: any, index: React.Key | null | undefined) => {
        return (
          <View className="p-3" key={index} style={{ width: SIZE }}>
            <View className="mt-5 overflow-hidden grid">
              <Text className="mt-60  mx-2 absolute z-10 text-2xl text-white">
                {item.title}
              </Text>

              <Image
                className="w-full bg-cover rounded-xl bg-fixed bg-no-repeat h-80 "
                source={item.img}
              />
            </View>
          </View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default CustomizeCarouselSquare;

import { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import data from "../data/data.json";
import CardStory from "../components/card/Card";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const Home = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [imageActive, setImageActive] = useState(0);

  const objImage = [
    "https://64.media.tumblr.com/aa4866a7045a444e0b822577aed5885b/66f44833788aa4c3-15/s1280x1920/389c9bd703a8d7a60840a1b0f7da49202cffaf8b.jpg",
    "https://64.media.tumblr.com/536aec474721dfc80ab1a8b9b617675a/f9424209bf94aecc-a3/s250x400/e1103fd2611a898746184e5943aa034df3732cd6.jpg",
    "https://64.media.tumblr.com/10e09a995fdf628fe391bd5b2cb90c66/cf3b62bbe7b22750-b7/s250x400/03963a36a2550dd2e8344d82d772b8f962b3209b.jpg",
    "https://64.media.tumblr.com/ea1cf2d6cba94c064b00dd3552ad8d3e/04558b47f179c411-a1/s250x400/e45acaa66ae83106ded8e53f2f2fd9005ebf212a.jpg",
  ];

  const handlerDetail = (item) => {
    navigation.navigate("detail", { data: item });
  };

  const renderFilteredData = () => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {filteredData.map((item, index) => (
          <TouchableOpacity
            onPress={() => handlerDetail(item)}
            key={index}
            style={{ width: "50%", paddingHorizontal: 5 }}
          >
            <CardStory
              image={item.image}
              name={item.name}
              chapter={item.chapter}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  const handleScroll = (nativeEvent) => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != imageActive) setImageActive(slide);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
          padding: 5,
        }}
        placeholder="Nhập tiêu đề truyện..."
        onChangeText={setSearch}
        value={search}
      />
      <View style={styles.warpContainer}>
        <ScrollView
          onScroll={({ nativeEvent }) => handleScroll(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.warp}
        >
          {objImage.map((e, index) => (
            <Image
              key={e}
              resizeMode="stretch"
              style={styles.warp}
              source={{ uri: e }}
            />
          ))}
        </ScrollView>
        <View style={styles.warpDot}>
          {objImage.map((e, index) => (
            <Text
              key={e}
              style={imageActive == index ? styles.dotActive : styles.dot}
            >
              ●
            </Text>
          ))}
        </View>
      </View>
      <ScrollView style={{ marginBottom: 80 }}>
        {renderFilteredData()}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
  },
  warpContainer: {
    marginVertical: 20,
  },
  warp: {
    width: WIDTH,
    height: HEIGHT * 0.25,
  },
  warpDot: {
    marginVertical: 20,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dotActive: {
    fontSize: 24,
    margin: 3,
    color: "#fff",
  },
  dot: {
    fontSize: 20,
    margin: 3,
    color: "#000",
  },
});

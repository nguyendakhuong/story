import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import APP_LOCAL from "../lib/localStorage";
import jsonData from "../data/data.json";
import CardStory from "../components/card/Card";
import { useFocusEffect } from "@react-navigation/native";
const Follow = ({ navigation }) => {
  const [followedIds, setFollowedIds] = useState([]);
  const [data, setData] = useState([]);

  const fetchFollowedIds = async () => {
    const ids = await APP_LOCAL.getFollowedIds();
    setFollowedIds(ids);
  };

  useFocusEffect(
    useCallback(() => {
      fetchFollowedIds();
    }, [])
  );

  useEffect(() => {
    const filterData = () => {
      const matchedData = jsonData.filter((item) =>
        followedIds.includes(item.id)
      );
      setData(matchedData);
    };
    if (followedIds.length > 0) {
      filterData();
    } else {
      setData([]);
    }
  }, [followedIds]);

  const handlerDetail = (item) => {
    navigation.navigate("detail", { data: item });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlerDetail(item)}
      style={{ width: "50%", paddingHorizontal: 5 }}
    >
      <CardStory image={item.image} name={item.name} chapter={item.chapter} />
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {data.length > 0 ? (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.text}>Bạn chưa theo dõi truyện nào</Text>
        </View>
      )}
    </View>
  );
};

export default Follow;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    width: "100%",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "#000",
  },
});

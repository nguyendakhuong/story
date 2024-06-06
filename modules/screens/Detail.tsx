import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import APP_LOCAL from "../lib/localStorage";
import { useEffect, useState } from "react";

const Detail = ({ route }) => {
  const { data } = route.params;
  const [checkFollow, setCheckFollow] = useState(false);
  const [followedIds, setFollowedIds] = useState([]);

  useEffect(() => {
    const fetchFollowedIds = async () => {
      const ids = await APP_LOCAL.getFollowedIds();
      setFollowedIds(ids);
      if (ids.includes(data.id)) {
        setCheckFollow(true);
      }
    };
    fetchFollowedIds();
  }, []);

  const status = {
    1: "Truyện mới",
    2: "Đang cập nhật",
    3: "Hoàn thành",
  };
  const renderChapterItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectChapter(item)}>
      <Text style={styles.chapterItem}>Chapter {item}</Text>
    </TouchableOpacity>
  );

  const handleSelectChapter = (id) => {
    console.log(id);
  };

  const handleFollow = async () => {
    try {
      let newFollowedIds;
      if (checkFollow) {
        newFollowedIds = followedIds.filter((id) => id !== data.id);
        setCheckFollow(false);
      } else {
        newFollowedIds = [...followedIds, data.id];
        setCheckFollow(true);
      }
      setFollowedIds(newFollowedIds);
      await APP_LOCAL.setFollowedIds(newFollowedIds);
    } catch (error) {
      console.log(error);
    }
  };

  const chapterList = Array.from(
    { length: data.chapter },
    (_, index) => index + 1
  );
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: data.image }} style={styles.image} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.text}>Chapter: {data.chapter}</Text>
          <Text style={styles.text}>Tác giả: {data.author}</Text>
          <Text style={styles.text}>Thể loại: {data.category}</Text>
          <Text style={styles.text}>Tình trạng: {status[data.status]}</Text>
          <Text style={styles.text}>Cập nhật: {data.update}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.follow} onPress={handleFollow}>
        <Text style={styles.textFollow}>
          {checkFollow === true ? "Đang theo dõi" : "Theo dõi"}
        </Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.textInfo}>Giới thiệu</Text>
        <Text>{data.info}</Text>
      </View>
      <View>
        <Text style={styles.textInfo}>Mục lục</Text>
      </View>
      <FlatList
        style={{ paddingVertical: 10 }}
        data={chapterList.reverse()}
        renderItem={renderChapterItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 10,
  },
  containerInfo: {
    flexDirection: "row",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: "cover",
    borderRadius: 5,
  },
  infoContainer: {
    flex: 2,
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  follow: {
    height: 40,
    backgroundColor: "#0033CC",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  textFollow: {
    fontSize: 20,
    color: "#fff",
  },
  textInfo: {
    fontWeight: "800",
    fontSize: 22,
  },
  chapterItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

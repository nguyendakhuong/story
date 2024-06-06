import { Image, StyleSheet, Text, View } from "react-native";

const CardStory = ({ image, name, chapter }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}>
          {name}
        </Text>
        <Text style={styles.chapter}>Chapter: {chapter}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textContainer: {
    padding: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  chapter: {
    fontSize: 14,
    color: "#555",
    marginTop: "auto", // Move to the bottom
  },
});
export default CardStory;

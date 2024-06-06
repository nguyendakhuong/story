import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import APP_LOCAL from "../lib/localStorage";

const Account = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await APP_LOCAL.getTokenStorage();
      setIsLoggedIn(!!token);
      setLoading(false);
    };
    checkLoginStatus();
  }, [isLoggedIn]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const handlerLogout = async () => {
    await APP_LOCAL.setTokenStorage("");
    navigation.navigate("login");
  };
  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <TouchableOpacity onPress={handlerLogout} style={styles.view}>
          <Text style={styles.logout}>Đăng xuất !</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text>Bạn chưa đăng nhập tài khoản.</Text>
          <Button
            title="Đăng nhập"
            onPress={() => navigation.navigate("login")}
          />
        </>
      )}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logout: {
    color: "#fff",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    fontSize: 20,
    textDecorationLine: "underline",
  },
  view: {
    width: "80%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#0033CC",
  },
});

import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FIREBASE_AUTH } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import APP_LOCAL from "../../lib/localStorage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const Login = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("aaaa", response);
      const token = await response.user.getIdToken();
      await APP_LOCAL.setTokenStorage(token);
      navigation.navigate("bottom tab");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Đăng nhập</Text>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(v) => {
            setEmail(v);
          }}
        />
        <TextInput
          value={password}
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(v) => {
            setPassword(v);
          }}
          secureTextEntry={true}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#000ff" />
        ) : (
          <>
            <Button title="Đăng nhập" onPress={Login} />
            <View>
              <Text>Bạn chưa có tài khoản?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("signUp")}>
                <Text style={styles.signUpText}>Đăng ký ngay !</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    flex: 1,
    justifyContent: "center",
  },
  input: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  signUpText: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

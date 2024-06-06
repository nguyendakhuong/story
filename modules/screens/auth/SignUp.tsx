import { useState } from "react";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { FIREBASE_AUTH } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ navigator }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const createAccount = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      navigator.navigate("login");
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Đăng ký tài khoản</Text>
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
            <Button title="Đăng ký" onPress={createAccount} />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default SignUp;

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
});

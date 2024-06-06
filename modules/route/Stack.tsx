import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTab from "./BottomTab";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";
import Detail from "../screens/Detail";

const StackNavigator = createNativeStackNavigator();
export default function Stack() {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="bottom tab"
        component={BottomTab}
        options={{ headerShown: false }}
      />
      <StackNavigator.Screen
        name="login"
        component={Login}
        options={{ headerShown: false }}
      />
      <StackNavigator.Screen
        name="signUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <StackNavigator.Screen
        name="detail"
        component={Detail}
        options={{ headerTitle: "Chi tiết" }}
      />
    </StackNavigator.Navigator>
  );
}

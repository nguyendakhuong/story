import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, StyleSheet } from "react-native";
import Home from "../screens/Home";
import Follow from "../screens/Folow";
import { regular } from "../utils/fonts";
import Account from "../screens/Account";

const BottomTabNavigation = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <BottomTabNavigation.Navigator
      screenOptions={{
        tabBarLabelStyle: styles.label,
        tabBarStyle: [
          styles.tabContainer,
          Platform.OS === "ios" && {
            shadowOffset: { height: -2, width: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
          },
        ],
        tabBarItemStyle: {
          marginBottom: 7,
        },
        tabBarInactiveTintColor: "gray",
        tabBarActiveTintColor: "#0071ff",
      }}
      safeAreaInsets={{
        bottom: 0,
      }}
    >
      <BottomTabNavigation.Screen
        name="Trang chủ"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={22}
              color={focused ? "#0071ff" : "gray"}
            />
          ),
        }}
      />
      <BottomTabNavigation.Screen
        name="Truyện theo dõi"
        component={Follow}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="up"
              size={22}
              color={focused ? "#0071ff" : "gray"}
            />
          ),
        }}
      />
      <BottomTabNavigation.Screen
        name="Tài khoản"
        component={Account}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="setting"
              size={22}
              color={focused ? "#0071ff" : "gray"}
            />
          ),
        }}
      />
    </BottomTabNavigation.Navigator>
  );
}
const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    width: "90%",
    borderRadius: 12,
    left: "5%",
    bottom: 20,
    backgroundColor: "white",
    height: 60,
  },
  label: {
    textTransform: "capitalize",
    ...regular,
    fontSize: 12,
  },
});

import AsyncStorage from "@react-native-async-storage/async-storage";

export const KEY_LOCAL = {
  TOKEN: "userToken",
  FOLLOWED_IDS: "followedIds",
};

const getTokenStorage = async () => {
  try {
    return await AsyncStorage.getItem(KEY_LOCAL.TOKEN);
  } catch (error) {
    console.error("Error getting token from storage", error);
    return null;
  }
};

const setTokenStorage = async (token) => {
  try {
    await AsyncStorage.setItem(KEY_LOCAL.TOKEN, token);
  } catch (error) {
    console.error("Error setting token in storage", error);
  }
};
const getFollowedIds = async () => {
  try {
    const storedIds = await AsyncStorage.getItem(KEY_LOCAL.FOLLOWED_IDS);
    return storedIds ? JSON.parse(storedIds) : [];
  } catch (error) {
    console.error("Error getting followed IDs from storage", error);
    return [];
  }
};

const setFollowedIds = async (ids) => {
  try {
    await AsyncStorage.setItem(KEY_LOCAL.FOLLOWED_IDS, JSON.stringify(ids));
  } catch (error) {
    console.error("Error setting followed IDs in storage", error);
  }
};

const APP_LOCAL = {
  getTokenStorage,
  setTokenStorage,
  getFollowedIds,
  setFollowedIds,
};

export default APP_LOCAL;

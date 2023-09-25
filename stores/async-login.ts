import { User } from "./interfaces";

import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserData = async (userData: User): Promise<void> => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  } catch (error) {
    console.error("Error saving data", error);
  }
};

export const retrieveUserData = async (): Promise<User | null> => {
  try {
    const userDataJson = await AsyncStorage.getItem('user');
    if (userDataJson !== null) {
      return JSON.parse(userDataJson);
    }
  } catch (error) {
    console.error("Error retrieving data", error);
  }
  return null;
};

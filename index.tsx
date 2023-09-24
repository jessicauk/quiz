import { StyleSheet } from "react-native";
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StackNavigator from "./stack-navigator";

export const Stack = createNativeStackNavigator<ParamListBase>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StyleSheet } from "react-native";
import { StatusBar } from 'expo-status-bar';
import RootNavigator from "./index";

export default function App() {
  return (
    <>
      <RootNavigator />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efb0ff",
    alignItems: "center",
    justifyContent: "center",
  },
});

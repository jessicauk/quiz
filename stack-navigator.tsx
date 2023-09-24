import { StyleSheet } from "react-native";
import { ParamListBase } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Login from "./screens/login";
import Dashboard from "./screens/dashboard";
import Quiz from "./screens/quiz";
import Score from "./screens/score";
import { StackNavigation } from "./types/stack-navigator";

const queryClient = new QueryClient();
export const Stack = createNativeStackNavigator<StackNavigation>();

export default function StackNavigator() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Quiz" component={Quiz} />
        <Stack.Screen name="Score" component={Score} />
      </Stack.Navigator>
    </QueryClientProvider>
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

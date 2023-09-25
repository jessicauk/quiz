import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Login from "./screens/login";
import Dashboard from "./screens/dashboard";
import Quiz from "./screens/quiz";
import Score from "./screens/score";
import { StackNavigation } from "./types/stack-navigator";
import Logout from "./components/logout";

const queryClient = new QueryClient();
export const Stack = createNativeStackNavigator<StackNavigation>();

export default function StackNavigator() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerRight: () => <Logout />,
          headerStyle: styles.headerStyle,
          headerTintColor: "#fff",
          headerTitleStyle: styles.headerTitleStyle,
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: "Dashboard" }}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{ title: "Quiz" }}
        />
        <Stack.Screen
          name="Score"
          component={Score}
          options={{ title: "Score" }}
        />
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
  headerStyle: {
    backgroundColor: "#efb0ff",
    padding: 10,
  },
  headerTitleStyle: {
    fontWeight: "bold",
  },
});

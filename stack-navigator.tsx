import { StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
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
        screenOptions={({ navigation }) => ({
          headerRight: () => <Logout />,
          /* headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back"
                color="white"
                size={25}
                iconStyle={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          ), */
          headerStyle: styles.headerStyle,
          headerTintColor: "#fff",
          headerTitleStyle: styles.headerTitleStyle,
        })}
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: "Dashboard",
            headerLeft: () => (
              <TouchableOpacity>
                <Icon
                  name="arrow-back"
                  color="white"
                  size={25}
                  iconStyle={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={({ navigation }) => ({
            title: "Quiz",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-back"
                  color="white"
                  size={25}
                  iconStyle={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Score"
          component={Score}
          options={({ navigation }) => ({
            title: "Score",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon
                  name="arrow-back"
                  color="white"
                  size={25}
                  iconStyle={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            ),
          })}
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

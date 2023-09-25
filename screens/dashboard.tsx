import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { DashboardScreenNavigationProp } from "../types/stack-navigator";
import Logout from "../components/logout";
import { Colors } from "../const";

export default function Dashboard() {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient style={styles.gradient} colors={Colors}>
        <ScrollView>
          <View>
            <Text style={styles.title}>Welcome to Quizz App!</Text>
          </View>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              style={styles.image}
              alt="user-mobile"
              source={require("../assets/user-mobile-2.png")}
            />
          </View>
          <View style={styles.container}>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("Quiz")}
              >
                <Text style={styles.text}>START QUIZ</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <Logout />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
  gradient: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    textAlign: "center",
    color: "#FFF",
    marginVertical: 100,
  },
  image: {
    resizeMode: "contain",
    width: 300,
    height: 300,
    margin: "auto",
    marginBottom: 40,
  },
  text: {
    color: "#FFF",
    fontWeight: "600",
    textAlign: "center",
  },
  buttonContainer: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#8851c1",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 50,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "700",
  },
});

import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
import { Image } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { DashboardScreenNavigationProp } from "../types/stack-navigator";

export default function Dashboard() {
  const navigation = useNavigation<DashboardScreenNavigationProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.container}>
          <Image style={styles.image} source={require("../assets/quiz.png")} />
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efb0ff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: "contain",
    marginBottom: 40,
  },
  text: {
    color: "#FFF",
    fontWeight: "600",
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
  },
});

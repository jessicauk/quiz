import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Pressable,
  Image,
} from "react-native";
import { Input, Icon } from "@rneui/themed";
import { LoginScreenNavigationProp } from "../types/stack-navigator";
import { useLoginStore } from "../stores/login";
import { LinearGradient } from "expo-linear-gradient";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { defaultUser, setIsLoggedIn } = useLoginStore();

  const onLogin = () => {
    if (
      password === defaultUser?.password &&
      username === defaultUser?.username
    ) {
      setIsLoggedIn();
      navigation.navigate("Dashboard");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={["#8851c1", "#a269d1", "#bc81e0", "#d598f0", "#efb0ff"]}
      >
        <ScrollView>
          <View style={styles.imageContainer}>
            <View>
              <Image
                style={{
                  ...styles.image,
                  top: 20,
                  transform: [
                    { translateX: 20 },
                    { translateY: 50 },
                    { rotate: "-15deg" },
                  ],
                }}
                source={require("../assets/user-1.png")}
              />
              <Image
                style={{
                  ...styles.image,
                  top: 30,
                  left: 100,
                  transform: [
                    { translateX: 50 },
                    { translateY: 50 },
                    { rotate: "-5deg" },
                  ],
                }}
                source={require("../assets/user-5.png")}
              />
              <Image
                style={{
                  ...styles.image,
                  top: 160,
                  left: -40,
                  transform: [
                    { translateX: 50 },
                    { translateY: 50 },
                    { rotate: "15deg" },
                  ],
                }}
                source={require("../assets/user-5.png")}
              />
              <Image
                style={{
                  ...styles.image,
                  width: 200,
                  height: 200,
                  top: 160,
                  left: 90,
                  transform: [
                    { translateX: 50 },
                    { translateY: 50 },
                    { rotate: "-15deg" },
                  ],
                }}
                source={require("../assets/user-7.png")}
              />
              <Image
                style={{
                  ...styles.image,
                  top: 110,
                  right: 80,
                  transform: [
                    { translateX: 60 },
                    { translateY: -20 },
                    { rotate: "20deg" },
                  ],
                }}
                source={require("../assets/question-mark.png")}
              />
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Let's Get</Text>
            <Text style={styles.text}>Started</Text>
          </View>
          <View style={styles.form}>
            <Input
              inputContainerStyle={styles.input}
              containerStyle={{ width: "100%" }}
              inputStyle={{ color: "#fff" }}
              placeholder="username"
              value={username}
              leftIcon={<Icon name="person" size={24} color="#fff" />}
              onChangeText={setUsername}
            />
            <Input
              inputContainerStyle={styles.input}
              containerStyle={{ width: "100%" }}
              inputStyle={{ color: "#fff" }}
              placeholder="password"
              value={password}
              secureTextEntry={true}
              leftIcon={<Icon name="lock" size={24} color="#fff" />}
              onChangeText={setPassword}
            />
            <Pressable
              disabled={!username && !password}
              onPress={onLogin}
              style={styles.button}
            >
              <Text style={{ color: "#fff", fontSize: 15, fontWeight: "700" }}>
                LOG IN
              </Text>
            </Pressable>
          </View>
          <StatusBar style="auto" />
        </ScrollView>
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
  imageContainer: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 25,
    position: "absolute",
  },
  form: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    paddingVertical: 550,
    paddingHorizontal: 10,
    resizeMode: "center",
  },
  input: { width: "100%" },
  button: {
    backgroundColor: "#8851c1",
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    color: "#fff",
  },
  text: { fontSize: 40, fontWeight: "800", color: "#fff" },
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
    paddingHorizontal: 15,
    position: "absolute",
    top: 420,
  },
});

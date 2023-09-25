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
} from "react-native";
import { Input, Icon } from "@rneui/themed";
import { LoginScreenNavigationProp } from "../types/stack-navigator";
import { useLoginStore } from "../stores/login";

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
      <ScrollView>
        <View style={styles.form}>
          <Input
            inputContainerStyle={styles.input}
            containerStyle={{ width: "100%"}}
            placeholder="username"
            value={username}
            leftIcon={<Icon name="person" size={24} color="black" />}
            onChangeText={setUsername}
          />
          <Input
            inputContainerStyle={styles.input}
            containerStyle={{ width: "100%"}}
            placeholder="password"
            value={password}
            secureTextEntry={true}
            leftIcon={<Icon name="visibility" size={24} color="black" />}
            onChangeText={setPassword}
          />
          <Pressable
            disabled={!username && !password}
            onPress={onLogin}
            style={styles.button}
          >
            <Text>LOG IN</Text>
            <Icon name="login" />
          </Pressable>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efb0ff",
  },
  form: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100,
    paddingHorizontal: 10
  },
  input: { width: "100%"},
  button: {
    backgroundColor: "#8851c1",
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
});

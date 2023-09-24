import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, SafeAreaView, ScrollView } from "react-native";
import { Input, Icon, Button } from "@rneui/themed";
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
            placeholder="username"
            value={username}
            leftIcon={<Icon name="person" size={24} color="black" />}
            onChangeText={setUsername}
          />
          <Input
            placeholder="password"
            value={password}
            secureTextEntry={true}
            leftIcon={<Icon name="visibility" size={24} color="black" />}
            onChangeText={setPassword}
          />
          <Button
            disabled={!username && !password}
            onPress={onLogin}
            loadingProps={{
              size: "small",
              color: "rgba(111, 202, 186, 1)",
            }}
            titleStyle={{ fontWeight: "700" }}
            buttonStyle={{
              backgroundColor: "rgba(92, 99,216, 1)",
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5,
              paddingVertical: 10,
            }}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
          >
            LOG IN
            <Icon name="login" />
          </Button>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  form: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 100,
  },
  button: {
    borderRadius: 16,
  },
});

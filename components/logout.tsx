import React from "react";
import { Button, Icon } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../context/authentication-context";
import { ScoreScreenNavigationProp } from "../types/stack-navigator";

export const Logout: React.FunctionComponent<{}> = () => {
  const { setUser } = useAuth();
  const navigation = useNavigation<ScoreScreenNavigationProp>();

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
      navigation.navigate("Login")
    } catch (error) {
      console.error("Error logging out", error);
    }
  };
  const onLogout = () => {
    logout();
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-end",
        alignContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Button
        title="Log out"
        icon={
          <Icon
            name="logout"
            color="white"
            size={25}
            iconStyle={{ marginRight: 10 }}
          />
        }
        onPress={onLogout}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: "#8851c1",
    marginTop: 10,
    marginBottom: 10,
  },
  textPrimary: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  textSecondary: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 17,
  },
});

export default Logout;

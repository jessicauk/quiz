import React from "react";
import {
  View,
  StyleSheet,
  Text,
} from "react-native";

interface ItemProps {
  text: string;
}

export const Item = ({ text }: ItemProps) => {
  return (
    <View style={styles.item}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
  },
  text: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

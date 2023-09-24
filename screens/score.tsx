import React, { useState, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, ScrollView, Text } from "react-native";

import { useRoute } from "@react-navigation/native";

export default function Score() {
  const { params } = useRoute();
  console.log("params", params);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Text>Your Results</Text>
        </View>
        <View>
          <Text>Questions Answered</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efb0ff",
    paddingHorizontal: 10,
  },
});

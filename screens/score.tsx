import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text
} from "react-native";

export default function Score() {
  

  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
         <Text>Result</Text>
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

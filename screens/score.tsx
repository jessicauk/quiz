import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon, ListItem } from "@rneui/base";
import { Answer } from "../stores/interfaces";
import {
  ScoreScreenRouteProp,
  ScoreScreenNavigationProp,
} from "../types/stack-navigator";
import { useQueryClient } from "@tanstack/react-query";

export default function Score() {
  const { params } = useRoute<ScoreScreenRouteProp>();
  const navigation = useNavigation<ScoreScreenNavigationProp>();
  const queryClient = useQueryClient();

  const { answers, points } = params;

  const onPress = () => {
    queryClient.invalidateQueries(["quiz"]).then(() => {
      // Once the query is invalidated and refetched, navigate to another screen
      navigation.navigate("Quiz");
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Your Results</Text>
          </View>
          <View>
            <Text style={styles.subtitle}>Questions Answered</Text>
          </View>
        </View>
        <View>
          {answers?.map((item: Answer) => (
            <ListItem
              key={item.question}
              containerStyle={{ backgroundColor: "red" }}
            >
              <ListItem.Content style={styles.content}>
                <View>
                  <Text>{item.question}</Text>
                </View>
                <ListItem.Title>
                  <Icon
                    style={styles.icon}
                    name={item.answer ? "check-circle" : "cancel"}
                  />
                  {item.answer ? "Correct" : "Wrong"}
                </ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
        <View style={styles.footer}>
          <View>
            <Text style={styles.title}>Points</Text>
          </View>
          <View>
            <Text style={styles.subtitle}>{points}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>PLAY AGAIN</Text>
          </Pressable>
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
    justifyContent: "center",
    alignContent: "center",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  title: {
    fontWeight: "800",
    fontSize: 30,
    marginVertical: 15,
  },
  subtitle: {
    fontWeight: "400",
    fontSize: 20,
    fontStyle: "normal",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    alignItems: "center",
  },
  icon: { color: "#fff", verticalAlign: "middle" },
  footer: {
    flex: 1,
    backgroundColor: "#efb0ff",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
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
  text: {
    color: "#FFF",
    fontWeight: "600",
  },
});

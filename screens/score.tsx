import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Pressable,
} from "react-native";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Icon, ListItem } from "@rneui/base";
import { LinearGradient } from "expo-linear-gradient";

import { Answer } from "../stores/interfaces";
import {
  ScoreScreenRouteProp,
  ScoreScreenNavigationProp,
} from "../types/stack-navigator";
import { Colors } from "../const";

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
      <LinearGradient style={styles.gradient} colors={Colors}>
        <ScrollView>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Your Result</Text>
            </View>
            <View>
              <Text style={styles.subtitle}>Questions Answered</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <View style={{ width: "50%", height: "100%" }}>
              {answers?.slice(0, answers.length / 2).map((item: Answer) => (
                <ListItem
                  key={item.question}
                  containerStyle={{
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItem.Content style={styles.content}>
                    <View>
                      <Text>{item.question}</Text>
                    </View>
                    <ListItem.Title>
                      <Icon
                        type="material-ui"
                        style={{
                          backgroundColor: "#fff",
                          borderRadius: 15,
                        }}
                        color={item.answer ? "#0bad51" : "#fc325b"}
                        name={item.answer ? "check-circle" : "cancel"}
                      />
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              ))}
            </View>
            <View style={{ width: "50%" }}>
              {answers
                ?.slice(answers.length / 2, answers.length)
                .map((item: Answer) => (
                  <ListItem
                    key={item.question}
                    containerStyle={{
                      backgroundColor: "transparent",
                    }}
                  >
                    <ListItem.Content style={styles.content}>
                      <View>
                        <Text>{item.question}</Text>
                      </View>
                      <ListItem.Title>
                        <Icon
                          type="material-ui"
                          style={{
                            backgroundColor: "#fff",
                            borderRadius: 15,
                          }}
                          color={item.answer ? "#0bad51" : "#fc325b"}
                          name={item.answer ? "check-circle" : "cancel"}
                        />
                      </ListItem.Title>
                    </ListItem.Content>
                  </ListItem>
                ))}
            </View>
          </View>
          <View style={styles.footer}>
            <View>
              <Text style={styles.title}>Points</Text>
            </View>
            <View>
              <Text style={styles.numberPoints}>{points}</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPress}>
              <Text style={styles.text}>PLAY AGAIN</Text>
            </Pressable>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
  },
  gradient: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
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
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
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
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  numberPoints: {
    fontWeight: "400",
    fontSize: 50,
    fontStyle: "normal",
    color: "#fff",
    marginBottom: 10,
  },
});

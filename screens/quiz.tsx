import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Chip, Text } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { Skeleton, ListItem } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

import { getQuiz } from "../api/api";
import { useQuestionStore } from "../stores/question";
import { shuffled, quotes } from "../utils";
import { Answer, Data } from "../stores/interfaces";
import { QuizScreenNavigationProp } from "../types/stack-navigator";
import { Colors } from "../const";

export default function Dashboard() {
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  // points
  const [points, setPoints] = useState(0);
  // index of the question
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [answerStatus, setAnswerStatus] = useState<boolean | null>(null);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  // selected answer
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );

  const navigation = useNavigation<QuizScreenNavigationProp>();

  const progressPercentage = Math.floor((index / totalQuestions) * 100);

  const { setCurrent, current } = useQuestionStore();

  const handleQuestion = (index: number = 0, data: Data) => {
    if (data?.results[index]) setCurrent(data?.results[index]);
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["quiz"],
    queryFn: getQuiz,
    onSuccess(data) {
      if (data) {
        handleQuestion(index, data);
        setTotalQuestions(data?.results?.length);
      }
    },
    enabled: true,
    refetchOnWindowFocus: false,
  });

  const onPress = (option: string, index: number) => {
    setSelectedAnswerIndex(index);
    setSelected(option);
  };

  useEffect(() => {
    if (selected !== null && selectedAnswerIndex !== null) {
      const answersArray = [...answers];
      if (selected === current?.correct_answer) {
        setPoints((points) => points + 1);
        answersArray.push({ question: index + 1, answer: true });
        setAnswerStatus(true);
      } else {
        setAnswerStatus(false);
        answersArray.push({ question: index + 1, answer: false });
      }
      setAnswers(answersArray);
    }
  }, [selected]);

  const onClickNext = () => {
    setIndex((index) => index + 1);
  };

  useEffect(() => {
    setSelected(null);
    setSelectedAnswerIndex(null);
    setAnswerStatus(null);
  }, [index]);

  useEffect(() => {
    if (index + 1 > totalQuestions && selected) {
      navigation.navigate("Score", {
        answers: answers,
        points: points,
      });
    } else {
      handleQuestion(index, data);
    }
  }, [index, totalQuestions, selected]);

  useEffect(() => {
    if (current) {
      const opt = [current.correct_answer, ...current.incorrect_answers];
      setOptions(shuffled(opt));
    } else setOptions([]);
  }, [current]);

  useEffect(() => {
    return () => {
      setAnswers([]);
      setCurrent(null);
      setPoints(0);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setCurrent(null);
      setOptions([]);
      setTotalQuestions(0);
      setIndex(0);
      setAnswers([]);
      setPoints(0);
      refetch();
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient style={styles.gradient} colors={Colors}>
        <ScrollView>
          <View>
            {isLoading ? (
              <View style={styles.skeleton}>
                <Skeleton animation="wave" width={"100%"} height={40} />
                <Skeleton animation="wave" width={"100%"} height={40} />
                <Skeleton animation="wave" width={"100%"} height={40} />
              </View>
            ) : (
              <View style={styles.wrap}>
                <View style={styles.progressText}>
                  <Text style={{ fontSize: 15 }}>Your Progress</Text>
                  <Text
                    style={{ fontSize: 20, color: "#fff" }}
                  >{`${index} / ${totalQuestions}`}</Text>
                  <Text style={{ fontSize: 15 }}>{`questions answered`}</Text>
                </View>
                {/* Progress Bar */}
                <View style={styles.progressBar}>
                  <Text
                    style={{
                      backgroundColor: "#efb0ff",
                      borderRadius: 12,
                      position: "absolute",
                      left: 0,
                      height: 10,
                      right: 0,
                      width: `${progressPercentage}%`,
                      marginTop: 20,
                    }}
                  />
                </View>

                <View style={styles.chipContainer}>
                  <Chip
                    title={current?.category}
                    containerStyle={{ marginVertical: 15 }}
                  />
                  <Chip
                    title={current?.difficulty}
                    containerStyle={{ marginVertical: 15 }}
                  />
                </View>

                <View style={styles.questionContainer}>
                  <Text style={styles.question}>
                    {quotes(current?.question)}
                  </Text>
                  <View>
                    {options?.map((item, indx) => (
                      <Pressable
                        key={item}
                        onPress={() => selected === null && onPress(item, indx)}
                      >
                        <ListItem containerStyle={styles.item}>
                          <ListItem.Content
                            style={
                              selected === current?.correct_answer &&
                              indx === selectedAnswerIndex
                                ? styles.correct
                                : selected !== null &&
                                  indx === selectedAnswerIndex
                                ? styles.wrong
                                : styles.itemContent
                            }
                          >
                            <View>
                              <Text style={styles.number}>{indx + 1}</Text>
                            </View>
                            <ListItem.Title style={{ maxWidth: 290, aspectRatio: "auto", height: "auto" }}>
                              {quotes(item)}
                            </ListItem.Title>
                          </ListItem.Content>
                        </ListItem>
                      </Pressable>
                    ))}
                  </View>
                </View>
                {answerStatus !== null && (
                  <View style={styles.next}>
                    <Text style={styles.label}>
                      {answerStatus
                        ? ""
                        : `Answer: "${quotes(current?.correct_answer)}"`}
                    </Text>
                    <TouchableOpacity
                      onPress={onClickNext}
                      style={styles.button}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 15,
                          fontWeight: "700",
                        }}
                      >
                        {index + 1 < totalQuestions ? "Next" : "Done"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    flex: 1,
    paddingHorizontal: 10,
  },
  gradient: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  quiz: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  skeleton: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  progressBar: {
    backgroundColor: "#fff",
    width: "auto",
    flexDirection: "row",
    alignItems: "center",
    height: 10,
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 20,
    paddingVertical: 10,
  },
  progressText: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginTop: 5,
    width: "100%",
  },
  chipContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    alignItems: "center",
    alignContent: "center",
  },
  questionContainer: {
    marginTop: 10,
  },
  question: {
    fontWeight: "800",
    fontSize: 25,
    marginBottom: 20,
  },
  item: {
    borderRadius: 20,
    height: "auto",
    backgroundColor: "transparent",
  },
  option: {
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 20,
  },
  itemContent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    backgroundColor: "#bc81e0",
    borderRadius: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors[0],
  },
  correct: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    borderRadius: 20,
    padding: 8,
    backgroundColor: "#0bad51",
  },
  wrong: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    borderRadius: 20,
    padding: 8,
    backgroundColor: "#fc325b",
  },
  number: {
    textAlign: "center",
    borderWidth: 0.5,
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderColor: "#fff",
    marginRight: 12,
  },
  next: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    flexDirection: "column",
    marginVertical: 10,
  },
  label: {
    fontWeight: "400",
    fontSize: 25,
    marginBottom: 20,
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

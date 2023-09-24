import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Text } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { Skeleton, ListItem } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

import { getQuiz } from "../api/api";
import { useQuestionStore } from "../stores/question";
import { shuffled, quotes } from "../utils";
import { Answer, Data } from "../stores/interfaces";
import { QuizScreenNavigationProp } from "../types/stack-navigator";

export default function Dashboard() {
  const [options, setOptions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
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

  const handleQuestion = (index: number = 0, data: Data) => {
    setCurrent(data?.results[index]);
    const opt = [
      data?.results[index].correct_answer,
      ...data?.results[index].incorrect_answers,
    ];
    setOptions(shuffled(opt));
  };

  const { setCurrent, current } = useQuestionStore();
  const { data, isLoading } = useQuery({
    queryKey: ["quiz"],
    queryFn: getQuiz,
    onSuccess(data) {
      handleQuestion(index, data);
      setTotalQuestions(data?.results?.length);
    },
    refetchOnWindowFocus: false,
    enabled: true,
  });

  const onPress = (option: string, index: number) => {
    setSelectedAnswerIndex(index);
    setSelected(option);
  };

  const onClickNext = () => {
    setIndex((index) => index + 1);
    if (index + 1 <= totalQuestions) handleQuestion(index, data);
  };

  const clear = () => {
    setAnswerStatus(null);
    setSelectedAnswerIndex(null);
    setSelected(null);
  };

  useEffect(() => {
    if (selected !== null) {
      const answersArray = [...answers];
      answersArray.push({ question: index + 1, answer: true });
      setAnswers(answersArray);
      if (selected === current?.correct_answer) {
        setPoints((points) => points + 1);
        setAnswerStatus(true);
      } else setAnswerStatus(false);
    }
  }, [selected]);

  useEffect(() => {
    if (index + 1 > totalQuestions && selected) {
      navigation.navigate("Score", {
        answers: answers,
        points: points,
      });
    }
  }, [index, totalQuestions, selected]);

  useEffect(() => {
    clear();
  }, [index]);

  useEffect(() => {
    setIndex(0);
    return () => {
      setIndex(0);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          {isLoading ? (
            <View>
              <Skeleton animation="wave" width={"100%"} height={40} />
              <Skeleton animation="wave" width={"100%"} height={40} />
              <Skeleton animation="wave" width={"100%"} height={40} />
            </View>
          ) : (
            <View>
              <View style={styles.progress}>
                <Text>Your Progress</Text>
                <Text>{`${index} / ${totalQuestions} questions answered`}</Text>
              </View>
              {/* Progress Bar */}
              <View
                style={{
                  backgroundColor: "#fff",
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  height: 10,
                  borderRadius: 20,
                  justifyContent: "center",
                  marginTop: 20,
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    backgroundColor: "#a269d1",
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

              <View style={styles.questionContainer}>
                <Text style={styles.question}>{quotes(current?.question)}</Text>
                <View style={{ backgroundColor: "#efb0ff" }}>
                  {options?.map((item, indx) => (
                    <Pressable
                      key={item}
                      onPress={() => selected === null && onPress(item, indx)}
                      style={{ backgroundColor: "#efb0ff" }}
                    >
                      <ListItem style={styles.item}>
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
                          <ListItem.Title>{quotes(item)}</ListItem.Title>
                        </ListItem.Content>
                      </ListItem>
                    </Pressable>
                  ))}
                </View>
              </View>
              {answerStatus !== null && (
                <View style={styles.next}>
                  <Text style={styles.label}>
                    {answerStatus ? "Answer Correct" : "Answer Wrong"}
                  </Text>
                  <TouchableOpacity onPress={onClickNext} style={styles.button}>
                    <Text>{index + 1 < totalQuestions ? "Next" : "Done"}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
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
  progress: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
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
    backgroundColor: "#efb0ff!important",
  },
  option: {
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#efb0ff",
    borderRadius: 20,
    // height: "auto",
    backgroundColor: "#efb0ff!important",
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
    marginVertical: 30,
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

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Text } from "@rneui/themed";
import { useQuery } from "@tanstack/react-query";
import { Skeleton, ListItem } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

import { getQuiz } from "../api/api";
import { useQuestionStore } from "../stores/question";
import { shuffled, quotes } from "../utils";
import { Answer } from "../stores/interfaces";
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

  const handleQuestion = (index: number) => {
    setCurrent(data.results[index]);
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
      setCurrent(data.results[0]);
      const opt = [
        data.results[0].correct_answer,
        ...data.results[0].incorrect_answers,
      ];
      setOptions(shuffled(opt));
      setTotalQuestions(data.results.length);
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
  };

  useEffect(() => {
    if (selected !== null) {
      if (selected === current?.correct_answer) {
        setPoints((points) => points + 1);
        setAnswerStatus(true);
        const answersArray = [...answers]
        answersArray.push({ question: index + 1, answer: true });
        setAnswers(answersArray)
      } else {
        const answersArray = [...answers]
        answersArray.push({ question: index + 1, answer: true });
        setAnswers(answersArray)
      }
    }
  }, [selected]);

  useEffect(() => {
    if (index + 1 > totalQuestions) {
      navigation.navigate("Score", {
        answers: answers,
        points: points,
      });
    } else handleQuestion(index);
  }, [index]);

  useEffect(() => {
    setSelected(null);
    setAnswerStatus(null);
    return () => {
      setSelected(null);
      setAnswerStatus(null);
    };
  }, [index]);

  console.log(answerStatus);

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
              <View style={styles.questionContainer}>
                <Text style={styles.question}>{quotes(current?.question)}</Text>
                <View>
                  {options?.map((item, indx) => (
                    <TouchableOpacity
                      key={item}
                      onPress={() => selected === null && onPress(item, indx)}
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
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              {answerStatus !== null ? (
                <View style={styles.next}>
                  <Text>
                    {answerStatus ? "Answer Correct" : "Answer Wrong"}
                  </Text>
                  <TouchableOpacity onPress={onClickNext}>
                    <Text>Next</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
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
    backgroundColor: "#fff",
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
  item: { borderRadius: 20, height: "auto" },
  option: {
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#bc81e0",
    borderRadius: 20,
    height: "auto",
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
});

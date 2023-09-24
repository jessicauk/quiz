import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Answer } from "../stores/interfaces";

export type StackNavigation = {
  Login: undefined;
  Dashboard: undefined;
  Quiz: undefined;
  Score: {
    answers: Answer[];
    points: number;
  };
};

export type LoginScreenNavigationProp = NativeStackNavigationProp<
  StackNavigation,
  "Login"
>;

export type DashboardScreenNavigationProp = NativeStackNavigationProp<
  StackNavigation,
  "Dashboard"
>;

export type QuizScreenNavigationProp = NativeStackNavigationProp<
  StackNavigation,
  "Quiz"
>;

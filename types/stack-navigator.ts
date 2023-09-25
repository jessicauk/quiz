import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RouteProp } from '@react-navigation/native';
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

export type ScoreScreenNavigationProp = NativeStackNavigationProp<
  StackNavigation,
  "Score"
>;

export type ScoreScreenRouteProp = RouteProp<StackNavigation, 'Score'>;


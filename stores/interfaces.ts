export interface User {
  username: string;
  password: string;
}

type Type = "multiple";
type Difficulty = "easy" | "hard";

export interface Question {
  category: string;
  type: Type;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Data {
  response_code: number;
  results: Question[];
}

export interface Answer {
  question: number;
  answer: boolean;
}

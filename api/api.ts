import { QUIZ } from "./const"

export const getQuiz = async () => {
    const response = await fetch(QUIZ)
    const result = response.json()
    return result;
}
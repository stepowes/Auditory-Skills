import {shuffleArray} from './utils';

export type Question = {
    //category: string;
    correct_answer: string;
    //difficulty: string,
    incorrect_answers: string[];
    question: string;
    //type: string;
};

export type QuestionState = Question & {answers: string[] }; // Under this scenario,
                                                             // we want to ensure both the
                                                             // question itself and a pair of
                                                             // answers can work properly.


export enum Difficulty{
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}


export const fetchQuizQuestions = async(amount: number, difficulty: Difficulty) => {
     const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
     const data = await(await(fetch(endpoint))).json() // First of all, we wait for fetch itself.
     //console.log(data); 
     return data.results.map((question: Question) => (
          {
            ...question,
            answers: shuffleArray([
                ...question.incorrect_answers, 
                question.correct_answer,
            ])
          }
     ))                                                 // Later, we wait for the json file itself.
};
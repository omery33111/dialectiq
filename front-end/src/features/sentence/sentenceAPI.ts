import axios from "axios";
import { SentenceQuestion } from "../../models/Sentence";
import { sentenceURL } from "../../endpoints/endpoints";
import { SentenceSubject } from "../../models/SentenceSubject";
import { SentenceAnswer } from "../../models/SentenceAnswer";



export function postAnswerSentence(sentenceAnswerData: SentenceAnswer, answers: { user_answer: number, question: number }[]) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";

  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }

  const data = {
    sentenceAnswerData: sentenceAnswerData,
    answers: answers
  };

  return new Promise<{ data: SentenceAnswer }>((resolve) =>
  axios.post(`${sentenceURL}/post_answer_sentence_quiz/`, data, config).then(res => resolve({data: res.data}))
  )
}



export function getSentences()
{
  return new Promise<{ data: SentenceQuestion[] }>((resolve) =>
    axios.get(`${sentenceURL}/get_sentences/`).then((res) => resolve({ data: res.data })));
}



export function getSentenceSubjects()
{
  return new Promise<{ data: SentenceSubject[] }>((resolve) =>
    axios.get(`${sentenceURL}/get_sentence_subjects/`).then((res) => resolve({ data: res.data })));
}



export function getSentencesOfSubject(id: string) {
  return new Promise<{ data: SentenceQuestion[] }>((resolve) =>
    axios.get(`${sentenceURL}/get_sentences_of_subject/${id}/`).then((res) => resolve({ data: res.data }))
  );
}

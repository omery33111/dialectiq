import axios, { AxiosRequestConfig } from "axios";
import { VoiceQuestion } from "../../models/Voice";
import { voiceURL } from "../../endpoints/endpoints";
import { VoiceSubject } from "../../models/VoiceSubject";
import { VoiceAnswer } from "../../models/VoiceAnswer";



export function getVoices()
{
  return new Promise<{ data: VoiceQuestion[] }>((resolve) =>
    axios.get(`${voiceURL}/get_voices/`).then((res) => resolve({ data: res.data })));
}



export function getPagedVoiceSubjects(page: number) {
  return new Promise<{ data: VoiceSubject[] }>((resolve =>
    axios.get(`${voiceURL}/paged_voice_subjects/${page}/`).then(res => resolve({ data: res.data }))))
}


export function getVoiceSubjectsAmount() {
  return new Promise<{ data: number }>((resolve =>
      axios.get(`${voiceURL}/voice_subjects_amount/`).then(res => resolve({ data: res.data }))))}



export function getVoiceSubjects()
{
  return new Promise<{ data: VoiceSubject[] }>((resolve) =>
    axios.get(`${voiceURL}/get_voice_subjects/`).then((res) => resolve({ data: res.data })));
}



export function getVoicesOfSubject(id: string) {
  return new Promise<{ data: VoiceQuestion[] }>((resolve) =>
    axios.get(`${voiceURL}/get_voices_of_subject/${id}/`).then((res) => resolve({ data: res.data }))
  );
}



export function postAnswerVoice(voiceAnswerData: VoiceAnswer, answers: { user_answer: number, question: number }[]) {
  const myToken = JSON.parse(localStorage.getItem("token") as string);
  const accessToken = myToken ? myToken.access : "";

  const config: AxiosRequestConfig = {}; // Define the config object with AxiosRequestConfig type

  if (accessToken) {
    config.headers = { 'Authorization': `Bearer ${accessToken}` };
  }
  
  const data = {
    voiceAnswerData: voiceAnswerData,
    answers: answers
  };

  return new Promise<{ data: VoiceAnswer }>((resolve) =>
  axios.post(`${voiceURL}/post_answer_voice_quiz/`, data, config).then(res => resolve({data: res.data}))
  )
}

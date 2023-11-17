import axios, { AxiosRequestConfig } from "axios";
import { AmericanQuestion } from "../../models/American";
import { americanURL } from "../../endpoints/endpoints";
import { AmericanSubject } from "../../models/AmericanSubject";
import { AmericanAnswer } from "../../models/AmericanAnswer";



export function getAmericansAmount(id: number) {
  return new Promise<{ data: number }>((resolve =>
      axios.get(`${americanURL}/americans_amount/${id}/`).then(res => resolve({ data: res.data }))))}



export function getAmericans()
{
  return new Promise<{ data: AmericanQuestion[] }>((resolve) =>
    axios.get(`${americanURL}/get_americans/`).then((res) => resolve({ data: res.data })));
}




export function getPagedAmericanSubjects(page: number) {
  return new Promise<{ data: AmericanSubject[] }>((resolve =>
    axios.get(`${americanURL}/paged_american_subjects/${page}/`).then(res => resolve({ data: res.data }))))
}


export function getAmericanSubjectsAmount() {
  return new Promise<{ data: any }>((resolve =>
      axios.get(`${americanURL}/american_subjects_amount/`).then(res => resolve({ data: res.data }))))}



export function getSingleAmerican(id: string) {

  return new Promise<{ data: AmericanQuestion }>((resolve) =>
    axios.get(`${americanURL}/single_american/${id}/`).then((res) => resolve({ data: res.data }))
  );
}



export function getSingleAmericanSubject(id: string) {

  return new Promise<{ data: AmericanSubject }>((resolve) =>
    axios.get(`${americanURL}/get_american_subject/${id}/`).then((res) => resolve({ data: res.data }))
  );
}



export function getAmericanSubjects()
{
  return new Promise<{ data: AmericanSubject[] }>((resolve) =>
    axios.get(`${americanURL}/get_american_subjects/`).then((res) => resolve({ data: res.data })));
}



export function postAnswerAmerican(americanAnswerData: AmericanAnswer, answers: { user_answer: number, question: number }[]) {
  const myToken = JSON.parse(localStorage.getItem("token") as string);
  const accessToken = myToken ? myToken.access : "";

  const config: AxiosRequestConfig = {}; // Define the config object with AxiosRequestConfig type

  if (accessToken) {
    config.headers = { 'Authorization': `Bearer ${accessToken}` };
  }

  const data = {
    americanAnswerData: americanAnswerData,
    answers: answers
  };

  return new Promise<{ data: AmericanAnswer }>((resolve) =>
  axios.post(`${americanURL}/post_answer_american_quiz/`, data, config).then(res => resolve({data: res.data}))
  )
}

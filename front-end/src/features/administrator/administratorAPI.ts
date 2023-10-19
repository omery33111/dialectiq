import axios from "axios";
import { administratorURL, americanURL, sentenceURL } from "../../endpoints/endpoints";
import { Blog } from "../../models/Blog";
import { AmericanQuestion } from "../../models/American";
import { AmericanSubject } from "../../models/AmericanSubject";
import { SentenceSubject } from "../../models/SentenceSubject";
import { SentenceQuestion } from "../../models/Sentence";



export function postBlog(blogData: Blog) {
    const myToken = JSON.parse(localStorage.getItem("token") as string)
      const accessToken = myToken ? myToken.access : "";
      let config = {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
    return new Promise<{ data: Blog }>((resolve) =>
      axios.post(`${administratorURL}/post_blog/`, blogData, config).then((res) => resolve({ data: res.data }))
    );
  }



export function deleteBlog(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Blog }>((resolve) =>
    axios.delete(`${administratorURL}/delete_blog/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}



export function patchBlog(blogData: any, id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Blog }>((resolve) =>
    axios.put(`${administratorURL}/patch_blog/${id}/`, blogData, config).then((res) => resolve({ data: res.data }))
  );
}



export function patchSentence(SentenceData: any, id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: SentenceQuestion }>((resolve) =>
    axios.put(`${administratorURL}/patch_sentence/${id}/`, SentenceData, config).then((res) => resolve({ data: res.data }))
  );
}



export function patchAmerican(AmericanData: any, id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: AmericanQuestion }>((resolve) =>
    axios.put(`${administratorURL}/patch_american/${id}/`, AmericanData, config).then((res) => resolve({ data: res.data }))
  );
}



export function deleteAmerican(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: AmericanQuestion }>((resolve) =>
    axios.delete(`${administratorURL}/delete_american/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}



export function deleteSentence(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: SentenceQuestion }>((resolve) =>
    axios.delete(`${administratorURL}/delete_sentence/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}



export function deleteSentenceSubject(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: SentenceSubject }>((resolve) =>
    axios.delete(`${administratorURL}/delete_sentence_subject/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}



export function postAmerican(americanData: AmericanQuestion) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: AmericanQuestion }>((resolve) =>
  axios.post(`${administratorURL}/post_american_quiz/`, americanData, config).then(res => resolve({data: res.data}))
)
}



export function postSentence(sentenceData: SentenceQuestion) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: SentenceQuestion }>((resolve) =>
  axios.post(`${administratorURL}/post_sentence_quiz/`, sentenceData, config).then(res => resolve({data: res.data}))
)
}



export function postAmericanSubject(AmericanSubjectData: AmericanSubject) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: AmericanSubject }>((resolve) =>
    axios.post(`${administratorURL}/post_american_subject/`, AmericanSubjectData, config).then((res) => resolve({ data: res.data }))
  );
}



export function postSentenceSubject(SentenceSubjectData: SentenceSubject) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: SentenceSubject }>((resolve) =>
    axios.post(`${administratorURL}/post_sentence_subject/`, SentenceSubjectData, config).then((res) => resolve({ data: res.data }))
  );
}



export function patchSentenceSubject(SubjectData: any, id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: SentenceSubject }>((resolve) =>
    axios.put(`${administratorURL}/patch_sentence_subject/${id}/`, SubjectData, config).then((res) => resolve({ data: res.data }))
  );
}



export function patchAmericanSubject(SubjectData: any, id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: AmericanSubject }>((resolve) =>
    axios.put(`${administratorURL}/patch_american_subject/${id}/`, SubjectData, config).then((res) => resolve({ data: res.data }))
  );
}



export function getSingleAmericanSubject(id: string) {

  return new Promise<{ data: AmericanSubject }>((resolve) =>
    axios.get(`${americanURL}/get_american_subject/${id}/`).then((res) => resolve({ data: res.data }))
  );
}



export function getSingleSentenceSubject(id: string) {

  return new Promise<{ data: SentenceSubject }>((resolve) =>
    axios.get(`${sentenceURL}/get_sentence_subject/${id}/`).then((res) => resolve({ data: res.data }))
  );
}



export function getAmericanSubjects()
{
  return new Promise<{ data: AmericanSubject[] }>((resolve) =>
    axios.get(`${americanURL}/get_american_subjects/`).then((res) => resolve({ data: res.data })));
}



export function deleteAmericanSubject(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: AmericanQuestion }>((resolve) =>
    axios.delete(`${administratorURL}/delete_american_subject/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}



export function getAmericansOfSubject(id: string) {
  return new Promise<{ data: AmericanQuestion[] }>((resolve) =>
    axios.get(`${administratorURL}/get_americans_of_subject/${id}/`).then((res) => resolve({ data: res.data }))
  );
}

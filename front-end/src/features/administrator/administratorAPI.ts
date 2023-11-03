import axios from "axios";
import { administratorURL, americanURL, registerURL, sentenceURL, voiceURL } from "../../endpoints/endpoints";
import { Blog } from "../../models/Blog";
import { AmericanSubject } from "../../models/AmericanSubject";
import { SentenceSubject } from "../../models/SentenceSubject";
import { SentenceQuestion } from "../../models/Sentence";
import { VoiceQuestion } from "../../models/Voice";
import { VoiceSubject } from "../../models/VoiceSubject";
import { AmericanQuestion, AmericanResult } from "../../models/American";
import { Callback } from "../../models/Callback";
import { Register } from "../../models/Authentication";



const register = async (userData: Register) => {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  const response = await axios.post(registerURL, userData, config)
  return response.data
}




export function getRightAmericans()
{
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: AmericanResult[] }>((resolve) =>
    axios.get(`${americanURL}/get_right_americans/`, config).then((res) => resolve({ data: res.data })));
}



export function getPagedCallbacks(page: number) {
  return new Promise<{ data: Callback[] }>((resolve =>
    axios.get(`${administratorURL}/paged_callbacks/${page}/`).then(res => resolve({ data: res.data }))))
}


export function getCallbacksAmount() {
  return new Promise<{ data: number }>((resolve =>
      axios.get(`${administratorURL}/callbacks_amount/`).then(res => resolve({ data: res.data }))))}



export function deleteCallback(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Blog }>((resolve) =>
    axios.delete(`${administratorURL}/delete_callback/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}



export function getPagedVoices(page: number) {
  return new Promise<{ data: VoiceQuestion[] }>((resolve =>
    axios.get(`${administratorURL}/paged_voices/${page}/`).then(res => resolve({ data: res.data }))))
}


export function getVoicesAmount() {
    return new Promise<{ data: number }>((resolve =>
        axios.get(`${administratorURL}/voices_amount/`).then(res => resolve({ data: res.data }))))}



export function getPagedSentences(page: number) {
  return new Promise<{ data: SentenceQuestion[] }>((resolve =>
    axios.get(`${administratorURL}/paged_sentences/${page}/`).then(res => resolve({ data: res.data }))))
}


export function getSentencesAmount() {
    return new Promise<{ data: number }>((resolve =>
        axios.get(`${administratorURL}/sentences_amount/`).then(res => resolve({ data: res.data }))))}



export function getPagedAmericans(page: number) {
  return new Promise<{ data: AmericanQuestion[] }>((resolve =>
    axios.get(`${administratorURL}/paged_americans/${page}/`).then(res => resolve({ data: res.data }))))
}


export function getAmericansAmount() {
    return new Promise<{ data: number }>((resolve =>
        axios.get(`${administratorURL}/americans_amount/`).then(res => resolve({ data: res.data }))))}



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



export function patchVoice(VoiceData: any, id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: VoiceQuestion }>((resolve) =>
    axios.put(`${administratorURL}/patch_voice/${id}/`, VoiceData, config).then((res) => resolve({ data: res.data }))
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



export function deleteVoice(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: VoiceQuestion }>((resolve) =>
    axios.delete(`${administratorURL}/delete_voice/${id}/`, config).then((res) => resolve({ data: res.data }))
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



export function deleteVoiceSubject(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: VoiceSubject }>((resolve) =>
    axios.delete(`${administratorURL}/delete_voice_subject/${id}/`, config).then((res) => resolve({ data: res.data }))
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



export function postVoice(voiceData: VoiceQuestion) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
  return new Promise<{ data: VoiceQuestion }>((resolve) =>
  axios.post(`${administratorURL}/post_voice_quiz/`, voiceData, config).then(res => resolve({data: res.data}))
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



export function postVoiceSubject(VoiceSubjectData: VoiceSubject) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: VoiceSubject }>((resolve) =>
    axios.post(`${administratorURL}/post_voice_subject/`, VoiceSubjectData, config).then((res) => resolve({ data: res.data }))
  );
}



export function patchVoiceSubject(SubjectData: any, id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: VoiceSubject }>((resolve) =>
    axios.put(`${administratorURL}/patch_voice_subject/${id}/`, SubjectData, config).then((res) => resolve({ data: res.data }))
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



export function getSingleVoiceSubject(id: string) {

  return new Promise<{ data: VoiceSubject }>((resolve) =>
    axios.get(`${voiceURL}/get_voice_subject/${id}/`).then((res) => resolve({ data: res.data }))
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

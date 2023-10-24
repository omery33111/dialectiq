import axios from "axios";
import { VoiceQuestion } from "../../models/Voice";
import { voiceURL } from "../../endpoints/endpoints";
import { VoiceSubject } from "../../models/VoiceSubject";



export function getVoices()
{
  return new Promise<{ data: VoiceQuestion[] }>((resolve) =>
    axios.get(`${voiceURL}/get_voices/`).then((res) => resolve({ data: res.data })));
}



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

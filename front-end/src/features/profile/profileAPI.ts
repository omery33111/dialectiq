import axios from "axios";
import Profile from "../../models/Profile";
import { profileURL } from "../../endpoints/endpoints";



export function getProfile() {
    const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
    return new Promise<{ data: Profile }>((resolve =>
        axios.get(profileURL + "/profile", config).then(res => resolve({ data: res.data }))))}



export function getForumProfiles(page: number) {
  return new Promise<{ data: Profile[] }>((resolve =>
    axios.get(`${profileURL}/forum_profiles?page=${page}`).then(res => resolve({ data: res.data }))))}
        

        
export function getUserSingleBlogComments(id: number) {
    const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
    return new Promise<{ data: any }>((resolve =>
        axios.get(`${profileURL}/user_blogcomments/${id}/`, config).then(res => resolve({ data: res.data }))))}


        
export function getUserQuizes(id: number) {
    const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
    return new Promise<{ data: any }>((resolve =>
        axios.get(`${profileURL}/user_answeredquizes/${id}/`, config).then(res => resolve({ data: res.data }))))}



export function getMyID() {
    const myToken = JSON.parse(localStorage.getItem("token") as string)
    const accessToken = myToken ? myToken.access : "";
    let config = {
        headers: { 'Authorization': `Bearer ${accessToken}` }
      }
    return new Promise<{ data: any }>((resolve =>
        axios.get(profileURL + "/my_id", config).then(res => resolve({ data: res.data }))))}

        

export function getSingleProfile(id: number) {
  return new Promise<{ data: Profile }>((resolve) =>
    axios.get(`${profileURL}/get_profile/${id}/`).then((res) => resolve({ data: res.data }))
  );
}



export function changeProfile(profileData: any, id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Profile }>((resolve) =>
    axios.put(`${profileURL}/user_update/${id}/`, profileData, config).then((res) => resolve({ data: res.data }))
  );
}

import axios, { AxiosRequestConfig } from "axios";
import Profile from "../../models/Profile";
import { profileURL } from "../../endpoints/endpoints";



export function searchProfile(searchQuery: string)
{
  return new Promise<{ data: Profile[] }>((resolve) =>
    axios.get(`${profileURL}/search_profile`, { params: { user_name: searchQuery }}).then((res) => resolve({ data: res.data })));
}



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
    axios.get(`${profileURL}/forum_profiles/${page}/`).then(res => resolve({ data: res.data }))))
}


        
export function getUserSingleBlogComments(id: number) {
    return new Promise<{ data: any }>((resolve =>
        axios.get(`${profileURL}/user_blogcomments/${id}/`).then(res => resolve({ data: res.data }))))}


        
export function getUserQuizes(id: number) {
    return new Promise<{ data: any }>((resolve =>
        axios.get(`${profileURL}/user_answeredquizes/${id}/`).then(res => resolve({ data: res.data }))))}



export function getMyID() {
  const myToken = JSON.parse(localStorage.getItem("token") as string);
  const accessToken = myToken ? myToken.access : "";

  const config: AxiosRequestConfig = {};

  if (accessToken) {
    config.headers = { 'Authorization': `Bearer ${accessToken}` };
  }

    return new Promise<{ data: any }>((resolve =>
        axios.get(profileURL + "/my_id", config).then(res => resolve({ data: res.data }))))}

        

export function getProfilesAmount() {
    return new Promise<{ data: any }>((resolve =>
        axios.get(profileURL + "/profiles_amount").then(res => resolve({ data: res.data }))))}

        

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

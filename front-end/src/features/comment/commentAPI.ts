import axios from "axios";
import { commentURL } from "../../endpoints/endpoints";
import { Comment } from "../../models/Comment";



export function getComments(id: number)
{
  return new Promise<{ data: Comment[] }>((resolve) =>
    axios.get(`${commentURL}/get_comments/${id}/`).then((res) => resolve({ data: res.data })));
}



export function getSingleComment(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
      let config = {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
  return new Promise<{ data: Comment }>((resolve) =>
    axios.get(`${commentURL}/single_comment/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}



export function postComment(commentData: Comment) {
    const myToken = JSON.parse(localStorage.getItem("token") as string)
      const accessToken = myToken ? myToken.access : "";
      let config = {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
    return new Promise<{ data: Comment }>((resolve) =>
    axios.post(`${commentURL}/post_comment/`, commentData, config).then(res => resolve({data: res.data}))
  )
}



export function changeComment(commentData: any, id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Comment }>((resolve) =>
    axios.put(`${commentURL}/put_comment/${id}/`, commentData, config).then((res) => resolve({ data: res.data }))
  );
}



export function deleteComment(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
  let config = {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    }
  return new Promise<{ data: Comment }>((resolve) =>
    axios.delete(`${commentURL}/delete_comment/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}

import axios from "axios";
import { administratorURL } from "../../endpoints/endpoints";
import { Blog } from "../../models/Blog";



export function getSingleBlog(id: string) {
  const myToken = JSON.parse(localStorage.getItem("token") as string)
  const accessToken = myToken ? myToken.access : "";
      let config = {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
  return new Promise<{ data: Blog }>((resolve) =>
    axios.get(`${administratorURL}/single_blog/${id}/`, config).then((res) => resolve({ data: res.data }))
  );
}



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

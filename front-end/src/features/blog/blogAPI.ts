import axios, { AxiosRequestConfig } from 'axios';
import { Blog } from "../../models/Blog";
import { blogURL } from "../../endpoints/endpoints";



export function getPagedBlogs(page: number) {
  const myToken = JSON.parse(localStorage.getItem("token") as string);
  const accessToken = myToken ? myToken.access : "";

  const config: AxiosRequestConfig = {}; // Define the config object with AxiosRequestConfig type

  if (accessToken) {
    config.headers = { 'Authorization': `Bearer ${accessToken}` };
  }

  return new Promise<{ data: Blog[] }>((resolve) =>
    axios.get(`${blogURL}/paged_blogs/${page}/`, config).then((res) =>
      resolve({ data: res.data })
    )
  );
}



export function getBlogsAmount() {
    return new Promise<{ data: number }>((resolve =>
        axios.get(`${blogURL}/blogs_amount/`).then(res => resolve({ data: res.data }))))}



export function getBlogs()
{
  return new Promise<{ data: Blog[] }>((resolve) =>
    axios.get(`${blogURL}/get_blogs/`).then((res) => resolve({ data: res.data })));
}



export function getSingleBlog(id: string) {
  return new Promise<{ data: Blog }>((resolve) =>
    axios.get(`${blogURL}/single_blog/${id}/`).then((res) => resolve({ data: res.data }))
  );
}

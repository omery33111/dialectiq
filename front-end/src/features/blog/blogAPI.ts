import axios from "axios";
import { Blog } from "../../models/Blog";
import { blogURL } from "../../endpoints/endpoints";



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
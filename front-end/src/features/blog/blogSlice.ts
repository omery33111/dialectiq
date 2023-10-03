import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { BlogState } from '../../models/Blog';
import { getBlogs, getSingleBlog } from './blogAPI';



const initialState: BlogState = {
  blogs: [],
  singleBlog: {
    title: "", description: "", video: "", id: "", picture: '', date: new Date(),
  },
  likes: {},
};

export const getBlogsAsync = createAsyncThunk('blog/getBlogs', async () => {
  const response = await getBlogs();
  return response.data;
});


export const getSingleBlogAsync = createAsyncThunk(
  'blog/getSingleBlog',
  async (id: string) => {
    const response = await getSingleBlog(id);
    return response.data;
  }
);


export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    toggleLike: (state, action) => {
      const { blogId } = action.payload; // Assuming you pass the blog ID as payload
      if (state.likes[blogId]) {
        state.likes[blogId] -= 1; // Unlike if already liked
      } else {
        state.likes[blogId] = 1; // Like if not already liked
      }
      
      localStorage.setItem('blogLikes', JSON.stringify(state.likes));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogsAsync.fulfilled, (state, action) => {
        state.blogs = action.payload;
      })
      
      .addCase(getSingleBlogAsync.fulfilled, (state, action) =>
      {
        state.singleBlog = action.payload
      })
  },
});



export const { toggleLike } = blogSlice.actions;

export const selectBlogs = (state: RootState) => state.blog.blogs;
export const selectLikes = (state: RootState) => state.blog.likes;
export const selectSingleBlog = (state: RootState) => state.blog.singleBlog;


export default blogSlice.reducer;

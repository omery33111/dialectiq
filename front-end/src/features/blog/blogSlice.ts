import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { BlogState } from '../../models/Blog';
import { getBlogs } from './blogAPI';



const initialState: BlogState = {
    blogs: [],
    singleBlog: {title: "", description: "", video: ""}
};



export const getBlogsAsync = createAsyncThunk(
  'blog/getBlogs',
  async () => {
    const response = await getBlogs();
    return response.data;
  }
);



export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    do: (state, action) => {

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogsAsync.fulfilled, (state, action) =>
      {
        state.blogs = action.payload
      })
  },
});



export const selectBlogs = (state: RootState) => state.blog.blogs;

export default blogSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { BlogState } from '../../models/Blog';
import { getBlogs, getBlogsAmount, getMoreBlogs, getPagedBlogs, getSingleBlog } from './blogAPI';



const initialState: BlogState = {
  blogs: [],
  singleBlog: { title: "", description: "", youtube: "", 
  // video: "", 
  id: "", picture: '', date: new Date() },

  blogAmount: 0,

  isLoading: false,
  isError: false
};



export const getMoreBlogsAsync = createAsyncThunk(
  'blog/getMoreBlogs',
  async () => {
    const response = await getMoreBlogs();
    return response.data;
  }
);



export const getPagedBlogsAsync = createAsyncThunk(
  "blog/getPagedBlogs",
  async (page: number) => {
    const response = await getPagedBlogs(page);
    return response;
  }
);


export const getBlogsAmountAsync = createAsyncThunk(
  "blog/getBlogsAmount",
  async () => {
    const response = await getBlogsAmount();
    return response;
  }
);



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

  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogsAsync.fulfilled, (state, action) => {
        state.blogs = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getBlogsAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogsAsync.rejected, (state) => {
        state.isError = true;
      })
      
      .addCase(getSingleBlogAsync.fulfilled, (state, action) =>
      {
        state.singleBlog = action.payload
        state.isLoading = false;
      })
      .addCase(getSingleBlogAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleBlogAsync.rejected, (state) => {
        state.isError = true;
      })
      
      .addCase(getPagedBlogsAsync.fulfilled, (state, action) => {
        state.blogs = action.payload.data;
      })

      .addCase(getBlogsAmountAsync.fulfilled, (state, action) => {
        state.blogAmount = action.payload.data;
      })

      .addCase(getMoreBlogsAsync.fulfilled, (state, action) =>
      {
        state.blogs = action.payload
      })
  },
});


export const selectBlogisError = (state: RootState) => state.blog.isError;
export const selectBlogisLoading = (state: RootState) => state.blog.isLoading;

export const selectSingleBlogisLoading = (state: RootState) => state.blog.isLoading;

export const selectBlogsAmount = (state: RootState) => state.blog.blogAmount;
export const selectBlogs = (state: RootState) => state.blog.blogs;
export const selectSingleBlog = (state: RootState) => state.blog.singleBlog;


export default blogSlice.reducer;

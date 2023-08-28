import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AdministratorState } from "../../models/Administrator";
import { deleteBlog, getSingleBlog, patchBlog, postBlog } from "./administratorAPI";
import { RootState } from "../../app/store";



const initialState: AdministratorState = {
    blogs: [],
    singleBlog: {
      title: "", description: "", video: "",
      id: "",
      picture: ""
    }
};



export const getSingleBlogAsync = createAsyncThunk(
  'administrator/getSingleBlog',
  async (id: string) => {
    const response = await getSingleBlog(id);
    return response.data;
  }
);



export const postBlogAsync = createAsyncThunk(
    'administrator/postBlog',
    async (blogData: any) => {
    const response = await postBlog(blogData);
    return response.data;
  }
);



export const patchBlogAsync = createAsyncThunk(
  'administrator/patchBlog',
  async (data: {blogData: any, id: string}) => {
  const response = await patchBlog(data.blogData, data.id);
  return response;
}
)



export const deleteBlogAsync = createAsyncThunk(
  'administrator/deleteBlog',
  async (id: string) => { await deleteBlog(id);
  return { id };
  }
);



  export const administratorSlice = createSlice({
    name: 'administrator',
    initialState,
    reducers: {
      do: (state) => {
      },
  
      },
    extraReducers: (builder) => {
      builder
        .addCase(postBlogAsync.fulfilled, (state, action) => {
            state.blogs = [...state.blogs, action.payload];
        })

        .addCase(patchBlogAsync.fulfilled, (state, action) => {
          state.singleBlog = { ...state.singleBlog, ...action.payload }
        })

        .addCase(deleteBlogAsync.fulfilled, (state, action) => {
          state.blogs = state.blogs.filter(blog => blog.id !== action.payload.id)
        })

        .addCase(getSingleBlogAsync.fulfilled, (state, action) => {
          state.singleBlog = action.payload
      })
    },
  });




export const selectSingleBlog = (state: RootState) => state.administrator.singleBlog;

export default administratorSlice.reducer;
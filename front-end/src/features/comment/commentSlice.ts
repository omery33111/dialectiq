import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getComments, postComment } from "./commentAPI";
import { CommentState } from "../../models/Comment";
import { RootState } from "../../app/store";



const initialState: CommentState = {
  comments: []
};



export const getCommentsAsync = createAsyncThunk(
  'comment/getComments',
  async (id: number) => {
    const response = await getComments(id);
    return response.data;
  }
)



export const postCommentAsync = createAsyncThunk(
  'comment/postComment', 
  async (commentData: any) => {
      const response = await postComment(commentData);
      return response.data
  }
)



export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    

  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsAsync.fulfilled, (state, action) =>
      {
        state.comments = action.payload
      })
      .addCase(postCommentAsync.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
      })
  },
});



export const selectComments = (state: RootState) => state.comment.comments;

export default commentSlice.reducer;
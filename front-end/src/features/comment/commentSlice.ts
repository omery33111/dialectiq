import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { changeComment, deleteComment, getComments, getSingleComment, postComment } from "./commentAPI";
import { CommentState } from "../../models/Comment";
import { RootState } from "../../app/store";



const initialState: CommentState = {
  comments: [],
  comment: {id: "", blog: "", user: "", profile: {id: 0,
                                                  user: 0,
                                                  bio: "",
                                                  location: "",
                                                  picture: "",
                                                  first_name: "",
                                                  last_name: ""}, comment: "", date: new Date()}
};



export const getCommentsAsync = createAsyncThunk(
  'comment/getComments',
  async (id: number) => {
    const response = await getComments(id);
    return response.data;
  }
)



export const getSingleCommentAsync = createAsyncThunk(
  'comment/getSingleComment',
  async (id: string) => {
    const response = await getSingleComment(id);
    return response.data;
  }
);



export const postCommentAsync = createAsyncThunk(
  'comment/postComment', 
  async (commentData: any) => {
      const response = await postComment(commentData);
      return response.data
  }
)



export const changeCommentAsync = createAsyncThunk(
  'comment/changeComment',
  async (data: {commentData: any, id: string}) => {
  const response = await changeComment(data.commentData, data.id);
  return response;
  }
)



export const deleteCommentAsync = createAsyncThunk(
  'comment/deleteComment',
  async (id: string) => { await deleteComment(id);
  return { id };
  }
);



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

      .addCase(getSingleCommentAsync.fulfilled, (state, action) => {
        state.comment = action.payload
      })

      .addCase(postCommentAsync.fulfilled, (state, action) => {
        state.comments = [...state.comments, action.payload];
      })

      .addCase(changeCommentAsync.fulfilled, (state, action) => {
        state.comment = { ...state.comment, ...action.payload }
      })

      .addCase(deleteCommentAsync.fulfilled, (state, action) => {
        const updatedComments = state.comments.filter(comment => comment.id !== action.payload.id);
        state.comments = updatedComments;
      })
  },
});



export const selectComments = (state: RootState) => state.comment.comments;
export const selectComment = (state: RootState) => state.comment.comment;

export default commentSlice.reducer;
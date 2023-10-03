import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMyID, getProfile, getSingleProfile, getUserQuizes, getUserSingleBlogComments, patchProfile } from "./profileAPI";
import { RootState } from "../../app/store";
import { ProfileState } from "../../models/Profile";

const initialState: ProfileState = {
  profile: {
    profile_id: 0,
    user: 0,
    bio: "",
    location: "",
    picture: "",
    first_name: "",
    last_name: "",
    points: 0,
    date: new Date(),
  },

  user_blogs: [{
    id: 0,
  blog_info: {
    title: "",
    description: "",
    picture: "",
    date: ""
  },
  comments: [],}],

  user_quizes: [
    {description: "",
    subject_name: "",
    picture: ""}
    ],

  userID: ""
};

export const getProfileAsync = createAsyncThunk(
  "profile/getProfile",
  async () => {
    const response = await getProfile();
    return response;
  }
);


export const getUserSingleBlogCommentsAsync = createAsyncThunk(
  "profile/getUserSingleBlogComments",
  async (id: number) => {
    const response = await getUserSingleBlogComments(id);
    return response.data;
  }
);


export const getUserQuizesAsync = createAsyncThunk(
  "profile/getUserQuizes",
  async (id: number) => {
    const response = await getUserQuizes(id);
    return response.data;
  }
);



export const getMyIDAsync = createAsyncThunk(
  "profile/getMyID",
  async () => {
    const response = await getMyID();
    return response;
  }
);



export const getSingleProfileAsync = createAsyncThunk(
  "profile/getSingleProfile",
  async (id: number) => {
    const response = await getSingleProfile(id);
    return response.data;
  }
);

export const patchProfileAsync = createAsyncThunk(
  "profile/patchProfile",
  async (profileData: any) => {
    const response = await patchProfile(profileData);
    return response;
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setPoints: (state, action) => {
      state.profile.points = action.payload;
      localStorage.setItem("points", JSON.stringify(action.payload));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.profile = action.payload.data;
      })

      .addCase(getSingleProfileAsync.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      .addCase(getMyIDAsync.fulfilled, (state, action) => {
        state.userID = action.payload.data;
      })

      .addCase(getUserSingleBlogCommentsAsync.fulfilled, (state, action) => {
        state.user_blogs = action.payload;
        console.log(action.payload);
      })

      .addCase(getUserQuizesAsync.fulfilled, (state, action) => {
        state.user_quizes = action.payload;
      });
  },
});



export const { setPoints } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile.profile;
export const selectUserID = (state: RootState) => state.profile.userID;
export const selectSingleBlogUserComments = (state: RootState) => state.profile.user_blogs;
export const selectUserAnsweredQuizes = (state: RootState) => state.profile.user_quizes;

export default profileSlice.reducer;

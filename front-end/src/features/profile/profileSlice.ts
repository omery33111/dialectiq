import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ProfileState } from "../../models/Profile";
import { changeProfile, getForumProfiles, getMyID, getProfile, getProfilesAmount, getSingleProfile, getUserQuizes, getUserSingleBlogComments, searchProfile } from "./profileAPI";

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

  profiles: [],

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
    {id: 0,
    description: "",
    subject_name: "",
    picture: ""}
    ],

  userID: "",

  profileAmount: 0,

  searchProfile: "",

  isLoading: false,
  isError: false
};




export const searchProfileAsync = createAsyncThunk(
  'product/searchProfile',
  async (data: {searchQuery: string}) => {
    const response = await searchProfile(data.searchQuery);
    return response.data;
  }
);



export const getProfileAsync = createAsyncThunk(
  "profile/getProfile",
  async () => {
    const response = await getProfile();
    return response;
  }
);


export const getForumProfilesAsync = createAsyncThunk(
  "profile/getForumProfiles",
  async (page: number) => {
    const response = await getForumProfiles(page);
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



export const getProfilesAmountAsync = createAsyncThunk(
  "profile/getProfilesAmount",
  async () => {
    const response = await getProfilesAmount();
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

export const changeProfileAsync = createAsyncThunk(
  'profile/changeProfile',
  async (data: {profileData: any, id: string}) => {
  const response = await changeProfile(data.profileData, data.id);
  return response;
  }
)


export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setPoints: (state, action) => {
      state.profile.points = action.payload;
      localStorage.setItem("points", JSON.stringify(action.payload));
    },

    setMyID: (state, action) => {
      state.profile.points = action.payload;
      localStorage.setItem("myID", JSON.stringify(action.payload));
    },

    updateSearchProfile: (state, action) => {
      state.searchProfile = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(searchProfileAsync.fulfilled, (state, action) =>
      {
        state.profiles = action.payload
      })

      .addCase(getProfileAsync.fulfilled, (state, action) => {
        state.profile = action.payload.data;
      })

      .addCase(getForumProfilesAsync.fulfilled, (state, action) => {
        state.profiles = action.payload.data;
        state.isLoading = false;
      })
      .addCase(getForumProfilesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getForumProfilesAsync.rejected, (state) => {
        state.isError = true;
      })

      .addCase(getSingleProfileAsync.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getSingleProfileAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleProfileAsync.rejected, (state) => {
        state.isError = true;
      })

      .addCase(getMyIDAsync.fulfilled, (state, action) => {
        state.userID = action.payload.data;
      })

      .addCase(getProfilesAmountAsync.fulfilled, (state, action) => {
        state.profileAmount = action.payload.data;
      })

      .addCase(getUserSingleBlogCommentsAsync.fulfilled, (state, action) => {
        state.user_blogs = action.payload;
      })

      .addCase(getUserQuizesAsync.fulfilled, (state, action) => {
        state.user_quizes = action.payload;
      })

      .addCase(changeProfileAsync.fulfilled, (state, action) => {
        state.profile = { ...state.profile, ...action.payload }
      });
  },
});



export const { setPoints, setMyID, updateSearchProfile } = profileSlice.actions;

export const selectPagedForumisLoading = (state: RootState) => state.profile.isLoading;

export const selectProfileisError = (state: RootState) => state.profile.isError;
export const selectProfileisLoading = (state: RootState) => state.profile.isLoading;

export const selectSearchProfile = (state: RootState) => state.profile.searchProfile;

export const selectProfiles = (state: RootState) => state.profile.profiles;
export const selectProfile = (state: RootState) => state.profile.profile;
export const selectUserID = (state: RootState) => state.profile.userID;
export const selectProfilesAmount = (state: RootState) => state.profile.profileAmount;
export const selectSingleBlogUserComments = (state: RootState) => state.profile.user_blogs;
export const selectUserAnsweredQuizes = (state: RootState) => state.profile.user_quizes;

export default profileSlice.reducer;

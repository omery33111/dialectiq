import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, getSingleProfile, patchProfile } from "./profileAPI";
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
    last_name: ""},
};



export const getProfileAsync = createAsyncThunk(
    'profile/getProfile',
    async () => {
        const response = await getProfile();
        return response
    }
)



export const getSingleProfileAsync = createAsyncThunk(
    'profile/getSingleProfile',
    async (id: number) => {
      const response = await getSingleProfile(id);
      return response.data;
    }
  );



export const patchProfileAsync = createAsyncThunk(
    'profile/patchProfile', 
    async (profileData: any) => {
        const response = await patchProfile(profileData); 
        return response; 
    } 
)
  


export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers:
    {

    },
    extraReducers: (builder) => {
      builder
        .addCase(getProfileAsync.fulfilled, (state, action) => {
            state.profile = action.payload.data;
        })

        .addCase(getSingleProfileAsync.fulfilled, (state, action) => {
            state.profile = action.payload;
          });
    }
})



export const selectProfile = (state: RootState) => state.profile.profile;

export default profileSlice.reducer;
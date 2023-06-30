import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";

export const getUserProfile = createAsyncThunk(
  "/user/getUserProfile",
  async (body, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      // call update profile api
      const response = await axiosClient.post("/user/getUserProfile", body);

      return response.rejult;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const likeAndUnlikePost = createAsyncThunk(
  "posts/likeAndUnlike",
  async(body, thunkAPI) => {

    try {
        thunkAPI.dispatch(setLoading(true))

        const response = await axiosClient.post('posts/like',body)

        return response.rejult

    } catch (error) {
        return Promise.reject(error);
    }finally{
        thunkAPI.dispatch(setLoading(false))
    }
  }
);

const postSlice = createSlice({
  name: "postSlice",
  initialState: {
    userProfile: {},
  },
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload;
    })
    .addCase(likeAndUnlikePost.fulfilled , (state,action)=>{

        const post = action.payload?.post
        const index = state.userProfile?.posts?.findIndex(item => item._id === post._id)

        // console.log(post,index);

        if( state.userProfile && state.userProfile.posts && index !== -1){
            state.userProfile.posts[index] = post
        }

    })
  },
});

// export const {  } = postSlice.actions;
export default postSlice.reducer;

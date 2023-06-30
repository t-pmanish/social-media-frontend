import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { setLoading } from "./appConfigSlice";
import { likeAndUnlikePost } from "./postSlice";

export const getFeedData = createAsyncThunk(
  "/user/getFeedData",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true));
      // call update profile api
      const response = await axiosClient.get("/user/getFeedData");
      return response.rejult;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      thunkAPI.dispatch(setLoading(false));
    }
  }
);

export const followAndUnfollowUser = createAsyncThunk('user/follow',
  async(body,thunkAPI)=>{

    try {
        thunkAPI.dispatch(setLoading(true));
        // call update profile api
        const response = await axiosClient.post("/user/follow" ,body); // useridToFollow
        // console.log('follow data - ',response);
        return response.rejult
      } catch (error) {
        return Promise.reject(error);
      } finally {
        thunkAPI.dispatch(setLoading(false));
      }
      
  }
)




const feedSlice = createSlice({
  name: "feedSlice",
  initialState: {
    feedData:{}
  },
  reducers: {},
  extraReducers: function (builder) {
    builder.addCase(getFeedData.fulfilled, (state, action) => {
      state.feedData = action.payload;
    })
    .addCase(likeAndUnlikePost.fulfilled , (state,action)=>{

        const post = action.payload?.post
        const index = state.feedData?.posts?.findIndex(item => item._id === post._id)

        // console.log(post,index);

        if (state.feedData &&   state.feedData.posts  && index !== -1){
            state.feedData.posts[index] = post
        }

    }).addCase(followAndUnfollowUser.fulfilled, (state,action)=>{

        const userToFolllow = action.payload?.user


        const index = state.feedData?.followings?.findIndex(item => item._id === userToFolllow._id)
        const index2 = state.feedData?.suggestions?.findIndex(item => item._id === userToFolllow._id)

        if(index !== undefined && index !== -1){
            state.feedData.followings.splice(index,1)
            state.feedData.suggestions.push(userToFolllow)
            
        }else{
            state.feedData?.followings.push(userToFolllow)
            state.feedData?.suggestions.splice(index2,1)
        }

    })
  },
});

// export const {  } = postSlice.actions;
export default feedSlice.reducer;

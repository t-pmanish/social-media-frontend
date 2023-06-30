import React, { useEffect } from "react";
import "./Feed.scss";
import Post from "../Post/Post";
import Follower from "../Follower/Follower";
import { useDispatch ,useSelector} from "react-redux";
import { getFeedData  } from "../../redux/slices/feedSlice";


function Feed() {

  const dispatch = useDispatch()

  const feedData = useSelector((store)=>store.feedReducer.feedData)

  useEffect(()=>{

    dispatch(getFeedData())
    
  },[])


  return (
    <div className="feed">
      <div className="container">
        <div className="leftPart">

            {
              feedData?.posts?.map( post => <Post key={post._id} post={post}/>)
            }
        </div>
        <div className="rightPart">
          <div className="followings">
              <h3 className="title">You are Following</h3>
              {
                feedData?.followings?.map( user => <Follower key={user._id} user={user} />)
              }
          </div>

          <div className="toFollow">
              <h3 className="title">Suggested For Follow</h3>
              {
                feedData?.suggestions?.map( user => <Follower key={user._id} user={user} />)
              }
          </div>

        </div>
      </div>
    </div>
  );
}

export default Feed;

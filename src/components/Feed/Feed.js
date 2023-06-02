import React from "react";
import "./Feed.scss";
import Post from "../Post/Post";
import Follower from "../Follower/Follower";
function Feed() {
  return (
    <div className="feed">
      <div className="container">
        <div className="leftPart">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="rightPart">
          <div className="followings">
              <h3 className="title">You are Following</h3>
              <Follower />
              <Follower />
              <Follower />
          </div>

          <div className="toFollow">
              <h3 className="title">Suggested For Follow</h3>
              <Follower />
              <Follower />
              <Follower />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Feed;

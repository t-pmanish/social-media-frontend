import React from "react";
import "./Profile.scss";
import Post from "../Post/Post";
import userImg from "./../../assests/hacker.png";
import { useNavigate } from "react-router-dom";

function Profile() {


  const navigate = useNavigate()


  return (
    <div className="profile">
      <div className="container">
        <div className="leftPart">
          <Post />
          <Post />
          <Post />
        </div>
        <div className="rightPart">
          <div className="profileCard">
            <img className="userImage" src={userImg} alt="user-img" />
            <h3 className="userName">Anuj Kumar Sharma</h3>

            <div className="followersFollowingsName">
                 <h4>
                  <p>40</p>
                  <p> Followers</p>
                 </h4>
                 <h4>
                  <p>30</p>
                  <p>Followings</p>
                 </h4>
            </div>

            <button className="btn-primary hover-link">Follow</button> 
            <button className="btn-secondary hover-link" onClick={()=>navigate('/updateProfile') }>Update Profile</button> 

            {/* Follow or unFollow */}
            {/* update for logged in user */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

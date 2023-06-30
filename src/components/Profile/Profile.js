import React, { useEffect, useState } from "react";
import "./Profile.scss";
import Post from "../Post/Post";
import { useNavigate, useParams } from "react-router-dom";
import CreatePost from "../CreatePost/CreatePost";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/slices/postSlice";
import { followAndUnfollowUser } from "../../redux/slices/feedSlice";

function Profile() {
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userProfile = useSelector((store) => store.postReducer.userProfile);
  const myProfile = useSelector((store) => store.appConfigReducer.myProfile); // logged in user
  const feedData = useSelector((store) => store.feedReducer.feedData);

  const userId = params?.userId; // cliked user we get userId
  const currentUserId = myProfile?._id;

  useEffect(() => {
    dispatch(getUserProfile({ userId }));
    if (userId === currentUserId) {
      setIsMyProfile(true);
    } else {
      setIsMyProfile(false);
    }

    if (feedData?.followings?.find((item) => item._id === userId)) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }

  }, [params.userId, myProfile,feedData]);

  
  const handleUserFollow = () =>{
    dispatch(followAndUnfollowUser({
      userIdToFollow:userId
    }))
}

  return (
    <div className="profile">
      <div className="container">
        <div className="leftPart">
          {isMyProfile && <CreatePost />}

          {userProfile?.posts?.map((post) => {
            return <Post key={post?._id} post={post} />;
          })}
        </div>
        <div className="rightPart">
          <div className="profileCard">
            <img
              className="userImage"
              src={userProfile?.avatar?.url}
              alt="user-img"
            />
            <h3 className="userName">{userProfile?.name}</h3>
            <p>{userProfile?.bio}</p>

            <div className="followersFollowingsName">
              <h4>
                <p>{userProfile?.followers?.length}</p>
                <p> Followers</p>
              </h4>
              <h4>
                <p>{userProfile?.followings?.length}</p>
                <p>Followings</p>
              </h4>
            </div>

            {isMyProfile ? (
              <button
                className="btn-secondary hover-link"
                onClick={() => navigate("/updateProfile")}
              >
                Update Profile
              </button>
            ) : (
              <button className="btn-primary hover-link" onClick={handleUserFollow}>
                { isFollowing ? 'Unfollow':'Follow'}
              </button>
            )}

            {/* Follow or unFollow */}
            {/* update for logged in user */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

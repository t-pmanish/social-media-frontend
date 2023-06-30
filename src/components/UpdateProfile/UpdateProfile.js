import React, { useEffect, useState } from "react";
import "./UpdateProfile.scss";
import userImgAvatar from "./../../assests/hacker.png";
import { useSelector, useDispatch } from "react-redux";
import { setLoading, updateMyProfile } from "../../redux/slices/appConfigSlice";

function UpdateProfile() {
  const dispatch = useDispatch();
  const myProfile = useSelector((store) => store.appConfigReducer.myProfile);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userImg, setUserImg] = useState("");

  useEffect(() => {
    setName(myProfile?.name || "");
    setBio(myProfile?.bio || "");
    setUserImg(myProfile?.avatar?.url || "");
  }, [myProfile]);

  function handleImageChange(e) {
    e.preventDefault();

    // file reader -> base64 input of our file
    const file = e.target.files[0]; // array

    // encode into base64 -> for sending to backend
    const fileReader = new FileReader(); // from DOM
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result);
        // console.log("image data", fileReader.result);
      }
    };
  }

  function handleSubmit(e) {
    e.preventDefault();

    // post request

    dispatch(
      updateMyProfile({
        name,
        bio,
        userImg,
      })
    );
  }

  return (
    <div className="updateProfile">
      <div className="container">
        <div className="leftPart">
          {/* <img className="userImg" src={userImgAvatar} alt="userImg" /> */}
          <div className="input-user-img">
            <label htmlFor="inputImg" className="labelImg">
              <img src={userImg ? userImg : userImgAvatar} alt="userImage" />
            </label>
            <input
              id="inputImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="inputImg"
            />
          </div>
        </div>
        <div className="rightPart">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Your Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <input
              type="submit"
              className="btn-primary updateBtn hover-link"
              value={"Update"}
              onClick={handleSubmit}
            />
          </form>

          <div className="deleteProfile">
            <button className="deleteProfileBtn hover-link">
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;

import React, { useState } from "react";
import "./CreatePost.scss";
import Avatar from "../Avatar/Avatar";
import { FcAddImage } from "react-icons/fc";
import { axiosClient } from "../../utils/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { getUserProfile } from "../../redux/slices/postSlice";

function CreatePost() {
  const myProfile = useSelector((store) => store.appConfigReducer.myProfile);

  const [caption, setCaption] = useState("");
  const [postImg, setPostImg] = useState("");

  const dispatch = useDispatch();

  function handleImageChange(e) {
    e.preventDefault();
    const file = e.target.files[0];
    // encode this file into base64

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setPostImg(fileReader.result);
      }
    };
  }

  async function handlePostSubmit(e) {
    e.preventDefault();

    // create post

    // no extra reduder

    try {
      dispatch(setLoading(true));
      const response = await axiosClient.post("/posts/create", {
        caption,
        postImg,
      });

      // console.log("post - ", response);

      dispatch(getUserProfile({ userId: myProfile?._id }));
    } catch (error) {
    } finally {
      dispatch(setLoading(false));
      setCaption("");
      setPostImg("");
    }
  }

  return (
    <div className="createPost">
      <div className="leftPart">
        <Avatar className="userAvatar" src={myProfile?.avatar?.url} />
      </div>
      <div className="rightPart">
        <input
          type="text"
          value={caption}
          placeholder="What is in your mind?"
          onChange={(e) => setCaption(e.target.value)}
          className="captionInput"
          required
        />
        <div className="imgContainer">
          <img className="postImg" src={postImg} />
        </div>

        <div className="bottomPart">
          <div className="inputPostImg">
            <label htmlFor="postImg" className="labelImg">
              {/* <img src={postImg ? postImg : ""} /> */}
              <FcAddImage className="bscardImage" />
            </label>
            <input
              id="postImg"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <button
            className="btn-primary postBtn hover-link"
            onClick={handlePostSubmit}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;

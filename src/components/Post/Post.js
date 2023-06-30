import React from "react";
import "./Post.scss";
import Avatar from "../Avatar/Avatar";
import postImg3 from "./../../assests/nature2.avif";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { likeAndUnlikePost } from "../../redux/slices/postSlice";
import { useNavigate } from "react-router-dom";

function Post({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handlePostLike() {
    dispatch(likeAndUnlikePost({ postId: post?._id }));
  }
  return (
    <div className="post">
      <div
        className="heading hover-link"
        onClick={() => navigate(`/profile/${post.owner._id}`)}
      >
        <Avatar src={post?.owner?.avatar?.url} />
        <h4>{post?.owner?.name}</h4>
      </div>
      <div className="content">
        <img
          src={post?.image?.url ? post?.image?.url : postImg3}
          alt="post img"
        />
      </div>
      <div className="footer">
        <div className="like">
          <div className="likesCount hover-link" onClick={handlePostLike}>
            {post?.isLiked ? (
              <AiFillHeart className="likeIcon hover-link filled" />
            ) : (
              <AiOutlineHeart className="likeIcon hover-link " />
            )}

            <h4>{post?.likesCount} likes</h4>
          </div>
          <div className="postTime">
            <p> {post?.timeAgo}</p>
          </div>
        </div>
        <div className="postCaption">
          <p>{post?.caption}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;

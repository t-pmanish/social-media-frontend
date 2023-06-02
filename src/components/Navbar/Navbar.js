import React, { useRef, useState } from "react";
import "./Navbar.scss";
import Avatar from "../Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import LoadingBar from "react-top-loading-bar";

function Navbar() {
  const loadingRef = useRef();
  const navigate = useNavigate();
  const [loading, setLoading ] = useState(false);

  function toggleLoading() {
    if (loading) {
      setLoading(false);
      loadingRef.current.complete();
    } else {
      setLoading(true);
      loadingRef.current.continuousStart();
    }
  }

  return (
    <div className="navbar">
      <LoadingBar height={6} color="#f11946" ref={loadingRef} />
      <div className="container">
        <h2 className="banner hover-link" onClick={() => navigate("/")}>
          Social Media
        </h2>
        <div className="rightSide">
          <div
            className="profile hover-link"
            onClick={() => navigate("/profile/123")}
          >
            <Avatar />
          </div>
          <div className="logout hover-link" onClick={toggleLoading}>
            <AiOutlineLogout className="logoutIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

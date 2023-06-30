import React from "react";
import "./Navbar.scss";
import Avatar from "../Avatar/Avatar";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/slices/appConfigSlice";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, removeItem } from "../../utils/localStorageManager";


function Navbar() {

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const myProfile = useSelector((store)=>store.appConfigReducer.myProfile)


  async function handleLogoutClick(){
       try {
          dispatch(setLoading(true))
          await axiosClient.post('/auth/logout') // from backend cookies also deleted for refresh token
          removeItem(KEY_ACCESS_TOKEN) // also remove access token from local storage
          navigate('/login')
          dispatch(setLoading(false))
       } catch (error) {
          console.log('error from logout - ',error);
       }
  }

  return (
    <div className="navbar">

      <div className="container">
        <h2 className="banner hover-link" onClick={() => navigate("/")}>
          Social Media
        </h2>
        <div className="rightSide">
          <div
            className="profile hover-link"
            onClick={() => navigate(`/profile/${myProfile?._id}`)}
          >
            <Avatar src={myProfile?.avatar?.url}/>
          </div>
          <div className="logout hover-link" onClick={handleLogoutClick}>
            <AiOutlineLogout className="logoutIcon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

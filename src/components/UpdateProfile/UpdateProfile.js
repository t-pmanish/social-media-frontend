import React from "react";
import "./UpdateProfile.scss";
import userImg from './../../assests/hacker.png'

function UpdateProfile() {
  return (
    <div className="updateProfile">
      <div className="container">
        <div className="leftPart">
               <img className="userImg" src={userImg} alt="userImg" /> 
        </div>
        <div className="rightPart">
          <form>
            <input type="text " placeholder="Your Name" />
            <input type="text " placeholder="Your Bio" />
            <input type="submit" className="btn-primary updateBtn hover-link" value={'Update'}/>
          </form>

          <div className="deleteProfile">
              <button className="deleteProfileBtn hover-link">Delete Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;

import React, { useState } from "react";
import "./Signup.scss";
import { Link } from "react-router-dom";
import { axiosClient } from "../../utils/axiosClient";

function Signup() {

  const [name,setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  async function handleSubmit(event){
    event.preventDefault()

    try {

      const response = await axiosClient.post('/auth/signup',{
        name,
        email,
        password
      })

      console.log('signup - ');
      
    } catch (error) {
      
    }

  }


  return <div className="signup">
    <div className="signupBox">
        <h2 className="heading">Signup</h2>
        <form onSubmit={handleSubmit}>

        <label htmlFor="name">Name</label>
          <input type="name" className="name" id="name" onChange={(e)=>setName(e.target.value)} />

          <label htmlFor="email">Email</label>
          <input type="email" className="email" id="email" required onChange={(e)=>setEmail(e.target.value)}/>

          <label htmlFor="password">Password</label>
          <input type="password" className="password" id="password" required onChange={(e)=>setPassword(e.target.value)}/>

          <input type="submit" className="submit" value={"Submit"} onSubmit={handleSubmit}/>
        </form>
        <p className="subHeading">
          Already have an account ? <Link to={"/login"}>Login</Link>
        </p>
      </div>
  </div>;
}

export default Signup;

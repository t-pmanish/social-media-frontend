import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import { axiosClient } from "../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../utils/localStorageManager";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    // axios client helps to call api -> login api for now

    // axioClient.mehtod('/url_after_base_url',body) -> return promise

    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });

      // this rejult  -> {config,data,status,statusText,headers}
      // here data is our actual data object

      console.log("main axios client api call reposnse (login) - ");

      // getting access_token from frontEnd as we have logged in
      // set access token into local storage
      // in cookies already from backend refresh token has saved

      // get the access token
      const access_token = response.rejult.access_token;
      // console.log("access token  - login (main axios) - ", access_token);

      //set the access token to local storage
      setItem(KEY_ACCESS_TOKEN,access_token)

      // navigate to home page
      navigate('/')



    } catch (error) {
      console.log("from login - ", error);
    }
  };

  return (
    <div className="login">
      <div className="loginBox">
        <h2 className="heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="password"
            id="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="submit"
            className="submit"
            value={"Submit"}
            onSubmit={handleSubmit}
          />
        </form>
        <p className="subHeading">
          Don't have an account ? <Link to={"/signup"}>Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

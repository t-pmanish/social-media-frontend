import React, { useEffect } from "react";
import "./Home.scss";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { getMyInfo } from "../../redux/slices/appConfigSlice";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    // as home loads get all info of user logged in
    dispatch(getMyInfo());
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Home;

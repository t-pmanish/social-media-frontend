import React from "react";
import "./Home.scss";
import {Outlet} from 'react-router-dom'
import Navbar from "../../components/Navbar/Navbar";

function Home() {
  return <>

    <Navbar/>

    <Outlet />
  </>;
}

export default Home;

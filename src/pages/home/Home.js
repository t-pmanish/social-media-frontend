import React, { useEffect } from "react";
import "./Home.scss";
import { axiosClient } from "../../utils/axiosClient";

function Home() {

  useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    try {
      const response = await axiosClient.get("/posts/all");
      console.log("from home (main axios)- ", response);
      
    } catch (error) {
      console.log('home.js error - ',error);
    }
  }


  return <div>Home</div>;
}

export default Home;

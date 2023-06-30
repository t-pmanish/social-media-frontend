import "./App.scss";
import RequireUser from "./components/RequireUser";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import Feed from './components/Feed/Feed'
import Profile from './components/Profile/Profile'
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
import LoadingBar from "react-top-loading-bar";
import { useSelector } from "react-redux";
import OnlyIfNotLoggedIng from "./components/OnlyIfNotLoggedIng";

function App() {
  
  const isLoading = useSelector((store)=>store.appConfigReducer.isLoading)
  const loadingRef = useRef(null);

  useEffect(()=>{

    if(isLoading){
      loadingRef?.current?.continuousStart()
    }else{
      loadingRef?.current?.complete()
    }

  },[isLoading])

  return (
    <div className="App">
      <LoadingBar height={6} color="#f11946" ref={loadingRef} />
      <Routes>
        <Route element={<RequireUser />}>
          <Route  element={<Home />} >
                <Route path="/" element={<Feed />} />      
                <Route path="/profile/:userId" element={<Profile />} />      
                <Route path="/updateProfile" element={<UpdateProfile />} />      
          </Route>
        </Route>

        <Route element={<OnlyIfNotLoggedIng />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Route>

        
      </Routes>
    </div>
  );
}

export default App;

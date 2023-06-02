import "./App.scss";
import RequireUser from "./components/RequireUser";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import { Routes, Route } from "react-router-dom";
import Feed from './components/Feed/Feed'
import Profile from './components/Profile/Profile'
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<RequireUser />}>
          <Route  element={<Home />} >
                <Route path="/" element={<Feed />} />      
                <Route path="/profile/:userId" element={<Profile />} />      
                <Route path="/updateProfile" element={<UpdateProfile />} />      
          </Route>
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;

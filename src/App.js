import Home from "./components/Home.js";
import "./App.css";
import About from "./components/About.js";
import Login from "./components/Login.js";
import Error404 from "./components/Error404.js";
import Signup from "./components/Signup.js";

import { Routes, Route } from "react-router-dom";
import Gallery from "./components/Api/Gallery.js";
import StandardUser from "./components/StandardUser.js";
import AdminUser from "./components/AdminUser.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<Error404 />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="standardUser" element={<StandardUser />} />
        <Route path="adminUser" element={<AdminUser />} />
      </Routes>
    </div>
  );
}

export default App;

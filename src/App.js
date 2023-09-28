import { React } from "react";
import { Link, Routes, Route} from "react-router-dom";
import HomePage from "./pages/general/Home/HomePage";
import SignUpPage from "./pages/guest/SignUp/SignUpPage";
import LoginPage from "./pages/guest/Login/LoginPage";

import "./App.scss";

export default function App() {

  return (
    <div className="App">
      <header>
        <h1>APP V1</h1>
        <nav>
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/signup'>SignUp</Link></li>
              <li><Link to='/login'>Login</Link></li>
            </ul>
          </nav>
      </header>

      <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  );
}


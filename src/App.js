import { React } from "react";
import { Routes, Route} from "react-router-dom";
import HomePage from "./pages/general/Home/HomePage";
import SignUpPage from "./pages/guest/SignUp/SignUpPage";
import LoginPage from "./pages/guest/Login/LoginPage";

import "./App.scss";
import Dashboard from "./components/Content/Dashboard/Dashboard";
import Users from "./components/Content/Users/ListUsers";


export default function App() {

  return (
    <div className="App">
      
      <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/users' element={ <Users/> } />
          <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}


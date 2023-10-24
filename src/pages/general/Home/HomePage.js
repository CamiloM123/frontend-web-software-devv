import React from "react";
import { Home } from "../../../components/General/Home/Home";
// import { Login } from "../../../components/Auth/Login/Login";
import Layout from "../../../components/General/Layout/Layout";


const HomePage = () => {
  return (
    <>
      <Layout/>
      <div>Home Page</div>
      <Home></Home>
    </>
  );
};

export default HomePage;
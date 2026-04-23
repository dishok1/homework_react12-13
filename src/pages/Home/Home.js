import React from "react";
import { Link } from "react-router-dom";
import Style from "./home.module.scss";

const Home = () => {
  return (
    <div className={Style.homePage}>
      <h1>Welcome to your ToDo List! 🚀</h1>
      <p>Organize your tasks easily and efficiently.</p>
      <Link to="/todo-list" className={Style.startBtnLink}>
        Start
      </Link>
    </div>
  );
};

export default Home;

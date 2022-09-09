import React from "react";
import { NavLink } from "react-router-dom";
import c from "./Header.module.css";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";

export const Header = ({ email, isLogged, logoutThunk }) => {
  const dispatch = useDispatch();

  const activeLink = ({ isActive }) => (isActive ? c.active : "");

  const onClick = () => {
    localStorage.clear();
    dispatch(logoutThunk());
  };

  return (
    <div className={c.header}>
      <div className={c.header__content}>
        <div className={c.header__item}>
          <NavLink className={activeLink} to={"/registration"}>
            Registration
          </NavLink>

          <NavLink className={activeLink} to={"/login"}>
            Login
          </NavLink>
          <NavLink className={activeLink} to={"/changePassword"}>
            Change Password
          </NavLink>
        </div>
      </div>

      {email && isLogged ? (
        <div className={c.infoBlock}>
          <span> {email} </span>
          <Button variant="outlined" onClick={onClick}>
            Log out
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default Header;

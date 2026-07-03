import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../services/auth/authService";
import { logout } from "../../features/authSlice";
function LogoutBtn() {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-block px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-200 rounded-full hover:bg-neutral-900 hover:text-white"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;

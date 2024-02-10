import {  Outlet, Navigate } from "react-router-dom";

function AdminLoginMiddleware() {
    let auth_token=localStorage.getItem('Token')
  return (
    auth_token?<Navigate to={"/admin/dashboard"}/>:<Outlet/>
  ) 
}

export default AdminLoginMiddleware;
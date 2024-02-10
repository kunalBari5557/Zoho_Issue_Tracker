import { Navigate, Outlet } from "react-router";

function AdminMiddleware() {
    let auth_token=localStorage.getItem('Token')
  return (
    auth_token?<Outlet/>:<Navigate to={"/admin/login"}/>
  ) 
}

export default AdminMiddleware;
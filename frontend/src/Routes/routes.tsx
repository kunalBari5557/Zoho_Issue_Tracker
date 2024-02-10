import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loader } from '../Components/GoBack';
import AdminLoginMiddleware from '../Components/Middleware/Admin/login';
import AdminLogin from '../pages/Login/login';
import AdminMiddleware from '../Components/Middleware/Admin';
import AdminLayout from '../Layout/Admin_Dashboard';
import AdminDashboard from '../pages/Dashboard';
import UserList from '../pages/User/index';
import UserAdd from '../pages/User/store';
import UsersShow from '../pages/User/show';
import UserEdit from '../pages/User/edit';
import RoleEdit from '../pages/Role/edit';
import RoleList from '../pages/Role';
import RoleAdd from '../pages/Role/store';

import IssueAdd from '../pages/CreateIssue/store';
import IssueEdit from '../pages/CreateIssue/edit';
import ProjectList from '../pages/Projects';
import ProjectAdd from '../pages/Projects/store';
import ProjectEdit from '../pages/Projects/edit';
import { IssueOpen, Resolved } from '../pages/CreateIssue/issueStatus';
import { Issues } from '../pages/CreateIssue';

const Admin_Routes = () => {

    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Loader />} /> */}
                <Route element={<AdminLoginMiddleware />}>
                    <Route path="/" element={<AdminLogin />} />
                </Route>
                <Route element={<AdminMiddleware />}>
                    <Route element={<AdminLayout />} path="/admin/">
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="users" element={<UserList />} />
                        <Route path="users/store" element={<UserAdd />} />
                        <Route path="users/show" element={<UsersShow />} />
                        <Route path="users/edit" element={<UserEdit />} />
                        <Route path="roles" element={<RoleList />} />
                        <Route path="roles/store" element={<RoleAdd />} />
                        <Route path="roles/show" element={<UsersShow />} />
                        <Route path="roles/edit" element={<RoleEdit />} />
                        <Route path="issues" element={<Issues />} />
                        <Route path="open" element={<IssueOpen />} />
                        <Route path="resolved" element={<Resolved />} />
                        <Route path="issues/store" element={<IssueAdd />} />
                        <Route path="issues/edit" element={<IssueEdit />} />
                        <Route path="projects" element={<ProjectList />} />
                        <Route path="projects/store" element={<ProjectAdd />} />
                        <Route path="projects/edit" element={<ProjectEdit />} />
                    </Route>

                </Route>
            </Routes>
        </BrowserRouter>
    )

}
export default Admin_Routes
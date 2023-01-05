import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./App.css";
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from './pages/Mainpage';
import Washpage from './pages/Washpage';
import Dashboardpage from './pages/Dashboardpage';
import Listpage from './pages/Listpage';
import Jobspage from './pages/staff/jobspage';
import Loginpage from './pages/auth/loginpage'
//User
import CreateUserPage from "./pages/admin/users/CreateUserPage";
import EditUserPage from "./pages/admin/users/EditUserPage";
import ListUserPage from "./pages/admin/users/ListUserPage";
import ChangeGroupPage from "./pages/admin/users/ChangeGroupPage"

import CreateGroupPage from './pages/admin/groups/CreateGroupPage';
import EditGroupPage from './pages/admin/groups/EditGroupPage';
import ListGroupPage from './pages/admin/groups/ListGroupPage';

import CreateCarSizePage from "./pages/admin/car_sizes/CreateCarSizePage";
import EditCarSizePage from "./pages/admin/car_sizes/EditCarSizePage";
import ListCarSizePage from "./pages/admin/car_sizes/ListCarSizePage";

import CreateWashtypePage from "./pages/admin/washtypes/CreateWashtypePage";
import EditWashtypePage from "./pages/admin/washtypes/EditWashtypePage";
import ListWashtypePage from "./pages/admin/washtypes/ListWashtypePage";

import CreatePricePage from "./pages/admin/prices/CreatePricePage";
import EditPricePage from "./pages/admin/prices/EditPricePage";
import ListPricePage from "./pages/admin/prices/ListPricePage";

import MyCarPage from "./pages/public/MyCarPage";

import ActivitiesJobspage from "./pages/staff/activitiesjobpage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />}></Route>
        <Route path="/washpage/:shopid" element={<Washpage />}></Route>
        <Route path="/dashboardpage" element={<Dashboardpage />}></Route>
        <Route path="/listpage/:shop_id" element={<Listpage />}></Route>
        <Route path="/staff/jobspage" element={<Jobspage />}></Route>
        <Route path="/login" element={<Loginpage />}></Route>

        <Route path="/admin/user/create" element={<CreateUserPage />}></Route>
        <Route path="/admin/user/edit/:id" element={<EditUserPage />}></Route>
        <Route path="/admin/user/list" element={<ListUserPage />}></Route>
        <Route path="/admin/user/editgroup/:id" element={<ChangeGroupPage />}></Route>
        

        <Route
          path="/admin/group/create"
          element={<CreateGroupPage />}
        ></Route>
        <Route
          path="/admin/group/edit/:id"
          element={<EditGroupPage />}
        ></Route>
        <Route path="/admin/group/list" element={<ListGroupPage />}></Route>

        <Route
          path="/admin/carsize/create"
          element={<CreateCarSizePage />}
        ></Route>
        <Route
          path="/admin/carsize/edit/:id"
          element={<EditCarSizePage />}
        ></Route>
        <Route path="/admin/carsize/list" element={<ListCarSizePage />}></Route>

        <Route
          path="/admin/washtype/create"
          element={<CreateWashtypePage />}
        ></Route>
        <Route
          path="/admin/washtype/edit/:id"
          element={<EditWashtypePage />}
        ></Route>
        <Route path="/admin/washtype/list" element={<ListWashtypePage />}></Route>

        <Route
          path="/admin/price/create"
          element={<CreatePricePage />}
        ></Route>
        <Route
        path="/admin/price/edit/:id"
        element={<EditPricePage />}
      ></Route>
         <Route
          path="/admin/price/list"
          element={<ListPricePage />}
        ></Route>

        <Route
          path="/staff/activitiesjob/:id"
          element={<ActivitiesJobspage />}
        ></Route>

        <Route
          path="/mycar/view/:id"
          element={<MyCarPage />}
        ></Route>



      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

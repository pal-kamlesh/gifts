import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import PageNotFound from "./pages/PageNotFound.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ProtectedRoute } from "./components/index.js";
import Sidebar from "./pages/Sidebar.jsx";
import {
  Archive,
  Delivery,
  Member,
  Reports,
  Selection,
  Dashboard,
  User,
} from "./pages/index.js";
const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="404" element={<PageNotFound />} />

    <Route element={<ProtectedRoute />}>
      <Route element={<Sidebar />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<Member />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/selection" element={<Selection />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/users" element={<User />} />

        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Route>
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <ToastContainer position="top-center" pauseOnFocusLoss={true} />
    <AppRoutes />
  </BrowserRouter>
);

export default App;

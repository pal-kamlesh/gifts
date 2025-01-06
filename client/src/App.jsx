import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Home, User } from "./pages";
import Login from "./pages/Login.jsx";
import Layout from "./pages/Layout.jsx";
import { ToastContainer } from "react-toastify";
import PageNotFound from "./pages/PageNotFound.jsx";
const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="user" element={<User />} />
      <Route path="404" element={<PageNotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
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

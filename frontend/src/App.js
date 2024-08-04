import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Root from "./pages/Root";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import MainPage from "./pages/MainPage";
import { UserProvider } from "./context/userContext";
import { JobProvider } from "./context/jobContext";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPasswordPage />,
      },
      {
        path: "main", 
        element: <ProtectedRoute><MainPage /></ProtectedRoute>,
      },
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <JobProvider>
        <RouterProvider router={router} />
      </JobProvider>
    </UserProvider>
  );
}

export default App;

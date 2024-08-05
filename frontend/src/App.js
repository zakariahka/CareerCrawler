import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Root from "./pages/Root";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import MainPage from "./pages/MainPage";
import { UserProvider } from "./context/userContext";
import { JobProvider } from "./context/jobContext";
import ProtectedRoutes from "./components/ProtectedRoutes";

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
        element: <ProtectedRoutes />,
        children: [
          {
            path: "main",
            element: <MainPage />,
          },
         
        ],
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

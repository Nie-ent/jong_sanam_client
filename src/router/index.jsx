import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "../layout/mainLayout";
import DashboardPage from "../pages/admin/DashboardPage";
import PitchManagePage from "../pages/admin/PitchManagePage";
import UserManagePage from "../pages/admin/UserManagePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import useAuthStore from "../stores/authStore";

const authRouter = createBrowserRouter([
    { path: "/", element: <LoginPage /> },
    { path: "register", element: <RegisterPage />, },
]);


const adminRouter = createBrowserRouter([
    {
        path: "/", element: <MainLayout />,
        children: [
            { index: true, element: <DashboardPage /> },
            { path: '/pitch', element: <PitchManagePage /> },
            { path: '/user', element: <UserManagePage /> },
            // { path: "*", element: <Navigate to='/' /> }
        ]
    },
])

function AppRouter() {
    const isAdmin = useAuthStore(state => state.user)
    const finalRouter = isAdmin ? adminRouter : authRouter
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider key={isAdmin?.id} router={finalRouter} />
        </Suspense>
    )
}

export default AppRouter
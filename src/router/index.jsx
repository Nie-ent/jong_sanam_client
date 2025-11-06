import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import useAuthStore from "../stores/authStore";
import MainLayout from "../layout/mainLayout";
import DashboardPage from "../pages/admin/DashboardPage";
import { Suspense } from "react";
import PitchManagePage from "../pages/admin/PitchManagePage";
import UserManagePage from "../pages/admin/UserManagePage";

const authRouter = createBrowserRouter([
    { path: '/', element: <LoginPage /> },
    { path: 'register', element: <RegisterPage /> },
])

const adminRouter = createBrowserRouter([
    {
        path: "/", element: <MainLayout />,
        children: [
            { index: true, element: <DashboardPage /> },
            { path: 'pitch', element: <PitchManagePage /> },
            { path: 'user', element: <UserManagePage /> },
            // { path: "*", element: <Navigate to='/' /> }
        ]
    },
])

function AppRouter() {
    const isAdmin = useAuthStore(state => state.user)
    console.log('isAdmin', isAdmin)
    const finalRouter = isAdmin ? adminRouter : authRouter
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RouterProvider key={isAdmin?.id} router={finalRouter} />
        </Suspense>
    )
}

export default AppRouter
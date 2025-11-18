import { NavLink, useNavigate } from "react-router";
import { HamburgerIcon } from "../icon/icon";
import { CalendarDays, LayoutGrid, Users, LogOut } from "lucide-react";
import useAuthStore from "../stores/authStore";

export default function Sidebar() {
    const logout = useAuthStore(state => state.logout);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/');
    }

    const navItems = [
        { label: "ตารางการจอง", path: "/", icon: CalendarDays },
        { label: "จัดการสนาม", path: "/pitch", icon: LayoutGrid },
        { label: "จัดการผู้ใช้", path: "/user", icon: Users },
    ];

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <aside className="min-w-80 bg-white min-h-full flex flex-col justify-between p-6 shadow-lg">
                <div>
                    <h2 className="text-2xl font-bold mb-6">ระบบจัดการสนาม</h2>
                    <ul className="flex flex-col gap-4 text-lg">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <li key={item.path}>
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${isActive
                                                ? "bg-blue-500 text-white"
                                                : "text-gray-700 hover:bg-gray-100"
                                            }`
                                        }
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </NavLink>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <button
                    onClick={onLogout}
                    className="mt-6 w-full py-2 text-white font-semibold bg-red-500 hover:bg-red-400 rounded-md transition-all flex items-center justify-center gap-2"
                >
                    <LogOut className="w-5 h-5" />
                    Logout
                </button>
            </aside>

            {/* Main content */}
            <main className="flex-1 bg-gray-50 p-6 overflow-auto">
                {/* Page content จะมาวางตรงนี้ */}
            </main>
        </div>
    );
}

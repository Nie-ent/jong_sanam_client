import { NavLink } from "react-router"
import { HamburgerIcon } from "../icon/icon"
import useAuthStore from "../stores/authStore"

function Sidebar() {
    const logout = useAuthStore(state => state.logout)

    const onSubmit = async () => {
        // await new Promise()

        logout()
        navigator('/')
    }

    return (
        <div className="drawer lg:drawer-open w-fit">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer flex flex-col items-center justify-start w-1/4 ">
                {/* Page content here */}
                <label htmlFor="my-drawer-3" className="cursor-pointer h-screen lg:hidden mx-8">
                    <HamburgerIcon className='w-10 my-4' />
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <div className="menu bg-base-100 min-h-full w-80 p-4 flex-col justify-between">
                    <ul className='text-2xl flex flex-col gap-4'>
                        <li><NavLink to='/'>ตารางการจอง</NavLink></li>
                        <li><NavLink to='pitch'>จัดการสนาม</NavLink></li>
                        <li><NavLink to='user'>จัดการผู้ใช้</NavLink></li>
                    </ul>
                    <button onClick={onSubmit} className="mx-auto font-bold text-white bg-red-500 hover:bg-red-400 cursor-pointer px-26 rounded-sm py-2  text-end text-2xl">Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
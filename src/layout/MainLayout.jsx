import { Outlet } from 'react-router'
import Sidebar from '../components/Sidebar'

function MainLayout() {
    return (
        <div className='min-h-screen flex'>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default MainLayout
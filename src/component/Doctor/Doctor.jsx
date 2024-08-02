import Sidebar, { SidebarItem } from '../Admin/SideBar';
import { Outlet } from "react-router-dom";
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';

const HomeDoctor = () => {
    return (
        <div className="flex">
            <div className="flex">
                <Sidebar>
                    <SidebarItem icon={<EventNoteOutlinedIcon size={20} />} text="Appointment" to='/doctor' />
                    <hr className="my-3 border-t-2" />
                    <SidebarItem icon={<AccountBoxOutlinedIcon size={16} />} text="Profile" to='profile-admin' />
                    <SidebarItem icon={<VpnKeyOutlinedIcon size={16} />} text="Change Password" to="change-password" />
                </Sidebar>
            </div>
            <Outlet />
        </div>
    )
}

export default HomeDoctor;
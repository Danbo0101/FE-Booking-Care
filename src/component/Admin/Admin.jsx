import Sidebar, { SidebarItem } from './SideBar';
import { Outlet } from "react-router-dom";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import GiteOutlinedIcon from '@mui/icons-material/GiteOutlined';
import MasksOutlinedIcon from '@mui/icons-material/MasksOutlined';
import VaccinesOutlinedIcon from '@mui/icons-material/VaccinesOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';

const App = () => {
    return (
        <div className="flex">
            <div className="flex">
                <Sidebar>
                    <SidebarItem icon={<DashboardOutlinedIcon size={20} />} text="Dashboard" to='/admin' />
                    <SidebarItem icon={<GiteOutlinedIcon size={20} />} text="Clinic" to='clinic' />
                    <SidebarItem icon={<MasksOutlinedIcon size={20} />} text="Doctor">
                        <SidebarItem icon={<InfoOutlinedIcon size={16} />} text="Thông tin Bác sĩ" to='doctor' />
                        <SidebarItem icon={<WorkHistoryOutlinedIcon size={16} />} text="Lịch làm của bác sĩ" to='schedule-doctor' />
                    </SidebarItem>
                    <SidebarItem icon={<VaccinesOutlinedIcon size={20} />} text="Specialties" to="specialties" />
                    <hr className="my-3 border-t-2" />
                    <SidebarItem icon={<SettingsOutlinedIcon size={20} />} text="Settings" >
                        <SidebarItem icon={<AccountBoxOutlinedIcon size={16} />} text="Profile" to='/' />
                        <SidebarItem icon={<VpnKeyOutlinedIcon size={16} />} text="Change Password" />
                    </SidebarItem>
                </Sidebar>
            </div>
            <Outlet />
        </div>
    );
};

export default App;
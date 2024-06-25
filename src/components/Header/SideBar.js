import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';

import { FaGem, FaGithub, FaQuestion, FaUser } from 'react-icons/fa';
import { MdDashboard, MdQuiz, MdOutlineLibraryBooks } from "react-icons/md";
// import sidebarBg from '../../assets/bg2.jpg';
import { Link, useNavigate } from 'react-router-dom';


const SideBar = (props) => {

    const nagivate = useNavigate();

    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                // image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    // onClick={() => nagivate('/')}
                    >
                        <MdQuiz size={'2em'} />  Quiz
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem icon={<MdDashboard />}>
                            Dashboard
                            <Link to="/admins" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            title={'Features'}
                            icon={<FaGem />}
                        >
                            <MenuItem icon={<FaUser />}>
                                Quản lý User
                                <Link to="/admins/manage-users" />
                            </MenuItem>
                            <MenuItem icon={<MdOutlineLibraryBooks />}>
                                Quản lý bài Quiz
                                <Link to="/admins/manage-quizzes" />
                            </MenuItem>
                            <MenuItem icon={<FaQuestion />}>
                                Quản lý câu hỏi
                                <Link to="/admins/manage-questions" />
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/danbo1812/React_Exam"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                React-Exam
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar;
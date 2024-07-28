import logo from "../../assets/images/logo.png"
import logoSmall from "../../assets/images/logo-1.png"
import React, { createContext, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/action/userAction";
import { postLogout } from "../../services/authService";


const SidebarContext = createContext();

const Sidebar = ({ children }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        let result = await postLogout();
        if (result.ER === 0) {
            dispatch(doLogout());
            navigate("/");
        }
        else {
            console.log(result.message);
        }

    }

    const [expanded, setExpanded] = useState(true)
    return (
        <>
            <aside className="h-screen">
                <nav className="h-full flex flex-col bg-gradient-to-r from-cyan-100 to-blue-200 border-r  shadow-md">
                    <div className={`p-5 pb-2 flex  items-center ${expanded ? "justify-between" : ""}`}>
                        <img src={logo} className={`overflow-hidden transition-all ${expanded ? "w-48" : "w-0"}`} />
                        <button onClick={() => setExpanded((curr) => !curr)} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100">
                            {expanded ? <FirstPageIcon /> : <img src={logoSmall} className="w-7" />}
                        </button>
                    </div>


                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>

                    <div className="border-t-2 flex p-3 items-center justify-center cursor-pointer"
                        onClick={() => handleLogout()}
                    >
                        {/* <img src={profile} className="w-10 h-10 rounded-md" /> */}
                        {expanded ?
                            <div
                                className="flex items-center justify-center gap-2 rounded-md outline py-1 px-4 font-semibold"

                            >
                                <PowerSettingsNewOutlinedIcon />
                                Log out

                            </div>
                            :
                            <Link>
                                <LogoutOutlinedIcon />
                            </Link>

                        }


                    </div>
                </nav>
            </aside>
        </>
    )
}

export const SidebarItem = ({ icon, text, active, to, children }) => {
    const { expanded } = useContext(SidebarContext);
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdownArrow, setShowDropdownArrow] = useState(true); // State to manage dropdown arrow visibility


    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <li className={`relative font-medium rounded-md transition-colors group `}>
            <Link to={to}
                className="flex items-center py-2 px-3 my-1 cursor-pointer"
                onClick={children ? handleToggle : undefined}
            >
                {icon}
                <span className={`overflow-hidden transition-all ml-3 ${expanded ? "w-52" : "w-0"}`}>{text}</span>
                {children && expanded && showDropdownArrow && <KeyboardArrowDownIcon className={`ml-auto ${isOpen ? "transform rotate-180" : ""}`} />}
            </Link>
            {isOpen && (
                <ul className="pl-6">
                    {React.Children.map(children, (child) => (
                        <li>{child}</li>
                    ))}
                </ul>
            )}
        </li>
    );
};

export default Sidebar;
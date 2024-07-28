import * as React from 'react';
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, } from '@heroicons/react/24/outline';
import { useState } from 'react';
import logo from '../../assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux';
import { AppBar } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import { postLogout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';
import { doLogout } from '../../redux/action/userAction';
import Profile from './Modal/Profile';
import History from './Modal/History';
import Setting from './Modal/Setting';




const Header = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const account = useSelector(state => state.user.account);

    const [openProfile, setOpenProfile] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [openSetting, setOpenSetting] = useState(false);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const bufferToDataURL = (buffer) => {
        const blob = new Blob([new Uint8Array(buffer.data)], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        return url;
    }

    const handleLogout = async () => {

        let result = await postLogout();
        if (result.ER === 0) {
            dispatch(doLogout());
            navigate('/login');
        }
        else {
            console.log(result.message);
        }
    }

    return (
        <>
            {
                isAuthenticated ?
                    <header className=" bg-cyan-50">
                        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8">
                            <div className="flex lg:flex-1">
                                <a href="/" className="-m-1.5 p-1.5 cursor-pointer">
                                    <img alt="" src={logo} className="h-20 w-auto" />
                                </a>
                            </div>
                            <div className="flex lg:hidden">
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(true)}
                                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="hidden lg:flex lg:gap-x-12">
                                <a href="/doctors" className="text-xl font-semibold leading-6 p-3 text-sky-400 rounded-lg hover:bg-yellow-300 hover:text-white">
                                    Bác sĩ
                                </a>
                                <a href="/specialties" className="text-xl font-semibold leading-6 p-3 text-sky-400 rounded-lg hover:bg-yellow-300 hover:text-white">
                                    Chuyên khoa
                                </a>
                                <a href="/clinics" className="text-xl font-semibold leading-6 p-3 text-sky-400 rounded-lg hover:bg-yellow-300 hover:text-white">
                                    Phòng khám
                                </a>
                            </div>
                            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        {account.image ?
                                            <Avatar
                                                sx={{ width: 45, height: 45 }}
                                                alt={account.name}
                                                src={bufferToDataURL(account.image)}
                                            />
                                            :
                                            <Avatar
                                                sx={{ width: 45, height: 45 }}
                                                alt={account.name}
                                            >{account.name}</Avatar>
                                        }

                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&::before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 55,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'center', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
                                >
                                    <MenuItem
                                        onClick={() => setOpenProfile(true)}
                                    >
                                        <ListItemIcon>
                                            <AccountCircleOutlinedIcon fontSize="small" />
                                        </ListItemIcon>
                                        Profile
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => setOpenHistory(true)}
                                    >
                                        <ListItemIcon>
                                            <HistoryOutlinedIcon fontSize="small" />
                                        </ListItemIcon>
                                        History
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => setOpenSetting(true)}>
                                        <ListItemIcon>
                                            <Settings fontSize="small" />
                                        </ListItemIcon>
                                        Settings
                                    </MenuItem>
                                    <MenuItem onClick={() => handleLogout()}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>

                            </div>

                        </nav>
                        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                            <div className="fixed inset-0 z-10" />
                            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                    </button>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <div className="space-y-2 py-6">
                                            <a
                                                href="#"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-sky-400 hover:bg-gray-50"
                                            >
                                                Bác sĩ
                                            </a>
                                            <a
                                                href="#"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-sky-400 hover:bg-gray-50"
                                            >
                                                Chuyên khoa
                                            </a>
                                            <a
                                                href="#"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-sky-400 hover:bg-gray-50"
                                            >
                                                Phòng khám
                                            </a>
                                        </div>
                                        <div className="py-6">
                                            <a
                                                href="#"
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 blue-gradient_text  hover:bg-gray-50"
                                            >
                                                Log in
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </Dialog>

                    </header>
                    :
                    <header className=" bg-cyan-50">
                        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-3 lg:px-8">
                            <div className="flex lg:flex-1">
                                <a href="/" className="-m-1.5 p-1.5 cursor-pointer">
                                    <img alt="" src={logo} className="h-20 w-auto" />
                                </a>
                            </div>
                            <div className="flex lg:hidden">
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(true)}
                                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                                >
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="hidden lg:flex lg:gap-x-12">
                                <a href="/doctors" className="text-xl font-semibold leading-6 p-3 text-sky-400 rounded-lg hover:bg-yellow-300 hover:text-white">
                                    Bác sĩ
                                </a>
                                <a href="/specialties" className="text-xl font-semibold leading-6 p-3 text-sky-400 rounded-lg hover:bg-yellow-300 hover:text-white">
                                    Chuyên khoa
                                </a>
                                <a href="/clinics" className="text-xl font-semibold leading-6 p-3 text-sky-400 rounded-lg hover:bg-yellow-300 hover:text-white">
                                    Phòng khám
                                </a>
                            </div>
                            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                                <a href="/login" className="blue-gradient_text text-lg font-semibold border-solid border-2 border-sky-500 rounded-lg py-px px-2.5 cursor-pointer hover:text-yellow-400">
                                    Login
                                </a>
                            </div>
                        </nav>
                        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                            <div className="fixed inset-0 z-10" />
                            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                    >
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                    </button>
                                </div>
                                <div className="mt-6 flow-root">
                                    <div className="-my-6 divide-y divide-gray-500/10">
                                        <div className="space-y-2 py-6">
                                            <a
                                                href="#"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-sky-400 hover:bg-gray-50"
                                            >
                                                Bác sĩ
                                            </a>
                                            <a
                                                href="#"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-sky-400 hover:bg-gray-50"
                                            >
                                                Chuyên khoa
                                            </a>
                                            <a
                                                href="#"
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-sky-400 hover:bg-gray-50"
                                            >
                                                Phòng khám
                                            </a>
                                        </div>
                                        <div className="py-6">
                                            <a
                                                href="#"
                                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 blue-gradient_text  hover:bg-gray-50"
                                            >
                                                Log in
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </Dialog>
                    </header>
            }
            <Setting
                open={openSetting}
                setOpen={setOpenSetting}
            />
            <Profile
                open={openProfile}
                setOpen={setOpenProfile}
            />
            <History
                open={openHistory}
                setOpen={setOpenHistory}
            />
        </>


    );
}


export default Header;

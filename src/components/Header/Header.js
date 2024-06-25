import './Header.scss';
import logo from "../../assets/images/logo.png";
import { IoIosSearch } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
// import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
// import SideBar from './SideBar';


const Header = (props) => {
    return (
        <div className='header-container'>
            <div className='left-container'>

                <img src={logo} alt='Booking care' className='logo' />

            </div>
            <div className='middle-container'>
                <div className='child-content'>
                    Bác sĩ
                </div>
                <div className='child-content'>
                    Gói khám
                </div>
                <div className='child-content'>
                    Chuyên khoa
                </div>
            </div>
            <div className='right-container'>
                <div className='search'>
                    <input
                        type='text'
                        placeholder='Search ...'
                        className='search-input'
                    />
                    <IoIosSearch className='search-icon' />
                </div>
                <div className='login'>
                    <IoPerson className='login-icon' />
                </div>
            </div>
        </div>
    )
}

export default Header;
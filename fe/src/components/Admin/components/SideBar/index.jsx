import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './SideBar.scss';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import logo from '../../../../../../FrontEnd/src/assets/img/logo.svg';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { GiBookshelf } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";



// khung lựa chọn
function SideBarAdmin() {
    return (
        <>
            <Box
                sx={{
                    height: '100vh',
                  
                    width: 'var(--default-layout-width-sidebar)',
                    float: 'left',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'var(--default-layout-height-header)',
                        marginBottom: '50px',
                    }}
                >
                    <img src={logo} alt="My SVG Image" style={{ marginTop: '40px', height: '70px',  }} />
                </Box>
                <Box
                    sx={{
                        color: '#fff',
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'var(--default-layout-height-header)',
                    }}
                >
                    <NavLink to="/admin/books" className="SideBarAdmin__link">
                        <IoMdHome className="SideBarAdmin__link-icon" />
                        Home
                    </NavLink>
                    <NavLink to="/admin/lib" className="SideBarAdmin__link">
                        <IoSearchSharp className="SideBarAdmin__link-icon" />
                        Search
                    </NavLink>
                    <NavLink to="/admin/lab" className="SideBarAdmin__link">
                        <GiBookshelf className="SideBarAdmin__link-icon" />
                        My Shelf
                    </NavLink>
                    {/* <NavLink to="/admin/rentPenalty" className="SideBarAdmin__link">
                        <WorkspacePremiumOutlinedIcon className="SideBarAdmin__link-icon" />
                        Lỗi hỏng sách
                    </NavLink> */}
                    <NavLink to="/admin/user" className="SideBarAdmin__link">
                        <ManageAccountsOutlinedIcon className="SideBarAdmin__link-icon" />
                        Quản lý tài khoản
                    </NavLink>
                </Box>
            </Box>
        </>
    );
}

export default SideBarAdmin;

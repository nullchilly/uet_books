import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './SideBar.scss';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';

// khung lựa chọn
function SideBarAdmin() {
    return (
        <>
            <Box
                sx={{
                    height: '100vh',
                    backgroundColor: '#3c4b64',
                    width: 'var(--default-layout-width-sidebar)',
                    float: 'left',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#303c54',
                        color: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 'var(--default-layout-height-header)',
                        marginBottom: '20px'
                    }}
                >
                    <Typography variant="h4" sx={{}}>
                        ADMIN
                    </Typography>
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
                        <Inventory2OutlinedIcon className="SideBarAdmin__link-icon" />
                        Quản lý sách
                    </NavLink>
                    <NavLink to="/admin/lib" className="SideBarAdmin__link">
                        <AccountBalanceOutlinedIcon className="SideBarAdmin__link-icon" />
                        Quản lý thư viện
                    </NavLink>
                    <NavLink to="/admin/lab" className="SideBarAdmin__link">
                        <StoreOutlinedIcon className="SideBarAdmin__link-icon" />
                        Quản lý phòng thí nghiệm
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

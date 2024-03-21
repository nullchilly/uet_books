import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './SideBar.scss';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';


function SideBarLab() {
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
                        Lab
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
                    <NavLink to="/lab/book" className="SideBarLab__link">
                        <Inventory2OutlinedIcon className="SideBarLab__link-icon" />
                        Sách
                    </NavLink>
                    <NavLink to="/lab/storage" className="SideBarLab__link">
                        <AccountBalanceOutlinedIcon className="SideBarLab__link-icon" />
                        Quản lý thư viện
                    </NavLink>
                    <NavLink to="/lab/import" className="SideBarLab__link">
                        <FileDownloadOutlinedIcon className="SideBarLab__link-icon" />
                        Nhập sách
                    </NavLink>
                    <NavLink to="/lab/rent" className="SideBarLab__link">
                        <FileUploadOutlinedIcon className="SideBarLab__link-icon" />
                        Sách đã cho mượn
                    </NavLink>
                    <NavLink to="/lab/rentPenalty" className="SideBarLab__link">
                        <WorkspacePremiumOutlinedIcon className="SideBarLab__link-icon" />
                        Lỗi hỏng sách
                    </NavLink>
                    {/* <NavLink to="/lab/delivery" className="SideBarLab__link">
                        <LocalShippingOutlinedIcon className="SideBarLab__link-icon" />
                        Vận chuyển
                    </NavLink> */}
                    
                </Box>
            </Box>
        </>
    );
}

export default SideBarLab;

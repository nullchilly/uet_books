import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import './SideBar.scss';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';

function SideBarLib() {
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
                        Lib
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
                    <NavLink to="/lib/storage" className="SideBarLib__link">
                        <AccountBalanceOutlinedIcon className="SideBarLib__link-icon" />
                        Quản lý phòng thí nghiệm
                    </NavLink>
                    <NavLink to="/lib/import" className="SideBarLib__link">
                        <FileDownloadOutlinedIcon className="SideBarLib__link-icon" />
                        Nhập sách
                    </NavLink>
                    <NavLink to="/lib/export" className="SideBarLib__link">
                        <FileUploadOutlinedIcon className="SideBarLib__link-icon" />
                        Chuyển sách
                    </NavLink>
                    {/* <NavLink to="/lib/rentPenalty" className="SideBarLib__link">
                        <WorkspacePremiumOutlinedIcon className="SideBarLib__link-icon" />
                        Lỗi hỏng sách
                    </NavLink> */}
                    <NavLink to="/lib/delivery" className="SideBarLib__link">
                        <LocalShippingOutlinedIcon className="SideBarLib__link-icon" />
                        Vận chuyển
                    </NavLink>
                    
                </Box>
            </Box>
        </>
    );
}

export default SideBarLib;

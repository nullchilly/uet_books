import './UserPenaltyDetails.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Skeleton } from '@mui/material';
import { Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { Stack } from '@mui/system';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    brentRadius: '10px',
    p: 3,
};

function UserLibDetails() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalSearch, setOpenModalSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordX2, setPasswordX2] = useState('');
    const [sdt, setSdt] = useState('');
    const [address, setAddress] = useState('');

    const [id, setId] = useState('');
    const handleSearch = (event) => {
        event.preventDefault();
    };
    // validate custom
    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== password) {
                return false;
            }
            return true;
        });
    });

    // Get data
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get('http://localhost:5001/user/userLib');
                setRows(res.data);
            } catch (err) {
                console.log('fe : ' + err.message);
            }
        };
        getData();
    }, []);

    // Create user
    const handleCreateUser = async () => {
        try {
            const res = await axios.post('http://localhost:5001/user/register', {
                name,
                username: email,
                password,
                sdt,
                address,
                role: 'lib',
            });
            if (res.data.register) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log('Register failed: ' + err.message);
        }
    };
    // Delete user
    const handleDeleteUser = async () => {
        try {
            const res = await axios.post('http://localhost:5001/user/delete', {
                id,
            });
            if (res.data.delete) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log('Register failed: ' + err.message);
        }
    };

    const handleEditUser = async () => {
        try {
            const res = await axios.post('http://localhost:5001/user/update', {
                id,
                name,
                email,
                sdt,
                address,
            });
            if (res.data.update) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log('Register failed: ' + err.message);
        }
    };

    return (
        <>
            <Box
                id="style-2"
                sx={{
                    backgroundColor: '#fff',
                    width: 'calc(100% - var(--default-layout-width-sidebar))',
                    height: 'calc(100vh - var(--default-layout-height-header))',
                    float: 'right',
                    overflowY: 'scroll',
                }}
            >
                <Button onClick={() => navigate('/admin/user')} variant="outlined" sx={{ margin: '10px' }}>
                    <KeyboardArrowLeftOutlinedIcon />
                    Quay lại
                </Button>
                <Typography variant="h4" sx={{ margin: '10px', color: '#666' }}>
                    User Lib
                </Typography>

                {/* btn new user */}
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ margin: '10px' }}
                    onClick={() => {
                        setName('');
                        setEmail('');
                        setSdt('');
                        setAddress('');
                        setOpenModalCreate(true);
                    }}
                >
                    <AddCircleOutlineOutlinedIcon sx={{ marginRight: '5px' }} />
                    New
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ margin: '10px' }}
                    onClick={() => setOpenModalSearch(true)}>
                    <SearchIcon sx={{ marginRight: '5px' }} /> Search
                </Button>
                <TableContainer sx={{ marginBottom: '40px' }} component={Paper}>
                    {rows.length > 0 ? (
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    {/* <TableCell>Password</TableCell> */}
                                    <TableCell>SDT</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell align="center">Chỉnh sửa</TableCell>
                                    <TableCell align="center">Xóa</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow
                                        id={row._id}
                                        className="row"
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { brent: 0 } }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell component="th" scope="row" sortDirection="desc">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.username}</TableCell>
                                        {/* <TableCell size="small">{row.password}</TableCell> */}
                                        <TableCell>{row.sdt}</TableCell>
                                        <TableCell>{row.address}</TableCell>
                                        <TableCell
                                            align="center"
                                            onClick={() => {
                                                setOpenModalEdit(true);
                                                setId(row._id);
                                                setName(row.name);
                                                setEmail(row.username);
                                                setAddress(row.address);
                                                setSdt(row.sdt);
                                            }}
                                        >
                                            <Button variant="text">
                                                <EditOutlinedIcon />
                                                Edit
                                            </Button>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button
                                                variant="text"
                                                color="error"
                                                onClick={() => {
                                                    setOpenModalDelete(true);
                                                    setId(row._id);
                                                }}
                                            >
                                                <DeleteSweepOutlinedIcon />
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <>
                            <Stack spacing={1} sx={{ padding: '0 10px' }}>
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                                <Skeleton variant="rounded" width={'100%'} height={40} />
                            </Stack>
                        </>
                    )}
                </TableContainer>
            </Box>
            {/* Modal Create user admin */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalCreate}
                onClose={() => setOpenModalCreate(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalCreate}>
                    <Box sx={styleModal}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Create User Admin
                        </Typography>
                        <ValidatorForm onSubmit={handleCreateUser}>
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={name}
                                label="Name"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập tên người dùng']}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={email}
                                label="Email"
                                variant="standard"
                                color="secondary"
                                validators={['required', 'isEmail']}
                                errorMessages={['Vui lòng nhập email', 'Email không hợp lệ']}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={password}
                                label="Password"
                                type="password"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập mật khẩu']}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={passwordX2}
                                label="Password Again"
                                type="password"
                                variant="standard"
                                color="secondary"
                                validators={['isPasswordMatch', 'required']}
                                errorMessages={['Nhập lại mật khẩu không chính xác', 'Vui lòng nhập mật khẩu']}
                                onChange={(e) => setPasswordX2(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={sdt}
                                label="SDT"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập số điện thoại']}
                                onChange={(e) => setSdt(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={address}
                                label="Address"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập địa chỉ']}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <Button
                                sx={{ marginTop: '10px' }}
                                variant="contained"
                                startIcon={<SendIcon />}
                                fullWidth
                                type="submit"
                            >
                                Đăng ký
                            </Button>
                        </ValidatorForm>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal Edit */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalEdit}
                onClose={() => setOpenModalEdit(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalEdit}>
                    <Box sx={styleModal}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Edit User Admin
                        </Typography>
                        <ValidatorForm onSubmit={handleEditUser}>
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={name}
                                label="Name"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập tên người dùng']}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={email}
                                label="Email"
                                variant="standard"
                                color="secondary"
                                validators={['required', 'isEmail']}
                                errorMessages={['Vui lòng nhập email', 'Email không hợp lệ']}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={sdt}
                                label="SDT"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập số điện thoại']}
                                onChange={(e) => setSdt(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={address}
                                label="Address"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập địa chỉ']}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <Button
                                sx={{ marginTop: '10px' }}
                                variant="contained"
                                startIcon={<SendIcon />}
                                fullWidth
                                type="submit"
                            >
                                Chỉnh sửa
                            </Button>
                        </ValidatorForm>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal Delete */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalDelete}
                onClose={() => setOpenModalDelete(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalDelete}>
                    <Box sx={styleModal}>
                        <Typography sx={{ color: '#666' }} variant="h6" component="h2">
                            Delete User ?
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                marginTop: '20px',
                            }}
                        >
                            <Button variant="contained" onClick={() => setOpenModalDelete(false)}>
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                sx={{ marginLeft: '10px' }}
                                onClick={handleDeleteUser}
                            >
                                Delete
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalSearch}
                onClose={() => setOpenModalSearch(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalSearch}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 300,
                            bgcolor: 'background.paper',
                            boxShadow: 50,
                            borderRadius: '10px',
                            p: 3,
                        }}
                    >
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Tìm kiếm
                        </Typography>
                        <ValidatorForm onSubmit={handleSearch}>
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                variant="standard"
                                color="secondary"
                                fullWidth
                                label="Nhập thông tin"
                                //variant="outlined"
                                margin="dense"
                                value={searchValue}
                                onChange={(event) => setSearchValue(event.target.value)}
                                validators={['required']}
                                errorMessages={['Vui lòng nhập từ khóa tìm kiếm']}
                            />
                            <Button
                                sx={{
                                    marginTop: '10px',
                                    textAlign: 'center'
                                }}
                                variant="contained"
                                startIcon={<SendIcon />}
                                type="submit">
                                Xác nhận
                            </Button>
                        </ValidatorForm>
                    </Box>
                </Fade>
            </Modal >
        </>
    );
}

export default UserLibDetails;

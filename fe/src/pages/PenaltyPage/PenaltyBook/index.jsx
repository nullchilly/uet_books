import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Skeleton, Stack, Typography } from '@mui/material';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    brentRadius: '10px',
    p: 3,
};

function PenaltyBook() {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const [listBooks, setListBooks] = useState([]);
    const [listLibs, setListLibs] = useState([]);

    const [openModalStudent, setOpenModalStudent] = useState(false);
    const [idRentPenalty, setIdRentPenalty] = useState('');

    const [openModalLib, setOpenModalLib] = useState(false);
    const [idLibExport, setIdLibExport] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5001/penalty/rentPenalty/${localStorage.getItem('idPage')}`,
                );
                const resLibs = await axios.get('http://localhost:5001/lib');
                if (resLibs) {
                    setListLibs(resLibs.data);
                    console.log(resLibs.data);
                }
                if (res) {
                    // console.log(res.data);
                    setRows(res.data.rentPenalties.reverse());
                    setListBooks(res.data.bookPenalties);
                    // console.log(res.data.bookPenalties);
                }
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    const getNameBook = (id) => {
        let book = listBooks.find((book) => {
            return book._id === id;
        });
        return book.nameBook;
    };

    // const getDate = (data) => {
    //     let date = new Date(data);
    //     let year = date.getFullYear();
    //     let month = date.getMonth() + 1;
    //     let dt = date.getDate();

    //     if (dt < 10) {
    //         dt = '0' + dt;
    //     }
    //     if (month < 10) {
    //         month = '0' + month;
    //     }

    //     return dt + '/' + month + '/' + year;
    // };

    const handleDeliveryLib = async () => {
        console.log(idLibExport);
        console.log(idRentPenalty);

        try {
            const resUpdateStatusPenalty = await axios.put(
                `http://localhost:5001/rentPenalty/updateStatusPenalty/${idRentPenalty}`,
                {
                    idLib: idLibExport,
                    status: 'lib',
                },
            );
            if (resUpdateStatusPenalty.data.update) {
                window.location.reload();
                alert('Update');
            }
        } catch (e) {
            console.log(e); 
        }
    };

    const handleDeliveryLab = async () => {
        // console.log(idRent);
        try {
            const res = await axios.put(`http://localhost:5001/lab/updateNotRentPenalty/${idRentPenalty}`);
            if (res.data.update) {
                alert(res.data.msg);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
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
                <Button onClick={() => navigate('/rentPenalty')} variant="outlined" sx={{ margin: '10px' }}>
                    <KeyboardArrowLeftOutlinedIcon />
                    Quay lại
                </Button>

                <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
                    {rows.length > 0 ? (
                        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Mã đơn hàng</TableCell>
                                    <TableCell>Tên sản phẩm</TableCell>
                                    <TableCell>Lỗi</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow
                                        id={row._id}
                                        className="row"
                                        key={row._id}
                                        sx={{ '&:last-child td, &:last-child th': { brent: 0 } }}
                                    >
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell component="th" scope="row" sx={{ maxWidth: '200px' }}>
                                            {row.idRent}
                                        </TableCell>
                                        <TableCell sx={{ maxWidth: '200px' }}>{getNameBook(row.idRent)}</TableCell>
                                        <TableCell>{row.error}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => {
                                                    setIdRentPenalty(row._id);
                                                    setOpenModalStudent(true);
                                                }}
                                                variant="outlined"
                                                color="secondary"
                                            >
                                                Chuyển phòng thí nghiệm
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => {
                                                    setIdRentPenalty(row._id);
                                                    setOpenModalLib(true);
                                                }}
                                                variant="outlined"
                                                color="primary"
                                            >
                                                Chuyển nhà phân phối
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
            {/* Modal delivery lab */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalStudent}
                onClose={() => setOpenModalStudent(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalStudent}>
                    <Box sx={styleModal}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ textAlign: 'center' }}
                        >
                            Chuyển sách về Phòng Thí NGhiệm
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                            <Button
                                sx={{ marginTop: '10px' }}
                                color="secondary"
                                variant="contained"
                                type="submit"
                                onClick={() => setOpenModalStudent(false)}
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                sx={{ marginTop: '10px', marginLeft: '10px' }}
                                variant="contained"
                                type="submit"
                                onClick={handleDeliveryLab}
                            >
                                Xác nhận
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal delivery lib */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalLib}
                onClose={() => setOpenModalLib(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalLib}>
                    <Box sx={styleModal}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ textAlign: 'center' }}
                        >
                            Chuyển hàng tới kho sản xuất
                        </Typography>
                        <FormControl fullWidth sx={{ margin: '15px 0' }}>
                            <InputLabel id="demo-simple-select-label">Kho sản xuất</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={idLibExport}
                                label="Kho sản xuất"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setIdLibExport(e.target.value);
                                }}
                            >
                                {listLibs.map((rentPenalty) => {
                                    return (
                                        <MenuItem key={rentPenalty._id} value={rentPenalty._id}>
                                            {rentPenalty.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                            <Button
                                sx={{ marginTop: '10px' }}
                                color="secondary"
                                variant="contained"
                                type="submit"
                                onClick={() => setOpenModalLib(false)}
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                sx={{ marginTop: '10px', marginLeft: '10px' }}
                                variant="contained"
                                type="submit"
                                onClick={handleDeliveryLib}
                            >
                                Xác nhận
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default PenaltyBook;

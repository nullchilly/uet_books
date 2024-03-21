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

function LabPenalty() {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const [listBooks, setListBooks] = useState([]);
    const [listRents, setListRents] = useState([]);
    const [listStudents, setListStudents] = useState([]);


    const [listRentPenalties, setListRentPenalties] = useState([]);

    const [openModalStudent, setOpenModalStudent] = useState(false);
    const [idRentPenalty, setIdRentPenalty] = useState('');

    const [openModalPenalty, setOpenModalPenalty] = useState(false);
    // const [idPenaltyExport, setIdPenaltyExport] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5001/lab/rentPenalty/${localStorage.getItem('idPage')}`,
                );
                console.log(res);
                const resPenalties = await axios.get('http://localhost:5001/rentPenalty');
                // if (resPenalties) {
                //     setListRentPenalties(resPenalties.data);
                //     console.log(resPenalties.data);
                // }
                if (res) {
                    // console.log(res.data);
                    setRows(res.data.rentPenalties); // rentpenalty
                    setListRents(res.data.rents); // rent 
                    setListBooks(res.data.books);
                    setListStudents(res.data.students);
                    // console.log(res.data)
                    // console.log(res.data.students)

                    // setListRentPenalties(resPenalties.data);
                    // console.log(res.data)

                }
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    const getNameBook = (id) => {
        let book = listBooks.filter((book) => {
            return book._id === id;
        });
        return book.nameBook;
    };

    const getStudentCode = (id) => {
        let rent = listRents.filter((rent) => {
            return rent._id == id;
        });
        let student = listStudents.filter((student) => {
            return student._id == rent[0].idStudent;
        });
        return student[0].studentID;
    };

    const getBookName = (id) => {
        let rent = listRents.filter((rent) => {
            return rent._id == id;
        });
        let book = listBooks.filter((book) => {
            return book._id == rent[0].idBook;
        });
        return book[0].name;
    };

    const getBookPrice = (id) => {
        let rent = listRents.filter((rent) => {
            return rent._id == id;
        });
        let book = listBooks.filter((book) => {
            return book._id == rent[0].idBook;
        });
        return book[0].price;
    };

    
    
    const getDate = (data) => {
        let date = new Date(data);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return dt + '/' + month + '/' + year;
    };

    // const handleDeliveryPenalty = async () => {
    //     console.log(localStorage.getItem('idPage'), localStorage.getItem('name'), idPenaltyExport, idRentPenalty);
    //     console.log(idPenaltyExport);

    //     let penalty = listRentPenalties.find((penalty) => {
    //         return penalty._id === idPenaltyExport;
    //     });

    //     try {
    //         const res = await axios.post('http://localhost:5001/delivery/createDeliveryByLab', {
    //             from: localStorage.getItem('idPage'),
    //             nameFrom: localStorage.getItem('name'),
    //             to: idPenaltyExport,
    //             nameTo: penalty.name,
    //             idRentPenalty: idRentPenalty,
    //             status: 'Đang giao hàng',
    //         });
    //         if (res.data.create) {
    //             alert(res.data.msg);
    //             window.location.reload();
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    const handleDeliveryStudent = async () => {
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
                <Button onClick={() => navigate('/lab')} variant="outlined" sx={{ margin: '10px' }}>
                    <KeyboardArrowLeftOutlinedIcon />
                    Quay lại
                </Button>

                <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
                    {rows.length > 0 ? (
                        <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Mã sinh viên</TableCell>
                                    <TableCell>Tên sách</TableCell>
                                    <TableCell>Giá</TableCell>
                                    <TableCell>Lỗi</TableCell>
                                    <TableCell>Thời gian</TableCell>
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
                                            {getStudentCode(row.idRent)}
                                        </TableCell>
                                        <TableCell component="th" scope="row" sx={{ maxWidth: '200px' }}>
                                            {getBookName(row.idRent)}
                                        </TableCell>
                                        <TableCell component="th" scope="row" sx={{ maxWidth: '200px' }}>
                                            {getBookPrice(row.idRent)}
                                        </TableCell>
                                        {/* <TableCell sx={{ maxWidth: '200px' }}>{getNameBook(row.idRent)}</TableCell> */}
                                        <TableCell>{row.error}</TableCell>
                                        <TableCell>{getDate(row.createdAt)}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => {
                                                    if (row.status === "Chưa đền bù") {
                                                        setIdRentPenalty(row._id);
                                                        setOpenModalStudent(true);
                                                    }
                                                }}
                                                variant="outlined"
                                                color={row.status === "Đã đền bù" ? "primary" : "secondary"}
                                            >
                                                {row.status}
                                            </Button>
                                        </TableCell>
                                        {/* <TableCell>
                                            <Button
                                                onClick={() => {
                                                    setIdRentPenalty(row._id);
                                                    setOpenModalPenalty(true);
                                                }}
                                                variant="outlined"
                                                color="primary"
                                            >
                                                Trung tâm bảo hành
                                            </Button>
                                        </TableCell>  */}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <>
                            <Stack spacing={1} sx={{padding: '0 10px'}}>
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
            {/* Modal delivery student */}
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
                            Xóa phạt
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
                                onClick={handleDeliveryStudent}
                            >
                                Xác nhận
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal delivery penalty */}
            {/* <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalPenalty}
                onClose={() => setOpenModalPenalty(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalPenalty}>
                    <Box sx={styleModal}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ textAlign: 'center' }}
                        >
                            Chuyển hàng tới trung tâm bảo hành
                        </Typography>
                        <FormControl fullWidth sx={{ margin: '15px 0' }}>
                            <InputLabel id="demo-simple-select-label">Trung tâm bảo hành</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={idPenaltyExport}
                                label="Trung tâm bảo hành"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setIdPenaltyExport(e.target.value);
                                }}
                            >
                                {listRentPenalties.map((penalty) => {
                                    return (
                                        <MenuItem key={penalty._id} value={penalty._id}>
                                            {penalty.name}
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
                                onClick={() => setOpenModalPenalty(false)}
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                sx={{ marginTop: '10px', marginLeft: '10px' }}
                                variant="contained"
                                type="submit"
                                onClick={handleDeliveryPenalty}
                            >
                                Xác nhận
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal> */}
        </>
    );
}

export default LabPenalty;

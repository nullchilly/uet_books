import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Skeleton } from '@mui/material';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Stack } from '@mui/system';

function PenaltyDetails() {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const [listBooks, setListBooks] = useState([]);
    const id = useParams();

    useEffect(() => {
        const getData = async () => {
            console.log(id);
            try {
                const res = await axios.get(`http://localhost:5001/rentPenalty/rentPenalty/${id.id}`);
                if (res) {
                    console.log(res.data);
                    setRows(res.data.rentPenalties);
                    setListBooks(res.data.bookPenalties);
                    // console.log(res.data.bookPenalties);
                }
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, [id]);

    const getNameBook = (id) => {
        let book = listBooks.find((book) => {
            return book._id === id;
        });
        return book.nameBook;
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
                <Button onClick={() => navigate('/admin/rentPenalty')} variant="outlined" sx={{ margin: '10px' }}>
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
        </>
    );
}

export default PenaltyDetails;

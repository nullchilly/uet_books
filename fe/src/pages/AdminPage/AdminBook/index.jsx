import './Book.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button } from '@mui/material';
import { Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SendIcon from '@mui/icons-material/Send';
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined';
import Skeleton from '@mui/material/Skeleton';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import ButtonBase from '@mui/material/ButtonBase';
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
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    brentRadius: '10px',
    p: 3,
};

function AdminBook() {
    const [rows, setRows] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalSearch, setOpenModalSearch] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [author, setAuthor] = useState('');
    const [language, setLanguage] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [id, setId] = useState('');

    const handleSearch = async () => {
        const res = await axios.get('http://localhost:5001/book/autoComplete', {
            params: { searchValue }
        });
        setSearchResults(res.data);
    };
    const handleResultClick = (result) => {
        console.log(result.name);
        setSearchValue(result.name);
        setSearchResults([]);
    };
    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        if (value !== '') {
            handleSearch();
        }
    }
    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const res = await axios.get('http://localhost:5001/book/allBooksBySearch', {
                    params: { searchValue }
                });
                setRows(res.data)
            } catch (error) {
                console.log(error.message);
            }
        };
        if (searchValue !== '') {
            fetchSearchResults();
        } else {
            const getAllBooks = async () => {
                try {
                    const res = await axios.get('http://localhost:5001/book/allBooks');
                    setRows(res.data);
                } catch (err) {
                    console.log('fe : ' + err.message);
                }
            };
            getAllBooks();
        }
    }, [searchValue]);

    const handleCreate = async () => {
        try {
            const res = await axios.post('http://localhost:5001/book/create', {
                code,
                name,
                description,
                image,
                price,
                category,
                author,
                language,
                publishYear,
            });
            if (res.data.create) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log('Register failed: ' + err.message);
        }
    };

    // update book
    const handleEdit = async () => {
        try {
            const res = await axios.post('http://localhost:5001/book/update', {
                id,
                code,
                name,
                description,
                image,
                price,
                category,
                author,
                language,
                publishYear,
            });
            if (res.data.update) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log('Register failed: ' + err.message);
        }
    }; 

    // delete book
    const handleDelete = async () => {
        try {
            const res = await axios.post('http://localhost:5001/book/delete', {
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

    const PriceVND = (price) => {
        const priceVND = Intl.NumberFormat('en-US').format;
        return priceVND(price);
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
                <Typography variant="h4" sx={{ margin: '10px', color: '#666' }}>
                    Books
                </Typography>

                {/* btn new user */}
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ margin: '10px' }}
                    onClick={() => {
                        setName('');
                        setCode('');
                        setImage('');
                        setPrice(0);
                        setDescription('');
                        setCategory('');
                        setAuthor('');
                        setLanguage('');
                        setPublishYear('');
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
                    onClick={() => {
                        setSearchValue('');
                        setOpenModalSearch(true);
                    }}
                >
                    <SearchIcon sx={{ marginRight: '5px' }} /> Search
                </Button>
                <TableContainer sx={{ marginBottom: '40px' }} component={Paper}>
                    {rows.length > 0 ? (
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>STT</TableCell>
                                    <TableCell>Code</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Danh mục</TableCell>
                                    <TableCell>Tác giả</TableCell>
                                    <TableCell>Năm xuất bản</TableCell>
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
                                            {row.code}
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{PriceVND(row.price)}</TableCell>
                                        <TableCell>{row.category}</TableCell>
                                        <TableCell>{row.author}</TableCell>
                                        <TableCell>{row.publishYear}</TableCell>
                                        <TableCell
                                            align="center"
                                            onClick={() => {
                                                setOpenModalEdit(true);
                                                setId(row._id);
                                                setName(row.name);
                                                setCode(row.code);
                                                setCategory(row.category);
                                                setImage(row.image);
                                                setDescription(row.description);
                                                setPrice(row.price);
                                                setAuthor(row.author);
                                                setLanguage(row.language);
                                                setPublishYear(row.publishYear);
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
            {/* Modal Create book */}
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
                            New book
                        </Typography>
                        <ValidatorForm onSubmit={handleCreate}>
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={code}
                                label="Mã sách"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập mã sách']}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={name}
                                label="Tên Sách"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập tên sách']}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={price}
                                type="number"
                                label="Giá Sách"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập giá sách']}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={description}
                                label="Mô Tả"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập mô tả']}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={image}
                                label="Link image"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập địa chỉ ảnh']}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={category}
                                label="Danh Mục"
                                variant="standard"
                                color="secondary"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                                <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={author}
                                label="Tác Giả"
                                variant="standard"
                                color="secondary"
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={language}
                                label="Ngôn Ngữ"
                                variant="standard"
                                color="secondary"
                                onChange={(e) => setLanguage(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={publishYear}
                                label="Năm Xuất Bản"
                                variant="standard"
                                color="secondary"
                                onChange={(e) => setPublishYear(e.target.value)}
                            />
                            <Button
                                sx={{ marginTop: '10px' }}
                                variant="contained"
                                startIcon={<SendIcon />}
                                fullWidth
                                type="submit"
                            >
                                Tạo mới
                            </Button>
                        </ValidatorForm>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal Edit Book*/}
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
                            Edit Book
                        </Typography>
                        <ValidatorForm onSubmit={handleEdit}>
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={code}
                                label="Mã sách"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập mã sách']}
                                onChange={(e) => setCode(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={name}
                                label="Tên sách"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập tên sách']}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={price}
                                type="number"
                                label="Giá sách"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập giá sách']}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                            
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={description}
                                label="Mô Tả"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập mô tả']}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={image}
                                label="Link image"
                                variant="standard"
                                color="secondary"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập địa chỉ ảnh']}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={category}
                                label="Danh Mục"
                                variant="standard"
                                color="secondary"
                                onChange={(e) => setCategory(e.target.value)}
                            />
                                <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={author}
                                label="Tác Giả"
                                variant="standard"
                                color="secondary"
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={language}
                                type="number"
                                label="Ngôn Ngữ"
                                variant="standard"
                                color="secondary"
                                onChange={(e) => setLanguage(e.target.value)}
                            />
                            <TextValidator
                                sx={{ marginTop: '10px' }}
                                fullWidth
                                value={category}
                                type="number"
                                label="Năm Xuất Bản"
                                variant="standard"
                                color="secondary"
                                onChange={(e) => setPublishYear(e.target.value)}
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
                            Delete Book ?
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
                                onClick={handleDelete}
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
                            top: '20%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
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
                            <div>
                                <TextValidator
                                    sx={{ marginTop: '10px' }}
                                    variant="standard"
                                    color="secondary"
                                    fullWidth
                                    label="Nhập thông tin"
                                    value={searchValue}
                                    onChange={handleInputChange}
                                    margin="dense"
                                    validators={['required']}
                                    errorMessages={['Vui lòng nhập từ khóa tìm kiếm']}
                                />
                                {searchResults && searchResults.length > 0 &&
                                    <div style={{ marginTop: '10px', backgroundColor: 'white', borderRadius: '4px', boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                                        {searchResults.map((result) => (
                                            <ButtonBase key={result._id} style={{ width: '100%', textAlign: 'left', padding: '10px', borderBottom: '1px solid #eee' }} onClick={() => handleResultClick(result)}>
                                                <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#333' }}>
                                                    {result.name}
                                                </div>
                                            </ButtonBase>
                                        ))}
                                    </div>
                                }
                            </div>
                        </ValidatorForm>
                    </Box>
                </Fade>
            </Modal >
        </>
    );
}

export default AdminBook;

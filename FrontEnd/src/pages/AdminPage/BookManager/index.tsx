import "./Book.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  IconButton,
  Input,
  Pagination,
  TableFooter,
  useTheme,
} from "@mui/material";
import { Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SendIcon from "@mui/icons-material/Send";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import Skeleton from "@mui/material/Skeleton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import TablePagination from "@mui/material/TablePagination";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Stack } from "@mui/system";
import React from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}
function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  brentRadius: "10px",
  p: 3,
};
export interface BookInterface {
  _id: string;
  Title: string;
  Author: string;
  Language: string;
  Year: string;
  category: string;
  Coverurl: string;
}
function BookManagementPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState<BookInterface[]>([]);
  const [openModalCreate, setOpenModalCreate] = React.useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalSearch, setOpenModalSearch] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const [image, setImage] = React.useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [publishYear, setPublishYear] = useState("");
  const [id, setId] = useState("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [limit, setLimit] = useState(100);
  const bookCount = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/books/count`);
      console.log(res.data, "count");
      return res.data;
    } catch (err: any) {
      console.log("fe : " + err.message);
    }
  };
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const getAllBooks = async (rowsPerPage: Number, page: Number) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/books/all`, {
        params: { pageSize: rowsPerPage, pageNumber: page },
      });
      console.log(res.data);
      return res.data;
    } catch (err: any) {
      console.log("fe : " + err.message);
    }
  };
  const fetchData = async () => {
    try {
      const allBookList = await getAllBooks(rowsPerPage, page);
      let limit = await bookCount();
      setLimit(limit);
      setRows(allBookList);
      console.log(allBookList, "update");
    } catch (error) {
      // Xử lý lỗi nếu có
    }
  };
  console.log("fetching data");

  useEffect(() => {
    fetchData();
  }, [searchQuery === "", page, rowsPerPage, limit]);

  const handleQuery = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/books/search`, {
        params: { keyword: searchQuery },
      });
      console.log(res.data);
      setRows(res.data);
    } catch (err: any) {
      console.log("fe : " + err.message);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}/books/create`, {
        Title: name,
        Language: language,
        Coverurl: image,
        Author: author,
        Topic: category,
        Year: publishYear,
      });
      if (res.data.create) {
        console.log(res.data);
        window.location.reload();
        alert(res.data.msg);
      }
    } catch (err: any) {
      console.log("Create failed: " + err.message);
    }
  };

  // update book
  const handleEdit = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}/books/update`, {
        id: id,
        Title: name,
        Language: language,
        // price: 0,
        Author: author,
        Coverurl: image,
        Year: publishYear,
      });
      if (res.data.update) {
        window.location.reload();
        alert(res.data.msg);
      }
    } catch (err: any) {
      console.log("Register failed: " + err.message);
    }
  };

  // delete book
  const handleDelete = async (id: string) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}/books/delete`, {
        id: id,
      });
      if (res.data.delete) {
        window.location.reload();
        alert(res.data.msg);
      }
    } catch (err: any) {
      console.log("Register failed: " + err.message);
    }
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <>
      <Box
        id="style-2"
        sx={{
          backgroundColor: "#f3f3f7",
          width: "calc(100% - var(--default-layout-width-sidebar))",
          height: "calc(100vh - var(--default-layout-height-header))",
          float: "right",
          overflowY: "scroll",
        }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ margin: "10px" }}
        >
          All Books
        </Typography>
        <Box
          sx={{
            display: "flex",
            margin: "10px",

            justifyContent: "space-between",
            marginInline: 4,
          }}
        >
          <Button
            /*   variant="outlined" */

            sx={{
              backgroundColor: "#F27851",
              color: "white",
              fontWeight: "medium",
              "&:hover": {
                backgroundColor: "#EC501E",
              },
            }}
            onClick={() => {
              setName("");

              setImage("");

              setAuthor("");
              setLanguage("");
              setPublishYear("");
              setOpenModalCreate(true);
            }}
          >
            <AddCircleOutlineOutlinedIcon
              sx={{ marginRight: "5px", color: "white" }}
            />
            Add Book
          </Button>
          <Box sx={{ display: "flex" }}>
            <Input
              type="search"
              value={searchQuery}
              style={{
                color: "black",
                padding: 8,
                marginLeft: 12,
                fontSize: 16,
                width: 320,
                height: 42,
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              sx={{
                backgroundColor: "#F27851",
                color: "white",
                fontWeight: "medium",
                marginLeft: 2,
                "&:hover": {
                  backgroundColor: "#EC501E",
                },
              }}
              onClick={handleQuery}
            >
              Tìm kiếm
            </Button>
          </Box>
        </Box>
        {/* btn new user */}

        <TableContainer
          sx={{ marginBottom: "40px", marginLeft: 2, marginRight: 24 }}
          component={Paper}
        >
          {rows.length > 0 ? (
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Title</TableCell>
                  {/* <TableCell>Danh mục</TableCell> */}
                  <TableCell>Author</TableCell>
                  <TableCell>Publish Year</TableCell>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  const realIndex = page * rowsPerPage + index + 1;
                  return (
                    <TableRow
                      id={row._id}
                      className="row"
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { brent: 0 } }}
                    >
                      <TableCell>{realIndex}</TableCell>
                      <TableCell>{row.Title}</TableCell>
                      {/*                       <TableCell>{row.category}</TableCell>
                       */}{" "}
                      <TableCell>{row.Author}</TableCell>
                      <TableCell>{row.Year}</TableCell>
                      <TableCell
                        align="center"
                        onClick={() => {
                          setOpenModalEdit(true);
                          setId(row._id);
                          setName(row.Title);

                          //setCategory(row.category);
                          setImage(row.Coverurl);
                          setLanguage(row.Language);
                          setAuthor(row.Author);

                          setPublishYear(row.Year);
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
                  );
                })}
                {/* {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )} */}
              </TableBody>
              <TableFooter>
                {/*  <TablePagination
                  count={limit}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
                <TablePagination
                  rowsPerPageOptions={[10, 20, 50, { label: "All", value: -1 }]}
                  colSpan={5}
                  count={limit}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
                {/*                 <Pagination count={limit} page={page} onChange={handleChange} />
                 */}{" "}
              </TableFooter>
            </Table>
          ) : (
            <>
              <Stack spacing={1} sx={{ padding: "0 10px" }}>
                <Skeleton variant="rounded" width={"100%"} height={40} />
                <Skeleton variant="rounded" width={"100%"} height={40} />
                <Skeleton variant="rounded" width={"100%"} height={40} />
                <Skeleton variant="rounded" width={"100%"} height={40} />
                <Skeleton variant="rounded" width={"100%"} height={40} />
                <Skeleton variant="rounded" width={"100%"} height={40} />
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
                sx={{ marginTop: "10px" }}
                fullWidth
                value={name}
                name="name"
                label="Title"
                variant="standard"
                color="secondary"
                validators={["required"]}
                errorMessages={["Vui lòng nhập tên sách"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />

              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={image}
                name="image"
                label="Link image"
                variant="standard"
                color="secondary"
                validators={["required"]}
                errorMessages={["Vui lòng nhập địa chỉ ảnh"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.value)
                }
              />
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={category}
                name="category"
                label="Topic"
                variant="standard"
                color="secondary"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCategory(e.target.value)
                }
              />
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={author}
                name="author"
                label="Author"
                variant="standard"
                color="secondary"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAuthor(e.target.value)
                }
              />
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={language}
                name="language"
                label="Ngôn Ngữ"
                variant="standard"
                color="secondary"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setLanguage(e.target.value)
                }
              />
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={publishYear}
                name="publishYear"
                label="Publish Year"
                variant="standard"
                color="secondary"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPublishYear(e.target.value)
                }
              />
              <Button
                sx={{ marginTop: "10px", backgroundColor: "#F27851" }}
                variant="contained"
                startIcon={<SendIcon />}
                fullWidth
                type="submit"
              >
                Create
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
                sx={{ marginTop: "10px" }}
                fullWidth
                value={name}
                name="name"
                label="Tên sách"
                variant="standard"
                color="secondary"
                validators={["required"]}
                errorMessages={["Vui lòng nhập tên sách"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
              />

              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={image}
                label="Link image"
                name="image"
                variant="standard"
                color="secondary"
                validators={["required"]}
                errorMessages={["Vui lòng nhập địa chỉ ảnh"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setImage(e.target.value)
                }
              />
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={category}
                label="Danh Mục"
                name="category"
                variant="standard"
                color="secondary"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCategory(e.target.value)
                }
              />
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={author}
                name="author"
                label="Tác Giả"
                variant="standard"
                color="secondary"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAuthor(e.target.value)
                }
              />
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={language}
                name="language"
                label="Ngôn Ngữ"
                variant="standard"
                color="secondary"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setLanguage(e.target.value)
                }
              />
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={publishYear}
                type="number"
                name="publishYear"
                label="Năm Xuất Bản"
                variant="standard"
                color="secondary"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPublishYear(e.target.value)
                }
              />
              <Button
                sx={{ marginTop: "10px", backgroundColor: "#F27851" }}
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
            <Typography sx={{ textAlign: "center" }}>
              <HighlightOffIcon
                sx={{
                  color: "red",
                  width: 80,
                  height: 80,
                }}
              />
            </Typography>

            <Typography
              sx={{ color: "#666", textAlign: "center" }}
              variant="h4"
              component="h2"
            >
              Are you sure?
            </Typography>
            <Typography
              sx={{ color: "#666", fontSize: 16, textAlign: "center" }}
              component="h2"
            >
              Do you really want to delete this book? After deleting you can't
              undone
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Button
                variant="contained"
                onClick={() => setOpenModalDelete(false)}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ marginLeft: "10px" }}
                onClick={() => handleDelete(id)}
              >
                Delete
              </Button>
              {/*  <Button
                variant="contained"
                color="error"
                sx={{ marginLeft: "10px" }}
                onClick={handleDelete(id)}
              >
                Delete
              </Button>  */}
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
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 50,
              borderRadius: "10px",
              p: 3,
            }}
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Tìm kiếm
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default BookManagementPage;

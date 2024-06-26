import "./UserAdminDetails.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import TablePagination from "@mui/material/TablePagination";

import {
  Box,
  Button,
  IconButton,
  Input,
  Skeleton,
  TableFooter,
  useTheme,
} from "@mui/material";
import { Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteSweepOutlinedIcon from "@mui/icons-material/DeleteSweepOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SendIcon from "@mui/icons-material/Send";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
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

import { useNavigate } from "react-router-dom";

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

export interface UserInterface {
  id: string;
  username: string;
  password: string;
  phone: string;
  address: string;
  email: string;
  fullName: string;
  budget: string;
}

function AccountManagementPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = useState<UserInterface[]>([]);

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalSearch, setOpenModalSearch] = useState(false);

  const [searchValue, setSearchValue] = React.useState("");

  const [id, setId] = React.useState("");
  const [fullName, setFullName] = useState<string>("");
  const [userName, setUserName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordX2, setPasswordX2] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  let token = localStorage.getItem("token") || "";
  // validate custom
  useEffect(() => {
    ValidatorForm.addValidationRule("isPasswordMatch", (value) => {
      if (value !== password) {
        return false;
      }
      return true;
    });
  });

  // Get data

  const getData = async (token: string) => {
    try {
      console.log("get data");
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/getAllUser/${token}`);
      return res.data;
    } catch (err: any) {
      console.log("fe : " + err.message);
    }
  };
  const fetchData = async () => {
    try {
      const allUserList = await getData(token);
      console.log(allUserList, "USELETS");
      setRows(allUserList.data);

      console.log("fetch data success");
    } catch (error) {
      // Xử lý lỗi nếu có
      console.log("Failed to fetch data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery === ""]);

  const handleQueryUser = async (fullName: string) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND}/user/getUserInfo/${fullName}`
      );
      console.log(res.data, "search");
      setRows(res.data);

      //return res.data;
      // setRows(res.data.data);
    } catch (err: any) {
      console.log("1");
      console.log("Search failed: " + err.message);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await handleQueryUser(searchQuery);
      console.log(response, "response");
      console.log(rows, "rows");
      console.log("search success");
      // setRows(response.data);
    } catch (err: any) {
      console.log("2");
      console.log("Search failed: " + err.message);
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

  // Create user
  const handleCreateUser = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}/register`, {
        username: userName,
        password: password,
        email: email,
        fullName: fullName,
        address: address,
      });
      if (res.data.msg === "Register success") {
        console.log("register success");
        window.location.reload();
        // alert(res.data.msg);
      } else {
        // alert("register failed");

        window.location.reload();
        console.log("register failed");
      }
    } catch (err: any) {
      console.log("Register failed: ");
      //  console.log("Register failed: " + err.message);
    }
  };
  // Delete user
  const handleDeleteUser = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}/deleteUser`, {
        id: id,
      });

      if (res.data.msg === "Delete success") {
        window.location.reload();
        console.log("delete success");
        // alert(res.data.msg);
      }
    } catch (err: any) {
      console.log("delete failed: " + err.message);
    }
  };

  const handleEditUser = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND}/updateUser`, {
        id: id,
        updates: {
          fullName: fullName,
          email: email,
          address: address,
        },
        //updateAttribute: {}
      });
      if (res.data.msg === "Update success") {
        window.location.reload();
        console.log("update success");
      }
    } catch (err: any) {
      console.log("Update failed: " + err.message);
    }
  };

  return (
    <>
      {/* {console.log(rows, "rows")} */}
      {
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
          {/* btn new user */}
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ margin: "10px" }}
          >
            All Students
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
                setFullName("");
                setUserName("");
                setPassword("");
                setEmail("");
                setAddress("");
                setOpenModalCreate(true);
              }}
            >
              <AddCircleOutlineOutlinedIcon
                sx={{ marginRight: "5px", color: "white" }}
              />
              Add User
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
                onClick={handleSearch}
              >
                Tìm kiếm
              </Button>
            </Box>
          </Box>

          {/*   <Button
          variant="outlined"
          color="secondary"
          sx={{ margin: "10px" }}
          onClick={() => setOpenModalSearch(true)}
        >
          <SearchIcon sx={{ marginRight: "5px" }} /> Search
        </Button> */}

          <TableContainer
            sx={{ marginBottom: "40px", marginLeft: 1 }}
            component={Paper}
          >
            {rows.length > 0 ? (
              <Table
                sx={{ minWidth: 500 }}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>FullName</TableCell>
                    <TableCell>Email</TableCell>
                    {/* <TableCell>Password</TableCell> */}
                    <TableCell>Address</TableCell>
                    <TableCell align="center">Edit</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row, index) => {
                    const realIndex = page * rowsPerPage + index + 1;
                    return (
                      <TableRow
                        // id={row._id}
                        className="row"
                        key={row.id}
                        sx={{
                          "&:last-child td, &:last-child th": { brent: 0 },
                        }}
                      >
                        <TableCell>{realIndex}</TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          sortDirection="desc"
                        >
                          {row.fullName}
                        </TableCell>
                        <TableCell>{row.email}</TableCell>
                        {/* <TableCell size="small">{row.password}</TableCell> */}
                        <TableCell>{row.address}</TableCell>
                        <TableCell
                          align="center"
                          onClick={() => {
                            setOpenModalEdit(true);
                            setId(row.id);
                            setFullName(row.fullName);
                            setEmail(row.email);
                            setAddress(row.address);
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
                              setId(row.id);
                            }}
                          >
                            <DeleteSweepOutlinedIcon />
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        { label: "All", value: -1 },
                      ]}
                      colSpan={5}
                      count={rows.length}
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
                  </TableRow>
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
      }
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
              Create User
            </Typography>
            <ValidatorForm onSubmit={handleCreateUser}>
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={fullName}
                label="Full Name"
                name="fullName"
                variant="standard"
                color="secondary"
                validators={["required"]}
                errorMessages={["Vui lòng nhập tên người dùng"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFullName(e.target.value)
                }
              />
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                name="username"
                value={userName}
                label="Username"
                variant="standard"
                color="secondary"
                validators={["required"]}
                errorMessages={["Vui lòng nhập tên đăng nhập"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUserName(e.target.value)
                }
              />
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={password}
                label="Password"
                name="password"
                type="password"
                variant="standard"
                color="secondary"
                validators={["required"]}
                errorMessages={["Vui lòng nhập mật khẩu"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={passwordX2}
                label="Password Again"
                name="passwordX2"
                type="password"
                variant="standard"
                color="secondary"
                validators={["isPasswordMatch", "required"]}
                errorMessages={[
                  "Nhập lại mật khẩu không chính xác",
                  "Vui lòng nhập mật khẩu",
                ]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPasswordX2(e.target.value)
                }
              />
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={email}
                label="Email"
                name="email"
                variant="standard"
                color="secondary"
                validators={["required", "isEmail"]}
                errorMessages={["Vui lòng nhập email", "Email không hợp lệ"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={address}
                label="Address"
                name="address"
                variant="standard"
                color="secondary"
                validators={["required"]}
                errorMessages={["Vui lòng nhập địa chỉ"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
              />

              <Button
                sx={{ marginTop: "10px", backgroundColor: "#F27851" }}
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
              Edit User
            </Typography>
            <ValidatorForm onSubmit={handleEditUser}>
              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                // defaultValue={fullName}
                value={fullName} // Assuming this is your state variable to store the input value
                label="Full Name"
                name="fullName"
                variant="standard"
                color="secondary"
                validators={["required"]}
                errorMessages={["Vui lòng nhập tên người dùng"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFullName(e.target.value)
                }
              />

              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={email}
                name="email"
                label="Email"
                variant="standard"
                color="secondary"
                validators={["required", "isEmail"]}
                errorMessages={["Vui lòng nhập email", "Email không hợp lệ"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />

              <TextValidator
                sx={{ marginTop: "10px" }}
                fullWidth
                value={address}
                label="Address"
                name="address"
                variant="standard"
                color="secondary"
                validators={["required"]}
                errorMessages={["Vui lòng nhập địa chỉ"]}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setAddress(e.target.value)
                }
              />
              <Button
                sx={{ marginTop: "10px", backgroundColor: "#F27851" }}
                variant="contained"
                startIcon={<SendIcon />}
                fullWidth
                type="submit"
              >
                Submit
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
              Do you really want to delete this user? After deleting you can't
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
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 300,
              bgcolor: "background.paper",
              boxShadow: 50,
              borderRadius: "10px",
              p: 3,
            }}
          >
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Tìm kiếm
            </Typography>
            <ValidatorForm onSubmit={handleSearch}>
              <TextValidator
                sx={{ marginTop: "10px" }}
                variant="standard"
                color="secondary"
                fullWidth
                name="searchValue"
                label="Nhập thông tin"
                //variant="outlined"
                margin="dense"
                value={searchValue}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setSearchValue(event.target.value)
                }
                validators={["required"]}
                errorMessages={["Vui lòng nhập từ khóa tìm kiếm"]}
              />
              <Button
                sx={{
                  marginTop: "10px",
                  textAlign: "center",
                }}
                variant="contained"
                startIcon={<SendIcon />}
                type="submit"
              >
                Xác nhận
              </Button>
            </ValidatorForm>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
export default AccountManagementPage;

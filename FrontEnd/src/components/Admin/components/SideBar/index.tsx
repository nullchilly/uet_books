import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./SideBar.scss";

import logo from "../../../../../../FrontEnd/src/assets/img/logo.svg";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import { GiBookshelf } from "react-icons/gi";
import { IoMdHome } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";

// khung lựa chọn
function SideBarAdmin() {
  return (
    <>
      <Box
        sx={{
          height: "100vh",

          width: "var(--default-layout-width-sidebar)",
          float: "left",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "var(--default-layout-height-header)",
            marginBottom: "50px",
          }}
        >
          <img
            src={logo}
            alt="My SVG Image"
            style={{ marginTop: "40px", height: "70px" }}
          />
        </Box>
        <Box
          sx={{
            color: "#fff",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            height: "var(--default-layout-height-header)",
          }}
        >
          <NavLink to="/admin/bookmanagement" className="SideBarAdmin__link">
            <BookmarksIcon className="SideBarAdmin__link-icon" />
            Book
          </NavLink>
          <NavLink to="/admin/accountmanagement" className="SideBarAdmin__link">
            <GroupAddIcon className="SideBarAdmin__link-icon" />
            Account
          </NavLink>
        </Box>
      </Box>
    </>
  );
}

export default SideBarAdmin;

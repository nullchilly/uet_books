import {
  Avatar,
  Box,
  Button,
  Typography,
  Autocomplete,
  TextField,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import "./TopBar.scss";
import { useNavigate } from "react-router-dom";
import avatar from "../../../../assets/img/avatar.svg";
import Tippy from "@tippyjs/react/headless";
import { Topics } from "../../../../constant/topic";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { SearchStoreHook } from "../../../../redux/hooks/SearchStoreHook";

const LegitTopics = Object.entries(Topics).map(([id, label]) => ({
  label,
  id: parseInt(id),
}));

function TopBarUser() {
  const navigate = useNavigate();
  const { getAllSerchData, setBookSearchData } = SearchStoreHook();
  // open profile user
  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  //handle chooose Topics
  const [topicValue, setTopicValue] = useState(LegitTopics[0]);
  const [topicInputValue, setTopicInputValue] = useState("");

  //handle search query
  const [queryValue, setQueryValue] = useState("");

  function handleSearch() {
    if (topicValue && queryValue.length >= 2) {
      getDataSearch();
    } else {
      alert(
        "Topic field invalid or Query length must be more than 2 characters"
      );
    }
  }

  const getDataSearch = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/books/search`, {
        params: {
          keyword: queryValue.toString(),
          topic: topicValue.id,
        },
      });

      // console.log(res.data);
      setBookSearchData(res.data);
    } catch (err: any) {
      console.log("fe error search: " + err.message);
    }
  };

  const handleClickLogout = () => {
    localStorage.setItem("id", "");
    localStorage.setItem("role", "");
    localStorage.setItem("fullName", "");
    localStorage.setItem("username", "");
    localStorage.setItem("email", "");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <Box
        sx={{
          padding: "0 32px",
          backgroundColor: "#F3F3F7",
          brentBottom: "1px solid #ccc",
          float: "top",
          height: "var(--default-layout-height-header)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            marginTop: "8px",
            display: "flex",
          }}
        >
          <Autocomplete
            disablePortal
            value={topicValue}
            onChange={(e, newValue: any) => setTopicValue(newValue)}
            inputValue={topicInputValue}
            onInputChange={(e, newValue: any) => setTopicInputValue(newValue)}
            options={LegitTopics}
            size="small"
            sx={{ width: "100px" }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={queryValue}
            onChange={(e) => setQueryValue(e.target.value)}
          />
          <IconButton
            size="large"
            sx={{ padding: "0px 12px" }}
            onClick={handleSearch}
          >
            <SearchIcon sx={{ color: "#F76B56" }} />
          </IconButton>
        </Box>

        <Tippy
          interactive
          visible={visible}
          onClickOutside={hide}
          placement="right-end"
          render={(attrs) => (
            <div className="user__profile" {...attrs}>
              <Box
                sx={{
                  padding: "12px 20px",
                  brentBottom: "1px solid #ccc",
                  minWidth: "200px",
                }}
              >
                <Typography sx={{ fontSize: "0.875rem" }} variant="h6">
                  Student
                </Typography>
                <Typography
                  sx={{ fontSize: "0.875rem", color: "rgb(99, 115, 129)" }}
                  variant="h6"
                >
                  {localStorage.getItem("username")}
                </Typography>
              </Box>
              <Box
                sx={{
                  padding: "5px 20px",
                  brentBottom: "1px solid #ccc",
                }}
              >
                <Button variant="text" fullWidth onClick={handleClickLogout}>
                  Đăng xuất
                </Button>
              </Box>
            </div>
          )}
        >
          <Avatar
            className="user__avatar"
            onClick={visible ? hide : show}
            src={avatar}
          />
        </Tippy>
      </Box>
    </>
  );
}

export default TopBarUser;

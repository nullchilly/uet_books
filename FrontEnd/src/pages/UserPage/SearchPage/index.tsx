import React from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import "./style.scss";
import BookCardList from "./BookCardList";

const SearchPage = () => {
  return (
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
      <Box className="BookCardList-container">
        <BookCardList />
        <BookCardList />
      </Box>
    </Box>
  );
};

export default SearchPage;

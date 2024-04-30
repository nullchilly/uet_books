import React from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import "./style.scss";
import BookCardList from "./BookCardList";

const SearchPage = () => {
  return (
    <Box id="style-2" className="container">
      <Box className="BookCardList-container">
        <BookCardList />
        <BookCardList />
      </Box>
    </Box>
  );
};

export default SearchPage;

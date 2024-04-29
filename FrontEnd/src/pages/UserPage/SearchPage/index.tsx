import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  maxWidth: 400,
}));

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
      <Box sx={{ flexGrow: 1, overflow: "hidden", px: 3 }}>
        <Item
          sx={{
            my: 1,
            mx: "auto",
            p: 2,
          }}
        >
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar>A</Avatar>
            <Typography>Don't make me think</Typography>

            <Typography>4.5/5</Typography>
            <Typography>Computer Science</Typography>
          </Stack>
        </Item>
      </Box>
    </Box>
  );
};

export default SearchPage;

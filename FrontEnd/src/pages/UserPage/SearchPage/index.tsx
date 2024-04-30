import React from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import "./style.scss";
import BookCardList from "./BookCardList";

const dumpList = [
  {
    id: "abc123",
    book_img_url: `https://minh.la/wp-content/uploads/2020/03/Dont-make-me-think.jpg`,
    name: `Don't Make Me Think`,
    author: `Steve Krug`,
    publish_year: 2000,
    rating: 4.5,
    category: [12, 49],
    status: "In-Shelf",
  },
  {
    id: "def234",
    book_img_url: `https://bizweb.dktcdn.net/thumb/large/100/439/764/products/a76f25243d1cc5ec77ef1e72ec0cdc52-1658860164013.jpg?v=1658860168233`,
    name: `The Design of EveryDay Things`,
    author: `Don Norman`,
    publish_year: 1988,
    rating: 4,
    category: [10],
    status: "Borrowed",
  },
];

const SearchPage = () => {
  const [signatureBook, setSignatureBook] = React.useState(dumpList);
  return (
    <Box id="style-2" className="container">
      <Box className="BookCardList-container">
        <Box className="BookCardList-container-header">
          <Typography sx={{ flex: 30, color: "#4D4D4D" }}>Title</Typography>
          <Typography sx={{ flex: 10, color: "#4D4D4D" }}>Rating</Typography>
          <Typography sx={{ flex: 15, color: "#4D4D4D" }}>Category</Typography>
          <Typography sx={{ flex: 15, color: "#4D4D4D" }}>
            Availability
          </Typography>
          <Typography sx={{ flex: 30, color: "#4D4D4D" }}>Status</Typography>
        </Box>
        {signatureBook?.length > 0 && (
          <>
            {signatureBook.map((item, index) => {
              return (
                <BookCardList
                  key={index}
                  id={item.id}
                  book_img_url={item.book_img_url}
                  name={item.name}
                  author={item.author}
                  publish_year={item.publish_year}
                  rating={item.rating}
                  category={item.category}
                  status={item.status}
                />
              );
            })}
          </>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;

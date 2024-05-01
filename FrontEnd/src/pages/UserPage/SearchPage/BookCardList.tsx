import React from "react";
import { Box, Typography, Checkbox, Chip, Button } from "@mui/material";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import "./style.scss";
import { useNavigate } from "react-router-dom";

type PropsType = {
  id: string;
  book_img_url: string;
  name: string;
  author: string;
  publish_year: number;
  rating: number;
  category: any;
  status: string;
};

function BookCardList({
  id,
  book_img_url,
  name,
  author,
  publish_year,
  rating,
  category,
  status,
}: PropsType) {
  const navigate = useNavigate();

  const handleOpenBook = () => {
    navigate(`/user/${id}`);
  };

  return (
    <Box className="BookCardList-container-item">
      <Box className="BookCardList-container-item-img-info">
        <img
          src={book_img_url}
          alt="book image"
          className="BookCardList-container-item-image"
        />
        <Box>
          <Typography sx={{ color: "#4D4D4D", fontWeight: "400" }}>
            {name}
          </Typography>
          <Typography sx={{ color: "#4D4D4D", fontSize: "12px" }}>
            {author},{publish_year}
          </Typography>
        </Box>
      </Box>
      <Typography className="BookCardList-container-item-rating">
        {rating}{" "}
        <Typography sx={{ color: "#A7A7A7", fontSize: "13px" }}>/5</Typography>
      </Typography>
      <Box className="BookCardList-container-item-category">
        {category.map((item, index) => {
          return <Typography key={index}>{item}</Typography>;
        })}
      </Box>
      <Box className="BookCardList-container-item-availability">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={true}
            defaultChecked
            color="success"
            size="small"
            sx={{ padding: "4px" }}
          />
          <Typography sx={{ color: "#4D4D4D", fontSize: "13px" }}>
            E-book
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Checkbox
            checked={true}
            defaultChecked
            color="success"
            size="small"
            sx={{ padding: "4px" }}
          />
          <Typography sx={{ color: "#4D4D4D", fontSize: "13px" }}>
            Hard Copy
          </Typography>
        </Box>
      </Box>
      <Box className="BookCardList-container-item-status">
        <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <Chip label={`${status}`} color="success" />
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <FmdGoodIcon sx={{ color: "#F76B56" }} />
            <Typography sx={{ fontSize: "14px", color: "#4D4D4D" }}>
              CS A-15
            </Typography>
          </Box>
        </Box>
        <Checkbox
          icon={<FavoriteBorder sx={{ color: "#F76B56" }} />}
          checkedIcon={<Favorite sx={{ color: "#F76B56" }} />}
        />
        <Button
          variant="outlined"
          sx={{ borderColor: "#F76B56", height: "30px", color: "#F76B56" }}
          onClick={() => handleOpenBook()}
        >
          Preview
        </Button>
      </Box>
    </Box>
  );
}

export default BookCardList;

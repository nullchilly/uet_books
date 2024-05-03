import React from "react";
import { Box, Typography, Checkbox, Chip, Button } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { Topics } from "../../../constant/topic";

type PropsType = {
  ID: string;
  Coverurl: string;
  Title: string;
  Author: string;
  Year: string;
  rating: number;
  Topic: any;
  status: string;
};

function BookCardList({
  ID,
  Coverurl,
  Title,
  Author,
  Year,
  rating,
  Topic,
  status,
}: PropsType) {
  const navigate = useNavigate();

  const handleOpenBook = () => {
    navigate(`/user/${ID}`);
  };

  console.log(`https://libgen.is/covers/${Coverurl}`);

  return (
    <Box className="BookCardList-container-item">
      <Box className="BookCardList-container-item-img-info">
        <img
          src={`https://raw.githubusercontent.com/nullchilly/libgen_covers/covers/${Coverurl}`}
          alt="book image"
          className="BookCardList-container-item-image"
        />
        <Box>
          <Typography sx={{ color: "#4D4D4D", fontWeight: "400" }}>
            {Title}
          </Typography>
          <Typography sx={{ color: "#4D4D4D", fontSize: "12px" }}>
            {Author},{Year}
          </Typography>
        </Box>
      </Box>
      <Typography className="BookCardList-container-item-rating">
        {rating}{" "}
        <Typography sx={{ color: "#A7A7A7", fontSize: "13px" }}>/5</Typography>
      </Typography>
      <Box className="BookCardList-container-item-category">
        <Typography>{Topics.Topic ?? `null`}</Typography>
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

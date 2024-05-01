import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
  Rating,
  Checkbox,
  Chip,
  Tab,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./style.scss";
import { DefaultAuthor } from "../../../assets/img";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import ChromeReaderModeOutlinedIcon from "@mui/icons-material/ChromeReaderModeOutlined";

const dumpData = {
  id: "abc123",
  book_img_url: `https://minh.la/wp-content/uploads/2020/03/Dont-make-me-think.jpg`,
  name: `Don't Make Me Think`,
  author: `Steve Krug`,
  publish_year: 2000,
  rating: 4.5,
  category: [12, 49],
  status: "In-Shelf",
};

function BookDetail() {
  const { book_id } = useParams();
  const navigate = useNavigate();
  const [bookDetail, setBookDetail] = React.useState(dumpData);
  const [showModalBorrow, setShowModalBorrow] = React.useState(false);
  const [showModalPreview, setShowModalPreview] = React.useState(false);
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Box id="style-2" className="container">
      <Box sx={{ flexGrow: 1, margin: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "4px",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{ padding: "0px" }}
                onClick={() => handleGoBack()}
              >
                <ArrowBackIcon sx={{ color: "#4D4D4D" }} />
              </IconButton>
              <Typography>Go Back</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box className="Book-image-container">
              <img
                src={bookDetail?.book_img_url}
                alt="img book"
                className="Book-image"
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "24px",
                }}
              >
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <IconButton aria-label="review" sx={{ padding: "4px" }}>
                    <RateReviewOutlinedIcon fontSize="medium" />
                  </IconButton>
                  <Typography
                    sx={{ fontSize: "10px", fontWeight: "700", color: "#333" }}
                  >
                    Review
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <IconButton aria-label="review" sx={{ padding: "4px" }}>
                    <NoteAltOutlinedIcon fontSize="medium" />
                  </IconButton>
                  <Typography
                    sx={{ fontSize: "10px", fontWeight: "700", color: "#333" }}
                  >
                    Notes
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <IconButton aria-label="review" sx={{ padding: "4px" }}>
                    <ShareOutlinedIcon fontSize="medium" />
                  </IconButton>
                  <Typography
                    sx={{ fontSize: "10px", fontWeight: "700", color: "#333" }}
                  >
                    Share
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: "400",
                color: "#4D4D4D",
                marginBottom: "4px",
              }}
            >
              {bookDetail.name}
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: "400",
                color: "#4D4D4D",
                marginBottom: "8px",
              }}
            >{`By ${bookDetail.author}, ${bookDetail.publish_year}`}</Typography>
            <Typography
              sx={{ color: "#9A9A9A", marginBottom: "20px", fontSize: "14px" }}
            >{`Second Edition`}</Typography>
            <Box
              sx={{
                display: "flex",
                gap: "4px",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <Rating
                size="small"
                value={bookDetail.rating}
                readOnly
                precision={0.5}
              />
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "400",
                  color: "#4D4D4D",
                  marginRight: "16px",
                }}
              >{`${bookDetail.rating} Ratings`}</Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: "400",
                  color: "#4D4D4D",
                  marginRight: "16px",
                }}
              >{`${458} Have read`}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "flex-start", gap: "24px" }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#4D4D4D",
                    marginBottom: "10px",
                  }}
                >
                  Availability
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    checked={true}
                    defaultChecked
                    color="success"
                    size="small"
                    sx={{ padding: "0px" }}
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
                    sx={{ padding: "0px" }}
                  />
                  <Typography sx={{ color: "#4D4D4D", fontSize: "13px" }}>
                    Hard Copy
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color: "#4D4D4D",
                    marginBottom: "10px",
                  }}
                >
                  Status
                </Typography>
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "12px" }}
                >
                  <Chip label={`${bookDetail.status}`} color="success" />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <FmdGoodIcon sx={{ color: "#F76B56" }} />
                    <Typography sx={{ fontSize: "14px", color: "#4D4D4D" }}>
                      CS A-15
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  endIcon={<FavoriteBorderIcon />}
                  sx={{ marginTop: "28px", backgroundColor: "#555" }}
                >
                  Add to List
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: "32px", marginTop: "40px" }}>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#F27851", minWidth: "160px" }}
              >
                Borrow
              </Button>
              <Button
                variant="contained"
                endIcon={<ChromeReaderModeOutlinedIcon />}
                sx={{ backgroundColor: "#41B64D", minWidth: "160px" }}
              >
                Read now
              </Button>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box className="Book-author-info">
              <Box sx={{ display: "flex", gap: "4px" }}>
                <Typography
                  sx={{ fontSize: "20px", fontWeight: "600", color: "#F27851" }}
                >
                  About
                </Typography>
                <Typography
                  sx={{ fontSize: "20px", fontWeight: "600", color: "#4d4d4d" }}
                >
                  Author
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: "8px 0px",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: "400",
                    color: "#4d4d4d",
                    marginRight: "60px",
                  }}
                >
                  {bookDetail.author}
                </Typography>
                <img
                  src={DefaultAuthor}
                  alt="hehe"
                  style={{ width: "88px", height: "100%" }}
                />
              </Box>
              <Typography
                sx={{ fontSize: "13px", color: "#4D4D4D", fontWeight: "400" }}
              >
                Steve Krug is a usability consultant who has more than 30 years
                of experience as a user advocate for companies like Apple,
                Netscape, AOL, Lexus, and others. Based in part on the success
                of his first book, Don't Make Me Think, he has become a highly
                sought-after speaker on usability design.
              </Typography>
              <Typography
                sx={{ fontWeight: "700", color: "#4D4D4D", marginTop: "20px" }}
              >
                Other book
              </Typography>
              <Box sx={{ display: "flex", gap: "20px", marginTop: "8px" }}>
                <img
                  src="https://m.media-amazon.com/images/I/61LJaDHdPKL._AC_UF350,350_QL50_DpWeblab_.jpg"
                  alt=""
                  style={{
                    width: "auto",
                    height: "100px",
                    borderRadius: "6px",
                    border: "1px solid #666",
                  }}
                />
                <img
                  src="https://m.media-amazon.com/images/I/61d96eAh7eL._AC_UF1000,1000_QL80_DpWeblab_.jpg"
                  alt=""
                  style={{
                    width: "auto",
                    height: "100px",
                    borderRadius: "6px",
                    border: "1px solid #666",
                  }}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "6px",
                  }}
                >
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                    variant="fullWidth"
                  >
                    <Tab label="Overview" value="1" />
                    <Tab label="Details" value="2" />
                    <Tab label="Reviews" value="3" />
                    <Tab label="Lists" value="4" />
                    <Tab label="Related Books" value="5" />
                  </TabList>
                </Box>
                <TabPanel value="1">Overview</TabPanel>
                <TabPanel value="2">Details</TabPanel>
                <TabPanel value="3">Reviews</TabPanel>
                <TabPanel value="4">Lists</TabPanel>
                <TabPanel value="5">Related Books</TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default BookDetail;

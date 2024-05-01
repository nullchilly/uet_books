import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SamplePDF } from "../../assets/pdf";
import { Worker } from "@react-pdf-viewer/core";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";

// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";

function BookViewer() {
  const { book_id } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div>
        <Box id="style-2" className="container">
          <Box sx={{ flexGrow: 1, margin: "20px" }}>
            <Box
              sx={{
                display: "flex",
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
            <Box
              sx={{
                height: "100%",
              }}
            >
              <Viewer fileUrl={SamplePDF} />
            </Box>
          </Box>
        </Box>
      </div>
    </Worker>
  );
}

export default BookViewer;

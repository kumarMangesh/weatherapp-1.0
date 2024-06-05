import React from "react";
import { Snackbar, Alert } from "@mui/material";

const AppSnackBar = ({ status, error, handleClose }) => {
  return (
    <>
      <Snackbar
        open={status}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AppSnackBar;

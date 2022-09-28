import { Alert } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function Toaster() {
  const { toast, msg, type } = useSelector((state) => state?.Util);
  return (
    <>
      {toast && (
        <Alert
          sx={{
            zIndex: 9999,
            position: "fixed",
            bottom: "5%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          severity={type}
        >
          {msg}
        </Alert>
      )}
    </>
  );
}

export default Toaster;

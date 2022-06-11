import React from "react";
import { Box, Button } from "@mui/material";
import Layout from "../../components/superadmin/Layout";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  let navigate = useNavigate();

  const Home = () => {
    navigate("/");
  };
  return (
    <Layout>
      <Box sx={{ mt: 10 }}>
        <h1>Dashboard</h1>
        <Button variant="contained" onClick={Home}>
          Home
        </Button>
      </Box>
    </Layout>
  );
};

export default Dashboard;

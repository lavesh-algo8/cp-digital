import { Button, Card, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";

import AddTemplate from "../../../../../components/superadmin/Generator/Template/AddTemplate";
import TemplateTables from "../../../../../components/superadmin/Generator/Template/TemplateTables";
import { useDispatch } from "react-redux";
import { getAllTemplates } from "../../../../../redux/superAdminReducer/superAdminAction";
import Listoftemplates from "./Listoftemplates";

function AllTemplatesDesign() {
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTemplates());
  }, [openDialogAdd]);

  return (
    <Box sx={{ width: "100%", p: 3 }}>
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Typography variant="h6" fontWeight={600}>
            List of Template
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{ width: "100%", overflow: "hidden", mt: 1 }}>
        <Listoftemplates />
      </Box>
    </Box>
  );
}

export default AllTemplatesDesign;

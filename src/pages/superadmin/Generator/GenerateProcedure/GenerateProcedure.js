import React, { useEffect, useState } from "react";
import Generator from "../Generator";
import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ProcedureTable from "../../../../components/superadmin/Generator/GenerateProcedure/ProcedureTable";
import AddProcedure from "../../../../components/superadmin/Generator/GenerateProcedure/AddProcedure";
import {
  fetchCategory,
  fetchGenerateProcedure,
  getAllTemplates,
} from "../../../../redux/superAdminReducer/superAdminAction";
import { useDispatch } from "react-redux";
import EditProcedure from "../../../../components/superadmin/Generator/GenerateProcedure/EditProcedure";

const GenerateProcedure = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGenerateProcedure());
    dispatch(fetchCategory());
  }, [openDialog]);

  useEffect(() => {
    dispatch(getAllTemplates());
  }, []);

  return (
    <>
      <Generator>
        <Box sx={{ width: "100%", p: 3 }}>
          <Grid container>
            <Grid item lg={2}>
              <Typography variant="h6" fontWeight={600}>
                List of Procedure
              </Typography>
            </Grid>
            <Grid
              item
              lg={10}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                    lg: "block",
                    xl: "block",
                  },
                  mr: 3,
                }}
              >
                <OutlinedInput
                  id="outlined-adornment-weight"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon color="maincolor" />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  notched={false}
                  label="search"
                  size="small"
                  sx={{
                    background: "white",
                    width: "25ch",
                    height: "35px",
                  }}
                  placeholder="Search...."
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  sx={{
                    height: "35px",
                    textTransform: "none",
                  }}
                  onClick={() => setOpenDialog(true)}
                >
                  <AddIcon fontSize="12px" />
                  Add Procedure
                </Button>
                {openDialog && (
                  <AddProcedure
                    openDialog={openDialog}
                    setOpenDialog={setOpenDialog}
                  />
                )}
              </Box>
              <Box
                sx={{
                  ml: 3,
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#192A3A",
                    color: "white",
                    height: "35px",
                  }}
                >
                  <Typography sx={{ pl: 2, fontSize: "15px" }}>
                    Sort by
                  </Typography>
                  <FormControl sx={{ minWidth: 60 }}>
                    <Select
                      size="small"
                      color="whitecol"
                      defaultValue="All"
                      sx={{
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        color: "white",
                        fontSize: "15px",
                        "& .MuiSvgIcon-root": {
                          color: "white",
                        },
                      }}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="By Date Enrolled">Today</MenuItem>
                    </Select>
                  </FormControl>
                </Card>
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ width: "100%", overflow: "hidden", mt: 4 }}>
            <ProcedureTable />
          </Box>
        </Box>
      </Generator>
    </>
  );
};

export default GenerateProcedure;

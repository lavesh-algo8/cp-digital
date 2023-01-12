import { Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CalculatorLayout from "../../../components/superadmin/Calculator/CalculatorLayout";
import { fetchAddedCalculatorsById } from "../../../redux/superAdminReducer/superAdminAction";
import { evaluate } from "mathjs";

const AddedCalculatorPage = () => {
  const { id } = useParams();
  const currentid = id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setvalue] = useState([]);
  const [result, setresult] = useState("");

  const { addedCalculatorsById = [] } = useSelector(
    (state) => state?.SuperAdmin
  );

  const handleTestRun = () => {
    console.log(value);
    const formul = addedCalculatorsById?.formula;

    console.log(formul);
    const result = evaluate(formul, value);
    // alert(result);
    setresult(result);
  };

  const updateState = (index) => (e) => {
    const name = e.target.name; //key
    setvalue((value) => ({
      ...value,
      [name]: e.target.value,
    }));
    console.log(value);
  };

  useEffect(() => {
    setvalue("");
    setresult("");
    dispatch(fetchAddedCalculatorsById(id));
  }, [id]);

  return (
    <>
      <CalculatorLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">
            {addedCalculatorsById?.calculator_name}
          </Typography>
          <Button
            variant="contained"
            sx={{ ml: 2, textTransform: "none" }}
            startIcon={<Edit />}
            onClick={() =>
              navigate(
                `/superadmin/calculator/addedcalculator/editcalculator/${id}`
              )
            }
          >
            Edit
          </Button>
        </Box>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {addedCalculatorsById?.formData?.components?.map((item1, index1) => (
            <Grid item xs={12} sm={6} key={index1}>
              <Typography>{item1?.label}</Typography>
              <TextField
                variant="outlined"
                size="small"
                sx={{ pt: 1 }}
                placeholder={item1?.placeholder || "Enter " + item1.label}
                // label={item1?.label}
                name={item1?.label}
                fullWidth
                type={
                  item1?.label?.split(" ")[0] === "Date"
                    ? "date"
                    : item1?.label?.split(" ")[0] === "Time"
                    ? "time"
                    : item1?.type
                }
                onChange={updateState(index1)}
                value={value && value[item1?.label]}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ px: 2 }}
            onClick={handleTestRun}
          >
            Test Run{" "}
            {/* {isLoading && (
              <CircularProgress sx={{ ml: 2 }} color="inherit" size={20} />
            )} */}
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 4,
          }}
        >
          <Typography sx={{ mr: 3 }} variant="body2">
            Result
          </Typography>
          <TextField
            size="small"
            id="results"
            variant="outlined"
            value={result}
            disabled
          />
        </Box>
      </CalculatorLayout>
    </>
  );
};

export default AddedCalculatorPage;

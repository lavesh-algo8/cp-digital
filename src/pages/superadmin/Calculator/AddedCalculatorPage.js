import { Delete, Edit } from "@mui/icons-material";
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
import { evaluate, log } from "mathjs";
import DeleteCalculator from "../../../components/superadmin/Calculator/DeleteCalculator";
import ReplayIcon from "@mui/icons-material/Replay";

const AddedCalculatorPage = () => {
  const { id } = useParams();
  const currentid = id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setopenDialog] = React.useState(false);

  const [value, setvalue] = useState([]);
  const [result, setresult] = useState("");
  const [alldisable, setalldisable] = useState(null);

  const { addedCalculatorsById = [] } = useSelector(
    (state) => state?.SuperAdmin
  );

  const handleTestRun = () => {
    console.log(value);
    const formul = addedCalculatorsById?.formulaList;
    console.log(formul);

    formul.map((formla) => {
      console.log(formla.formula);
      evaluate(formla.formula, value);
    });
    console.log(value);
    setalldisable(true);
    setresult(40);
    // evaluate(formul[0].formula, value);

    // console.log(formul);
    // const result = evaluate(formul, value);
    // console.log(value.num3);
    // if (value.num3 === undefined) {
    // } else {
    //   const result2 = evaluate("total2=num3+num4", value);
    //   const result3 = evaluate("Result=total1>total2?true:false", value);
    // }
    // setresult(result);
    // console.log(value);
    // console.log(result);
  };

  const updateState = (index) => (e) => {
    const name = e.target.name; //key
    setvalue((value) => ({
      ...value,
      [name]: e.target.value,
    }));
    console.log(value);
    addedCalculatorsById?.formulaList?.map((formla) => {
      evaluate(formla.formula, value);
    });
  };

  useEffect(() => {
    setvalue("");
    setresult("");
    dispatch(fetchAddedCalculatorsById(id));
    dispatch({
      type: "REMOVE_FORMULA",
    });
  }, [id, openDialog]);

  return (
    <>
      <CalculatorLayout>
        {openDialog && (
          <DeleteCalculator
            openDialog={openDialog}
            setOpenDialog={setopenDialog}
            id={currentid}
          />
        )}
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
          <Box>
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
            <Button
              variant="outlined"
              color="error"
              sx={{ ml: 2, textTransform: "none" }}
              startIcon={<Delete />}
              onClick={() => setopenDialog(true)}
            >
              Delete
            </Button>
          </Box>
        </Box>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {addedCalculatorsById?.formData?.components?.map((item1, index1) =>
            item1.type != "button" ? (
              <Grid item xs={12} sm={6} key={index1}>
                <Typography>{item1?.label}</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  sx={{ pt: 1 }}
                  placeholder={item1?.placeholder || "Enter " + item1.label}
                  // label={item1?.label}
                  name={item1?.key}
                  id={item1?.id}
                  disabled={alldisable || item1?.disabled}
                  fullWidth
                  type={
                    item1?.label?.split(" ")[0] === "Date"
                      ? "date"
                      : item1?.label?.split(" ")[0] === "Time"
                      ? "time"
                      : item1?.type
                  }
                  onChange={updateState(index1)}
                  value={value && value[item1?.key]}
                  InputProps={{
                    style: {
                      backgroundColor:
                        alldisable || item1?.disabled ? "#F5F5F5" : "",
                    },
                  }}
                />
              </Grid>
            ) : (
              ""
            )
          )}
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button
            type="submit"
            variant="contained"
            sx={{ px: 2 }}
            onClick={handleTestRun}
          >
            Test Run
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ ml: 2, px: 2 }}
            onClick={() => setalldisable(null)}
          >
            <ReplayIcon />
          </Button>
        </Box>
        <Box sx={{ display: "none" }}>
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
        </Box>
      </CalculatorLayout>
    </>
  );
};

export default AddedCalculatorPage;

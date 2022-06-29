import {
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React from "react";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import UploadIcon from "@mui/icons-material/Upload";
import Step1 from "../../../components/superadmin/Procedure/ShiftingOfOfficeSteps/Step1";
import Step2 from "../../../components/superadmin/Procedure/ShiftingOfOfficeSteps/Step2";

const ShiftingOfOffice = () => {
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];
  const [activeStep, setActiveStep] = React.useState(0);
  // const [skipped, setSkipped] = React.useState(new Set());

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const stepperContent = {
    1: <Step1 />,
    2: <Step2 />,
    3: <p>Step3</p>,
    4: <p>Step4</p>,
    5: <p>Step5</p>,
  };

  return (
    <Grid container>
      {/* header box */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          Shifting of registered office
        </Typography>
        <Box>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              border: "none",
              "&:hover": {
                border: "none",
              },
              mr: 2,
              color: "orange",
            }}
            // onClick={handleOpenDialog}
          >
            <EditSharpIcon sx={{ mr: 1 }} />
            Edit
          </Button>
          <Button variant="contained" sx={{ textTransform: "none" }}>
            Publish <UploadIcon sx={{ ml: 1 }} />
          </Button>
        </Box>
      </Box>

      {/* stepper */}
      <Box sx={{ width: "100%", mt: 2, mb: 2 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Grid container item sx={{ mt: 2, mb: 10 }}>
              {stepperContent[activeStep + 1]}
            </Grid>
            <Grid container xs={12} sx={{ justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{ textTransform: "none", padding: "0.5rem 4rem", mr: 4 }}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                BACK
              </Button>
              <Button
                variant="contained"
                sx={{ textTransform: "none", padding: "0.5rem 4rem", ml: 4 }}
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "DONE" : "NEXT"}
              </Button>
            </Grid>
            {/* <Typography sx={{ mt: 2, mb: 1 }}>
            </Typography> */}
            {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box> */}
          </React.Fragment>
        )}
      </Box>
    </Grid>
  );
};

export default ShiftingOfOffice;

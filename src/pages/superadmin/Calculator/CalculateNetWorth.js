import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import { useForm } from "react-hook-form";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch } from "react-redux";
import { saveNetWorthCalculator } from "../../../redux/superAdminReducer/superAdminAction";

export const CalculateNetWorth = () => {
  const dispatch = useDispatch();
  const [response, setResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsLoading(true);
    const formData = {
      PUSC: data?.sharecapital,
      ROP: data?.reserves,
      AL: data?.losses,
      DE: data?.expenditure,
      ME: data?.miscexpense,
    };
    let resp = await dispatch(saveNetWorthCalculator(formData));
    setResponse(resp);
    setIsLoading(false);
  };
  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Calculate Net Worth</Typography>
        <Button variant="contained" sx={{ textTransform: "none" }}>
          Publish <UploadIcon sx={{ ml: 1 }} />
        </Button>
      </Box>
      <Typography sx={{ mt: 2 }}>Description</Typography>
      <Typography sx={{ mt: 2, mb: 5, ml: 2 }}>
        You can use this tool to calculate your networth.
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box width="100%">
              <Typography sx={{ mb: 1 }} variant="body2">
                Paid Up Share Capital:
              </Typography>
              <TextField
                size="small"
                id="sharecapital"
                variant="outlined"
                {...register("sharecapital", {
                  required: true,
                })}
                error={errors.sharecapital?.type === "required"}
                fullWidth
                type="number"
              />
            </Box>
            <Box
              width="100%"
              sx={{ ml: { xl: 5, lg: 5, md: 3, xs: 2, sm: 2 } }}
            >
              <Typography sx={{ mb: 1 }} variant="body2">
                Reserves Out of Profit (including securities premium):
              </Typography>
              <TextField
                size="small"
                id="reserves"
                variant="outlined"
                {...register("reserves", {
                  required: true,
                })}
                error={errors.reserves?.type === "required"}
                fullWidth
                type="number"
              />
            </Box>
          </Box>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box width="100%">
              <Typography sx={{ mb: 1 }} variant="body2">
                Accumulated Losses:
              </Typography>
              <TextField
                size="small"
                id="losses"
                variant="outlined"
                {...register("losses", {
                  required: true,
                })}
                error={errors.losses?.type === "required"}
                fullWidth
                type="number"
              />
            </Box>
            <Box
              width="100%"
              sx={{ ml: { xl: 5, lg: 5, md: 3, xs: 2, sm: 2 } }}
            >
              <Typography sx={{ mb: 1 }} variant="body2">
                Deferred Expenditure:
              </Typography>
              <TextField
                size="small"
                id="expenditure"
                variant="outlined"
                {...register("expenditure", {
                  required: true,
                })}
                error={errors.expenditure?.type === "required"}
                fullWidth
                type="number"
              />
            </Box>
          </Box>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box width="100%">
              <Typography sx={{ mb: 1 }} variant="body2">
                Miscellaneous Expenses:
              </Typography>
              <TextField
                size="small"
                id="miscexpense"
                variant="outlined"
                {...register("miscexpense", {
                  required: true,
                })}
                error={errors.miscexpense?.type === "required"}
                fullWidth
                type="number"
              />
            </Box>
            <Box
              width="100%"
              sx={{ ml: { xl: 5, lg: 5, md: 3, xs: 2, sm: 2 } }}
            ></Box>
          </Box>
        </Box>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
          <Button type="submit" variant="contained" sx={{ px: 2 }}>
            Test Run{" "}
            {isLoading && (
              <CircularProgress sx={{ ml: 2 }} color="inherit" size={20} />
            )}
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
            Results
          </Typography>
          <TextField
            size="small"
            id="results"
            variant="outlined"
            value={response?.result}
            disabled
          />
        </Box>
      </form>
    </>
  );
};

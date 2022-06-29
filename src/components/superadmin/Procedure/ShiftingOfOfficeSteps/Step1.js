import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";
import { GREY } from "../../../../Utility/Colors";

function Step1() {
  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Grid container item xs={12}>
      <FormControl>
        {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
        <RadioGroup
          defaultValue="Shifting of Registered Office from One City to another City/Town/Village"
          name="radio-buttons-group"
        >
          {[
            "Shifting of Registered Office within the Local limits of the City/Town/Village",
            "Shifting of Registered Office from One City to another City/Town/Village",
            "Shifting of Registered Office from One Juridiction to another Juridiction",
            "Shifting of Registered Office from One State to another State",
          ].map((item, index) => (
            <FormControlLabel
              value={item}
              key={item}
              control={<Radio />}
              label={item}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Grid container item xs={12} sx={{ alignItems: "flex-end" }}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <Typography sx={{ color: GREY }} variant="body2">
              CIN No
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
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px solid grey",
                },
                color: "grey",
                fontSize: "15px",
                "& .MuiSvgIcon-root": {
                  color: "grey",
                },
              }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Button variant="contained" sx={{ textTransform: "none" }}>
            Search
            <SearchIcon sx={{ ml: 1, mr: 1 }} />
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <Typography sx={{ color: GREY }} variant="body2">
            Company Name
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
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid grey",
              },
              color: "grey",
              fontSize: "15px",
              "& .MuiSvgIcon-root": {
                color: "grey",
              },
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={8} sx={{ pl: 2 }}>
        <FormControl fullWidth>
          <Typography sx={{ color: GREY }} variant="body2">
            Registered Office Address
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
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid grey",
              },
              color: "grey",
              fontSize: "15px",
              "& .MuiSvgIcon-root": {
                color: "grey",
              },
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <FormControl fullWidth>
          <Typography sx={{ color: GREY }} variant="body2">
            Email ID
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
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid grey",
              },
              color: "grey",
              fontSize: "15px",
              "& .MuiSvgIcon-root": {
                color: "grey",
              },
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ pl: 2 }}>
        <FormControl fullWidth>
          <Typography sx={{ color: GREY }} variant="body2">
            Class of company
          </Typography>
          <Select
            size="small"
            color="whitecol"
            defaultValue="Name"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid grey",
              },
              color: "grey",
              fontSize: "15px",
              "& .MuiSvgIcon-root": {
                color: "grey",
              },
            }}
          >
            <MenuItem value="Name">Class A</MenuItem>
            <MenuItem value="Day Pushlished">Class B</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={4} sx={{ pl: 2 }}>
        <FormControl fullWidth>
          <Typography sx={{ color: GREY }} variant="body2">
            Listed/Unlisted
          </Typography>
          <Select
            size="small"
            color="whitecol"
            defaultValue="Name"
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: "2px solid grey",
              },
              color: "grey",
              fontSize: "15px",
              "& .MuiSvgIcon-root": {
                color: "grey",
              },
            }}
          >
            <MenuItem value="Name">Listed</MenuItem>
            <MenuItem value="Day Pushlished">Unlisted</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default Step1;

import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Carasoul from "../../components/superadmin/Carasoul";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { superAdminLogin } from "../../redux/superAdminReducer/superAdminAction";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setshowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    dispatch(
      superAdminLogin({
        email: data.emailid,
        password: data.password,
      })
    );
    // navigate("/superadmin/admins");
  };
  const handleClickShowPassword = () => {
    if (showPassword === true) {
      setshowPassword(false);
    } else {
      setshowPassword(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: "url(/background.png)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Container sx={{ width: "90%" }}>
              <Box sx={{ mb: 3 }}>
                <img src="/logo.png" alt="logo" height={35} />
              </Box>
              <Box
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                  },
                }}
              >
                <Carasoul />
              </Box>
            </Container>
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Container sx={{ width: "95%" }}>
              <Card
                sx={{
                  minHeight: "85vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  paddingLeft: {
                    sm: "30px",
                    xs: "30px",
                    md: "40px",
                    lg: "120px",
                    xl: "120px",
                  },
                  paddingRight: {
                    sm: "30px",
                    xs: "30px",
                    md: "40px",

                    lg: "120px",
                    xl: "120px",
                  },
                  borderRadius: "30px",
                }}
              >
                <Typography variant="h4" component="div">
                  Login as
                </Typography>
                <Typography variant="h6" component="div" fontWeight={530}>
                  Super Admin
                </Typography>
                <Typography variant="body2" sx={{ color: "#C3C3C3", mt: 2 }}>
                  Manage your admins employers and cutomers!
                </Typography>
                <Typography sx={{ mt: 2 }}>Enter your credentials</Typography>
                <Box sx={{ width: "100%" }}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                      id="emailid"
                      label="Bussiness Email Id*"
                      variant="outlined"
                      // focused
                      sx={{
                        mt: 3,
                        "& fieldset": {
                          borderRadius: `90px`,
                        },
                      }}
                      {...register("emailid", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                      fullWidth
                      error={
                        errors.emailid?.type === "required" ||
                        errors?.emailid?.type === "pattern"
                      }
                    />
                    <Box
                      sx={{
                        pt: 1,
                        color: "red",
                        display: "flex",
                        justifyContent: "left",
                      }}
                    >
                      {errors?.emailid?.type === "required" &&
                        "email is required"}
                      {errors?.emailid?.type === "pattern" &&
                        "Enter valid email"}
                    </Box>

                    <TextField
                      id="password"
                      label="Password*"
                      variant="outlined"
                      sx={{
                        mt: 3,
                        "& fieldset": {
                          borderRadius: `90px`,
                        },
                      }}
                      {...register("password", { required: true })}
                      fullWidth
                      error={errors.password?.type === "required"}
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box
                      sx={{
                        pt: 1,
                        color: "red",
                        display: "flex",
                        justifyContent: "left",
                      }}
                    >
                      {errors?.password?.type === "required" &&
                        "password is required"}
                    </Box>

                    <Box
                      sx={{
                        pt: 1,
                        color: "red",
                        display: "flex",
                        justifyContent: "left",
                      }}
                    >
                      {errors.acceptTerms?.type === "required" &&
                        "Please Accept terms and condition"}
                    </Box>

                    <Box textAlign="center">
                      {/* <Button
                        size="large"
                        color="primary"
                        variant="contained"
                        type="submit"
                        sx={{
                          mt: 3,
                          px: 5,
                          color: "white",
                          textTransform: "none",
                          mb: 3,
                          borderRadius: "30px",
                        }}
                        fullWidth
                      >
                        Login
                        <ArrowForwardIcon sx={{ fontSize: "18px", ml: 2 }} />
                      </Button> */}
                      <button
                        style={{
                          width: "100%",
                          borderRadius: "30px",
                          padding: 15,
                          marginTop: 12,
                          backgroundColor: "#192A3A",
                          color: "white",
                          border: 0,
                          cursor: "pointer",
                          fontSize: 15,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        Login
                      </button>
                    </Box>
                  </form>
                </Box>
              </Card>
            </Container>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Paper = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "30px 0px",
  backgroundColor: "white",
  borderRadius: "4px",
  boxShadow:
    "0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)",
}));

const SignIn = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper>
        <Typography component="div">
          <Box fontSize={30} fontWeight={600} m={-2}>
            SIGN IN
          </Box>
        </Typography>
        <Typography component="div">
          <Box fontSize={16} m={1}>
            Sign into your account
          </Box>
        </Typography>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <form noValidate onSubmit={handleSubmit}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 2 }}
          >
            <Grid size={{ xs: 9 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon color="disabled" />
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 9 }}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="disabled" />
                      </InputAdornment>
                    ),
                  },
                }}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 9 }}>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>

            <Grid size={{ xs: 9 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
              >
                Sign In
              </Button>
            </Grid>

            <Grid item>
              <RouterLink
                to="/forgot-password"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="body2" color="secondary">
                  Forgot your password?
                </Typography>
              </RouterLink>
            </Grid>

            <Grid size={{ xs: 9 }}>
              <Typography component="div">
                <Box fontSize={20} m={3}>
                  <RouterLink
                    to="/signup"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    YOU DO NOT HAVE AN ACCOUNT?
                  </RouterLink>
                </Box>
              </Typography>
            </Grid>

            <Grid size={{ xs: 9 }}>
              <RouterLink to="/signup" style={{ textDecoration: "none" }}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  SIGN UP
                </Button>
              </RouterLink>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignIn;

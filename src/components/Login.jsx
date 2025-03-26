import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Lock } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";


const theme = createTheme({
  palette: {
    primary: {
      main: "#2563eb",
    },
    secondary: {
      main: "#ec4899",
    },
  },
});

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin123" && password === "123456") {
        dispatch(login({ username }));
      toast.success("Logged in Successfully!");
    } else {
      toast.error("Invalid username or password!");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh", 
          width: { xs: "100%", md: "80vw" }, 
          maxWidth: "1200px",
          mx: "auto",
    display: "flex",
    justifyContent: "center",
    background: "linear-gradient(120deg, #f0f9ff 0%, #e0f2fe 100%)",
    px: { xs: 2, md: 0 }, 
    py: { xs: 4 },  }}
      >
        <Container maxWidth="xs">
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              marginTop: "20px"
              // width:"100%"
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Lock size={32} color="#2563eb" />
              <Typography
                variant="h4"
                component="h1"
                sx={{ ml: 2, fontWeight: 600, color: "#1e293b" }}
              >
                Login
              </Typography>
            </Box>

            <form onSubmit={handleLogin}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ backgroundColor: "white" }}
                />
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ backgroundColor: "white" }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Login
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
      <Toaster position="top-center" reverseOrder={false} />
    </ThemeProvider>
  );
}

export default Login;
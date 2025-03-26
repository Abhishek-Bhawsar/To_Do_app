import "./App.css";
import React from "react";
import { useSelector,  } from "react-redux";
import NewTask from "./components/TaskInput";
import Login from "./components/Login";
import { Box } from "@mui/material";


function App() {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

      return (
      <Box
       sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",  
      width: "100vw",  
      textAlign: "center",
    }}>
        {isAuthenticated ? 
        <NewTask/>
        :
        <Login/>
        }
      </Box>
    );
 
}

export default App

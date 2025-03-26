import React, { useState,useEffect } from "react";
import { useDispatch ,useSelector} from "react-redux";
import {
  Box,Container,Typography,TextField,Button,Paper,ThemeProvider,createTheme,
} from "@mui/material";
import toast,{Toaster} from "react-hot-toast";
import { CheckCircle2, PlusCircle } from "lucide-react";
import { addTask,updateTask } from "../redux/taskSlice";
import { logout } from "../redux/authSlice";
import { fetchWeather } from "../redux/weatherSlice";
//component
import NewTaskList from "./TaskList";

//style
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



function NewTask() {

  const [task, setTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);
  
  useEffect(() => {
        dispatch(fetchWeather());
      }, [dispatch]);


  // Add new task and update task function    
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (task.trim() === "") {
      toast.error("Task cannot be empty!");
      return;
    }

    if (editTaskId) {
      // for update task
      dispatch(updateTask({ id: editTaskId, text: task }));
      toast.success("Task Updated Successfully!");
      setEditTaskId(null); 
    } else {
      // Add new task
      dispatch(addTask({ id: Date.now(), text: task, completed: false }));
      toast.success("Task Added Successfully!");
    }

    setTask("");

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
          flexDirection: "column",
          // alignItems: "center",
          // justifyContent: "center",
          background: "linear-gradient(120deg, #f0f9ff 0%, #e0f2fe 100%)",
          py: 4,
          px: { xs: 2, md: 4 }, // 
        }}
      >
        <Container >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 2,
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              marginTop: "20px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center",width:"100%", justifyContent:"space-between",gap:"2", flexDirection: { xs: "column", sm: "row"},mb: 4 }}>
              <CheckCircle2 size={32} color="#2563eb" />
              <Typography
                variant="h4"
                component="h1"
                sx={{ ml: 2, fontWeight: 600, color: "#1e293b"}}
              >
                Todo List
              </Typography>
              <Typography sx={{marginLeft: "auto",fontSize: { xs: "14px", sm: "16px" }, fontWeight: 500,display: "flex",
                  alignItems: "center",gap: 1, backgroundColor: "rgba(255, 255, 255, 0.8)",
                  padding: "4px 10px",borderRadius: "8px",boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                  color: "#1E293B",}}>
                      {weather.loading ? (
                        <>⏳ Loading weather...</>
                      ) : weather.error ? (
                        <>⚠️ Error fetching weather</>
                      ) : (
                        <>🌡️ {weather.data?.temperature}°C {weather.data?.condition?.text} </>
                      )}
                    </Typography>
              <Typography sx={{marginLeft: "auto"}}>
                <button onClick={() => dispatch(logout())}>Logout</button>
              </Typography>
            </Box>

            <form onSubmit={handleAddTodo} style={{ marginBottom: "2rem" }}>
              <Box sx={{  display: "flex", gap: 1, flexWrap: "wrap" , }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Add a new task..."
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  sx={{ backgroundColor: "white" ,flex: "1" }}
                />
          
                <Button type="submit" variant="contained"
                  sx={{  width: { xs: "100%", md: "auto" }, px: 3,minWidth: "100px",}}
                  startIcon={<PlusCircle size={20} />}
                >
                  {editTaskId ? "Update" : "Add"} 
                </Button>
              
              </Box>
            </form>

            <NewTaskList setEditTaskId={setEditTaskId} setTask={setTask}/>
          </Paper>
        </Container>
      </Box>
      <Toaster position="top-center" reverseOrder={false}/>
      
    </ThemeProvider>
  );
}

export default NewTask;

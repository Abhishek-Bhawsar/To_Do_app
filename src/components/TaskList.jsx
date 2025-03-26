import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Fade,
} from "@mui/material";
import { Trash2 ,Edit2} from "lucide-react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTask, updateTask } from "../redux/taskSlice";


const NewTaskList = ({ setEditTaskId, setTask }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  //handle toggle for task completion
  const handleToggleTodo = (taskId) => {
    const updatedTask = tasks.find((task) => task.id === taskId);
    if (updatedTask) {
      dispatch(updateTask({ ...updatedTask, completed: !updatedTask.completed }));
    }
  };

  // get text and id for update tasks
  const handleEditTask = (task) => {
    setTask(task.text); 
    setEditTaskId(task.id);
  };

  return (
    <Box sx={{
    maxHeight: { xs: "50vh", md: "60vh" },
    overflowY: "auto", 
    paddingRight: "10px",
    width: "100%",
  }} >
      <List>
        {tasks.map((task) => (
          <Fade in key={task.id}>
            <ListItem
              sx={{
                mb: 1,
                bgcolor: "white",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "rgba(0, 0, 0, 0.12)",
                flexWrap: "wrap",
              }}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleTodo(task.id)}
                color="primary"
              />
              <ListItemText
                primary={task.text}
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "text.secondary" : "text.primary",
                  wordBreak: "break-word",
                  flex: 1,
                }}
              />
              <ListItemSecondaryAction>
              <IconButton
                  edge="end"
                  onClick={() => handleEditTask(task)}  
                  color="primary"
                >
                  <Edit2 size={19} />
                </IconButton>
                
                <IconButton
                  edge="end"
                  onClick={() => dispatch(removeTask(task.id))}
                  color="error"
                >
                  <Trash2 size={20} />
                </IconButton>

               
              </ListItemSecondaryAction>
            </ListItem>
          </Fade>
        ))}
      </List>


       {/* if no tasks are available then show this message  */}
      {tasks.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            py: 4,
            color: "text.secondary",
          }}
        >
          <Typography variant="body1">
            No tasks yet. Add a new task to get started!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default NewTaskList;

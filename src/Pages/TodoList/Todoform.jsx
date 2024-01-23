import React, { useState } from "react"
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { FormControl, MenuItem, Typography } from "@mui/material";
import { InputLabel } from "@mui/material";
import { Select } from "@mui/material";


const Todoform = ({ currUser, myinfo, notify }) => {

    const [todoInfo, setTodoInfo] = useState({
        name: '',
        date: "",
        description: "",
        status: "",
        type: "",
    })


    const [error, setError] = useState("")

    const handleChange = (e) => {
        setTodoInfo({ ...todoInfo, [e.target.name]: e.target.value })
    }

    const registerTodo = async () => {
        const newTodo = {
            ...myinfo,
            ...todoInfo,
            issuedDate: new Date(),

        }
        try {
            await addDoc(collection(db, "niwe_todo"),
                {
                    ...newTodo,
                });
                setTodoInfo({
                    name: "",
                    date: "",
                    description: "",
                    status: "",
                    type: "",
                })
            notify("Todo Added", "success")
        }
        catch (error) {
            setError(error.code.substring(error.code.indexOf('/') + 1).replaceAll("-", " "))
            console.log(error)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")

        if (todoInfo.name === "") {
            setError("Todo Name is required")
            return
        }
        if (todoInfo.date === "") {
            setError("Date is required")
            return
        }
        if (todoInfo.description === "") {
            setError("Description is required")
            return
        }
        if (todoInfo.status === "") {
            setError("Status is required")
            return
        }
        if (todoInfo.type === "") {
            setError("Type is required")
            return
        }

        registerTodo()
    }


    return (
        <>
            <Box
                component="form"
                onSubmit={handleSubmit}
                onChange={handleChange}
                sx={{my:3}}
                noValidate
                autoComplete="off"
            >
                <Grid container spacing={2}>
                <Grid item xs={12}>
                        <Typography variant="h3" sx={{ textAlign: "center", wordBreak: "break-word" }} gutterBottom>
                            Add a Todo/Daily Activities
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} item xs={12} lg={6} sx={{ mt: { xs: 5, lg: "auto" }, mb: "auto", mx: "auto" }}>

                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                value={todoInfo.name}
                                required
                                fullWidth
                                onChange={(e) => setTodoInfo({ ...todoInfo, name: e.target.value })}
                                id="Name"
                                label="Todo Name"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="date"
                                value={todoInfo.date}
                                required
                                fullWidth
                                onChange={(e) => setTodoInfo({ ...todoInfo, date: e.target.value })}
                                id="date"
                                label="Date"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                value={todoInfo.description}
                                required
                                fullWidth
                                onChange={(e) => setTodoInfo({ ...todoInfo, description: e.target.value })}
                                id="description"
                                label="Description"
                                multiline
                                rows={6}
                            />
                        </Grid>

                        <Grid item xs={12}>
                        <FormControl 
                            fullWidth
                            required
                        >
                            <InputLabel>Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={todoInfo.status}
                                label="Status"
                                name="status"
                                onChange={(e) => setTodoInfo({ ...todoInfo, status: e.target.value })}
                            >
                                <MenuItem value={"Scheduled"}>Scheduled</MenuItem>
                                <MenuItem value={"Completed"}>Completed</MenuItem>
                                <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                        <FormControl
                            fullWidth
                            required
                        >
                            <InputLabel>Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={todoInfo.type}
                                label="Type"
                                name="type"
                                onChange={(e) => setTodoInfo({ ...todoInfo, type: e.target.value })}
                            >
                                <MenuItem value={"Todo"}>Todo</MenuItem>
                                <MenuItem value={"Daily Activities"}>Daily Activities</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>


                        {error ?
                            <>
                                <Grid item xs={12}>
                                    <Alert severity="error">{error}</Alert>
                                </Grid>
                            </>
                            : <></>}

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                fullWidth
                                sx={{
                                    marginBottom: "2rem"
                                }}
                                variant="contained"
                            >
                                Add Todo
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}


export default Todoform

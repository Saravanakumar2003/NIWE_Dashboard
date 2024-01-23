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


const EventForm = ({ currUser, myinfo, notify }) => {

    const [eventInfo, setEventInfo] = useState({
        name: '',
        date: "",
        description: "",
        status: "",
        type: "",
    })


    const [error, setError] = useState("")

    const handleChange = (e) => {
        setEventInfo({ ...eventInfo, [e.target.name]: e.target.value })
    }

    const registerTodo = async () => {
        const newTodo = {
            ...myinfo,
            ...eventInfo,
            issuedDate: new Date(),

        }
        try {
            await addDoc(collection(db, "niwe_events"),
                {
                    ...newTodo,
                });
                setEventInfo({
                    name: "",
                    date: "",
                    description: "",
                    status: "",
                    type: "",
                })
            notify("Event Added", "success")
        }
        catch (error) {
            setError(error.code.substring(error.code.indexOf('/') + 1).replaceAll("-", " "))
            console.log(error)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")
        
        setError("Date is required")
      
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
                            Add a Event
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} item xs={12} lg={6} sx={{ mt: { xs: 5, lg: "auto" }, mb: "auto", mx: "auto" }}>

                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                value={eventInfo.name}
                                required
                                fullWidth
                                onChange={(e) => setEventInfo({ ...eventInfo, name: e.target.value })}
                                id="Name"
                                label="Event Name"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="date"
                                value={eventInfo.date}
                                required
                                fullWidth
                                onChange={(e) => setEventInfo({ ...eventInfo, date: e.target.value })}
                                id="date"
                                label="Event Date"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="description"
                                value={eventInfo.description}
                                required
                                fullWidth
                                onChange={(e) => setEventInfo({ ...eventInfo, description: e.target.value })}
                                id="description"
                                label="Event Description"
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
                                value={eventInfo.status}
                                label="Status"
                                name="status"
                                onChange={(e) => setEventInfo({ ...eventInfo, status: e.target.value })}
                            >
                                <MenuItem value={"Scheduled"}>Scheduled</MenuItem>
                                <MenuItem value={"Attended"}>Attended</MenuItem>
                                <MenuItem value={"Can't Attend"}>Can't Attend</MenuItem>
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
                                value={eventInfo.type}
                                label="Event Type"
                                name="type"
                                onChange={(e) => setEventInfo({ ...eventInfo, type: e.target.value })}
                            >
                                <MenuItem value={"Seminar"}>Seminar</MenuItem>
                                <MenuItem value={"Meeting"}>Meeting</MenuItem>
                                <MenuItem value={"Workshop"}>Workshop</MenuItem>
                                <MenuItem value={"Webinar"}>Webinar</MenuItem>
                                <MenuItem value={"Conference"}>Conference</MenuItem>
                                <MenuItem value={"Hackathon"}>Training</MenuItem>
                                <MenuItem value={"Other"}>Other</MenuItem>
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


export default EventForm

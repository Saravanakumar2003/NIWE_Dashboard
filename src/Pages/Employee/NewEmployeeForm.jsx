import React, { useState } from "react"
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";

const NewEmployeeForm = ({ currUser, myinfo, notify }) => {

    const [employeeInfo, setEmployeeInfo] = useState({
        name: "",
        phone: "",
        email: "",
        gender: "",
        jobTitle: "",
        department: "",
    })

    const [error, setError] = useState("")

    const handleChange = (e) => {
        setEmployeeInfo({ ...employeeInfo, [e.target.name]: e.target.value })
    }

    const registerEmployee = async () => {
        const newEmployee = {
            ...myinfo,
            ...employeeInfo,
            issuedDate: new Date(),
        }
        try {
            await addDoc(collection(db, "niwe_employee"),
                {
                    ...newEmployee,
                });
            setEmployeeInfo({
                name: "",
                phone: "",
                email: "",
                gender: "",
                jobTitle: "",
                department: "", 
            })
            notify("Employee Registered", "success")

        }
        catch (error) {
            setError(error.code.substring(error.code.indexOf('/') + 1).replaceAll("-", " "))
            console.log(error)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")

        if (employeeInfo.name === "") {
            setError("name is required")
            return
        }

        if (employeeInfo.phone === "") {
            setError("phone is required")
            return
        }
        
        if (employeeInfo.email === "") {
            setError("email is required")
            return
        }

        if (employeeInfo.gender === "") {
            setError("gender is required")
            return
        }

        registerEmployee()
    }


    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit} onChange={handleChange} sx={{ my: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3" sx={{ textAlign: "center", wordBreak: "break-word" }} gutterBottom>
                            Add a Employee
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} item xs={12} lg={6} sx={{ mt: { xs: 5, lg: "auto" }, mb: "auto", mx: "auto" }}>

                        {/* Real Form */}
                        <Grid item xs={12}>
                            <TextField
                                name="name"
                                value={employeeInfo.name}
                                required
                                fullWidth
                                onChange={(e) => setEmployeeInfo({ ...employeeInfo, name: e.target.value })}
                                id="Name"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Namee"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="phone"
                                value={employeeInfo.phone}
                                required
                                fullWidth
                                onChange={(e) => setEmployeeInfo({ ...employeeInfo, phone: e.target.value })}
                                id="Phone"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Phone"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="email"
                                value={employeeInfo.email}
                                required
                                fullWidth
                                onChange={(e) => setEmployeeInfo({ ...employeeInfo, email: e.target.value })}
                                id="Email"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Email"
                            />
                        </Grid>
                            <Grid item xs={12}>
                            <TextField
                                name="gender"
                                value={employeeInfo.gender}
                                required
                                fullWidth
                                onChange={(e) => setEmployeeInfo({ ...employeeInfo, gender: e.target.value })}
                                id="Gender"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Gender"
                            />
                            </Grid>

                            <Grid item xs={12}>
                            <TextField
                            name="jobTitle"
                            value={employeeInfo.jobTitle}
                            required
                            fullWidth
                            onChange={(e) => setEmployeeInfo({ ...employeeInfo, jobTitle: e.target.value })}
                            id="Job Title"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Job Title"
                        />

                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            name="department"
                            value={employeeInfo.department}
                            required
                            fullWidth
                            onChange={(e) => setEmployeeInfo({ ...employeeInfo, department: e.target.value })}
                            id="Department"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            label="Department"
                        />
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
                                variant="contained"
                            >
                                Add Employee
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}


export default NewEmployeeForm

// Path: src/Pages/Employee/AddEmployee.jsx
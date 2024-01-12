import React, { useState } from "react"
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography } from "@mui/material";

const NewComplaintForm = ({ currUser, myinfo, notify }) => {
    const [error, setError] = useState("")
    const [complaintInfo, setComplaintInfo] = useState({
        complaintType: "",
        complaintDescription: "",
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setComplaintInfo({
            ...complaintInfo,
            [name]: value,
        })
    }

    const registerComplaint = async () => {
        const newComplaint = {
            ...myinfo,
            ...complaintInfo,
            issuedTo: "Empowerkids Team",
            complaintStatus: "pending",
            issuedDate: new Date(),
        }
        try {
            await addDoc(collection(db, "niwe_complaint"),
                {
                    ...newComplaint
                });
            setComplaintInfo({
                complaintType: "",
                complaintDescription: "",
            })
            notify("Complain Registered", "success")

        }
        catch (error) {
            setError(error.code.substring(error.code.indexOf('/') + 1).replaceAll("-", " "))
            console.log(error)
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError("")

        if (myinfo.name === "" ||
            myinfo.stateName === "" ||
            myinfo.phoneNo === "" ||
            myinfo.email === "") {
            notify("Complete Your Profile First", "warning")
            return
        }
        registerComplaint()
    }
    return (
        <>
            <Box component="form" noValidate onSubmit={handleSubmit} onChange={handleChange} sx={{ my: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h3" sx={{ textAlign: "center", wordBreak: "break-word" }} gutterBottom>
                            Add a Project
                        </Typography>
                    </Grid>
                    <Grid container spacing={2} item xs={12} lg={6} sx={{ mt: { xs: 5, lg: "auto" }, mb: "auto", mx: "auto" }}>

                        {/* Real Form */}
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="Status">Status</InputLabel>
                                <Select
                                    labelId="Status"
                                    id="Status"
                                    required
                                    value={complaintInfo.Status}
                                    label="Status"
                                    onChange={(e) => setComplaintInfo({ ...complaintInfo, Status: e.target.value })}
                                >
                                    <MenuItem value={"Not Started"}>Not Started</MenuItem>
                                    <MenuItem value={"Waiting for customer approval"}>Waiting for customer approval</MenuItem>
                                    <MenuItem value={"Feedback recieved"}>Feedback recieved</MenuItem>
                                    <MenuItem value={"In Progress"}>In Progress</MenuItem>
                                    <MenuItem value={"Completed"}>Completed</MenuItem>
                                    <MenuItem value={"On Hold"}>On Hold</MenuItem>
                                    <MenuItem value={"Overdue"}>Overdue</MenuItem>
                                    <MenuItem value={"Feedback not received"}>Feedback not received</MenuItem>
                                    <MenuItem value={"Waiting for DG approval"}>Waiting for DG approval</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="Priority">Priority</InputLabel>
                                <Select
                                    labelId="Priority"
                                    id="Priority"
                                    required
                                    value={complaintInfo.Priority}
                                    label="Priority"
                                    onChange={(e) => setComplaintInfo({ ...complaintInfo, Priority: e.target.value })}
                                >
                                    <MenuItem value={"Low"}>Low</MenuItem>
                                    <MenuItem value={"Medium"}>Medium</MenuItem>
                                    <MenuItem value={"High"}>High</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="dateofRequest"
                                value={complaintInfo.dateofRequest}
                                required
                                fullWidth
                                multiline
                                maxRows={1}
                                id="dateofRequest"
                                label="Date of Request"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="deadline"
                                value={complaintInfo.deadline}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                id="deadline"
                                label="Deadline"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="clientName"
                                value={complaintInfo.clientName}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                id="ClientName"
                                label="Client Name"
                            />
                        </Grid>

                        

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="projectName">Poject Name</InputLabel>
                                <Select
                                    labelId="projectName"
                                    id="projectName"
                                    required
                                    value={complaintInfo.projectName}
                                    label="projectName"
                                    onChange={(e) => setComplaintInfo({ ...complaintInfo, projectName: e.target.value })}
                                >
                                    <MenuItem value={"AEP/EYA"}>AEP/EYA</MenuItem>
                                    <MenuItem value={"Micrsiting"}>Micrsiting</MenuItem>
                                    <MenuItem value={"Feedback recieved"}>Feedback recieved</MenuItem>
                                    <MenuItem value={"DPR"}>DPR</MenuItem>
                                    <MenuItem value={"EYA/Performance analysis"}>EYA/Performance analysis</MenuItem>
                                    <MenuItem value={"Completed"}>Completed</MenuItem>
                                    <MenuItem value={"Overdue"}>Overdue</MenuItem>
                                    <MenuItem value={"Repowering"}>Repowering</MenuItem>
                                    <MenuItem value={"Others"}>Others</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="ProjectDescription"
                                value={complaintInfo.ProjectDescription}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                id="ProjectDescription"
                                label="Task Description"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="assignedTo">Assigned To</InputLabel>
                                <Select
                                    labelId="assignedTo"
                                    id="assignedTo"
                                    required
                                    value={complaintInfo.assignedTo}
                                    label="assignedTo"
                                    onChange={(e) => setComplaintInfo({ ...complaintInfo, assignedTo: e.target.value })}
                                >
                                    <MenuItem value={"Dr.G.Arivukkodi"}>Dr.G.Arivukkodi</MenuItem>
                                    <MenuItem value={"Mr.R.Vinod Kumar"}>Mr.R.Vinod Kumar</MenuItem>
                                    <MenuItem value={"Mr.B.Senthil Kumar"}>Mr.B.Senthil Kumar</MenuItem>
                                    <MenuItem value={"Ms.P.Shiela"}>Ms.P.Shiela</MenuItem>
                                    <MenuItem value={"Dr.G.Arivukkodi/Mr.Vinod Kumar"}>Dr.G.Arivukkodi/Mr.Vinod Kumar</MenuItem>
                                    <MenuItem value={"Dr.G.Arivukkodi/Mr.Vinod Kumar/Other Diviison"}>Dr.G.Arivukkodi/Mr.Vinod Kumar/Other Divison</MenuItem>                                  
                                </Select>
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                                name="Deliverable"
                                value={complaintInfo.Deliverable}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                id="Deliverable"
                                label="Deliverable"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="DGApprovedDate"
                                value={complaintInfo.DGApprovedDate}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                id="DGApprovedDate"
                                label="DG Approved Date"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="Agreement"
                                value={complaintInfo.Agreement}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                id="Agreement"
                                label="Service Agreement Signed"                              
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="DraftApproved"
                                value={complaintInfo.DraftApproved}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                id="DraftApproved"
                                label="Draft Approved date"
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                                name="dateSent"
                                value={complaintInfo.dateSent}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                id="dateSent"
                                label="Draft Sent date"                              
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="Prepared">Prepared By</InputLabel>
                                <Select
                                    labelId="Prepared"
                                    id="Prepared"
                                    required
                                    value={complaintInfo.Prepared}
                                    label="Prepared"
                                    onChange={(e) => setComplaintInfo({ ...complaintInfo, Prepared: e.target.value })}
                                >
                                    <MenuItem value={"Dr.G.Arivukkodi"}>Dr.G.Arivukkodi</MenuItem>
                                    <MenuItem value={"Mr.R.Vinod Kumar"}>Mr.R.Vinod Kumar</MenuItem>
                                    <MenuItem value={"Mr.B.Senthil Kumar"}>Mr.B.Senthil Kumar</MenuItem>
                                    <MenuItem value={"Ms.P.Shiela"}>Ms.P.Shiela</MenuItem>
                                    <MenuItem value={"Dr.G.Arivukkodi/Mr.Vinod Kumar"}>Dr.G.Arivukkodi/Mr.Vinod Kumar</MenuItem>
                                    <MenuItem value={"Dr.G.Arivukkodi/Mr.Vinod Kumar/Other Diviison"}>Dr.G.Arivukkodi/Mr.Vinod Kumar/Other Divison</MenuItem>                                  
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="Verified">Verified By</InputLabel>
                                <Select
                                    labelId="Verified"
                                    id="Verified"
                                    required
                                    value={complaintInfo.Verified}
                                    label="Verified"
                                    onChange={(e) => setComplaintInfo({ ...complaintInfo, Verified: e.target.value })}
                                >
                                    <MenuItem value={"Dr.G.Arivukkodi"}>Dr.G.Arivukkodi</MenuItem>
                                    <MenuItem value={"Mr.R.Vinod Kumar"}>Mr.R.Vinod Kumar</MenuItem>
                                    <MenuItem value={"Mr.B.Senthil Kumar"}>Mr.B.Senthil Kumar</MenuItem>
                                    <MenuItem value={"Ms.P.Shiela"}>Ms.P.Shiela</MenuItem>
                                    <MenuItem value={"Dr.G.Arivukkodi/Mr.Vinod Kumar"}>Dr.G.Arivukkodi/Mr.Vinod Kumar</MenuItem>
                                    <MenuItem value={"Dr.G.Arivukkodi/Mr.Vinod Kumar/Other Diviison"}>Dr.G.Arivukkodi/Mr.Vinod Kumar/Other Divison</MenuItem>                                  
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="Apprived">Apprived By</InputLabel>
                                <Select
                                    labelId="Apprived"
                                    id="Apprived"
                                    required
                                    value={complaintInfo.Apprived}
                                    label="Apprived"
                                    onChange={(e) => setComplaintInfo({ ...complaintInfo, Apprived: e.target.value })}
                                >
                                    <MenuItem value={"Dr.G.Arivukkodi"}>Dr.G.Arivukkodi</MenuItem>
                                    <MenuItem value={"Mr.R.Vinod Kumar"}>Mr.R.Vinod Kumar</MenuItem>
                                    <MenuItem value={"Mr.B.Senthil Kumar"}>Mr.B.Senthil Kumar</MenuItem>
                                    <MenuItem value={"Ms.P.Shiela"}>Ms.P.Shiela</MenuItem>
                                    <MenuItem value={"Dr.G.Arivukkodi/Mr.Vinod Kumar"}>Dr.G.Arivukkodi/Mr.Vinod Kumar</MenuItem>
                                    <MenuItem value={"Dr.G.Arivukkodi/Mr.Vinod Kumar/Other Diviison"}>Dr.G.Arivukkodi/Mr.Vinod Kumar/Other Divison</MenuItem>                                  
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="reportApproved"
                                value={complaintInfo.reportApproved}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                id="reportApproved"
                                label="Date of Draft Report Approved by DG"                              
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="FeedbackRecived"
                                value={complaintInfo.FeedbackRecived}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                id="FeedbackRecived"
                                label="Feedback recived"                              
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="closure"
                                value={complaintInfo.closure}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                id="closure"
                                label="Final closure date"                              
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="Cost"
                                value={complaintInfo.Cost}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                id="Cost"
                                label="Project cost Rs."                              
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="Remarks"
                                value={complaintInfo.Remarks}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                id="Remarks"
                                label="Remarks"                              
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
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}


export default NewComplaintForm
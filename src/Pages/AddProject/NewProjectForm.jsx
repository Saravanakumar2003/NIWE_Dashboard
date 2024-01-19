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

const NewProjectForm = ({ currUser, myinfo, notify }) => {

    const [projectInfo, setProjectInfo] = useState({
        Status: "",
        Priority: "",
        dateofRequest: "",
        deadline: "",
        clientName: "",
        projectName: "",
        ProjectDescription: "",
        assignedTo: "",
        Deliverable: "",
        DGApprovedDate: "",
        Agreement: "",
        DraftApproved: "",
        dateSent: "",
        Prepared: "",
        Verified: "",
        Apprived: "",
        reportApproved: "",
        FeedbackRecived: "",
        closure: "",
        Cost: "",
        Remarks: "",
        ProjectType: "",
    })

    const [error, setError] = useState("")

    const handleChange = (e) => {
        setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value })
    }

    const registerProject = async () => {
        const newProject = {
            ...myinfo,
            ...projectInfo,
            issuedDate: new Date(),
        }
        try {
            await addDoc(collection(db, "niwe_project"),
                {
                    ...newProject,
                });
            setProjectInfo({
                Status: "",
                Priority: "",
                dateofRequest: "",
                deadline: "",
                clientName: "",
                projectName: "",
                ProjectDescription: "",
                assignedTo: "",
                Deliverable: "",
                DGApprovedDate: "",
                Agreement: "",
                DraftApproved: "",
                dateSent: "",
                Prepared: "",
                Verified: "",
                Apprived: "",
                reportApproved: "",
                FeedbackRecived: "",
                closure: "",
                Cost: "",
                Remarks: "",
                ProjectType: "",
            })
            notify("Project Registered", "success")

        }
        catch (error) {
            setError(error.code.substring(error.code.indexOf('/') + 1).replaceAll("-", " "))
            console.log(error)
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")

        if (projectInfo.Status === "") {
            setError("Status is required")
            return
        }
        if (projectInfo.Priority === "") {
            setError("Priority is required")
            return
        }
        if (projectInfo.dateofRequest === "") {
            setError("Date of Request is required")
            return
        }
        if (projectInfo.deadline === "") {
            setError("Deadline is required")
            return
        }
        if (projectInfo.clientName === "") {
            setError("Client Name is required")
            return
        }
        if (projectInfo.projectName === "") {
            setError("Project Name is required")
            return
        }
        if (projectInfo.ProjectDescription === "") {
            setError("Project Description is required")
            return
        }
        if (projectInfo.assignedTo === "") {
            setError("Assigned To is required")
            return
        }
        if (projectInfo.Deliverable === "") {
            setError("Deliverable is required")
            return
        }
        if (projectInfo.DGApprovedDate === "") {
            setError("DG Approved Date is required")
            return
        }
        if (projectInfo.Agreement === "") {
            setError("Service Agreement Signed is required")
            return
        }
        if (projectInfo.DraftApproved === "") {
            setError("Draft Approved date is required")
            return
        }
        if (projectInfo.dateSent === "") {
            setError("Draft Sent date is required")
            return
        }
        if (projectInfo.Prepared === "") {
            setError("Prepared By is required")
            return
        }
        if (projectInfo.Verified === "") {
            setError("Verified By is required")
            return
        }
        if (projectInfo.Apprived === "") {
            setError("Approved By is required")
            return
        }
        if (projectInfo.reportApproved === "") {
            setError("Date of Draft Report Approved by DG is required")
            return
        }
        if (projectInfo.FeedbackRecived === "") {
            setError("Feedback recived is required")
            return
        }
        if (projectInfo.closure === "") {
            setError("Final closure date is required")
            return
        }
        if (projectInfo.Cost === "") {
            setError("Project cost Rs. is required")
            return
        }
        if (projectInfo.Remarks === "") {
            setError("Remarks is required")
            return
        }
        if (projectInfo.ProjectType === "") {
            setError("Project Type is required")
            return
        }

        registerProject()
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
                                    value={projectInfo.Status}
                                    label="Status"
                                    onChange={(e) => setProjectInfo({ ...projectInfo, Status: e.target.value })}
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
                                    value={projectInfo.Priority}
                                    label="Priority"
                                    onChange={(e) => setProjectInfo({ ...projectInfo, Priority: e.target.value })}
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
                                value={projectInfo.dateofRequest}
                                required
                                fullWidth
                                type="date"
                                onChange={(e) => setProjectInfo({ ...projectInfo, dateofRequest: e.target.value })}
                                id="dateofRequest"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                label="Date of Request"
                            />
                        </Grid>
                        

                        <Grid item xs={12}>
                            <TextField
                                name="deadline"
                                value={projectInfo.deadline}
                                required
                                fullWidth
                                maxRows={6}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setProjectInfo({ ...projectInfo, deadline: e.target.value })}
                                id="deadline"
                                label="Deadline"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="clientName"
                                value={projectInfo.clientName}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                onChange={(e) => setProjectInfo({ ...projectInfo, clientName: e.target.value })}
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
                                    value={projectInfo.projectName}
                                    label="projectName"
                                    onChange={(e) => setProjectInfo({ ...projectInfo, projectName: e.target.value })}
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
                                value={projectInfo.ProjectDescription}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                onChange={(e) => setProjectInfo({ ...projectInfo, ProjectDescription: e.target.value })}
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
                                    value={projectInfo.assignedTo}
                                    label="assignedTo"
                                    onChange={(e) => setProjectInfo({ ...projectInfo, assignedTo: e.target.value })}
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
                                value={projectInfo.Deliverable}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                onChange={(e) => setProjectInfo({ ...projectInfo, Deliverable: e.target.value })}
                                id="Deliverable"
                                label="Deliverable"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="DGApprovedDate"
                                value={projectInfo.DGApprovedDate}
                                required
                                fullWidth
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                maxRows={6}
                                onChange={(e) => setProjectInfo({ ...projectInfo, DGApprovedDate: e.target.value })}
                                id="DGApprovedDate"
                                label="DG Approved Date"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="Agreement"
                                value={projectInfo.Agreement}
                                required
                                fullWidth
                                multiline
                                maxRows={6}
                                onChange={(e) => setProjectInfo({ ...projectInfo, Agreement: e.target.value })}
                                id="Agreement"
                                label="Service Agreement Signed"                              
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                name="DraftApproved"
                                value={projectInfo.DraftApproved}
                                required
                                fullWidth
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                maxRows={6}
                                onChange={(e) => setProjectInfo({ ...projectInfo, DraftApproved: e.target.value })}
                                id="DraftApproved"
                                label="Draft Approved date"
                            />
                        </Grid>
                        
                        <Grid item xs={12}>
                            <TextField
                                name="dateSent"
                                value={projectInfo.dateSent}
                                required
                                fullWidth
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setProjectInfo({ ...projectInfo, dateSent: e.target.value })}
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
                                    value={projectInfo.Prepared}
                                    label="Prepared"
                                    onChange={(e) => setProjectInfo({ ...projectInfo, Prepared: e.target.value })}
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
                                    value={projectInfo.Verified}
                                    label="Verified"
                                    onChange={(e) => setProjectInfo({ ...projectInfo, Verified: e.target.value })}
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
                                <InputLabel id="Apprived">Approved By</InputLabel>
                                <Select
                                    labelId="Apprived"
                                    id="Apprived"
                                    required
                                    value={projectInfo.Apprived}
                                    label="Apprived"
                                    onChange={(e) => setProjectInfo({ ...projectInfo, Apprived: e.target.value })}
                                >
                                    <MenuItem value={"Dr.K.Boopathi"}>Dr.K.Boopathi</MenuItem>
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
                                value={projectInfo.reportApproved}
                                required
                                fullWidth
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setProjectInfo({ ...projectInfo, reportApproved: e.target.value })}
                                maxRows={6}
                                id="reportApproved"
                                label="Date of Draft Report Approved by DG"                              
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="FeedbackRecived"
                                value={projectInfo.FeedbackRecived}
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
                                value={projectInfo.closure}
                                required
                                fullWidth
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setProjectInfo({ ...projectInfo, closure: e.target.value })}
                                maxRows={6}
                                id="closure"
                                label="Final closure date"                              
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="Cost"
                                value={projectInfo.Cost}
                                required
                                fullWidth
                                multiline
                                onChange={(e) => setProjectInfo({ ...projectInfo, Cost: e.target.value })}
                                maxRows={6}
                                id="Cost"
                                label="Project cost Rs."                              
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="Remarks"
                                value={projectInfo.Remarks}
                                required
                                fullWidth
                                multiline
                                onChange={(e) => setProjectInfo({ ...projectInfo, Remarks: e.target.value })}
                                maxRows={6}
                                id="Remarks"
                                label="Remarks"                              
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="ProjectType">Project Type</InputLabel>
                                <Select
                                    labelId="ProjectType"
                                    id="ProjectType"
                                    required
                                    value={projectInfo.ProjectType}
                                    label="ProjectType"
                                    onChange={(e) => setProjectInfo({ ...projectInfo, ProjectType: e.target.value })}
                                >
                                    <MenuItem value={"WRA Consultancy Projects"}>WRA Consultancy Projects</MenuItem>
                                    <MenuItem value={"Wind Monitoring Stations"}>Wind Monitoring Stations</MenuItem>
                                    <MenuItem value={"WMS Consultancy Projects"}>WMS Consultancy Projects</MenuItem>
                                    <MenuItem value={"MNRE Projects WMS"}>MNRE Projects WMS</MenuItem>
                                    <MenuItem value={"MNRE other Projects"}>MNRE other Projects</MenuItem>
                                    <MenuItem value={"RE Projects"}>RE Projects</MenuItem>
                                    <MenuItem value={"PMC"}>PMC</MenuItem>
                                    <MenuItem value={"SRRA"}>SRRA</MenuItem>
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
                                variant="contained"
                            >
                                Add Project
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}


export default NewProjectForm
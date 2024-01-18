import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

export default function ResponsiveDialog({ projectData, myinfo }) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton aria-label="Info" color="primary" onClick={handleClickOpen}>
                <InfoIcon />
            </IconButton>


            <Dialog
                fullScreen={fullScreen}
                fullWidth
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogContent>
                    <DialogContentText>
                        <Typography variant="subtitle2" sx={{ display: "inline" }}>Status: </Typography>
                        <Typography variant="body2" sx={{ display: "inline" }}>{projectData.Status}<br /></Typography>
                        <Typography variant="subtitle2" sx={{ display: "inline" }}>Priority: </Typography>
                        <Typography variant="body2" sx={{ display: "inline" }}>{projectData.Priority}<br /></Typography>

                        <TextField
                            id="dateofRequest"
                            label="Date of Request"
                            multiline
                            fullWidth
                            sx={{ marginY: 2, color: "red"}}
                            maxRows={6}
                            value={projectData.dateofRequest}
                            disabled
                        />

                        <TextField
                            id="deadline"
                            label="Deadline"
                            multiline
                            fullWidth
                            maxRows={6}
                            value={projectData.deadline ? projectData.deadline : ""}
                            disabled
                        />
                        <TextField
                            id="clientName"
                            label="Client Name"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.clientName}
                            disabled
                        />

                        <TextField
                            id="dateofRequest"
                            label="Date of Request"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.dateofRequest}
                            disabled
                        />
                        <TextField
                            id="ProjectDescription"
                            label="Task Description"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.ProjectDescription}
                            disabled
                        />

                        <TextField
                            id="assignedTo"
                            label="Assigned To"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.assignedTo}
                            disabled
                        />

                        <TextField
                            id="Deliverable"
                            label="Deliverable"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.Deliverable}
                            disabled
                        />

                        <TextField
                            id="DGApprovedDate"
                            label="DG Approved Date"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.DGApprovedDate}
                            disabled    
                        />

                        <TextField
                            id="Agreement"
                            label="Service Agreement Signed"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.Agreement}
                            disabled    
                        />

                        <TextField
                            id="DraftApproved"
                            label="Draft Approved date"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.DraftApproved}
                            disabled    
                        />

                        <TextField
                            id="dateSent"
                            label="Draft Sent date"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.dateSent}
                            disabled    
                        />
                        <TextField
                            id="Prepared"
                            label="Prepared By"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.Prepared}
                            disabled    
                        />  
                        <TextField
                            id="Verified"
                            label="Verified By"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.Verified}
                            disabled    
                        />  
                        <TextField
                            id="Apprived"
                            label="Approved By"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.Apprived}
                            disabled    
                        />
                        <TextField
                            id="reportApproved"
                            label="Date of Draft Report Approved by DG"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.reportApproved}
                            disabled    
                        />
                        <TextField
                            id="FeedbackRecived"
                            label="Feedback recived"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.FeedbackRecived}
                            disabled    
                        />
                        <TextField
                            id="closure"
                            label="Final closure date"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.closure}
                            disabled    
                        />
                        <TextField
                            id="Cost"
                            label="Project cost Rs."
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.Cost}
                            disabled    
                        />
                        <TextField
                            id="Remarks"
                            label="Remarks"
                            multiline
                            fullWidth
                            sx={{ marginY: 2 }}
                            maxRows={6}
                            value={projectData.Remarks}
                            disabled    
                        />

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>


        </>
    );
}

import React, { useState, useEffect } from "react"
import { db } from "../../Firebase/firebaseConfig"
import { doc, collection, query, onSnapshot, where, deleteDoc } from "firebase/firestore";
import ComplaintInfo from "./ComplaintInfo"


import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Typography, Box, Tab } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';


const MyComplaints = ({ currUser, myinfo,notify }) => {
    const [myComplaints, setMyComplaints] = useState([])
    const [filteredComplaints, setFilteredComplaints] = useState([])
    const [tabPage, setTabPage] = useState('1');

    const [pageSize, setPageSize] = useState(5);

    const handleChangeTabPage = (event, newValue) => {
        setTabPage(newValue);
    };

    useEffect(() => {
        if (!myinfo || !myinfo.uid)
            return
        const q = query(collection(db, "niwe_complaint"), where("uid", "==", myinfo.uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const appointments = []
            querySnapshot.forEach((doc) => {
                const data = { ...doc.data(), key: doc.id, issuedDate: doc.data().issuedDate.toDate() }
                appointments.push(data)
            });
            setMyComplaints(appointments)
        });

        return (() => {
            unsubscribe()
        })
    }, [myinfo])

    useEffect(() => {
        let index = 1
        const tempArr = myComplaints.reduce((result, data) => {
            switch (tabPage) {
                case "2":
                    if (data.complaintStatus !== "approved")
                        return result
                    break
                case "3":
                    if (data.complaintStatus !== "pending")
                        return result
                    break
                case "4":
                    if (data.complaintStatus !== "declined")
                        return result
                    break
                default:
                    break
            }
            result.push({ ...data, id: index })
            index = index + 1
            return result
        }, [])
        
        setFilteredComplaints(tempArr)
    }, [myComplaints, tabPage])


    const deleteData = async (data) => {
        await deleteDoc(doc(db, `niwe_complaint`, data.key));
        notify("Complaint Deleted", "success")
    }

    const columns = [
        { field: 'id', headerName: 'Sr No.', type: "number", width: 60 },
        { field: 'scheduleDate', headerName: 'Date', valueGetter: (params) => params.row.issuedDate && new Date(params.row.issuedDate).toLocaleDateString(), },
        { field: 'issuedDate', headerName: 'Time', valueGetter: ({ value }) => value && new Date(value).toLocaleTimeString(), },
        { field: 'Status', headerName: 'Status', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'Priority', headerName: 'Priority', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'dateofRequest', headerName: 'Date of Request', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'deadline', headerName: 'Deadline', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'clientName', headerName: 'Client Name', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'projectName', headerName: 'Project Name', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'ProjectDescription', headerName: 'Task Description', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'assignedTo', headerName: 'Assigned To', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'Deliverable', headerName: 'Deliverable', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'DGApprovedDate', headerName: 'DG Approved Date', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'Agreement', headerName: 'Service Agreement Signed', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'DraftApproved', headerName: 'Draft Approved Date', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'dateSent', headerName: 'Draft Sent date', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'Prepared', headerName: 'Prepared By', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'Verified', headerName: 'Verified By', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'Apprived', headerName: 'Apprived By', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'reportApproved', headerName: 'Date of Draft Report Approved by DG', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'FeedbackRecived', headerName: 'Feedback Recieved', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'closure', headerName: 'Final closure date', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
        { field: 'Remarks', headerName: 'Remarks', flex: 1, minWidth: 200, renderCell: renderCellExpand, sortable: false },
    
        {
            field: 'Info',
            headerName: 'Info',
            width: 80,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <ComplaintInfo complaintData={params.row} myinfo={myinfo} />
                    </>
                )

            },
        },
        {
            field: 'Delete',
            headerName: 'Delete',
            width: 80,
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <IconButton aria-label="delete" color="error" onClick={() => deleteData(params.row)}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                )

            },
        },



    ];




    return (

        <>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Typography variant="h3" sx={{ textAlign: "center", wordBreak: "break-word" }} gutterBottom>
                        My Projects
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={tabPage}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList
                                    onChange={handleChangeTabPage}
                                    variant="scrollable"
                                    aria-label="lab API tabs example">
                                    <Tab label="All" value="1" />
                                    <Tab label="Resolved" value="2" />
                                    <Tab label="Pending" value="3" />
                                    <Tab label="Declined" value="4" />
                                </TabList>
                            </Box>
                        </TabContext>
                    </Box>

                    <DataGrid
                        rows={filteredComplaints}
                        columns={columns}
                        pageSize={pageSize}
                        onPageSizeChange={(newPage) => setPageSize(newPage)}
                        rowsPerPageOptions={[5, 10, 20, 50]}
                        disableSelectionOnClick
                        disableColumnMenu
                        disableColumnFilter
                        disableColumnSelector
                        disableDensitySelector
                        autoHeight
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        componentsProps={{
                            toolbar: { showQuickFilter: true },
                        }}
                    />

                </Grid>
            </Grid>


        </>
    )
}

export default MyComplaints





// For overflown visibility
function isOverflown(element) {
    return (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
    );
}

const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);

    const handleMouseEnter = () => {
        const isCurrentlyOverflown = isOverflown(cellValue.current);
        setShowPopper(isCurrentlyOverflown);
        setAnchorEl(cellDiv.current);
        setShowFullCell(true);
    };

    const handleMouseLeave = () => {
        setShowFullCell(false);
    };

    React.useEffect(() => {
        if (!showFullCell) {
            return undefined;
        }

        function handleKeyDown(nativeEvent) {
            // IE11, Edge (prior to using Bink?) use 'Esc'
            if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
                setShowFullCell(false);
            }
        }

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowFullCell, showFullCell]);

    return (
        <Box
            ref={wrapper}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
                alignItems: 'center',
                lineHeight: '24px',
                width: 1,
                height: 1,
                position: 'relative',
                display: 'flex',
            }}
        >
            <Box
                ref={cellDiv}
                sx={{
                    height: 1,
                    width,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            <Box
                ref={cellValue}
                sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
                {value}
            </Box>
            {showPopper && (
                <Popper
                    open={showFullCell && anchorEl !== null}
                    anchorEl={anchorEl}
                    style={{ width: "auto", maxWidth: "80vw", marginLeft: -17 }}
                >
                    <Paper
                        elevation={5}
                        style={{ minHeight: wrapper.current.offsetHeight - 3 }}
                    >
                        <Typography variant="body2" style={{ padding: 8 }}>
                            {value}
                        </Typography>
                    </Paper>
                </Popper>
            )}
        </Box>
    );
});

GridCellExpand.propTypes = {
    value: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
};

function renderCellExpand(params) {
    return (
        <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
    );
}

renderCellExpand.propTypes = {
    /**
     * The column of the row that the current cell belongs to.
     */
    colDef: PropTypes.object.isRequired,
    /**
     * The cell value, but if the column has valueGetter, use getValue.
     */
    value: PropTypes.string.isRequired,
};
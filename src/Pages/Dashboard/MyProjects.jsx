import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/firebaseConfig";
import {
  doc,
  collection,
  query,
  onSnapshot,
  where,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import ProjectInfo from "./ProjectInfo";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconButton, Box, Typography, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { TabContext, TabList } from "@mui/lab";
import Tab from "@mui/material/Tab";


const MyProjects = ({ currUser, myinfo, notify }) => {
  const [myProjects, setMyProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [tabPage, setTabPage] = useState("1");
  const [editedProject, setEditedProject] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const editableFields = [
    "Status",
    "Priority",
    "dateofRequest",
    "deadline",
    "clientName",
    "projectName",
    "ProjectDescription",
    "assignedTo",
    "Deliverable",
    "DGApprovedDate",
    "Agreement",
    "DraftApproved",
    "dateSent",
    "Prepared",
    "Verified",
    "Apprived",
    "reportApproved",
    "FeedbackRecived",
    "closure",
    "Remarks",
  ];


  useEffect(() => {
    if (!myinfo || !myinfo.uid) return;
    const q = query(
      collection(db, "niwe_project"),
      where("uid", "==", myinfo.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointments = [];
      querySnapshot.forEach((doc) => {
        const data = {
          ...doc.data(),
          key: doc.id,
          issuedDate: doc.data().issuedDate.toDate(),
        };
        appointments.push(data);
      });
      setMyProjects(appointments);
    });

    return () => {
      unsubscribe();
    };
  }, [myinfo]);

  useEffect(() => {
    let index = 1;
    const tempArr = myProjects.reduce((result, data) => {
      switch (tabPage) {
        case "1":
          break;
        case "2":
          if (data.ProjectType !== "WRA Consultancy Projects") return result;
          break;
        case "3":
          if (data.ProjectType !== "WRA Consultancy Projects") return result;
          break;
        case "4":
          if (data.ProjectType !== "WRA Consultancy Projects") return result;
          break;
        case "5":
          if (data.ProjectType !== "MNRE Projects WMS") return result;
          break;
        case "6":
          if (data.ProjectType !== "MNRE other Projects") return result;
          break;
        case "7":
          if (data.ProjectType !== "RE Projects") return result;
          break;
        case "8":
          if (data.ProjectType !== "PMC") return result;
          break;
        case "9":
          if (data.ProjectType !== "SRRA") return result;
          break;
        default:
          break;
      }
      result.push({ ...data, id: index });
      index = index + 1;
      return result;
    }, []);

    setFilteredProjects(tempArr);
  }, [myProjects, tabPage]);

  const deleteData = async (data) => {
    await deleteDoc(doc(db, `niwe_project`, data.key));
    notify("Project Deleted", "success");
  };

  const handleEditClick = (project) => {
    setEditedProject(project);
    setIsEditing(true);
  };

  const handleChangeTabPage = (event, newValue) => {
    setTabPage(newValue);
  };

  const handleSave = async () => {
    if (!editedProject) return;

    try {
      const projectRef = doc(db, "niwe_project", editedProject.key);
      await updateDoc(projectRef, editedProject);
      notify("Project Updated", "success");
      setIsEditing(false);
      setEditedProject(null);
    } catch (error) {
      console.error("Error updating project:", error);
      notify("Error updating project", "error");
    }
  };

  const handleFieldChange = (field, value) => {
    setEditedProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "Sr No.", type: "number", width: 50},
    {
      field: "Info",
      headerName: "Info",
      width: 30,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <ProjectInfo
              projectData={params.row}
              myinfo={myinfo}
            />
          </>
        );
      },
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "Priority",
      headerName: "Priority",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "dateofRequest",
      headerName: "Date of Request",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "deadline",
      headerName: "Deadline",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "clientName",
      headerName: "Client Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "ProjectDescription",
      headerName: "Task Description",
      flex: 1,
      minWidth: 600,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "assignedTo",
      headerName: "Assigned To",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "Deliverable",
      headerName: "Deliverable",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "DGApprovedDate",
      headerName: "DG Approved Date",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "Agreement",
      headerName: "Service Agreement Signed",
      flex: 1,
      minWidth: 50,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "DraftApproved",
      headerName: "Draft Approved Date",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "dateSent",
      headerName: "Draft Sent date",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "Prepared",
      headerName: "Prepared By",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "Verified",
      headerName: "Verified By",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "Apprived",
      headerName: "Apprived By",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "reportApproved",
      headerName: "Date of Draft Report Approved by DG",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "FeedbackRecived",
      headerName: "Feedback Recieved",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "closure",
      headerName: "Final closure date",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
      Divider: true,
    },
    {
      field: "Remarks",
      headerName: "Remarks",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => <RenderCellExpand value={params.value} />,
      sortable: false,
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 80,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => deleteData(params.row)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          aria-label="edit"
          onClick={() => handleEditClick(params.row)}
        >
          <EditIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            sx={{ textAlign: "center", wordBreak: "break-word" }}
            gutterBottom
          >
            My Projects
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", wordBreak: "break-word" }}
            gutterBottom
          >
            Total Projects: {filteredProjects.length}
          </Typography>


          <Grid item xs={12}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={tabPage}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChangeTabPage}
                    variant="scrollable"
                    aria-label="lab API tabs example">
                    <Tab label="All" value="1" />
                    <Tab label="WRA Consultancy Projects" value="2" />
                    <Tab label="Wind Monitoring Stations" value="3" />
                    <Tab label="WMS Consultancy Projects" value="4" />
                    <Tab label="MNRE Projects WMS" value="5" />
                    <Tab label="MNRE other Projects" value="6" />
                    <Tab label="RE Projects" value="7" />
                    <Tab label="PMC" value="8" />
                    <Tab label="SRRA" value="9" />
                  </TabList>
                </Box>
              </TabContext>
            </Box>
          </Grid>
          <DataGrid
            rows={filteredProjects}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPage) => setPageSize(newPage)}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            autoHeight
            rowHeight={200}
            disableDensitySelector
            components={{
              Toolbar: GridToolbar,
            }}
            
            componentsProps={{
              toolbar: { showQuickFilter: true },
            }}
          />

          {/* Edit Project Modal */}
          <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogContent>
              {editedProject &&
                editableFields.map((field) => (
                  <TextField
                    key={field}
                    label={
                      field === "Status"
                        ? "Status"
                        : field === "Priority"
                          ? "Priority"
                          : field === "dateofRequest"
                            ? "Date of Request"
                            : field === "deadline"
                              ? "Deadline"
                              : field === "clientName"
                                ? "Client Name"
                                : field === "projectName"
                                  ? "Project Name"
                                  : field === "ProjectDescription"
                                    ? "Task Description"
                                    : field === "assignedTo"
                                      ? "Assigned To"
                                      : field === "Deliverable"
                                        ? "Deliverable"
                                        : field === "DGApprovedDate"
                                          ? "DG Approved Date"
                                          : field === "Agreement"
                                            ? "Service Agreement Signed"
                                            : field === "DraftApproved"
                                              ? "Draft Approved Date"
                                              : field === "dateSent"
                                                ? "Draft Sent date"
                                                : field === "Prepared"
                                                  ? "Prepared By"
                                                  : field === "Verified"
                                                    ? "Verified By"
                                                    : field === "Apprived"
                                                      ? "Apprived By"
                                                      : field === "reportApproved"
                                                        ? "Date of Draft Report Approved by DG"
                                                        : field === "FeedbackRecived"
                                                          ? "Feedback Recieved"
                                                          : field === "closure"
                                                            ? "Final closure date"
                                                            : field === "Remarks"
                                                              ? "Remarks"
                                                              : ""
                    }
                    value={editedProject[field]}
                    onChange={(e) => handleFieldChange(field, e.target.value)}
                    fullWidth
                    multiline
                    sx={{ marginY: 2 }}
                    maxRows={6}
                  />
                ))}
            </DialogContent>
            <DialogActions>
              <button style={
                {
                  backgroundColor: "#f44336",
                  color: "white",
                  padding: "10px 24px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  float: "right"
                }
              } onClick={() => setIsEditing(false)}>Cancel</button>
              <button style={
                {
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "10px 24px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  float: "right"
                }
              } onClick={handleSave}>Save</button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};

const RenderCellExpand = (props) => {
  return (
    <Box
      sx={{
        width: 600,
        maxHeight: 200, 
        overflow: 'auto', 
        textOverflow: "ellipsis",
        whiteSpace: "pre-line", 
        display: "block",
        wordBreak: "break-word",
        padding: 1,
        '& .MuiTypography-root': {
          fontSize: '0.8rem',
          textAlign: 'justify', 
        },
      }}
    >
      <Typography>{props.value}</Typography>
    </Box>
  );
};

export default MyProjects;

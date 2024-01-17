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
import ComplaintInfo from "./ComplaintInfo";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { IconButton, Box, Typography, Grid } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

const MyComplaints = ({ currUser, myinfo, notify }) => {
  const [myComplaints, setMyComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [tabPage] = useState("1");
  const [editedComplaint, setEditedComplaint] = useState(null);
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
      collection(db, "niwe_complaint"),
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
      setMyComplaints(appointments);
    });

    return () => {
      unsubscribe();
    };
  }, [myinfo]);

  useEffect(() => {
    let index = 1;
    const tempArr = myComplaints.reduce((result, data) => {
      switch (tabPage) {
        case "2":
          if (data.complaintStatus !== "approved") return result;
          break;
        case "3":
          if (data.complaintStatus !== "pending") return result;
          break;
        case "4":
          if (data.complaintStatus !== "declined") return result;
          break;
        default:
          break;
      }
      result.push({ ...data, id: index });
      index = index + 1;
      return result;
    }, []);

    setFilteredComplaints(tempArr);
  }, [myComplaints, tabPage]);

  const deleteData = async (data) => {
    await deleteDoc(doc(db, `niwe_complaint`, data.key));
    notify("Complaint Deleted", "success");
  };

  const handleEditClick = (complaint) => {
    setEditedComplaint(complaint);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!editedComplaint) return;

    try {
      const complaintRef = doc(db, "niwe_complaint", editedComplaint.key);
      await updateDoc(complaintRef, editedComplaint);
      notify("Project Updated", "success");
      setIsEditing(false);
      setEditedComplaint(null);
    } catch (error) {
      console.error("Error updating project:", error);
      notify("Error updating project", "error");
    }
  };

  const handleFieldChange = (field, value) => {
    setEditedComplaint((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "Sr No.", type: "number", width: 60 },
    {
        field: "Info",
        headerName: "Info",
        width: 80,
        sortable: false,
        renderCell: (params) => {
          return (
            <>
              <ComplaintInfo complaintData={params.row} myinfo={myinfo} />
            </>
          );
        },
      },
    {
      field: "scheduleDate",
      headerName: "Date",
      valueGetter: (params) =>
        params.row.issuedDate &&
        new Date(params.row.issuedDate).toLocaleDateString(),
    },
    {
      field: "issuedDate",
      headerName: "Time",
      valueGetter: ({ value }) => value && new Date(value).toLocaleTimeString(),
    },
    {
      field: "Status",
      headerName: "Status",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "Priority",
      headerName: "Priority",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "dateofRequest",
      headerName: "Date of Request",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "deadline",
      headerName: "Deadline",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "clientName",
      headerName: "Client Name",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "projectName",
      headerName: "Project Name",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "ProjectDescription",
      headerName: "Task Description",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "assignedTo",
      headerName: "Assigned To",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "Deliverable",
      headerName: "Deliverable",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "DGApprovedDate",
      headerName: "DG Approved Date",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "Agreement",
      headerName: "Service Agreement Signed",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "DraftApproved",
      headerName: "Draft Approved Date",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "dateSent",
      headerName: "Draft Sent date",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "Prepared",
      headerName: "Prepared By",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "Verified",
      headerName: "Verified By",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "Apprived",
      headerName: "Apprived By",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "reportApproved",
      headerName: "Date of Draft Report Approved by DG",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "FeedbackRecived",
      headerName: "Feedback Recieved",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "closure",
      headerName: "Final closure date",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
      sortable: false,
    },
    {
      field: "Remarks",
      headerName: "Remarks",
      flex: 1,
      minWidth: 200,
      renderCell: renderCellExpand,
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
            Total Projects: {filteredComplaints.length}
          </Typography>

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

          {/* Edit Complaint Modal */}
          <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
            <DialogTitle>Edit Complaint</DialogTitle>
            <DialogContent>
              {editedComplaint &&
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
                    value={editedComplaint[field]}
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

const renderCellExpand = (params) => {
  return (
    <Box sx={{ maxWidth: 300 }}>
      <Typography noWrap>{params.value}</Typography>
    </Box>
  );
};

export default MyComplaints;

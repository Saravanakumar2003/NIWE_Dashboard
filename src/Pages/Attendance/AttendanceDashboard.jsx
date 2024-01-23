import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/firebaseConfig";
import {
  doc,
  collection,
  query,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
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


const AttendanceDashboard = ({ currUser, myinfo, notify }) => {
const[ attendanceList, setattendanceList ] = useState([]);
const[ filteredAttendance, setFilteredAttendance ] = useState([]);
  const [tabPage, setTabPage] = useState("1");
  const [editedAttendance, setEditedAttendance] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const editableFields = [
    "employeeName",
    "date",
    "attendance",
  ];

  useEffect(() => {
    const q = query(collection(db, "niwe_attendance"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const appointments = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (data && data.issuedDate) {
                const newData = {
                    ...data,
                    key: doc.id,
                    issuedDate: data.issuedDate.toDate(),
                };
                appointments.push(newData);
            }
        });
        setattendanceList(appointments);
    });

    return () => {
        unsubscribe();
    }
}, []);


  useEffect(() => {
    let index = 1;
    const tempArr = attendanceList.reduce((result, data) => {
      switch (tabPage) {
        case "1":
            break;
        case "2":
            if (data.attendance !== "Present") return result;
            break;
        case "3":
            if (data.attendance !== "Absent") return result;
            break;
        default:
          break;
      }
      result.push({ ...data, id: index });
      index = index + 1;
      return result;
    }, []);

    setFilteredAttendance(tempArr);
  }, [attendanceList, tabPage]);

  const deleteData = async (data) => {
    await deleteDoc(doc(db, `niwe_attendance`, data.key));
    notify("Attendance Deleted", "success");
  };

  const handleEditClick = (Attendance) => {
    setEditedAttendance(Attendance);
    setIsEditing(true);
  };

  const handleChangeTabPage = (event, newValue) => {
    setTabPage(newValue);
  };

  const handleSave = async () => {
    if (!editedAttendance) return;

    try {
      const todoRef = doc(db, "niwe_attendance", editedAttendance.key);
      await updateDoc(todoRef, editedAttendance);
      notify("Todo Updated", "success");
      setIsEditing(false);
      setEditedAttendance(null);
    } catch (error) {
      console.error("Error updating Attendance:", error);
      notify("Error updating Attendance", "error");
    }
  };

  const handleFieldChange = (field, value) => {
    setEditedAttendance((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "Sr No.", type: "number", width: 60, },
    {
      field: "employeeName",
      headerName: "Employee Name",
      width: 200,
      sortable: false,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      sortable: false,
    },
    {
      field: "attendance",
      headerName: "Attendance",
      width: 200,
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
            Attendance Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", wordBreak: "break-word" }}
            gutterBottom
          >
            Total People: {filteredAttendance.length}
          </Typography>
        
          {/*No of people present and absent*/}

          <Typography
            variant="h5"
            sx={{ textAlign: "center", wordBreak: "break-word" }}
            gutterBottom
          >
            Present: {filteredAttendance.filter((data) => data.attendance === "Present").length}
          </Typography>

          <Typography
            variant="h5"
            sx={{ textAlign: "center", wordBreak: "break-word" }}
            gutterBottom
          >
            Absent: {filteredAttendance.filter((data) => data.attendance === "Absent").length}
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
                    <Tab label="Present" value="2" />
                    <Tab label="Absent" value="3" />
                  </TabList>
                </Box>
              </TabContext>
            </Box>
          </Grid>
          <DataGrid
            rows={filteredAttendance}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPage) => setPageSize(newPage)}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            disableDensitySelector
            autoHeight
            rowHeight={100}
            components={{
              Toolbar: GridToolbar,
            }}
            componentsProps={{
              toolbar: { showQuickFilter: true },
            }}
          />

          {/* Edit Project Modal */}
          <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogContent>
              {editedAttendance &&
                editableFields.map((field) => (
                  <TextField
                    key={field}
                    label={
                        field.charAt(0).toUpperCase() + field.slice(1).toLowerCase()
                    }
                    value={editedAttendance[field]}
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


export default AttendanceDashboard


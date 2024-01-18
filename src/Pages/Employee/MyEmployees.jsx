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


const MyEmployee = ({ currUser, myinfo, notify }) => {
  const [myEmployee, setMyEmployee] = useState([]);
  const [filteredEmployee, setFilteredEmployee] = useState([]);
  const [tabPage, setTabPage] = useState("1");
  const [editedEmployee, setEditedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const editableFields = [
    "name",
    "email",
    "phone",
    "gender",
    "jobTitle",
    "department",
  ];

  useEffect(() => {
    if (!myinfo || !myinfo.uid) return;
    const q = query(
      collection(db, "niwe_employee"),
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
      setMyEmployee(appointments);
    });

    return () => {
      unsubscribe();
    };
  }, [myinfo]);

  useEffect(() => {
    let index = 1;
    const tempArr = myEmployee.reduce((result, data) => {
      switch (tabPage) {
        default:
          break;
      }
      result.push({ ...data, id: index });
      index = index + 1;
      return result;
    }, []);

    setFilteredEmployee(tempArr);
  }, [myEmployee, tabPage]);

  const deleteData = async (data) => {
    await deleteDoc(doc(db, `niwe_employee`, data.key));
    notify("Employee Deleted", "success");
  };

  const handleEditClick = (employee) => {
    setEditedEmployee(employee);
    setIsEditing(true);
  };

  const handleChangeTabPage = (event, newValue) => {
    setTabPage(newValue);
  };

  const handleSave = async () => {
    if (!editedEmployee) return;

    try {
      const employeeRef = doc(db, "niwe_employee", editedEmployee.key);
      await updateDoc(employeeRef, editedEmployee);
      notify("Employee Updated", "success");
      setIsEditing(false);
      setEditedEmployee(null);
    } catch (error) {
      console.error("Error updating employee:", error);
      notify("Error updating employee", "error");
    }
  };

  const handleFieldChange = (field, value) => {
    setEditedEmployee((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "Sr No.", type: "number", width: 60 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 350 },
    { field: "phone", headerName: "Phone", width: 150},
    { field: "gender", headerName: "Gender", width: 150},
    { field: "jobTitle", headerName: "Job Title", width: 150},
    { field: "department", headerName: "Department", width: 150},
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
            My Employee
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", wordBreak: "break-word" }}
            gutterBottom
          >
            Total Employee: {filteredEmployee.length}
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
                                </TabList>
                            </Box>
                        </TabContext>
                    </Box>
                </Grid>
          <DataGrid
            rows={filteredEmployee}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPage) => setPageSize(newPage)}
            rowsPerPageOptions={[5, 10, 20, 50]}

            disableSelectionOnClick
            disableColumnMenu
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

          {/* Edit Project Modal */}
          <Dialog open={isEditing} onClose={() => setIsEditing(false)}>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogContent>
              {editedEmployee &&
                editableFields.map((field) => (
                  <TextField
                    key={field}
                    label={
                        field.charAt(0).toUpperCase() + field.slice(1).toLowerCase()
                    }
                    value={editedEmployee[field]}
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

export default MyEmployee;

// Path: src/Pages/Employee/NewEmployeeForm.jsx

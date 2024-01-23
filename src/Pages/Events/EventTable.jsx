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


const EventTable = ({ currUser, myinfo, notify }) => {
const[ eventList, seteventList ] = useState([]);
const[ filteredEvent, setFilteredEvent ] = useState([]);
  const [tabPage, setTabPage] = useState("1");
  const [editedEvent, setEditedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const editableFields = [
    "name",
    "date",
    "description",
    "status",
    "type",
  ];

  useEffect(() => {
    const q = query(
      collection(db, "niwe_events"),
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
      seteventList(appointments);
    });

    return () => {
        unsubscribe();
        }
    }, []);


  useEffect(() => {
    let index = 1;
    const tempArr = eventList.reduce((result, data) => {
      switch (tabPage) {
        case "1":
            break;
        case "2":
            if (data.type !== "Seminar") return result;
            break;
        case "3":
            if (data.type !== "Meeting") return result;
            break;
        case "4":
            if (data.type !== "Workshop") return result;
            break;
        case "5":
            if (data.type !== "Webinar") return result;
            break;
        case "6":
            if (data.type !== "Conference") return result;
            break;
        case "7":
            if (data.type !== "Training") return result;
            break;
        case "8":
            if (data.type !== "Other") return result;
            break;
        default:
          break;
      }
      result.push({ ...data, id: index });
      index = index + 1;
      return result;
    }, []);

    setFilteredEvent(tempArr);
  }, [eventList, tabPage]);

  const deleteData = async (data) => {
    await deleteDoc(doc(db, `niwe_events`, data.key));
    notify("Event Deleted", "success");
  };

  const handleEditClick = (todo) => {
    setEditedEvent(todo);
    setIsEditing(true);
  };

  const handleChangeTabPage = (event, newValue) => {
    setTabPage(newValue);
  };

  const handleSave = async () => {
    if (!editedEvent) return;

    try {
      const todoRef = doc(db, "niwe_events", editedEvent.key);
      await updateDoc(todoRef, editedEvent);
      notify("Event Updated", "success");
      setIsEditing(false);
      setEditedEvent(null);
    } catch (error) {
      console.error("Error updating Event:", error);
      notify("Error updating Event", "error");
    }
  };

  const handleFieldChange = (field, value) => {
    setEditedEvent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "Sr No.", type: "number", width: 60 },
    { field: "name", headerName: "Event Name", width: 300 },
    {field: "date", headerName: "Event Date", width: 150},
    {field: "description", headerName: "Event Description", width: 500},
    {field: "status", headerName: "Event Status", width: 200},
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
            My Event
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", wordBreak: "break-word" }}
            gutterBottom
          >
            Total Event: {filteredEvent.length}
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
                    <Tab label="Seminar" value="2" />
                    <Tab label="Meeting" value="3" />
                    <Tab label="Workshop" value="4" />
                    <Tab label="Webinar" value="5" />
                    <Tab label="Conference" value="6" />
                    <Tab label="Training" value="7" />
                    <Tab label="Other" value="8" />
                  </TabList>
                </Box>
              </TabContext>
            </Box>
          </Grid>
          <DataGrid
            rows={filteredEvent}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPage) => setPageSize(newPage)}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
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
            <DialogTitle>Edit Event</DialogTitle>
            <DialogContent>
              {editedEvent &&
                editableFields.map((field) => (
                  <TextField
                    key={field}
                    label={
                        field.charAt(0).toUpperCase() + field.slice(1).toLowerCase()
                    }
                    value={editedEvent[field]}
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

export default EventTable


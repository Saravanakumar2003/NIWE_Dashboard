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


const TodoTable = ({ currUser, myinfo, notify }) => {
const[ todoList, settodoList ] = useState([]);
const[ filteredTodo, setFilteredTodo ] = useState([]);
  const [tabPage, setTabPage] = useState("1");
  const [editedTodo, setEditedTodo] = useState(null);
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
      collection(db, "niwe_todo"),
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
      settodoList(appointments);
    });

    return () => {
        unsubscribe();
        }
    }, []);


  useEffect(() => {
    let index = 1;
    const tempArr = todoList.reduce((result, data) => {
      switch (tabPage) {
        case "1":
            break;
        case "2":
            if (data.type !== "Todo") return result;
            break;
        case "3":
            if (data.type !== "Daily Activities") return result;
            break;
        default:
          break;
      }
      result.push({ ...data, id: index });
      index = index + 1;
      return result;
    }, []);

    setFilteredTodo(tempArr);
  }, [todoList, tabPage]);

  const deleteData = async (data) => {
    await deleteDoc(doc(db, `niwe_todo`, data.key));
    notify("Todo Deleted", "success");
  };

  const handleEditClick = (todo) => {
    setEditedTodo(todo);
    setIsEditing(true);
  };

  const handleChangeTabPage = (event, newValue) => {
    setTabPage(newValue);
  };

  const handleSave = async () => {
    if (!editedTodo) return;

    try {
      const todoRef = doc(db, "niwe_todo", editedTodo.key);
      await updateDoc(todoRef, editedTodo);
      notify("Todo Updated", "success");
      setIsEditing(false);
      setEditedTodo(null);
    } catch (error) {
      console.error("Error updating employee:", error);
      notify("Error updating employee", "error");
    }
  };

  const handleFieldChange = (field, value) => {
    setEditedTodo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const columns = [
    { field: "id", headerName: "Sr No.", type: "number", width: 60, },
    { field: "name", headerName: "Todo Name", width: 300 },
    {field: "date", headerName: "Date", width: 150},
    {field: "description", headerName: "Description", width: 500, renderCell: (params) => <RenderCellExpand value={params.value} />},
    {field: "status", headerName: "Status", width: 200},
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
            My Todo tasks
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", wordBreak: "break-word" }}
            gutterBottom
          >
            Total Tasks: {filteredTodo.length}
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
                    <Tab label="Todo" value="2" />
                    <Tab label="Daily Activities" value="3" />
                  </TabList>
                </Box>
              </TabContext>
            </Box>
          </Grid>
          <DataGrid
            rows={filteredTodo}
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
              {editedTodo &&
                editableFields.map((field) => (
                  <TextField
                    key={field}
                    label={
                        field.charAt(0).toUpperCase() + field.slice(1).toLowerCase()
                    }
                    value={editedTodo[field]}
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

export default TodoTable


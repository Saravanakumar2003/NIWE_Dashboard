import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { GridToolbar } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const AttendanceDashboard = ({ notify }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "niwe_attendance"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setAttendanceData(data);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [setError] = useState("");

  const deleteData = async (data) => {
    try {
      await deleteDoc(doc(db, "niwe_attendance", data.id));
      notify("Attendance Deleted Successfully", "success");
    } catch (error) {
      setError(error.code.substring(error.code.indexOf("/") + 1).replaceAll("-", " "));
      console.error(error);
    }
  };

  const columns = [
    //serial number
    
    //employee name
    { field: "employeeName", headerName: "Employee Name", width: 200 },
    // Add more columns for date, timeIn, timeOut, etc.
    { field: "date", headerName: "Date", width: 200 },
    { field: "attendance", headerName: "Attendance", width: 200 },

    //action
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
  ];

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h3" sx={{ textAlign: "center", wordBreak: "break-word" }} gutterBottom>
        Attendance Dashboard
      </Typography>

      <DataGrid
        rows={attendanceData}
        columns={columns}
        pageSize={5}
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
    </Box>
  );
};

export default AttendanceDashboard

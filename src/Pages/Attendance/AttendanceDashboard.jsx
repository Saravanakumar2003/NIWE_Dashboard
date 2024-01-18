import React, { useState, useEffect } from "react";
import { db } from "../../Firebase/firebaseConfig";
import { collection, query, onSnapshot } from "firebase/firestore";
import { Box, Typography } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import { Bar } from "react-chartjs-2";
import { DataGrid } from "@mui/x-data-grid";

const AttendanceDashboard = ({ notify }) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [employeeAttendanceCount, setEmployeeAttendanceCount] = useState({});
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const q = query(collection(db, "niwe_attendance"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      const attendanceCount = {};

      querySnapshot.forEach((doc) => {
        const { employeeName } = doc.data();
        data.push({ ...doc.data(), id: doc.id });

        // Count attendance entries per employee
        if (attendanceCount[employeeName]) {
          attendanceCount[employeeName]++;
        } else {
          attendanceCount[employeeName] = 1;
        }
      });

      setAttendanceData(data);
      setEmployeeAttendanceCount(attendanceCount);

      // Prepare data for the bar chart
      setChartData({
        labels: Object.keys(attendanceCount),
        datasets: [
          {
            label: "Attendance Count",
            data: Object.values(attendanceCount),
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 1,
          },
        ],
      });
    });

    return () => {
      unsubscribe();
    };
  }, [
    setAttendanceData,
    setEmployeeAttendanceCount,
    employeeAttendanceCount,
    setChartData,
    notify,
  ]);

  const columns = [
    { field: "id", headerName: "ID", type: "number", width: 100 },
    { field: "employeeName", headerName: "Employee Name", width: 200 },
    // Add more columns for date, timeIn, timeOut, etc.
    { field: "markedDate", headerName: "Marked Date", width: 200 },
  ];

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h3" sx={{ textAlign: "center", wordBreak: "break-word" }} gutterBottom>
        Attendance Dashboard
      </Typography>

      {/* DataGrid for attendance details */}
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

      {/* Bar Chart for attendance count */}
      <Typography variant="h5" sx={{ mt: 3, textAlign: "center" }}>
        Attendance Count per Employee
      </Typography>
      <Box sx={{ maxWidth: 600, mx: "auto", mt: 2 }}>
        <Bar data={chartData} options={{ maintainAspectRatio: false }} />
      </Box>
    </Box>
  );
};

export default AttendanceDashboard

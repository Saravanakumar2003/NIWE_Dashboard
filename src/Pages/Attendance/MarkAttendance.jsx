import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";
import { Button, Box, Typography, Alert, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const MarkAttendance = ({ notify, myinfo }) => {
  const [attendanceInfo, setAttendanceInfo] = useState({
    employeeName: "",
    date: "",
    attendance: "",
  });

  const [error, setError] = useState("");
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "niwe_employee"), (querySnapshot) => {
      const employees = [];
      querySnapshot.forEach((doc) => {
        const { name, email, phone, gender, jobTitle, department } = doc.data();
        employees.push({ id: doc.id, name, email, phone, gender, jobTitle, department });
      });
      setEmployeeList(employees);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleChange = (e) => {
    setAttendanceInfo({ ...attendanceInfo, [e.target.name]: e.target.value });
  };

  const markAttendance = async () => {
    const newAttendance = {
      ...myinfo,
      ...attendanceInfo,
      issuedDate: new Date(),

    };
    try {
      await addDoc(collection(db, "niwe_attendance"),
        {
          ...newAttendance,
        });
      setAttendanceInfo({
        employeeName: "",
        date: "",
        attendance: "",
      });
      notify("Attendance Marked Successfully", "success");
    } catch (error) {
      setError(error.code.substring(error.code.indexOf("/") + 1).replaceAll("-", " "));
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    markAttendance();
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} onChange={handleChange} sx={{ my: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" sx={{ textAlign: "center", wordBreak: "break-word" }} gutterBottom>
            Mark Attendance
          </Typography>
        </Grid>

        <Grid container spacing={2} item xs={12} lg={6} sx={{ mt: { xs: 5, lg: "auto" }, mb: "auto", mx: "auto" }}>

          <Grid item xs={12}>
            {/* Employee Name Dropdown */}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel htmlFor="employeeName">Employee Name</InputLabel>
              <Select
                value={attendanceInfo.employeeName}
                onChange={(e) => setAttendanceInfo({ ...attendanceInfo, employeeName: e.target.value })}
                label="Employee Name"
                fullWidth
                inputProps={{ name: "employeeName", id: "employeeName" }}
              >
                {employeeList.map((employee) => (
                  <MenuItem key={employee.id} value={employee.name}>
                    {employee.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            {/* Date */}
            <TextField
              id="date"
              label="Date"
              type="date"
              fullWidth
              sx={{ mt: 2 }}
              value={attendanceInfo.date}
              onChange={(e) => setAttendanceInfo({ ...attendanceInfo, date: e.target.value })}
              name="date"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          <Grid item xs={12}>
            {/* Attendance Dropdown */}
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel htmlFor="attendance">Attendance</InputLabel>
              <Select
                value={attendanceInfo.attendance}
                onChange={(e) => setAttendanceInfo({ ...attendanceInfo, attendance: e.target.value })}
                label="Attendance"
                inputProps={{ name: "attendance", id: "attendance" }}
              >
                <MenuItem value="Present">Present</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
                <MenuItem value="Half Day">Half Day</MenuItem>
                <MenuItem value="Tour">Tour</MenuItem>
                <MenuItem value="Leave">Leave</MenuItem>
                <MenuItem value="Holiday">Holiday</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {error ? (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          ) : null}

          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Mark Attendance
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MarkAttendance

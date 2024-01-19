import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig";
import { Button, Box, Typography, Alert, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import TextField from "@mui/material/TextField";

const MarkAttendance = ({ notify }) => {
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
    try {
      await addDoc(collection(db, "niwe_attendance"), {
        ...attendanceInfo,
        markedDate: new Date(),
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

    if (!attendanceInfo.employeeName || !attendanceInfo.date) {
        setError("All fields are required");
        return;
        }

    markAttendance();
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ my: 3 }}>
      <Typography variant="h3" sx={{ textAlign: "center", wordBreak: "break-word" }} gutterBottom>
        Mark Attendance
      </Typography>

      {/* Employee Name Dropdown */}
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel htmlFor="employeeName">Employee Name</InputLabel>
        <Select
          value={attendanceInfo.employeeName}
          onChange={handleChange}
          label="Employee Name"
          inputProps={{ name: "employeeName", id: "employeeName" }}
        >
          {employeeList.map((employee) => (
            <MenuItem key={employee.id} value={employee.name}>
              {employee.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

        {/* Date */}
        <TextField
          id="date"
          label="Date"
          type="date"
            fullWidth
          sx={{ mt: 2 }}
          value={attendanceInfo.date}
          onChange={handleChange}
          name="date"
          InputLabelProps={{
            shrink: true,
          }}
        />

      {/* Attendance Dropdown */}
      <FormControl fullWidth sx={{ mt: 2 }}>
        <InputLabel htmlFor="attendance">Attendance</InputLabel>
        <Select
          value={attendanceInfo.attendance}
          onChange={handleChange}
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

      {error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : null}

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
        Mark Attendance
      </Button>
    </Box>
  );
};

export default MarkAttendance

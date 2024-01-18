// Import the new components
import MarkAttendance from "./MarkAttendance";
import AttendanceDashboard from "./AttendanceDashboard";
import { Paper } from "@mui/material";

const MyAttendance = ({ currUser, notify }) => {
  return (
    <>
      <Paper elevation={6} sx={{ my: 3, p: 3 }}>
        <MarkAttendance currUser={currUser} notify={notify} />
        <AttendanceDashboard currUser={currUser} notify={notify} />
      </Paper>
    </>
  );
};

export default MyAttendance

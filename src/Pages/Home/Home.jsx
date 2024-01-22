import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Face6Icon from '@mui/icons-material/Face6';

const Home = () => {
    let navigate = useNavigate();

    return (
        <>
            <Box sx={{ margin: "0 10px" }}>
                <Typography variant="h2" sx={{ textAlign: "center", marginTop: 3 }}>
                    Welcome to NIWE Dashboard - Developed for NIWE
                </Typography>
            </Box>
            <Paper elevation={5} sx={{ width: "95%", marginY: 4, marginX: "auto", padding: 3 }}>
                <Typography variant="body1" sx={{ marginBottom: 3 }}>
                    NIWE Dashboard is a powerful project management system developed during Saravanakumar's (Developer of this site) internship at the National Institute of Wind Energy (NIWE) for his mentor, Dr. K Boopathi Sir. It is tailor-made to meet the specific needs of Dr. Boopathi Sir and customized according to his requirements. The primary goal was to simplify and enhance project management, making it efficient for Dr. Boopathi Sir and his team at NIWE.
                </Typography>

                <Typography variant="body1" sx={{ marginBottom: 3 }}>
                    <strong>Background:</strong> NIWE Dashboard was designed during my internship at NIWE, addressing the challenges faced by Dr. K Boopathi Sir in project management. The system is a testament to the commitment to making the work of people more manageable and efficient.
                </Typography>

                <Typography variant="body1" sx={{ marginBottom: 3 }}>
                    <strong>Key Features:</strong>
                    <ul>
                        <li>Intuitive Project Dashboard</li>
                        <li>Project Management and Tracking</li>
                        <li>Employee Management and Tracking</li>
                        <li>Attendance Management</li>
                        <li>Export to Csv or print options </li>
                        <li>Project and Employee Search</li>
                        <li>Responsive Design</li>
                        <li>And more...</li>
                    </ul>
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, flexFlow: "wrap row" }}>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ px: 3, py: 1 }}
                        onClick={() => navigate("/Dashboard")}
                    >
                        Manage Projects
                    </Button>
                    <Button
                        color="success"
                        variant="contained"
                        sx={{ px: 3, py: 1 }}
                        onClick={() => navigate("/signup")}
                    >
                        <Face6Icon sx={{ marginRight: 1 }} />
                        New User
                    </Button>
                </Box>
            </Paper>
        </>
    );
}

export default Home;

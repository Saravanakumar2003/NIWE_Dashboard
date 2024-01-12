import React from "react"
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/firebaseConfig"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import Face6Icon from '@mui/icons-material/Face6';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Home = () => {
    let navigate = useNavigate();

    return (
        <>
            <Box sx={{ margin: "0 10px" }}>
            </Box>
            <Paper elevation={5} sx={{ width: "95%", marginY: 4, marginX: "auto", padding: 0}}>
                <Box sx={{ padding: 3, display: "flex", alignItems: "center", justifyContent: "center", gap: 3, flexFlow: "wrap row" }}>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ px: 3, py: 1 }}
                        onClick={() => navigate("/studentDashboard")}
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

                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                    <SideNotification />

                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Box sx={{ padding: 4 }}>

                            <Typography variant="h4" sx={{ marginBottom: 3, textDecoration: "underline", textAlign: "center" }}>
                                Basic Guidelines
                            </Typography>
                            <ul>
                                <li>
                                    <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant="body1" sx={{ marginBottom: 3 }}>

                                    </Typography>
                                </li>

                            </ul>

                        </Box>
                    </Grid>

                </Grid>


            </Paper>


        </>
    )
}
export default Home
const SideNotification = () => { // SideNotification
    const [allNotifications, setAllNotifications] = React.useState([]) // allNotifications
    React.useEffect(() => { 
        const q = query(collection(db, "empowerkids_notification"));// query to get the user info from the database
        const unsubscribe = onSnapshot(q, (querySnapshot) => { // onSnapshot
            let tempNotific = [] // temporary variable to store the user info
            querySnapshot.forEach((doc) => { // for each document in the querySnapshot
                tempNotific.push({ ...doc.data(), key: doc.id }); // store the user info in mytempinfo
            }); // end of forEach
            setAllNotifications(tempNotific)// set the myinfo state to mytempinfo
        }); // end of onSnapshot

        return (() => { // return
            unsubscribe() // unsubscribe from the query
        })
    }, [])
    return (
        <>
            <Paper elevation={2} sx={{ margin: 2, bgcolor: "#008336" }}> 
                <Typography variant="h6" sx={{ padding: 2, color: "white", display: 'flex', alignItems: "center", justifyContent: "center" }}>
                    <NotificationsIcon sx={{ marginRight: 1 }} />Notification / Updates
                </Typography>
                <List component="marquee" direction="up" sx={{ width: '100%', height: "300px", bgcolor: 'background.paper' }}>
                    {
                        allNotifications.map((notific) => {// allNotifications
                            return (
                                <>
                                    <ListItem>
                                        <ListItemText
                                            primary={notific.notification} // notification
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </>
                            )
                        })
                    }

                </List>
            </Paper>
        </>
    )
}


